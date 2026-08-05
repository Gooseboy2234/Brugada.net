"use client";

import { usePathname } from "next/navigation";
import { NAV } from "./content";

// A ten-item nav with no indication of where you are is a real usability
// problem, and the styling for it already existed with nothing setting it.
export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav" aria-label="Main">
      {NAV.map((item) => {
        const current =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
