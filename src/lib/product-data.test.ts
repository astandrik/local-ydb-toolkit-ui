import { describe, expect, it } from "vitest";

import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_DIRECTORY_SNAPSHOT_WARNING,
  MCP_LISTING_CONTEXT,
  MCP_LISTING_PURPOSES,
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
    expect(MCP_LISTING_CONTEXT).toBe(
      "Use these third-party pages to confirm the canonical repository, npm package, current version, or installation metadata. Directory inclusion is not an endorsement or security audit.",
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
    expect(PUBLIC_LINKS.awesomeMcpServers).toBe(
      "https://github.com/punkpeye/awesome-mcp-servers#databases",
    );
    expect(PUBLIC_LINKS.enterpriseDna).toContain("enterprisedna.co");
    expect(PUBLIC_LINKS.mcpConformance).toBe(
      "https://github.com/Ahmad-Faraj/mcp-conformance/blob/a4dceadd14c7a01ab255d822ca4fcfb2987dac57/data/release/probe_census.jsonl#L5699",
    );
    expect(PUBLIC_LINKS.timeaheadMcpScore).toContain("timeahead.in/mcp");
  });

  it("publishes the four featured listings with audited value and limitations", () => {
    const official = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "official-mcp-registry",
    );
    const modelScope = MCP_REGISTRY_LINKS.find(({ id }) => id === "modelscope");
    const gilde = MCP_REGISTRY_LINKS.find(({ id }) => id === "gilde");
    const mcpindex = MCP_REGISTRY_LINKS.find(({ id }) => id === "mcpindex");

    expect(official).toMatchObject({
      href: PUBLIC_LINKS.officialMcpRegistry,
      purpose: "identity",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-11",
    });
    expect(modelScope).toMatchObject({
      href: "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
      purpose: "installation-discovery",
      accuracy: "partial",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-11",
    });
    expect(modelScope?.confirmedClaims.join(" ")).toContain(
      "@astandrik/local-ydb-mcp@latest",
    );
    expect(modelScope?.limitations.join(" ")).toContain("empty tools list");
    expect(gilde).toMatchObject({
      href: PUBLIC_LINKS.gilde,
      purpose: "version-metadata",
      accuracy: "partial",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-11",
    });
    expect(gilde?.confirmedClaims.join(" ")).toContain("tarball SHA-256");
    expect(mcpindex).toMatchObject({
      href: PUBLIC_LINKS.mcpIndex,
      purpose: "change-monitoring",
      accuracy: "partial",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-11",
    });
    expect(mcpindex?.limitations.join(" ")).toContain("not security findings");
  });

  it("keeps all 26 audited ids unique with the extended and legacy contracts", () => {
    const ids = MCP_REGISTRY_LINKS.map((link) => link.id);

    expect(ids).toHaveLength(26);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      MCP_REGISTRY_LINKS.every(
        ({
          href,
          category,
          status,
          sourceType,
          accuracy,
          lastChecked,
          note,
          purpose,
          userValue,
          confirmedClaims,
          limitations,
        }) =>
          href.startsWith("https://") &&
          category.length > 0 &&
          status.length > 0 &&
          ["official", "community", "automated"].includes(sourceType) &&
          ["current", "partial", "stale", "misleading", "unverified"].includes(
            accuracy,
          ) &&
          /^\d{4}-\d{2}-\d{2}$/.test(lastChecked ?? "") &&
          note.trim().length > 0 &&
          MCP_LISTING_PURPOSES.some((item) => item.id === purpose) &&
          userValue.trim().length > 0 &&
          confirmedClaims.length > 0 &&
          limitations.length > 0,
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
        "mcp-conformance",
      ]),
    );
  });

  it("publishes the immutable conformance snapshot with an individual review date", () => {
    const conformance = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "mcp-conformance",
    );
    const existingReviewDates = MCP_REGISTRY_LINKS.filter(
      ({ id }) => id !== "mcp-conformance",
    ).map(({ lastChecked }) => lastChecked);

    expect(new Set(existingReviewDates)).toEqual(new Set(["2026-08-11"]));
    expect(conformance).toMatchObject({
      label: "MCP Conformance Census",
      href: PUBLIC_LINKS.mcpConformance,
      category: "audit",
      status: "execution-based conformance snapshot",
      sourceType: "automated",
      accuracy: "stale",
      lastChecked: "2026-08-12",
      purpose: "independent-analysis",
      featured: false,
      includeInSameAs: false,
    });
    expect(conformance?.confirmedClaims.join(" ")).toContain(
      "completed the MCP handshake",
    );
    expect(conformance?.confirmedClaims.join(" ")).toContain("38 tools");
    expect(conformance?.limitations.join(" ")).toContain("not a security audit");
    expect(conformance?.limitations.join(" ")).toContain(
      "does not classify as a failure",
    );
  });

  it("assigns the requested purpose groups and exactly four sameAs listings", () => {
    const idsFor = (purpose: (typeof MCP_LISTING_PURPOSES)[number]["id"]) =>
      MCP_REGISTRY_LINKS.filter((link) => link.purpose === purpose).map(
        (link) => link.id,
      );

    expect(idsFor("identity")).toEqual(["official-mcp-registry"]);
    expect(idsFor("installation-discovery")).toEqual([
      "modelscope",
      "curated-mcp",
      "mcp-so",
      "claude-code-marketplaces",
      "lobehub",
      "awesome-mcp",
      "awesome-skills",
      "mcp-store",
      "unyly",
      "vibehackers",
    ]);
    expect(idsFor("version-metadata")).toEqual([
      "gilde",
      "wmcp",
      "enterprise-dna",
      "mcp-toplist",
      "codeguilds",
      "skiln",
      "timeahead",
      "pulse-mcp",
    ]);
    expect(idsFor("change-monitoring")).toEqual(["mcpindex"]);
    expect(idsFor("independent-analysis")).toEqual([
      "glama",
      "mcp-sentinel",
      "policylayer",
      "mcp-conformance",
      "manifold",
      "forge",
    ]);

    const featured = MCP_REGISTRY_LINKS.filter((link) => link.featured).map(
      (link) => link.id,
    );
    const sameAs = MCP_REGISTRY_LINKS.filter(
      (link) => link.includeInSameAs,
    ).map((link) => link.id);

    expect(featured).toEqual([
      "official-mcp-registry",
      "modelscope",
      "gilde",
      "mcpindex",
    ]);
    expect(sameAs).toEqual(featured);
  });

  it("retains the current Awesome MCP Servers community entry", () => {
    const awesomeMcp = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "awesome-mcp",
    );

    expect(awesomeMcp).toMatchObject({
      label: "Awesome MCP Servers",
      href: PUBLIC_LINKS.awesomeMcpServers,
      accuracy: "current",
      purpose: "installation-discovery",
      lastChecked: "2026-08-11",
    });
    expect(awesomeMcp?.confirmedClaims.join(" ")).toContain(
      "canonical upstream README contains the Local YDB entry",
    );
  });

  it("does not freeze volatile numeric directory scores", () => {
    const serialized = JSON.stringify(MCP_REGISTRY_LINKS);

    expect(serialized).not.toMatch(/95\/100|76\/100|55\/100/);
    expect(serialized).not.toMatch(/A\/95|leaderboard|#\d+/i);
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
