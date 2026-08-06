import type { Metadata } from "next";
import { EXPERIMENTS, MEASUREMENT, ROUTES, SITE } from "../content";

export const metadata: Metadata = {
  title: "What is open",
  description:
    "The unresolved questions in this project, what each one blocks downstream, and the experiment that would clear it. One page instead of three.",
  alternates: { canonical: "/open" },
};

// This page invents nothing. Every blocker below is the `blocker` field already
// carried by its route in content.ts, and every exit is one of the two costed
// experiments. The point is the ordering: which answer unlocks which route.
export default function Open() {
  const live = ROUTES.filter((r) => r.state !== "dead" && r.blocker);
  const closed = ROUTES.filter((r) => r.state === "dead");

  return (
    <div className="wrap">
      <p className="eyebrow">What is open</p>

      <h1 className="page-title">
        One question is holding up most of the others.
      </h1>

      <p className="standfirst">
        The routes page says where each approach stands. The experiments page
        says what it would cost to settle things. Neither says which answer
        unblocks which route, so this page does.
      </p>

      <h2>The question everything else waits on</h2>

      <div className="claim is-unresolved">
        <span className="state state-unresolved">Unresolved</span>
        <p>
          <b>Does the broken copy stay inside the cell, or does it reach the
          surface and interfere with the working one?</b> The measured current
          is {MEASUREMENT.rescaled} percent of what two working copies would
          give, against {MEASUREMENT.simpleLoss} percent for a copy that simply
          fails. Those{" "}
          {Math.round(MEASUREMENT.gapPoints)} percentage points are the whole
          question, and the standard assay cannot separate the two explanations
          even in principle, because they predict the same current.
        </p>
        <div className="falsifier">
          <b>What would settle it</b>
          An assay that reads each copy separately rather than the total. It is
          costed in full on <a href="/experiments">the experiments page</a>, and
          its internal control is stated in advance.
        </div>
      </div>

      <p>
        This matters beyond one variant. If the broken copy interferes, the
        target is the whole class of changes in this gene that suppress their
        healthy partner. If it simply sits out, that class does not exist and
        several routes below lose their rationale rather than their funding.
      </p>

      <h2>What is blocked, and by what</h2>

      <p>
        Every route still open is held up by something specific. None of these
        is a shortage of effort, and none is waiting on an idea.
      </p>

      {live.map((r) => (
        <div className="beat" key={r.name}>
          <div className="beat-head">
            <span className="beat-date">{r.name}</span>
            <span className={`state state-${r.state.replace(/\s+/g, "-")}`}>
              {r.state}
            </span>
          </div>
          <p className="beat-line">
            <b>Blocked by</b>
            {r.blocker}
          </p>
          {r.falsifier && (
            <p className="beat-line">
              <b>What would decide it</b>
              {r.falsifier}
            </p>
          )}
        </div>
      ))}

      <h2>What is already closed</h2>

      <p>
        {closed.length} of the ten routes are shut, and they are not waiting on
        anything. Each was closed by a measurement rather than by losing
        interest, and the measurement is named on{" "}
        <a href="/routes">the routes page</a>. A closed route is a result: it is
        one fewer thing for the next person to try.
      </p>

      <h2>The two exits</h2>

      <p>
        Both are ordinary laboratory work for a group already equipped, and both
        are written up so that someone else could run them without asking
        anything further.
      </p>

      {EXPERIMENTS.map((e) => (
        <div className="beat" key={e.name}>
          <div className="beat-head">
            <span className="beat-date">{e.name}</span>
          </div>
          <p className="beat-line">
            <b>What it needs</b>
            {e.needs}
          </p>
        </div>
      ))}

      <h2>What is not blocked</h2>

      <p>
        Two results stand on their own and need nothing from the question above.
        The measurement of a public database, which concerns every gene in it
        rather than this variant, has <a href="/census">its own page</a>. The
        off-target counting method holds for any base-editing target. Both are{" "}
        <a href="/papers">published with permanent identifiers</a>.
      </p>

      <h2>If you can move any of this</h2>

      <p>
        The bottleneck is not analysis. It is that the deciding experiment needs
        a bench, and this project does not have one. If you have one, or know
        someone who does, that is the single most useful thing anyone reading
        this could offer: <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
      </p>

      <div className="next">
        <a href="/routes">Every route and its state</a>
        <a href="/experiments">The two experiments in full</a>
        <a href="/limitations">What none of this establishes</a>
      </div>
    </div>
  );
}
