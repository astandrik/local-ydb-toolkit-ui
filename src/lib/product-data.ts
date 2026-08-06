export type InstallOption = {
  id: "mcp-npx" | "codex-skill" | "github-action";
  label: string;
  audience: string;
  command: string;
  configSnippet: string;
  description: string;
};

export type Workflow = {
  id:
    | "diagnostics"
    | "query"
    | "bootstrap"
    | "dynamic-nodes"
    | "schema"
    | "auth"
    | "storage"
    | "backup"
    | "upgrade";
  title: string;
  description: string;
  tools: string[];
};

export type ProjectUsingLocalYdb = {
  href: string;
  label: string;
};

export type McpRegistryCategory =
  | "registry"
  | "directory"
  | "trust"
  | "audit"
  | "governance";

export type McpRegistrySourceType = "official" | "community" | "automated";

export type McpRegistryAccuracy =
  | "current"
  | "partial"
  | "stale"
  | "misleading"
  | "unverified";

export type McpRegistryLink = {
  id:
    | "official-mcp-registry"
    | "modelscope"
    | "curated-mcp"
    | "glama"
    | "wmcp"
    | "mcp-sentinel"
    | "enterprise-dna"
    | "mcp-so"
    | "mcp-toplist"
    | "claude-code-marketplaces"
    | "lobehub"
    | "codeguilds"
    | "awesome-mcp"
    | "awesome-skills"
    | "skiln"
    | "policylayer"
    | "timeahead"
    | "pulse-mcp"
    | "mcp-store"
    | "unyly"
    | "manifold"
    | "forge"
    | "vibehackers";
  label: string;
  href: string;
  category: McpRegistryCategory;
  status: string;
  description: string;
  sourceType: McpRegistrySourceType;
  accuracy: McpRegistryAccuracy;
  lastChecked: string | null;
  note: string;
  includeInSameAs?: boolean;
};

export type GuideLink = {
  id:
    | "mcp-split"
    | "diagnostics"
    | "sql"
    | "schema-ddl"
    | "ci"
    | "automation"
    | "tool-roundup";
  label: string;
  href: string;
  markdownHref: string;
  description: string;
};

export const PUBLIC_LINKS = {
  targetSite: "https://local-ydb-toolkit.ydb-qdrant.tech",
  github: "https://github.com/astandrik/local-ydb-toolkit",
  npm: "https://www.npmjs.com/package/@astandrik/local-ydb-mcp",
  githubAction:
    "https://github.com/marketplace/actions/setup-local-ydb",
  officialYdbMcp: "https://github.com/ydb-platform/ydb-mcp",
  mcpRegistry:
    "https://github.com/astandrik/local-ydb-toolkit/blob/main/server.json",
  officialMcpRegistry:
    "https://registry.modelcontextprotocol.io/?q=io.github.astandrik%2Flocal-ydb-mcp",
  modelScope:
    "https://modelscope.cn/mcp/servers/astandrik/local-ydb-mcp",
  glama: "https://glama.ai/mcp/servers/astandrik/local-ydb-toolkit",
  curatedMcp:
    "https://www.curatedmcp.com/marketplace/local-ydb-unofficial-mcp-server",
  lobeHub: "https://lobehub.com/mcp/astandrik-local-ydb-toolkit",
  awesomeMcpServers:
    "https://github.com/punkpeye/awesome-mcp-servers#databases",
  awesomeSkills:
    "https://www.awesomeskills.dev/en/skill/astandrik-local-ydb-toolkit",
  claudeCodeMarketplaces:
    "https://claudemarketplaces.com/mcp/io.github.astandrik/local-ydb-mcp",
  codeGuilds: "https://codeguilds.dev/packages/local-ydb-toolkit",
  enterpriseDna:
    "https://enterprisedna.co/directories/mcp/astandrik-local-ydb-toolkit/",
  mcpSentinel:
    "https://mcp-sentinelweb-production.up.railway.app/servers/astandrik-local-ydb-mcp",
  mcpSo: "https://mcp.so/server/local-ydb-mcp/astandrik",
  mcpToplist:
    "https://mcptoplist.com/server/io.github.astandrik%2Flocal-ydb-mcp",
  skiln: "https://skiln.co/mcp/mcp-io-github-astandrik-local-ydb-mcp",
  wmcp: "https://wmcp.sh/mcp/grade/npm%3A%40astandrik%2Flocal-ydb-mcp",
  policyLayer: "https://policylayer.com/tools/local-ydb",
  timeaheadMcpScore: "https://timeahead.in/mcp/local-ydb-mcp",
  pulseMcp: "https://www.pulsemcp.com/servers/astandrik-local-ydb",
  mcpStore: "https://mcpstore.co/server/69eeaea69b1bda315bbc5a63",
  unyly: "https://unyly.org/mcp/astandrik-local-ydb-toolkit",
  manifold:
    "https://manifest.manifold.security/mcp-servers/mcp-registry/astandrik/local-ydb-mcp",
  forge:
    "https://forgeregistry.com/registry/io.github.astandrik%2Flocal-ydb-mcp",
  vibehackers: "https://vibehackers.io/mcp/local-ydb-mcp",
} as const;

