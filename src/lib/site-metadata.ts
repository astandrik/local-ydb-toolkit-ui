import type { Metadata } from "next";

import { toPublicUrl, withBasePath } from "@/lib/base-path";
import { MCP_REGISTRY_LINKS, PUBLIC_LINKS } from "@/lib/product-data";

export const SITE_NAME = "local-ydb-toolkit";
export const SITE_TAGLINE = "Agent operations for Docker-based local YDB";
export const SITE_TITLE = `${SITE_NAME} - ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  "Plan-first MCP tools, Codex skill guidance, and GitHub Actions setup for local-ydb deployments.";
export const SITE_KEYWORDS = [
  "local-ydb-toolkit",
  "local-ydb",
  "YDB",
  "MCP",
  "Model Context Protocol",
  "Codex skill",
  "GitHub Action",
  "managed YQL",
  "agent-ready",
  "Docker",
];

export function getAgentResourceAlternateTypes(): NonNullable<
  NonNullable<Metadata["alternates"]>["types"]
> {
  return {
    "application/json": [
      { title: "OpenAPI JSON", url: withBasePath("/openapi.json") },
      { title: "Product JSON", url: withBasePath("/api/product") },
      {
        title: "Install options JSON",
        url: withBasePath("/api/install-options"),
      },
      { title: "Workflows JSON", url: withBasePath("/api/workflows") },
      {
        title: "A2A Agent Card",
        url: withBasePath("/.well-known/agent-card.json"),
      },
    ],
    "text/plain": [
      { title: "llms.txt", url: withBasePath("/llms.txt") },
      { title: "llms-full.txt", url: withBasePath("/llms-full.txt") },
    ],
    "text/markdown": [
      { title: "Homepage markdown", url: withBasePath("/index.md") },
      { title: "Agent guide", url: withBasePath("/agents.md") },
      { title: "Developer guide", url: withBasePath("/developers.md") },
      { title: "External listings", url: withBasePath("/listings.md") },
      { title: "MCP guide", url: withBasePath("/mcp.md") },
      { title: "Auth notes", url: withBasePath("/auth.md") },
      { title: "Guides index", url: withBasePath("/guides/index.md") },
      {
        title: "local-ydb-mcp vs ydb-mcp",
        url: withBasePath("/guides/local-ydb-mcp-vs-ydb-mcp.md"),
      },
      {
        title: "Diagnose local-ydb with MCP tools",
        url: withBasePath("/guides/diagnose-local-ydb-mcp.md"),
      },
      {
        title: "Managed local YDB SQL guide",
        url: withBasePath("/guides/local-ydb-sql.md"),
      },
      {
        title: "YDB schema DDL MCP guide",
        url: withBasePath("/guides/ydb-schema-ddl-mcp.md"),
      },
      {
        title: "Local YDB AI-agent tools roundup",
        url: withBasePath("/guides/best-tools-local-ydb-ai-agents.md"),
      },
      { title: "API docs", url: withBasePath("/docs/api.md") },
      { title: "Webhooks status", url: withBasePath("/docs/webhooks.md") },
    ],
  };
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url: toPublicUrl("/"),
    description: SITE_DESCRIPTION,
    sameAs: Array.from(new Set([
      PUBLIC_LINKS.github,
      PUBLIC_LINKS.npm,
      PUBLIC_LINKS.githubAction,
      ...MCP_REGISTRY_LINKS.filter((link) => link.includeInSameAs).map(
        (link) => link.href,
      ),
    ])),
  };
}
