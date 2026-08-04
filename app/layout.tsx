import type { Metadata } from "next";
import "./globals.css";
import { NAV, SITE, VARIANT } from "./content";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default:
      "SCN5A R104Q: what is known, what is not, and the routes that are still open",
    template: "%s, brugada.net",
  },
  description:
    "A public research record for the SCN5A p.Arg104Gln (R104Q) variant, written by someone who carries it. What has been measured, what remains unresolved, and which therapeutic routes are closed and why.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  authors: [{ name: SITE.author, url: SITE.orcidUrl }],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.domain,
    title:
      "SCN5A R104Q: what is known, what is not, and the routes that are still open",
    description:
      "A public research record for the SCN5A R104Q variant. Ten preprints, including the negative results.",
  },
  twitter: {
    card: "summary",
    title: "SCN5A R104Q research record",
    description:
      "What has been measured, what remains unresolved, and which routes are closed.",
  },
};

// Structured data so a search engine can tell this is scholarly work by a
// named person about a named genetic variant, rather than a personal blog.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.domain,
      description:
        "Public research record for the SCN5A p.Arg104Gln cardiac sodium channel variant.",
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.author,
      identifier: SITE.orcidUrl,
      sameAs: [SITE.orcidUrl],
      url: SITE.url,
      description:
        "Independent researcher. Carries the SCN5A R104Q variant described in this work.",
    },
    {
      "@type": "MedicalCondition",
      "@id": `${SITE.url}/#condition`,
      name: "Brugada syndrome",
      associatedAnatomy: { "@type": "AnatomicalStructure", name: "Heart" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="shell">
          <a className="skip" href="#main">
            Skip to content
          </a>

          <header className="masthead">
            <div className="masthead-inner">
              <a className="wordmark" href="/">
                {SITE.domain}
              </a>
              <nav className="nav" aria-label="Main">
                {NAV.map((item) => (
                  <a key={item.href} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </header>

          <main id="main">{children}</main>

          <footer className="foot">
            <div className="foot-inner">
              <p>
                Written by {SITE.author}, who carries {VARIANT.gene}{" "}
                {VARIANT.protein}. Not a physician. The work here is
                computational and the reasoning is public so that anyone can
                check it. <a href={SITE.orcidUrl}>ORCID {SITE.orcid}</a>
              </p>
              <hr className="foot-rule" />
              <p>
                <b>This site cannot tell you your risk.</b> It explains what has
                been measured about one variant. Risk assessment belongs to an
                electrophysiologist who has your whole picture. Nothing here is
                medical advice, and no result on this site should change anyone
                &rsquo;s treatment.
              </p>
              <p>
                None of this work has been peer reviewed. Preprints are posted
                publicly before review by design, so that the reasoning and the
                errors are both visible.
              </p>
              <p className="small">Last updated {SITE.updated}.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
