# Residue centroid distance misses close atom contacts in the SCN5A N-terminal domain, and real cryo-EM geometry does not move the R104Q penetrance estimate

**Ethan Bradley**

Independent researcher, no institutional affiliation

ORCID: [0009-0008-8925-7975](https://orcid.org/0009-0008-8925-7975)

## Abstract

Residue centroid distance, the structural covariate used in a published Brugada syndrome penetrance
model, misses close atom contacts within the Nav1.5 (SCN5A) N-terminal domain, and the misses
concentrate in long side chain and salt bridge contacts rather than spreading evenly across the
domain. Using PDB 8VYJ chain A (cryo-EM, approximately 3.6 Å, map EMD-43662, residues 12 to 130), I
computed closest heavy atom and centroid distances for all 5,672 residue pairs at sequence separation
of two or more. Of 218 pairs in close atom contact (closest heavy atom below 4.0 Å), 20, or 9.2
percent, fall beyond an 8 Å centroid cutoff and are invisible to that covariate; sensitivity is 0.908
and precision 0.662. The domain contains exactly two salt bridges, and one of them, R104 to D84
(3.79 Å between closest heavy atoms, 9.22 Å between centroids), is among the missed contacts. With
only two present, that is one miss out of two and not a rate. Supplying the real 8VYJ geometry for
residue 104 in place of the model's sequence-distance fallback, and refitting the full
expectation-maximization step, changes the R104Q penetrance estimate from 42.64 percent to 41.70
percent, a shift of 0.9 points that holds across neighbor cutoffs from 12 to 25 Å. That is a null
result: the salt bridge carries little weight once it passes through a centroid-based covariate, so
correcting the geometry for one residue does not move the estimate.

## A key to the terms used here

- **SCN5A** is the gene for the heart's main sodium channel; **Nav1.5** is the protein. **R104Q** is
  arginine at position 104 replaced by glutamine, the variant used as the worked example.
- **Penetrance** is the proportion of people carrying a variant who actually develop the condition. A
  **penetrance model** estimates it from a variant's properties, and **covariates** are the properties
  fed in.
- A **residue** is one amino acid in a protein chain. Its **centroid** is the average position of its
  atoms, a single point standing in for the whole side chain.
- **Centroid distance** between two residues is the distance between those two summary points. The
  finding here is that this summary hides close contacts, because two residues can be far apart on
  average while individual atoms nearly touch. Averaging a shape to a point loses the parts that stick
  out.
- **Structural density**, or the neighbour count, is how many other residues sit near a given one. It is
  the covariate this paper tests.
- A **salt bridge** is an attraction between a positively and a negatively charged side chain. These are
  formed at the tips of long side chains, which is why a centroid summary misses them
  disproportionately.
- An **ångström**, Å, is a ten-billionth of a metre; atoms in contact sit a few ångströms apart.
- **Cryo-EM** is a microscopy method producing a 3D model of a protein. **PDB 8VYJ** is the model used
  here and **EMD-43662** its density map. Real measured geometry replaces the idealised geometry the
  published model assumed.
- **Sigmoid weighting** is a way of counting neighbours that fades smoothly with distance instead of
  applying a hard cut-off.
- **Brugada syndrome** is an inherited arrhythmia condition linked to reduced cardiac sodium current.

## Why the definition of "structural neighbor" matters here

Structure-based penetrance models for arrhythmia genes use a structural-density covariate: a distance-weighted count of neighboring residues, sitting alongside sequence-conservation covariates in the same fit. The distance in that covariate is conventionally measured between residue centroids, the mean position of a residue's atoms. For a long side chain that makes contact through its tip rather than its base, the centroid sits behind the point of contact, and a covariate built on that distance can average away the interaction it is meant to register. R104 in the Nav1.5 N-terminal domain forms a salt bridge to D84. R104Q is my own variant, and it is the case used to test whether this concern is real or academic. The question below is answered in two parts: does the centroid definition actually miss contacts of this kind in this domain, and does the answer change anything once it is fed back into the published model.

## Methods

**Structure.** PDB 8VYJ, chain A, a cryo-EM reconstruction at approximately 3.6 Å resolution, deposited with electron microscopy map EMD-43662 (Biswas et al., 2025). Residues 12 to 130 are modelled, 108 residues in total; residues 38 to 48 are unresolved and excluded.

**Pairwise geometry.** For every pair among the 108 modelled residues with sequence separation of two or more (5,672 pairs), I computed five distances from heavy atoms only, excluding hydrogens and alternate conformers: closest heavy atom distance, all-atom centroid distance, side-chain centroid distance, Cα to Cα distance, and Cβ to Cβ distance (Cα substituted for Cβ at glycine). A pair was called a close atom contact when the closest heavy atom distance was below 4.0 Å. The centroid cutoff tested against that definition was 8 Å. The specific software used to parse coordinates and compute these distances is not recorded in the source material beyond that it operates directly on the PDB coordinate file; no package name or version is given, and I report that gap rather than guess at one.

**Validation.** Computed distances for R104 to D84 and R104 to D82 were checked against independently recorded values for the same two pairs (3.79 Å closest atom and 9.22 Å centroid for R104-D84; 4.78 Å and 8.07 Å for R104-D82) and agreed to 0.01 Å.

**Penetrance model.** The BrS1 penetrance model and its code are distributed in the repository kroncke-lab/Bayes_BrS1_Penetrance on GitHub. I ran the pipeline as published, using its own files func_dist_seq.R, distance_file, and BrS1_data.RData, following its steps in order: weighted penetrance, a method-of-moments Beta prior, a per-variant posterior, the funcdist structural-density term, an expectation-maximization regression on the six-feature set eaRate, blastpssm, provean_score, pph2_prob, ipeak, and feat_dist_w, a variance scaled by 20, and the resulting posterior. No repository access date or software version is recorded in the source material, so neither is stated here as fact. The pipeline's own EM is capped at 10 iterations and plateaus at a δ of approximately 0.63; that behavior was reproduced, not altered.

**Sequence fallback.** Where the pipeline's own distance file lacks resolved structure for a residue, because it is built from transmembrane-domain templates that do not include the N-terminal domain, it substitutes a sequence-distance approximation of 3.8 times the square root of the residue separation. Residue 104 is one such residue.

**Recompute.** I calculated all-atom centroid distances from residue 104 to every chain A residue within 25 Å in 8VYJ. To confirm which distance convention the pipeline itself uses, I compared Cα-Cα, Cβ-Cβ, side-chain centroid, and all-atom centroid distances against the pipeline's own distance file on three pairs it does resolve (120-126, 120-117, 120-178). All-atom centroid matched best, with a mean absolute difference of 0.5 Å. I then replaced the pipeline's entry for residue 104 with the real 8VYJ neighbor list, including a self-distance of 0 Å to match the pipeline's own convention, so that R104W and R104G continue to count residue 104 as a neighbor of itself at weight 0.5, identically to the sequence fallback, and re-ran the full EM.

## Centroid distance misses one in eleven close atom contacts, and the misses are not random

Of the 5,672 pairs evaluated, 218 form a close atom contact (3.84%). Of those 218, 20 (9.2%) have a centroid distance above the 8 Å cutoff and are therefore invisible to a centroid-based covariate at that threshold. The most extreme case is K62 to K100: 3.14 Å between the closest heavy atoms, 9.64 Å between centroids. Treating the 8 Å centroid cutoff as a classifier for a real contact gives a sensitivity of 0.908 and a precision of 0.662: the covariate misses roughly one contact in eleven, and about a third of what it does count as a neighbor is not actually in contact.

The miss rate is not uniform. It rises with sequence separation and with the involvement of side chains:

| Contact class | n | missed | miss rate |
|---|---:|---:|---:|
| sequence separation 2-4 | 132 | 7 | 5.3% |
| sequence separation 5-11 | 29 | 3 | 10.3% |
| sequence separation ≥12 | 57 | 10 | 17.5% |
| ≥12 and side-chain to side-chain | 26 | 6 | 23.1% |
| salt bridges (acidic O to basic N, <4 Å) | 2 | 1 | 50% |

The salt bridge row is built on two observations, not a sample. There are exactly two salt bridges in the resolved N-terminal domain, and one of them is missed. That is one miss out of two, and it should be read as exactly that rather than as a 50% rate that would generalize to other salt bridges. The bridge that is missed is R104 to D84: 3.79 Å between the guanidinium nitrogen and the carboxylate oxygen, 9.22 Å between residue centroids. The other salt bridge in the domain, E25 to K91, is captured, at a 6.74 Å centroid distance.

Six long-range side-chain contacts are missed in total: L21-F117, R27-F86, L67-L83, D84-R104, F93-R121, F105-L128. Two of the positions involved, 104 and 121, carry variants described elsewhere as dominant-negative for channel function; this note does not add a new citation for that claim beyond noting the coincidence of position.

Cross-domain contacts, meaning contacts between an N-terminal-domain residue and the rest of the channel, follow the same pattern. R104 has a relative solvent accessibility of 11.7% in the full channel but 32.6% when the N-terminal domain is considered in isolation, consistent with burial against the channel body. Extending the pairwise comparison to N-terminal-domain-versus-rest-of-chain pairs gives 21 close atom contacts across 11 domain residues, of which 2 (9.5%) are missed by the centroid measure, close to the within-domain rate. R104's own cross-domain contact to R179 (3.65 Å atoms, 8.78 Å centroids) is missed; its contact to F186 (3.31 Å, 6.27 Å) is captured.

## Per-residue neighbor counts disagree even where the pairwise picture looks stable

A model does not consume individual pair distances. It consumes a per-residue neighbor count, and that count diverges more than the pairwise miss rate suggests. Recomputed both ways across the domain, contact-based and centroid-based per-residue counts correlate at Pearson r = 0.778 and Spearman ρ = 0.791, with a mean absolute difference of 1.81 neighbors and a maximum difference of 6. Ninety-one of 108 residues, 84%, receive a different neighbor count depending on which definition is used. R104 itself has 6 contact-based neighbors against 8 centroid-based neighbors. The largest disagreements sit elsewhere in the domain: G77 (2 versus 8), I94 (4 versus 9), S106 (5 versus 10), P79 (3 versus 8), and L96 (6 versus 11), all in loop and strand regions where several of the domain's characterized variants are found.

## Swapping in a different single-point summary does not fix this

The obvious fix is to move the summary point, for instance to a side-chain centroid instead of an all-atom centroid. Benchmarked against the same close-atom-contact target, that trade is not favorable:

| Measure | AUC | Sensitivity at 8 Å | Precision at 8 Å |
|---|---:|---:|---:|
| all-atom centroid | 0.993 | 0.908 | 0.662 |
| side-chain centroid | 0.984 | 0.697 | 0.608 |
| Cα-Cα | 0.988 | 0.849 | 0.631 |
| Cβ-Cβ | 0.990 | 0.881 | 0.667 |

Side-chain centroid recovers 9 of the 20 missed contacts, including R104-D84 (9.22 Å falling to 6.76 Å), but it loses ground elsewhere and ends up the weakest of the four measures overall. All-atom centroid remains the best average proxy of the four tested. The problem here is not that the wrong point was chosen to summarize a residue. It is that any single-point summary discards information that only a closest-atom measurement retains, namely whether two residues actually touch.

## Sigmoid weighting softens the miss without closing it

Published models weight neighbors with a smooth distance decay rather than a hard cutoff, so the practical failure is one of weight rather than binary exclusion. Applying a generic logistic weight (midpoint 7 Å, scale 1 Å) to both distance definitions shows the same pattern in continuous form: centroid distance gives a real sub-4 Å contact a mean weight of 0.598 (minimum 0.067), while contact distance gives the same contacts a mean weight of 0.972 (minimum 0.953). For R104-D84 specifically, centroid distance assigns a weight of 0.098; contact distance assigns 0.961, roughly ten times more. As a share of R104's total structural weight, the salt bridge contributes about 1.9% under the centroid definition by this study's own sigmoid computation. Reading the published model's own weights for the same residue puts the same bond at roughly 2.3%, an independent route arriving at a similar order of magnitude. Across the whole domain, the two per-residue covariates correlate at ρ = 0.868, close enough that aggregate model fit could plausibly survive the switch, and far enough apart that individual buried-contact residues are consistently under-weighted.

## Substituting real 8VYJ geometry for residue 104 does not move the R104Q estimate

Reproducing the published pipeline exactly, before changing anything, returns R104Q's shipped values to the digit: structural density feat_dist_w = 0.21811, α_g = 5.233, β_g = 13.767, and a BrS1 penetrance of 0.4264 (90% credible interval 0.267 to 0.593).

Replacing the sequence-distance fallback for residue 104 with the real 8VYJ neighbor geometry, and re-running the full EM, gives:

| | structural density (feat_dist_w) | BrS1 penetrance | 90% credible interval |
|---|---|---|---|
| Baseline (sequence fallback) | 0.2181 | 0.4264 | 0.267-0.593 |
| 8VYJ (real geometry) | 0.2051 | 0.4170 | 0.259-0.583 |
| Difference | -0.013 | -0.009 | |

R104Q's penetrance estimate moves from 42.64% to 41.70%, a shift of 0.9 points. That result holds at every neighbor cutoff tested, 12, 15, 20, and 25 Å, returning 0.417 in each case. The same-residue variants shift in the same small, downward direction: R104W moves from 0.437 to 0.409, and R104G from 0.490 to 0.431.

This is a null, and the salt bridge analysis above explains why. D84 sits at 9.22 Å by residue centroid, so under the covariate definition the model actually uses, the bridge contributes on the order of 0.010 of R104's roughly 0.43 total structural weight, about 2.3%, matching the independent 1.9% to 2.3% estimate from the sigmoid weighting above. A structural detail about one buried contact does not have much room to move a covariate that averages it away in the first place. The correct reading is that the covariate did not transmit the geometry, not that the geometry is unimportant.

## What would overturn this

A few specific observations would change the conclusions here, and it is worth naming them rather than leaving the claim unfalsifiable. If a larger set of salt bridges, drawn from other SCN5A domains or other resolved structures, showed that most salt bridges are in fact captured by an 8 Å centroid cutoff, the one-of-two result here would be revealed as noise from a domain that happens to have only two such bridges, rather than a systematic property of the covariate. If refitting the full EM with closest-heavy-atom distances in place of centroid distances across the whole domain, not just residue 104, left the per-residue influence pattern unchanged, the covariate-definition explanation offered for the null would be wrong and some other factor would need to be found. If removing the pipeline's built-in 10-iteration cap produced a materially different R104Q estimate under the 8VYJ geometry, the stability reported above would not hold as stated. Finally, this analysis uses a single static cryo-EM conformer; if the R104-D84 bridge is not maintained across the channel's accessible conformational range, a comparison across multiple structures or models could change the geometric picture the covariate is being asked to summarize. No such comparison was attempted here.

Two further limits apply to the benchmark itself. The 4.0 Å and 8 Å thresholds are conventional, not derived, and while the qualitative pattern (misses concentrating in long-range side-chain contacts) is not sensitive to small changes in either threshold, the exact counts reported here are. And the side-chain-centroid comparison in the table above uses the same 8 Å cutoff as the all-atom centroid measure for comparability, which is not necessarily that measure's own best-performing cutoff.

## Data availability

The structure used is PDB 8VYJ, chain A, with electron microscopy map EMD-43662, both public accessions. The penetrance model and its code are the public repository kroncke-lab/Bayes_BrS1_Penetrance on GitHub, specifically the files func_dist_seq.R, distance_file, and BrS1_data.RData; no access date is recorded for that repository in the source material used to prepare this note. All derived tables are deposited as a single archive with a permanent identifier. The identifier is
recorded in DATA_DOI.txt alongside this manuscript and should be cited as the data source. They comprise the pairwise geometry table, the per-residue neighbor count table, the per-residue sigmoid weight table, and the recompute output, which holds structural density and penetrance values under both the baseline and 8VYJ geometries.

## Competing interests

I am a heterozygous carrier of SCN5A R104Q (NM_000335.5:c.311G>A, p.Arg104Gln), the variant used as the worked example throughout this note.

## References

1. Biswas et al., 2025. Cryo-EM structure deposited as PDB 8VYJ, chain A; electron microscopy map EMD-43662. No PMID or DOI is given in the source material used to prepare this note.
2. Kroncke lab. Bayes_BrS1_Penetrance. GitHub repository: kroncke-lab/Bayes_BrS1_Penetrance. Files used: func_dist_seq.R, distance_file, BrS1_data.RData. Repository access date not recorded in the source material.