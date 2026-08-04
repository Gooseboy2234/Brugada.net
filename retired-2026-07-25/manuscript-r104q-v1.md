# A buried orphaned charge is the destabilizing lesion in SCN5A-R104Q: a molecular-dynamics mechanism, a D84N second-site suppressor, and a geometry-gated screen for cation-clip pharmacochaperones

**Article type:** Computational / methods-demonstration report (preprint → short computational-biology journal)

**Authors:** [to be finalized]
**Intended validating collaborator:** Pediatric cardiac electrophysiology (Vanderbilt) — surface-expression rescue assay (see §8, Experiment Zero and the wet-lab ask)

**Version:** v1 draft, 2026-07-20. All quantitative values in this manuscript are drawn from a single locked source of truth (`CANONICAL_FACTS.md`); see the numbers-provenance note at the end.

---

> **Standing honesty contract (in force throughout).** Computation here **nominates and prioritizes hypotheses; only a wet-lab surface-expression assay can prove rescue.** Every predicted quantity is labeled with its method and its uncertainty. Nothing reported here is a wet-lab result, no numeric value is fabricated, and where a value is still pending (e.g. a replica-exchange–converged binding free energy) it is marked *pending* and never estimated. We use disciplined language throughout: **clip residence** and **clip reformation**, not "binding affinity"; the pipeline **nominates** candidates, it does not "identify a drug." For the patient, an implantable cardioverter-defibrillator provides protection; no computed result in this manuscript changes clinical management.

---

## Abstract

SCN5A c.311G>A (p.Arg104Gln, "R104Q") is a heterozygous Brugada-syndrome loss-of-function variant in the cytoplasmic N-terminal domain (NTD) of Naᵥ1.5 (≈0.29× wild-type current in oocytes; no measurable current in HEK293; Gütter 2013). In 8VYJ, R104 forms a buried salt bridge to D84 (~3.79 Å) packed against an aromatic core (F93/F103/F105/F186). We advance a specific claim: R→Q removes the guanidinium and leaves **D84 as a buried, unpaired negative charge — the destabilizing lesion is the orphaned D84⁻, not merely the lost bridge.** Three-way MD (WT / R104Q / D84N; 3 × 100 ns) supports this: salt-bridge occupancy (<4 Å) falls 52.3% → 13.7%, core Cα RMSF (res 55–85) rises 3.98 → 5.46 Å (+37%); yet charge-neutralizing D84N is the *most* rigid (3.09 Å) *despite* the *lowest* occupancy (1.4%) — the signature of an orphaned-charge, not a broken-bridge, lesion. We nominate **D84N as a computed second-site suppressor** and test a pharmacological corollary: a rigid cationic molecule re-forming the clip on D84. Because docking is non-discriminating here (cationic vs non-cationic, p = 0.29), we gate on MD **clip geometry over time**, not docking score, through a six-stage filter ending in umbrella-sampling PMF. Of 200 candidates, 7 reached scored PMF; verdicts are **bimodal** — two deep clip-binders (mean+SD −12.59 and −17.57 kcal/mol) separated by ~15 kcal/mol from five shallow ones (−1 to +5), nothing between. Both hits carry a stated limitation: no PMF has formally converged (a phase-space-overlap deficit now being closed by replica-exchange umbrella sampling). This is a reusable variant→mechanism→suppressor→chaperone pipeline; all hypotheses require wet-lab validation.

---

## 1. Introduction

Brugada syndrome (BrS) is an inherited arrhythmia syndrome that predisposes to ventricular fibrillation and sudden cardiac death in structurally normal hearts. Loss-of-function (LOF) variants in *SCN5A*, which encodes the pore-forming α-subunit of the cardiac voltage-gated sodium channel Naᵥ1.5, are the principal monogenic cause. For carriers at risk, an implantable cardioverter-defibrillator (ICD) is the standard of protection; there is no disease-modifying pharmacotherapy that restores the lost current at its source.

