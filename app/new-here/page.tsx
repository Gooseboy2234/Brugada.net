import type { Metadata } from "next";
import { SITE } from "../content";

export const metadata: Metadata = {
  title: "New here",
  description:
    "Start from nothing. What a gene is, what the heart's electrical system does, what a variant means, and what this site is for. No jargon and no numbers.",
  alternates: { canonical: "/new-here" },
};

export default function NewHere() {
  return (
    <div className="wrap">
      <p className="eyebrow">New here</p>

      <h1 className="page-title">Start from nothing. No jargon.</h1>

      <p className="standfirst">
        If you landed here and none of it made sense, this page is the one to
        read. It assumes you know nothing about genetics, and there is nothing
        wrong with that.
      </p>

      <div className="notice">
        There are no numbers on this page, on purpose. Everywhere else on this
        site each figure carries a source you can check. Here the point is to
        understand the shape of the thing first, and you can go looking for the
        evidence afterwards.
      </div>

      <h2>What this site is</h2>

      <p>
        It is a record of one person&rsquo;s attempt to understand a single
        change in his own DNA, and to work out whether anything could be done
        about it. That person is me. I am not a doctor and not a scientist by
        training.
      </p>

      <p>
        Most of what I found is that things do not work. I have written those up
        as carefully as the things that did, because a record that only reports
        successes is not a record.
      </p>

      <h2>What a gene is</h2>

      <p>
        Your body is built and run by proteins: tiny machines that do almost
        every job a cell needs doing. A gene is the instruction for building one
        of them. Think of a very long recipe.
      </p>

      <p>
        The recipe is written in an alphabet of only four letters, repeated
        millions of times over. Every cell carries a full copy of the whole
        cookbook.
      </p>

      <p>
        You have two copies of nearly every gene: one from each parent. That
        turns out to matter enormously here, and it is worth holding on to.
      </p>

      <h2>What the heart has to do with it</h2>

      <p>
        A heartbeat is an electrical event before it is a mechanical one. A
        signal sweeps across the heart in an organised wave, and the muscle
        squeezes because the signal told it to. If the signal is disorganised,
        the squeeze is too.
      </p>

      <p>
        For that signal to start, tiny gates in the surface of each heart cell
        have to snap open and let charged particles rush in. One particular gene
        carries the instructions for building those gates. That gene is the one
        this site is about.
      </p>

      <h2>What a variant is</h2>

      <p>
        A variant is a spelling difference in the recipe. One letter where most
        people have a different one.
      </p>

      <p>
        <b>Everyone has thousands of them.</b> They are the reason people are
        not identical. The overwhelming majority change nothing that matters, a
        few change something harmless like eye colour, and a small number land
        somewhere that matters.
      </p>

      <p>
        Being told you carry a variant is not the same as being told you are
        ill. It is closer to being told something about how you are built.
      </p>

      <h2>The one this site is about</h2>

      <p>
        In my copy of the gene for those heart gates, one letter is different.
        The change swaps one building block of the finished protein for another
        at a particular position.
      </p>

      <p>
        Because I have two copies of the gene, one working and one not, my heart
        cells build a mixture. And that is where the real question starts.
      </p>

      <h2>The question nobody has answered</h2>

      <p>
        I work as a pharmacy technician, so here is the way I think about it.
      </p>

      <p>
        Imagine a medicine that has to reach a patient in a hospital bed. Two
        different failures look identical from the bedside: the dose never left
        the pharmacy, or the dose left the pharmacy and somebody intercepted it
        in the corridor. Either way the patient gets nothing, and you cannot
        tell which happened by standing at the bed.
      </p>

      <p>
        My broken copy is like that. Either it simply never arrives and the
        working copy carries on alone, or it arrives and actively interferes
        with the working one. Those are very different problems and they would
        need very different solutions.
      </p>

      <p>
        Nobody has done the experiment that tells them apart in a human heart
        cell. That single unanswered question decides which of the possible
        treatments could even work in principle, which is why so much of this
        site keeps returning to it.
      </p>

      <h2>What the condition is</h2>

      <p>
        Brugada syndrome is a fault in the heart&rsquo;s electrical system
        rather than its structure. The heart is usually built normally and looks
        normal on a scan. Under certain conditions the rhythm can become
        disorganised, and a fever is one of the things that can bring the
        pattern out.
      </p>

      <p>
        Most people who carry a variant associated with it never develop
        symptoms. Whether that is true for any one person is a question for a
        heart-rhythm specialist who has their whole picture. It is not something
        a website can answer, and this one will not pretend to.
      </p>

      <h2>Why bother with any of this</h2>

      <p>
        There is currently no treatment that fixes the underlying fault. There
        is a device that can rescue someone whose rhythm has already gone wrong,
        but it does not repair anything, and most people who carry a variant
        like mine are not offered one.
      </p>

      <p>
        So the honest answer is that this work does not help me today. What it
        might do is make the next real experiment worth running, and rule out
        the approaches that would waste somebody&rsquo;s time. Several of the
        approaches I have ruled out were my own favourites.
      </p>

      <h2>What this site cannot do</h2>

      <p>
        It cannot tell you your risk. It cannot tell you what to do. It is not
        medical advice and none of the research on it has been checked by other
        scientists yet, which is a normal stage rather than a problem, but it
        does mean everything here should be read as provisional.
      </p>

      <h2>Where to go next</h2>

      <p>
        <b>If you have just been given a result and want practical help</b>,
        read <a href="/for-carriers">the page for carriers</a>. It explains what
        the words on a genetics report mean and what is worth asking at an
        appointment.
      </p>

      <p>
        <b>If you want the actual science</b>, start with{" "}
        <a href="/science">the science</a>, which explains the mechanism and the
        open question in full, then <a href="/routes">the routes</a>, which
        lists every approach considered and what closed the ones that are
        closed.
      </p>

      <p>
        <b>If you want to know what this work cannot establish</b>, that has its
        own page, at <a href="/limitations">limitations</a>. It is deliberately
        not buried in small print.
      </p>

      <p>
        And if something here is written badly or you got lost, tell me:{" "}
        <a href={`mailto:${SITE.contact}`}>{SITE.contact}</a>. Being hard to
        follow is a fault in the writing, not in the reader.
      </p>

      <div className="next">
        <a href="/">What is known about this variant</a>
        <a href="/for-carriers">For carriers</a>
        <a href="/science">The science</a>
      </div>
    </div>
  );
}
