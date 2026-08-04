# CANONICAL FACTS — SCN5A R104Q v1 Submission
### Single source of truth. Every document in the package cites ONLY these numbers. Do not invent or round differently.
Generated 2026-07-20 from R2 ground truth + audited artifacts.

## THE GOAL (what this project is)
SCN5A c.311G>A (p.Arg104Gln, "R104Q") is a heterozygous missense variant in the cytoplasmic N-terminal
domain (NTD) of the cardiac sodium channel Nav1.5. It is an experimentally-established Brugada-syndrome
loss-of-function variant, paternally inherited in this family (father->son, discordant expressivity).
PROJECT AIM: (1) characterize R104Q's molecular mechanism at residue resolution; (2) propose rescue
strategies — a genetic second-site suppressor (D84N) and a pharmacological chaperone; (3) computationally
screen for pharmacochaperone candidates that reform the broken structural "clip"; (4) hand a nomination
package to Dr. Prince Kannankeril (Vanderbilt Pediatric Cardiac EP) for wet-lab validation via a
surface-expression rescue assay. "Cure" is the north-star framing; the deliverable is a validated,
mechanism-targeted hypothesis package — computation nominates, the bench decides.

## THE MECHANISM (established by our MD — the orphaned-charge lesion)
- R104 normally forms a BURIED salt bridge to D84 (~3.79 A in 8VYJ cryo-EM), packed against an aromatic
  core (F93/F103/F105/F186), stapling the NTD fold.
- R->Q removes the guanidinium charge, leaving D84 as an ORPHANED BURIED NEGATIVE CHARGE. The destabilizing
  lesion is the orphaned D84(-), NOT merely the lost bridge. This is the project's central mechanistic claim.
- Three-way MD (WT / R104Q / D84N-rescue), 3 x 100 ns:
    * Salt-bridge occupancy (<4 A): WT 52.3% -> R104Q 13.7% -> D84N-rescue 1.4%
    * Core Ca RMSF (res 55-85, load-bearing): WT 3.98 -> R104Q 5.46 (+37%) -> D84N-rescue 3.09 A
    * D84N is the MOST rigid system despite the LOWEST bridge occupancy => confirms orphaned-charge mechanism
  CAVEAT: isolated-NTD MD, single replicate for the 3-way; replicates needed for formal error bars.

## THE RESCUE HYPOTHESIS
A rigid CATIONIC small molecule can occupy the vacated R104 position and re-form the bidentate grip on the
orphaned D84 carboxylate — a "cation-clip pharmacochaperone" — restabilizing the fold and rescuing surface
expression. Precedent: mexiletine rescued the trafficking-defective Nav1.5 Brugada mutant G1743R ~93-fold
(Valdivia 2004). Docking is BLIND here (cationic vs non-cationic scores do not separate, p=0.29) — so we
gate on MD clip GEOMETRY, not docking affinity.

## THE GAUNTLET (gold-standard 6-stage filter)
1. Mechanism-valid pharmacophore (cationic; carboxylate rule)
2. Clamping dock into the NTD pocket (bidentate on D84)
3. 20 ns gate x 3 seeds — clip stability over time (NOT docking score)
4. 3-seed replication (a single seed is never a verdict)
5. 100 ns x n>=3 extended residence — 2nd-half clip distance + occupancy (HOLD vs DRIFT)
6. PMF binding free energy — 22 umbrella windows 3.0->13.5 A (0.5 A), k=8 kcal/mol/A^2, 5 ns/window,
   n=3 replicas = 66 window-jobs/compound; 4 fs HMR (HMASS 3.024), 260k-atom POPC membrane, 310 K.
   CV = centroid(bridge N) - centroid(D84 O). Analysis: pymbar MBAR/FES, reference_point='from-lowest',
   common grid linspace(2.5,13.5,45), mean+/-SD across replicas.

## THE FUNNEL (R2 ground truth, 2026-07-20)
- 200  = design library (ZINC cationic candidate universe)
- 121  = built systems + gate-passed (Stage 3)
- ~44  = extended-residence complete (Stage 5)  [live materialized count lower — trajectories being archived to compressed XTC]
- 16   = PMF-touched (Stage 6 claimed/running)
- 7    = PMF-scored (verdicts computed)
- 2    = strong grippers (1 confirmed + 1 candidate)

## STRONG-GRIPPER CRITERION (locked)
PMF well-depth mean+SD < -2.0 kcal/mol at n=3 (in the clip region, well_clip ~2.75 A).

## RESULTS — the master scoreboard (all 7 PMF-scored, REAL numbers)
| Compound | Role | n | mean (kcal/mol) | SD | mean+SD | clip A | strong? |
|---|---|---|---|---|---|---|---|
| ZINC000004286767 | WINNER | 3 | -16.97 | 4.38 | **-12.59** | 2.75 | YES (confirmed) |
| ZINC000016526277 | CANDIDATE | 2 | -18.97 | 1.40 | **-17.57** | 2.75 | YES (n=2, needs n=3) |
| ZINC000096027069 | screened | 3 | -2.84 | 1.81 | -1.03 | 2.75 | no (near-miss) |
| ZINC000095117775 | screened | 3 | -2.46 | 2.03 | -0.43 | 2.75 | no |
| ZINC000022241628 | screened | 3 | -1.97 | 1.91 | -0.06 | 2.75 | no |
| ZINC000038185887 | screened | 3 | -2.70 | 5.14 | +2.44 | 2.75 | no |
| ZINC002325760123 | screened | 3 | -2.03 | 7.46 | +5.43 | 2.75 | no |