export const PROJECTS_USING_LOCAL_YDB: ProjectUsingLocalYdb[] = [
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
];

const MCP_REGISTRY_REVIEW_DATE = "2026-07-13";

function reviewedRegistryLink(
  link: Omit<McpRegistryLink, "lastChecked">,
): McpRegistryLink {
  return { ...link, lastChecked: MCP_REGISTRY_REVIEW_DATE };
}

export const MCP_DIRECTORY_SNAPSHOT_WARNING =
  "Third-party directory scores, tool counts, and install metrics are external snapshots, often automated, not security attestations.";

export const MCP_REGISTRY_LINKS: McpRegistryLink[] = [
  reviewedRegistryLink({
    id: "official-mcp-registry",
    label: "Official MCP Registry",
    href: PUBLIC_LINKS.officialMcpRegistry,
    category: "registry",
    status: "official metadata",
    description: "Model Context Protocol registry search for the published server name.",
    sourceType: "official",
    accuracy: "current",
    note: "Latest published metadata matches the npm package and repository identity.",
  }),
  {
    id: "modelscope",
    label: "ModelScope MCP Plaza",
    href: PUBLIC_LINKS.modelScope,
    category: "directory",
    status: "active listing",
    description: "ModelScope marketplace entry for the local stdio MCP server.",
    sourceType: "community",
    accuracy: "current",
    lastChecked: "2026-07-31",
    note: "The public card identifies the server as Local, links the canonical GitHub repository, and exposes the npx stdio config without required environment variables.",
  },
  reviewedRegistryLink({
    id: "curated-mcp",
    label: "CuratedMCP",
    href: PUBLIC_LINKS.curatedMcp,
    category: "trust",
    status: "verified listing",
    description: "Curated marketplace profile for the local YDB MCP server.",
    sourceType: "community",
    accuracy: "partial",
    note: "Install metadata is current, but the profile has limited usage and review detail.",
  }),
  reviewedRegistryLink({
    id: "glama",
    label: "Glama",
    href: PUBLIC_LINKS.glama,
    category: "trust",
    status: "indexed score",
    description: "MCP server listing with score and discovery metadata.",
    sourceType: "automated",
    accuracy: "partial",
    note: "The source and broad capabilities are current; individual tool guidance remains incomplete.",
  }),
  reviewedRegistryLink({
    id: "wmcp",
    label: "wmcp.sh",
    href: PUBLIC_LINKS.wmcp,
    category: "trust",
    status: "grade page",
    description: "Public grade page for the npm MCP package.",
    sourceType: "automated",
    accuracy: "stale",
    note: "The grade is based on package 0.13.0 and incorrectly reports only one tool.",
  }),
  reviewedRegistryLink({
    id: "mcp-sentinel",
    label: "MCP Sentinel",
    href: PUBLIC_LINKS.mcpSentinel,
    category: "audit",
    status: "audit page",
    description: "Security-oriented directory entry for the MCP server.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "The page reports no findings but does not expose a reliable scan version or date.",
  }),
  reviewedRegistryLink({
    id: "enterprise-dna",
    label: "Enterprise DNA",
    href: PUBLIC_LINKS.enterpriseDna,
    category: "directory",
    status: "listed",
    description: "Enterprise DNA MCP directory page for local-ydb-toolkit.",
    sourceType: "automated",
    accuracy: "stale",
    note: "The listing uses a 2026-05-28 source snapshot and outdated adoption metadata.",
  }),
  reviewedRegistryLink({
    id: "mcp-so",
    label: "MCP.so",
    href: PUBLIC_LINKS.mcpSo,
    category: "directory",
    status: "listed",
    description: "MCP.so server entry for the local-ydb-mcp package.",
    sourceType: "community",
    accuracy: "partial",
    note: "The overview and install config are current, but the page detects no tools.",
  }),
  reviewedRegistryLink({
    id: "mcp-toplist",
    label: "MCP Toplist",
    href: PUBLIC_LINKS.mcpToplist,
    category: "directory",
    status: "listed",
    description: "MCP Toplist profile for the official server identifier.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "The directory tracks versions but reports internally inconsistent registry counts.",
  }),
  reviewedRegistryLink({
    id: "claude-code-marketplaces",
    label: "Claude Code Marketplaces",
    href: PUBLIC_LINKS.claudeCodeMarketplaces,
    category: "directory",
    status: "listed",
    description: "Claude-focused MCP marketplace entry for the server.",
    sourceType: "community",
    accuracy: "unverified",
    note: "Directory-only page; package and tool metadata were not independently verified.",
  }),
  reviewedRegistryLink({
    id: "lobehub",
    label: "LobeHub",
    href: PUBLIC_LINKS.lobeHub,
    category: "directory",
    status: "listed",
    description: "LobeHub MCP directory entry for agent discovery.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "README-derived directory mirror without independent accuracy evidence.",
  }),
  reviewedRegistryLink({
    id: "codeguilds",
    label: "CodeGuilds",
    href: PUBLIC_LINKS.codeGuilds,
    category: "directory",
    status: "listed",
    description: "Package listing for local-ydb-toolkit developer discovery.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "Its download metric covers the directory channel rather than npm package usage.",
  }),
  reviewedRegistryLink({
    id: "awesome-mcp",
    label: "Awesome MCP Servers",
    href: PUBLIC_LINKS.awesomeMcpServers,
    category: "directory",
    status: "awesome list",
    description: "Awesome MCP Servers database category listing.",
    sourceType: "community",
    accuracy: "unverified",
    note: "Community list entry with no independent runtime or security assessment.",
  }),
  reviewedRegistryLink({
    id: "awesome-skills",
    label: "Awesome Skills",
    href: PUBLIC_LINKS.awesomeSkills,
    category: "directory",
    status: "skill listing",
    description: "Codex skill directory page for the local-ydb skill.",
    sourceType: "automated",
    accuracy: "misleading",
    note: "The page assigns an unrelated Writing and Editing category and awkward generated copy.",
  }),
  reviewedRegistryLink({
    id: "skiln",
    label: "Skiln",
    href: PUBLIC_LINKS.skiln,
    category: "directory",
    status: "listed",
    description: "MCP catalog entry for the io.github server name.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "Automated official-registry mirror with incomplete install rendering.",
  }),
  reviewedRegistryLink({
    id: "policylayer",
    label: "PolicyLayer",
    href: PUBLIC_LINKS.policyLayer,
    category: "governance",
    status: "policy catalog",
    description: "Policy and token-cost catalog page for the MCP server.",
    sourceType: "automated",
    accuracy: "partial",
    note: "It sees 38 capabilities, but its risk grade is not a vulnerability finding and underrepresents plan-first confirmation.",
  }),
  reviewedRegistryLink({
    id: "timeahead",
    label: "Timeahead MCPScore",
    href: PUBLIC_LINKS.timeaheadMcpScore,
    category: "directory",
    status: "listed",
    description: "MCPScore directory listing for the local-ydb-mcp package.",
    sourceType: "automated",
    accuracy: "misleading",
    note: "Package detection, downloads, and CI status conflict with current npm and GitHub data.",
  }),
  reviewedRegistryLink({
    id: "pulse-mcp",
    label: "PulseMCP",
    href: PUBLIC_LINKS.pulseMcp,
    category: "directory",
    status: "usage snapshot",
    description: "Community MCP directory with estimated traffic and npm activity.",
    sourceType: "automated",
    accuracy: "partial",
    note: "Weekly npm activity matches the public API, while the GitHub star count is stale.",
  }),
  reviewedRegistryLink({
    id: "mcp-store",
    label: "MCP Store",
    href: PUBLIC_LINKS.mcpStore,
    category: "directory",
    status: "listed",
    description: "MCP Store directory entry for local-ydb-toolkit.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "The profile is mostly a README mirror and displays an unexplained authentication prompt.",
  }),
  reviewedRegistryLink({
    id: "unyly",
    label: "Unyly",
    href: PUBLIC_LINKS.unyly,
    category: "directory",
    status: "listed",
    description: "One-click installation directory entry for MCP clients.",
    sourceType: "automated",
    accuracy: "unverified",
    note: "README-derived listing with unverified security and credential claims.",
  }),
  reviewedRegistryLink({
    id: "manifold",
    label: "Manifold Manifest",
    href: PUBLIC_LINKS.manifold,
    category: "audit",
    status: "manifest scan",
    description: "Automated manifest and tool-surface scan for the official Registry entry.",
    sourceType: "automated",
    accuracy: "partial",
    note: "It sees 0.14.0 and 38 clean tools, but its missing 0.13.0 tag finding is stale.",
  }),
  reviewedRegistryLink({
    id: "forge",
    label: "Forge Registry",
    href: PUBLIC_LINKS.forge,
    category: "trust",
    status: "registry scan",
    description: "Automated supply-chain and package metadata profile.",
    sourceType: "automated",
    accuracy: "stale",
    note: "The page is on 0.13.0 and reports incorrect license and tool-count metadata.",
  }),
  reviewedRegistryLink({
    id: "vibehackers",
    label: "Vibehackers",
    href: PUBLIC_LINKS.vibehackers,
    category: "directory",
    status: "install guide",
    description: "Generated install and tool-discovery page for MCP clients.",
    sourceType: "automated",
    accuracy: "partial",
    note: "The page still shows package 0.14.0, only 5 of 38 tools, and marks optional environment fields as required.",
  }),
];

