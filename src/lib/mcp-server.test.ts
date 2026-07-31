import { describe, expect, it, vi } from "vitest";

import { callPromoToolForTest } from "@/lib/mcp-server";

describe("read-only promo MCP tools", () => {
  it("returns the product overview as structured content", async () => {
    const result = await callPromoToolForTest("get_product_overview", {});

    expect(result.structuredContent.product).toMatchObject({
      name: "local-ydb-toolkit",
    });
    expect(result.content[0]?.text).toContain("Docker-based local-ydb");
  });

  it("returns install options for MCP, Codex skill, and GitHub Action", async () => {
    const result = await callPromoToolForTest("get_install_options", {});

    expect(result.structuredContent.installOptions).toHaveLength(3);
    expect(JSON.stringify(result.structuredContent)).toContain(
      "@astandrik/local-ydb-mcp@latest",
    );
    expect(JSON.stringify(result.structuredContent)).toContain(
      "astandrik/setup-local-ydb@v1",
    );
  });

  it("lists workflows without exposing operational execution", async () => {
    const result = await callPromoToolForTest("list_local_ydb_workflows", {});

    expect(JSON.stringify(result.structuredContent)).toContain("diagnostics");
    expect(JSON.stringify(result.structuredContent)).toContain("schema");
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
      mcpRegistries: expect.arrayContaining([
        expect.objectContaining({
          label: "Official MCP Registry",
          sourceType: "official",
          accuracy: "current",
          lastChecked: "2026-07-13",
          note: expect.any(String),
        }),
        expect.objectContaining({
          label: "ModelScope MCP Plaza",
          sourceType: "community",
          accuracy: "current",
          lastChecked: "2026-07-31",
          note: expect.stringContaining("npx stdio"),
        }),
      ]),
    });
    expect(JSON.stringify(result.structuredContent.links)).not.toContain(
      "claim available",
    );
    expect(JSON.stringify(result.structuredContent.links)).not.toContain(
      "https://timeahead.in/mcp/claim/local-ydb-mcp",
    );

    vi.unstubAllEnvs();
  });
});
