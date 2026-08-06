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
These have not been posted yet, so they have no DOIs. When they are posted, each gets a DOI that belongs
on the site's papers page. Seven of the ten are negative results and the brief explains why that is the
point rather than a weakness.

### science/
The working documents behind the papers. These are longer and more detailed than the papers and are the
right source for site prose about mechanism and routes.
- `WHY_THIS_MATTERS.md` is the framing document. It states who the work is for, and it contains the
  correction that matters most: this is for carriers who do NOT qualify for an implanted device and have
  no protection at all, not for people who already have one.
- `MODALITY_COMPARISON.md` and `CURE_ROUTE_MAP.md` cover all the therapeutic routes with what blocks each.
- `BASE_EDITING_DESIGN.md` and `PRIME_EDITING_DESIGN.md` are the two live routes.
- `RNA_EDITING_DESIGN.md` and `UPREGULATION_ANALYSIS.md` are the conditional and dead ones.
- `CLINVAR_CENSUS.md` is the database finding that generalises beyond this variant.
- `OFFTARGET_REFINEMENT.md` is the safety analysis.
- `STATE_OF_THE_UNION.md` is the most recent overall status.

### data/
Tables a reader might want to download. `SCN5A_R104Q_DATA_DEPOSIT.tgz` is the packaged archive intended
for a repository deposit; once deposited it will have its own permanent identifier, and that identifier
is what the site should cite rather than hosting the tables directly.

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
- Why nobody has done this for Brugada: the disease has no cheap animal test. Its signature depends on a
  voltage gradient across the right ventricular wall that mouse hearts do not reproduce.
- The two experiments that would move it: 16,670 US dollars and 26 weeks for the editing validation,
  45,342 dollars and 42 weeks for the mechanism question. Details in `protocols/`.

---

## Rules for the site, repeated here because they are easy to lose

No em-dashes. First person singular, never we. Every number gets a source with an identifier. Every
scientific claim is followed by what would falsify it. No dosing, no risk calculators, no treatment
recommendations, not even framed as educational. Gloss every technical term inline the first time it
appears rather than in a glossary at the bottom.

The full reasoning for each of these is in the brief.