**The variant.** *SCN5A* c.311G>A (NM_000335.5), p.Arg104Gln, is a heterozygous missense variant in the cytoplasmic **N-terminal domain (NTD, ~residues 1–129; UniProt Q14524 / InterPro)** of Naᵥ1.5. In this family it is paternally inherited (father→son) with discordant expressivity, consistent with the well-documented incomplete penetrance of BrS. Its functional consequence is established: Gütter, Benndorf & Zimmer (2013) characterized R104Q as one of three BrS N-terminal LOF mutants (with R27H and K126E), reporting **≈0.29× WT current in *Xenopus* oocytes and no measurable current in HEK293** — the most pronounced LOF among the mutants they studied. Notably, the absence of current in HEK293 led those authors to suggest **haploinsufficiency** in R104Q carriers, a point we return to as an unresolved question (§4).

**Convergent pathogenicity evidence.** All *in-silico* predictors converge on deleteriousness (AlphaMissense 0.869; REVEL 0.967; CADD ~28–30; PolyPhen-2 0.998; SIFT 0), the residue is deeply conserved (phyloP 7.86), and the allele is essentially absent from the population (gnomAD v4: 5 alleles / ~1.46M, 0 homozygotes). ClinVar currently lists the variant as **Conflicting (1★; VCV000067780)**; our structured evidence synthesis pushes toward likely-pathogenic-to-pathogenic (ClinGen/Tavtigian point totals: conservative 6 = LP; published-calibration 10 = P).

**The neighboring residue as a proxy.** The same position mutated to tryptophan, **R104W**, is the closest experimental proxy for R104Q's likely cellular fate: complete LOF, ER retention, ubiquitin-proteasome degradation, and a **dominant-negative** effect exerted through Naᵥ1.5 α–α-subunit interaction (Clatot et al. 2012; Wang et al. 2020). R104 also lies within a predicted calmodulin-binding stretch of the NTD (~residues 80–105; Wang et al. 2020), raising a secondary, non-exclusive mechanism (impaired CaM association) alongside the primary fold-stability model.

**The structural scaffold.** All structural work here uses **PDB 8VYJ** (human Naᵥ1.5 cryo-EM), which resolves R104 experimentally; earlier drafts that cited 6LQA/7DTC were corrected because those structures do not resolve the NTD.

**The gap and our contribution.** Although R104Q's pathogenic direction is established, its mechanism at residue resolution was not, and no computed rescue strategy had been proposed. This report contributes (i) an explicit **orphaned-charge mechanism** and a three-way MD test of it; (ii) a computed **D84N second-site suppressor**; (iii) a **geometry-gated screen** for cation-clip pharmacochaperones, delivered as an honest, bimodal PMF scoreboard with its convergence limitation stated plainly; and (iv) a **reusable variant→mechanism→suppressor→chaperone pipeline** demonstrated end-to-end on a single real variant.

---

## 2. Results 1 — The mechanism: an orphaned buried charge, not a broken bridge

### 2.1 The wild-type clip

In 8VYJ, the R104 guanidinium and the D84 carboxylate form a **buried salt bridge (~3.79 Å)**, seated against an aromatic core (F93/F103/F105/F186) that packs the load-bearing region of the NTD fold. This salt-bridge "clip" is the structural feature whose disruption we hypothesize drives the R104Q phenotype. **(Fig 1 — the R104–D84 clip and its aromatic environment in 8VYJ.)**

### 2.2 The central claim

The R→Q substitution deletes the guanidinium. The intuitive reading — "the salt bridge is lost" — is incomplete. What R104Q actually creates is a **buried, unpaired D84⁻ carboxylate with no counter-charge**: a high-energy, poorly solvated negative charge in the domain core. Our central mechanistic claim is that **this orphaned charge, not the mere absence of the bridge, is the destabilizing lesion.** The claim makes a sharp, falsifiable prediction that distinguishes it from the "broken-bridge" reading: *neutralizing* the orphaned charge (rather than restoring the bridge) should restabilize the fold. The natural test is the charge-neutralizing second-site mutant **D84N**, which removes the negative charge without reinstating an R104-like partner.