export const GUIDE_LINKS: GuideLink[] = [
  {
    id: "mcp-split",
    label: "local-ydb-mcp vs ydb-mcp",
    href: "/guides/local-ydb-mcp-vs-ydb-mcp",
    markdownHref: "/guides/local-ydb-mcp-vs-ydb-mcp.md",
    description:
      "Choose the local operations MCP server or the official database-level YDB MCP server.",
  },
  {
    id: "diagnostics",
    label: "Diagnose local-ydb with MCP tools",
    href: "/guides/diagnose-local-ydb-mcp",
    markdownHref: "/guides/diagnose-local-ydb-mcp.md",
    description:
      "Start with read-only status and healthcheck tools, then route by issue type.",
  },
  {
    id: "sql",
    label: "Run managed SQL against local YDB",
    href: "/guides/local-ydb-sql",
    markdownHref: "/guides/local-ydb-sql.md",
    description:
      "Use query, explain, and confirmed execute modes against the selected configured local-ydb profile.",
  },
  {
    id: "schema-ddl",
    label: "Generate YDB table schema DDL safely",
    href: "/guides/ydb-schema-ddl-mcp",
    markdownHref: "/guides/ydb-schema-ddl-mcp.md",
    description:
      "Generate, validate, plan, apply, inspect, and clean up YDB table DDL with confirm gates.",
  },
  {
    id: "ci",
    label: "Run local YDB in CI",
    href: "/guides/local-ydb-ci",
    markdownHref: "/guides/local-ydb-ci.md",
    description:
      "Use astandrik/setup-local-ydb for tenant, root-only, and auth-enabled GitHub Actions jobs.",
  },
  {
    id: "automation",
    label: "Local database deployment automation",
    href: "/guides/local-database-deployment-automation",
    markdownHref: "/guides/local-database-deployment-automation.md",
    description:
      "Operate local-ydb lifecycle workflows safely before schema or test work starts.",
  },
  {
    id: "tool-roundup",
    label: "Best tools for local YDB AI-agent workflows",
    href: "/guides/best-tools-local-ydb-ai-agents",
    markdownHref: "/guides/best-tools-local-ydb-ai-agents.md",
    description:
      "Compare local-ydb-mcp, ydb-mcp, setup-local-ydb, YDB CLI, and the local-ydb Docker image.",
  },
];

