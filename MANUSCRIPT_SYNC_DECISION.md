# Which text the website serves, and why

**Written 6 August 2026. A decision record for `public/papers/` and `/m/`. It replaces the interim
banners applied earlier the same day. Nothing here authorises a Zenodo upload, and nothing has been
uploaded.**

---

## The negative first

**For two days this site served seven manuscripts that were arithmetically wrong, and nothing in the
repository was capable of noticing.** Every rule in `scripts/check-site-rules.sh` was scoped to `app/`.
The ten files under `public/papers/` had never been checked against anything. They forked from the
authoritative copies before the corrections of 4 August evening and kept serving the retired 34.1 percent
rescaling until 6 August. `CLAUDE.md` says the copies under `brugada-net-production/{public,dist}/` are
byte-identical build artifacts; for these seven files that statement was false.

The banners applied earlier on 6 August were an honest description of the defect and a bad end state. A
public research site whose manuscripts say "do not cite any figure in this" is not serving anyone.

---

## The three-way choice, stated properly

There are three candidate texts for several of these papers, and they are genuinely different documents.

1. **The published Zenodo record of 5 August 2026.** Citable, fixed, and for papers 4 and 6 it contains
   arithmetic that is wrong.
2. **The local `SUBMIT_THESE/papers/` copy.** Corrected on 6 August. Ahead of the published record on
   papers 4, 6, 7 and 8. Not citable, because it has no identifier.
3. **The website copy as it stood on the morning of 6 August.** Behind both. Not a candidate; it is the
   defect being fixed.

The full divergence is in `SUBMIT_THESE/ZENODO_DIVERGENCE_20260806.md`, which is the source for every
factual claim below.

---

## Decision

**The site serves (2), the corrected local text, with a generated per-paper header naming the Zenodo DOI
as the version of record, stating whether this copy differs from it, and listing what changed and when.**

### Why not (1), the published text

Three reasons, in order of weight.

**First, and it is close to decisive on its own: option (1) is not actually available.** Serving the
published text would require having the published text. This tree does not have it. The markdown was
edited in place with no version control on the science tree and no backup of the 4 August wording, so the
pre-correction text of papers 4 and 6 cannot be reconstructed from local files. The PDFs in
`SUBMIT_THESE/papers_pdf/` are the 4 August build, but six of the ten differ in MD5 from the files the
Zenodo API reports at identical byte length, and nobody has run `cmp -l` to find out whether that is
benign trailer metadata or a content difference. Choosing (1) would mean serving a text believed to be
the published one on the strength of an unverified inference. That is worse than either real option.

**Second, it would mean knowingly publishing wrong arithmetic.** Paper 4's deposited version carries
thirteen wrong figures, one of them (the 9.5 in the 90 percent merely-non-functional row) wrong on its own
terms rather than merely on a retired scale. Paper 6's carries seven, three of which are the retired 34.1
baseline multiplied out inside a table whose own column header reads 31.3. The standing rule is that
computation is hypothesis rather than clinical claim; it does not follow that arithmetic may be wrong.

**Third, the correction direction matters.** Every corrected figure in paper 4 is worse for the therapy
than the value it replaces. Serving the deposited text would mean publishing numbers that overstate what
an antisense route could deliver. Overstating a therapy is the specific failure this project exists to
avoid.

### Why not simply keep the banners

Because they are a warning where a fix is available, and because a warning that says "every figure here is
wrong, go elsewhere" on ten manuscript pages devalues the ninety percent of each file that was never in
question. Retirement carries a reason and a date in this project. It does not require keeping a broken
copy in the served path when the correct copy exists three directories away.

**Nothing is deleted.** The header on each of the seven formerly stale files records that it was stale,
what it was stale about, that it was bannered on 6 August, and why the banner was replaced rather than
kept. The banner text itself is preserved in git history at commit `bdf761e`.

### What citability costs, and why it is not lost

Serving (2) means the site shows text differing from the citable record, which is a real cost and is the
strongest argument for (1). It is paid down rather than ignored:

- Every manuscript page opens with the DOI, the statement that it is the citable address, and the note
  that the Zenodo version identifier rather than the concept identifier is the one to use.