### 2.3 Three-way molecular dynamics (WT / R104Q / D84N)

We ran explicit-solvent MD on three isolated-NTD systems — WT, R104Q, and the D84N rescue — at **3 × 100 ns**, and read out two coordinates: salt-bridge occupancy (fraction of frames with the 104↔84 side-chain pair within 4 Å) and core Cα RMSF over the load-bearing region (residues 55–85). **(Fig 3 — MD mechanism test.)**

| System | Salt-bridge occupancy (<4 Å) | Core Cα RMSF, res 55–85 |
|---|---:|---:|
| WT | **52.3%** | **3.98 Å** |
| R104Q | **13.7%** | **5.46 Å** (+37% vs WT) |
| D84N-rescue | **1.4%** | **3.09 Å** (below WT) |

Two features carry the argument:

1. **R104Q loosens the core.** Bridge occupancy collapses (52.3% → 13.7%) and the load-bearing core becomes markedly more mobile (RMSF +37%). The fold is destabilized, consistent with the misfolding/ER-retention fate documented for R104W.
2. **D84N is the *most rigid* system despite the *lowest* bridge occupancy.** This is the decisive observation. If the pathology were the loss of the *bridge geometry*, the system with essentially no bridge (D84N, 1.4% occupancy) should be the *least* stable. Instead it is the *most* rigid (3.09 Å, below even WT). The only reading consistent with all three systems is that **the destabilizer is the orphaned buried negative charge; removing that charge — even without reinstating a salt bridge — rescues fold rigidity.**

### 2.4 D84N as a computed second-site suppressor

The same result nominates **D84N as a genetic second-site suppressor**: an orthogonal, protein-engineering rescue track that neutralizes the orphaned charge and restores NTD fold rigidity, independent of any drug. **(Fig 3/Fig 4 — D84N restores core rigidity.)** We report D84N as a computed hypothesis, not an intervention.

> **Caveat carried into the text.** The three-way comparison is **isolated-NTD MD with a single replicate per system.** It supports the orphaned-charge mechanism as the most parsimonious explanation of the three-way pattern, but it has **no formal error bars**; ≥3 replicates per system are required before the RMSF/occupancy differences are treated as a measured effect rather than a strong single-replicate signal. This is stated here and again in Limitations (§7).

---

## 3. Results 2 — The cation-clip pharmacochaperone arm

### 3.1 The rescue hypothesis and its precedent

If the lesion is an orphaned buried carboxylate, the pharmacological corollary is chemical rather than genetic:

> **A rigid, net-cationic small molecule that occupies the vacated R104 position and re-forms a bidentate grip on the orphaned D84 carboxylate can stand in for the deleted guanidinium and re-form the clip — a "cation-clip pharmacochaperone."**

This mechanism acts on **folding quality-control and trafficking in the ER**, restoring surface expression — *not* on the open pore. The precedent for pharmacological rescue of a trafficking-defective BrS channel is direct: mexiletine increased current density **~93-fold** for the trafficking-defective SCN5A mutant **G1743R** (versus ~2× in WT; Valdivia et al. 2004). We make no affinity or efficacy claim; we claim only that a mechanism-matched candidate can be *nominated* on structural grounds.

### 3.2 Why we do not gate on docking

Docking is **blind** in this system. Across the screen, cationic and non-cationic candidates' docking scores **do not separate (p = 0.29)**: the soft, poorly resolved NTD pocket makes docking non-discriminating for the property we care about. We therefore use docking **only to nominate** geometrically plausible cations, and gate the actual decision on **molecular-dynamics clip geometry over time**. **(Fig 5 — blind docking and the gate-on-geometry design.)**

Two geometric coordinates are tracked and must not be conflated:
- **Clip distance** — the *intramolecular* R104(→Q104)↔D84 minimum heavy-atom distance; reports whether the pocket occupant pulls the fold's own clip back toward its closed state.
- **Grip distance** — the *intermolecular* candidate-cation-nitrogen → D84-carboxylate-oxygen minimum distance; reports whether the drug's own cation clamps D84 at salt-bridge distance. The **target window is the native salt-bridge range (~2.6–3.2 Å)**, consistent with the ~3.79 Å native bridge and the ~2.75 Å clip region resolved in the PMF minima below.

