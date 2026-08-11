import type { MetadataRoute } from "next";

import { toPublicUrl } from "@/lib/base-path";

const SITEMAP_PATHS = [
  "/",
  "/index.md",
  "/llms.txt",
  "/llms-full.txt",
  "/agents.md",
  "/developers.md",
  "/listings",
  "/listings.md",
  "/mcp.md",
  "/auth.md",
  "/compare",
  "/compare.md",
  "/guides",
  "/guides/index.md",
  "/guides/local-ydb-mcp-vs-ydb-mcp",
  "/guides/local-ydb-mcp-vs-ydb-mcp.md",
  "/guides/diagnose-local-ydb-mcp",
  "/guides/diagnose-local-ydb-mcp.md",
  "/guides/local-ydb-sql",
  "/guides/local-ydb-sql.md",
  "/guides/ydb-schema-ddl-mcp",
  "/guides/ydb-schema-ddl-mcp.md",
  "/guides/best-tools-local-ydb-ai-agents",
  "/guides/best-tools-local-ydb-ai-agents.md",
  "/guides/local-database-deployment-automation",
  "/guides/local-database-deployment-automation.md",
  "/guides/local-ydb-ci",
  "/guides/local-ydb-ci.md",
  "/docs/api",
  "/docs/api.md",
  "/docs/webhooks",
  "/docs/webhooks.md",
  "/openapi.json",
  "/api/openapi.json",
  "/api/product",
  "/api/install-options",
  "/api/workflows",
  "/mcp",
  "/server.json",
  "/.well-known/agent-card.json",
  "/.well-known/mcp",
  "/.well-known/mcp/server.json",
  "/.well-known/mcp/server-card.json",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date().toISOString();
  return SITEMAP_PATHS.map((path) => ({
    url: toPublicUrl(path),
    lastModified: generatedAt,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.5,
  }));
}
