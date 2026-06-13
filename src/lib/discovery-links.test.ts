import { describe, expect, it, vi } from "vitest";

import { discoveryHeaders, discoveryLinkHeader } from "@/lib/discovery-links";

describe("discovery link headers", () => {
  it("advertises sitemap, markdown alternate, LLM docs, OpenAPI, MCP metadata, and A2A card", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const link = discoveryLinkHeader();

    expect(link).toContain("</sitemap.xml>; rel=\"sitemap\"");
    expect(link).toContain("</index.md>; rel=\"alternate\"; type=\"text/markdown\"");
    expect(link).toContain("</guides/index.md>; rel=\"alternate\"; type=\"text/markdown\"");
    expect(link).toContain("</llms.txt>; rel=\"describedby\"; type=\"text/plain\"");
    expect(link).toContain("</openapi.json>; rel=\"service-desc\"; type=\"application/json\"");
    expect(link).toContain("</server.json>; rel=\"service-desc\"; type=\"application/json\"");
    expect(link).toContain("</.well-known/agent-card.json>; rel=\"service-desc\"");

    expect(discoveryHeaders("application/json").get("Link")).toBe(link);
    expect(discoveryHeaders("application/json").get("Content-Type")).toBe(
      "application/json",
    );

    vi.unstubAllEnvs();
  });
});