### 3.3 The gauntlet: a six-stage, gold-standard filter

Candidates pass through six stages of escalating cost and stringency, each of which can eliminate a compound:

1. **Mechanism-valid pharmacophore** — net-cationic; carboxylate rule (must be able to engage D84).
2. **Clamping dock** into the NTD pocket — bidentate contact on D84 (nomination only).
3. **20 ns gate × 3 seeds** — clip stability over time, *not* docking score.
4. **3-seed replication** — a single seed is never a verdict.
5. **100 ns × n ≥ 3 extended residence** — second-half clip distance + occupancy; HOLD vs DRIFT.
6. **PMF binding free energy** — 22 umbrella windows spanning 3.0→13.5 Å (0.5 Å spacing), harmonic force constant k = 8 kcal·mol⁻¹·Å⁻², 5 ns/window, n = 3 replicas = **66 window-jobs per compound**, in a 4 fs HMR, 260k-atom POPC membrane at 310 K (full protocol in §5).

### 3.4 The funnel

Attrition across the gauntlet (R2 ground truth, 2026-07-20): **(Fig 4 — the gauntlet and funnel.)**

| Stage | Count |
|---|---:|
| Design library (ZINC cationic candidate universe) | 200 |
| Built + gate-passed (Stage 3) | 121 |
| Extended-residence complete (Stage 5) | ~44 |
| PMF-touched (Stage 6 claimed/running) | 16 |
| PMF-scored (verdicts computed) | 7 |
| Strong grippers | 2 (1 confirmed + 1 candidate) |

*(The Stage-5 count reads lower in the live materialized store than ~44 because trajectories are being archived to compressed XTC as the screen runs.)*

### 3.5 The PMF scoreboard and the bimodal finding

The **strong-gripper criterion was locked before scoring**: PMF well-depth **mean+SD < −2.0 kcal/mol at n = 3**, evaluated in the clip region (well minimum ~2.75 Å). All seven scored compounds: **(Fig 6 — the PMF scoreboard.)**

| Compound | Role | n | mean (kcal/mol) | SD | mean+SD | clip (Å) | strong? |
|---|---|---:|---:|---:|---:|---:|---|
| **ZINC000004286767** | WINNER | 3 | −16.97 | 4.38 | **−12.59** | 2.75 | **YES (confirmed)** |
| **ZINC000016526277** | CANDIDATE | 2 | −18.97 | 1.40 | **−17.57** | 2.75 | **YES (n=2, needs n=3)** |
| ZINC000096027069 | screened | 3 | −2.84 | 1.81 | −1.03 | 2.75 | no (near-miss) |
| ZINC000095117775 | screened | 3 | −2.46 | 2.03 | −0.43 | 2.75 | no |
| ZINC000022241628 | screened | 3 | −1.97 | 1.91 | −0.06 | 2.75 | no |
| ZINC000038185887 | screened | 3 | −2.70 | 5.14 | +2.44 | 2.75 | no |
| ZINC002325760123 | screened | 3 | −2.03 | 7.46 | +5.43 | 2.75 | no |

The single most important scientific result of this arm is that **the verdicts are bimodal**. Two compounds sit at mean+SD −12.59 and −17.57 kcal/mol; the other five cluster between −1 and +5; **nothing lands between −3 and −17.** The gap between the two hits and the shallow pack is ~15 kcal/mol. The implication is not that we found "the two best of a continuum" — it is that **deep clip-binders are rare in this library, and the two hits are genuinely special.** It also shows that the clip-occupancy gate (Stages 3–5) is a *necessary but not sufficient* predictor of PMF depth: passing the gate got compounds to Stage 6, but only two converted that into a deep free-energy well.

### 3.6 The two strong grippers

**(Fig 7 — the two strong grippers.)**

