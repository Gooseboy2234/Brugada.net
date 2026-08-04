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
if hits=$( { grep -rniE "$RETIRED" app/ 2>/dev/null; grep -rnE '\bREUS\b' app/ 2>/dev/null; } \
    | grep -v '\.old-backup' | sort -u); then
  echo "$hits"
  echo "FAIL: retired vocabulary found in live site copy"
  fail=1
else
  echo "  ok"
fi

# --- Rule: every nav entry resolves to a real page. ---
report "Checking nav targets exist"
nav_fail=0
for route in "" science routes papers experiments data for-carriers limitations; do
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
