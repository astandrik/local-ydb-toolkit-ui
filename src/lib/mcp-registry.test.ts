import { describe, expect, it } from "vitest";

import { buildDevelopersMarkdown } from "@/lib/agent-markdown";
import { buildMcpServerCard } from "@/lib/mcp-registry";

function markdownHeadingFragment(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, "")
    .replace(/\s+/g, "-");
}

describe("MCP server card", () => {
  it("links to an existing developers markdown heading", () => {
    const developersResource = buildMcpServerCard().resources.find(
      (resource) => new URL(resource.url).pathname.endsWith("/developers.md"),
    );

    expect(developersResource).toBeDefined();

    const resourceUrl = new URL(developersResource?.url ?? "");
    const headingFragments = Array.from(
      buildDevelopersMarkdown().matchAll(/^#{1,6}\s+(.+)$/gm),
      ([, heading]) => markdownHeadingFragment(heading),
    );

    expect(resourceUrl.hash).toBe("#featured-external-listings");
    expect(headingFragments).toContain(resourceUrl.hash.slice(1));
  });
});