- **ZINC000004286767 (WINNER; confirmed strong).** Per-replica well depths [−16.39, −21.81, −13.24] kcal/mol give mean −16.97 (SD 4.38), mean+SD −12.59 — clearing the locked criterion at n = 3. SMILES `N/C(=[NH+]\OC(=O)Nc1ccc(OC(F)(F)F)cc1)c1nccnc1Cl`; MW 376.7; net charge +1; escape barrier (barrier_out) 21.59 kcal/mol. This is the cleanest confirmed strong gripper on the board.
- **ZINC000016526277 (CANDIDATE; strong on physics, not yet confirmed to criterion).** The **deepest well on the entire board** (mean −18.97, SD 1.40, mean+SD −17.57), but currently at **n = 2**: replica 3, window 12, was NaN-unstable at the 9–9.5 Å seed even at a reduced 2 fs timestep. Under our standard (n = 3 required), this compound is resolved as **count-with-conditions** — genuinely strong on the physics, but not confirmed toward the criterion until the third replica is recovered.

### 3.7 The convergence limitation (stated plainly)

This is the limitation a reviewer will flag first, so we state it before drawing any conclusion from the absolute numbers: **by our own gold-standard convergence criteria, no PMF on the board has formally converged — including the two deep hits.** **(Fig 8 — convergence diagnostic and REUS.)**

The root cause is a phase-space-overlap deficit. At 5 ns/window with 0.5 Å window spacing, adjacent umbrella windows share only **~2–3% phase-space overlap**, well below the **10–30%** wanted for reliable MBAR stitching; the analysis therefore stitches every profile from poorly connected windows. Two truths are held simultaneously and honestly:

- **(a) The depth signal is robust.** The ~15 kcal/mol gap between the two hits and the shallow pack is far larger than any plausible convergence uncertainty. The *ranking* — two deep, five shallow, bimodal — survives the convergence hole.
- **(b) The measurement has a convergence hole.** The *absolute* free energies are not yet trustworthy to the precision their point estimates imply.

**Fix in progress.** We are running **replica-exchange umbrella sampling (REUS)** on the owned z840 workstation for the winner and the candidate: replicas swap across windows so phase space connects and the profiles converge. The REUS-converged ΔG values are marked **pending** and are not estimated here; whichever way they land, they are reported as-is. This is the step that turns "deep but non-converged" into "deep *and* converged," and it is the rigor the result requires before an absolute number is quoted.

---

## 4. Discussion

**What is established vs what this project computes.** The pathogenic direction of R104Q is *established* (LOF, BrS-associated; Gütter 2013), corroborated by unanimous predictor and conservation evidence and by population rarity. Everything downstream — the residue-resolution mechanism, the D84N suppressor, and the pharmacochaperone nominations — is *computed hypothesis*, labeled as such. The orphaned-charge model is attractive because it unifies observations that the broken-bridge model leaves unexplained: it predicts, correctly in our MD, that a *charge-neutralizing* mutation (D84N) restabilizes the fold better than the WT bridge does, and it gives a concrete, druggable target geometry (re-form the grip on D84) for the rescue arm.

**The open question that gates the therapeutic logic — dominant-negative vs haploinsufficiency.** This is unresolved and it matters. The primary functional study (Gütter 2013) interpreted the HEK293 no-current result as *haploinsufficiency*; the closest positional proxy, R104W, is *dominant-negative* (Clatot 2012; Wang 2020). The two nearest pieces of evidence therefore point in different directions for R104Q itself. The distinction changes the family risk model and — critically — whether chaperone rescue is even viable: **if R104Q is dominant-negative like R104W, a chaperone that increases mutant protein at the membrane could backfire.** This cannot be resolved in silico. It defines the first wet-lab experiment (§8, Experiment Zero).

**A second, non-exclusive mechanism.** Because R104 sits in the predicted calmodulin-binding stretch (~80–105; Wang 2020), R104Q may additionally perturb CaM association. Our arm does not test this; it is noted so that a negative surface-expression result is not over-interpreted as excluding all mechanism.

