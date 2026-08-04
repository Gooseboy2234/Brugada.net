import type { Metadata } from "next";
import { PAPERS, ROUTES } from "../content";

export const metadata: Metadata = {
  title: "Therapeutic routes",
  description:
    "All six therapeutic routes considered for SCN5A R104Q, ranked, with the measurement that closed each dead one. Includes why no cheap animal model exists for Brugada syndrome.",
  alternates: { canonical: "/routes" },
};

const stateClass: Record<string, string> = {
  leading: "state-known",
  conditional: "state-believed",
  weak: "state-believed",
  dead: "state-dead",
  "not applicable": "state-dead",
};

export default function Routes() {
  return (
    <div className="wrap">
      <p className="eyebrow">Therapeutic routes</p>

      <h1 className="page-title">
        Six routes, ranked, including the ones that are closed.
      </h1>

      <p className="standfirst">
        Two of these are dead and one does not apply. They are listed anyway,
        with the measurement that closed each one. A page showing only the live
        options would be advocacy rather than a record.
      </p>

      <div className="notice">
        <b>None of this is a treatment, or close to one.</b> The strongest
        statement available is that one route now has a designed guide, a
        genome-wide safety scan, and a costed validation experiment. That is a
        long way from a therapy.
      </div>

      {ROUTES.map((route) => {
        const paper = route.paper
          ? PAPERS.find((p) => p.n === route.paper)
          : undefined;
        return (
          <div className="route" key={route.name}>
            <div className="route-head">
              <h2
                className="route-name"
                style={{ margin: 0, border: 0, padding: 0 }}
              >
                {route.name}
              </h2>
              <span className={`state ${stateClass[route.state]}`}>
                {route.state}
              </span>
            </div>

            <p className="route-blocker">
              <b>What blocks it</b>
              {route.blocker}
            </p>

            <p className="route-detail">{route.detail}</p>

            {paper && (
              <p className="paper-meta">
                <a href={`/papers#${paper.slug}`}>
                  Paper {paper.n}: {paper.negative ? "negative result" : "result"}
                </a>
              </p>
            )}
          </div>
        );
      })}

      <h2>Why nobody has done this already</h2>

      <p>
        The usual answer to that question is that a condition is too rare to
        attract attention. That is not the reason here. The reason is that
        Brugada syndrome has no cheap animal test, and it is worth explaining
        because it will not change.
      </p>

      <p>
        The mouse study that makes DNA base editing credible for heart disease
        corrected a different kind of variant, one that makes a channel too
        active rather than not active enough. Its effect shows up as a
        measurable interval on a mouse electrocardiogram, so a researcher can
        edit, record, and see the number move.
      </p>

      <p>
        The signature of Brugada syndrome depends on a difference in electrical
        recovery across the thickness of the right ventricular wall. Mouse
        hearts do not reproduce that gradient. So an editing study in this
        condition can measure current in isolated cells, and it can show the
        letter was corrected, but it cannot point at an animal and say the
        disease went away.
      </p>

      <p>
        That is the difference between one paper and five years of work, and no
        amount of funding removes it.
      </p>

      <div className="next">
        <a href="/experiments">The two costed protocols</a>
        <a href="/papers">The papers behind each verdict</a>
        <a href="/limitations">What none of this establishes</a>
      </div>
    </div>
  );
}
