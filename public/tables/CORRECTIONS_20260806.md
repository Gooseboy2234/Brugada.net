# Two of these tables were wrong, and this says which, why, and what they now hold

**6 August 2026.** Nothing on this page is deleted. The withdrawn values are printed below so that anyone
holding a copy downloaded before this date can identify what they have.

## The defect, stated first

Two of the tables served from `/data` had every derived number computed from a rescaling this project
retired on 4 August 2026. `UPREGULATION_HEADROOM.csv` and `ABE_RESCUE_MODEL.csv` were both built on a
baseline of 34.1 percent and a one-allele comparator of 50 percent. Both anchors are wrong.

O'Neill 2022's own two-allele control reads **218.4 percent of a single allele, not 200**, so the divisor
is 2.184 rather than 2. The measured 68.3 percent becomes a baseline of **31.3 percent**, and simple loss
of one allele is **45.8 percent**, not 50.

The two papers these tables belong to, `PUBLISH_4_OLIGO_ROUTES.md` and `PUBLISH_6_UPREGULATION_CEILING.md`,
were both corrected on 6 August 2026 and each carries a dated table of every figure that moved. **The CSVs
were not corrected at the same time**, so for part of 6 August this site served, as downloadable data, the
exact arithmetic the papers had already withdrawn.

**Nothing caught it, and that is the more useful half of this note.** `scripts/check-site-rules.sh` scans
`app/` and `public/papers/`. `public/tables/` was outside every rule in it. This is the second time on this
project that a checker went green because its pattern could not reach the files that were wrong; the first
was a manuscript sync that no rule covered. A rule covering `public/tables/` was added the same day.

## What was withdrawn and what replaced it

**No modelling was redone.** Both replacement formulas are printed verbatim in the papers' own correction
tables, and `scripts/regen-served-tables.mjs` only applies them to the row sets the files already had.
**Nine values printed in the two papers were used as anchors and all nine reproduce exactly**; the script
rechecks them on every run and fails if any stops reproducing.

### `UPREGULATION_HEADROOM.csv`

Recomputed as one-allele level = 45.8 x boost and measured R104Q level = 31.3 x boost, from the correction
table in `PUBLISH_6_UPREGULATION_CEILING.md`.

| boost | haploinsufficiency_pct was | is | dominant_negative_pct was | is |
|---:|---:|---:|---:|---:|
| 1.0 | 50.0 | 45.8 | 34.1 | 31.3 |
| 1.2 | 60.0 | 55.0 | 41.0 | 37.6 |
| 1.5 | 75.0 | 68.7 | 51.2 | 47.0 |
| 2.0 | 100.0 | 91.6 | 68.3 | 62.6 |
| 2.5 | 100.0 | 114.5 | 85.4 | 78.3 |

**A second change, beyond the arithmetic.** The old file capped the one-allele column at 100.0 for boosts
of 2.0 and 2.5. The paper does not cap, and prints 91.6 and 114.5. The cap is gone, so the served table now
agrees with the paper it supports. A capped column read as a physical ceiling and was a formatting choice.

### `ABE_RESCUE_MODEL.csv`

Recomputed as predicted current = 31.3 + 68.7f, where f is the fraction corrected, from the correction
table in `PUBLISH_4_OLIGO_ROUTES.md`.

| percent corrected | predicted_percent_of_normal was | is | fold_vs_untreated was | is |
|---:|---:|---:|---:|---:|
| 5 | 37.4 | 34.7 | 1.1 | 1.11 |
| 10 | 40.7 | 38.2 | 1.19 | 1.22 |
| 20 | 47.3 | 45.0 | 1.39 | 1.44 |
| 30 | 53.9 | 51.9 | 1.58 | 1.66 |
| 50 | 67.1 | 65.7 | 1.96 | 2.10 |
| 60 | 73.7 | 72.5 | 2.16 | 2.32 |
| 75 | 83.5 | 82.8 | 2.45 | 2.65 |
| 99 | 99.3 | 99.3 | 2.91 | 3.17 |
| 100 | 100.0 | 100.0 | 2.93 | 3.19 |

`fold_vs_untreated` is now quoted to two decimals throughout; the old file mixed one and two.

**Read the direction of these changes before reading anything into them.** Every predicted current in the
corrected table is *lower* than the number it replaces, and every fold change is *higher*. Both follow from
the same thing: the untreated starting point is worse than this project used to think it was. The therapy
does not get better because the fold column went up.

## What this does not fix, and it is the larger part

**These are this site's copies only.** The same two tables inside the Zenodo data deposit
`10.5281/zenodo.21799234` still hold the withdrawn values. Nothing has been re-uploaded to Zenodo, no
version 2 of any record exists, and the deposit is what every paper's data availability statement points
at. **If you are checking a published paper against deposited data rather than against this site, you will
still meet the retired arithmetic.**

Two further defects in that deposit are known and are not fixed by anything here:
`MS_TABLE3_LEAD_PROTEIN_CHANGING.csv` holds 16 rows where its paper prints 22, and
`ABE_CONSEQUENCE_RECHECK.csv` truncates a field at 1,500 characters and is missing 19.3 percent of its
consequence calls without marking the rows it lost.

**None of this is peer reviewed and none of it has been through a wet lab.** Every number in these tables
is a prediction.
