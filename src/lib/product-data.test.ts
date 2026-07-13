import { describe, expect, it } from "vitest";

import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_DIRECTORY_SNAPSHOT_WARNING,
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

  it("scopes the snapshot disclaimer to third-party directory metrics", () => {
    expect(MCP_DIRECTORY_SNAPSHOT_WARNING).toBe(
      "Third-party directory scores, tool counts, and install metrics are external snapshots, often automated, not security attestations.",
    );
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

  it("keeps unique directory ids and complete snapshot metadata", () => {
    const ids = MCP_REGISTRY_LINKS.map((link) => link.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      MCP_REGISTRY_LINKS.every((link) => !("iconSrc" in link)),
    ).toBe(true);
    expect(
      MCP_REGISTRY_LINKS.every(
        ({ href, sourceType, accuracy, lastChecked, note }) =>
          href.startsWith("https://") &&
          ["official", "community", "automated"].includes(sourceType) &&
          ["current", "partial", "stale", "misleading", "unverified"].includes(
            accuracy,
          ) &&
          (lastChecked === null || /^\d{4}-\d{2}-\d{2}$/.test(lastChecked)) &&
          note.trim().length > 0,
      ),
    ).toBe(true);
    expect(ids).toEqual(
      expect.arrayContaining([
        "pulse-mcp",
        "mcp-store",
        "unyly",
        "manifold",
        "forge",
        "vibehackers",
      ]),
    );
  });

  it("records the reviewed 2026-07-13 accuracy classifications", () => {
    const accuracyById = Object.fromEntries(
      MCP_REGISTRY_LINKS.map(({ id, accuracy }) => [id, accuracy]),
    );

    expect(accuracyById).toMatchObject({
      "official-mcp-registry": "current",
      glama: "partial",
      "curated-mcp": "partial",
      manifold: "partial",
      "pulse-mcp": "partial",
      "mcp-so": "partial",
      vibehackers: "partial",
      policylayer: "partial",
      wmcp: "stale",
      "enterprise-dna": "stale",
      forge: "stale",
      timeahead: "misleading",
      "awesome-skills": "misleading",
      "mcp-sentinel": "unverified",
    });
    expect(
      MCP_REGISTRY_LINKS.every((link) => link.lastChecked === "2026-07-13"),
    ).toBe(true);
    const idsFor = (accuracy: string) =>
      MCP_REGISTRY_LINKS.filter((link) => link.accuracy === accuracy)
        .map((link) => link.id)
        .sort();

    expect(idsFor("current")).toEqual(["official-mcp-registry"]);
    expect(idsFor("partial")).toEqual(
      [
        "curated-mcp",
        "glama",
        "manifold",
        "mcp-so",
        "policylayer",
        "pulse-mcp",
        "vibehackers",
      ].sort(),
    );
    expect(idsFor("stale")).toEqual(
      ["enterprise-dna", "forge", "wmcp"].sort(),
    );
    expect(idsFor("misleading")).toEqual(
      ["awesome-skills", "timeahead"].sort(),
    );
    expect(idsFor("unverified")).toEqual(
      [
        "awesome-mcp",
        "claude-code-marketplaces",
        "codeguilds",
        "lobehub",
        "mcp-sentinel",
        "mcp-store",
        "mcp-toplist",
        "skiln",
        "unyly",
      ].sort(),
    );
  });

  it("keeps the official Registry note independent of a specific release", () => {
    const officialRegistry = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "official-mcp-registry",
    );

    expect(officialRegistry?.note).toBe(
      "Latest published metadata matches the npm package and repository identity.",
    );
  });

  it("describes the outdated package metadata shown by Vibehackers", () => {
    const vibehackers = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "vibehackers",
    );

    expect(vibehackers?.note).toBe(
      "The page still shows package 0.14.0, only 5 of 38 tools, and marks optional environment fields as required.",
    );
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
