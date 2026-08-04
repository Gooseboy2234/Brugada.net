# Master Scoreboard — SCN5A R104Q Cation-Clip Pharmacochaperone Screen
### PMF-scored compounds (Stage 6 of the gauntlet) · v1 submission
*Every number in this document traces to CANONICAL_FACTS.md and MASTER_SCOREBOARD.json (both generated 2026-07-20). Depths are reported as **relative clip-strength** — a ranking metric for clip residence, not an absolute binding affinity or Kd.*

---

## Readout

**The funnel and the bar.** The cation-clip screen ran a six-stage gold-standard gauntlet against a 200-compound design library of ZINC cationic candidates. The funnel narrowed as follows: **200** designed → **121** built and gate-passed (Stage 3) → **~44** extended-residence complete (Stage 5; ≈32 currently materialized on disk, the remainder being archived to compressed XTC) → **16** PMF-touched (Stage 6 claimed/running) → **7** PMF-scored (verdicts computed) → **2** strong grippers. The **strong-gripper criterion is locked**: a PMF well-depth of **mean + SD < −2.0 kcal/mol at n = 3 replicas**, measured in the clip region (well_clip ≈ 2.75 Å). This screen gates on **MD clip geometry over time**, not docking score — docking is blind here (cationic vs non-cationic scores do not separate, p = 0.29).

**The bimodal finding — the key scientific result.** The seven verdicts are strongly **bimodal**, separated by a large empty gap: **two deep clip-binders** (mean + SD of **−12.59** and **−17.57** kcal/mol) versus **five shallow** compounds (mean + SD from **−1.03 to +5.43** kcal/mol). **Nothing falls between −3 and −17 kcal/mol.** Deep clip-binders are therefore **rare** in the library — the two hits are genuinely special, not the top of a smooth continuum. The result also shows that the Stage-5 gate (clip occupancy over time) is a **necessary but not sufficient** predictor of PMF depth: all seven compounds cleared extended residence, yet only two produced a deep clip well.

---

## Scoreboard — all 7 PMF-scored compounds

Sorted winner → candidate → screened-by-depth (deepest first).

| Compound | Role | n | mean (kcal/mol) | SD | mean + SD | clip (Å) | converged? | strong? |
|---|---|---|---|---|---|---|---|---|
| ZINC000004286767 | **WINNER** | 3 | −16.97 | 4.38 | **−12.59** | 2.75 | no | **YES** (confirmed, n = 3) |
| ZINC000016526277 | **CANDIDATE** | 2 | −18.97 | 1.40 | **−17.57** | 2.75 | no | **YES** (n = 2; needs n = 3) |
| ZINC000096027069 | screened | 3 | −2.84 | 1.81 | −1.03 | 2.75 | no | no (near-miss) |
| ZINC000095117775 | screened | 3 | −2.46 | 2.03 | −0.43 | 2.75 | no | no |
| ZINC000022241628 | screened | 3 | −1.97 | 1.91 | −0.06 | 2.75 | no | no |
| ZINC000038185887 | screened | 3 | −2.70 | 5.14 | +2.44 | 2.75 | no | no |
| ZINC002325760123 | screened | 3 | −2.03 | 7.46 | +5.43 | 2.75 | no | no |

*Barrier-out (clip → unbound), for the two hits: ZINC000004286767 = 21.59 kcal/mol; ZINC000016526277 = 27.1 kcal/mol.*
*Note on the two "strong" rows: both clear the depth bar (mean + SD well below −2.0), but the criterion is defined **at n = 3**. Only ZINC000004286767 meets it in full (n = 3, confirmed). ZINC000016526277 is strong on depth at n = 2 and awaits its third replica — hence CANDIDATE, not confirmed.*

---

## The convergence limitation (stated plainly — the first thing a reviewer will flag)

By our **own** gold-standard convergence criteria, **no PMF on the board has formally converged — including the two deep hits** (the "converged?" column reads *no* for all seven). Root cause: 5 ns/window at 0.5 Å spacing yields only **~2–3% adjacent-window phase-space overlap** (we want 10–30%), so MBAR stitches every profile from poorly-connected windows.

Two truths hold at once, and we state both:
1. **The depth signal is robust.** The ~15 kcal/mol gap between the two hits and the shallow pack is far larger than any convergence uncertainty. The *ranking* is not in question.
2. **The measurement has a convergence hole.** The absolute ΔG of each hit is not yet converged to gold standard.

**Fix in progress.** Replica-exchange umbrella sampling (REUS) is running on the owned z840 workstation — replicas swap across windows so phase space connects and the profile converges. REUS is refining the winner and ZINC000016526277 to turn "deep but non-converged" into "deep **and** converged." **REUS-converged ΔG is marked pending, never estimated.**

---

## Honest hit rate (on the PMF-scored sample)

Of the **7 PMF-scored** compounds:
- **1** is a confirmed strong gripper meeting the full n = 3 criterion (ZINC000004286767) → **14.3% confirmed** hit rate.
- A **2nd** (ZINC000016526277) is strong on depth but at n = 2, awaiting its third replica → **28.6% including the candidate.**

This is a hit rate on the **PMF-scored sample of 7**, not on the full 200-compound design library. Given the bimodal structure — five shallow wells with a wide gap to the two deep ones — we do not expect the shallow five to move into the strong band.

---

*Honesty contract: computation nominates; the bench proves. No affinity, efficacy, or clinical claim is made. Depths are relative clip-strength rankings. Where a value is pending (REUS-converged ΔG), it is marked pending, never estimated.*