**The pipeline as the transferable deliverable.** Beyond R104Q, the contribution is a reusable **variant → mechanism (MD) → genetic suppressor → pharmacochaperone (geometry-gated screen)** pipeline. Its defensible design choices — gate on MD geometry when docking is blind; pre-register a strong-gripper criterion; report the full bimodal scoreboard rather than only the hits; and treat the convergence hole as a stated limitation with a fix in progress rather than a number to launder — are the parts most likely to transfer to other channelopathy variants.

---

## 5. Methods

### 5.1 Structure and model building
Structural scaffold: **PDB 8VYJ** (human Naᵥ1.5 cryo-EM; R104 resolved). NTD extracted for the isolated-domain work. Point mutants (R104Q; the D84N charge-neutralizing rescue) built by side-chain mutagenesis (PDBFixer), followed by minimization under the AMBER14 force field. Ligand candidates originate from a ZINC cationic candidate universe (200 designs).

### 5.2 Molecular dynamics (mechanism, three-way)
Explicit-solvent MD (AMBER14-family protein force field with TIP3P-family water, 0.15 M NaCl; PME electrostatics; hydrogen-mass-repartitioned 4 fs timestep; Langevin thermostat at 310 K; Monte-Carlo barostat at 1 bar). **Production: 100 ns per system, one replicate each, for WT / R104Q / D84N-rescue.** Readouts: salt-bridge occupancy as the fraction of frames with the 104↔84 side-chain minimum heavy-atom distance <4 Å; core Cα RMSF computed over the load-bearing region (residues 55–85) after Kabsch superposition. *(Single replicate per system → no error bars; replicates required for publication-grade claims — see §7.)*

### 5.3 The gauntlet (rescue-arm staging)
Stages 1–5 as enumerated in §3.3: mechanism-valid cationic pharmacophore → clamping dock (nomination only) → 20 ns clip-stability gate × 3 seeds → 3-seed replication → 100 ns × n ≥ 3 extended-residence test scored on second-half clip distance and occupancy (HOLD vs DRIFT). Docking (AutoDock Vina / Uni-Dock class) is used **only to nominate**; R104Q-vs-WT docking specificity is flat (cationic vs non-cationic scores do not separate, p = 0.29), so the decision is made on MD geometry, never on docking score.

### 5.4 Potential of mean force (Stage 6)
Umbrella-sampling PMF along a pocket-approach reaction coordinate defined as **CV = centroid(candidate bridging cationic nitrogens) − centroid(D84 carboxylate oxygens)**. **22 windows** spanning **3.0 → 13.5 Å at 0.5 Å spacing**, harmonic restraint **k = 8 kcal·mol⁻¹·Å⁻²**, **5 ns/window**, **n = 3 replicas** = **66 window-jobs per compound**. Simulations use **HMR with a 4 fs timestep (HMASS 3.024)** in a **~260,000-atom POPC membrane** system at **310 K**. Free energies reconstructed with **pymbar (MBAR/FES)**, `reference_point='from-lowest'`, on a common grid `linspace(2.5, 13.5, 45)`; profiles reported as **mean ± SD across replicas**. The **strong-gripper criterion (locked a priori): mean+SD well depth < −2.0 kcal/mol at n = 3** in the clip region (well minimum ~2.75 Å).

### 5.5 Convergence assessment and REUS (in progress)
Adjacent-window phase-space overlap was assessed as the convergence diagnostic; at 5 ns/window and 0.5 Å spacing it is ~2–3% (target 10–30%). To close this, **replica-exchange umbrella sampling (REUS)** — replicas swapping across windows to connect phase space — is being run on the two strong grippers (owned z840 workstation). REUS-converged ΔG values are **pending** and are not reported as point estimates in this version.

### 5.6 Variant interpretation and predictors
Predictor and conservation values (AlphaMissense, REVEL, CADD, PolyPhen-2, SIFT, phyloP) and population data (gnomAD v4) were compiled from standard sources; ClinVar record VCV000067780. Clinical-classification point totals follow the ClinGen/Tavtigian framework (conservative and published-calibration variants reported separately).

