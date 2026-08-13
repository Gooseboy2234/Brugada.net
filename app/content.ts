// Single source of truth for every fact and number on this site.
//
// Rule from WEBSITE_BRIEF.md: every number gets a source with an identifier.
// If a value is not sourced here, it does not go on a page.
//
// Source hierarchy inside WEBSITE_HANDOFF/, because its documents disagree
// with each other and some are stale:
//   1. science/WHY_THIS_MATTERS.md   authoritative on framing and comparator
//   2. science/MODALITY_COMPARISON.md   authoritative on routes one to nine.
//      Corrected 2026-08-06: it was written 2026-08-04, said nine routes, and
//      its predicted-current column is still computed on the retired 34.1
//      baseline even though its own header carries the corrected 31.3. Read its
//      dated correction block before trusting any percentage in its table.
//   2b. science/ROUTE_10_MOG1.md   authoritative on route ten, chaperone
//      upregulation, added 2026-08-06 and itself corrected in five places the
//      same day by SESSION_ARCHIVE_20260804/data/MOG1_RESCUE_SPECTRUM.md and
//      MOG1_HEADROOM_ANALYSIS.md. Record it as conditional, never as promising.
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
  // Public already, via the ORCID record above.
  contact: "ethan@brugada.net",
  updated: "2026-08-06",
};

// The data deposit. One archive holding every table behind the ten papers, and
// the address every paper's data availability statement points at.
//
// Date checked against the Zenodo API rather than the log: the record reports
// publication_date 2026-08-05. SUBMIT_THESE/SUBMITTED_LOG.md row 0 says
// 2026-08-04, which is the date the draft was built, not the date it published.
// The DOI itself is from SUBMIT_THESE/DATA_DOI.txt and resolves 302.
export const DEPOSIT = {
  // The CONCEPT DOI, not a version DOI. It resolves to whichever version is current,
  // so this constant does not need editing when a new version is deposited.
  // Corrected 13 August 2026: this read 21799234, which is version 1 -- the archive
  // whose own Zenodo description now opens "Superseded, 6 August 2026", and the one
  // SUBMIT_THESE/data/README.md documents as defective in seven correction notes.
  // Matches SUBMIT_THESE/DATA_DOI.txt, which every paper delegates to.
  doi: "10.5281/zenodo.21799233",
  url: "https://doi.org/10.5281/zenodo.21799233",
  // The version this concept DOI currently resolves to, verified against the Zenodo
  // API on 13 August 2026. Quote the concept DOI; keep this for provenance only.
  currentVersionDoi: "10.5281/zenodo.21918455",
  currentVersion: 3,
  title:
    "SCN5A R104Q: guide design, off-target scan, and ClinVar functional-evidence census",
  // Version 3 published 2026-08-13. Version 2 was 2026-08-07, version 1 2026-08-05.
  published: "2026-08-13",
  publishedLong: "13 August 2026",
  firstPublished: "2026-08-05",
  files: 107,
  licence: "CC BY 4.0",
  // Thirteen Zenodo records in total: this deposit and the TWELVE papers.
  // Corrected 13 August 2026 -- this read 11, from a comment reading "this deposit and
  // the ten papers". Papers 11 and 12 were deposited on 7 August as new records
  // (10.5281/zenodo.21840577 and 21840579) and are absent from this site entirely.
  records: 13,
  papersDeposited: 12,
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
  // Corrected 2026-08-04. The earlier figures rescaled the measured current to a
  // two-allele heart by dividing by two, giving 34.1 against a 50.0 comparator.
  // That assumed perfect additivity. O'Neill measured the two-allele case: their
  // WT+WT cells read 218.4 +/- 7.7 percent of a single allele (n = 199), not 200.
  // Dividing by 2.184 gives 31.3, and the comparator moves to 45.8. Source is the
  // correction section of PUBLISH_2_BASE_EDITOR_SPECIFICITY.md.
  rescaled: 31.3,
  simpleLoss: 45.8,
  gapPoints: 14.5,
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
  // A claim this site previously made and has since had to withdraw.
  correction?: string;
  paper?: number;
};

