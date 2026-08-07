// Provenance headers for the manuscript copies served at /papers/<slug>.md and
// /m/<slug>.html.
//
// Why this file exists. The website's copies of the ten manuscripts forked from
// the authoritative copies in SUBMIT_THESE/papers/ and served the retired 34.1
// percent rescaling for two days. On 6 August 2026 the seven stale files were
// given "do not cite any figure in this" banners, which was honest and a poor
// end state. This file replaces that fix: the site now serves the authoritative
// text, and every copy carries a header saying which Zenodo record is the
// version of record and how this text stands against it.
//
// The decision behind serving the corrected text rather than the deposited text
// is written up in MANUSCRIPT_SYNC_DECISION.md. The short form: the deposited
// text of papers 4 and 6 contains arithmetic that is wrong, and this tree does
// not hold a reliable copy of it anyway, so serving it was never actually an
// option.
//
// Sources for every claim in the notes below:
//   SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md   sections 1, 1.4
//   SUBMIT_THESE/papers/PUBLISH_4_OLIGO_ROUTES.md      its own correction table
//   SUBMIT_THESE/papers/PUBLISH_6_UPREGULATION_CEILING.md   the same
//   CLAUDE.md                                    standing rule 5, the baseline

export const DEPOSIT_DATE = "5 August 2026";
// When the served copies were last regenerated from SUBMIT_THESE/papers/.
// Moved 6 -> 7 August 2026 because the sync ran again; the date is a claim
// about when this copy was taken and it has to move when the copy does.
export const SYNC_DATE = "7 August 2026";
// When the fork between the website copies and the authoritative copies was
// closed. This is NOT the same fact as SYNC_DATE and was pinned separately on
// 7 August 2026: the "until <date> this file was a pre-correction copy"
// paragraph below is about the fork, which ended on 6 August, and re-using
// SYNC_DATE for it would have made that sentence say the site served the
// retired 34.1 rescaling for a day longer than it did.
export const FORK_FIX_DATE = "6 August 2026";

// The authoritative copy is SUBMIT_THESE/papers/. CLAUDE.md: "SUBMIT_THESE/
// papers/ is the authoritative copy, it is what the PDFs were built from and
// what was deposited."
export const SOURCE_DIR = "../SUBMIT_THESE/papers";

