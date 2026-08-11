import Link from "next/link";

import { Container } from "@/components/GravityUI/GravityUI";
import { withBasePath } from "@/lib/base-path";

import "./AppHeader.scss";

type NavLink = {
  href: string;
  label: string;
  featured?: boolean;
};

const NAV_LINKS: readonly NavLink[] = [
  { href: withBasePath("/#workflows"), label: "Workflows" },
  { href: withBasePath("/#agent-access"), label: "Agent access" },
  { href: withBasePath("/guides"), label: "Guides" },
  {
    href: withBasePath("/guides/local-ydb-sql"),
    label: "SQL guide",
    featured: true,
  },
  { href: withBasePath("/docs/api"), label: "API docs" },
  { href: withBasePath("/compare"), label: "Compare" },
  { href: withBasePath("/openapi.json"), label: "OpenAPI" },
  { href: withBasePath("/llms.txt"), label: "llms.txt" },
];

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
            <Link
              key={link.href}
              href={link.href}
              className={
                link.featured
                  ? "app-header__link app-header__link--featured"
                  : "app-header__link"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Container>
  );
}
