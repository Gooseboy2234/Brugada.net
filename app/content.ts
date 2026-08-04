// Single source of truth for every fact and number on this site.
//
// Rule from WEBSITE_BRIEF.md: every number gets a source with an identifier.
// If a value is not sourced here, it does not go on a page.
//
// Source hierarchy inside WEBSITE_HANDOFF/, because its documents disagree
// with each other and some are stale:
//   1. science/WHY_THIS_MATTERS.md   authoritative on framing and comparator
//   2. science/MODALITY_COMPARISON.md   authoritative on routes (nine, 2026-08-04)
//   3. science/OFFTARGET_REFINEMENT.md  supersedes BASE_EDITING_DESIGN.md on
//      every off-target count, including the nearest protein-changing site
//   4. protocols/EXPERIMENT_PROTOCOLS.md  authoritative on the two experiments
// Explicitly NOT used: science/CURE_ROUTE_MAP.md (stale, seven routes, calls
// base editing "not ours"), and STATE_OF_THE_UNION.md section "Reason 3"
// (carries the defibrillator-comparator sentence WHY_THIS_MATTERS corrects).

export const SITE = {
  domain: "brugada.net",
  url: "https://brugada.net",
  author: "Ethan Bradley",
  orcid: "0009-0008-8925-7975",
  orcidUrl: "https://orcid.org/0009-0008-8925-7975",
  updated: "2026-08-04",
};

export const VARIANT = {
  gene: "SCN5A",
  protein: "p.Arg104Gln",
  short: "R104Q",
  coding: "c.311G>A",
  transcript: "NM_000335.5",
  genomic: "NC_000003.12:g.38630392C>T",
  build: "GRCh38",
  clinvar: "VCV000067780",
  clinvarId: "67780",
  clinvarUrl: "https://www.ncbi.nlm.nih.gov/clinvar/variation/67780/",
  protein_db: "UniProt Q14524",
};

// The measurement the whole site rests on.
// O'Neill et al. 2022, Supplementary Table 1, read from the open preprint.
// Sleeping Beauty genomic integration, so wild type is undiluted and a variant
// with no interference would read 100 percent of a single working copy.
export const MEASUREMENT = {
  heterozygous: 68.3,
  heterozygousSd: 6.1,
  cellsHet: 34,
  homozygous: 0.4,
  homozygousSd: 0.2,
  cellsHom: 22,
  rescaled: 34.1,
  simpleLoss: 50,
  gapPoints: 15.9,
  source: "O'Neill et al., Genet Med 2022",
  pmid: "35305865",
  pmidUrl: "https://pubmed.ncbi.nlm.nih.gov/35305865/",
  preprintDoi: "10.1101/2021.09.22.461398",
};

// The correction in WHY_THIS_MATTERS.md. This governs every statement on the
// site about who a therapy would be for.
export const COMPARATOR = {
  inappropriateShockPct: 20,
  annualRatePct: 4.7,
  studies: 63,
  patients: 4916,
  meanAge: 39,
  meanAgeSd: 15,
  source: "Olde Nordkamp et al., Heart Rhythm 2016",
  pmid: "26385533",
  pmidUrl: "https://pubmed.ncbi.nlm.nih.gov/26385533/",
};

// Qi et al. 2024: the precedent that moved base editing to rank 1.
export const PRECEDENT = {
  correctionMax: 99.2,
  thresholdPct: 60,
  variant: "Scn5a T1307M",
  condition: "long QT syndrome type 3",
  direction: "gain of function",
  source: "Qi et al., Circulation 2024",
  pmid: "37965733",
  pmidUrl: "https://pubmed.ncbi.nlm.nih.gov/37965733/",
};

// What Brugada syndrome is, in the terms reader one needs.
export const CONDITION = {
  name: "Brugada syndrome",
  triggerNote:
    "Fever is a recognised trigger, which is why it is worth telling any doctor treating you for an illness that you carry this variant.",
};

