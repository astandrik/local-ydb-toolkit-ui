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
  TOOLKIT_RELEASE,
  WORKFLOWS,
  getAgentRoutingGuidance,
} from "@/lib/product-data";

const TOOLKIT_0_15_2_TOOLS = [
  "local_ydb_inventory",
  "local_ydb_database_status",
  "local_ydb_healthcheck",
  "local_ydb_container_logs",
  "local_ydb_status_report",
  "local_ydb_tenant_check",
  "local_ydb_scheme",
  "local_ydb_generate_schema",
  "local_ydb_apply_schema",
  "local_ydb_sql",
  "local_ydb_permissions",
  "local_ydb_nodes_check",
  "local_ydb_graphshard_check",
  "local_ydb_auth_check",
  "local_ydb_storage_placement",
  "local_ydb_add_storage_groups",
  "local_ydb_reduce_storage_groups",
  "local_ydb_storage_leftovers",
  "local_ydb_list_versions",
  "local_ydb_pull_image",
  "local_ydb_pull_status",
  "local_ydb_destroy_stack",
  "local_ydb_bootstrap_root_database",
  "local_ydb_bootstrap",
  "local_ydb_check_prerequisites",
  "local_ydb_create_tenant",
  "local_ydb_start_dynamic_node",
  "local_ydb_add_dynamic_nodes",
  "local_ydb_remove_dynamic_nodes",
  "local_ydb_restart_stack",
  "local_ydb_upgrade_version",
  "local_ydb_list_dumps",
  "local_ydb_dump_tenant",
  "local_ydb_restore_tenant",
  "local_ydb_prepare_auth_config",
  "local_ydb_write_dynamic_auth_config",
  "local_ydb_apply_auth_hardening",
  "local_ydb_set_root_password",
  "local_ydb_cleanup_storage",
] as const;

