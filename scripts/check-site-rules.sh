#!/usr/bin/env bash
# Deterministic checker for the writing rules in WEBSITE_BRIEF.md.
# The recurring defect this guards against is fixing one document and leaving
# its twin describing the old state. Run before every deploy.
#
# Usage: bash scripts/check-site-rules.sh

set -uo pipefail
cd "$(dirname "$0")/.."

fail=0
report() { printf '\n%s\n' "$1"; }

# --- Rule: no em-dashes or en-dashes. Commas, colons, full stops. ---
# Widened 7 August 2026. This tested the literal characters only, so &mdash;
# and &#8212; walked straight past it and rendered as an em-dash on the page.
# One had, on the routes page, for as long as the route-count rewrite sat
# uncommitted. The rule is about what a reader sees, so it now covers the HTML
# entity and numeric forms as well.
report "Checking for em-dashes and en-dashes"
if hits=$(grep -rn '—\|–\|&mdash;\|&ndash;\|&#8212;\|&#8211;\|&#x201[34];' app/ 2>/dev/null | grep -v '\.old-backup'); then
  echo "$hits"
  echo "FAIL: dashes found"
  fail=1
else
  echo "  ok"
fi

# --- Rule: never write "we". One person wrote this. ---
# "US dollars" and "US-based" are excluded: that is the country, not the pronoun.
report "Checking for first person plural"
if hits=$(grep -rniE '\b(we|we[' "'" ']re|our|ours)\b' app/ 2>/dev/null \
    | grep -v '\.old-backup' \
    | grep -viE '\bUS (dollars?|cents?)\b'); then
  echo "$hits"
  echo "FAIL: first person plural found"
  fail=1
else
  echo "  ok"
fi

# --- Rule: no retired claims. ---
# Terms belonging to the campaign retired by the 2026-07-25 audit. None of
# these may appear as present-tense site copy.
report "Checking for retired campaign vocabulary"
# Case-insensitive terms, plus \bREUS\b matched case-sensitively so that the
# ordinary word "reuse" does not trip it.
RETIRED='cation.clip|pharmacochaperone|orphaned charge|Experiment Zero|gauntlet|ZINC0000|agmatine|clip.gripper|D84N suppressor'
# app/history/ is exempt: describing retired work as retired is its purpose.
if hits=$( { grep -rniE "$RETIRED" app/ 2>/dev/null; grep -rnE '\bREUS\b' app/ 2>/dev/null; } \
    | grep -v '\.old-backup' | grep -v '^app/history/' | sort -u); then
  echo "$hits"
  echo "FAIL: retired vocabulary found in live site copy"
  fail=1
else
  echo "  ok"
fi

