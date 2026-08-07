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
export const SYNC_DATE = "6 August 2026";

// The authoritative copy is SUBMIT_THESE/papers/. CLAUDE.md: "SUBMIT_THESE/
// papers/ is the authoritative copy, it is what the PDFs were built from and
// what was deposited."
export const SOURCE_DIR = "../SUBMIT_THESE/papers";

// status:
//   "in-sync"     local markdown predates the deposit build, so this is the
//                 text behind the identifier
//   "additive"    edited after the deposit, material added, nothing corrected
//   "corrective"  edited after the deposit because the deposited version is
//                 arithmetically wrong
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
    status: "in-sync",
    extra: [
      "**One defect in the deposited data, recorded here because this paper describes it.** The paper says its lead guide has 22 protein-changing predicted off-targets, and its Table 3 lists 22. The summary file in the data deposit, `MS_TABLE3_LEAD_PROTEIN_CHANGING.csv`, still holds the 16 rows of the superseded count, because the paper was corrected and the file was not regenerated. The underlying file the paper points to for full detail, `ABE_CONSEQUENCE_RECHECK.csv`, is complete at 22,717 rows. The defect is in the deposited summary table, not in this text.",
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
      "**No measurement, no criterion, no points total and no conclusion changes.** The variant still scores Likely pathogenic on both scored routes and Uncertain significance is still unsupported. What changes is the note's posture, and it improves it: it is an argument submitted to a panel that exists and is developing the rules that will decide this properly, not a stand-in for an expert judgement that nobody was going to make.",
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
      "**No conclusion in this paper changes.** The measured non-productive fraction of 0.0045 percent and the generous transcript-level upper bound of 5.38 percent are junction and transcript measurements, and the baseline question never touched them. The 1.46-fold requirement is unchanged, and it is worth saying why rather than leaving it looking untouched: the required boost is the ratio of the one-allele level to the measured heterozygous level, so the scale factor cancels out of it. It was right for the wrong reason before and is right for the right reason now.",
    ],
  },
  {
    n: 7,
    slug: "dominant-negative-degeneracy",
    source: "PUBLISH_7_DOMINANT_NEGATIVE_DEGENERACY.md",
    doi: "10.5281/zenodo.21799865",
    forked: true,
    status: "additive",
    additive: [
      "**This copy is ahead of the version of record, and the addition is dated.** On 6 August 2026, after the deposit, Tano et al. 2026 (PMID 41582807) was folded in at six places: one new sentence in the abstract, a provenance note in the methods, a new results section on the Tano family variants p.G833R and p.T1396P, a sixth experimental arm that the abstract's arm count deliberately still does not include, a new limitation, and reference 10. **The record at the identifier above contains none of it.**",
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
    status: "in-sync",
  },
];

const IN_SYNC_NOTE = [
  "**This text matches the version of record, on the evidence available here.** The authoritative markdown was last written on 4 August 2026, before the submission PDFs were built that evening and before the deposit the following day, so nothing in it postdates the identifier above.",
  "**The limit of that claim, stated rather than hidden.** It is an argument from timestamps. The published PDFs have never been downloaded and compared against the local build, so no published text has been read back. `SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md` records what was and was not checked.",
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
      `**What was here before, because nothing on this site is deleted quietly.** Until ${SYNC_DATE} this file was a copy taken before the corrections of 4 August 2026 evening and never resynced, so it served the retired 34.1 percent rescaling of the measured current. Earlier on ${SYNC_DATE} it was given a banner reading "superseded revision, do not cite any figure in it". That banner was an accurate description of a stale file and a poor thing to serve on a research site, so the stale file has been replaced with the authoritative text rather than annotated. The retired rescaling divided the measured 68.3 percent by two; O'Neill 2022's own two-allele control reads 218.4 percent of a single allele rather than 200, so the divisor is 2.184, the baseline is 31.3 percent and the comparator for simple loss of one allele is 45.8 percent.`,
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
