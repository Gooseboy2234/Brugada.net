import type { Metadata } from "next";
import { MEASUREMENT, VARIANT } from "../content";

export const metadata: Metadata = {
  title: "The science",
  description:
    "How SCN5A R104Q reduces the current that starts each heartbeat, and the single question that gates every therapeutic route: whether the broken copy simply fails, or interferes with the healthy one.",
  alternates: { canonical: "/science" },
};

export default function Science() {
  return (
    <div className="wrap">
      <p className="eyebrow">The science</p>

      <h1 className="page-title">
        The measurement, and the question nobody has answered.
      </h1>

      <p className="standfirst">
        The starting number is solid. What it means inside a human heart is not.
        That gap is the honest centre of this project, and it gates every route
        on the site.
      </p>

      <h2>Where the variant sits</h2>

      <p>
        The sodium channel is a large protein threaded through the surface of a
        heart cell. Before the part that spans the membrane begins, a stretch of
        it hangs inside the cell, called the N-terminal domain, meaning the
        first section of the protein rather than the part embedded in the
        membrane. Position 104 is in that stretch, and it sits against a
        negatively charged neighbour at position 84.
      </p>

      <p>
        Replacing arginine with glutamine removes a positive charge from a
        position that is buried inside the folded protein rather than exposed at
        its surface, and that is where the structural argument starts. It comes
        from an experimentally determined structure rather than a computational
        model.{" "}
        <span className="src">
          <a href="https://www.rcsb.org/structure/8VYJ">
            RCSB 8VYJ, cryo-electron microscopy
          </a>
        </span>
      </p>

      <div className="notice">
        <b>A caution about this section.</b> Five separate analyses in this
        project have measured how buried that position is, and they disagree with
        each other depending on the method and on whether the domain is measured
        alone or inside the whole channel. No single percentage is quoted here
        for that reason. Two candidate explanations for why the position matters,
        local strain and exposed water-repelling surface, were each tested and
        eliminated when a variant known to be harmless scored just as badly.
      </div>

      <h2>The open question</h2>

      <p>
        A person with this variant has one working copy of the gene and one
        broken copy. There are two very different things the broken copy could be
        doing, and they lead to different conclusions about treatment.
      </p>

      <ul className="plain">
        <li>
          <b>It simply sits out.</b> The broken copy never reaches the cell
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

      <div className="notice">
        <b>Corrected since: the figure that was here has been withdrawn.</b> It
        drew the comparison as 50 percent expected against 34.1 percent
        measured. Both numbers were rescaled by dividing the laboratory
        measurement by two, which assumes the two copies add perfectly. The same
        study measured the two-copy case directly and got 218.4 percent of one
        copy rather than 200, so the correct pair is {MEASUREMENT.simpleLoss}{" "}
        against {MEASUREMENT.rescaled}. The figure is held back until it can be
        redrawn rather than shown with the superseded pair. The sample-size
        panel it carried was computed against the old pair and has not been
        recalculated.
      </div>

      <div className="readout">
        <span className="readout-value">{MEASUREMENT.rescaled}%</span>
        <p className="readout-label">
          of the current a normal two-copy heart would produce, rescaled from the
          laboratory measurement. Simple failure of one copy would give{" "}
          {MEASUREMENT.simpleLoss} percent, so about{" "}
          {Math.round(MEASUREMENT.gapPoints)} percentage points are unexplained.
        </p>
      </div>

      <div className="claim is-unresolved">
        <span className="state state-unresolved">Unresolved</span>
        <p>
          That gap is the entire question, and the standard assay cannot resolve
          it even in principle. The two competing explanations are algebraically
          degenerate, meaning they predict the same current. Measuring harder
          with the same method cannot separate them, which is a property of the
          measurement itself rather than a shortcoming of the studies that used
          it.
        </p>
        <div className="falsifier">
          <b>What would settle it</b>
          An assay that resolves each copy separately rather than measuring only
          the total. The design is on{" "}
          <a href="/experiments">the experiments page</a>, and its internal
          control is stated in advance.
        </div>
      </div>

      <p>
        This matters beyond one variant. If the broken copy interferes with the
        working one, the target is not this variant but the whole class of
        changes in this gene that suppress their healthy partner, which is a
        fifth to a third of Brugada patients who have an identified gene. If it
        simply sits out, that class does not exist and several routes on this
        site lose their rationale.
      </p>

      <h2>Why a single number is not the whole story</h2>

      <p>
        The {MEASUREMENT.heterozygous} percent figure comes from a cell that is
        not a heart cell, engineered to make this protein. Those cells lack the
        partner proteins and the alternative forms of the protein that a real
        heart muscle cell has. The authors of the closest methodological work say
        so themselves. Whether the interference operates in a human heart cell is
        the thing that has not been tested.
      </p>

      <p>
        There is also direct evidence that the two systems can disagree. For one
        variant, the same measurement gave a 33 to 46 percent current reduction
        in heart cells grown from a patient against 50 percent in an engineered
        line, with additional differences that the engineered system did not show
        at all.
      </p>

      <div className="next">
        <a href="/routes">What this means for the therapeutic routes</a>
        <a href="/experiments">The experiment that would settle it</a>
        <a href="/limitations">What none of this establishes</a>
      </div>
    </div>
  );
}