// Eleven therapeutic routes, ranked, plus current care at rank null. Ranks 1 to 3
// and 5 to 9 are from MODALITY_COMPARISON.md (2026-08-04). Rank 4, chaperone
// upregulation, was added 2026-08-06 from ROUTE_10_MOG1.md. It was in this
// project's own literature corpus throughout and was screened out by a filter
// selecting experimental protocols rather than therapeutic strategies, so the
// list was never complete, it was bounded by what one person thought to look
// for. Every rank below 4 moved down by one on that date.
//
// Ranks 10 and 11 were appended 2026-08-06 late evening from the pass over all
// 14,035 corpus records, SESSION_ARCHIVE_20260804/data/FULL_CORPUS_ROUTE_SWEEP_20260806.md.
// Appended, not interleaved: rank here is strength of case, neither has been
// assessed at that depth, and slotting them higher would be a claim this project
// has not earned. Three existing entries were edited the same evening and each
// carries a dated `correction` field saying what changed and why: rank 4's
// heading widened from one gene to a class, rank 5 moved from conditional to
// dead and was restored to the project inventory it had gone missing from, and
// rank 6's heading narrowed to the one method its measurement actually closes.
//
// ~~This array has ten entries and THE_WALL.md section 1 also counts ten, and
// they are different tens.~~ Superseded 2026-08-06 late evening: this array has
// twelve entries and THE_WALL.md counts thirteen lines, and the difference is
// now fully accounted for. See ROUTE_INVENTORY below, which is the reconciliation
// and is the thing to read before changing any route count on any page.
//
// The rule for any page that prints a count: never let "eleven routes" read as
// eleven chances. One of the three lines added on 2026-08-06 is closed on
// arrival, one is a candidate nobody has accepted, and the third waits on the
// same unfunded experiment as most of the rest.
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
      "Prime editing writes the corrected letter from an RNA template rather than chemically converting it. At this site it is the better-designed option: it recovers a standard docking sequence that base editing cannot use at all, and it has to satisfy three separate requirements at every wrong site rather than one, which removes the overwhelming majority of them. It loses on delivery, not on design.",
    falsifier:
      "Any peer-reviewed cardiac prime-editing result at or above 60 percent correction would flip this ranking.",
    correction:
      "An earlier version of this site said no off-target site survived anywhere in the genome. That was wrong, and allowing the alignment to bulge is what refuted it. The residual risk is one locus, in the closest related gene, and it now has to be sequenced in any experiment using this design.",
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
    name: "Chaperone and interacting-partner upregulation",
    state: "conditional",
    blocker:
      "It has been shown to rescue exactly two variants of this channel, both from one laboratory, and both of them fail to reach the cell surface. No study has tested it on a variant that reaches the surface normally, which is the case that has to be ruled out here.",
    detail:
      "A helper protein called MOG1 escorts the sodium channel to the cell surface, and unlike the channel gene it is small enough to fit the standard delivery vehicle. In a mouse carrying a different Brugada variant, delivering extra of it raised the current, abolished the disease signature and blocked the arrhythmia. It never has to tell the two copies apart, which is the difficulty that keeps allele-specific silencing weak. It is recorded as conditional rather than promising, for three reasons. It turns on the same unresolved mechanism as the routes above, and in the case where the broken copy is both held back inside the cell and interfering at the surface, escorting more of it out lowers the current instead of raising it, at a threshold that sits inside the range this approach can reach. The gene behind the helper protein was moved by ClinGen on 31 October 2025 from disputed to refuted as a cause of Brugada syndrome, which leaves the case resting on two laboratory papers with no supporting human genetic evidence at all. And the mouse paper is paywalled with no copy in any repository, so every result attributed to it here is read from its abstract.",
    falsifier:
      "The same mechanism experiment decides it. If the broken copy reaches the cell surface in normal proportion, this helps for any increase it delivers. If it is heavily held back inside the cell, it can be worse than doing nothing.",
    correction:
      "This entry was called chaperone upregulation and named one helper protein. A pass over all 14,035 papers in the project's collection on 6 August 2026 found 520 of them about raising some other partner protein of this channel, and one of those is a result this project should not have been ignoring: in heart cells from muscular dystrophy patients, supplying a single scaffolding protein restored the sodium current, the potassium current, the beat and the conduction. Naming one gene where the evidence is a class is what kept the other 520 out of view. The heading is widened; the assessment underneath it still covers only the one helper protein, and widening a heading is not an assessment.",
  },
  {
    rank: 5,
    name: "Interaction drug",
    state: "dead",
    blocker:
      "No molecule exists, no assay exists, and the best it could ever do is take 31.3 percent to 45.8 percent and stop there. One paper in the project's own collection argues in its title that the protein this idea targets is not needed by the channel at all.",
    detail:
      "If the broken copy interferes with the working one at the cell surface, then the thing to target is the interaction itself rather than the channel. There is no published structure of that interface to build on, so this branch starts closer to zero than it feels. Even at perfect success it only removes the interference and cannot replace the missing copy, so its whole reward is the gap between what this variant measures and what simply losing one copy would cost.",
    falsifier:
      "A resolved structure of the interface between the two copies in a heart cell, plus a mechanism result showing the broken copy interferes at the surface rather than being held back inside. Both are somebody else's experiment and neither exists.",
    correction:
      "This entry is the reason to read this section rather than trust it. It has been on this page since the site was built and it was in a 27 July working table marked a live branch, and for the whole of that time the project's own route inventory had no entry for it at all. It was not retired, refuted or dropped; it stopped being written down, and this page was one of only two places it survived. It is restored to the project inventory on 6 August 2026 as line 12, and recorded there as closed rather than live, with the contradicting paper named. A route that vanishes between two documents without a reason is the exact failure this project has a paper about.",
  },
  {
    rank: 6,
    name: "Redirecting the healthy copy's discarded messages",
    state: "dead",
    blocker:
      "The reserve it would redirect measures 0.0045 percent, against roughly the 1.5-fold increase the route needed.",
    detail:
      "The idea was to take the messages the working copy already makes and throws away, and turn them into working ones. It was attractive because it was the only route that did not depend on resolving the mechanism first. It needs a pool of discarded message to redirect. Across 827 human heart samples that pool is about 300 times smaller than the equivalent pool in brain, where the same strategy is already proven in children. The ceiling is a 1.06-fold increase, taking 31.3 percent to 33.1 percent.",
    falsifier:
      "Discarded copies are destroyed by design, so the amount present understates the amount made. A heart-cell experiment with that destruction blocked would settle it.",
    correction:
      "This entry was called raising output from the healthy copy, and the measurement beneath it does not close anything that wide. The measurement is about one method: redirecting discarded messages. Every other way of making the working copy produce more needs no discarded pool at all, and the project's own collection holds a result doing exactly that in heart cells grown from Brugada patients. The heading is narrowed to the method that was actually tested, on 6 August 2026, and the rest of it is now a separate entry at rank 11. The measurement below is unchanged and still correct: it killed one method, not a level.",
    paper: 6,
  },
  {
    rank: 7,
    name: "Silencing the broken copy",
    state: "weak",
    blocker:
      "This change is the hardest possible class to tell apart from the healthy copy.",
    detail:
      "Shutting off only the broken copy means distinguishing two sequences differing by one letter, and this particular substitution is the most conservative one available.",
  },
  {
    rank: 8,
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
    rank: 9,
    name: "Gene replacement",
    state: "conditional",
    blocker:
      "Not the size of the gene, which was the reason given until 6 August 2026 and was wrong. The dose, and the fact that a quarter of heart cells would be left untreated beside neighbours that were not.",
    detail:
      "Delivering a whole working copy is standard practice for some conditions, and the gene is 6,048 letters against roughly 4,700 that one delivery vehicle carries. It was recorded here as not applicable for that reason. A 2021 study had already split the gene across two vehicles and delivered it to about three quarters of the heart cells in a mouse, raising the current by 65 percent, so the size problem has a published answer. What replaces it is the dose, which in that study was several times higher than the highest dose of any approved medicine of this kind, and the unevenness: treating three quarters of the cells in a disease driven by differences between neighbouring cells has never been shown to be safe. This route now waits on the same measurement as the leading ones.",
    falsifier:
      "If the broken copy turns out to interfere at the surface rather than being held back inside the cell, the added working copies inherit the same interference and the arithmetic above changes.",
    correction:
      "This site said this route was not applicable because the gene does not fit in the vehicle. The arithmetic was right and the conclusion was not. A 2021 paper doing exactly the thing the closure said needed doing had been sitting in this project's own literature collection the whole time and was never read. Corrected 6 August 2026. The route is not promising; it is no longer shut, and the reason it is not shut is that the closure was never checked.",
  },
  {
    rank: 10,
    name: "A different, smaller sodium channel",
    state: "conditional",
    blocker:
      "The published rescue was simulated in a version of Brugada syndrome that this variant does not have, and putting a bacterial protein into a human heart for life is an immune question nobody has answered.",
    detail:
      "Instead of repairing this gene or delivering another copy of it, deliver a different sodium channel small enough to fit the vehicle easily: a bacterial one, about a seventh the size, or a short human one from a nerve channel. This is the only entry on this page that does not wait on the mechanism question, and the reason is simple: the bacterial channel does not touch the human one at all, so it does not matter which way the mechanism turns out. It carries current in a mouse heart six weeks after a single injection into a vein, and in a simulated heart it restored the disease signature. Against that: the simulation modelled Brugada syndrome by speeding up how fast the channel shuts, and this variant does not do that, it simply makes less current. The bacterial channel also raises calcium stores inside the cell, which is its own way of causing an arrhythmia, so it is not a clean sodium-only fix. Nobody has put it in a Brugada animal. Recorded as a candidate, conditional, and not as promising.",
    falsifier:
      "Re-running the published simulation with this variant's own numbers, which costs nothing and has not been done. If the benefit disappears when the substrate is a plain reduction in current rather than a fast-shutting channel, this entry closes.",
    correction:
      "This entry did not exist here or in the project inventory until 6 August 2026. Two searches on the same evening found it independently, one asking why the gene-replacement route had been closed and one asking all 14,035 papers in the project's collection whether they described a route to a treatment. Three of the papers behind it had been in that collection all along and none had ever been asked that question.",
  },
  {
    rank: 11,
    name: "Raising output from the healthy copy by other means",
    state: "conditional",
    blocker:
      "The one measurement in Brugada patient heart cells that clears the bar was made with a laboratory tool rather than a drug, and the drug that was tested was never measured on current at all.",
    detail:
      "Make the working copy produce more channel, without touching the discarded-message pool that rank 6 was closed on. In heart cells grown from two Brugada patients, blocking a developmental signalling pathway raised the channel protein 2.1-fold, and switching off one protein in that pathway raised the current itself 4.9-fold. Both are above the 1.46-fold this variant would need to reach the level that simply losing one copy would give. Four things keep it conditional. The small molecule was measured on protein and never on current; the 4.9-fold came from switching a gene off in the laboratory, which is not something anyone can be given; neither patient carried this variant, and one of them carried a copy that makes nothing at all rather than a faulty one; and the pathway being blocked runs the whole body, not the heart. Like most of this list, it raises both copies, so it waits on the mechanism question too.",
    falsifier:
      "A current measurement, in Brugada patient heart cells, for something that could actually be given to a person. That single number moves this entry either way.",
    correction:
      "This entry is what was left over when rank 6's heading was narrowed on 6 August 2026. Rank 6 was called raising output from the healthy copy and was closed on a measurement about one method of doing it. Everything else at that level was closed by the heading rather than by the evidence, for two days, on this page and in the project record.",
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

// TWO DIFFERENT TENS, reconciled 2026-08-06.
// SUPERSEDED THE SAME EVENING. The block below is kept because the discrepancy
// it documented turned out to be the evidence for a real defect, and deleting
// it would delete the evidence. Read it, then read the block after it.
//
// The site said ten routes and THE_WALL.md section 1 said ten routes, and the
// disagreement was about membership rather than about the count. Nobody had
// written down which ten either list meant.
//
// This site lists therapeutic routes, nine of them, plus current care so that
// the comparison is on the page rather than assumed. THE_WALL's inventory of
// ten is an inventory of everything the project has to get through, so two of
// its entries are not therapies at all: resolving the mechanism, which is an
// experiment, and publishing the ten papers, which is an act of record keeping.
// Both are on this site, at /experiments and /papers respectively. Neither
// belongs in a list of ways to treat a variant, which is why the site's list is
// not being made to match.
//
// Membership, read 2026-08-06 from THE_WALL.md section 1 and from
// MODALITY_COMPARISON.md:
//
//   shared by both, 8: DNA base editing, prime editing, RNA editing, chaperone
//     upregulation, raising output from the healthy copy, silencing the broken
//     copy, folding corrector, gene replacement
//   here and not in THE_WALL, 2: the interaction drug, which MODALITY_COMPARISON
//     carries as its row 7 and which THE_WALL's inventory has no entry for at
//     all; and current care, which MODALITY_COMPARISON numbers row 0 and which
//     THE_WALL excludes from its count deliberately
//   in THE_WALL and not here, 2: mechanism resolution, its route 8, and
//     publication, its route 9
//
// 8 + 2 = 10 on each side. The numbering also differs and the difference is not
// cosmetic: THE_WALL's number column is a stable inventory index, this list's
// rank is a ranking by strength of the case. Chaperone upregulation is route 10
// in project shorthand and rank 4 here, and those are the same route.
//
// ---------------------------------------------------------------------------
// CORRECTED 2026-08-06, later the same evening. ELEVEN AND THIRTEEN.
//
// Read the "here and not in THE_WALL" line above again. It says, correctly and
// in writing, that this site carried the interaction drug and the project's own
// route inventory had no entry for it at all. That was written up as a
// harmless difference of scope. It was not. The route was in a 27 July working
// table (SESSION_ARCHIVE_20260804/data/MODALITY_MAP.csv) marked "live branch,
// years out", it was on this page, and no route enumeration the project wrote
// after 27 July contained it. It had been lost between documents, and this file
// is one of the two places it survived. It is restored to the project inventory
// on 2026-08-06 as line 12 and recorded there as CLOSED for want of a target.
//
// Three other things changed the same evening, from the pass over all 14,035
// corpus records in SESSION_ARCHIVE_20260804/data/FULL_CORPUS_ROUTE_SWEEP_20260806.md:
//   - route 5's heading narrowed from "transcriptional upregulation" to splice
//     redirection, because its closing measurement only closes that method.
//     What the closure never covered is now line 13 and rank 11 here.
//   - route 10's heading widened from one gene to "chaperone and
//     interacting-partner upregulation". Rank 4 here follows.
//   - a candidate line 11 added, compact surrogate sodium channel, rank 10 here.
//
// New membership. This site: 11 therapeutic entries plus current care = 12.
// THE_WALL: 13 lines, of which 2 are not therapies (mechanism resolution,
// publication). All 11 of this site's therapeutic entries now map onto a
// THE_WALL line, because the one that did not is line 12.
//
//   11 shared + 1 here alone (current care)     = 12 on this side
//   11 shared + 2 non-therapeutic               = 13 on that side
//
// The two new entries are appended at ranks 10 and 11 rather than interleaved.
// That is deliberate: rank on this page is strength of the case, neither has
// been assessed at the depth the ranking assumes, and ranking them higher would
// be a claim this project has not earned.
export const ROUTE_INVENTORY = {
  // What this site lists.
  therapeutic: 11,
  listed: 12,
  // What THE_WALL lists.
  wallTotal: 13,
  wallNonTherapeutic: 2,
  // The overlap.
  shared: 11,
  hereOnly: 1,
  source:
    "THE_WALL.md section 1, revised 6 August 2026 late evening after the full-corpus route sweep",
};

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
    costMin: 17894,
    costFull: 27976,
    costNote:
      "in its minimum viable form, using an engineered cell line rather than patient cells",
    weeks: 26,
    weeksNote: "26 weeks to the answer, 40 with function measured",
    gates:
      "The base-editing manuscript, which at present contains no edited base at all. Everything in it is a prediction.",
    needs:
      "A molecular biology bench, and nothing else. No electrophysiologist and no stem cells are required, which is the main reason this is the easier favour to ask.",
    design:
      "Put the variant into a standard cell line, deliver the editor and guide, then sequence a designed 18-site panel to see whether the intended letter changed and whether anything else did.",
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
    costNote:
      "when the patient and corrected cell lines already exist, rising to 59,342 if they have to be made",
    weeks: 42,
    weeksNote: "42 weeks",
    gates:
      "Four therapeutic routes, and the correction threshold for every one of them.",
    needs:
      "A patch clamp rig and an electrophysiologist for roughly 34 recording days. That time, not the reagents, is the real cost, and it is excluded from the figure above.",
    design:
      "Three cell lines, not two. The patient's own cells, the same cells with the letter repaired, and a third line with one copy deliberately switched off. That third line is the point: it makes the 45.8 percent benchmark a measured value rather than a theoretical one.",
    resolves:
      "The decisive comparison is the patient line against the switched-off line. If the broken copy behaves like a silent one, the two sit on top of each other. If it interferes, the patient line sits below.",
    kill:
      "If the switched-off line does not read near 45.8 percent, the scale is broken and neither comparison means anything. That is the internal control, and it is stated in advance.",
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
  // Published to Zenodo 2026-08-05, verified against the Zenodo API. The DOI is
  // the version DOI and the citable address; Zenodo also minted a concept DOI
  // one number below each, which is not the one to cite. The manuscript is also
  // served from public/papers/<slug>.md and /m/<slug>.html.
  doi?: string;
  bearsOn?: string;
  // Set where the copy served here differs from the record at the DOI, which
  // for seven of the ten it does. "corrective" means the deposited version is
  // wrong and this copy is not. "additive" means this copy has material the
  // deposited version does not, with no correction involved.
  //
  // Corrected 2026-08-06 evening, twice over, and both errors were the same
  // shape. This comment read "for four of the ten" and the array marked four,
  // while the generated manuscript headers marked five and then seven. And
  // "corrective" was defined as "contains arithmetic that is wrong", which is
  // true of papers 4 and 6 and of nothing else in the set: paper 5's deposited
  // version says no SCN5A expert panel exists and one does, paper 10's says
  // four tables are in the archive and none of them are, and paper 2's
  // contradicts itself on a count and prints a build instruction as a section
  // heading. Three papers were unmarked here because the definition had no room
  // for them.
  //
  // Sources: SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md sections 1 and 1.4,
  // SUBMIT_THESE/PAPER_10_DATA_STATEMENT_FIX.md, and the per-record version
  // notes under SUBMIT_THESE/V2_STAGING/, all read 2026-08-06. Each manuscript
  // carries the same statement in its own header, generated by
  // scripts/manuscript-provenance.mjs, and scripts/check-site-rules.sh fails if
  // this array and that file disagree about any paper.
  postDeposit?: "corrective" | "additive";
};