describe("local-ydb-toolkit product data", () => {
  it("positions local-ydb-toolkit as a focused agent operations toolkit", () => {
    expect(LOCAL_YDB_PRODUCT.name).toBe("local-ydb-toolkit");
    expect(LOCAL_YDB_PRODUCT.primaryCta.command).toContain(
      "npx @astandrik/local-ydb-mcp@latest",
    );
    expect(LOCAL_YDB_PRODUCT.summary).toContain("Docker-based local-ydb");
    expect(LOCAL_YDB_PRODUCT.summary).toContain("plan-first");
  });

  it("publishes the reviewed toolkit release snapshot", () => {
    expect(TOOLKIT_RELEASE).toEqual({
      package: "@astandrik/local-ydb-mcp",
      version: "0.15.2",
      toolCount: 39,
      checkedAt: "2026-08-06",
    });
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
    expect(INSTALL_OPTIONS[2]?.configSnippet).toContain("topology: tenant");
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
    expect(WORKFLOWS.map((workflow) => workflow.id)).toEqual([
      "diagnostics",
      "query",
      "schema",
      "auth",
      "bootstrap",
      "dynamic-nodes",
      "storage",
      "backup",
      "upgrade",
    ]);
  });

  it("covers every local-ydb-toolkit 0.15.2 tool exactly once", () => {
    const workflowTools = WORKFLOWS.flatMap((workflow) => workflow.tools);

    expect(new Set(workflowTools).size).toBe(workflowTools.length);
    expect([...workflowTools].sort()).toEqual([...TOOLKIT_0_15_2_TOOLS].sort());
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
    expect(PUBLIC_LINKS.modelScope).toBe(
      "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
    );
    expect(PUBLIC_LINKS.gilde).toBe(
      "https://github.com/bendyline/gilde/blob/main/data/community/toolsets/as/astandrik-local-ydb-mcp/manifest.json",
    );
    expect(PUBLIC_LINKS.mcpIndex).toBe(
      "https://mcpindex.ai/server/io-github-astandrik-local-ydb-mcp",
    );
    expect(PUBLIC_LINKS.enterpriseDna).toContain("enterprisedna.co");
    expect(PUBLIC_LINKS.timeaheadMcpScore).toContain("timeahead.in/mcp");
  });

  it("publishes the verified ModelScope local stdio listing", () => {
    const modelScope = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "modelscope",
    );

    expect(modelScope).toMatchObject({
      label: "ModelScope MCP Plaza",
      href: "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
      category: "directory",
      status: "active listing",
      sourceType: "community",
      accuracy: "current",
      lastChecked: "2026-07-31",
    });
    expect(modelScope?.note).toContain("Local");
    expect(modelScope?.note).toContain("npx stdio");
  });

  it("publishes the reviewed Gilde and mcpindex.ai directory snapshots", () => {
    const gilde = MCP_REGISTRY_LINKS.find(({ id }) => id === "gilde");
    const mcpindex = MCP_REGISTRY_LINKS.find(({ id }) => id === "mcpindex");

    expect(gilde).toEqual({
      id: "gilde",
      label: "Gilde",
      href: PUBLIC_LINKS.gilde,
      category: "directory",
      status: "versioned catalog record",
      description:
        "Automated Gilde community toolset record imported from the Official MCP Registry.",
      sourceType: "automated",
      accuracy: "partial",
      lastChecked: "2026-08-11",
      note: "Identity, package, 0.15.2 release time, tarball SHA-256, entrypoint, and environment hints match the published package. The version manifest exposes no tool definitions, and the rendered catalog has no stable per-item deep link.",
    });
    expect(mcpindex).toEqual({
      id: "mcpindex",
      label: "mcpindex.ai",
      href: PUBLIC_LINKS.mcpIndex,
      category: "directory",
      status: "registry and drift snapshot",
      description:
        "Automated registry, install-metadata, and drift-monitoring page for Local YDB MCP.",
      sourceType: "automated",
      accuracy: "partial",
      lastChecked: "2026-08-11",
      note: "The 0.15.2 package, repository, website, npx installs, and environment fields are current. Its quality score measures listing maturity; the PARTIAL verdict is description-only, and the current-crawl no-drift observation is not a security finding.",
    });
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
        "gilde",
        "mcpindex",
      ]),
    );
  });

  it("records the reviewed accuracy classifications and freshness dates", () => {
    const accuracyById = Object.fromEntries(
      MCP_REGISTRY_LINKS.map(({ id, accuracy }) => [id, accuracy]),
    );

    expect(accuracyById).toMatchObject({
      "official-mcp-registry": "current",
      modelscope: "current",
      gilde: "partial",
      mcpindex: "partial",
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
      MCP_REGISTRY_LINKS.filter(
        ({ id }) => !["modelscope", "gilde", "mcpindex"].includes(id),
      ).every((link) => link.lastChecked === "2026-07-13"),
    ).toBe(true);
    expect(
      Object.fromEntries(
        MCP_REGISTRY_LINKS.filter(({ id }) =>
          ["modelscope", "gilde", "mcpindex"].includes(id),
        ).map(({ id, lastChecked }) => [id, lastChecked]),
      ),
    ).toEqual({
      modelscope: "2026-07-31",
      gilde: "2026-08-11",
      mcpindex: "2026-08-11",
    });
    const idsFor = (accuracy: string) =>
      MCP_REGISTRY_LINKS.filter((link) => link.accuracy === accuracy)
        .map((link) => link.id)
        .sort();

    expect(idsFor("current")).toEqual(
      ["modelscope", "official-mcp-registry"].sort(),
    );
    expect(idsFor("partial")).toEqual(
      [
        "curated-mcp",
        "gilde",
        "glama",
        "manifold",
        "mcp-so",
        "mcpindex",
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
      "sql",
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
    expect(guidance).toContain("Use local_ydb_sql");
    expect(guidance).toContain("selected configured local-ydb profile");
    expect(guidance).toContain("arbitrary reachable YDB endpoint");
  });
});