// status:
//   "in-sync"     local markdown predates the deposit build, so this is the
//                 text behind the identifier
//   "additive"    edited after the deposit, material added, nothing corrected
//   "corrective"  edited after the deposit because the deposited version is
//                 wrong: arithmetically wrong, self-contradictory, or making a
//                 statement about the world that is untrue
//
// Widened 6 August 2026. It read "arithmetically wrong", which was accurate for
// papers 4 and 6 and became false the same evening. Paper 5's deposited version
// says no SCN5A expert panel exists and one does; paper 10's says four tables
// are in the archive and none of them are; paper 2's contradicts itself on a
// count and prints a build instruction as a section heading. None of those is
// arithmetic, and a status legend that only admits arithmetic is how three of
// them sat under an "in-sync" header saying this text matches the version of
// record.
export const MANUSCRIPTS = [
  {
    n: 1,
    slug: "stability-blindspot",
    source: "PUBLISH_1_STABILITY_BLINDSPOT.md",
    doi: "10.5281/zenodo.21799855",
    forked: true,
    status: "in-sync",
  },
  {
    n: 2,
    slug: "base-editor-specificity",
    source: "PUBLISH_2_BASE_EDITOR_SPECIFICITY.md",
    doi: "10.5281/zenodo.21799850",
    forked: true,
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page.** The version deposited on 5 August 2026 carries five defects, corrected here on 6 and 7 August 2026, after the deposit. *(This header said four until 7 August 2026. A fifth correction was added to the manuscript that day and is described at the end of this note; the count is corrected here rather than left standing.)* Two are the same count twice: Table 2a's protein-changing column read 3, 16, 23, 55 and now reads 5, 22, 34, 71, and section 6.5 read \"16 of which change a protein\" and now reads 22. The deposited paper therefore prints **16 protein-changing sites for the SpG route in Table 2a and 22 for the same route two subsections later**, which is an internal contradiction rather than a divergence from the archive. The corrected column reconciles exactly with the coding-exon column, which never changed. The editable-site columns were always right, so the 6.2-fold PAM-relaxation cost, which is what that section exists to report, does not move.",
      "**The third correction is a new section 3.4.8, and half of it is a defect in a published data file.** `ABE_CONSEQUENCE_RECHECK.csv`, as deposited in `10.5281/zenodo.21799234`, truncates its `recomputed_aa` field at exactly 1,500 characters. Fifty-eight of its 668 call-carrying rows end mid-token, and **1,706 of 8,843 consequence calls, 19.3 percent, are missing from a published file.** The truncated rows are not marked and do not look truncated. Every consequence figure in the deposited paper is therefore a statement about the 7,137 calls the table still prints, and the deposited paper does not say so. This copy says so, in section 3.4.8, in limitation 6.1.11 and in its data availability section. What the table printed for the missing 1,706 is unrecoverable; the producing script is not in the project tree. The same section reports a fourth wrong consequence call, at *KCNQ2* chr20:63,424,178, where p.Arg416Gly, p.Arg406Gly and p.Arg393Gly are really p.Ser416Gly, p.Ser406Gly and p.Ser393Gly. The call is missense under both readings and nothing downstream of the residue label changes.",
      "**The fourth correction is structural, it moves no number, and it is the one a reader can see without opening a data file.** The deposited version prints, as a section heading of a published scientific paper, the line `## Insert into PUBLISH_2_BASE_EDITOR_SPECIFICITY.md as section 3.4.7, immediately after 3.4.6`. That is a build instruction to whoever assembled the manuscript. It was pasted in with the section it introduces, never removed, and deposited; its presence in the deposited PDF was confirmed by downloading that PDF from the Zenodo API on 6 August 2026. The instruction was also never followed, so the deposited version prints section 3.4 in the order 3.4.1, 3.4.2, 3.4.3, 3.4.4, 3.4.6, 3.4.5, and then prints section 3.4.7 twenty-five pages later, after the Discussion has ended. In this copy sections 3.4.5 through 3.4.8 are in numerical order and the instruction line is removed. **Not one word of any section was rewritten**, and the removed line is quoted verbatim in a dated note at the position the displaced sections occupied.",
      "**The fifth correction was added on 7 August 2026, it is the only favourable one, and that is the reason to be most sceptical of it.** New section 3.4.9 answers the question section 3.4.8 raised and stopped at: this paper is deposited under a permanent identifier and rests on a file that cannot be repaired, so what does the truncation actually cost? The truncation is confined to `recomputed_aa`, the per-transcript audit column, and every count in this paper is a site-level count read from `recomputed_worst` and `recomputed_region`, which are separate and untruncated. Every consequence figure was regenerated from those columns and **102 of 102 reproduce**, with the two truncated rows at which a destroyed call could in principle have changed a count adjudicated one by one and shown that it cannot have. **Nothing is repaired**: the deposited file is republished in version 2 byte for byte unchanged, 1,706 consequence calls stay destroyed, and a reader auditing any single call still has nothing to audit. The counts survive and the audit trail does not, and only the first half of that is good news.",
      "**A sixth change in this copy is not a correction and is recorded so it is not mistaken for one.** The four junction-straddling census tables that section 3.4.8 rests on were named as absent from the archive when this copy said the archive did not hold them; they are staged for version 2 and this copy now says so, with the struck sentence left visible. **Version 2 has not been uploaded**, so a reader holding version 1 of `10.5281/zenodo.21799234` will not find them.",
      "**One further defect in the deposited data, recorded here because this paper describes it.** The paper says its lead guide has 22 protein-changing predicted off-targets and its Table 3 lists 22. The summary file in the data deposit, `MS_TABLE3_LEAD_PROTEIN_CHANGING.csv`, still holds the 16 rows of the superseded count, because the paper was corrected and the file was not regenerated. That defect is in the deposited summary table, not in this text. *(This paragraph previously ended by calling `ABE_CONSEQUENCE_RECHECK.csv` complete at 22,717 rows. The row count is right and the word complete was wrong, and it was corrected here on 6 August 2026: the file has 22,717 rows and is missing 19.3 percent of its consequence calls, as set out above. A sentence that states a true row count and infers completeness from it is exactly the failure mode this project keeps finding, so it is corrected in place rather than deleted.)*",
      "**No conclusion, risk tier, editor route, sequencing-panel entry or recommendation changes.** Two of the four corrections make the negative result larger rather than smaller.",
    ],
  },
  {
    n: 3,
    slug: "clinvar-functional-evidence",
    source: "PUBLISH_3_CLINVAR_FUNCTIONAL_EVIDENCE.md",
    doi: "10.5281/zenodo.21799857",
    forked: true,
    status: "in-sync",
  },
  {
    n: 4,
    slug: "oligo-routes",
    source: "PUBLISH_4_OLIGO_ROUTES.md",
    doi: "10.5281/zenodo.21799859",
    forked: true,
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page.** The version deposited on 5 August 2026 contains thirteen figures that are wrong. They were corrected here on 6 August 2026, after the deposit. The deposited paper had been half corrected: its rescue-arithmetic anchor sentence carried the corrected baseline of 31.3 percent and the corrected comparator of 45.8 percent, while its tables and every figure derived from them still held values computed from the retired 34.1 baseline and the retired 50 percent comparator. Reading a corrected baseline against a retired comparator is a third wrong answer, not a partial fix, and that is what the deposited version does.",
      "**One deposited entry was wrong on its own terms as well.** In Table 2, the 90 percent row of the merely non-functional bystander column reads 9.5. That value omits the dominant-negative penalty; even on the retired anchors it should have read 7.9. It is an arithmetic error in the record as deposited, independent of the baseline question.",
      "**No conclusion in this paper changes.** Every corrected figure is worse for the therapy than the figure it replaces, so the negative result is strengthened rather than weakened. The paper's own dated correction table, under its limitations, lists all thirteen changed figures with the arithmetic for each, and a methods paragraph now derives all three anchors from the measured 68.3 and 218.4 rather than asserting them.",
    ],
  },
  {
    n: 5,
    slug: "r104q-reclassification",
    source: "PUBLISH_5_R104Q_RECLASSIFICATION.md",
    doi: "10.5281/zenodo.21799861",
    forked: false,
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page.** The version deposited on 5 August 2026 states, in two places, that no SCN5A expert panel exists to arbitrate this classification. **That is false.** The ClinGen Sodium and Calcium Channel Arrhythmia Variant Curation Expert Panel has SCN5A as its scope, completed the first of ClinGen's four expert-panel steps in March 2025, lists 27 members and is chaired by Andrew Glazer PhD. It was corrected here on 6 August 2026, after the deposit. The true and narrower statement, which the deposited note's own registry evidence supported, is that no released criteria specification covers SCN5A, so there is no expert-panel rule set to apply.",
      "**How the error arose, because that is the instructive part.** ClinGen's Criteria Specification Registry and Evidence Repository were queried on 26 July 2026 and both correctly returned nothing for SCN5A. Those two resources record released specifications and expert-panel-classified variants; neither records whether a panel has been formed, and a panel that has completed step 1 of four has produced neither. An absence of a specification was read as an absence of a panel. The deposited note even checked that the empty result was not a broken query, by confirming the same tools returned records for other genes — a control that tests whether the question was asked properly and cannot test whether the right question was asked.",
      "**A second false statement in the deposited version, found the day after the first and dated 7 August 2026.** Its data availability statement said three kinds of derived table were deposited: the recomputed statistics, the paralogue alignment counts, and the baseline-recalibration figures. **Version 1 of the archive held one of the three.** `NTD_PARALOG_CONSERVATION.csv`, the paralogue alignment counts, was there; the recomputed statistics and the baseline-recalibration figures were not. This is the same defect class as paper 10's and one degree less severe, and it is the one kind of claim a reader cannot check except by downloading the archive and finding nothing there.",
      "**Both missing tables were regenerable and both were regenerated, rather than the statement being quietly narrowed to fit what was there.** They are arithmetic over published summary values, and this note's own Methods already record that the recomputation was done by hand from reported summary statistics with no software version, so there was no script to lose. `p5_regen_statistics.py`, written 7 August 2026 from the method as this note states it, **reproduces all 32 quantities the note prints**, and `P5_RECOMPUTED_STATISTICS.csv` and `P5_BASELINE_RECALIBRATION.csv` are staged with it, with its verification output `P5_VERIFICATION_OUTPUT.txt` and a provenance note `P5_REGENERATION_NOTE.md`. **Nothing has been uploaded**, so at the moment of writing the archive still holds only the one table. Two limits are stated rather than left to be discovered: the para-SAME sweep across 5,559 ClinVar variants is not deposited and is not claimed to be, and `P5_BASELINE_RECALIBRATION.csv` withholds raw per-cell values for 45 of its 51 rows because O'Neill's Supplementary Table 1 is a third party's table this archive should not redistribute in full.",
      "**One correction in this copy is against an earlier version of this copy, not against the deposit, and it is recorded because the pattern repeated.** The first rewrite of the abstract said the expert panel \"is developing\" a criteria specification, while the body of the note says in terms that active drafting is an inference from a completed step 1 and an uncompleted step 2 rather than something the source asserts. **The abstract asserted as fact what the body labelled an inference, and the abstract is what most readers see.** It now states only the published status. The original error was reading an absence of output as an absence of a body; the abstract then read a completed step 1 as active drafting. Both are the same move, treating what a source permits as what a source states.",
      "**No measurement, no criterion, no points total and no conclusion changes.** The variant still scores Likely pathogenic on both scored routes and Uncertain significance is still unsupported. What changes is the note's posture, and it improves it: it is an argument submitted to a panel that exists, not a stand-in for an expert judgement that nobody was going to make.",
    ],
  },
  {
    n: 6,
    slug: "upregulation-ceiling",
    source: "PUBLISH_6_UPREGULATION_CEILING.md",
    doi: "10.5281/zenodo.21799863",
    forked: true,
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page.** The version deposited on 5 August 2026 contains seven figures that are wrong. They were corrected here on 6 August 2026, after the deposit. The deposited paper carried the corrected baseline of 31.3 percent throughout and paired it with the retired comparator of 50 percent throughout. The worst of the results, 36.0 percent for the ceiling and 51.2, 68.2 and 85.2 percent in the boost table, are the retired 34.1 baseline multiplied out, sitting in a table whose own column header reads 31.3. A reader checking the arithmetic from the printed anchor got a different answer from the printed result.",
      "**A second correction, and this one is worse than the arithmetic above.** The deposited version's data availability statement said this paper's derived tables were in the shared archive and named three of them: the per-sample junction and transcript classifications, the transcript biotype table, and the headroom calculations. **The archive at `10.5281/zenodo.21799234` contained none of the three.** It held no GTEx junction file, no transcript classification, no biotype table and no headroom table, and its own README had no section for this paper. That is a statement a reader cannot check except by downloading the archive and finding nothing there. It was found in an audit of all eleven papers' data availability statements on 6 August 2026, which found the same class of defect in six of them.",
      "**Three of the four tables were not lost, and the fourth had the same defect as this paper.** `SCN5A_SPLICING_MEASUREMENT.csv`, `jx_classification.csv` and `ensembl_tx_biotypes.csv` were saved by the original pipeline on 4 August 2026 and simply never copied into the deposit; all three are staged for version 2. The fourth, the headroom table, existed on disk **carrying the retired 34.1 and 50 anchors that the first correction above withdraws**, so it was recomputed from 31.3, 45.8 and 100 and staged as `UPREGULATION_HEADROOM_CORRECTED.csv`. The retired file is neither deleted nor deposited. Every quantity printed in the paper was then recomputed from the deposited files by `p6_verify_and_headroom.py`, and **116 of 119 reproduce at the precision printed.** The three that do not are recorded in the paper rather than quietly adjusted, and the largest of them is a misattributed Mann-Whitney p-value that **understated this paper's own result**.",
      "**No conclusion in this paper changes.** The measured non-productive fraction of 0.0045 percent and the generous transcript-level upper bound of 5.38 percent are junction and transcript measurements, and the baseline question never touched them. The 1.46-fold requirement is unchanged, and it is worth saying why rather than leaving it looking untouched: the required boost is the ratio of the one-allele level to the measured heterozygous level, so the scale factor cancels out of it. It was right for the wrong reason before and is right for the right reason now.",
    ],
  },
  {
    n: 7,
    slug: "dominant-negative-degeneracy",
    source: "PUBLISH_7_DOMINANT_NEGATIVE_DEGENERACY.md",
    doi: "10.5281/zenodo.21799865",
    forked: true,
    // Changed from "additive" to "corrective" on 7 August 2026, and the change
    // matters more than it looks. "additive" asserts that nothing in the
    // deposited version is wrong, only that it is less complete. That stopped
    // being true when this paper's data availability statement was audited.
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page.** The version deposited on 5 August 2026 says this paper's derived tables are in the shared data archive and names two: the per-study numbers used in the power calculation, and the dimer-arithmetic solutions for *x*. **The archive at `10.5281/zenodo.21799234` contained neither, nor any other file belonging to this paper.** That is a statement a reader cannot check except by downloading the archive and finding nothing there. It was found in an audit of all eleven papers' data availability statements on 6 August 2026, which found the same class of defect in six of them.",
      "**No saved output of either calculation exists anywhere**, because the tables were assembled to write the paper and never written to disk. **Both were regenerated from first principles rather than reconstructed from the paper**, which is possible here in a way it is not for most papers, because everything in them is closed-form arithmetic over published summary statistics and the method is fully stated in the Methods. `p7_power_and_dimer.py` also recomputes the three structural distances from the public 8VYJ chain A coordinates. The regeneration reproduces **36 of the 38 quantities this paper prints**, at the precision printed, including every solved *x*, both cross-study z-tests and all four structural measurements. **The two that do not reproduce exactly are rounding propagations, and both are named in the paper rather than quietly adjusted**: a minimum detectable difference printed as 37.3 percentage points that recomputes as 37.245 from the unrounded standard error, and a z of 4.25 that recomputes as 4.258. Neither changes an argument.",
      "**One thing the regeneration sharpened, and it cuts this paper's own way.** The post-hoc power of about 27 percent for Wang's endoplasmic-reticulum null is a normal approximation, reproducing as 26.5 percent. The exact non-central *t* at the group sizes this paper itself assumes gives **21.7 to 24.7 percent**. The printed figure is therefore the generous one, so the argument it supports, that Wang's null is a failure to resolve rather than evidence of absence, is if anything understated by it.",
      "**Separately, this copy is also ahead of the version of record, and that addition is dated.** On 6 August 2026, after the deposit, Tano et al. 2026 (PMID 41582807) was folded in at six places: one new sentence in the abstract, a provenance note in the methods, a new results section on the Tano family variants p.G833R and p.T1396P, a sixth experimental arm that the abstract's arm count deliberately still does not include, a new limitation, and reference 10. **The record at the identifier above contains none of it.** *(Until 7 August 2026 this header described the paper as additive only, meaning ahead of its record with nothing corrected. That was true when written and was falsified by the data availability audit, so it is corrected here rather than left standing.)*",
      "**No conclusion changes, and the new limitation cuts against this paper rather than for it.** It is repeated here rather than left buried: Tano's own claim is that phenotypic severity is independent of dominant-negative and coupled-gating status, which if true means resolving the mechanism buys less clinical information than this paper's framing implies.",
    ],
  },
  {
    n: 8,
    slug: "mechanism-elimination",
    source: "PUBLISH_8_MECHANISM_ELIMINATION.md",
    doi: "10.5281/zenodo.21799867",
    forked: true,
    status: "additive",
    additive: [
      "**This copy is ahead of the version of record, and the addition is dated.** On 6 August 2026, after the deposit, Tano et al. 2026 (PMID 41582807) was folded in at six places: a requirement sharpened in the Part 4 discussion, a bullet in the evidence list, a new subsection on what Tano adds and the one thing it takes away, a trafficking paragraph that constrains the class rather than this variant, a limitation, and reference 9. **The record at the identifier above contains none of it.** No conclusion changes.",
    ],
  },
  {
    n: 9,
    slug: "ntd-vus-resource",
    source: "PUBLISH_9_NTD_VUS_RESOURCE.md",
    doi: "10.5281/zenodo.21799869",
    forked: false,
    status: "in-sync",
  },
  {
    n: 10,
    slug: "penetrance-covariates",
    source: "PUBLISH_10_PENETRANCE_COVARIATES.md",
    doi: "10.5281/zenodo.21799871",
    forked: false,
    status: "corrective",
    corrective: [
      "**Warning, and it points at the published record rather than at this page. This is the most serious defect found in the set, because it is a statement about the world rather than a wrong number.** The data availability statement in the version deposited on 5 August 2026 told readers that this note's derived tables were deposited in the project's data archive, `10.5281/zenodo.21799234`, and named four of them: the pairwise geometry table, the per-residue neighbour count table, the per-residue sigmoid weight table, and the recompute output. **None of the four were in that archive.** Of the ten papers that archive supported, this note was the only one with no file in it of any kind. A reader who downloaded the archive to check these numbers found nothing to check, and nothing to explain the absence. A wrong number can be caught by recomputing it; a false data availability statement can only be caught by downloading the archive and finding nothing there, and having found nothing, the reader cannot tell whether the archive is wrong, the paper is wrong, or they are looking in the wrong place.",
      "**It was not a filename error and it could not be fixed by locating the files.** The code that produced the originals is not in the project's file tree and is not on its compute host. Both were searched on 6 August 2026 and returned only third-party library files: there is no `.R` file and no R installation on either machine. This note's own Methods already record that the software used \"is not recorded in the source material\".",
      "**Three of the four tables were regenerated and the fourth is declared missing.** The pairwise geometry, per-residue neighbour count and per-residue sigmoid weight tables are pure geometry over a public structure, PDB 8VYJ chain A, and the method is fully specified in this note. They were regenerated on 6 August 2026 by `p10_regen_geometry.py`, written from the note's stated method, and **thirty-five of the thirty-seven quantities printed in this note reproduce exactly** from them: every distance, every AUC, every correlation and every per-residue count named in the text. One deviation is recorded rather than silently adjusted: side-chain-centroid precision at 8 Å reproduces as 0.606 against the 0.608 printed, a single borderline pair. **The fourth table, the recompute output, cannot be produced and is declared missing rather than promised**, because it requires the kroncke-lab `Bayes_BrS1_Penetrance` R pipeline and a refit of its expectation-maximization step. The regenerated tables and the script are staged for version 2 of the archive and **have not been uploaded**, so at the moment of writing the archive at that identifier still holds nothing for this note.",
      "**Two defects in the note itself were found by that reproduction, and both cut against its own argument.** First, the resolved N-terminal domain contains **four** salt bridges, not two: under the definition this note states in its own table, acidic oxygen to basic nitrogen below 4 Å, it holds R14-E78 at 3.18 Å, E25-K91 at 3.01 Å, E30-R34 at 2.79 Å and D84-R104 at 3.79 Å. The two that were not counted are both captured by the 8 Å centroid cutoff, so the finding that D84-R104 is missed stands and the denominator does not. The miss-rate table's salt-bridge row moves from 2 / 1 / 50% to 4 / 1 / 25%, and the abstract with it. Second, the per-residue neighbour counts include cross-domain contacts and the deposited version did not say so; counting only within the domain gives Pearson r = 0.756 and Spearman ρ = 0.779 against the 0.778 and 0.791 printed, so **none of those figures is reproducible from the method as the deposited version stated it.** This copy states the rule.",
      "**No conclusion in this note changes.** The centroid covariate still misses one close contact in eleven, the misses still concentrate in long-range side-chain contacts, R104-D84 is still among them, and substituting the real 8VYJ geometry still moves the R104Q penetrance estimate by only 0.9 points. The null result is untouched.",
    ],
  },
];