export const NEGATIVE_COUNT = 7;

// Derived from PAPERS below and cross-checked against
// scripts/manuscript-provenance.mjs by scripts/check-site-rules.sh. Hard-coded
// prose counts on /papers went stale within hours of the papers they described,
// which is why these are computed rather than written out.
export const DIVERGENCE = {
  get divergent() {
    return PAPERS.filter((p) => p.postDeposit).length;
  },
  get corrective() {
    return PAPERS.filter((p) => p.postDeposit === "corrective").length;
  },
  get additive() {
    return PAPERS.filter((p) => p.postDeposit === "additive").length;
  },
  get inSync() {
    return PAPERS.filter((p) => !p.postDeposit).length;
  },
};

export const PAPERS: Paper[] = [
  {
    n: 1,
    slug: "stability-blindspot",
    doi: "10.5281/zenodo.21799855",
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
    doi: "10.5281/zenodo.21799850",
    title:
      "Editability-scored off-target counting, and the specificity cost of PAM relaxation, in adenine base editor design",
    plain:
      "Counting the places a base editor might act by mistake, by asking whether it could actually edit there rather than whether the sequence merely looks similar, removes 85.1 percent of the apparent risk. It also shows that the naive method is biased toward recommending the worse of two editors.",
    result: "mixed",
    resultNote:
      "The method is constructive. The finding that no guide at this site is clean in an absolute sense is not.",
    bearsOn: "Underpins the base-editing route",
    venue: "bioRxiv",
    postDeposit: "corrective",
  },
  {
    n: 3,
    slug: "clinvar-functional-evidence",
    doi: "10.5281/zenodo.21799857",
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
    doi: "10.5281/zenodo.21799859",
    title:
      "No antisense oligonucleotide has demonstrated target engagement in a human cardiomyocyte",
    plain:
      "Every design I tested for editing the message rather than the gene either changed neighbouring letters it should not have, or bound in too many other places. Separately, no molecule of this class has been shown to reach a human heart muscle cell at all.",
    result: "negative",
    bearsOn: "Sets the ceiling on the RNA-editing route",
    postDeposit: "corrective",
    venue: "bioRxiv",
  },
  {
    n: 5,
    slug: "r104q-reclassification",
    doi: "10.5281/zenodo.21799861",
    title:
      "The Conflicting classification of SCN5A p.Arg104Gln rests on one outdated submission, not on divided evidence",
    plain:
      "My variant is labelled Conflicting in the public database, which reads as genuine disagreement between laboratories. It is not. It rests on a single stale submission. Across every available assay it behaves the same as its neighbour, which is classified pathogenic.",
    result: "constructive",
    bearsOn: "The reclassification argument",
    venue: "medRxiv",
    postDeposit: "corrective",
  },
  {
    n: 6,
    slug: "upregulation-ceiling",
    doi: "10.5281/zenodo.21799863",
    title:
      "SCN5A lacks the non-productive mRNA reserve that antisense upregulation therapy would need in human heart",
    plain:
      "A therapy that boosts output from the healthy copy needs a reserve of wasted message to redirect. Across 827 heart samples that reserve is 0.0045 percent, about 300 times smaller than in the brain where the approach already works in children. This closes the route.",
    result: "negative",
    bearsOn: "Closed the upregulation route",
    postDeposit: "corrective",
    venue: "bioRxiv",
  },
  {
    n: 7,
    slug: "dominant-negative-degeneracy",
    doi: "10.5281/zenodo.21799865",
    title:
      "Peak current alone cannot separate trafficking arrest from coupled gating in SCN5A dominant-negative variants",
    plain:
      "The standard assay cannot tell apart two different ways a broken copy interferes with a healthy one, because the two explanations are algebraically degenerate: they predict the same number. Measuring harder with the same method cannot help. This paper names the experiment that would settle it.",
    result: "negative",
    bearsOn: "Names the experiment that would settle the open question",
    postDeposit: "corrective",
    venue: "bioRxiv",
  },
  {
    n: 8,
    slug: "mechanism-elimination",
    doi: "10.5281/zenodo.21799867",
    title:
      "Neither local strain nor exposed hydrophobic surface explains pathogenicity at SCN5A Arg104",
    plain:
      "Two candidate explanations for why this position matters were tested and eliminated. What survives is that this residue anchors a buried acidic pocket unchanged across species. The paper also corrects several of my own earlier claims about the geometry.",
    result: "negative",
    bearsOn: "Eliminates two explanations for the mechanism",
    postDeposit: "additive",
    venue: "bioRxiv",
  },
  {
    n: 9,
    slug: "ntd-vus-resource",
    doi: "10.5281/zenodo.21799869",
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
    doi: "10.5281/zenodo.21799871",
    title:
      "Residue centroid distance misses close atom contacts in the SCN5A N-terminal domain",
    plain:
      "Models that measure distance between the centres of residues miss about 9 percent of real atomic contacts, and disproportionately the long side-chain and salt-bridge ones. The contact at my own position is 3.79 angstroms atom to atom but 9.22 centre to centre, so a centre-distance model cannot see it at all.",
    result: "negative",
    bearsOn: "A methods correction to a published penetrance model",
    venue: "bioRxiv",
    postDeposit: "corrective",
  },
];

export const NAV = [
  // Ordered by reader journey: no vocabulary, then a fresh diagnosis, then the
  // science, then what was done with it, then the record and its limits.
  { href: "/new-here", label: "New here" },
  { href: "/for-carriers", label: "For carriers" },
  { href: "/science", label: "The science" },
  { href: "/routes", label: "Routes" },
  { href: "/open", label: "What is open" },
  { href: "/experiments", label: "Experiments" },
  { href: "/papers", label: "Papers" },
  { href: "/census", label: "Census" },
  { href: "/data", label: "Data" },
  { href: "/history", label: "History" },
  { href: "/limitations", label: "Limitations" },
];
