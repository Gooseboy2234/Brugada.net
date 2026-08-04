import type { Metadata } from "next";
import { EXPERIMENTS, SITE } from "../content";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Two costed, falsifiable protocols for any laboratory able to run them: a base-editing validation at 17,894 dollars over 26 weeks, and the mechanism experiment at 45,342 dollars over 42 weeks.",
  alternates: { canonical: "/experiments" },
};

const usd = (n: number) => n.toLocaleString("en-US");

export default function Experiments() {
  return (
    <div className="wrap">
      <p className="eyebrow">Experiments</p>

      <h1 className="page-title">
        Two protocols, costed, for anyone who could run them.
      </h1>

      <p className="standfirst">
        This is the page most likely to change something. Both experiments are
        designed to be falsifiable, and a clean negative result from either would
        be published as readily as a positive one.
      </p>

      <div className="notice">
        <b>This is not a request about anyone&rsquo;s care.</b> I am a patient,
        and my own treatment stays with my physicians. These exist because the
        questions they answer affect other people carrying variants in this
        region, several of whom do not know it yet.
      </div>

      {EXPERIMENTS.map((x) => (
        <section key={x.n}>
          <h2>
            Experiment {x.n}: {x.name}
          </h2>

          <p className="lede">{x.question}</p>

          <div className="readout">
            <span className="readout-value">{usd(x.costMin)}</span>
            <p className="readout-label">
              US dollars, {x.costNote}. {x.weeksNote}. Personnel salary is
              excluded throughout, and for the mechanism experiment that
              exclusion hides the largest real cost.
            </p>
          </div>

          <h3>What it gates</h3>
          <p>{x.gates}</p>

          <h3>The design</h3>
          <p>{x.design}</p>

          <h3>How it resolves</h3>
          <p>{x.resolves}</p>

          <div className="claim is-dead">
            <span className="state state-dead">Stated in advance</span>
            <p>{x.kill}</p>
          </div>

          <h3>What it needs</h3>
          <p>{x.needs}</p>
        </section>
      ))}

      <h2>Which one to run first</h2>

      <p>
        They are not the same experiment and the trade is real. The editing proof
        is roughly a third of the cost, needs no electrophysiologist, and reaches
        an answer in half the time. The mechanism experiment is worth more
        because it gates more: it decides the correction threshold for every
        remaining route.
      </p>

      <p>
        If a laboratory can run only one, the editing proof is the better first
        favour to ask, because it is small, self-contained and fails fast. If a
        laboratory already has a patch clamp rig and an electrophysiologist, the
        mechanism experiment is the better use of that capability and nobody else
        appears to be doing it. The two share a cell line, so running them
        together saves roughly 8,000 dollars.
      </p>

      <h2>The detail that would have cost a month</h2>

      <p>
        The mechanism experiment needs to count the broken protein and the
        working protein separately at the cell surface, and no antibody can tell
        them apart. The standard way to do this is to cut the protein into
        fragments with an enzyme and weigh them.
      </p>

      <p>
        The default enzyme cuts after arginine. Position 104{" "}
        <b>is</b> an arginine, so it is itself a cutting site, and the variant
        removes it. The working copy gives a fragment four building blocks long,
        far too short to identify. The variant gives one twenty-one long. The two
        cannot be compared as a ratio because the change destroys the very site
        the method depends on.
      </p>

      <p>
        A different enzyme, which cuts only after lysine, leaves position 104
        untouched. Both copies then give the same twenty-six-block fragment,
        differing by 28.04 in mass, which any modern instrument separates
        easily. That was checked computationally before anyone was asked to run
        it.
      </p>

      <h2>What I am asking for</h2>

      <p>
        Not that anyone takes the analysis on trust. Every number traces to a
        named source with an identifier, and the working is public. The ask is
        narrower than a collaboration:
      </p>

      <div className="ask">
        Tell me if either experiment is wrong. If the three-line design has a
        flaw, or the sample size is off, that correction is worth more to me than
        a polite yes.
      </div>
      <div className="ask">
        Tell me if the numbers are wrong, especially the sequencing quote and the
        core facility rates. Several are placeholders rather than quotes, and
        they are marked as such in the full protocol.
      </div>
      <div className="ask">
        If you have a patch clamp rig and the interest, the mechanism experiment
        appears to be unclaimed, and it would settle a question the field
        currently leaves open.
      </div>
      <div className="ask">
        If you have a molecular biology bench and a spare 17,000 dollars, the
        editing proof is a contained project with a kill switch at week 12.
      </div>

      <p>
        The full protocols, including every line item, the power calculation and
        the decision rules, are yours on request. Write to{" "}
        <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>. A correction is
        as welcome as an offer to run something.
      </p>

      <div className="next">
        <a href="/science">Why the first question is unresolved</a>
        <a href="/routes">What each result would unblock</a>
        <a href="/limitations">What neither experiment would establish</a>
      </div>
    </div>
  );
}