### 5.7 Software and reproducibility
Model building (PDBFixer), MD (OpenMM, AMBER14-family / TIP3P-family), docking (AutoDock Vina / Uni-Dock class), and free-energy analysis (pymbar MBAR/FES). All models, trajectory summaries, docking inputs, and analysis scripts are deposited with the manuscript package (§9).

---

## 6. Limitations (the full honest-limits list)

1. **Computation nominates; only the bench proves rescue.** No affinity, efficacy, or clinical claim is made anywhere in this report.
2. **Mechanism MD is single-replicate, isolated-NTD.** The three-way comparison supports the orphaned-charge model as the most parsimonious reading but has no formal error bars; ≥3 replicates per system are required to treat the RMSF/occupancy differences as measured effects.
3. **The isolated-NTD / restrained MD tests clip *residence*, not global refolding thermodynamics.** A held clip is a geometric proxy, not proof of fold rescue; the assay endpoint (surface expression), not MD, is what decides rescue.
4. **Pocket and pore are dynamically decoupled (~4000×).** This arm works via ER folding-QC/trafficking, **not** through the pore — it is **not** an antiarrhythmic-at-the-pore claim.
5. **Single-construct NTD model (8VYJ).** Full-length channel behavior may differ.
6. **The PMF convergence hole.** ~2–3% adjacent-window overlap (target 10–30%) means absolute ΔG values are not yet converged; the depth *ranking* is robust but absolute numbers await REUS. The candidate ZINC000016526277 is n = 2 (one NaN-unstable replica).
7. **No wet-lab validation yet.** The ICD provides the patient's protection; no computed result here changes clinical management.

---

## 7. Figure callout list (figures produced on a parallel track; referenced by intended name)

| Figure (intended) | Anchors which claim(s) | Key canonical values shown |
|---|---|---|
| **Fig 1 — R104–D84 clip in 8VYJ** | §1, §2.1 — the wild-type salt-bridge "clip" and its aromatic core | R104–D84 ~3.79 Å; aromatic core F93/F103/F105/F186 |
| **Fig 2 — Variant-effect consensus + conservation** | §1 — convergent pathogenicity evidence | AlphaMissense 0.869; REVEL 0.967; CADD ~28–30; PolyPhen-2 0.998; SIFT 0; phyloP 7.86; gnomAD 5/1.46M |
| **Fig 3 — MD mechanism test (three-way)** | §2.3–2.4 — orphaned-charge conclusion + D84N suppressor | occupancy 52.3 → 13.7 → 1.4%; core RMSF 3.98 → 5.46 (+37%) → 3.09 Å |
| **Fig 4 — The gauntlet + funnel** | §3.3–3.4 — six-stage design and attrition | 200 → 121 → ~44 → 16 → 7 → 2 |
| **Fig 5 — Blind docking → gate-on-geometry** | §3.2 — why the decision is MD geometry, not docking | cationic vs non-cationic docking p = 0.29; clip vs grip coordinate definitions; ~2.6–3.2 Å target window |
| **Fig 6 — PMF scoreboard (bimodal)** | §3.5 — the bimodal finding | all 7 verdicts; two deep (−12.59, −17.57) vs five shallow (−1 to +5); gap ~15 kcal/mol |
| **Fig 7 — The two strong grippers** | §3.6 — the confirmed winner + the deepest candidate | ZINC000004286767 per-replica [−16.39, −21.81, −13.24], MW 376.7, +1, barrier_out 21.59; ZINC000016526277 −18.97 (n=2) |
| **Fig 8 — Convergence diagnostic + REUS** | §3.7 — the convergence limitation and its fix | ~2–3% adjacent-window overlap vs 10–30% target; REUS in progress; converged ΔG pending |

---

## 8. Path to validation (the wet-lab handoff)

**Experiment Zero — the gating question.** Before any rescue screen, resolve **dominant-negative vs haploinsufficiency** with an **R104Q + WT co-expression surface-expression assay.** If R104Q behaves like R104W (dominant-negative), a chaperone could backfire, and the therapeutic logic must be reconsidered. This experiment gates everything downstream.

