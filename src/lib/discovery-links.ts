import { withBasePath } from "./base-path";

const DISCOVERY_LINKS = [
  { path: "/sitemap.xml", rel: "sitemap" },
  { path: "/index.md", rel: "alternate", type: "text/markdown" },
  { path: "/guides/index.md", rel: "alternate", type: "text/markdown" },
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

export function discoveryLinkHeader(): string {
  return DISCOVERY_LINKS.map((link) => {
    const segments = [`<${withBasePath(link.path)}>`, `rel="${link.rel}"`];
    if ("type" in link) {
      segments.push(`type="${link.type}"`);
    }
    return segments.join("; ");
  }).join(", ");
}

export function discoveryHeaders(contentType: string): Headers {
  return new Headers({
    "Cache-Control": "public, max-age=300, s-maxage=3600",
    "Content-Type": contentType,
    Link: discoveryLinkHeader(),
  });
}
