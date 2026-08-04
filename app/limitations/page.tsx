import type { Metadata } from "next";
import { MEASUREMENT } from "../content";

export const metadata: Metadata = {
  title: "Limitations",
  description:
    "What each result on this site cannot establish. A scientific page rather than a disclaimer, listing the specific boundary of every claim made here.",
  alternates: { canonical: "/limitations" },
};

export default function Limitations() {
  return (
    <div className="wrap">
      <p className="eyebrow">Limitations</p>

      <h1 className="page-title">What this work cannot tell you.</h1>

      <p className="standfirst">
        This is not a disclaimer page. It is a list of the specific boundary of
        each claim on this site, which is the part most easily lost when work
        gets summarised.
      </p>

      <h2>Nothing here was measured in a heart</h2>

      <p>
        Every functional number on this site comes from cells grown in a dish
        and engineered to produce this channel. That is the standard way to
        measure a variant, and it is not a heart. A heart has different cell
        types, different partner proteins, a different environment, and a
        gradient across the ventricular wall that no dish reproduces.
      </p>

      <p className="small">
        Applies to: the {MEASUREMENT.heterozygousPercent} percent figure, the{" "}
        {MEASUREMENT.rescaledPercent} percent rescaling, and every statement
        about current.
      </p>

      <h2>The central mechanistic question is open</h2>

      <p>
        Whether the broken copy simply fails or actively interferes with the
        working copy has not been resolved. The standard assay cannot resolve
        it: the two models predict the same number. Any statement on this site
        about what a therapy would do rests on that unresolved question, and
        would need revisiting if the answer came out the other way.
      </p>

      <h2>Computational prediction nominates, it does not prove</h2>

      <p>
        The base-editing guide, the off-target scan, and the variant
        nominations are predictions. A predicted off-target site is a place
        worth checking, not a place where editing was observed. A nominated
        variant is a candidate for testing, not a variant known to be harmful.
      </p>

      <p>
        This project has direct evidence of how badly prediction can fail here:
        given four variants already known to break the channel, the
        folding-stability method it had been relying on identified one.
      </p>

      <h2>Specific boundaries, by result</h2>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>The result</th>
              <th>What it does not establish</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Off-target scan for the base-editing guide</td>
              <td>
                It was run to a set number of mismatches, and the tail beyond
                that was not annotated. Bulged alignments were not modelled.
                Complete within its stated span, not absolutely complete.
              </td>
            </tr>
            <tr>
              <td>The upregulation ceiling</td>
              <td>
                It rules out one specific mechanism, boosting output by
                redirecting non-productive message. It does not rule out every
                way of raising channel output.
              </td>
            </tr>
            <tr>
              <td>Seventeen nominated variants</td>
              <td>
                They are candidates for testing. The other 114 are uninformative
                rather than benign, which is a different thing and matters to
                anyone carrying one.
              </td>
            </tr>
            <tr>
              <td>The reclassification argument</td>
              <td>
                It is an argument that the evidence should be reviewed. Only the
                submitting laboratories and the expert panel can change a
                classification.
              </td>
            </tr>
            <tr>
              <td>The structural argument</td>
              <td>
                One deposited structure, one conformation. Proteins move, and a
                single set of coordinates does not capture that.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Work that was retired</h2>

      <p>
        An earlier version of this site presented a different hypothesis: that a
        small molecule could stabilise the protein while it folded, and it
        carried a screen of candidate compounds. That work has been retired. The
        prediction method underneath it failed its own calibration, and the
        route carries a hazard if the broken copy turns out to interfere with
        the working one.
      </p>

      <p>
        It is named here rather than quietly deleted, because anyone who read
        the earlier version deserves to know it was withdrawn and why. Nothing
        from that campaign should be cited.
      </p>

      <h2>Not peer reviewed</h2>

      <p>
        None of these results has been through peer review. They are posted as
        preprints so the reasoning is visible early. That is a deliberate
        choice, and it means the appropriate level of confidence is provisional.
      </p>

      <div className="next">
        <a href="/papers">The papers</a>
        <a href="/science">The open question in detail</a>
      </div>
    </div>
  );
}