const IN_SYNC_NOTE = [
  "**This text matches the version of record, on the evidence available here.** The authoritative markdown was last written on 4 August 2026, before the submission PDFs were built that evening and before the deposit the following day, so nothing in it postdates the identifier above.",
  "**The limit of that claim, stated rather than hidden.** It is an argument from timestamps, and for this paper it is still only that. *(This paragraph used to say that no published PDF had ever been downloaded and no published text read back. That was true when it was written and stopped being true on 6 August 2026, so it is corrected here rather than left standing.)* The published files of the divergent papers **were** downloaded from the Zenodo API on 6 August 2026 and diffed against the local text, which is what turned that divergence from an inference into a measurement. **This paper was not among them.** It is one of the copies believed unchanged on the strength of local modification times, which is the same class of inference the download exercise was run to replace. `SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md` records what was checked, and `SUBMIT_THESE/V2_STAGING/evidence/DIVERGENCE_VERIFIED_20260806.md` records what was not.",
  "**A separate limit, and it is not about this text.** Six of the ten papers name deposited tables that the archive does not hold, in whole or in part. Paper 10's case was the worst and has been dealt with; the others have not. Do not assume this paper's data availability statement is true of the archive without checking it. The audit is `SUBMIT_THESE/PAPER_10_DATA_STATEMENT_FIX.md`.",
];