export const LOCAL_YDB_PRODUCT = {
  name: "local-ydb-toolkit",
  title: "local-ydb-toolkit - agent operations for local YDB",
  summary:
    "Docker-based local-ydb operations for AI agents, with plan-first lifecycle tools, managed SQL, a reusable Codex skill, and a GitHub Action for disposable YDB in CI.",
  description:
    "local-ydb-toolkit helps agents inspect, query, bootstrap, diagnose, harden, migrate, and upgrade configured local-ydb deployments without turning operational changes into blind shell scripts.",
  primaryCta: {
    label: "Use the MCP server",
    command: "npx @astandrik/local-ydb-mcp@latest",
    href: PUBLIC_LINKS.npm,
  },
  badges: [
    "Plan-first mutations",
    "Read-only diagnostics",
    "TOON-aware responses",
    "Node.js stdio MCP",
    "GitHub Actions CI",
  ],
} as const;

export const TOOLKIT_RELEASE = {
  package: "@astandrik/local-ydb-mcp",
  version: "0.15.2",
  toolCount: 39,
  checkedAt: "2026-08-06",
} as const;

export const AGENT_BOUNDARIES = {
  remotePromoMcp:
    "The remote promo MCP is read-only. It explains the product, install paths, workflows, routing guidance, and public links.",
  localOperations:
    "Actual local-ydb operations stay in the local stdio MCP server. Mutating tools return a plan first and execute only when confirm: true is supplied by an approved user workflow.",
  credentials:
    "Private local-ydb config files, SSH settings, password files, and database credentials stay on the user's machine or CI runner.",
} as const;

