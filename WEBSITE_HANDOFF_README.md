# Website handoff

**Everything needed to rebuild brugada.net. Read brief/WEBSITE_BRIEF.md first.**

Author: Ethan Bradley · ORCID 0009-0008-8925-7975 · Independent researcher, no institutional affiliation
Assembled 2026-08-04

---

## Start here

`brief/WEBSITE_BRIEF.md` is the design document. It covers who the three audiences are and in what
order they matter, what goes above the fold, the writing rules, the site structure, and what must never
appear on the site. Read it before touching anything else. Everything below is source material for it.

---

## What is in each folder

### brief/
The design document. One file.

### papers/
The ten preprints, plus `PAPER_READINESS.csv` which records every convention check each one passed.
~~These have not been posted yet, so they have no DOIs. When they are posted, each gets a DOI that belongs
on the site's papers page.~~ **Corrected 6 August 2026: they are posted.** All ten papers and the data
deposit went live on Zenodo on **5 August 2026** — eleven records, verified against the Zenodo API on
6 August. Data deposit `10.5281/zenodo.21799234`; papers 1–10 at `21799855`, `21799850`, `21799857`,
`21799859`, `21799861`, `21799863`, `21799865`, `21799867`, `21799869`, `21799871`, all **version**
identifiers. That is route 9, and route 9 is **done**. Seven of the ten are negative results and the brief
explains why that is the point rather than a weakness. **One caution:** the local copies of papers 4, 7 and
8 were edited on 6 August and are now ahead of their published versions — see
`SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md` before citing a local paper as the published record.

### science/
The working documents behind the papers. These are longer and more detailed than the papers and are the
right source for site prose about mechanism and routes.
- `WHY_THIS_MATTERS.md` is the framing document. It states who the work is for, and it contains the
  correction that matters most: this is for carriers who do NOT qualify for an implanted device and have
  no protection at all, not for people who already have one.
- **`THE_WALL.md` is the authority on the route inventory and its tally.** ~~Ten routes: two live (1, 2),
  four closed (4, 5, 6, 7), two conditional (3, 10), one answered in a cell line and open for
  cardiomyocytes (8), and one — publication — done (9). 2 + 4 + 2 + 1 + 1 = 10.~~ **Corrected twice on
  6 August 2026: route 7's cargo closure was withdrawn at 22:54, and later the same evening a pass over all
  14,035 corpus records took the enumeration from ten lines to thirteen.** The tally is now **two live
  (1, 2), four closed (4, 5, 6, 12), five conditional (3, 7, 10, 11, 13), one answered in a cell line and
  open for cardiomyocytes (8), and one — publication — done (9). 2 + 4 + 5 + 1 + 1 = 13.** If any other file
  disagrees, `THE_WALL.md` section 1 wins.
- **Anything on the site that states a route count must state thirteen, and must not imply thirteen
  chances.** One of the three added lines is closed on arrival, one is a candidate the owner has not
  accepted, and the third waits on the same unfunded experiment as most of the rest. **The count measures
  how incomplete the enumeration was, not how many ways out there are.** Source:
  `SESSION_ARCHIVE_20260804/data/FULL_CORPUS_ROUTE_SWEEP_20260806.md`.
- `ROUTE_7_REDERIVED.md` is the authority for route 7, which is **conditional, not closed**, from
  6 August 2026. Where `THE_WALL.md` disagrees with it about route 7, it wins.
- `MODALITY_COMPARISON.md` and `CURE_ROUTE_MAP.md` cover the therapeutic routes with what blocks each.
  **Both carry retired enumerations and both now carry dated correction headers saying so** —
  `MODALITY_COMPARISON.md` is a 4 August ranking with a 6 August correction block, and
  `CURE_ROUTE_MAP.md` is a 27 July snapshot marked SUPERSEDED. Neither is the route inventory.
- `ROUTE_10_MOG1.md` is route 10, **chaperone and interacting-partner upregulation** (heading widened from
  "chaperone upregulation via AAV9-*MOG1*" on 6 August 2026 late evening, because the row named one gene
  where the corpus holds 520 records of the class; **the document still assesses MOG1 only**), added
  6 August 2026. **Record it as conditional, never as promising.** Its assessment is `THE_WALL.md`
  sections 1.3 and 1.3.1.
- `BASE_EDITING_DESIGN.md` (route 1) and `RNA_EDITING_DESIGN.md` (route 2) are the two live routes.
- `PRIME_EDITING_DESIGN.md` (route 3) is conditional — better designed than base editing and worse
  delivered. `UPREGULATION_ANALYSIS.md` (route 5) is closed on measurement.

