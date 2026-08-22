import { describe, expect, it } from "vitest";

import {
  getAgentResourceAlternateTypes,
  getWebsiteJsonLd,
} from "@/lib/site-metadata";

describe("site metadata", () => {
  it("limits JSON-LD identity to primary sources and three selected listings", () => {
    const jsonLd = getWebsiteJsonLd();

    expect(jsonLd.sameAs).toEqual([
      "https://github.com/astandrik/local-ydb-toolkit",
      "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
      "https://github.com/marketplace/actions/setup-local-ydb",
      "https://registry.modelcontextprotocol.io/?q=io.github.astandrik%2Flocal-ydb-mcp",
      "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
      "https://mcpindex.ai/server/io-github-astandrik-local-ydb-mcp",
    ]);
  });

  it("publishes markdown alternates for agent guide pages", () => {
    const alternateTypes = getAgentResourceAlternateTypes();

    expect(alternateTypes["text/markdown"]).toEqual(
      expect.arrayContaining([
        { title: "Guides index", url: "/guides/index.md" },
        { title: "External listings", url: "/listings.md" },
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