# --- Rule: superseded values must not reappear. ---
# Each of these was corrected by a later analysis in WEBSITE_HANDOFF/, and each
# still survives somewhere in the source material, which is exactly how a stale
# number gets published.
report "Checking for superseded values"
sup_fail=0
check_absent() { # pattern, explanation, [allow-in-correction-notices]
  # Comment lines are excluded: recording that a value is retired is the
  # opposite of publishing it, and content.ts documents exactly that.
  local hits
  hits=$(grep -rnE "$1" app/ 2>/dev/null | grep -v '\.old-backup' \
      | grep -vE '^[^:]+:[0-9]+: *(//|\*|/\*)') || true
  # Some rules name a number in order to withdraw it. A page carrying an
  # explicit "Corrected since" notice has to be able to say what it corrected,
  # so those files are exempt from that rule and only that rule.
  if [ "${3:-}" = "allow-corrections" ]; then
    # A page whose whole job is the correction log legitimately quotes retired
    # values. v1 marked those with "Corrected since"; the v2 design states the
    # same contract in its own words on the history page. Both are accepted, and
    # the exemption is still per-file rather than global.
    for f in $(grep -rl 'Corrected since\|Corrections are dated and kept' app/ 2>/dev/null || true); do
      hits=$(printf '%s\n' "$hits" | grep -v "^$f:") || true
    done
  fi
  hits=$(printf '%s\n' "$hits" | grep -v '^[[:space:]]*$') || true
  if [ -n "$hits" ]; then
    echo "  FAIL: $2"; echo "$hits"; sup_fail=1
  fi
}
# 16 protein-changing off-targets was revised to 22 missense / 26 protein-changing.
check_absent '16 protein.changing' "16 protein-changing is superseded by 22 missense / 26 protein-changing"
# MSH6 is no longer the NEAREST protein-changing site once bulges are modelled.
check_absent 'nearest protein.changing[^.]*3 mismatch|MSH6[^.]*nearest' "MSH6 is no longer the nearest protein-changing off-target"
# Paper 1's abstract quotes an FEP value its own body says was never run.
check_absent '3\.71' "the +3.71 FEP value is contradicted inside its own paper"
# The negative-result count is seven, not five.
check_absent '[Ff]ive of the ten|5 of the ten' "the negative-result count is seven of ten"
# The per-gene census table and the 8,157 / 8,142 / 791-gene pool are defective.
check_absent '8,157|8,142|791 genes' "superseded census pool; the corrected figures are 7,661 across 622 genes"
# Retired single-replicate mechanism numbers.
check_absent '37 percent|\+37%|52\.3|13\.7 percent' "retired single-replicate salt-bridge and RMSF values"
# The unqualified form of the central structural claim was retired.
check_absent 'orphaned buried charge|orphaned charge' "the unqualified orphaned-charge claim was retired"
# Experiment Zero was answered; describing it as unrun is stale.
check_absent 'zero off-target|no off-target site survives' "the prime-editing zero-off-target claim is withdrawn"
# The rescaling that divided by two, rather than by the measured 2.184.
check_absent '34\.1|15\.9' "the 34.1 rescaling and its 15.9-point gap were corrected to 31.3 and 14.5" allow-corrections
[ $sup_fail -eq 0 ] && echo "  ok"
[ $sup_fail -eq 1 ] && fail=1

# --- Rule: every content field a page references must exist. ---
# A rename in content.ts silently renders as an empty string, which is how
# "the 68.3 percent figure" became "the percent figure" on a live page.
report "Checking content references resolve"
if python3 - <<'PYEOF'
import re, glob, sys
s = open('app/content.ts').read()
defined = {}
for name in ['MEASUREMENT','CENSUS','COMPARATOR','PRECEDENT','SITE','VARIANT','DEPOSIT','ROUTE_INVENTORY']:
    m = re.search(r'export const %s = \{(.*?)\n\};' % name, s, re.S)
    if m:
        defined[name] = set(re.findall(r'^\s*(\w+):', m.group(1), re.M))
bad = []
for f in glob.glob('app/**/page.tsx', recursive=True):
    t = open(f).read()
    for obj, fields in defined.items():
        for used in set(re.findall(r'\b%s\.(\w+)' % obj, t)):
            if used not in fields:
                bad.append(f"  {f}: {obj}.{used}")
if bad:
    print("\n".join(sorted(bad)))
    sys.exit(1)
PYEOF
then echo "  ok"; else echo "FAIL: a page references a field that does not exist"; fail=1; fi

# --- Rule: every nav entry resolves to a real page. ---
report "Checking nav targets exist"
nav_fail=0
for route in "" new-here for-carriers science routes open experiments papers census data history limitations; do
  if [ -z "$route" ]; then
    [ -f app/page.tsx ] || { echo "  MISSING /"; nav_fail=1; }
  elif [ ! -f "app/$route/page.tsx" ]; then
    echo "  MISSING /$route"
    nav_fail=1
  fi
done
if [ $nav_fail -eq 0 ]; then echo "  ok"; else fail=1; fi

# --- Rule: no retired downloads served. ---
report "Checking retired downloads are not served"
if [ -d public/downloads ]; then
  echo "  FAIL: public/downloads exists and would be served"
  ls public/downloads
  fail=1
else
  echo "  ok"
