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
  getInstallOption,
} from "@/lib/product-data";

const TOOLKIT_0_18_0_TOOLS = [
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
      version: "0.18.0",
      toolCount: 39,
      checkedAt: "2026-08-21",
    });
  });

  it("keeps current-version listing copy aligned with the reviewed release", () => {
    const currentVersionReferences = MCP_REGISTRY_LINKS.flatMap(
      ({ limitations }) =>
        limitations.flatMap((limitation) =>
          Array.from(
            limitation.matchAll(/\bcurrent(?: version)? (\d+\.\d+\.\d+)\b/g),
            ([, version]) => version,
          ),
        ),
    );

    expect(currentVersionReferences.length).toBeGreaterThan(0);
    expect(new Set(currentVersionReferences)).toEqual(
      new Set([TOOLKIT_RELEASE.version]),
    );
  });

  it("keeps install options split by audience and channel", () => {
    expect(INSTALL_OPTIONS.map((option) => option.id)).toEqual([
      "mcp-npx",
      "codex-skill",
      "github-action",
      "codex-plugin",
    ]);
    expect(getInstallOption("mcp-npx")).toMatchObject({
      command: "npx @astandrik/local-ydb-mcp@latest",
    });
    expect(getInstallOption("mcp-npx").configSnippet).toContain(
      "LOCAL_YDB_TOOLKIT_CONFIG",
    );
    expect(getInstallOption("codex-skill").command).toBe(
      "$skill-installer install https://github.com/astandrik/local-ydb-toolkit/tree/main/skills/local-ydb",
    );
    expect(getInstallOption("github-action").command).toBe(
      "uses: astandrik/setup-local-ydb@v1",
    );
    expect(getInstallOption("github-action").configSnippet).toContain(
      "topology: tenant",
    );

    const plugin = getInstallOption("codex-plugin");

    expect(plugin.command).toBe(
      "codex plugin marketplace add astandrik/local-ydb-toolkit --ref main\n" +
        "codex plugin add local-ydb-toolkit@local-ydb-toolkit",
    );
    expect(plugin.description).toContain("Node.js 20.19+");
    expect(plugin.description).toContain("absolute configPath");
    expect(plugin.description).toContain("LOCAL_YDB_TOOLKIT_CONFIG");
    expect(plugin.description).toContain("plugin root");
    expect(plugin.configSnippet).toContain("new Codex session");
    expect(plugin.configSnippet).toContain("has not been published");
    expect(`${plugin.description} ${plugin.configSnippet}`).not.toContain(
      "available in the public OpenAI marketplace",
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
    expect(MCP_LISTING_CONTEXT).toBe(
      "Canonical GitHub Release, npm, and Official MCP Registry records define the current release. The remaining pages are dated external observations; stale, misleading, unverified, or unavailable entries are retained for transparency and are not security attestations.",
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

    const descriptions = Object.fromEntries(
      WORKFLOWS.map(({ id, description }) => [id, description]),
    );

    expect(descriptions.bootstrap).toContain("dynamicNodeCount");
    expect(descriptions.bootstrap).toContain("restore declarative topology");
    expect(descriptions["dynamic-nodes"]).toContain("one-off nodes");
    expect(descriptions["dynamic-nodes"]).toContain("configured suffix");
    expect(descriptions.auth).toContain("compatibility preflight");
    expect(descriptions.auth).toContain("recreating configured dynamic nodes");
    expect(descriptions.storage).toContain("exact one-off node ports");
    expect(descriptions.storage).toContain("incomplete node definitions");
    expect(descriptions.upgrade).toContain("local_ydb_pull_status.progressPercent");
    expect(descriptions.upgrade).toContain("0-99 while running");
    expect(descriptions.upgrade).toContain("100 after success");
    expect(descriptions.upgrade).toContain("last value after error");
    expect(descriptions.upgrade).toContain("not byte progress");
  });

  it("covers every local-ydb-toolkit 0.18.0 tool exactly once", () => {
    const workflowTools = WORKFLOWS.flatMap((workflow) => workflow.tools);

    expect(new Set(workflowTools).size).toBe(workflowTools.length);
    expect([...workflowTools].sort()).toEqual([...TOOLKIT_0_18_0_TOOLS].sort());
  });

  it("keeps public links stable for humans and agents", () => {
    expect(PUBLIC_LINKS.github).toBe(
      "https://github.com/astandrik/local-ydb-toolkit",
    );
    expect(PUBLIC_LINKS.npm).toBe(
      "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
    );
    expect(PUBLIC_LINKS.security).toBe(
      "https://github.com/astandrik/local-ydb-toolkit/security/policy",
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

  it("publishes only the three selected featured and sameAs listings", () => {
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
      lastChecked: "2026-08-21",
    });
    expect(official?.confirmedClaims.join(" ")).toContain("0.18.0");
    expect(official?.confirmedClaims.join(" ")).not.toContain("0.15.2");
    expect(modelScope).toMatchObject({
      href: "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
      purpose: "installation-discovery",
      accuracy: "partial",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-21",
    });
    expect(modelScope?.confirmedClaims.join(" ")).toContain(
      "@astandrik/local-ydb-mcp@latest",
    );
    expect(modelScope?.limitations.join(" ")).toContain("Tools section is empty");
    expect(modelScope?.limitations.join(" ")).toContain("Verified=false");
    expect(gilde).toMatchObject({
      href: PUBLIC_LINKS.gilde,
      purpose: "version-metadata",
      accuracy: "stale",
      featured: false,
      includeInSameAs: false,
      lastChecked: "2026-08-21",
    });
    expect(gilde?.confirmedClaims.join(" ")).toContain("tarball SHA-256");
    expect(gilde?.confirmedClaims.join(" ")).toContain("0.16.1");
    expect(mcpindex).toMatchObject({
      href: PUBLIC_LINKS.mcpIndex,
      purpose: "change-monitoring",
      accuracy: "stale",
      featured: true,
      includeInSameAs: true,
      lastChecked: "2026-08-21",
    });
    expect(mcpindex?.confirmedClaims.join(" ")).toContain("0.17.0");
    expect(mcpindex?.confirmedClaims.join(" ")).toContain("2026-07-08");
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

  it("assigns the exact audited accuracy to every retained listing", () => {
    const accuracyById = Object.fromEntries(
      MCP_REGISTRY_LINKS.map(({ id, accuracy }) => [id, accuracy]),
    );

    expect(accuracyById).toEqual({
      "official-mcp-registry": "current",
      modelscope: "partial",
      gilde: "stale",
      mcpindex: "stale",
      "curated-mcp": "partial",
      glama: "partial",
      wmcp: "stale",
      "mcp-sentinel": "unverified",
      "enterprise-dna": "stale",
      "mcp-so": "partial",
      "mcp-toplist": "stale",
      "claude-code-marketplaces": "partial",
      lobehub: "partial",
      codeguilds: "stale",
      "awesome-mcp": "stale",
      "awesome-skills": "misleading",
      skiln: "misleading",
      policylayer: "partial",
      "mcp-conformance": "stale",
      timeahead: "unverified",
      "pulse-mcp": "partial",
      "mcp-store": "stale",
      unyly: "stale",
      manifold: "stale",
      forge: "unverified",
      vibehackers: "stale",
    });
    expect(new Set(MCP_REGISTRY_LINKS.map(({ lastChecked }) => lastChecked))).toEqual(
      new Set(["2026-08-21"]),
    );
  });

  it("retains exact stale-version and unavailable-page evidence", () => {
    const textFor = (id: (typeof MCP_REGISTRY_LINKS)[number]["id"]) => {
      const listing = MCP_REGISTRY_LINKS.find((candidate) => candidate.id === id);

      return `${listing?.confirmedClaims.join(" ")} ${listing?.limitations.join(" ")}`;
    };

    expect(textFor("gilde")).toContain("0.16.1");
    expect(textFor("mcpindex")).toContain("0.17.0");
    expect(textFor("mcp-store")).toContain("0.17.0");
    expect(textFor("unyly")).toContain("0.15.4");
    expect(textFor("manifold")).toContain("0.16.0");
    expect(textFor("awesome-mcp")).toContain("no longer present");
    expect(textFor("timeahead")).toContain("/lander");
    expect(textFor("forge")).toContain("404");
  });

  it("publishes the immutable conformance snapshot under the common audit date", () => {
    const conformance = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "mcp-conformance",
    );

    expect(conformance).toMatchObject({
      label: "MCP Conformance Census",
      href: PUBLIC_LINKS.mcpConformance,
      category: "audit",
      status: "execution-based conformance snapshot",
      sourceType: "automated",
      accuracy: "stale",
      lastChecked: "2026-08-21",
      purpose: "independent-analysis",
      featured: false,
      includeInSameAs: false,
    });
    expect(conformance?.confirmedClaims.join(" ")).toContain(
      "completed the MCP handshake",
    );
    expect(conformance?.confirmedClaims.join(" ")).toContain("38 tools");
    expect(conformance?.limitations.join(" ")).toContain(
      "do not exercise operational tools",
    );
    expect(conformance?.limitations.join(" ")).toContain(
      "does not classify as a failure",
    );
  });

  it("assigns the requested purpose groups and exactly three sameAs listings", () => {
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
      "mcpindex",
    ]);
    expect(sameAs).toEqual(featured);
  });

  it("retains the removed Awesome MCP Servers entry as history", () => {
    const awesomeMcp = MCP_REGISTRY_LINKS.find(
      ({ id }) => id === "awesome-mcp",
    );

    expect(awesomeMcp).toMatchObject({
      label: "Awesome MCP Servers",
      href: PUBLIC_LINKS.awesomeMcpServers,
      accuracy: "stale",
      purpose: "installation-discovery",
      lastChecked: "2026-08-21",
    });
    expect(awesomeMcp?.limitations.join(" ")).toContain(
      "no longer present",
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