export const INSTALL_OPTIONS: InstallOption[] = [
  {
    id: "mcp-npx",
    label: "MCP server via npx",
    audience: "Agents and MCP clients that need to operate local-ydb targets.",
    command: "npx @astandrik/local-ydb-mcp@latest",
    configSnippet: `{
  "mcpServers": {
    "local-ydb": {
      "command": "npx",
      "args": ["-y", "--prefer-online", "@astandrik/local-ydb-mcp@latest"],
      "env": {
        "LOCAL_YDB_TOOLKIT_CONFIG": "/path/to/local-ydb.config.json",
        "LOCAL_YDB_MCP_CONTENT_FORMAT": "toon"
      }
    }
  }
}`,
    description:
      "Run the local stdio MCP server where Docker, SSH profiles, and local-ydb credentials are available.",
  },
  {
    id: "codex-skill",
    label: "Codex skill",
    audience:
      "Codex users who want reusable local-ydb operational guidance even before calling tools.",
    command:
      "$skill-installer install https://github.com/astandrik/local-ydb-toolkit/tree/main/skills/local-ydb",
    configSnippet:
      "Restart Codex after installation if the local-ydb skill does not appear immediately.",
    description:
      "Install the local-ydb skill so Codex has task-specific runbooks, topology guidance, and safety constraints.",
  },
  {
    id: "github-action",
    label: "GitHub Action",
    audience: "CI jobs that need an ephemeral tenant or root-only local YDB.",
    command: "uses: astandrik/setup-local-ydb@v1",
    configSnippet: `- uses: astandrik/setup-local-ydb@v1
  id: ydb
  with:
    version: 26.1.1.6
    topology: tenant
    tenant: /local/test`,
    description:
      "Bootstrap tenant, root-only, or auth-enabled local-ydb in GitHub Actions and export connection metadata for later steps.",
  },
];

