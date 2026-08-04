import type { Metadata } from "next";
import { MEASUREMENT, VARIANT } from "../content";

export const metadata: Metadata = {
  title: "The science",
  description:
    "The structural argument for how SCN5A R104Q breaks the cardiac sodium channel, and the one question that gates every therapeutic route: whether the broken copy simply fails, or interferes with the healthy one.",
  alternates: { canonical: "/science" },
};

export default function Science() {
  return (
    <div className="wrap">
      <p className="eyebrow">The science</p>

      <h1 className="page-title">
        The structural argument, and the question nobody has answered.
      </h1>

      <p className="standfirst">
        The mechanism is reasonably well supported. What happens next, in a
        heart rather than a dish, is not. That gap is the honest centre of this
        project and it gates every route on the site.
      </p>

      <h2>Where the variant sits</h2>

      <p>
        The sodium channel is a large protein threaded through the surface of a
        heart cell. Before the part that spans the membrane begins, there is a
        stretch that hangs inside the cell called the{" "}
        <span className="gloss" title="The first section of the protein, which sits inside the cell rather than in the membrane.">
          N-terminal domain
        </span>
        . Position 104 is in that stretch.
      </p>

      <p>
        In the deposited structure, arginine 104 sits against aspartate 84.
        Arginine carries a positive charge and aspartate carries a negative one,
        so the two attract in what is called a{" "}
        <span className="gloss" title="An attraction between a positively charged and a negatively charged part of a protein.">
          salt bridge
        </span>
        . Both are buried inside the folded protein rather than exposed at its
        surface. Replacing arginine with glutamine removes the positive charge
        and leaves the negative one without its partner.
      </p>

      <div className="claim is-known">
        <span className="state state-known">From deposited coordinates</span>
        <p>
          This comes from an experimentally determined structure, not a
          computational model: cryo-electron microscopy entry{" "}
          <span className="mono">{VARIANT.structure}</span>, which resolves this
          region.{" "}
          <span className="src">
            <a href={VARIANT.structureUrl}>RCSB {VARIANT.structure}</a>
          </span>
        </p>
        <p className="small">
          The contact measures 3.79 angstroms between the closest atoms. It is
          better described as a weak salt bridge than a strong one, and the
          arrangement is a backbone hydrogen bond together with a single-sided
          rather than double-sided charge contact.
        </p>
        <div className="falsifier">
          <b>What would overturn this</b>
          A higher-resolution structure placing the two residues out of contact,
          or showing the region is disordered rather than packed.
        </div>
      </div>

      <h2>The open question</h2>

      <p>
        A person with this variant has one working copy of the gene and one
        broken copy. There are two very different things the broken copy could
        be doing, and they lead to different conclusions about treatment.
      </p>

      <ul className="plain">
        <li>
          <b>It simply fails.</b> The broken copy never reaches the cell
          surface, the working copy carries on normally, and the total is about
          half of normal.
        </li>
        <li>
          <b>It interferes.</b> The broken copy actively disrupts the working
          copy, dragging the total below half.
        </li>
      </ul>

      <p>
        The measured value sits below half, which is what makes this a real
        question rather than a theoretical one.
      </p>

      <div className="readout">
        <span className="readout-value">{MEASUREMENT.rescaledPercent}%</span>
        <p className="readout-label">
          of the current a normal two-copy heart would produce, rescaled from
          the laboratory measurement. Simple failure of one copy would give{" "}
          {MEASUREMENT.simpleLossPercent} percent.{" "}
          <span className="src">
            <a href={MEASUREMENT.pmidUrl}>
              {MEASUREMENT.source}, PMID {MEASUREMENT.pmid}
            </a>
          </span>
        </p>

        <div className="gapbar" aria-hidden="true">
          <div className="gapbar-track">
            <div
              className="gapbar-fill"
              style={{ width: `${MEASUREMENT.rescaledPercent}%` }}
            />
            <div
              className="gapbar-mark"
              style={{ left: `${MEASUREMENT.simpleLossPercent}%` }}
            />
          </div>
          <div className="gapbar-key">
            <span>Measured {MEASUREMENT.rescaledPercent}%</span>
            <span>Expected if it simply fails {MEASUREMENT.simpleLossPercent}%</span>
            <span>Unexplained gap about {MEASUREMENT.gapPoints} points</span>
          </div>
        </div>
      </div>

      <div className="claim is-unresolved">
        <span className="state state-unresolved">Unresolved</span>
        <p>
          That gap of roughly {Math.round(MEASUREMENT.gapPoints)} percentage
          points is the entire question. Nobody has measured it in a human heart
          cell, and the standard assay cannot resolve it even in principle:
          the two competing explanations are algebraically degenerate, meaning
          they predict the same current. Measuring harder with the same method
          cannot separate them.
        </p>
        <div className="falsifier">
          <b>What would settle it</b>
          An assay that resolves each copy separately rather than measuring only
          the total, described on the{" "}
          <a href="/experiments">experiments page</a>.
        </div>
      </div>

      <p>
        This is stated plainly because it matters. If the broken copy interferes
        with the working one, then any approach that helps more broken protein
        reach the surface could make things worse rather than better. That is
        why one route on this site is marked closed rather than promising.
      </p>

      <h2>What was eliminated along the way</h2>

      <p>
        Two other explanations for why this position matters were tested and
        ruled out: that the substitution strains the local structure, and that
        it exposes a water-repelling surface that should stay buried. Neither
        holds. What survives is that arginine 104 anchors an acidic pocket that
        is unchanged across species.
      </p>

      <p>
        A third idea, that folding-stability prediction could identify which
        variants in this region break the channel, failed its own test. Given
        four variants already known to break it, the method caught one. That
        result is published rather than buried, because it is the result that
        closed a route this project had been pursuing.
      </p>

      <div className="next">
        <a href="/routes">What this means for treatment routes</a>
        <a href="/experiments">The experiment that would settle it</a>
        <a href="/papers">The papers behind each claim</a>
      </div>
    </div>
  );
}
