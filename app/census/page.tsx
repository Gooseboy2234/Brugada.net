import type { Metadata } from "next";
import { CENSUS } from "../content";

export const metadata: Metadata = {
  title: "The ClinVar census",
  description:
    "Laboratories deposit functional measurements into ClinVar. A complete parse of 4,531,457 records finds that evidence is absent from the summary retrieval route, and that none of eleven determinable variant-interpretation tools reads it.",
  alternates: { canonical: "/census" },
};

const n = (x: number) => x.toLocaleString("en-US");

export default function Census() {
  return (
    <div className="wrap">
      <p className="eyebrow">The census</p>

      <h1 className="page-title">
        Laboratory evidence that is public, and effectively invisible.
      </h1>

      <p className="standfirst">
        This is the one result on this site with nothing to do with my variant.
        It is a measurement of a database, and it applies to every gene in it.
      </p>

      <h2>The short version</h2>

      <p>
        When a laboratory measures what a genetic variant actually does to a
        protein, it can deposit that measurement in ClinVar, the public database
        clinicians and genetic counsellors rely on. That evidence is real, it is
        expensive to produce, and it is filed correctly.
      </p>

      <p>
        It is also absent from the compact version of the record that automated
        tools request first, and none of the tools surveyed reads it from the
        full version either. Several already have the full record on disk and
        simply never look at the field.
      </p>

      <div className="claim is-known">
        <span className="state state-known">Measured</span>
        <p>
          Of {CENSUS.toolsSurveyed} widely used variant-interpretation
          resources, {CENSUS.toolsDetermined} have a determinable route to
          ClinVar and{" "}
          <b>{CENSUS.toolsThatParseIt} of them read the functional-evidence field</b>
          . The twelfth has no dedicated client, so the question does not apply
          to it.
        </p>
        <p>
          That list includes tools that ingest the complete release rather than
          the compact summary. The data is on their disk. Nothing parses it.
        </p>
        <div className="falsifier">
          <b>What would overturn this</b>
          Any of the surveyed tools reading the field in a code path that was
          not opened.
        </div>
      </div>

      <h2>The size of the difference</h2>

      <p>
        For one variant, the compact record runs {n(CENSUS.summaryChars)}{" "}
        characters and the full record {n(CENSUS.fullRecordChars)}. The
        functional effect, the numeric result, the severity call and the
        evidence code exist only in the larger one. The compact format declares{" "}
        {CENSUS.esummaryElements} elements and not one of them is functional.
      </p>

      <p>
        The scan itself was a single pass over the {CENSUS.releaseDate} release,{" "}
        {n(CENSUS.recordsScanned)} records and {CENSUS.releaseSizeGb} GB, in{" "}
        {CENSUS.runtimeMinutes} minutes on one machine.
      </p>

      <h2>How many variants this affects</h2>

      <div className="readout">
        <span className="readout-value">{n(CENSUS.pool)}</span>
        <p className="readout-label">
          variants across {n(CENSUS.poolGenes)} genes carry functional evidence
          deposited by a laboratory other than the one bulk depositor.
        </p>
      </div>

      <div className="readout">
        <span className="readout-value">{CENSUS.noConfidentPct}%</span>
        <p className="readout-label">
          of those, {n(CENSUS.noConfident)} variants, still have no confident
          clinical classification.
        </p>
      </div>

      <p>
        And this is not raw data waiting to be interpreted.{" "}
        <b>
          {n(CENSUS.withAcmgCode)} of them, {CENSUS.withAcmgPct} percent
        </b>
        , carry a formal evidence code in the deposit text, meaning the
        laboratory that did the measuring has already stated how strong it
        considers its own result to be. The most common are the codes for
        functional evidence supporting a harmful reading, {n(CENSUS.ps3)}{" "}
        times, and a harmless one, {n(CENSUS.bs3)} times.
      </p>

      <div className="notice">
        <b>These numbers were wrong once, and the correction is public.</b>
        <p style={{ margin: "0.6rem 0 0" }}>
          An earlier build of the data file reported a larger pool. The
          exclusion filter for the bulk depositor was tested against a
          shortened, four-name copy of each record&rsquo;s submitter list rather
          than the real one, so records where that depositor sorted fifth or
          later slipped through. That accounted for 911 records exactly, and a
          second defect readmitted 15 more. Neither figure was a population of
          anything. The paper&rsquo;s published numbers never depended on the
          faulty file, and the full working is kept as a companion note rather
          than the file being swapped out quietly.
        </p>
      </div>

      <h2>The correction that has to travel with any count</h2>

      <p>
        One laboratory accounts for the overwhelming majority of records
        carrying this evidence, through a single very large bulk submission.
        Quoting the raw total without that correction would treat one submission
        as though it were hundreds of thousands of independent laboratory
        characterisations, and would misrepresent the field badly.
      </p>

      <p>
        Every version of this analysis excludes that depositor before reporting
        anything. It is stated first because it is the most likely way the
        result could mislead.
      </p>

      <h2>Why unclassified does not mean neglected</h2>

      <p>
        This is the part that makes the finding more interesting rather than
        less. A classification in ClinVar requires that a variant has been seen
        in a person and submitted with clinical context. Functional evidence
        alone does not trigger one, and it is not supposed to.
      </p>

      <p>
        So many of these are unclassified because <b>no carrier has been
        reported yet</b>. The evidence has been banked ahead of the first
        patient, sitting in a field the ordinary programmatic route does not
        return. Whether it is used when someone does turn up depends on whether
        the person interpreting the variant knows to look in the full record.
      </p>

      <div className="claim is-unresolved">
        <span className="state state-unresolved">Where this started</span>
        <p>
          Two variants in the same small region of the gene I was studying carry
          the strongest functional evidence tier the framework allows, and have
          never been classified by any submitter. Both are absent from
          population data. That is evidence banked ahead of the first carrier,
          and noticing it is what prompted this census. The census then showed it
          is not a peculiarity of that region or that gene.
        </p>
        <div className="falsifier">
          <b>What would change the reading</b>
          Evidence that the two variants have in fact been observed in patients
          and simply not submitted, which would make this a reporting gap rather
          than evidence arriving early.
        </div>
      </div>

      <h2>What this is not</h2>

      <p>
        It is a measurement of a database, not an audit of clinical practice. It
        shows the field is absent from one access route and unread by the tools
        surveyed. It does not measure how many real interpretation decisions
        were affected, which would require knowing which route each tool took in
        each case.
      </p>

      <p>
        The omission is documented rather than hidden. The database publishes
        the behaviour in its own documentation. The finding is that the omission
        is consequential, not that it is concealed, and the result survives that
        correction.
      </p>

      <div className="notice">
        <b>Detection is by field presence, not by quality.</b> A record counts if
        it carries the block. Whether every block holds a meaningful measurement
        was not assessed. The evidence-code count comes from pattern matching
        over free text with inconsistent capitalisation, so it is a floor rather
        than a total. One release, one snapshot: these counts drift weekly.
      </div>

      <div className="next">
        <a href="/papers#clinvar-functional-evidence">The paper</a>
        <a href="/papers#ntd-vus-resource">Seventeen variants nominated for testing</a>
        <a href="/limitations">What this cannot establish</a>
      </div>
    </div>
  );
}