fi

# --- Rule: pending values are marked pending, never estimated. ---
report "Checking the data DOI is not fabricated"
DOI_FILE=../SUBMIT_THESE/DATA_DOI.txt
if [ -f "$DOI_FILE" ] && head -1 "$DOI_FILE" | grep -q 'PASTE_THE_DOI_HERE'; then
  if grep -rq '10\.5281/zenodo' app/ 2>/dev/null; then
    echo "  FAIL: a Zenodo DOI appears on the site but none has been deposited"
    fail=1
  else
    echo "  ok, deposit still pending and no identifier quoted"
  fi
elif [ -f "$DOI_FILE" ]; then
  # The reverse defect, which is the one that actually happened: the deposit is
  # published and the site never names it. The DOI has to match the file.
  deposited=$(grep -oE '10\.5281/zenodo\.[0-9]+' "$DOI_FILE" | head -1)
  if [ -z "$deposited" ]; then
    echo "  ok"
  elif ! grep -q "$deposited" app/content.ts; then
    echo "  FAIL: deposit $deposited is published but content.ts does not carry it"
    fail=1
  elif ! grep -q "DEPOSIT\.\|$deposited" app/data/page.tsx; then
    echo "  FAIL: the data page does not quote the deposit identifier"
    fail=1
  else
    echo "  ok, deposit $deposited published and quoted"
  fi
else
  echo "  ok"
fi

# --- Rule: the served manuscripts match the authoritative copies. ---
# Added 2026-08-06. Every rule above this one is scoped to app/, which is how
# ten manuscripts under public/papers/ shipped outside the guard and seven of
# them served the retired 34.1 rescaling for two days. This checks the copy
# itself rather than searching it for phrases: a paper legitimately names a
# retired figure inside its own dated correction table, so a string rule here
# would fail on correct files. Byte identity against SUBMIT_THESE/papers/ is
# the property that actually matters.
report "Checking served manuscripts match SUBMIT_THESE/papers"
if node scripts/sync-manuscripts.mjs --check; then :; else
  echo "FAIL: run node scripts/sync-manuscripts.mjs"
  fail=1
fi