// The ClinVar census. A measurement of a database rather than of any patient,
// and the result on this site that generalises furthest beyond one variant.
// From science/CLINVAR_CENSUS.md and paper 3.
export const CENSUS = {
  // Method. One file, MD5 verified against NCBI's published checksum.
  releaseDate: "2026-06-27",
  releaseSizeGb: 5.82,
  recordsScanned: 4531457,
  runtimeMinutes: 53,

  // Records carrying deposited functional evidence, before any exclusion.
  withFunctionalData: 270827,
  functionalBlocks: 532132,

  // The bulk depositor, excluded before anything is reported.
  bulkAnywhere: 263596,

  // The pool, on the paper's attribution rule: count a record if at least one
  // functional block belongs to a laboratory other than the bulk depositor.
  // Settled in supporting/CENSUS_DISCREPANCY_RESOLVED.md, which shows 8,142
  // was never a real quantity and 8,157 was a file defect.
  pool: 7661,
  poolGenes: 622,
  noConfident: 5359,
  noConfidentPct: 70.0,
  withAcmgCode: 1892,
  withAcmgPct: 24.7,
  ps3: 1110,
  bs3: 1106,

  // Tool survey, from CENSUS_TOOL_ACCESS_ROUTES_V2.csv.
  toolsSurveyed: 12,
  toolsDetermined: 11,
  toolsThatParseIt: 0,

  // Per-variant retrieval sizes, from CLINVAR_ACCESS_ROUTES.csv.
  summaryChars: 3763,
  fullRecordChars: 21611,
  esummaryElements: 74,
};

export type RouteState =
  | "leading"
  | "conditional"
  | "weak"
  | "dead"
  | "not applicable"
  | "current care";

export type Route = {
  rank: number | null;
  name: string;
  state: RouteState;
  blocker: string;
  detail: string;
  falsifier?: string;
  paper?: number;
};

