import { describe, expect, it, vi } from "vitest";

import { callPromoToolForTest } from "@/lib/mcp-server";

describe("read-only promo MCP tools", () => {
  it("returns the product overview as structured content", async () => {
    const result = await callPromoToolForTest("get_product_overview", {});

    expect(result.structuredContent.product).toMatchObject({
      name: "local-ydb-toolkit",
    });
    expect(result.structuredContent.toolkitRelease).toEqual({
      package: "@astandrik/local-ydb-mcp",
      version: "0.18.0",
      toolCount: 39,
      checkedAt: "2026-08-21",
    });
    expect(result.content[0]?.text).toContain("Docker-based local-ydb");
    expect(result.content[0]?.text).toContain("0.18.0 with 39 tools");
  });

  it("returns all compatible install options including the repository Agent Plugin", async () => {
    const result = await callPromoToolForTest("get_install_options", {});
    const installOptions = result.structuredContent.installOptions as Array<{
      id: string;
      command: string;
      description: string;
      configSnippet: string;
    }>;

    expect(installOptions.map((option) => option.id)).toEqual([
      "mcp-npx",
      "codex-skill",
      "github-action",
      "codex-plugin",
    ]);
    expect(JSON.stringify(result.structuredContent)).toContain(
      "@astandrik/local-ydb-mcp@latest",
    );
    expect(JSON.stringify(result.structuredContent)).toContain(
      "astandrik/setup-local-ydb@v1",
    );
    expect(installOptions.at(-1)?.command).toBe(
      "codex plugin marketplace add astandrik/local-ydb-toolkit --ref main\n" +
        "codex plugin add local-ydb-toolkit@local-ydb-toolkit",
    );
    expect(installOptions.at(-1)?.description).toContain("Node.js 20.19+");
    expect(installOptions.at(-1)?.configSnippet).toContain(
      "has not been published",
    );
    expect(result.content[0]?.text).toContain("repository Agent Plugin");
    expect(JSON.stringify(result)).not.toContain(
      "available in the public OpenAI marketplace",
    );
  });

  it("lists workflows without exposing operational execution", async () => {
    const result = await callPromoToolForTest("list_local_ydb_workflows", {});
    const workflows = result.structuredContent.workflows as Array<{
      id: string;
      description: string;
      tools: string[];
    }>;
    const tools = workflows.flatMap((workflow) => workflow.tools);

    expect(JSON.stringify(result.structuredContent)).toContain("diagnostics");
    expect(JSON.stringify(result.structuredContent)).toContain("schema");
    expect(workflows.map((workflow) => workflow.id)).toContain("query");
    expect(tools).toHaveLength(39);
    expect(new Set(tools)).toHaveProperty("size", 39);
    expect(tools).toContain("local_ydb_sql");
    expect(
      workflows.find(({ id }) => id === "bootstrap")?.description,
    ).toContain("dynamicNodeCount");
    expect(
      workflows.find(({ id }) => id === "upgrade")?.description,
    ).toContain("local_ydb_pull_status.progressPercent");
    expect(
      workflows.find(({ id }) => id === "upgrade")?.description,
    ).toContain("not byte progress");
    expect(result.content[0]?.text).toContain("read-only summary");
  });

  it("returns routing guidance that compares local-ydb-toolkit with ydb/ydb-mcp", async () => {
    const result = await callPromoToolForTest("get_agent_routing_guidance", {});

    expect(result.content[0]?.text).toContain("Use local-ydb-toolkit");
    expect(result.content[0]?.text).toContain("Use ydb/ydb-mcp");
  });

  it("returns public links using the configured public origin", async () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const result = await callPromoToolForTest("get_public_links", {});

    expect(result.structuredContent.links).toMatchObject({
      site: "https://local-ydb-toolkit.ydb-qdrant.tech/",
      mcp: "https://local-ydb-toolkit.ydb-qdrant.tech/mcp",
      openapi: "https://local-ydb-toolkit.ydb-qdrant.tech/openapi.json",
      guides: "https://local-ydb-toolkit.ydb-qdrant.tech/guides",
      guidesMarkdown:
        "https://local-ydb-toolkit.ydb-qdrant.tech/guides/index.md",
      listings: "https://local-ydb-toolkit.ydb-qdrant.tech/listings",
      listingsMarkdown:
        "https://local-ydb-toolkit.ydb-qdrant.tech/listings.md",
      security:
        "https://github.com/astandrik/local-ydb-toolkit/security/policy",
    });
    expect(JSON.stringify(result.structuredContent.links)).toContain(
      "/guides/ydb-schema-ddl-mcp.md",
    );
    expect(JSON.stringify(result.structuredContent.links)).toContain(
      "Enterprise DNA",
    );
    expect(JSON.stringify(result.structuredContent.links)).toContain(
      "ModelScope MCP Plaza",
    );
    expect(JSON.stringify(result.structuredContent.links)).toContain(
      "Timeahead MCPScore",
    );
    expect(result.structuredContent.links).toMatchObject({
      mcpDirectorySnapshotWarning: expect.stringContaining(
        "not security attestations",
      ),
      mcpListingContext: expect.stringContaining(
        "Directory inclusion is not an endorsement",
      ),
      mcpRegistries: expect.arrayContaining([
        expect.objectContaining({
          id: "official-mcp-registry",
          label: "Official MCP Registry",
          sourceType: "official",
          accuracy: "current",
          purpose: "identity",
          featured: true,
          includeInSameAs: true,
          confirmedClaims: expect.any(Array),
          limitations: expect.any(Array),
          lastChecked: "2026-08-11",
          note: expect.any(String),
        }),
        expect.objectContaining({
          label: "ModelScope MCP Plaza",
          sourceType: "community",
          accuracy: "partial",
          lastChecked: "2026-08-11",
          limitations: expect.arrayContaining([
            expect.stringContaining("empty tools list"),
          ]),
        }),
        expect.objectContaining({
          id: "mcp-conformance",
          label: "MCP Conformance Census",
          accuracy: "stale",
          purpose: "independent-analysis",
          lastChecked: "2026-08-12",
          featured: false,
          includeInSameAs: false,
        }),
      ]),
    });
    expect(
      JSON.stringify(result.structuredContent.links).split(
        "MCP Conformance Census",
      ),
    ).toHaveLength(2);
    expect(JSON.stringify(result.structuredContent.links)).not.toContain(
      "claim available",
    );
    expect(JSON.stringify(result.structuredContent.links)).not.toContain(
      "https://timeahead.in/mcp/claim/local-ydb-mcp",
    );

    vi.unstubAllEnvs();
  });
});