*Corrected 6 August 2026. The three bullets above previously read: "`MODALITY_COMPARISON.md` and
`CURE_ROUTE_MAP.md` cover all the therapeutic routes with what blocks each. `BASE_EDITING_DESIGN.md` and
`PRIME_EDITING_DESIGN.md` are the two live routes. `RNA_EDITING_DESIGN.md` and `UPREGULATION_ANALYSIS.md`
are the conditional and dead ones." Two errors. **The live pair is base editing and RNA editing, not base
editing and prime editing** — prime editing is route 3 and conditional, and RNA editing is route 2 and
live. And `MODALITY_COMPARISON.md` and `CURE_ROUTE_MAP.md` did not cover "all" the routes: neither has a
row for the tenth, and `CURE_ROUTE_MAP.md` enumerates a retired seven.*
- `CLINVAR_CENSUS.md` is the database finding that generalises beyond this variant.
- `OFFTARGET_REFINEMENT.md` is the safety analysis.
- `STATE_OF_THE_UNION.md` is the most recent overall status.

### data/
Tables a reader might want to download. `SCN5A_R104Q_DATA_DEPOSIT.tgz` is the packaged archive intended
for a repository deposit; once deposited it will have its own permanent identifier, and that identifier
is what the site should cite rather than hosting the tables directly.


**One caution before anyone recomputes a number from these tables.** Several files store one row per
guide-and-position pair rather than one row per position, because the same genomic position can be reached by
more than one guide. Counting rows therefore gives a larger number than counting positions, and the two
answer different questions. The splice-site table is the clearest case: 18,422 rows correspond to 1,184
distinct positions. Every count quoted in the papers is a count of distinct positions. If a recomputed figure
comes out several times too large, this is almost certainly why. This project made that exact mistake once
and published the row count in three documents before catching it.

### figures/
Publication figures. All were generated from the tables in `data/` and are safe to use on the site with
attribution to the author. Each has a caption in whichever paper cites it.

### protocols/
The two costed wet-lab experiments, their line-item costs and timelines, and the sequencing panel. These
are the highest-value pages on the site for reaching anyone who could actually run the work.

---

## Facts the site will need, all verified

- The variant is SCN5A p.Arg104Gln, also written R104Q, also c.311G>A. Transcript NM_000335.5.
  Genomic NC_000003.12:g.38630392C>T on GRCh38. ClinVar VariationID 67780.
- Measured effect: 68.3 plus or minus 6.1 percent of a single working copy, n=34 cells, O'Neill and
  colleagues 2022, PMID 35305865. Rescaled to a heart with two working copies that is 31.3 percent,
  against 45.8 percent for simple loss of one copy. **Corrected 6 August 2026:** this line read
  "34.1 percent, against 50 percent". Both came from dividing by two. The same study measured the
  two-copy case at 218.4 percent of one copy, so the divisor is 2.184, not 2. Never pair 31.3 with 50.
- The open question, and it is genuinely open: whether that interference behaves the same way in a human
  heart cell. Nobody has measured it. It gates every therapeutic route.
- Base editing precedent: Qi and colleagues, Circulation 2024, PMID 37965733. A single injection
  corrected up to 99.20 percent of transcripts of this same gene in a mouse, and above 60 percent
  correction the disease signature disappeared. That mouse carried a different variant with the opposite
  effect, so the mechanism transfer is not established.
- Why nobody has done this for Brugada: the disease has no cheap animal test **available to this project**.
  Its signature depends on a voltage gradient across the right ventricular wall that mouse hearts do not
  reproduce. **Narrowed 6 August 2026 — this line used to stop at "no cheap animal test" and imply none
  exists.** One does: Yu et al. 2022 (PMID 35675436) built a *Scn5a*<sup>G1746R/+</sup> knock-in mouse with
  a J wave, ventricular tachyarrhythmias and sudden death. What survives is the word *cheap* — that endpoint
  needs a funded laboratory to build a variant-specific knock-in line, which for R104Q does not exist and
  nobody is building. Full revision in `science/THE_WALL.md` section 4, which keeps both versions.
- The two experiments that would move it: **17,894** US dollars and 26 weeks for the editing validation,
  45,342 dollars and 42 weeks for the mechanism question. Details in `protocols/`. **Corrected 6 August
  2026: the editing figure read 16,670.** Adding *OBSCN* and *JPH2* to the sequencing panel took it from 16
  sites to 18 and raised the minimum-viable cost; the full arm moves from 26,752 to 27,976.

---

## Rules for the site, repeated here because they are easy to lose

No em-dashes. First person singular, never we. Every number gets a source with an identifier. Every
scientific claim is followed by what would falsify it. No dosing, no risk calculators, no treatment
recommendations, not even framed as educational. Gloss every technical term inline the first time it
appears rather than in a glossary at the bottom.

The full reasoning for each of these is in the brief.
