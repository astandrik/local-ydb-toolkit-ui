import { renderToStaticMarkup } from "react-dom/server";
import type { ElementType, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import ListingsPage from "@/app/listings/page";
import { PromoPage } from "@/components/PromoPage/PromoPage";
import { MCP_REGISTRY_LINKS } from "@/lib/product-data";

vi.mock("@/components/AskAI/AskAIPanel", () => ({
  AskAIPanel: () => <div data-testid="ask-ai" />,
}));

vi.mock("@/components/CopyableCode/CopyableCode", () => ({
  CopyableCode: ({ value }: { value: string }) => <code>{value}</code>,
}));

vi.mock("@/components/GravityUI/GravityUI", () => ({
  Button: ({ children, href }: { children: ReactNode; href?: string }) =>
    href ? <a href={href}>{children}</a> : <button>{children}</button>,
  Card: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  Container: ({
    as: Component = "div",
    children,
    className,
  }: {
    as?: ElementType;
    children: ReactNode;
    className?: string;
  }) => <Component className={className}>{children}</Component>,
  Text: ({
    as: Component = "span",
    children,
    className,
  }: {
    as?: ElementType;
    children: ReactNode;
    className?: string;
  }) => <Component className={className}>{children}</Component>,
}));

describe("homepage and external listing pages", () => {
  it("uses a neutral local target badge instead of the official YDB wordmark", () => {
    const html = renderToStaticMarkup(<PromoPage />);

    expect(html).toContain("0.18.0 · 39 tools");
    expect(html).toContain("Local YDB target");
    expect(html).toContain("Docker target stays on your machine");
    expect(html).not.toContain("/assets/ydb-icon.svg");
    expect(html).not.toContain('alt="YDB"');
  });

  it("renders declarative topology and pull-progress workflow copy", () => {
    const html = renderToStaticMarkup(<PromoPage />);

    expect(html).toContain("dynamicNodeCount");
    expect(html).toContain("one-off nodes");
    expect(html).toContain("0-99 while running");
    expect(html).toContain("not byte progress");
  });

  it("renders four compatible install cards including the repository Agent Plugin", () => {
    const html = renderToStaticMarkup(<PromoPage />);

    expect(html.match(/class="install-card"/g)).toHaveLength(4);
    expect(html).toContain("MCP server via npx");
    expect(html).toContain("Codex skill");
    expect(html).toContain("GitHub Action");
    expect(html).toContain("Codex Agent Plugin (repo marketplace)");
    expect(html).toContain(
      "codex plugin marketplace add astandrik/local-ydb-toolkit --ref main\n" +
        "codex plugin add local-ydb-toolkit@local-ydb-toolkit",
    );
    expect(html).toContain("Node.js 20.19+");
    expect(html).toContain("absolute configPath");
    expect(html).not.toContain(
      "available in the public OpenAI marketplace",
    );
  });

  it("renders exactly four useful featured cards and the full-catalog CTA", () => {
    const html = renderToStaticMarkup(<PromoPage />);

    expect(html.match(/data-listing-id=/g)).toHaveLength(4);
    for (const label of [
      "Official MCP Registry",
      "ModelScope MCP Plaza",
      "Gilde",
      "mcpindex.ai",
    ]) {
      expect(html).toContain(`>${label}</h3>`);
    }
    expect(html).not.toContain(">Enterprise DNA</h3>");
    expect(html).not.toContain(">MCP Conformance Census</h3>");
    expect(html).toContain("Useful for");
    expect(html).toContain("Confirmed");
    expect(html).toContain("Limitations");
    expect(html).toContain('href="/listings"');
    expect(html).toContain("View all listings and verification notes");
    expect(html).not.toContain("unverified accuracy");
    expect(html).not.toContain("automated source");
  });

  it("renders every retained listing exactly once in five purpose groups", () => {
    const html = renderToStaticMarkup(<ListingsPage />);

    expect(html.match(/data-listing-id=/g)).toHaveLength(26);
    for (const listing of MCP_REGISTRY_LINKS) {
      expect(html.split(`data-listing-id="${listing.id}"`)).toHaveLength(2);
      expect(html).toContain(`href="${listing.href.replaceAll("&", "&amp;")}"`);
    }
    expect(html).toContain(">MCP Conformance Census</h3>");
    for (const heading of [
      "Identity",
      "Installation discovery",
      "Version metadata",
      "Change monitoring",
      "Independent analysis",
    ]) {
      expect(html).toContain(`>${heading}</h2>`);
    }
    expect(html).not.toContain("unverified accuracy");
    expect(html).not.toContain("automated source");
  });
});