// Nine routes, from MODALITY_COMPARISON.md (2026-08-04).
export const ROUTES: Route[] = [
  {
    rank: 1,
    name: "DNA base editing",
    state: "leading",
    blocker:
      "Delivery to human heart muscle at the efficiency seen in mice is unproven, and nothing has been tested in a cell.",
    detail:
      "An adenine base editor changes a single DNA letter without cutting the strand. It leads because this exact gene has already been corrected in a living mouse heart, at up to 99.2 percent of transcripts from one injection, with the disease signature disappearing above 60 percent correction. The design here is complete: one guide, the target letter sitting squarely in the editing window, and no neighbouring letter the editor could change by mistake.",
    falsifier:
      "Editing detected at MSH6, a DNA repair gene, would end this design at any efficiency.",
    paper: 2,
  },
  {
    rank: 2,
    name: "Prime editing",
    state: "conditional",
    blocker:
      "Published cardiac efficiency is roughly nine times below the base-editing precedent, and far below the 60 percent that mattered.",
    detail:
      "Prime editing writes the corrected letter from an RNA template rather than chemically converting it. At this site it is the better-designed option by a wide margin: it recovers a standard docking sequence that base editing cannot use at all, and after three independent filters not one off-target site survives anywhere in the genome for either standard guide. It loses on delivery, not on design.",
    falsifier:
      "Any peer-reviewed cardiac prime-editing result at or above 60 percent correction would flip this ranking.",
  },
  {
    rank: 3,
    name: "RNA editing",
    state: "weak",
    blocker:
      "Heart muscle carries almost the least of the enzyme the whole approach borrows, ranking 53rd of 54 human tissues.",
    detail:
      "This edits the message copied from the gene rather than the gene itself, so it is reversible and never alters the genome. The chemistry is an exact match: the repair needed is A to G, and the enzyme already present in every cell does precisely that conversion. The specificity result is strong, with the 30-letter designs hitting exactly one site across the entire transcriptome. The problem is the target organ.",
    falsifier:
      "Measuring the enzyme as protein rather than message in human heart cells could rescue this route, and is the cheapest experiment available.",
    paper: 4,
  },
  {
    rank: 4,
    name: "Interaction drug",
    state: "conditional",
    blocker:
      "No target is defined and no assay exists. It waits entirely on the mechanism experiment.",
    detail:
      "If the broken copy interferes with the working one at the cell surface, then the thing to target is the interaction itself rather than the channel. There is no published structure of that interface to build on, so this branch starts closer to zero than it feels.",
  },
  {
    rank: 5,
    name: "Raising output from the healthy copy",
    state: "dead",
    blocker:
      "The reserve it would redirect measures 0.0045 percent, against roughly the 1.5-fold increase the route needed.",
    detail:
      "The idea was to make the working copy produce more channel, and it was attractive because it was the only route that did not depend on resolving the mechanism first. It needs a pool of non-productive message to redirect. Across 827 human heart samples that pool is about 300 times smaller than the equivalent pool in brain, where the same strategy is already proven in children. The ceiling is a 1.06-fold increase, taking 34.1 percent to 36.0 percent.",
    falsifier:
      "Non-productive copies are destroyed by design, so the amount present understates the amount made. A heart-cell experiment with that destruction blocked would settle it.",
    paper: 6,
  },
  {
    rank: 6,
    name: "Silencing the broken copy",
    state: "weak",
    blocker:
      "This change is the hardest possible class to tell apart from the healthy copy.",
    detail:
      "Shutting off only the broken copy means distinguishing two sequences differing by one letter, and this particular substitution is the most conservative one available.",
  },
  {
    rank: 7,
    name: "Folding corrector",
    state: "dead",
    blocker: "Refuted by this project's own calibration test.",
    detail:
      "A small molecule was to hold the protein steady while it folded. Given four variants already known to break this channel, the folding-stability method underneath the idea identified one. The route also carries a hazard: if the broken copy interferes with the working one, helping more of it reach the surface could make things worse.",
    falsifier:
      "If the mechanism experiment shows the broken copy is held back inside the cell, this route revives.",
    paper: 1,
  },
  {
    rank: 8,
    name: "Gene replacement",
    state: "not applicable",
    blocker:
      "The gene is 6,048 letters of coding sequence against roughly 4,700 that the standard delivery vehicle carries.",
    detail:
      "Delivering a whole working copy is standard practice for some conditions. This gene does not fit in the vector. That is a field-level problem, not one this project can move.",
  },
  {
    rank: null,
    name: "Implanted defibrillator, and existing drugs",
    state: "current care",
    blocker:
      "Neither treats the disease. A device stops an arrhythmia after it starts.",
    detail:
      "This is what exists today, and for people who qualify a device is what keeps them alive. It does not change the sodium current, the protein, or the gene, and most carriers do not qualify for one at all.",
  },
];

export type Experiment = {
  n: number;
  name: string;
  question: string;
  costMin: number;
  costFull: number;
  costNote: string;
  weeks: number;
  weeksNote: string;
  gates: string;
  needs: string;
  design: string;
  resolves: string;
  kill: string;
};

