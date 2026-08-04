// Single source of truth for every fact and number on this site.
// Rule from WEBSITE_BRIEF.md: every number gets a source with an identifier.
// If a value is not sourced here, it does not go on a page.

export const SITE = {
  domain: "brugada.net",
  url: "https://brugada.net",
  author: "Ethan Bradley",
  orcid: "0009-0008-8925-7975",
  orcidUrl: "https://orcid.org/0009-0008-8925-7975",
  updated: "2026-08-04",
};

// The variant, written every way a visitor might have seen it.
export const VARIANT = {
  gene: "SCN5A",
  protein: "p.Arg104Gln",
  short: "R104Q",
  coding: "c.311G>A",
  transcript: "NM_000335.5",
  clinvar: "VCV000067780",
  clinvarUrl: "https://www.ncbi.nlm.nih.gov/clinvar/variation/67780/",
  structure: "8VYJ",
  structureUrl: "https://www.rcsb.org/structure/8VYJ",
};

// The measurement the whole site rests on.
export const MEASUREMENT = {
  heterozygousPercent: 68.3,
  heterozygousSd: 6,
  cells: 34,
  rescaledPercent: 34.1,
  simpleLossPercent: 50,
  gapPoints: 15.9,
  source: "O'Neill et al., Genet Med 2022",
  pmid: "35305865",
  pmidUrl: "https://pubmed.ncbi.nlm.nih.gov/35305865/",
  platform: "SyncroPatch 384PE",
};

export type RouteState = "leading" | "conditional" | "weak" | "dead" | "not applicable";

export const ROUTES: {
  name: string;
  state: RouteState;
  blocker: string;
  detail: string;
  paper?: number;
}[] = [
  {
    name: "DNA base editing",
    state: "leading",
    blocker: "No experimental validation yet. It needs a laboratory.",
    detail:
      "An adenine base editor changes a single DNA letter back without cutting the strand. A guide has been designed for this variant and checked against the whole genome for places it might act by mistake. Nothing has been tested in a cell.",
    paper: 2,
  },
  {
    name: "RNA editing",
    state: "conditional",
    blocker:
      "No oligonucleotide has been shown to reach a human heart muscle cell.",
    detail:
      "This edits the message copied from the gene rather than the gene itself, so it is reversible and does not alter the genome. Every tested design either edited neighbouring letters it should not have, or bound in too many other places in the transcriptome.",
    paper: 4,
  },
  {
    name: "Raising output from the healthy copy",
    state: "dead",
    blocker:
      "The reserve it would draw on measures 0.0045 percent, against roughly 25 percent needed.",
    detail:
      "The idea was to make the working copy produce more channel to compensate. It depends on a pool of non-productive message that can be redirected. In heart tissue that pool is about 300 times smaller than the equivalent pool in brain, where the strategy works. The ceiling is a 1.057-fold increase where about 1.5-fold is needed.",
    paper: 6,
  },
  {
    name: "Silencing the broken copy",
    state: "weak",
    blocker: "This mutation is the hardest class to tell apart from the healthy copy.",
    detail:
      "Shutting off only the broken copy requires distinguishing two sequences that differ by one letter. A single-letter substitution is the least favourable case for that discrimination.",
  },
  {
    name: "Replacing the gene",
    state: "not applicable",
    blocker: "The gene is too large for the standard delivery vehicle.",
    detail:
      "Gene replacement delivers a whole working copy. SCN5A exceeds the carrying capacity of adeno-associated virus, the vector used for approved cardiac gene therapy.",
  },
  {
    name: "Chaperone drugs",
    state: "dead",
    blocker: "The premise was refuted by this project's own work.",
    detail:
      "A small molecule was to hold the protein steady while it folded. The folding-stability prediction underlying it failed its own pre-specified calibration, and the route carries a hazard: if the broken copy interferes with the healthy one, helping more of it reach the membrane could make things worse.",
    paper: 1,
  },
];

export type Paper = {
  n: number;
  slug: string;
  title: string;
  plain: string;
  negative: boolean;
  venue: "bioRxiv" | "medRxiv";
  file: string;
};

