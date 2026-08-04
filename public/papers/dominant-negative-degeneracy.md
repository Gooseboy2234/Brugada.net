# Peak current alone cannot separate trafficking arrest from coupled gating in SCN5A dominant-negative variants

**Ethan Bradley**

Independent researcher, no institutional affiliation

ORCID: [0009-0008-8925-7975](https://orcid.org/0009-0008-8925-7975)

## Abstract

Co-expression peak-current measurements cannot distinguish a trafficking-arrest mechanism from a coupled-gating mechanism for dominant-negative SCN5A variants. The reason is algebraic, not a shortage of data. Under Nav1.5 dimerisation (Clatot 2017, PMID 29233994), both mechanisms reduce to the identical form I/I_null = 1 minus f times x, where f is the mutant fraction of the subunit pool and x is either the fraction of coupled channels silenced or the fraction of partnered wild-type channels retained. A measured current constrains only the product, never which mechanism supplies it. I use this to reconcile the two most cited conflicting reports on the N-terminal-domain variant R104W: Clatot 2012 (PMID 22739120) and Wang 2020 (PMID 32815768) never measured the same thing, and their one genuinely overlapping co-expression assay, Wang's endoplasmic reticulum co-localisation experiment, has approximately 27 percent power and its point estimate runs, non-significantly, toward the retention Clatot reported. The real disagreement in this literature concerns R121W, not R104W, and it is statistically genuine: Wang 2020 and O'Neill 2022 (PMID 35305865) differ at z = 4.25, p = 2×10⁻⁵. One N-terminal-domain variant, L96P (PMID 42492110), now carries the discriminating measurement, preserved surface protein together with a dominant-negative effect, and it favours coupled gating. I specify the five-arm, three-readout experiment that would resolve the fork for any single variant, including SCN5A R104Q.

## A key to the terms used here

- **SCN5A** is the gene for the heart's main sodium channel; **Nav1.5** is the protein. **R104Q**,
  **R104W**, **R121W** and **L96P** are variants, named as original amino acid, position, replacement.
- **Peak current** is the largest sodium current measured from a cell, the standard readout in these
  experiments and the quantity this paper argues cannot settle the question on its own.
- **Trafficking** is the cell's delivery of a finished channel to the surface membrane. **Trafficking
  arrest** means the channel is built but never delivered, so it cannot pass current: stock in the
  stockroom rather than on the shelf.
- **Coupled gating** means two channel molecules influence each other's opening and closing, so a
  defective one drags down a healthy partner. Both mechanisms lower peak current, which is why the
  measurement alone cannot separate them.
- **Degenerate** here is used in its mathematical sense: two different mechanisms produce the same
  number, so the number has more than one explanation and cannot identify which is true.
- **Dominant-negative** means the variant copy interferes with the working copy, making the loss worse
  than losing one copy of two.
- **Co-expression** means putting the variant and the normal version in the same cell, as happens in a
  carrier, rather than testing the variant alone.
- **Heterozygous** means carrying one variant copy and one normal copy.
- A **dimer** is a pair of molecules acting as a unit. The **dimer arithmetic** here is the algebra of
  how many pairs form and what each contributes.
- **Statistical power** is the chance an experiment would detect a real effect of a given size. An
  underpowered experiment can miss a real effect, so its negative result does not establish absence.
- **Patch clamp** is the electrical measurement of current through channels in a single cell.
- **PDB 8VYJ** is the public 3D structural model of the channel used here.

## Why a fifteen-year disagreement has not resolved

SCN5A dominant-negative variants reduce sodium current when co-expressed with the wild-type channel, and Brugada syndrome follows. Two mechanisms compete to explain that reduction. Under trafficking arrest, the mutant subunit is retained in the endoplasmic reticulum and drags its wild-type partner back with it, so the deficit is a protein-delivery failure. Under coupled gating, both subunits reach the membrane, dimerise there, and the mutant suppresses its partner's opening, so the deficit is a functional failure at normal protein levels. The distinction is not academic. A trafficking corrector that moves more mutant protein to the surface helps in the first case and delivers more interfering protein in the second. Choosing the wrong mechanism for a given variant points a rescue strategy in the wrong direction.

The published literature on this question looks, at first reading, like a straightforward contradiction between two well-regarded groups. It is not. Section 3 below shows why. Section 4 shows something stronger: no amount of additional co-expression current recording, however carefully controlled, can settle it, because the two mechanisms are algebraically indistinguishable at the level of current alone.

## Methods

**Literature search.** I ran eighteen PubMed queries against PubMed E-utilities, covering every N-terminal-domain SCN5A missense variant with published functional data that I could identify (R104W, R104Q, R121W, Y87C, A124D, R27H, K126E, G35S, E17K, L96P, and N-terminal deletion constructs) crossed against the assay classes capable of bearing on the trafficking-versus-gating question: surface biotinylation, glycosylation-state analysis, endoplasmic reticulum co-localisation, single-channel and gating-current recording, temperature and chemical-chaperone rescue, proximity ligation, FRET or BiFC, iPSC-derived cardiomyocyte recording, and dimerisation assays. This retrieved 305 unique records. I screened 303 abstracts and classified 80 as containing a direct measurement bearing on the fork; eight of those concern an N-terminal-domain variant specifically (PMIDs 19632629, 22529811, 22739120, 26786162, 32815768, 34122134, 42082654, 42492110). Two of the eight bear on the domain but not on this fork and one concerns a compound-heterozygous frameshift; I added O'Neill 2022 (PMID 35305865), which a keyword screen classes as a general dominant-negative survey but which in fact reports R104W and R121W individually. Six papers plus O'Neill yield eleven variant-level measurements. Every PMID cited in this paper was checked against PubMed E-utilities on 2026-07-25; author, journal, year, volume and pages are as returned by that service. The date the original search queries were run is not separately recorded.

This is a bounded search over named queries on a stated date, not an exhaustive one. Clatot 2012's full text was not obtainable: its PubMed Central record is abstract-only and the article itself is paywalled, so statements attributed to it below come from the abstract. Mercier 2015, Pujolas 2026, and a second 2026 paper by Iamshanova and colleagues (PMID 42082654) were likewise read from their abstracts and whatever metadata PubMed E-utilities returns; I did not have full-text access.

**Structural measurements.** Distances were measured on PDB accession 8VYJ, chain A, a cryo-EM structure solved to 3.6 Å resolution (release date not recorded in the source material I worked from), using Biopython's Bio.PDB module with the ShrakeRupley algorithm (module version not recorded), after stripping hydrogens and heteroatoms. These are my own computations, not a value taken from a published table. The Cβ to Cβ distance between residue 96 and residue 104 is 11.0 Å. The dimer interface mapped by Clatot 2017 (PMID 29233994, residues 493-517, first intracellular loop) is unresolved in 8VYJ: the model has a 247-residue gap spanning residues 433 to 681. Measured to the nearest resolved flanking residues, the centroid-to-centroid distance from R104 is 23.4 Å to residue 433 and 32.0 Å to residue 681, but a disordered 247-residue linker could place the true interface almost anywhere relative to R104. Structure, at the current resolution of the available model, cannot place the N-terminal domain at or away from the dimer interface.

**Statistics.** Comparisons between studies use a two-sample z-test on reported mean ± SEM values. Power calculations are two-sided at α = 0.05.

## The algebra: why current alone cannot tell the mechanisms apart

Nav1.5 α-subunits assemble and gate as dimers, and the interaction site maps to residues 493-517 in the first intracellular loop (Clatot 2017, PMID 29233994). Let f be the mutant fraction of the assembly-competent subunit pool. Under binomial pairing, the fraction of wild-type subunits partnered with a mutant subunit is exactly f.

Under coupled gating, a partnered wild-type subunit retains residual activity a, so co-expression current follows I/I_null = 1 minus f times (1 minus a). Under co-retention, a partnered wild-type subunit is pulled from the surface with probability c, so current follows I/I_null = 1 minus f times c.

Both expressions have the same form: I/I_null = 1 minus f times x, with x bounded between 0 and 1. A measured co-expression current constrains only the product f times x. It cannot separate f from x, and it cannot identify which biological process, retention or silencing, supplies x. This is the central negative result of this paper. It is not a limitation of the available studies. It is a property of the observable itself, and no re-analysis of published current percentages, however careful, escapes it.

There is a further correction that any re-analysis must apply before comparing numbers across studies. In a matched-total-DNA co-transfection, the heterozygous arm receives half the wild-type plasmid of a wild-type-alone arm, so the no-dominant-negative null is close to 50 percent of wild-type-alone current, not 100 percent. Wang 2020 measured this directly in their own system: their wild-type plus empty-vector arm reaches 53.9 percent of wild-type alone in one table and 44.3 percent in another, a mean of 49.1 percent. Studies differ in how they handle this. Wang 2020 included a wild-type plus empty-vector reference arm and needs no correction. O'Neill 2022 used a landing-pad system with stable dual integration, in which the wild-type allele is present at equivalent levels in both arms; there the no-effect null genuinely is 100 percent, and their measured two-allele reference reaches 218.4 ± 7.7 percent. Clatot 2018 used a full-dose wild-type-alone reference, so its headline 75 percent reduction, read against the correct roughly 50 percent null, corresponds to near-complete interference rather than an implausibly large effect.

With that correction in hand, the arithmetic still constrains something useful. At f = 0.5, the largest dominant-negative effect a 1:1 dimer can produce is 50 percent of null. Solving for the x each measured variant requires: R104W needs x = 0.61 (O'Neill, 69.6 ± 7.3 percent of null) or x = 0.80 (Wang Table 2, 60.2 ± 13.1 percent); R121W needs x = 0.95 (O'Neill, 52.7 ± 8.4 percent); Y87C needs x = 0.98 (Wang Table 1, 50.9 ± 15.9 percent); L96P and L325R each need x = 1.00, essentially complete interference in every heterodimer. R104Q's magnitude sits at the mild end of this set: an unpublished automated patch-clamp measurement, on a SyncroPatch platform, that I have not been able to independently verify, reports roughly 65 percent of null, which requires only x ≈ 0.70. Whatever the mechanism turns out to be, its size requires nothing unusual.

## Clatot 2012 and Wang 2020 were never measuring the same thing

The apparent contradiction between these two papers dissolves once the methods are read side by side.

Clatot 2012 (PMID 22739120) assayed localisation by immunocytochemistry in rat neonatal cardiomyocytes under co-expression, mutant and wild-type together, and reported that mutant subunits were mostly retained in the endoplasmic reticulum and that co-expression led to wild-type channel retention. This is the correct design for a dominant-negative question, but it is reported qualitatively: no percentage, no co-localisation coefficient, no stated n.

Wang 2020 (PMID 32815768) ran two separate protein experiments with different designs. Their surface biotinylation used 768 ng of a single construct, wild-type or variant alone, with no co-expression arm at all. That measures the mutant's own fate in isolation. It cannot, by construction, speak to whether the mutant affects wild-type trafficking, which is the dominant-negative question, so the widely quoted finding of reduced fully-glycosylated Nav1.5 at the surface describes the mutant alone, not the interference mechanism. Their endoplasmic reticulum co-localisation assay, by contrast, used a genuine co-expression design matching Clatot's cell type: GFP-wild-type plus FLAG-variant plus a calreticulin marker. This is the only Wang measurement that addresses the question Clatot addressed, and it is the sole point of overlap between the two papers.

That overlap does not support the "contested" framing it is usually given. Wang's own numbers for wild-type co-localisation with the endoplasmic reticulum marker are 57.4 ± 9.3 percent for wild-type plus wild-type and 75.1 ± 9.5 percent for wild-type plus R104W, reported as not significantly different. Working from those figures, the difference is 17.7 percentage points, the standard error of that difference is 13.3, giving t = 1.33. Post-hoc power to detect that observed effect is approximately 27 percent, and the minimum difference the design could reliably detect at 80 percent power is 37.3 percentage points. Two things follow. The test could only have resolved an effect roughly twice the size of the one observed, so its null result is a failure to resolve, not evidence of absence. And the point estimate runs in Clatot's direction: 31 percent more wild-type signal in the endoplasmic reticulum when R104W is present. Clatot 2012 and Wang 2020 are not, on this reading, in conflict about R104W. One reports an unquantified positive, the other an underpowered null whose sign agrees. R104W retention has never been quantified in a co-expression design with adequate power, by anyone.

Two smaller inconsistencies in Wang 2020 are worth flagging for anyone quoting its prose rather than its tables. The text states a roughly 55 percent current decrease for wild-type plus R104W relative to wild-type plus empty vector; Table 2 gives 23.1 versus 38.4 pA/pF, a 39.8 percent reduction. The text also reports Y87C's decrease as 25.1 ± 11.0 percent, but 51.1 minus 26.0 equals 25.1 pA/pF, a current-density difference reported as if it were a percentage; the paper's own ratio-based statement elsewhere, roughly 50 percent less, matches a recomputed 49.1 percent. Neither error changes a conclusion, but both propagate if the prose is cited uncritically.

## The genuine disagreement is R121W, not R104W

For R104W, the two quantitative studies agree. O'Neill 2022 reports 69.6 ± 7.3 percent of a single-wild-type-allele reference; Wang 2020's Table 2 reports 60.2 ± 13.1 percent of its own reference. Comparing them gives z = 0.63, p = 0.53. No conflict.

For R121W, three independent measurements disagree, and the disagreement is real. Clatot 2012 reports a strong dominant-negative effect, unquantified. O'Neill 2022 reports 52.7 ± 8.4 percent of the single-wild-type-allele reference, consistent with a dominant-negative effect and consistent with Clatot. Wang 2020's Table 2 reports 46.9 ± 3.4 versus a wild-type plus empty-vector reference of 38.4 ± 3.4 pA/pF, which is 122.1 ± 14.0 percent of reference, no dominant-negative effect at all, and their same experiment finds calmodulin binding impaired for this variant. Comparing Wang against O'Neill directly gives z = 4.25, p = 2×10⁻⁵. This is not a normalisation artefact and not a case of overlapping error bars. It is a genuine three-way disagreement, and Wang 2020 is the minority position among the three measurements.

The practical lesson for citation is that "Clatot 2012 and Wang 2020 disagree about the N-terminal-domain variants" is too coarse to be useful. They agree on R104W's dominant-negative effect. Neither has adequately measured R104W retention. They contradict each other specifically on R121W, where a third independent study sides against Wang.

## L96P: an N-terminal-domain variant with preserved surface protein

Pujolas and colleagues (PMID 42492110, Forensic Sci Int Genet 2026;86:103587), a molecular-autopsy study of SCN5A c.287T>C, p.Leu96Pro, report no measurable current when the variant is expressed alone, a roughly 50 percent reduction of peak current on co-expression with wild-type, cell-surface biotinylation showing preserved total and membrane Nav1.5, and patient-derived iPSC cardiomyocytes with reduced current but no reduction in SCN5A transcript.

L96 sits 11.0 Å (Cβ to Cβ) from R104 in the same beta-core of the same domain, by my own measurement on 8VYJ chain A. This is, to my knowledge, the first surface-preserved dominant-negative variant reported for the N-terminal domain, and it shifts the balance of evidence for this domain toward coupled gating.

Three caveats travel with that conclusion. It rests on a single study. The biotinylation measures total surface protein, not glycoform-resolved protein, and Mercier 2015 (PMID 25721215) established that Nav1.5 exists as two glycoforms, that core-glycosylated channels reach the surface but generate no current, and that dominant-negative effects on wild-type current specifically involve the fully-glycosylated form. A preserved total-surface signal is therefore compatible with a preserved but electrically silent population, and this is the single most important check that the L96P inference has not yet had. Finally, the family in the Pujolas report also carried an additional SCN5A splice-site deletion, which complicates the genotype-phenotype link even though it does not affect the heterologous co-expression result itself.

Set against this, the older Clatot 2012 data point is instructive by contrast: a construct deleting the entire N-terminal domain abolished current yet was still addressed to the membrane, and an isolated N-terminal-domain-only construct doubled current. Losing the domain, on that evidence, is not intrinsically a trafficking lesion.

Weighing the domain-specific evidence at its actual strength rather than by counting citations: retention is supported by one unquantified co-expression imaging result covering both R104W and R121W (Clatot 2012), and coupled gating is now supported by one quantified surface-preserved dominant-negative variant (L96P) plus the surface-resident deletion construct. This is a lean, not a settled conclusion, and both mechanisms remain live.

## The experiment that would break the degeneracy

A degeneracy is only worth reporting if it comes with the measurement that resolves it. That measurement already exists, has already been validated, and has never been applied to an N-terminal-domain variant.

Clatot 2018 (PMID 30118344) ran it on L325R, a domain I to II linker variant, using matched total DNA throughout. Co-expression gave a 75 percent current reduction against a wild-type-alone reference; since the correct no-effect null under matched DNA is close to 50 percent, this corresponds to near-complete interference rather than an implausible super-maximal effect. Surface biotinylation showed L325R itself reaches the surface at 40 percent when expressed alone, and in co-expression, total surface Nav protein was not significantly altered relative to wild-type alone: the trafficking deficit could not account for the current loss. Single-channel recording then supplied the deciding evidence: open probability fell 54 percent, accounting for only about half the whole-cell loss, while double-level, coupled openings fell 85 percent and coupled closings fell 92 percent. Co-immunoprecipitation, DSS crosslinking and blue-native gels confirmed the dimer itself stayed intact throughout. Surface protein preserved, plus open probability and coupling destroyed, together identify coupled gating in a way current alone cannot.

The design needs two negative controls to be interpretable, and both already exist in the published record. R878C (PMID 18616619) carries no current, persists at the membrane, and exerts no dominant-negative effect on co-expressed wild-type: a dead subunit at the surface does not automatically interfere. W822X (PMID 16239976) gives roughly 50 percent current reduction on heterozygous co-expression with no dominant-negative effect at all, the empirical haploinsufficiency benchmark against which any claimed interference should be measured.

The design I would run for R104Q, or for any single variant, has five conditions at matched total DNA, with the wild-type dose held constant across every co-expression arm: wild-type plus empty vector as the reference arm (not wild-type alone at full dose); the variant alone, to measure its own residual current; wild-type plus wild-type, to control for DNA dose and establish the two-allele ceiling; wild-type plus the variant, the question itself; and wild-type plus a loss-of-function variant that is not dominant-negative, W822X or R878C, to make the result interpretable against a known null. Three readouts are needed. Allele-resolved surface protein, with wild-type and mutant differentially tagged and quantified separately, and with glycosylation state resolved by EndoH or PNGase F digestion, since total surface signal alone cannot distinguish a genuinely functional population from a core-glycosylated, silent one. Single-channel recording for open probability and coupled-gating fraction, the Clatot 2018 measurement. And whole-cell current across all five arms, to anchor the new data to the existing literature.

The predictions are far enough apart to be decisive. At an observed roughly 65 percent of null for R104Q, pure co-retention predicts wild-type surface protein falls to about 65 percent of the reference arm's level; pure coupled gating predicts it stays near 100 percent. That is a 35 percentage-point separation, well above the resolution of quantitative immunoblotting. The same separation holds for the other variants in this set: 30 percentage points for R104W, 47 for R121W, 50 for L96P. Every component of this design is published and validated on its own; none of it is novel methodology. It has simply never been assembled and run on a variant from this domain.

## What would falsify this

The degeneracy argument in the algebra section fails if Nav1.5 does not function as a dimer in the system under study, or if mutant and wild-type subunits do not pair according to binomial statistics, for instance through preferential homodimerisation. Both premises are testable, and neither has been excluded in the literature I searched.

The power calculation behind the Wang 2020 endoplasmic reticulum null assumes the reported ± values are standard errors of the mean, as stated, and that the group size is comparable to the electrophysiology groups reported elsewhere in the same paper, n = 5 to 12. The figure legend does not state n for the co-localisation panels specifically; if the true n were substantially larger, the power estimate rises and the argument weakens accordingly.

The L96P inference toward coupled gating fails specifically if the preserved surface signal reported by Pujolas and colleagues is predominantly the core-glycosylated, non-conducting glycoform rather than the fully-glycosylated, current-carrying one. This is the Mercier 2015 confound applied directly, and it is the single most important outstanding check on the newest piece of evidence in this paper.

The overall lean toward coupled gating for this domain reverses if an adequately powered co-expression retention measurement on R104W finds substantial wild-type accumulation in the endoplasmic reticulum. That is, notably, the direction both the qualitative Clatot 2012 result and Wang 2020's underpowered point estimate already point toward, so this is not a remote possibility; it is the most likely single result to overturn the current lean.

Two further limits apply specifically to R104Q. No protein-level or mechanistic co-expression data exist for R104Q at all; everything above reasons from R104W, R121W, Y87C and L96P by structural and positional analogy within the same domain, and R104Q is a different substitution from R104W at the same position, which need not share its mechanism. And structure cannot adjudicate this question either: the dimer interface mapped by Clatot 2017 is unresolved in the best available cryo-EM model of Nav1.5, so the N-terminal domain can be neither placed at, nor excluded from, that interface on structural grounds at present.

## Data availability

This paper draws exclusively on published data retrieved through PubMed E-utilities (accessed 2026-07-25) and on structural coordinates from PDB accession 8VYJ, chain A. No new experimental data were generated. All derived tables are deposited as a single archive with a permanent identifier. The identifier is
recorded in DATA_DOI.txt alongside this manuscript and should be cited as the data source. They comprise the per-study numbers used in the power calculation and the dimer-arithmetic solutions for x. Every one is a reformulation of numbers already published under the PMIDs cited throughout.

## Competing interests

The author is a heterozygous carrier of the SCN5A variant discussed as the motivating example in this paper, p.Arg104Gln.

## References

1. Clatot J et al. Dominant-negative effect of SCN5A N-terminal mutations through the interaction of Nav1.5 α-subunits. Cardiovasc Res 2012;96(1):53-63. PMID 22739120.
2. Wang Z et al. Calmodulin binds to the N-terminal domain of the cardiac sodium channel Nav1.5. Channels (Austin) 2020;14(1):268-286. PMID 32815768.
3. O'Neill MJ et al. Dominant negative effects of SCN5A missense variants. Genet Med 2022;24(6):1238-1248. PMID 35305865.
4. Clatot J et al. Voltage-gated sodium channels assemble and gate as dimers. Nat Commun 2017;8(1):2077. PMID 29233994.
5. Clatot J et al. Mutant voltage-gated Na+ channels can exert a dominant negative effect through coupled gating. Am J Physiol Heart Circ Physiol 2018;315(5):H1250-H1257. PMID 30118344.
6. Pujolas AR et al. Molecular autopsy identifies the NaV1.5 p.Leu96Pro variant causing sodium current loss-of-function in unexplained sudden cardiac death. Forensic Sci Int Genet 2026;86:103587. PMID 42492110.
7. Mercier A et al. Nav1.5 channels can reach the plasma membrane through distinct N-glycosylation states. Biochim Biophys Acta 2015;1850(6):1215-1223. PMID 25721215.
8. Zhang Y et al. Correlations between clinical and physiological consequences of the novel mutation R878C in a highly conserved pore residue. Acta Physiol (Oxf) 2008;194(4):311-323. PMID 18616619.
9. Keller DI et al. A novel nonsense mutation in the SCN5A gene leads to Brugada syndrome and a silent gene mutation carrier state. Can J Cardiol 2005;21(11):925-931. PMID 16239976.