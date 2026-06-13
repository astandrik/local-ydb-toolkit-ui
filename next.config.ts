import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
const basePath =
  configuredBasePath && configuredBasePath !== "/"
    ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
    : undefined;

const discoveryHeaderLinks = [
  { path: "/sitemap.xml", rel: "sitemap" },
  { path: "/index.md", rel: "alternate", type: "text/markdown" },
  { path: "/llms.txt", rel: "describedby", type: "text/plain" },
  { path: "/llms-full.txt", rel: "describedby", type: "text/plain" },
  { path: "/openapi.json", rel: "service-desc", type: "application/json" },
  { path: "/server.json", rel: "service-desc", type: "application/json" },
  {
    path: "/.well-known/mcp/server-card.json",
    rel: "service-desc",
    type: "application/json",
  },
  {
    path: "/.well-known/agent-card.json",
    rel: "service-desc",
    type: "application/json",
  },
  { path: "/mcp", rel: "service", type: "application/json" },
] as const;

function withConfiguredBasePath(path: string): string {
  if (!basePath) {
    return path;
  }

  return path === "/" ? basePath : `${basePath}${path}`;
}

function discoveryLinkHeader(): string {
  return discoveryHeaderLinks.map((link) => {
    const segments = [
      `<${withConfiguredBasePath(link.path)}>`,
      `rel="${link.rel}"`,
    ];
    if ("type" in link) {
      segments.push(`type="${link.type}"`);
    }
    return segments.join("; ");
  }).join(", ");
}

const htmlLimitedBots = new RegExp(
  [
    "Googlebot",
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-User",
    "PerplexityBot",
    "Bingbot",
    "BingPreview",
    "Slackbot",
    "Discordbot",
    "Twitterbot",
    "LinkedInBot",
  ].join("|"),
  "i",
);

const nextConfig: NextConfig = {
  basePath,
  htmlLimitedBots,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: discoveryLinkHeader(),
          },
          {
            key: "Content-Signal",
            value: "search=yes, ai-input=yes, ai-train=no",
          },
        ],
      },
    ];
  },
  turbopack: {
    root,
  },
};

export default nextConfig;