// From protocols/EXPERIMENT_PROTOCOLS.md.
export const EXPERIMENTS: Experiment[] = [
  {
    n: 2,
    name: "The editing proof",
    question: "Does the designed guide actually correct the letter?",
    costMin: 16670,
    costFull: 26152,
    costNote:
      "minimum viable, using an engineered cell line rather than patient cells",
    weeks: 26,
    weeksNote: "26 weeks to the answer, 40 with function measured",
    gates: "the base-editing manuscript, which currently contains no edited base",
    needs:
      "a molecular biology bench. No electrophysiologist and no stem cells are required.",
    design:
      "Put the variant into a standard cell line, deliver the editor and guide, then sequence a designed 16-site panel to see whether the intended letter changed and whether anything else did.",
    resolves:
      "It fails fast and cheaply. A week-12 checkpoint costing about 4,000 dollars shows whether any editing happened at all, and if not the remaining money is never spent.",
    kill:
      "Any detectable editing at MSH6, a DNA repair gene where loss of function causes an inherited cancer predisposition, ends the design. That is not a threshold to negotiate.",
  },
  {
    n: 1,
    name: "The mechanism",
    question:
      "Does the broken copy simply sit out, or does it sabotage the working one?",
    costMin: 45342,
    costFull: 59342,
    costNote: "45,342 if the cell lines already exist, 59,342 if they must be made",
    weeks: 42,
    weeksNote: "42 weeks",
    gates: "four therapeutic routes, and the correction threshold for all of them",
    needs:
      "a patch clamp rig and an electrophysiologist for roughly 34 recording days. That time, not the reagents, is the real cost.",
    design:
      "Three cell lines, not two. The patient's own cells, the same cells with the letter repaired, and a third line with one copy deliberately switched off. That third line is the point: it makes the 50 percent benchmark a measured value rather than a theoretical one.",
    resolves:
      "The decisive comparison is the patient line against the switched-off line. If the broken copy behaves like a silent one, the two sit on top of each other. If it interferes, the patient line sits below.",
    kill:
      "If the switched-off line does not read near 50 percent, the scale is broken and neither comparison means anything. That is the internal control, and it is stated in advance.",
  },
];

// Result classification, from each paper's own text and from
// papers/PAPER_READINESS.csv column `leads_with_negative`.
// Seven are unambiguously negative (1, 3, 4, 6, 7, 8, 10). Two are mixed and
// the readiness file labels them "partly" (2, 9). One is not a negative
// result at all (5, the reclassification argument).
export type Result = "negative" | "mixed" | "constructive";

export type Paper = {
  n: number;
  slug: string;
  title: string;
  plain: string;
  result: Result;
  resultNote?: string;
  venue: "bioRxiv" | "medRxiv";
  // The manuscript is served from public/papers/<slug>.md until a DOI exists.
  bearsOn?: string;
};

export const NEGATIVE_COUNT = 7;

