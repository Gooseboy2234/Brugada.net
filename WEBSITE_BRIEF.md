# Brief for whoever rebuilds the site

What I would tell an agent starting work on brugada.net from scratch. Written 2026-08-04.

## Read this part first, because it decides everything else

The site is not a portfolio and it is not a patient blog. It sits in an unusual position: written by
someone who carries the variant, containing work a specialist would recognise as real, aimed at readers
who arrive for completely different reasons. Get the audience order wrong and the rest of the design
decisions go wrong with it.

The three audiences, in the order they matter:

1. **A newly diagnosed carrier, or their parent, at two in the morning.** They typed the variant name
   into a search box and they are frightened. They are the largest group and the least served by anything
   else on the internet. Most of what they find will be either a clinical abstract they cannot read or a
   forum post from someone terrified.
2. **A researcher or clinician who followed a link from a preprint.** They want to know within fifteen
   seconds whether the work is credible. They will look for numbers, sources and limitations, and they
   will leave immediately if the first thing they see is inspirational.
3. **Ethan's future self, and anyone he hands this to.** The site is the durable record. Everything else,
   including this conversation, is not.

Design for reader 1 on the front page and reader 2 one click deeper. Never invert that.

## The five things I would put above the fold

**The variant, in plain language.** SCN5A p.Arg104Gln, also written R104Q, also c.311G>A. Say what a
variant name means the first time it appears, because most visitors have never seen the notation. Say
what the gene does: it makes the sodium channel that starts each heartbeat's electrical signal.

**What is actually known, separated from what is believed.** This is the site's whole credibility
argument. Known: the variant reduces sodium current in a laboratory expression system to 68.3 percent of
a single working copy, measured in 34 cells by O'Neill and colleagues in 2022. Believed but not
established: whether that reduction behaves the same way in a human heart.

**One honest sentence about risk that does not pretend to be medical advice.** Most carriers are
asymptomatic. Risk assessment belongs to an electrophysiologist with the whole picture, not to a website.
Say that once, clearly, and do not repeat it defensively on every page.

**A link to the papers.** Ten of them, with DOIs once posted. This is what separates the site from a blog.

**A statement of who wrote it and why.** One short paragraph. He carries the variant, he is not a
physician, the work is computational, and the reasoning is public so anyone can check it. No apology, no
credentials theatre.

## What the science section must say, and how to say it honestly

### The leading theory, stated with its uncertainty attached

The variant sits in the channel's N-terminal domain, the part that hangs inside the cell before the
membrane-spanning machinery begins. Arginine 104 forms a buried salt bridge with aspartate 84, and
substituting glutamine removes that positive charge and orphans the negative one. That is the structural
argument, and it comes from the deposited cryo-EM coordinates rather than a model.

The open question, which is the honest centre of the whole project: does the broken copy simply fail to
reach the membrane, leaving one working copy and roughly half the normal current, or does it actively
interfere with the working copy and pull the total below half? Measured current in the laboratory system
rescales to 31.3 percent of a normal two-copy heart, which is below the 45.8 percent that simple loss would
give. That gap of about 14.5 percentage points is the entire question, and nobody has measured it in a human
heart cell.

**Corrected 6 August 2026.** The two sentences above read "34.1 percent" against "the 50 percent that simple
loss would give", with a gap of "about 16 percentage points". Both numbers came from dividing the measured
68.3 percent by two, which assumes the two copies add perfectly. O'Neill 2022 measured the two-copy case
directly and got 218.4 percent of one copy, not 200, so the divisor is 2.184: 68.3 / 2.184 = 31.3 and
100 / 2.184 = 45.8, and the gap is 14.5 points. **The retired baseline and the retired comparator travel
together — quoting 31.3 against 50 is a third wrong answer, not a partial fix.**

Say plainly that this is unresolved. It gates every therapeutic route on the site, and pretending
otherwise would be the single fastest way to lose reader 2.

### The therapeutic routes, ranked, with what blocks each

Present all of them, including the dead ones, with the blocker named. A page that lists only the live
options looks like advocacy. A page that lists the closed ones with the measurement that closed them looks
like science.

| Route | State | What blocks it |
|---|---|---|
| DNA base editing | leading | no experimental validation yet; needs a lab |
| RNA editing | conditional | no oligonucleotide has reached a human heart muscle cell |
| Raising output from the healthy copy | dead | measured 0.0045 percent non-productive transcript against the roughly 25 percent it would need |
| Silencing the broken copy | weak | the mutation is the hardest discrimination class |
| Replacing the gene | not applicable | the gene is too large for the standard delivery vehicle |
| Chaperone drugs | dead | premise refuted by our own work |

Include the reason nobody has done this before, because it is more interesting than a complaint. Brugada
has no cheap animal test. The mouse study that makes DNA editing credible corrected a gain-of-function
variant whose readout is a measurable interval on a mouse ECG. Brugada's signature depends on a voltage
gradient across the right ventricular wall that mouse hearts do not reproduce. So an editing study can
measure current in isolated cells but cannot point at an animal and say the disease went away. That is the
difference between one paper and five years, and it will not change.

## Rules for the writing, all of them learned the hard way here

