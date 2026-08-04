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
check_absent() { # pattern, explanation
  if hits=$(grep -rnE "$1" app/ 2>/dev/null | grep -v '\.old-backup'); then
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
[ $sup_fail -eq 0 ] && echo "  ok"
[ $sup_fail -eq 1 ] && fail=1

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