export const PAPERS: Paper[] = [
  {
    n: 1,
    slug: "stability-blindspot",
    title:
      "Folding-stability prediction misses three of four known loss-of-function variants in the SCN5A N-terminal domain",
    plain:
      "The method I had been using to predict which variants break the channel only works when the cause is a buried charge. It missed three of the four variants already known to break it. This is the result that closed my own chaperone hypothesis.",
    negative: true,
    venue: "bioRxiv",
    file: "PUBLISH_1_STABILITY_BLINDSPOT.md",
  },
  {
    n: 2,
    slug: "base-editor-specificity",
    title:
      "Editability-scored off-target counting, and the specificity cost of PAM relaxation, in adenine base editor design",
    plain:
      "Counting the places a base editor might act by mistake, by asking whether it could actually edit there rather than whether the sequence merely looks similar, removes 85.1 percent of the apparent risk. Loosening the editor's targeting rule costs 6.2-fold in specificity.",
    negative: false,
    venue: "bioRxiv",
    file: "PUBLISH_2_BASE_EDITOR_SPECIFICITY.md",
  },
  {
    n: 3,
    slug: "clinvar-functional-evidence",
    title:
      "Deposited functional evidence in ClinVar is searchable only by exact term, and no surveyed tool reads it",
    plain:
      "Laboratories deposit measurements of what variants actually do into ClinVar, but the field cannot be listed or browsed, only hit by an exact search term. None of the eleven variant-interpretation tools checked read it at all. The evidence is public and effectively invisible.",
    negative: false,
    venue: "bioRxiv",
    file: "PUBLISH_3_CLINVAR_FUNCTIONAL_EVIDENCE.md",
  },
  {
    n: 4,
    slug: "oligo-routes",
    title:
      "No antisense oligonucleotide has demonstrated target engagement in a human cardiomyocyte",
    plain:
      "Every length and chemistry I designed for an RNA-editing oligonucleotide against this variant either edited neighbouring letters it should not have, or bound in too many places across the transcriptome. Separately, no such molecule has been shown to reach a human heart muscle cell.",
    negative: true,
    venue: "bioRxiv",
    file: "PUBLISH_4_OLIGO_ROUTES.md",
  },
  {
    n: 5,
    slug: "r104q-reclassification",
    title:
      "The Conflicting classification of SCN5A p.Arg104Gln rests on one outdated submission, not on divided evidence",
    plain:
      "This variant is labelled Conflicting in the public database, which reads as genuine disagreement. It is not. It rests on a single stale submission from 2023. Across every available assay it behaves the same as R104W, which is classified pathogenic.",
    negative: false,
    venue: "medRxiv",
    file: "PUBLISH_5_R104Q_RECLASSIFICATION.md",
  },
  {
    n: 6,
    slug: "upregulation-ceiling",
    title:
      "SCN5A lacks the non-productive mRNA reserve that antisense upregulation therapy would need in human heart",
    plain:
      "A therapy that boosts output from the healthy copy needs a reserve of non-productive message to redirect. Across 827 GTEx heart samples that reserve is 0.0045 percent, roughly 300 times smaller than the brain equivalent where the approach works. This closes the route.",
    negative: true,
    venue: "bioRxiv",
    file: "PUBLISH_6_UPREGULATION_CEILING.md",
  },
  {
    n: 7,
    slug: "dominant-negative-degeneracy",
    title:
      "Peak current alone cannot separate trafficking arrest from coupled gating in SCN5A dominant-negative variants",
    plain:
      "The standard assay cannot tell apart two different ways a broken copy interferes with a healthy one, because the two models are algebraically degenerate: they predict the same number. This is why the central question about my own variant is still open, and it names the five-arm experiment that would settle it.",
    negative: true,
    venue: "bioRxiv",
    file: "PUBLISH_7_DOMINANT_NEGATIVE_DEGENERACY.md",
  },
  {
    n: 8,
    slug: "mechanism-elimination",
    title:
      "Neither local strain nor exposed hydrophobic surface explains pathogenicity at SCN5A Arg104",
    plain:
      "Two candidate explanations for why this position matters were tested and eliminated. What survives is that Arg104 anchors an invariant buried acidic pocket. This paper also corrects several of my own earlier claims about the geometry.",
    negative: false,
    venue: "bioRxiv",
    file: "PUBLISH_8_MECHANISM_ELIMINATION.md",
  },
  {
    n: 9,
    slug: "ntd-vus-resource",
    title:
      "A stability predictor with known blind spots nominates seventeen uncertain SCN5A N-terminal variants for testing",
    plain:
      "Of 131 variants of uncertain significance in this region, 17 score above a measured noise floor and are worth testing. The other 114 are uninformative, which is not the same as benign. The blind spots of the predictor are named in the title on purpose.",
    negative: false,
    venue: "bioRxiv",
    file: "PUBLISH_9_NTD_VUS_RESOURCE.md",
  },
  {
    n: 10,
    slug: "penetrance-covariates",
    title:
      "Residue centroid distance misses close atom contacts in the SCN5A N-terminal domain",
    plain:
      "Models that measure the distance between residue centres miss about 9 percent of real atomic contacts, and disproportionately the long side-chain and salt-bridge contacts. The R104 to D84 contact is 3.79 angstroms atom to atom but 9.22 angstroms centre to centre, so a centre-distance model cannot see it at all.",
    negative: true,
    venue: "bioRxiv",
    file: "PUBLISH_10_PENETRANCE_COVARIATES.md",
  },
];

export const NAV = [
  { href: "/", label: "Start here" },
  { href: "/science", label: "The science" },
  { href: "/routes", label: "Routes" },
  { href: "/papers", label: "Papers" },
  { href: "/experiments", label: "Experiments" },
  { href: "/data", label: "Data" },
  { href: "/for-carriers", label: "For carriers" },
  { href: "/limitations", label: "Limitations" },
];
