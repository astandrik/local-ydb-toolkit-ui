import type { Metadata } from "next";

import { toPublicUrl, withBasePath } from "@/lib/base-path";

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
    ],
    "text/plain": [
      { title: "llms.txt", url: withBasePath("/llms.txt") },
      { title: "llms-full.txt", url: withBasePath("/llms-full.txt") },
    ],
    "text/markdown": [
      { title: "Agent guide", url: withBasePath("/agents.md") },
      { title: "Developer guide", url: withBasePath("/developers.md") },
      { title: "MCP guide", url: withBasePath("/mcp.md") },
      { title: "Auth notes", url: withBasePath("/auth.md") },
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
    sameAs: [
      "https://github.com/astandrik/local-ydb-toolkit",
      "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
      "https://github.com/marketplace/actions/setup-local-ydb",
    ],
  };
}