- **Gloss every technical term the first time it appears.** Not in a glossary at the bottom, inline. The
  lesson that produced this rule: a variant name was used a dozen times in this project before anyone said
  what it meant, and the person reading it was the one who carries it.
- **Lead with negatives where the result is negative.** Seven of the ten papers are negative results. That
  is a feature. A site that only reports what worked is a site nobody trusts.
- **Every number gets a source with an identifier.** A PMID, an accession, a DOI. No exceptions, and no
  numbers that trace only to "our analysis" without a linked file.
- **Never write "we".** One person wrote this. Plural reads as pretending to be a laboratory.
- **No em-dashes.** Commas, colons, full stops.
- **Say what would prove the work wrong.** Every scientific claim on the site should be followed by what
  result would falsify it. This is the single strongest credibility signal available and almost nobody
  does it.
- **Do not put a countdown, a donation button, or a mailing list above the science.** If those exist at
  all they go at the bottom.

## What must NOT go on the site

- No dosing, no treatment recommendations, no risk calculators. Not even framed as educational.
- Nothing that reads as medical advice to a specific person. The site can explain what is known. It cannot
  tell a visitor what their risk is.
- No unpublished collaborator correspondence, and no third party's name in a context they did not agree
  to. Public database submitter names in a methods context are different and are fine.
- No retired claims. This project has a deterministic checker for exactly this failure, because the
  recurring defect has been fixing one document and leaving its twin describing the old state. Anything
  copied from an older draft gets checked against that registry before it goes live.
- No claim that any of this is a treatment, or close to one. The honest framing is that one route now has
  a designed guide, a genome-wide safety scan, and a costed validation experiment. That is a long way from
  a therapy and saying so is what makes the rest believable.

## Structure I would build

```
/                     what the variant is, what is known, who wrote this
/science              the mechanism, the open question, the structural argument
/routes               all eleven therapeutic routes, ranked, with blockers, plus
                      current care unranked. (Was "all ten" until 6 August 2026;
                      the enumeration in THE_WALL.md went from ten lines to
                      thirteen and this page carries eleven of them plus current
                      care. Read ROUTE_INVENTORY in app/content.ts before
                      changing any count on any page.)
/papers               ten preprints with DOIs and one-line plain summaries
/experiments          the two costed protocols, for anyone who could run them
/data                 the deposited tables with the archive DOI
/for-carriers         plain language, no jargon, what to ask an EP
/limitations          what this work cannot tell you
```

*Corrected 6 August 2026: the `/routes` line read "all six therapeutic routes". ~~The count is **ten**.~~
The tenth, chaperone upregulation via AAV9-*MOG1*, was added on 6 August 2026 and is recorded as
conditional, never as promising. ~~The inventory and tally are `WEBSITE_HANDOFF/science/THE_WALL.md`
section 1: two live (1, 2), four closed (4, 5, 6, 7), two conditional (3, 10), one answered in a cell
line and open for cardiomyocytes (8), one — publication — done (9); 2 + 4 + 2 + 1 + 1 = 10.*~~*

*(**Corrected again 6 August 2026, late evening, and the count has now moved twice in one day.** Route 7's
cargo closure was withdrawn at 22:54, and a pass over all 14,035 corpus records
(`SESSION_ARCHIVE_20260804/data/FULL_CORPUS_ROUTE_SWEEP_20260806.md`) then added three lines to the
enumeration and re-scoped route 5's and route 10's headings. **The inventory and tally are
`WEBSITE_HANDOFF/science/THE_WALL.md` section 1: two live (1, 2), four closed (4, 5, 6, 12), five conditional
(3, 7, 10, 11, 13), one answered in a cell line and open for cardiomyocytes (8), one — publication — done
(9); 2 + 4 + 5 + 1 + 1 = 13.** The site's `/routes` page lists **eleven** of those thirteen plus current
care, because two of the thirteen are not therapies: mechanism resolution and publication. **The
reconciliation lives in `ROUTE_INVENTORY` in `app/content.ts` and must be read before changing any count on
any page.** And the rule for the prose: **never let a larger count read as more chances.** One of the three
lines added is closed on arrival, one is a candidate nobody has accepted, and one waits on the same unfunded
experiment as most of the rest.)*

The `/limitations` page is not a disclaimer page. It is a scientific page listing what each result cannot
establish. Having it as a top-level link rather than fine print is the point.

The `/experiments` page is the one with the highest chance of changing something. Two protocols, one at
16,670 dollars and 26 weeks with a week-12 stopping rule, one at 45,342 dollars and 42 weeks. If a lab
ever runs either of them it will be because that page existed.

## The tone question, answered concretely

The temptation on a site like this is to be either clinical to the point of coldness or inspirational to
the point of being useless. Neither works.

What works is the register of a good lab notebook written by someone who is also a patient. Precise about
numbers, plain about uncertainty, and unembarrassed about the personal stake without leading with it. The
strongest sentence available on the whole site is a version of this: my own variant is why I found the
others, and I have published the results that went against me alongside the ones that did not.

That sentence earns reader 2's attention and reader 1's trust at the same time, and it is true.
