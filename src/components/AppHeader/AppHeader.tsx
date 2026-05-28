import Link from "next/link";

import { Container } from "@/components/GravityUI/GravityUI";
import { withBasePath } from "@/lib/base-path";

import "./AppHeader.scss";

const NAV_LINKS = [
  { href: "#workflows", label: "Workflows" },
  { href: "#agent-access", label: "Agent access" },
  { href: withBasePath("/openapi.json"), label: "OpenAPI" },
  { href: withBasePath("/llms.txt"), label: "llms.txt" },
] as const;

export function AppHeader() {
  return (
    <Container as="header" maxWidth="xl" gutters={5} className="app-header">
      <nav className="app-header__content" aria-label="Primary navigation">
        <Link href={withBasePath("/")} className="app-header__brand">
          <span className="app-header__mark" aria-hidden="true">
            Y
          </span>
          <span className="app-header__brand-copy">
            <strong>local-ydb-toolkit</strong>
            <span>agent operations</span>
          </span>
        </Link>
        <div className="app-header__links">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="app-header__link">
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Container>
  );
}
