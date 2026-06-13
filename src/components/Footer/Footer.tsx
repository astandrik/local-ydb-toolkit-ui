import Link from "next/link";

import { Container } from "@/components/GravityUI/GravityUI";
import { withBasePath } from "@/lib/base-path";
import { PUBLIC_LINKS } from "@/lib/product-data";

import "./Footer.scss";

export function Footer() {
  return (
    <Container as="footer" maxWidth="xl" gutters={5} className="footer">
      <div className="footer__content">
        <p className="footer__note">
          local-ydb-toolkit keeps hosted discovery separate from local execution.
        </p>
        <div className="footer__links" aria-label="Footer links">
          <a href={PUBLIC_LINKS.github} className="footer__link">
            GitHub
          </a>
          <a href={PUBLIC_LINKS.npm} className="footer__link">
            npm
          </a>
          <a href={PUBLIC_LINKS.githubAction} className="footer__link">
            GitHub Action
          </a>
          <Link href={withBasePath("/guides")} className="footer__link">
            Guides
          </Link>
          <Link href={withBasePath("/mcp.md")} className="footer__link">
            MCP guide
          </Link>
          <Link href={withBasePath("/auth.md")} className="footer__link">
            Auth notes
          </Link>
          <Link href={withBasePath("/docs/api")} className="footer__link">
            API docs
          </Link>
          <Link href={withBasePath("/docs/webhooks")} className="footer__link">
            Webhooks
          </Link>
        </div>
      </div>
    </Container>
  );
}