export const PAPERS: Paper[] = [
  {
    n: 1,
    slug: "stability-blindspot",
    title:
      "Folding-stability prediction misses three of four known loss-of-function variants in the SCN5A N-terminal domain",
    plain:
      "The method I had been relying on to predict which variants break this channel only works when the cause is a buried charge. Given four variants already known to break it, the method caught one. This is the result that closed the route I most wanted to work.",
    result: "negative",
    bearsOn: "Closed the folding-corrector route",
    venue: "bioRxiv",
  },
  {
    n: 2,
    slug: "base-editor-specificity",
    title:
      "Editability-scored off-target counting, and the specificity cost of PAM relaxation, in adenine base editor design",
    plain:
      "Counting the places a base editor might act by mistake, by asking whether it could actually edit there rather than whether the sequence merely looks similar, removes 85.1 percent of the apparent risk. It also shows that the naive method is biased toward recommending the worse of two editors.",
    result: "mixed",
    resultNote:
      "The method is constructive. The finding that no guide at this site is clean in an absolute sense is not.",
    bearsOn: "Underpins the base-editing route",
    venue: "bioRxiv",
  },
  {
    n: 3,
    slug: "clinvar-functional-evidence",
    title:
      "Deposited functional evidence in ClinVar is searchable only by exact term, and no surveyed tool reads it",
    plain:
      "Laboratories deposit real measurements of what variants do into the public database. None of the eleven determinable interpretation tools reads that field, and most of them already have the full record on disk. The evidence is public and effectively invisible.",
    result: "negative",
    bearsOn: "The database census, and the one result that is not about this variant",
    venue: "bioRxiv",
  },
  {
    n: 4,
    slug: "oligo-routes",
    title:
      "No antisense oligonucleotide has demonstrated target engagement in a human cardiomyocyte",
    plain:
      "Every design I tested for editing the message rather than the gene either changed neighbouring letters it should not have, or bound in too many other places. Separately, no molecule of this class has been shown to reach a human heart muscle cell at all.",
    result: "negative",
    bearsOn: "Sets the ceiling on the RNA-editing route",
    venue: "bioRxiv",
  },
  {
    n: 5,
    slug: "r104q-reclassification",
    title:
      "The Conflicting classification of SCN5A p.Arg104Gln rests on one outdated submission, not on divided evidence",
    plain:
      "My variant is labelled Conflicting in the public database, which reads as genuine disagreement between laboratories. It is not. It rests on a single stale submission. Across every available assay it behaves the same as its neighbour, which is classified pathogenic.",
    result: "constructive",
    bearsOn: "The reclassification argument",
    venue: "medRxiv",
  },
  {
    n: 6,
    slug: "upregulation-ceiling",
    title:
      "SCN5A lacks the non-productive mRNA reserve that antisense upregulation therapy would need in human heart",
    plain:
      "A therapy that boosts output from the healthy copy needs a reserve of wasted message to redirect. Across 827 heart samples that reserve is 0.0045 percent, about 300 times smaller than in the brain where the approach already works in children. This closes the route.",
    result: "negative",
    bearsOn: "Closed the upregulation route",
    venue: "bioRxiv",
  },
  {
    n: 7,
    slug: "dominant-negative-degeneracy",
    title:
      "Peak current alone cannot separate trafficking arrest from coupled gating in SCN5A dominant-negative variants",
    plain:
      "The standard assay cannot tell apart two different ways a broken copy interferes with a healthy one, because the two explanations are algebraically degenerate: they predict the same number. Measuring harder with the same method cannot help. This paper names the experiment that would settle it.",
    result: "negative",
    bearsOn: "Names the experiment that would settle the open question",
    venue: "bioRxiv",
  },
  {
    n: 8,
    slug: "mechanism-elimination",
    title:
      "Neither local strain nor exposed hydrophobic surface explains pathogenicity at SCN5A Arg104",
    plain:
      "Two candidate explanations for why this position matters were tested and eliminated. What survives is that this residue anchors a buried acidic pocket unchanged across species. The paper also corrects several of my own earlier claims about the geometry.",
    result: "negative",
    bearsOn: "Eliminates two explanations for the mechanism",
    venue: "bioRxiv",
  },
  {
    n: 9,
    slug: "ntd-vus-resource",
    title:
      "A stability predictor with known blind spots nominates seventeen uncertain SCN5A N-terminal variants for testing",
    plain:
      "Of 131 variants of uncertain significance in this region, 17 score above a measured noise floor and are worth testing. The other 114 are uninformative, which is not the same as benign. The blind spots of the predictor are named in the title deliberately.",
    result: "mixed",
    resultNote:
      "A usable shortlist, built on top of the measured blind spot that makes a negative score meaningless.",
    bearsOn: "Nominates seventeen other variants for testing",
    venue: "bioRxiv",
  },
  {
    n: 10,
    slug: "penetrance-covariates",
    title:
      "Residue centroid distance misses close atom contacts in the SCN5A N-terminal domain",
    plain:
      "Models that measure distance between the centres of residues miss about 9 percent of real atomic contacts, and disproportionately the long side-chain and salt-bridge ones. The contact at my own position is 3.79 angstroms atom to atom but 9.22 centre to centre, so a centre-distance model cannot see it at all.",
    result: "negative",
    bearsOn: "A methods correction to a published penetrance model",
    venue: "bioRxiv",
  },
];

export const NAV = [
  { href: "/", label: "Start here" },
  { href: "/science", label: "The science" },
  { href: "/routes", label: "Routes" },
  { href: "/papers", label: "Papers" },
  { href: "/census", label: "Census" },
  { href: "/experiments", label: "Experiments" },
  { href: "/data", label: "Data" },
  { href: "/for-carriers", label: "For carriers" },
  { href: "/limitations", label: "Limitations" },
];
