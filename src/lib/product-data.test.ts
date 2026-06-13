import { describe, expect, it } from "vitest";

import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_REGISTRY_LINKS,
  PROJECTS_USING_LOCAL_YDB,
  PUBLIC_LINKS,
  WORKFLOWS,
  getAgentRoutingGuidance,
} from "@/lib/product-data";

describe("local-ydb-toolkit product data", () => {
  it("positions local-ydb-toolkit as a focused agent operations toolkit", () => {
    expect(LOCAL_YDB_PRODUCT.name).toBe("local-ydb-toolkit");
    expect(LOCAL_YDB_PRODUCT.primaryCta.command).toContain(
      "npx @astandrik/local-ydb-mcp@latest",
    );
    expect(LOCAL_YDB_PRODUCT.summary).toContain("Docker-based local-ydb");
    expect(LOCAL_YDB_PRODUCT.summary).toContain("plan-first");
  });

  it("keeps install options split by audience and channel", () => {
    expect(INSTALL_OPTIONS.map((option) => option.id)).toEqual([
      "mcp-npx",
      "codex-skill",
      "github-action",
    ]);
    expect(INSTALL_OPTIONS[0]?.configSnippet).toContain(
      "LOCAL_YDB_TOOLKIT_CONFIG",
    );
    expect(INSTALL_OPTIONS[1]?.command).toContain("$skill-installer install");
    expect(INSTALL_OPTIONS[2]?.command).toContain(
      "astandrik/setup-local-ydb@v1",
    );
  });

  it("states the remote promo MCP boundary and actual local execution boundary", () => {
    expect(AGENT_BOUNDARIES.remotePromoMcp).toContain("read-only");
    expect(AGENT_BOUNDARIES.localOperations).toContain("confirm: true");
    expect(AGENT_BOUNDARIES.localOperations).toContain("stdio MCP server");
    expect(AGENT_BOUNDARIES.remotePromoMcp).not.toContain("bootstrap");
  });

  it("captures workflow categories agents can route to the local stdio MCP", () => {
    expect(WORKFLOWS.map((workflow) => workflow.id)).toContain("diagnostics");
    expect(WORKFLOWS.map((workflow) => workflow.id)).toContain("schema");
    expect(WORKFLOWS.map((workflow) => workflow.id)).toContain("auth");
    expect(WORKFLOWS.map((workflow) => workflow.id)).toContain("upgrade");
  });

  it("keeps public links stable for humans and agents", () => {
    expect(PUBLIC_LINKS.github).toBe(
      "https://github.com/astandrik/local-ydb-toolkit",
    );
    expect(PUBLIC_LINKS.npm).toBe(
      "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
    );
    expect(PUBLIC_LINKS.targetSite).toBe(
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );
    expect(PUBLIC_LINKS.glama).toContain("glama.ai/mcp/servers");
    expect(PUBLIC_LINKS.curatedMcp).toContain("curatedmcp.com/marketplace");
    expect(PUBLIC_LINKS.lobeHub).toContain("lobehub.com/mcp");
    expect(PUBLIC_LINKS.officialMcpRegistry).toContain(
      "registry.modelcontextprotocol.io",
    );
    expect(PUBLIC_LINKS.enterpriseDna).toContain("enterprisedna.co");
    expect(PUBLIC_LINKS.timeaheadMcpScore).toContain("timeahead.in/mcp");
  });

  it("lists MCP directory and trust entries without remote icon dependencies", () => {
    expect(MCP_REGISTRY_LINKS.map((link) => link.id)).toEqual([
      "official-mcp-registry",
      "curated-mcp",
      "glama",
      "wmcp",
      "mcp-sentinel",
      "enterprise-dna",
      "mcp-so",
      "mcp-toplist",
      "claude-code-marketplaces",
      "lobehub",
      "codeguilds",
      "awesome-mcp",
      "awesome-skills",
      "skiln",
      "policylayer",
      "timeahead",
    ]);
    expect(MCP_REGISTRY_LINKS).toHaveLength(16);
    expect(
      MCP_REGISTRY_LINKS.every((link) => !("iconSrc" in link)),
    ).toBe(true);
    expect(
      MCP_REGISTRY_LINKS.map((link) => [link.href, link.category, link.status]),
    ).toContainEqual([
      PUBLIC_LINKS.enterpriseDna,
      "directory",
      "listed",
    ]);
    expect(
      MCP_REGISTRY_LINKS.map((link) => [link.href, link.category, link.status]),
    ).toContainEqual([PUBLIC_LINKS.mcpSentinel, "audit", "audit page"]);
    expect(MCP_REGISTRY_LINKS.at(-1)).toMatchObject({
      href: PUBLIC_LINKS.timeaheadMcpScore,
      category: "directory",
      status: "listed",
    });
    expect(MCP_REGISTRY_LINKS.at(-1)).not.toHaveProperty("claimHref");
  });

  it("lists public projects using local-ydb", () => {
    expect(PROJECTS_USING_LOCAL_YDB).toEqual([
      {
        href: "https://pets.ydb-qdrant.tech/",
        label: "Codex Pets",
      },
      {
        href: "https://gravity-ai.ydb-qdrant.tech/",
        label: "Gravity AI",
      },
      {
        href: "https://ydb-qdrant.tech/",
        label: "YDB Qdrant",
      },
    ]);
  });

  it("lists guide pages with HTML and markdown targets", () => {
    expect(GUIDE_LINKS.map((guide) => guide.id)).toEqual([
      "mcp-split",
      "diagnostics",
      "schema-ddl",
      "ci",
      "automation",
      "tool-roundup",
    ]);
    expect(GUIDE_LINKS.every((guide) => guide.href.startsWith("/guides/"))).toBe(
      true,
    );
    expect(GUIDE_LINKS.every((guide) => guide.markdownHref.endsWith(".md"))).toBe(
      true,
    );
  });

  it("tells agents when to use local-ydb-toolkit versus ydb/ydb-mcp", () => {
    const guidance = getAgentRoutingGuidance();

    expect(guidance).toContain("Use local-ydb-toolkit");
    expect(guidance).toContain("Use ydb/ydb-mcp");
    expect(guidance).toContain("Docker-based local-ydb environments");
    expect(guidance).toContain("ad hoc SQL queries");
  });
});
