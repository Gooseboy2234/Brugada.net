import type { Metadata } from "next";
import { VARIANT } from "../content";

export const metadata: Metadata = {
  title: "For carriers",
  description:
    "Plain language for someone who has just been told they carry an SCN5A variant, including what the report words mean and what to ask an electrophysiologist.",
  alternates: { canonical: "/for-carriers" },
};

export default function ForCarriers() {
  return (
    <div className="wrap">
      <p className="eyebrow">For carriers</p>

      <h1 className="page-title">
        If you just got the result and it is late at night.
      </h1>

      <p className="standfirst">
        No jargon on this page. If you have been handed a genetics report you
        cannot read, this is what the words mean and what is worth asking.
      </p>

      <div className="notice">
        <b>This page cannot tell you your risk.</b> It can tell you what the
        words mean and what questions get useful answers. Your risk depends on
        your whole picture and only a doctor who has it can judge.
      </div>

      <h2>What the report is saying</h2>

      <p>
        A gene is a set of instructions. <b>{VARIANT.gene}</b> is the instruction
        set for a part of the heart that starts each beat&rsquo;s electrical
        signal. A <b>variant</b> is a spelling difference in that instruction
        set. Everyone has thousands of them and almost all are harmless.
      </p>

      <p>
        Your report will classify the variant. The words usually mean:
      </p>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>What it says</th>
              <th>What it means</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pathogenic, or likely pathogenic</td>
              <td>
                There is good evidence this spelling difference causes a
                problem.
              </td>
            </tr>
            <tr>
              <td>Variant of uncertain significance, often shortened to VUS</td>
              <td>
                Nobody knows yet. This is not bad news. It is an absence of
                information, and it is the most common result.
              </td>
            </tr>
            <tr>
              <td>Conflicting</td>
              <td>
                Different laboratories filed different opinions. Worth asking
                whether the disagreement is current or whether one submission is
                simply old.
              </td>
            </tr>
            <tr>
              <td>Benign, or likely benign</td>
              <td>There is good evidence it does not cause a problem.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Two things worth knowing</h2>

      <p>
        <b>Carrying a variant is not the same as having the condition.</b> Most
        people who carry a variant like this never develop symptoms. In my own
        family the same variant is present in my father, who has never had a
        problem from it.
      </p>

      <p>
        <b>Uncertain does not mean dangerous.</b> A variant of uncertain
        significance means the evidence has not been gathered, not that it is
        being withheld from you.
      </p>

      <h2>What to ask an electrophysiologist</h2>

      <p>
        An electrophysiologist is a cardiologist who specialises in the
        heart&rsquo;s electrical system. These questions tend to get useful
        answers:
      </p>

      <div className="ask">
        Does this variant change anything about my care right now, or is it
        information to keep on file?
      </div>
      <div className="ask">
        Is there anything I should avoid? Certain medications and high fevers
        matter for some heart rhythm conditions, and there are published lists a
        specialist can check.
      </div>
      <div className="ask">
        Should anyone else in my family be tested, and if so, who first?
      </div>
      <div className="ask">
        If the report says uncertain or conflicting, what would have to happen
        for the classification to change, and would you be told if it did?
      </div>
      <div className="ask">
        What symptoms should make me call you rather than wait for the next
        appointment?
      </div>

      <h2>Where the reliable information is</h2>

      <p>
        For the public record on a specific variant, ClinVar is the database
        laboratories file into, and it is free to search.{" "}
        <span className="src">
          <a href={VARIANT.clinvarUrl}>
            ClinVar entry for this variant, {VARIANT.clinvar}
          </a>
        </span>
      </p>

      <p>
        A genetic counsellor is the person whose actual job is explaining this,
        and asking to see one is a reasonable request.
      </p>

      <h2>One more thing</h2>

      <p>
        I built this because I got the same result and could not read anything I
        found. If the science pages are useful to you, they are there. If they
        are not, that is fine too. The single most useful thing on this site for
        most people is the list of questions above.
      </p>

      <div className="next">
        <a href="/">What is known about this variant</a>
        <a href="/limitations">What this work cannot tell you</a>
      </div>
    </div>
  );
}
