import type { MetadataRoute } from "next";

import { toPublicUrl, withBasePath } from "@/lib/base-path";

const PUBLIC_ALLOW_PATHS = [
  "/",
  "/llms.txt",
  "/llms-full.txt",
  "/agents.md",
  "/developers.md",
  "/mcp.md",
  "/auth.md",
  "/openapi.json",
  "/api/openapi.json",
  "/api/product",
  "/api/install-options",
  "/api/workflows",
  "/mcp",
  "/server.json",
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
        userAgent: "OAI-SearchBot",
        allow: PUBLIC_ALLOW_PATHS.map(withBasePath),
        disallow: PRIVATE_DISALLOW_PATHS.map(withBasePath),
      },
    ],
    sitemap: toPublicUrl("/sitemap.xml"),
  };
}
