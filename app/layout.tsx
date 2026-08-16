import type { Metadata } from "next";
import "./v2.css";
import { SITE } from "./content";

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
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
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
        <a
          href="#main"
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            background: "#1c1f30",
            color: "#e9e9ed",
            padding: "10px 14px",
            zIndex: 100,
          }}
          className="skiplink"
        >
          Skip to content
        </a>
        {/* v2 collapsible sidebar. The nav lives inside each page's markup, so the
            control and the scrim live here instead, shared across all twelve routes.
            Below the breakpoint in app/v2.css the nav is off-canvas and this button
            reveals it; above it, both are display:none and nothing changes.

            Each nav link is a full page load, so the sidebar returns to closed on
            every navigation without any state to carry -- which is the behaviour
            asked for. No framework, no hydration, one listener. */}
        <button
          type="button"
          id="navtoggle"
          className="navtoggle"
          aria-label="Open menu"
          aria-controls="sidebar"
          aria-expanded="false"
        >
          <span aria-hidden="true">Menu</span>
        </button>
        <div id="navscrim" className="navscrim" aria-hidden="true" />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var b=document.getElementById('navtoggle'),s=document.getElementById('navscrim');
  if(!b)return;
  function set(open){
    document.body.classList.toggle('nav-open',open);
    b.setAttribute('aria-expanded',open?'true':'false');
    b.setAttribute('aria-label',open?'Close menu':'Open menu');
  }
  b.addEventListener('click',function(){set(!document.body.classList.contains('nav-open'));});
  if(s)s.addEventListener('click',function(){set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
})();`,
          }}
        />
      </body>
    </html>
  );
}