export const WORKFLOWS: Workflow[] = [
  {
    id: "diagnostics",
    title: "Diagnostics",
    description:
      "Inventory Docker state, inspect database and tenant health, read logs, and route focused node, scheme, or GraphShard checks.",
    tools: [
      "local_ydb_inventory",
      "local_ydb_database_status",
      "local_ydb_healthcheck",
      "local_ydb_container_logs",
      "local_ydb_status_report",
      "local_ydb_tenant_check",
      "local_ydb_scheme",
      "local_ydb_nodes_check",
      "local_ydb_graphshard_check",
    ],
  },
  {
    id: "query",
    title: "Managed SQL",
    description:
      "Run bounded YQL against the selected configured local-ydb profile: SnapshotRO query, non-executing explain, or plan-first confirmed execution.",
    tools: ["local_ydb_sql"],
  },
  {
    id: "schema",
    title: "Schema",
    description:
      "Generate strict YDB table DDL, validate it through the official SDK, and apply only after explicit confirmation.",
    tools: ["local_ydb_generate_schema", "local_ydb_apply_schema"],
  },
  {
    id: "auth",
    title: "Auth hardening",
    description:
      "Inspect permissions, verify auth posture, prepare and apply native auth, and rotate the root password through reviewed plans.",
    tools: [
      "local_ydb_permissions",
      "local_ydb_auth_check",
      "local_ydb_prepare_auth_config",
      "local_ydb_write_dynamic_auth_config",
      "local_ydb_apply_auth_hardening",
      "local_ydb_set_root_password",
    ],
  },
  {
    id: "bootstrap",
    title: "Bootstrap and lifecycle",
    description:
      "Check prerequisites, create root or tenant topologies, start dynamic nodes, and use reviewed restart or teardown plans.",
    tools: [
      "local_ydb_check_prerequisites",
      "local_ydb_bootstrap_root_database",
      "local_ydb_bootstrap",
      "local_ydb_destroy_stack",
      "local_ydb_restart_stack",
      "local_ydb_create_tenant",
      "local_ydb_start_dynamic_node",
    ],
  },
  {
    id: "dynamic-nodes",
    title: "Dynamic nodes",
    description:
      "Add or remove tenant dynamic nodes one at a time with registration or disappearance verification.",
    tools: [
      "local_ydb_add_dynamic_nodes",
      "local_ydb_remove_dynamic_nodes",
    ],
  },
  {
    id: "storage",
    title: "Storage",
    description:
      "Inspect storage placement and leftovers, add or reduce groups, and clean exact reviewed targets only after verification.",
    tools: [
      "local_ydb_storage_placement",
      "local_ydb_storage_leftovers",
      "local_ydb_add_storage_groups",
      "local_ydb_reduce_storage_groups",
      "local_ydb_cleanup_storage",
    ],
  },
  {
    id: "backup",
    title: "Backup/restore",
    description:
      "List available dumps, dump tenant-relative paths, and restore with optional scheme and bounded count-query verification.",
    tools: [
      "local_ydb_list_dumps",
      "local_ydb_dump_tenant",
      "local_ydb_restore_tenant",
    ],
  },
  {
    id: "upgrade",
    title: "Version upgrades",
    description:
      "Discover image tags, pull images in the background, and upgrade by dump, rebuild, restore, auth reapply, and verification.",
    tools: [
      "local_ydb_list_versions",
      "local_ydb_pull_image",
      "local_ydb_pull_status",
      "local_ydb_upgrade_version",
    ],
  },
];

export function getAgentRoutingGuidance(): string {
  return [
    "Use local-ydb-toolkit when the user needs to operate Docker-based local-ydb environments: prerequisite checks, bootstrap, diagnostics, managed SQL, schema DDL generation/validation/application, auth hardening, storage workflows, dump listing, path-level dump/restore, or version upgrades.",
    "Use local_ydb_sql for bounded managed YQL against the selected configured local-ydb profile: query is SnapshotRO, explain returns plan/AST without execution, and execute stays plan-first until confirm: true.",
    "Use ydb/ydb-mcp when the user has an arbitrary reachable YDB endpoint and needs general database-level SQL, directory listing, path inspection, or query-oriented exploration outside the configured local-ydb lifecycle context.",
    "Use the remote promo MCP only for product discovery, install snippets, workflow summaries, and routing guidance. It does not execute local-ydb operations.",
    "For actual local operations, connect the local stdio MCP server with @astandrik/local-ydb-mcp@latest and keep private config paths and credentials local.",
  ].join("\n\n");
}
