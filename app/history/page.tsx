import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "What was tried",
  description:
    "A dated record of every hypothesis pursued for SCN5A R104Q and how each one ended, including the ones this project killed itself. Most of them failed, and the failures are the point.",
  alternates: { canonical: "/history" },
};

type Beat = {
  date: string;
  believed: string;
  did: string;
  happened: string;
  outcome: "held" | "refuted" | "reversed" | "narrowed";
  self?: boolean;
};

// Every entry below describes work that is finished and, in most cases,
// retired. Nothing here is a current claim. Where a date is given it is the
// date the result landed, not the date it was written up.
const BEATS: Beat[] = [
  {
    date: "Before July",
    believed:
      "The structure being used showed the region of interest well enough to reason about.",
    did: "Checked which structures actually resolve the relevant part of the protein.",
    happened:
      "They did not. The whole project was rebuilt on a different structure, the one that resolves the position in question. Every measurement since descends from that fix.",
    outcome: "reversed",
    self: true,
  },
  {
    date: "2 July",
    believed:
      "The variant breaks a buried contact, the protein misfolds, and less of it reaches the cell surface.",
    did:
      "Measured the contact geometry, ran the first simulations, and opened two lines of attack: an existing drug that might stabilise the protein, and a second genetic change that might cancel the first.",
    happened:
      "The geometry held up. Both lines looked plausible. This is the most optimistic the project ever was.",
    outcome: "held",
  },
  {
    date: "3 July",
    believed:
      "A drug binding the well-studied part of the channel might rescue a fault in the distant part.",
    did:
      "Measured how mechanically connected the two regions are, using a free method that runs on a laptop.",
    happened:
      "They are barely connected at all: the signal between them was indistinguishable from noise, and thousands of times weaker than a genuinely coupled pair. The two regions are about 53 angstroms apart. A costly simulation booked to test this was cancelled before it ran.",
    outcome: "refuted",
  },
  {
    date: "4 to 5 July",
    believed:
      "If the drug stabilises the channel, the simulation should show the protein becoming more rigid.",
    did: "Ran the test. Then questioned the test rather than the drug.",
    happened:
      "The result was null, and the conclusion was that the measurement was on the wrong axis rather than that the drug was useless. Worth recording because that reasoning could have been motivated, and it was later overtaken anyway.",
    outcome: "narrowed",
    self: true,
  },
  {
    date: "6 July",
    believed:
      "The existing drug will stabilise the broken region directly.",
    did:
      "Tested it against the actual site, on three independent measures, alongside several alternatives.",
    happened:
      "It failed on all three. That closed the most attractive idea in the project, the one with an existing safety record and a published precedent in the same gene. A small molecule found in the same screen looked excellent instead, and became the new lead the same evening.",
    outcome: "refuted",
  },
  {
    date: "7 July",
    believed:
      "Among the millions of purchasable compounds, some will grip the site the way the missing piece did.",
    did:
      "Two independent exhaustive searches over hundreds of candidate molecules.",
    happened:
      "Zero. Neither search found a single purchasable compound that could make the required double-sided grip. Only purpose-designed molecules could, and none of those can be bought.",
    outcome: "refuted",
  },
  {
    date: "7 to 8 July",
    believed:
      "The new lead compound holds the site. It scored beautifully in the cheap test.",
    did:
      "Repeated the test three times in a full, realistic model rather than the simplified one.",
    happened:
      "It let go. Occupancy fell from 0.89 in the cheap test to 0.10 across three proper runs, and a free-energy calculation put its preferred position well away from the site entirely. The cheap test was retired for having produced a false positive, provably.",
    outcome: "refuted",
    self: true,
  },
  {
    date: "9 July, morning",
    believed:
      "An approved, cheap, widely used drug holds the site. Recorded that morning as the first approved-drug hit.",
    did: "Let the simulation run to full length instead of reading it mid-run.",
    happened:
      "By the second half of the run the compound had left completely. Occupancy zero. The claim was retracted the same day it was made, and every document leading with it was corrected.",
    outcome: "refuted",
    self: true,
  },
  {
    date: "9 July, evening",
    believed:
      "The purpose-designed molecule that survived everything so far is the lead.",
    did: "Ran it three times instead of once.",
    happened:
      "It held in one run of three. Both other runs escaped. Demoted from lead to proof of concept, with the explicit instruction not to present it as a top pick.",
    outcome: "refuted",
    self: true,
  },
  {
    date: "10 to 12 July",
    believed:
      "The compounds that survived the short test will survive a long one.",
    did: "Ran them five times longer.",
    happened:
      "One confirmed survivor escaped anyway. Length caught what replication could not. Separately, every one of 20,340 project files was audited, and the honest count was published: zero compounds had cleared all six stages, because the final stage had not been built yet.",
    outcome: "narrowed",
    self: true,
  },
  {
    date: "20 to 21 July",
    believed:
      "The ranking of the surviving compounds is settled.",
    did:
      "Re-ran the free-energy calculation with a method where the simulations exchange information, after noticing the original windows were barely communicating.",
    happened:
      "The ranking inverted. The compound labelled the winner became second, and the one labelled a mere candidate became the deepest. The labels had come from a calculation that had not converged.",
    outcome: "reversed",
    self: true,
  },
  {
    date: "23 July",
    believed:
      "A specialist might reply in a couple of weeks, if at all. Two separate predictions put the odds of a useful reply at somewhere between a quarter and a half.",
    did:
      "Sent it anyway, with the negative results left in rather than trimmed out, and against written advice to use a different channel.",
    happened:
      "A reply came the same morning. The clinician forwarded it to a laboratory that had already run the key experiment, and that group checked the structural claim themselves, corrected it, contributed a contact nobody here had noticed, and offered to talk about what came next. Both odds predictions were wrong and the channel advice was wrong.",
    outcome: "held",
  },
  {
    date: "27 July",
    believed:
      "Predicting how much a change destabilises the protein identifies which variants break it. Six weeks of screening rested on this.",
    did:
      "Tested the method against four variants already known to break this channel, chosen in advance so the answer key could not be adjusted afterwards.",
    happened:
      "It got one right out of four. Two of the misses ranked as the least damaging substitutions possible at their own positions. A second method would have reversed the conclusion entirely, which is the strongest argument for testing against reality rather than against another prediction. The premise underneath the whole compound campaign does not hold at this position, and a document written weeks earlier had already named this exact condition as the thing that would collapse the framing, with the instruction to test it first.",
    outcome: "refuted",
    self: true,
  },
  {
    date: "4 August",
    believed:
      "Raising output from the healthy copy sidesteps the unresolved mechanism, so it should work regardless.",
    did:
      "Measured the raw material it depends on across 827 human heart samples, having stated in advance that a few percent would kill the route.",
    happened:
      "0.0045 percent. Around 300 times less than in the tissue where the same strategy already works in children. The ceiling is a 1.06-fold increase where roughly 1.5 was needed. The route was attractive because it was mechanism-independent, and it is dead because the substrate is absent. Those are separate reasons.",
    outcome: "refuted",
  },
];

