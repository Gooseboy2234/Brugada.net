import type { Metadata } from "next";
import { COMPARATOR, PAPERS, PRECEDENT, ROUTES } from "../content";

export const metadata: Metadata = {
  title: "Therapeutic routes",
  description:
    "All nine routes considered for SCN5A R104Q, ranked, with the measurement that closed each dead one, and why Brugada syndrome has no cheap animal test.",
  alternates: { canonical: "/routes" },
};

const stateClass: Record<string, string> = {
  leading: "state-known",
  conditional: "state-believed",
  weak: "state-believed",
  dead: "state-dead",
  "not applicable": "state-dead",
  "current care": "state-unresolved",
};

export default function Routes() {
  return (
    <div className="wrap">
      <p className="eyebrow">Therapeutic routes</p>

      <h1 className="page-title">
        Nine routes, ranked, including the two that are closed.
      </h1>

      <p className="standfirst">
        Two of these are dead and one does not apply. They are listed anyway,
        each with the measurement that closed it. A page showing only the live
        options would be advocacy rather than a record.
      </p>

      <div className="notice">
        <b>None of this is a treatment, or close to one.</b> The strongest
        statement available is that one route now has a designed guide, a
        genome-wide safety scan, and a costed validation experiment. That is a
        long way from a therapy, and saying so is what makes the rest
        believable.
      </div>

      <h2>What these are being compared against</h2>

      <p>
        There is a common assumption that a therapy for this condition would have
        to beat an implanted defibrillator. For most people carrying a variant
        like this one, that comparison does not apply. Guideline indications for
        a device require a prior cardiac arrest, a documented sustained
        arrhythmia, or fainting from an arrhythmia together with a spontaneous
        type 1 pattern on an electrocardiogram. Most carriers are asymptomatic,
        meet none of those, and therefore have no protection at all.
      </p>

      <p>
        A device also does not treat the disease. It stops an arrhythmia after it
        has already started, and does nothing to the sodium current, the protein
        or the gene. It carries real measured harm as well: inappropriate shocks,
        meaning a full discharge delivered to a conscious person who did not need
        one, occurred in {COMPARATOR.inappropriateShockPct} percent of patients
        at a crude rate of {COMPARATOR.annualRatePct} percent per year, across{" "}
        {COMPARATOR.studies} studies and{" "}
        {COMPARATOR.patients.toLocaleString()} patients with inherited rhythm
        conditions.{" "}
        <span className="src">
          <a href={COMPARATOR.pmidUrl}>
            {COMPARATOR.source}, PMID {COMPARATOR.pmid}
          </a>
        </span>
      </p>

      <p>
        So for most of the people a therapy would be developed for, the
        comparator is no treatment at all. That is the correct framing and it is
        the one used throughout this site.
      </p>

      <h2>The nine routes</h2>

      {ROUTES.map((route) => {
        const paper = route.paper
          ? PAPERS.find((p) => p.n === route.paper)
          : undefined;
        return (
          <div className="route" key={route.name}>
            <div className="route-head">
              <h3
                className="route-name"
                style={{ margin: 0, border: 0, padding: 0 }}
              >
                {route.rank ? `${route.rank}. ` : ""}
                {route.name}
              </h3>
              <span className={`state ${stateClass[route.state]}`}>
                {route.state}
              </span>
            </div>

            <p className="route-blocker">
              <b>What blocks it</b>
              {route.blocker}
            </p>

            <p className="route-detail">{route.detail}</p>

            {route.falsifier && (
              <div className="falsifier">
                <b>What would change this verdict</b>
                {route.falsifier}
              </div>
            )}

            {route.correction && (
              <div className="falsifier">
                <b>Corrected since</b>
                {route.correction}
              </div>
            )}

            {paper && (
              <p className="paper-meta">
                <a href={`/papers#${paper.slug}`}>
                  Paper {paper.n}
                  {paper.result === "negative" ? ", a negative result" : ""}
                </a>
              </p>
            )}
          </div>
        );
      })}

      <h2>The route that died on a measurement</h2>

      <p>
        Raising output from the healthy copy was the most attractive route on
        this list, because it was the only one that did not depend on resolving
        the mechanism first. It needed a reserve of non-productive message to
        redirect, and the analysis said in advance that the route would die if
        that reserve turned out to be a few percent.
      </p>

      <figure style={{ margin: "2rem 0" }}>
        <img
          src="/figures/scn5a_splicing_measurement.png"
          alt="Panel a: splice-junction reads showing SCN5A in heart at a median of 0.00 percent against SCN1A in brain cortex at 1.40 percent. Panel b: isoform estimates, same ordering, smaller gap. Panel c: redirecting every non-productive transcript buys 1.06-fold against the 1.5-fold the route needs."
          width={1400}
          height={1039}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="small" style={{ marginTop: "0.75rem" }}>
          Measured at 0.0045 percent across 827 human heart samples, against
          1.388 percent for the equivalent gene in brain where the same strategy
          already works in children. The ceiling is 1.06-fold where the route
          needed about 1.5.
        </figcaption>
      </figure>

      <p>
        It was attractive because it was mechanism-independent. It is dead
        because the substrate is not there. Those are independent reasons, and a
        measurement rather than an assumption settled it.
      </p>

      <h2>Why nobody has done this already</h2>

      <p>
        The usual answer is that a condition is too rare to attract attention.
        That is not the reason here, and the real one is more interesting because
        it will not change.
      </p>

      <p>
        The mouse study that makes gene editing look ready for the heart
        corrected a different variant in this same gene, {PRECEDENT.variant},
        which causes {PRECEDENT.condition}. That is a{" "}
        {PRECEDENT.direction} change, the opposite of this one. Its effect shows
        up as a measurable interval on a mouse electrocardiogram, so a researcher
        can inject, record, and watch the number move. A single injection
        corrected up to {PRECEDENT.correctionMax} percent of transcripts, and
        above {PRECEDENT.thresholdPct} percent correction the disease signature
        disappeared.{" "}
        <span className="src">
          <a href={PRECEDENT.pmidUrl}>
            {PRECEDENT.source}, PMID {PRECEDENT.pmid}
          </a>
        </span>
      </p>

      <p>
        Brugada syndrome has no equivalent readout. Its signature depends on a
        difference in electrical recovery across the thickness of the right
        ventricular wall, and mouse hearts do not reproduce that gradient. So an
        editing study in this condition can measure current in isolated cells,
        and it can show the letter was corrected, but it cannot point at an
        animal and say the disease went away.
      </p>

      <p>
        That is the difference between one paper and five years of work. No
        amount of funding removes it.
      </p>

      <h2>The collision that two separate analyses found</h2>

      <p>
        The gene this variant sits in has a close relative, and the region
        around position 104 is similar enough between them that molecules
        designed against one can reach the other. Two independent analyses
        found this separately: one working on an RNA molecule, one on a DNA
        one, sharing no code and no scoring method.
      </p>

      <p>
        That makes it a property of the target sequence rather than of any one
        design. Anyone attempting this position with a short molecule will meet
        the same constraint. It does not close either editing route, because the
        residual risk is concentrated at one named place rather than scattered,
        and a concentrated risk at a named locus is a sequencing target rather
        than an unknown hazard. It does mean that place has to be checked in
        any experiment.
      </p>

      <h2>Two editors, and the trade between them</h2>

      <figure style={{ margin: "2rem 0" }}>
        <img
          src="/figures/PRIME_EDITING_FIGURE.png"
          alt="Panel a: prime editing recovers a canonical docking sequence where base editing has none. Panel b: each requirement in series removes almost every surviving off-target site, leaving three at one locus. Panel c: relaxing the docking rule multiplies nickable sites. Panel d: in the heart, published prime editing correction of 11 percent in vivo and 34.8 percent in vitro sits far below base editing at 99.2 percent, and below the 60 percent threshold."
          width={1323}
          height={1400}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="small" style={{ marginTop: "0.75rem" }}>
          Prime editing is the better-designed option at this site and the worse
          delivered one. Base editing has the efficiency, prime editing has the
          specificity, and neither has been tested in a human heart cell.
        </figcaption>
      </figure>

      <div className="next">
        <a href="/experiments">The two costed protocols</a>
        <a href="/papers">The papers behind each verdict</a>
        <a href="/limitations">What none of this establishes</a>
      </div>
    </div>
  );
}