const TAIL_DIVERGENT = [
  "**No version 2 has been deposited, and nothing has been uploaded.** The identifier above still resolves to the 5 August text. If a figure on this page disagrees with the same figure at that identifier, this page is the corrected one. The full divergence, and what a version-2 deposit would have to include, is recorded in `SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md`.",
];

// The header is generated, not hand written, so that ten files cannot drift
// from each other again. Everything between the two markers is replaced on
// every sync; scripts/check-site-rules.sh verifies that what follows the
// closing marker is byte identical to the authoritative source file.
export const OPEN_MARKER = "<!-- provenance: generated by scripts/sync-manuscripts.mjs, do not edit -->";
export const CLOSE_MARKER = "<!-- /provenance -->";

function wrap(paragraphs) {
  return paragraphs.map((p) => `> ${p}`).join("\n>\n");
}

export function header(m) {
  const url = `https://doi.org/${m.doi}`;
  const parts = [];

  parts.push(
    `**Version of record: ${m.doi}, published ${DEPOSIT_DATE}.** That identifier is the citable address for this paper and it resolves at ${url}. It is a version identifier; Zenodo minted a second one that resolves to all versions, and the version identifier is the one to cite.`,
  );

  parts.push(
    `**What this file is.** This project's authoritative copy of the manuscript, \`SUBMIT_THESE/papers/${m.source}\`, which is the file the deposited PDF was built from. Synced ${SYNC_DATE} by \`scripts/sync-manuscripts.mjs\`, which copies the source byte for byte and prepends this note. Nothing in the manuscript below has been rewritten for the website.`,
  );

  if (m.forked) {
    parts.push(
      `**What was here before, because nothing on this site is deleted quietly.** Until ${FORK_FIX_DATE} this file was a copy taken before the corrections of 4 August 2026 evening and never resynced, so it served the retired 34.1 percent rescaling of the measured current. Earlier on ${FORK_FIX_DATE} it was given a banner reading "superseded revision, do not cite any figure in it". That banner was an accurate description of a stale file and a poor thing to serve on a research site, so the stale file has been replaced with the authoritative text rather than annotated. The retired rescaling divided the measured 68.3 percent by two; O'Neill 2022's own two-allele control reads 218.4 percent of a single allele rather than 200, so the divisor is 2.184, the baseline is 31.3 percent and the comparator for simple loss of one allele is 45.8 percent.`,
    );
  }

  if (m.status === "in-sync") parts.push(...IN_SYNC_NOTE);
  if (m.status === "additive") parts.push(...m.additive, ...TAIL_DIVERGENT);
  if (m.status === "corrective") parts.push(...m.corrective, ...TAIL_DIVERGENT);
  if (m.extra) parts.push(...m.extra);

  parts.push(
    `**None of this is peer reviewed, and none of it has been through a wet lab.** No cell has been edited and no current has been recorded for this variant by this project. Every therapeutic statement in the manuscript below is a prediction.`,
  );

  return [
    OPEN_MARKER,
    "> ---",
    ">",
    wrap(parts),
    ">",
    "> ---",
    CLOSE_MARKER,
    "",
    "",
  ].join("\n");
}