WINNER ZINC000004286767: per-replica [-16.39, -21.81, -13.24]; SMILES N/C(=[NH+]\OC(=O)Nc1ccc(OC(F)(F)F)cc1)c1nccnc1Cl ; MW 376.7; charge +1; barrier_out 21.59 kcal/mol. Cleanest confirmed strong gripper.
CANDIDATE ZINC000016526277: deepest well on the entire board (-18.97); n=2 (rep3 window-12 NaN-unstable at 9-9.5 A seed even at 2 fs); Council resolution = COUNT_WITH_CONDITIONS (genuine strong on physics, not yet confirmed toward criterion because standard requires n=3).

## THE BIMODAL FINDING (key scientific result)
The 7 verdicts are BIMODAL with a large gap: TWO deep binders (-12.59 and -17.57 mean+SD) vs FIVE shallow
(-1 to +5 mean+SD). NOTHING between -3 and -17. Implication: deep clip-binders are RARE in the library;
the two hits are genuinely special, not the top of a continuum. The gate (clip occupancy) is a necessary
but not sufficient predictor of PMF depth.

## THE CONVERGENCE LIMITATION (state plainly — this is what a reviewer flags first)
By our OWN gold-standard convergence criteria, NO PMF on the board has formally converged — including the
two deep hits. Root cause: 5 ns/window at 0.5 A spacing yields only ~2-3% adjacent-window phase-space
overlap (want 10-30%), so MBAR stitches every profile from poorly-connected windows. TWO truths held
simultaneously and honestly: (a) the DEPTH SIGNAL is robust — the ~15 kcal/mol gap between the two hits and
the shallow pack is far larger than any convergence uncertainty; (b) the MEASUREMENT has a convergence hole.
FIX IN PROGRESS: REUS (replica-exchange umbrella sampling) on the owned z840 — replicas swap across windows
so phase space connects and the profile converges. Running on the winner + 526277 to turn "deep but
non-converged" into "deep AND converged." This is the rigor that earns the result respect.

## CLINICAL / VARIANT CONTEXT (verified, cite sources)
- Function: Gutter, Benndorf & Zimmer 2013 (PMID 23805106) — R104Q ~0.29x WT current (oocytes), no
  measurable current (HEK293). One of three BrS N-terminal LOF mutants (with R27H, K126E).
- ClinVar VCV000067780: Conflicting (1*); our evidence synthesis pushes toward Likely Pathogenic ->
  Pathogenic (ClinGen/Tavtigian: conservative total 6 = LP; published-calibration total 10 = P).
- Predictors: AlphaMissense 0.869; REVEL 0.967; CADD ~28-30; PolyPhen-2 0.998; SIFT 0; phyloP 7.86.
- Population: gnomAD v4 — 5 alleles / ~1.46M, 0 homozygotes.
- Neighbor R104W (same position): complete LOF, ER-retained, proteasome-degraded, DOMINANT-NEGATIVE
  (Clatot 2012; Wang 2020) — closest experimental proxy for R104Q's likely cellular fate.
- Structural scaffold: PDB 8VYJ (human Nav1.5 cryo-EM; R104 resolved). NOT 6LQA/7DTC (don't resolve NTD).

## THE D84N GENETIC SUPPRESSOR
Computed second-site suppressor: neutralizing the orphaned charge (D84N) restores NTD fold rigidity (MD:
most-rigid system, above). An orthogonal protein-engineering rescue track, independent of any drug.

## EXPERIMENT ZERO (gating question for the clinician)
Dominant-negative vs haploinsufficiency is UNRESOLVED and materially changes the family risk model and
whether chaperone rescue is even viable. First wet-lab experiment: R104Q + WT co-expression
surface-expression assay. If dominant-negative (like R104W), a chaperone could backfire — must be answered
before a rescue screen.

## THE WET-LAB ASK
Surface-expression rescue assay in R104Q-transfected cells, testing the cationic clip-reformer panel, with
a pre-registered interpretation matrix:
- Osmolyte control (equimolar agmatine) — beats it => specific, not generic chaperone
- D84N anchor — rescue should VANISH if it acts via the clip
- Scaffold-negative — matched non-clamping analogue rules out nonspecific scaffold effect

## HONEST LIMITS (every document must carry these)
- Computation NOMINATES; only the bench PROVES rescue. No affinity/efficacy/clinical claim is made.
- Isolated-NTD MD used CA positional restraints — tests clip RESIDENCE, not global refolding thermodynamics.
- Pocket and pore are dynamically isolated (~4000x weaker coupling) — this arm works via ER folding-QC /
  trafficking, NOT through the pore. Not an antiarrhythmic-at-the-pore claim.
- Single-construct NTD model (8VYJ). Full-length channel behavior may differ.
- PMF convergence hole (above) — being closed by REUS; depth ranking robust, absolute dG not yet converged.
- No wet-lab validation yet. The ICD provides the patient's protection; no computed result changes clinical
  management.

## STANDING HONESTY CONTRACT
Every predicted quantity is labeled with method + uncertainty. Nothing here is a wet-lab result. No numbers
are fabricated. Where a value is pending (e.g. REUS-converged dG), it is marked pending, never estimated.
