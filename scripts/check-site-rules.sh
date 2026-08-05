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
report "Checking for em-dashes and en-dashes"
if hits=$(grep -rn '—\|–' app/ 2>/dev/null | grep -v '\.old-backup'); then
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
    for f in $(grep -rl 'Corrected since' app/ 2>/dev/null || true); do
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
for name in ['MEASUREMENT','CENSUS','COMPARATOR','PRECEDENT','SITE','VARIANT']:
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
for route in "" new-here for-carriers science routes experiments papers census data history limitations; do
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
