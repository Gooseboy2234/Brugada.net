// Regenerate the two served data tables that were built on the retired
// rescaling, and verify them against the values their papers print.
//
// Run:   node scripts/regen-served-tables.mjs
// Check: node scripts/regen-served-tables.mjs --check   exit 1 on any drift
//
// WHY THIS EXISTS, negative first. On 6 August 2026 the site served two CSVs
// from /data whose every derived number was computed from the retired 34.1
// baseline and the retired 50 percent comparator:
//
//   public/tables/UPREGULATION_HEADROOM.csv
//     boost,haploinsufficiency_pct,dominant_negative_pct,fold_vs_now
//     1.0,50.0,34.1,1.0
//     1.2,60.0,41.0,1.2
//     1.5,75.0,51.2,1.5
//     2.0,100.0,68.3,2.0
//     2.5,100.0,85.4,2.5
//
//   public/tables/ABE_RESCUE_MODEL.csv
//     percent_cells_corrected,predicted_percent_of_normal,fold_vs_untreated,note
//     5,37.4,1.1,
//     10,40.7,1.19,
//     20,47.3,1.39,Levy 2020 general cardiac survey
//     30,53.9,1.58,
//     50,67.1,1.96,
//     60,73.7,2.16,Qi 2024 threshold that ELIMINATED the phenotype in mice
//     75,83.5,2.45,
//     99,99.3,2.91,Qi 2024 best observed correction in Scn5a
//     100,100.0,2.93,
//
// The retired values are kept above rather than deleted, because that is the
// house rule and because a reader who downloaded either file before 6 August
// 2026 needs to be able to identify what they hold.
//
// The papers these two tables belong to were both corrected on 6 August 2026
// and the CSVs were not, so the site was serving, as downloadable data, the
// exact arithmetic the papers had already withdrawn. Nothing caught it:
// scripts/check-site-rules.sh scans app/ and public/papers/, and public/tables/
// was outside every rule. That is the same blind spot twice, and the rule added
// to check-site-rules.sh alongside this script closes it.
//
// HOW THE REPLACEMENTS ARE DERIVED. Not by re-modelling anything. Both formulas
// are printed verbatim in the papers' own dated correction tables, and this
// script only applies them to the row sets the CSVs already had:
//
//   SUBMIT_THESE/papers/PUBLISH_4_OLIGO_ROUTES.md
//     "the dominant-negative column is 31.3 + 68.7f and the simple-loss column
//      is 45.8 + 54.2f, where f is the fraction of mutant messages corrected"
//     Its Table 1 prints 48.5 / 65.7 / 82.8 at f = 25 / 50 / 75 percent.
//
//   SUBMIT_THESE/papers/PUBLISH_6_UPREGULATION_CEILING.md
//     correction table: one-allele column 45.8 x boost, R104Q column 31.3 x boost
//     Its boost table prints 68.7 / 91.6 / 114.5 and 47.0 / 62.6 / 78.3 at
//     boosts of 1.5 / 2.0 / 2.5.
//
// The anchors below are those six printed values. --check recomputes them and
// fails if any one stops reproducing, so a future change to either paper that
// is not carried into these files is caught rather than assumed.
//
// TWO THINGS THIS CHANGED BEYOND THE ARITHMETIC, both stated rather than left
// to be discovered:
//
//   1. The old haploinsufficiency column capped at 100.0 for boosts of 2.0 and
//      2.5. PUBLISH_6 does not cap: it prints 91.6 and 114.5. The cap is gone,
//      so the served table now agrees with the paper it supports.
//   2. fold_vs_untreated in ABE_RESCUE_MODEL is now quoted to two decimals
//      throughout. The old file mixed one and two.
//
// WHAT THIS DOES NOT FIX. These are the site's own copies. The same two tables
// inside the Zenodo data deposit 10.5281/zenodo.21799234 have not been touched
// and are not covered by anything here.

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "tables");
const check = process.argv.includes("--check");

const r1 = (x) => (Math.round(x * 10) / 10).toFixed(1);
const r2 = (x) => (Math.round(x * 100) / 100).toFixed(2);

// PUBLISH_4_OLIGO_ROUTES.md: predicted current = 31.3 + 68.7f.
const abePredicted = (percent) => 31.3 + 68.7 * (percent / 100);
// PUBLISH_6_UPREGULATION_CEILING.md: 45.8 x boost and 31.3 x boost.
const oneAllele = (boost) => 45.8 * boost;
const measured = (boost) => 31.3 * boost;

const ANCHORS = [
  ["PUBLISH_4 Table 1, f=25%", r1(abePredicted(25)), "48.5"],
  ["PUBLISH_4 Table 1, f=50%", r1(abePredicted(50)), "65.7"],
  ["PUBLISH_4 Table 1, f=75%", r1(abePredicted(75)), "82.8"],
  ["PUBLISH_6 boost table, one-allele 1.5x", r1(oneAllele(1.5)), "68.7"],
  ["PUBLISH_6 boost table, one-allele 2.0x", r1(oneAllele(2.0)), "91.6"],
  ["PUBLISH_6 boost table, one-allele 2.5x", r1(oneAllele(2.5)), "114.5"],
  ["PUBLISH_6 boost table, R104Q 1.5x", r1(measured(1.5)), "47.0"],
  ["PUBLISH_6 boost table, R104Q 2.0x", r1(measured(2.0)), "62.6"],
  ["PUBLISH_6 boost table, R104Q 2.5x", r1(measured(2.5)), "78.3"],
];

const NOTES = {
  20: "Levy 2020 general cardiac survey",
  60: "Qi 2024 threshold that ELIMINATED the phenotype in mice",
  99: "Qi 2024 best observed correction in Scn5a",
};

function abeRescueModel() {
  let out = "percent_cells_corrected,predicted_percent_of_normal,fold_vs_untreated,note\n";
  for (const p of [5, 10, 20, 30, 50, 60, 75, 99, 100]) {
    const v = abePredicted(p);
    out += `${p},${r1(v)},${r2(v / 31.3)},${NOTES[p] ?? ""}\n`;
  }
  return out;
}

function upregulationHeadroom() {
  let out = "boost,haploinsufficiency_pct,dominant_negative_pct,fold_vs_now\n";
  for (const b of [1.0, 1.2, 1.5, 2.0, 2.5]) {
    out += `${b.toFixed(1)},${r1(oneAllele(b))},${r1(measured(b))},${b.toFixed(1)}\n`;
  }
  return out;
}

const TABLES = [
  ["ABE_RESCUE_MODEL.csv", abeRescueModel()],
  ["UPREGULATION_HEADROOM.csv", upregulationHeadroom()],
];

let fail = 0;

for (const [label, got, want] of ANCHORS) {
  if (got !== want) {
    console.log(`  ANCHOR FAIL: ${label} prints ${want}, this script computes ${got}`);
    fail = 1;
  }
}
if (!fail) console.log(`  ok, all ${ANCHORS.length} printed anchors reproduce`);

for (const [name, wanted] of TABLES) {
  const path = join(dir, name);
  const current = await readFile(path, "utf8").catch(() => null);
  if (check) {
    if (current !== wanted) {
      console.log(`  DRIFT: public/tables/${name} is not what this script generates`);
      fail = 1;
    }
    continue;
  }
  if (current !== wanted) {
    await writeFile(path, wanted);
    console.log(`  wrote public/tables/${name}`);
  }
}

if (check && !fail) console.log(`  ok, ${TABLES.length} served tables match`);
if (fail) process.exit(1);
