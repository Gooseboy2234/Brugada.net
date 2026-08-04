import { MEASUREMENT, PAPERS, VARIANT } from "./content";

export default function Home() {
  const negatives = PAPERS.filter((p) => p.negative).length;

  return (
    <div className="wrap">
      <p className="eyebrow">
        {VARIANT.gene} {VARIANT.protein} &middot; {VARIANT.short} &middot;{" "}
        {VARIANT.coding}
      </p>

      <h1 className="page-title">
        One letter in one gene, and an honest account of what is known about it.
      </h1>

      <p className="standfirst">
        If you have just been given this variant name and you are frightened,
        start here. This page says what has actually been measured, what has
        not, and where the uncertainty really sits.
      </p>

      <h2>What the name means</h2>

      <p>
        <b>SCN5A</b> is a gene. It carries the instructions for building the
        sodium channel that starts the electrical signal for each heartbeat.
        Think of the channel as a gate in the surface of a heart cell that opens
        to let the signal begin.
      </p>

      <p>
        A gene is written as a long sequence of chemical letters. This variant
        changes one of them.{" "}
        <span className="mono">{VARIANT.coding}</span> means that at position
        311 in the gene, the letter G was replaced by an A. That single change
        alters one building block in the finished protein, which is what{" "}
        <span className="mono">{VARIANT.protein}</span> records: at position 104,
        the building block arginine was replaced by glutamine. Arginine is
        abbreviated R and glutamine is abbreviated Q, which is where the short
        name <b>{VARIANT.short}</b> comes from.
      </p>

      <p className="small">
        All four names refer to the same single change. You may see any of them
        on a laboratory report.
      </p>

      <h2>What is known</h2>

      <div className="claim is-known">
        <span className="state state-known">Measured</span>
        <p>
          In a laboratory dish, cells carrying this variant alongside a working
          copy produced <b>{MEASUREMENT.heterozygousPercent} percent</b> of the
          current that a single working copy produces on its own. That was
          measured in {MEASUREMENT.cells} cells.{" "}
          <span className="src">
            <a href={MEASUREMENT.pmidUrl}>
              {MEASUREMENT.source}, PMID {MEASUREMENT.pmid}
            </a>
          </span>
        </p>
        <div className="falsifier">
          <b>What would overturn this</b>
          An independent measurement on a different platform finding current
          indistinguishable from a working copy.
        </div>
      </div>

      <h2>What is believed, but not established</h2>

      <div className="claim is-believed">
        <span className="state state-believed">Not established</span>
        <p>
          Whether that reduction behaves the same way in a living human heart.
          Every number above comes from cells grown in a dish and engineered to
          make this channel. A heart is not a dish, and no one has measured this
          variant in human heart muscle.
        </p>
        <div className="falsifier">
          <b>What would settle it</b>
          A measurement in human heart muscle cells carrying the variant.
        </div>
      </div>

      <h2>About risk</h2>

      <p>
        Most people who carry a variant like this one never have symptoms.
        Whether that is true for any particular person depends on far more than
        the variant, and it is a judgement for an electrophysiologist who has
        the whole picture: the rest of the genome, the medical history, the
        family history, and an examination. A website cannot make it and this
        one will not try.
      </p>

      <p>
        If you are looking for what to ask at your next appointment, that is on{" "}
        <a href="/for-carriers">the page for carriers</a>.
      </p>

      <h2>The papers</h2>

      <p>
        There are {PAPERS.length} of them, and {negatives} report results that
        went against the hypothesis being tested, including one that closed a
        route this project had spent months on. They are posted publicly as
        preprints so that the reasoning can be checked.
      </p>

      <p>
        <a href="/papers">Read the {PAPERS.length} papers</a>, each with a
        one-line plain summary.
      </p>

      <h2>Who wrote this</h2>

      <p>
        I am Ethan Bradley. I carry this variant. I am not a physician and
        nothing here is medical advice. The work is computational, which means
        it is done with databases, published measurements and simulations rather
        than at a laboratory bench, and it nominates experiments rather than
        performing them. I publish the reasoning so that anyone can check it,
        and I publish the results that went against me alongside the ones that
        did not.
      </p>

      <p>
        My own variant is why I went looking, but most of what came out of it is
        not about me. Two variants in this same region carry strong functional
        evidence of harm and have never been reported in a patient. Those belong
        to other people who do not know yet.
      </p>

      <div className="next">
        <a href="/science">The mechanism, and the open question</a>
        <a href="/routes">All six therapeutic routes</a>
        <a href="/limitations">What this work cannot tell you</a>
      </div>
    </div>
  );
}
