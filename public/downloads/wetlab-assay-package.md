# SCN5A R104Q — bench-ready validation package

**Version:** 1.0 · 20 July 2026  
**Authority:** `CANONICAL_FACTS.md` in the SCN5A R104Q v1 submission package  
**Status:** computational nomination only; no rescue, affinity, efficacy, or clinical claim

## The one-sentence handoff

The computational work nominates an orphaned-D84-charge mechanism, a D84N genetic suppressor, one confirmed strong cation-clip gripper (`ZINC000004286767`), and one conditional candidate (`ZINC000016526277`) for a controlled surface-expression program. The bench decides whether any part of that nomination survives.

## Do this first: Experiment Zero

Before testing rescue, resolve whether heterozygous R104Q behaves as haploinsufficiency or exerts a dominant-negative effect.

### Comparators

1. WT alone
2. R104Q alone
3. WT + R104Q at 1:1 expression

### Readouts

- Surface / total Naᵥ1.5 protein by surface biotinylation plus Western blot, or an extracellular-tag surface ELISA / flow-cytometry assay.
- Peak sodium-current density by patch clamp as the functional readout.

### Locked interpretation

- `WT + R104Q ≈ 50% of WT`: consistent with haploinsufficiency; rescue of R104Q would be straightforwardly additive.
- `WT + R104Q ≪ 50% of WT`: suggests a dominant-negative effect; rescue may still be informative, but the therapeutic logic and assay background change materially.

This result gates the rescue screen. R104W, the closest same-position experimental proxy, is dominant-negative, but R104Q itself remains unresolved.

## The two-compound nomination

### 1. ZINC000004286767 — confirmed primary

- Strong-gripper status: **confirmed at n=3**.
- PMF relative clip-strength, mean + SD: **−12.59 kcal/mol**.
- PMF replicas: **[−16.39, −21.81, −13.24] kcal/mol**.
- Clip position: **2.75 Å**.
- Extended-residence result: **HOLD in 4/4 seeds**.
- Formal charge: **+1**.
- Important limit: the depth ranking is robust, but the absolute ΔG is not formally converged; REUS refinement is pending.

### 2. ZINC000016526277 — conditional backup

- Strong on depth at **n=2**, not confirmed to the locked n=3 rule.
- PMF relative clip-strength, mean + SD: **−17.57 kcal/mol**.
- Clip position: **2.75 Å**.
- Third plain-umbrella replica: incomplete after a NaN-unstable window near 9–9.5 Å, even at a 2 fs timestep.
- Council status: **COUNT_WITH_CONDITIONS**.
- Important limit: REUS-converged ΔG and the third-replica verdict are pending. Structural identity should be pulled from the compound build artifact before procurement; it is not reproduced here because it is not in the canonical fact set.

The seven scored profiles are bimodal: these two deep wells are separated from five shallow profiles by an empty region from approximately −3 to −17 kcal/mol. This is a ranking signal, not a measured affinity.

## Core rescue assay

### Biological system

- Heterologous human Naᵥ1.5 expression system suitable for surface trafficking and sodium-current measurement.
- WT, R104Q, and R104Q/D84N constructs.
- For the clinically relevant background, include 1:1 WT:R104Q after Experiment Zero establishes how that condition behaves.

### Primary endpoint

Quantify surface / total Naᵥ1.5 after chronic compound exposure during the folding and trafficking interval.

### Orthogonal confirmation

Any surface-expression hit must be checked by peak sodium-current density. More protein at the surface without restored current is not functional rescue.

### Dose and assay quality

- Use a lab-selected concentration series appropriate to solubility and cytotoxicity.
- Match vehicle across every condition.
- Include a viability or cytotoxicity counter-screen.
- Pre-register replicate count, exclusion criteria, normalization, and statistical plan before unblinding.

## The three controls that make a positive result interpretable

### Control 1 — generic chaperone / osmolyte comparison

Include an equimolar agmatine comparison. If a nominee outperforms the generic cationic/osmolyte behavior, that supports a specific rather than merely nonspecific stabilization effect.

### Control 2 — D84N anchor

The proposed mechanism requires the D84 carboxylate. Test the compound against R104Q and the R104Q/D84N double mutant.

- Rescue of R104Q but not R104Q/D84N supports a D84-grip-dependent mechanism.
- Similar rescue of both constructs argues for a different or nonspecific mechanism.

### Control 3 — scaffold-negative analogue

Use a matched molecule that does not form the predicted clamp. If the negative analogue rescues as strongly as the nominee, the geometry gate is not identifying the causal determinant.

## Pre-registered interpretation matrix

| R104Q rescued? | R104Q/D84N rescued? | Generic-control result | Interpretation |
|---|---|---|---|
| Yes | No | Nominee outperforms | D84-grip hypothesis supported; proceed to dose-response and patch clamp |
| Yes | Yes | Nominee outperforms | Rescue may be real but is not D84-specific; re-model the mechanism |
| Yes | — | Generic control comparable | Nonspecific chemical-chaperone effect; down-weight the clip mechanism |
| No | — | — | No rescue in the tested conditions; report the negative result and reassess |

## What would falsify the project

- Normal surface delivery of R104Q would falsify the trafficking premise.
- Failure of both nominated compounds across a credible exposure range would falsify the current cation-clip rescue nomination.
- Equal behavior of the scaffold-negative control would falsify the geometry gate as a useful predictor.
- Rescue that persists in R104Q/D84N would falsify D84 grip as the rescue mechanism, even if the empirical rescue itself remained interesting.

## Scope and safety

- The computational model uses an isolated N-terminal-domain construct with Cα restraints; it tests clip residence, not global refolding thermodynamics.
- Pocket and pore are dynamically isolated. This is a folding-quality-control / trafficking hypothesis, not an antiarrhythmic-at-the-pore claim.
- No PMF on the v1 board has formally converged. REUS is in progress on both nominated compounds.
- No wet-lab validation exists.
- Nothing in this package changes clinical management. The patient’s existing clinical plan and ICD provide protection; the computation does not.

## Contact

For structures, simulation provenance, candidate artifacts, or handoff coordination: `tu6788688@gmail.com`.

---

**Honesty contract:** computation nominates; the bench proves. Pending values stay pending, and a clean negative experiment is a useful result.
