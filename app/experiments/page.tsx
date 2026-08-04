import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments",
  description:
    "Two costed, falsifiable protocols for any laboratory able to run them: an allele-resolved surface expression assay, and a base-editing validation in human cardiomyocytes.",
  alternates: { canonical: "/experiments" },
};

export default function Experiments() {
  return (
    <div className="wrap">
      <p className="eyebrow">Experiments</p>

      <h1 className="page-title">
        Two protocols, costed, for anyone who could run them.
      </h1>

      <p className="standfirst">
        This is the page most likely to change something. Both experiments are
        designed to be falsifiable, and a clean negative result from either one
        is a useful outcome that would be published as readily as a positive.
      </p>

      <div className="notice">
        <b>This is not a request about my own care.</b> I am a patient, and my
        treatment stays with my physicians. These protocols exist because the
        questions they answer affect other people carrying variants in this
        region, several of whom do not know it yet.
      </div>

      <h2>Experiment one: which copy reaches the surface</h2>

      <p>
        The question is the one that gates every route on this site: does the
        broken copy simply fail, or does it interfere with the working copy?
      </p>

      <p>
        Measuring total current cannot answer it, because both explanations
        predict the same total. The experiment has to resolve the two copies
        separately: not how much channel reaches the cell surface altogether,
        but how much of each copy gets there.
      </p>

      <div className="claim is-unresolved">
        <span className="state state-unresolved">The design</span>
        <p>
          Allele-resolved surface expression in the heterozygous condition,
          which means both copies present together as they are in a person.
          Read out per copy rather than in total, with the glycosylation state
          distinguished so that protein stuck before the surface can be told
          apart from protein that arrived.
        </p>
        <div className="falsifier">
          <b>How it resolves either way</b>
          If both copies arrive at the surface in normal proportion and current
          is still down by a third, the defect is at the surface and the
          interference model is wrong. If the broken copy is depleted, the
          retention model survives and I am wrong.
        </div>
      </div>

      <p className="small">
        Approximately 16,670 US dollars and 26 weeks, with a pre-specified
        stopping rule at week 12 so that the work can be halted early if the
        readout is not separating.
      </p>

      <h2>Experiment two: does the correction work in a human heart cell</h2>

      <p>
        Only worth running if the first experiment supports it. A base editor
        changes a single DNA letter back without cutting the strand. A guide has
        been designed for this variant and scanned against the whole genome for
        places it might act by mistake, but nothing has been tested in a cell.
      </p>

      <div className="claim is-believed">
        <span className="state state-believed">The design</span>
        <p>
          Editing in human induced pluripotent stem cell derived
          cardiomyocytes, which are heart muscle cells grown from a
          person&rsquo;s own reprogrammed cells, with current measured before
          and after and the predicted off-target sites sequenced directly.
        </p>
        <div className="falsifier">
          <b>How it resolves either way</b>
          If current does not recover after confirmed correction, the mechanism
          is wrong. If editing occurs at predicted off-target sites, the
          specificity claim is wrong.
        </div>
      </div>

      <p className="small">
        Approximately 45,342 US dollars and 42 weeks.
      </p>

      <h2>What this cannot become</h2>

      <p>
        Neither experiment produces a therapy, and no result from either would
        change anyone&rsquo;s treatment. The honest ceiling on both is
        information: whether a mechanism is right, and whether a designed guide
        behaves as predicted in a human cell.
      </p>

      <p>
        Brugada syndrome also has no cheap animal test, for reasons set out on
        the <a href="/routes">routes page</a>. That constraint does not go away
        with either of these results.
      </p>

      <h2>If you can run one of these</h2>

      <p>
        The full protocols, including the cost breakdown and the stopping rule,
        are available on request, and a clean negative result is welcome. It
        would close a hypothesis honestly and save other people from pursuing
        the wrong mechanism.
      </p>

      <div className="next">
        <a href="/science">Why the first question is unresolved</a>
        <a href="/papers">The papers behind both designs</a>
        <a href="/limitations">What neither experiment would establish</a>
      </div>
    </div>
  );
}