- Every divergent paper states, in the same header, that the record at that identifier does not contain
  what follows, and lists what is missing or wrong.
- The `/papers` page says the same thing in the reader's own terms and marks the four affected papers.
- A reader who checks a number against the DOI and finds a disagreement is told, in advance, which of the
  two is the corrected one.

**The relationship a reader needs is not "these are the same document". It is "here is the fixed public
record, here is the corrected text, and here is exactly how they differ".** That is what is now served.

---

## What was implemented

| Piece | What it does |
|---|---|
| `scripts/manuscript-provenance.mjs` | The per-paper header text, and the DOI, status and source filename for each of the ten. One place, so ten files cannot drift from each other. |
| `scripts/sync-manuscripts.mjs` | Copies `SUBMIT_THESE/papers/*.md` into `public/papers/<slug>.md` byte for byte, prepending the header. `--check` exits non-zero on any drift. |
| `scripts/check-site-rules.sh` | Two new rules: the served manuscripts must match `SUBMIT_THESE/papers/`, and every one must carry a provenance header naming a Zenodo identifier. **This closes the gap that caused the defect.** |
| `app/content.ts` | `Paper.postDeposit`, set on papers 4, 6, 7 and 8. |
| `app/papers/page.tsx` | A "which copy you are reading" section, and a per-paper marker on the four. |

The new checks deliberately test **byte identity against the authoritative source** rather than searching
the manuscripts for retired figures. A string rule would fail on correct files: papers 4 and 6 both name
the retired 34.1 baseline inside their own dated correction tables, which is the opposite of publishing
it. Identity is the property that actually matters here.

`scripts/sync-manuscripts.mjs --check` reports SKIP rather than FAIL when `../SUBMIT_THESE/` is absent,
because a build host legitimately does not have the science tree. Drift is therefore caught on the machine
the manuscripts are written on, which is where it happens.

---

## Per-paper status, 6 August 2026

| Paper | Slug | DOI | Site copy vs the record |
|---:|---|---|---|
| 1 | stability-blindspot | `10.5281/zenodo.21799855` | in sync, was stale on the site until today |
| 2 | base-editor-specificity | `10.5281/zenodo.21799850` | in sync, was stale on the site until today |
| 3 | clinvar-functional-evidence | `10.5281/zenodo.21799857` | in sync, was stale on the site until today |
| 4 | oligo-routes | `10.5281/zenodo.21799859` | **corrective**, thirteen figures |
| 5 | r104q-reclassification | `10.5281/zenodo.21799861` | in sync, site copy already matched |
| 6 | upregulation-ceiling | `10.5281/zenodo.21799863` | **corrective**, seven figures |
| 7 | dominant-negative-degeneracy | `10.5281/zenodo.21799865` | **additive**, Tano 2026 at six places |
| 8 | mechanism-elimination | `10.5281/zenodo.21799867` | **additive**, Tano 2026 at six places |
| 9 | ntd-vus-resource | `10.5281/zenodo.21799869` | in sync, site copy already matched |
| 10 | penetrance-covariates | `10.5281/zenodo.21799871` | in sync, site copy already matched |

"In sync" here means the authoritative markdown was last written before the PDFs were built on the evening
of 4 August and before the 5 August deposit. **It is an argument from timestamps, not a byte comparison
against the published files, and each header says so.** No published PDF has been downloaded.

---

## What this decision does not do

- **It does not deposit anything.** Four records would justify a version 2, papers 4 and 6 on correctness
  and 7 and 8 on completeness, plus the data record for the 16-row `MS_TABLE3_LEAD_PROTEIN_CHANGING.csv`
  defect. `ZENODO_DIVERGENCE_20260806.md` specifies what each would need. Publishing is a button a human
  presses, and it stays that way.
- **It does not settle the six PDF hash mismatches.** Still unexplained, still a precondition on any
  re-deposit, still one `cmp -l` away from an answer.
- **It does not rebuild the PDFs.** `SUBMIT_THESE/papers_pdf/` remains the 4 August build and is now two
  revisions behind for papers 4 and 6.
- **It does not touch `WEBSITE_HANDOFF/papers/`**, which `CLAUDE.md` records as already resynced from
  `SUBMIT_THESE/` on 6 August with all ten pairs matching by MD5.
