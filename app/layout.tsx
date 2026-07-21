import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "brugada.net — The SCN5A R104Q research journey",
  description: "Two distinct journeys through an SCN5A R104Q mechanism, computational screen, falsifications, current results, and wet-lab handoff.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "brugada.net — The SCN5A R104Q research journey",
    description: "From a clinical question to two computational signals—and the experiment that must come next.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