const label: Record<Beat["outcome"], { text: string; cls: string }> = {
  held: { text: "Held", cls: "state-known" },
  refuted: { text: "Refuted", cls: "state-dead" },
  reversed: { text: "Reversed", cls: "state-believed" },
  narrowed: { text: "Narrowed", cls: "state-unresolved" },
};

export default function History() {
  const refuted = BEATS.filter((b) => b.outcome === "refuted").length;
  const own = BEATS.filter((b) => b.self).length;

  return (
    <div className="wrap">
      <p className="eyebrow">What was tried</p>

      <h1 className="page-title">
        Most of this did not work, and that is the record.
      </h1>

      <p className="standfirst">
        A dated account of every idea pursued, and how each one ended. Of the
        entries below, {refuted} were refuted outright and {own} were killed by
        this project testing its own favourite ideas harder.
      </p>

      <div className="notice">
        <b>Everything on this page is history, not a current claim.</b> The
        compound work described here was retired in full. It is kept because a
        record that reports only what survived is a selection rather than a
        record, and because the reasons things died are more useful than the
        things themselves. For where the work actually stands, see{" "}
        <a href="/routes">the routes</a>.
      </div>

      <h2>The shape of it in one line</h2>

      <p className="lede">
        Block the channel, then rescue it from a distance, then stabilise it as
        it folds, then grip the broken site with a small molecule, then grip it
        with a rigid one, then discover that the idea underneath all of that
        does not hold at this position, and that the deciding question is one
        afternoon in somebody else&rsquo;s laboratory.
      </p>

      <h2>The timeline</h2>

      {BEATS.map((b, i) => {
        const l = label[b.outcome];
        return (
          <div className="beat" key={i}>
            <div className="beat-head">
              <span className="beat-date">{b.date}</span>
              <span className={`state ${l.cls}`}>{l.text}</span>
            </div>
            <p className="beat-line">
              <b>What was believed</b>
              {b.believed}
            </p>
            <p className="beat-line">
              <b>What was done</b>
              {b.did}
            </p>
            <p className="beat-line">
              <b>What happened</b>
              {b.happened}
            </p>
            {b.self && (
              <p className="beat-self">
                This one was caught by the project itself.
              </p>
            )}
          </div>
        );
      })}

      <h2>The hazard that closed it, rather than the disappointment</h2>

      <div className="claim is-dead">
        <span className="state state-dead">Why this route stays closed</span>
        <p>
          The compound idea did not merely fail to work. If the broken copy
          interferes with the healthy one at the cell surface, then helping more
          broken protein get there could make the problem worse rather than
          better. That is a reason to stop, not a reason to try harder, and it
          is independent of whether any particular molecule gripped anything.
        </p>
        <div className="falsifier">
          <b>What would reopen it</b>
          If the mechanism experiment shows the broken copy is held back inside
          the cell rather than interfering at the surface, the hazard goes away
          and the route is worth revisiting.
        </div>
      </div>

      <h2>What the pattern says</h2>

      <p>
        The corrections got deeper over time. The early ones are operational: a
        wrong lookup key, a full disk, a time limit that wiped nine jobs at once
        because nobody had turned on checkpointing. The middle ones are results:
        a compound retracted the same day it was announced, then the project
        &rsquo;s own lead demoted, then a ranking inverted by a better method.
      </p>

      <p>
        The last one is the premise. The framework that justified six weeks of
        screening was tested against an answer key chosen in advance and got one
        call right in four. Nothing downstream of it survives that.
      </p>

      <h2>What survived</h2>

      <p>
        Not much, and that is a real answer rather than a failure. Two editing
        designs stand on their own and are described on{" "}
        <a href="/routes">the routes page</a>. A measurement of a public
        database, which has nothing to do with this variant, turned out to be
        the most widely useful thing here and has{" "}
        <a href="/census">its own page</a>. Two costed experiments are{" "}
        <a href="/experiments">written up in full</a>, either of which would
        settle something.
      </p>

      <p>
        And a large number of routes no longer need walking. For a project run
        by one person, deleting the wrong paths faster than you pursue them is
        the only way to reach anything at all.
      </p>

      <h2>Why publish the failures</h2>

      <p>
        Because the alternative is a record nobody can check. Every result here
        that went against me is written up with the number that killed it, and
        the papers carry the same discipline: each one names, in advance, the
        result that would prove it wrong.
      </p>

      <p>
        If you spot something in this history that is still wrong, I would
        rather know:{" "}
        <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>.
      </p>

      <div className="next">
        <a href="/routes">Where the work stands now</a>
        <a href="/papers">The ten papers</a>
        <a href="/limitations">What none of it establishes</a>
      </div>
    </div>
  );
}
