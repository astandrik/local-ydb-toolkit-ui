import type { MetadataRoute } from "next";

import { toPublicUrl, withBasePath } from "@/lib/base-path";

const PUBLIC_ALLOW_PATHS = [
  "/",
  "/index.md",
  "/llms.txt",
  "/llms-full.txt",
  "/agents.md",
  "/developers.md",
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
];

const PRIVATE_DISALLOW_PATHS = ["/api/private", "/admin"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "GPTBot",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "ChatGPT-User",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "OAI-SearchBot",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "Claude-User",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "PerplexityBot",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
      {
        userAgent: "CCBot",
        disallow: [withBasePath("/")],
      },
      {
        userAgent: "ByteSpider",
        disallow: [withBasePath("/")],
      },
    ],
    sitemap: toPublicUrl("/sitemap.xml"),
  };
}
