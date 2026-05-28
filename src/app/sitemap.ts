import type { MetadataRoute } from "next";

import { toPublicUrl } from "@/lib/base-path";

const SITEMAP_PATHS = [
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
