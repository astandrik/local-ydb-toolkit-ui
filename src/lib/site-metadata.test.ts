import { describe, expect, it } from "vitest";

import {
  getAgentResourceAlternateTypes,
  getWebsiteJsonLd,
} from "@/lib/site-metadata";

describe("site metadata", () => {
  it("links JSON-LD identity to public authority and directory pages", () => {
    const jsonLd = getWebsiteJsonLd();

    expect(jsonLd.sameAs).toContain(
      "https://github.com/astandrik/local-ydb-toolkit",
    );
    expect(jsonLd.sameAs).toContain(
      "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
    );
    expect(jsonLd.sameAs).toContain(
      "https://github.com/marketplace/actions/setup-local-ydb",
    );
    expect(jsonLd.sameAs).toContain(
      "https://glama.ai/mcp/servers/astandrik/local-ydb-toolkit",
    );
    expect(jsonLd.sameAs).toContain(
      "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
    );
    expect(jsonLd.sameAs).toContain(
      "https://github.com/bendyline/gilde/blob/main/data/community/toolsets/as/astandrik-local-ydb-mcp/manifest.json",
    );
    expect(jsonLd.sameAs).toContain(
      "https://mcpindex.ai/server/io-github-astandrik-local-ydb-mcp",
    );
    expect(jsonLd.sameAs).toContain(
      "https://enterprisedna.co/directories/mcp/astandrik-local-ydb-toolkit/",
    );
    expect(jsonLd.sameAs).toContain(
      "https://mcp-sentinelweb-production.up.railway.app/servers/astandrik-local-ydb-mcp",
    );
    expect(jsonLd.sameAs).toContain(
      "https://timeahead.in/mcp/local-ydb-mcp",
    );
    expect(jsonLd.sameAs).not.toEqual(
      expect.arrayContaining([
        expect.stringContaining("wikipedia.org"),
        expect.stringContaining("wikidata.org"),
        expect.stringContaining("linkedin.com"),
      ]),
    );
  });

  it("publishes markdown alternates for agent guide pages", () => {
    const alternateTypes = getAgentResourceAlternateTypes();

    expect(alternateTypes["text/markdown"]).toEqual(
      expect.arrayContaining([
        { title: "Guides index", url: "/guides/index.md" },
        {
          title: "YDB schema DDL MCP guide",
          url: "/guides/ydb-schema-ddl-mcp.md",
        },
        {
          title: "Managed local YDB SQL guide",
          url: "/guides/local-ydb-sql.md",
        },
      ]),
    );
  });
});