# --- Rule: every manuscript names its version of record. ---
report "Checking every manuscript carries a provenance header"
prov_fail=0
for f in public/papers/*.md; do
  head -1 "$f" | grep -q '<!-- provenance' || { echo "  MISSING header: $f"; prov_fail=1; }
  grep -q 'Version of record: 10\.5281/zenodo\.' "$f" || { echo "  MISSING DOI: $f"; prov_fail=1; }
done
if [ $prov_fail -eq 0 ]; then echo "  ok"; else fail=1; fi

# --- Rule: the rendered manuscript pages are current with their markdown. ---
# Added 2026-08-06. public/m/<slug>.html is what "Read the manuscript" opens and
# it is a committed build artifact, so a manuscript can be corrected, committed
# and deployed with the reader-facing copy still stale. That happened to paper 5.
report "Checking rendered manuscripts match public/papers"
if node scripts/build-manuscripts.mjs --check; then :; else
  echo "FAIL: run node scripts/build-manuscripts.mjs"
  fail=1
fi

# --- Rule: the served data tables do not carry the retired rescaling. ---
# Added 2026-08-06, and it is the third instance of the same blind spot. Every
# rule above was scoped to app/ or to public/papers/, and public/tables/ was
# reachable by none of them, so two CSVs served from /data held the retired 34.1
# baseline against the retired 50 comparator for two days after the papers they
# belong to were corrected. A string rule is right here and would be wrong on a
# manuscript: a paper legitimately names a retired figure inside its own dated
# correction table, a CSV of derived values never does. The correction note
# filed beside the tables is exempt, because saying what was withdrawn is its
# entire purpose.
#
# The retired baseline 34.1 is checked in every served CSV, because there is no
# innocent reason for it to appear in one. The retired comparator 50.0 is NOT
# checked everywhere: 50.0 is an ordinary percentage and ABE_ACCESSIBILITY_
# TOPGENES.csv carries a genuine 50.0 in a chromatin-openness column. It is
# checked only in the tables whose headers name a column measured against that
# comparator, which is the narrowest form of the rule that still has teeth.
report "Checking served data tables for the retired rescaling"
tbl_fail=0
if hits=$(grep -rn '34\.1' public/tables/*.csv 2>/dev/null); then
  echo "$hits"
  echo "  FAIL: a served table carries the retired 34.1 baseline"
  tbl_fail=1
fi
for f in public/tables/*.csv; do
  head -1 "$f" | grep -qE 'haploinsufficiency_pct|predicted_percent_of_normal' || continue
  if hits=$(grep -nE '(^|,)50\.0(,|$)' "$f"); then
    echo "$f:"; echo "$hits"
    echo "  FAIL: a table measured against the one-allele comparator carries the retired 50.0"
    tbl_fail=1
  fi
done
[ $tbl_fail -eq 0 ] && echo "  ok"
[ $tbl_fail -eq 1 ] && fail=1

# --- Rule: the served tables are what their generator produces. ---
report "Checking regenerated tables match their generator"
if node scripts/regen-served-tables.mjs --check; then :; else
  echo "FAIL: run node scripts/regen-served-tables.mjs"
  fail=1
fi

# --- Rule: the site and the manuscript headers agree on which papers diverge. ---
# Added 2026-08-06. content.ts marked four papers as diverging from their
# deposit while scripts/manuscript-provenance.mjs marked seven, so /papers told
# a reader "four of the ten" over a list in which seven manuscripts each carried
# a header saying they were not the text at their identifier. Two files
# describing the same fact is exactly the defect this whole checker exists for.
report "Checking divergence status agrees between content.ts and the manuscript headers"
if node - <<'DIVEOF'
import { readFileSync } from "node:fs";
import { MANUSCRIPTS } from "./scripts/manuscript-provenance.mjs";

const ts = readFileSync("app/content.ts", "utf8");
const block = ts.slice(ts.indexOf("export const PAPERS"));
const entries = block.split(/\n  \{\n/).slice(1);
const site = new Map();
for (const e of entries) {
  const n = e.match(/^\s*n: (\d+),/m);
  if (!n) continue;
  const pd = e.match(/^\s*postDeposit: "(\w+)",/m);
  site.set(Number(n[1]), pd ? pd[1] : "in-sync");
}

let bad = 0;
for (const m of MANUSCRIPTS) {
  const got = site.get(m.n);
  if (got === undefined) {
    console.log(`  MISSING: paper ${m.n} is in manuscript-provenance.mjs and not in PAPERS`);
    bad = 1;
  } else if (got !== m.status) {
    console.log(`  MISMATCH: paper ${m.n} is "${m.status}" in manuscript-provenance.mjs and "${got}" in content.ts`);
    bad = 1;
  }
}
if (!bad) {
  const c = MANUSCRIPTS.filter((m) => m.status === "corrective").length;
  const a = MANUSCRIPTS.filter((m) => m.status === "additive").length;
  console.log(`  ok, ${MANUSCRIPTS.length} papers agree: ${c} corrective, ${a} additive, ${MANUSCRIPTS.length - c - a} in sync`);
}
process.exit(bad);
DIVEOF
then :; else echo "FAIL: content.ts and manuscript-provenance.mjs disagree"; fail=1; fi

# --- Rule: no page says an identifier is pending that already exists. ---
# Ten DOIs went live on /papers while the same page still said "DOI pending".
report "Checking no live identifier is described as pending"
if grep -rn 'DOI pending\|Pending deposit' app/ 2>/dev/null | grep -v '\.old-backup'; then
  echo "FAIL: an identifier that exists is still marked pending"
  fail=1
else
  echo "  ok"
fi

printf '\n'
if [ $fail -eq 0 ]; then
  echo "All site rules pass."
else
  echo "Site rules FAILED. Do not deploy."
fi
exit $fail
