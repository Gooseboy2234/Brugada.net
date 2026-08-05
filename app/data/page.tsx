import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "Data",
  description:
    "The tables behind the SCN5A R104Q preprints, grouped by the result each supports, under CC BY 4.0, with the permanent archive identifier once deposited.",
  alternates: { canonical: "/data" },
};

const GROUPS: { heading: string; note: string; rows: [string, string][] }[] = [
  {
    heading: "Base editing and off-target safety",
    note: "Behind the editing design and the specificity result.",
    rows: [
      [
        "ABE_GUIDE_TABLE",
        "Every guide that places the target letter in the editing window, with editor, docking sequence, genomic span, and the count of neighbouring letters the editor could change by mistake.",
      ],
      [
        "ABE_OFFTARGET_SUMMARY",
        "Per-guide counts across the genome by mismatch distance, given both as raw sequence matches and as sites the editor could actually edit.",
      ],
      [
        "ABE_RESCUE_MODEL",
        "Predicted current against the fraction of cells corrected, anchored to the correction rate that removed the disease signature in mice.",
      ],
      [
        "ABE_ACCESSIBILITY_TOPGENES",
        "Twenty cardiac genes with the openness of their coding regions, included as the control that stops the accessibility measure being over-read.",
      ],
    ],
  },
  {
    heading: "The closed upregulation route",
    note: "The measurement that killed it, and the arithmetic it failed.",
    rows: [
      [
        "SCN5A_SPLICING_SUMMARY",
        "The non-productive fraction of message in heart against the brain positive control, by two independent methods, with sample counts and spread.",
      ],
      [
        "SCN5A_TRANSCRIPTS",
        "All 21 annotated forms of the gene with length, type, and whether each can produce working protein.",
      ],
      [
        "UPREGULATION_HEADROOM",
        "Predicted recovery across boost factors under both candidate mechanisms, which is the table the route needed to clear and did not.",
      ],
    ],
  },
  {
    heading: "The database census",
    note: "Behind the result that generalises beyond this gene.",
    rows: [
      [
        "CLINVAR_FUNCTIONAL_CENSUS",
        "Every variant carrying functional evidence deposited by a laboratory other than the one bulk depositor, one row each, with classification, submitter counts and the evidence codes. This is the corrected build.",
      ],
      [
        "CLINVAR_ACCESS_ROUTES",
        "Sample variants across five genes and six depositors, with response sizes and which fields each retrieval route returns.",
      ],
      [
        "NTD_FUNCTIONAL_EVIDENCE_TABLE",
        "Variants in this domain joined across functional scores, classification, population frequency, conservation and burial. This is the table that surfaced two variants with strong evidence and no reported carrier.",
      ],
    ],
  },
  {
    heading: "Route comparison",
    note: "The ranking, with its precedent citations.",
    rows: [
      [
        "MODALITY_COMPARISON",
        "All nine routes with what each acts on, predicted current, best precedent, what gates it, and whether it depends on the unresolved mechanism.",
      ],
      [
        "PE_VS_ABE_EFFICIENCY",
        "Published cardiac efficiency for prime editing against base editing, which is the comparison that keeps prime editing second despite its better design.",
      ],
    ],
  },
];

export default function Data() {
  return (
    <div className="wrap">
      <p className="eyebrow">Data</p>

      <h1 className="page-title">The tables, grouped by what they support.</h1>

      <p className="standfirst">
        Every table behind the preprints, under a licence that allows reuse.
        Attribution to the identifier below is sufficient.
      </p>

      <div className="notice">
        <b>Archive identifier</b>{" "}
        <span className="pending">Pending deposit</span>
        <p style={{ margin: "0.6rem 0 0" }}>
          The deposit has not been completed, so no identifier is quoted here. It
          is marked pending rather than estimated, which is the rule applied to
          every unfinished value on this site.
        </p>
      </div>

      {GROUPS.map((g) => (
        <section key={g.heading}>
          <h2>{g.heading}</h2>
          <p className="small">{g.note}</p>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Table</th>
                  <th>What it holds</th>
                </tr>
              </thead>
              <tbody>
                {g.rows.map(([name, what]) => (
                  <tr key={name}>
                    <td className="mono">
                      <a href={`/tables/${name}.csv`} download>
                        {name}.csv
                      </a>
                    </td>
                    <td>{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <h2>One table is withheld, and why</h2>

      <p>
        The per-gene breakdown of the census is not offered. The build that
        exists predates the correction described on{" "}
        <a href="/census">the census page</a>, and a corrected per-gene table
        has not been produced. Publishing the old one would put a file on this
        site that the project has already shown to be wrong, so it waits.
      </p>

      <h2>What is deliberately not here</h2>

      <p>
        Two tables that exist in the working set are not published. One records
        which findings would be new to a specific research group, and one weighs
        my own likely authorship position on work that has not happened. Both
        were written to plan correspondence, not to report a result. Publishing
        them would put private judgements about named people into the public
        record, and they support no claim on this site.
      </p>

      <h2>Reference sources</h2>

      <ul className="plain">
        <li>GRCh38 reference genome, no-alt analysis set, with checksum recorded in the deposit</li>
        <li>RefSeq annotation, release recorded in the deposit</li>
        <li>ClinVar full release, with the published checksum verified</li>
        <li>GTEx expression and splice-junction data, release recorded per table</li>
        <li>ENCODE heart and cardiomyocyte accessibility experiments, accessions listed per row</li>
      </ul>

      <h2>If you reuse the off-target scan</h2>

      <p>
        One thing that will otherwise cost you a day: the reference genome
        carries the healthy sequence, so a guide designed against the variant
        matches its own target site at one mismatch rather than zero. A pipeline
        reporting zero mismatches against the unmodified reference has a
        coordinate error, and that check is worth running before any sequencing
        money is spent.
      </p>

      <h2>Licence</h2>

      <p>
        CC BY 4.0. Attribution to {SITE.author}, ORCID{" "}
        <a href={SITE.orcidUrl}>{SITE.orcid}</a>, is sufficient.
      </p>

      <div className="next">
        <a href="/papers">The papers these tables support</a>
        <a href="/census">The database census</a>
        <a href="/limitations">What the tables do not establish</a>
      </div>
    </div>
  );
}
