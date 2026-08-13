// Bring the approved v2 design's copy up to the state of the record, 13 Aug 2026.
//
// The design was authored against the early-August site and is stale in five ways.
// Every substitution below asserts its hit count and the script aborts rather than
// silently skipping -- the same discipline as SUBMIT_THESE/apply_*_round_*.py.
//
// NOTHING VISUAL IS TOUCHED. Only text nodes and href values.
//
// Run: node scripts/v2-content-corrections.mjs <extracted-dir>

import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const DIR = process.argv[2];
if (!DIR) { console.error("usage: v2-content-corrections.mjs <dir>"); process.exit(1); }

// Version DOI -> concept DOI. Zenodo mints the concept DOI one number below the
// first version DOI. Verified against the API on 13 August 2026 for all twelve.
// The concept DOI resolves to whichever version is current, so it never goes
// stale; entry_check.py now FAILS any pre-v3 version DOI by range.
const DOI = {
  "21799855": "21799854", "21799850": "21799849", "21799857": "21799856",
  "21799859": "21799858", "21799861": "21799860", "21799863": "21799862",
  "21799865": "21799864", "21799867": "21799866", "21799869": "21799868",
  "21799871": "21799870",
};

// [pattern, replacement, expected hits across the whole site]
const EDITS = [
  ["last updated 6 August 2026", "last updated 13 August 2026", 12],

  // Twelve papers are deposited, not ten. Papers 11 and 12 published 7 August
  // 2026 as new records and reached version 2 on 13 August.
  ["Ten preprints, seven of them negative results.",
   "Twelve preprints, seven of the first ten negative results.", 1],
  // The home-page stat tile. Targeted by its full monospace style so it cannot
  // collide with the route-10 list marker, which is also ">10<". An earlier
  // draft of this file used the bare ">10<" and the assertion caught it at 3 hits.
  ['monospace;color:#e9e9ed">10</div>', 'monospace;color:#e9e9ed">12</div>', 1],
  ["preprints, seven of them negative results",
   "preprints; seven of the first ten are negative", 1],

  // Paper 11 has had a DOI since 7 August. The design's standing caveat is now
  // false, and it was the site's most prominent inaccuracy.
  ["An eleventh paper exists and is not here",
   "The eleventh and twelfth papers are now deposited", 1],

  // The enumeration is thirteen lines, of which eleven are therapeutic.
  // NOT touched: the "three that are closed" clause. An earlier draft changed it
  // to "four", applying THE_WALL's route numbering to a page that uses the site's
  // own scheme -- the design's dead section numbers its entries 5 and 6, not
  // THE_WALL's 4/5/6/12. That produced a page whose heading contradicted its own
  // breakdown (1 leading + 5 conditional + 2 weak + 3 dead = 11). Re-mapping the
  // two taxonomies is a content decision, not a find-and-replace, and is left
  // open rather than guessed.
  // RESTORED, not invented. v1 carried a sentence that a longer route list is not
  // better news, and tests/rendered-html.test.mjs asserts it because that is the
  // whole risk of the 6 August 2026 inventory change: a carrier reading "eleven
  // routes" can take it as hope. The v2 design dropped it. The safety property is
  // real, so the sentence is put back rather than the test relaxed.
  ["A page showing only the live options would be advocacy rather than a record.",
   "A page showing only the live options would be advocacy rather than a record. " +
   "A longer list is not better news: most of these lines are closed, conditional, " +
   "or waiting on the same measurement as everything else.", 1],

  ["Eleven routes, ranked, including the three that are closed.",
   "Thirteen lines, eleven of them therapeutic, including the three that are closed.", 1],
];

const files = (await readdir(DIR)).filter((f) => f.endsWith(".html"));
const texts = new Map();
for (const f of files) texts.set(f, await readFile(join(DIR, f), "utf8"));

function countAll(needle) {
  let n = 0;
  for (const t of texts.values()) n += t.split(needle).length - 1;
  return n;
}

console.log("CONTENT CORRECTIONS — asserting every hit count first\n");
for (const [from, to, expect] of EDITS) {
  const got = countAll(from);
  if (got !== expect) {
    console.error(`ABORT: expected ${expect} hit(s) of ${JSON.stringify(from.slice(0, 60))}, found ${got}`);
    process.exit(1);
  }
  for (const [f, t] of texts) texts.set(f, t.split(from).join(to));
  console.log(`  ok  ${String(expect).padStart(2)}x  ${from.slice(0, 62)}`);
}

// DOIs: version -> concept, everywhere they appear (href and text).
let doiN = 0;
for (const [ver, concept] of Object.entries(DOI)) {
  const hits = countAll(ver);
  if (hits === 0) { console.error(`ABORT: version DOI ${ver} not found`); process.exit(1); }
  for (const [f, t] of texts) texts.set(f, t.split(ver).join(concept));
  doiN += hits;
}
console.log(`  ok  ${doiN}x  version DOIs -> concept DOIs (10 papers)`);

for (const [f, t] of texts) await writeFile(join(DIR, f), t, "utf8");

// Post-check: no pre-v3 version DOI may survive anywhere.
let bad = 0;
for (const [f, t] of texts) {
  for (const v of Object.keys(DOI)) if (t.includes(v)) { console.error(`  LEFTOVER ${v} in ${f}`); bad++; }
}
console.log(bad ? `\n${bad} leftover version DOI(s)` : "\npost-check: zero version DOIs remain");
process.exit(bad ? 1 : 0);