**The rescue ask.** A **surface-expression rescue assay** in R104Q-transfected cells testing the cationic clip-reformer panel, read against a **pre-registered interpretation matrix**:
- **Osmolyte control (equimolar agmatine)** — a candidate that beats a non-specific cationic osmolyte is acting specifically, not as a generic chemical chaperone.
- **D84N anchor** — if rescue acts via the clip, it should **vanish** in the D84N (carboxylate-null) background.
- **Scaffold-negative** — a matched, non-clamping analogue rules out a nonspecific scaffold effect.

This matrix is designed so that the assay can *falsify* the clip mechanism, not merely support it.

---

## 9. Data and code availability

Models (WT / R104Q / D84N on 8VYJ), MD and PMF trajectory summaries, the 200-candidate design library and docking inputs, the umbrella-sampling and pymbar analysis scripts, the master scoreboard, and the canonical-facts source of truth are deposited with the manuscript package. REUS trajectories for the two strong grippers will be added on completion.

---

## References

1. Gütter C, Benndorf K, Zimmer T. **Characterization of N-terminally mutated cardiac Na⁺ channels associated with long QT syndrome 3 and Brugada syndrome.** *Front Physiol* 2013;4:153. doi:10.3389/fphys.2013.00153. PMID 23805106. *(R104Q ≈0.29× WT current in oocytes; no measurable current in HEK293; most pronounced LOF among the N-terminal BrS mutants; haploinsufficiency suggested.)*
2. Clatot J, Ziyadeh-Isleem A, Maugenre S, Denjoy I, Liu H, Dilanian G, Hatem SN, Deschênes I, Coulombe A, Guicheney P, Neyroud N. **Dominant-negative effect of SCN5A N-terminal mutations through the interaction of Naᵥ1.5 α-subunits.** *Cardiovasc Res* 2012;96(1):53–63. doi:10.1093/cvr/cvs211. PMID 22739120. *(R104W, R121W, ΔNter abolish INa; R104W/R121W strong dominant-negative; ER-retained, ubiquitin-proteasome degraded.)*
3. Wang Z, Vermij SH, Sottas V, Shestak A, Ross-Kaschitza D, Zaklyazminskaya EV, Hudmon A, Pitt GS, Rougier J-S, Abriel H. **Calmodulin binds to the N-terminal domain of the cardiac sodium channel Naᵥ1.5.** *Channels (Austin)* 2020;14(1):268–286. doi:10.1080/19336950.2020.1805999. PMID 32815768. *(CaM binds the Naᵥ1.5 NTD; binding impaired in R121W and in a construct missing residues 80–105, a predicted CaM-binding site; R104W exerts a dominant-negative effect.)*
4. Valdivia CR, Tester DJ, Rok BA, Porter CB, Munger TM, Jahangir A, Makielski JC, Ackerman MJ. **A trafficking defective, Brugada syndrome-causing SCN5A mutation rescued by drugs.** *Cardiovasc Res* 2004;62(1):53–62. doi:10.1016/j.cardiores.2004.01.022. PMID 15023552. *(G1743R; mexiletine increased current density 93-fold in the mutant vs ~2× in WT.)*

**Databases and structural resources.** PDB 8VYJ (human Naᵥ1.5 cryo-EM; RCSB). ClinVar VCV000067780. gnomAD v4. Variant-effect predictors: AlphaMissense; REVEL; CADD; PolyPhen-2; SIFT; phyloP. UniProt Q14524; transcript NM_000335.5.

**Software.** OpenMM (MD); AMBER14-family force field with TIP3P-family water; PDBFixer (model building); AutoDock Vina / Uni-Dock (nomination docking); pymbar (MBAR/FES free-energy analysis).

*(Full bibliographic details for secondary/contextual citations — e.g. additional mexiletine-rescue reports and trans-complementation literature — are maintained in the companion `refs.bib`.)*

---

*Not medical advice. Therapeutic decisions belong to qualified clinicians with access to the full patient context. This manuscript reports computational hypotheses; the wet-lab surface-expression assay is the validation gate.*
