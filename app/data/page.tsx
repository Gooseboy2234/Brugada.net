import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "Data",
  description:
    "The deposited data tables behind the SCN5A R104Q preprints, under CC BY 4.0, with the permanent archive identifier.",
  alternates: { canonical: "/data" },
};

const TABLES = [
  ["ABE_GUIDE_TABLE", "Candidate guide RNAs with editor compatibility, PAM, genomic span, and bystander adenine counts."],
  ["ABE_OFFTARGET_SCAN", "Annotated off-target sites from an exhaustive both-strand scan of the reference genome."],
  ["ABE_OFFTARGET_SUMMARY", "Per-guide counts by mismatch distance, with and without the editability filter."],
  ["ABE_RESCUE_MODEL", "Predicted sodium current against fraction of cells corrected, under both candidate mechanisms."],
  ["ABE_ACCESSIBILITY", "Every scanned site annotated with heart chromatin accessibility across 33 ENCODE experiments."],
  ["ABE_ACCESSIBILITY_SOURCES", "The ENCODE experiment and file accessions used."],
  ["ABE_ACCESSIBILITY_VALIDATION", "Control tests establishing what the accessibility metric can and cannot discriminate."],
  ["ABE_ACCESSIBILITY_TOPGENES", "Twenty canonical cardiac genes, promoter and coding-exon accessibility, as the interpretive control."],
  ["CLINVAR_FUNCTIONAL_CENSUS", "Per-variant detail for records carrying deposited functional evidence."],
  ["CLINVAR_CENSUS_BY_GENE", "Per-gene aggregate across the same pool."],
  ["CLINVAR_ACCESS_ROUTES", "Which retrieval routes expose the functional-evidence field, per variant, with response sizes."],
];

export default function Data() {
  return (
    <div className="wrap">
      <p className="eyebrow">Data</p>

      <h1 className="page-title">The tables, deposited and citable.</h1>

      <p className="standfirst">
        Every table behind the preprints is deposited in a public archive under
        a licence that allows reuse. Attribution to the ORCID below is
        sufficient.
      </p>

      <div className="notice">
        <b>Archive identifier</b> <span className="pending">Pending deposit</span>
        <p style={{ margin: "0.6rem 0 0" }}>
          The deposit has not been completed yet, so no identifier is quoted
          here. It will be marked pending rather than estimated until the
          archive issues it.
        </p>
      </div>

      <h2>What is in the deposit</h2>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Table</th>
              <th>What it holds</th>
            </tr>
          </thead>
          <tbody>
            {TABLES.map(([name, what]) => (
              <tr key={name}>
                <td className="mono">{name}</td>
                <td>{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Reference sources</h2>

      <ul className="plain">
        <li>GRCh38 no-alt analysis set, NCBI GCA_000001405.15</li>
        <li>RefSeq annotation GCF_000001405.40_GRCh38.p14</li>
        <li>ClinVar variation release, with the published checksum verified</li>
        <li>GTEx median gene expression, via the GTEx portal</li>
        <li>
          ENCODE heart and cardiomyocyte ATAC-seq and DNase-seq, accessions
          listed in the sources table
        </li>
      </ul>

      <h2>If you reuse the off-target scan</h2>

      <p>
        One thing that will otherwise cost you a day: the reference genome
        carries the normal sequence, so each guide matches its own target site
        at one mismatch rather than zero. A pipeline reporting zero mismatches
        against the unmodified reference has a coordinate error.
      </p>

      <h2>Licence</h2>

      <p>
        CC BY 4.0. Attribution to {SITE.author}, ORCID{" "}
        <a href={SITE.orcidUrl}>{SITE.orcid}</a>, is sufficient.
      </p>

      <div className="next">
        <a href="/papers">The papers these tables support</a>
        <a href="/limitations">What the tables do not establish</a>
      </div>
    </div>
  );
}
