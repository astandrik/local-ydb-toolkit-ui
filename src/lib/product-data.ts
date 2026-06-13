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
    | "bootstrap"
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

export type McpRegistryLink = {
  id:
    | "official-mcp-registry"
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
    | "timeahead";
  label: string;
  href: string;
  category: McpRegistryCategory;
  status: string;
  description: string;
  includeInSameAs?: boolean;
};

export type GuideLink = {
  id:
    | "mcp-split"
    | "diagnostics"
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

export const MCP_REGISTRY_LINKS: McpRegistryLink[] = [
  {
    id: "official-mcp-registry",
    label: "Official MCP Registry",
    href: PUBLIC_LINKS.officialMcpRegistry,
    category: "registry",
    status: "official metadata",
    description: "Model Context Protocol registry search for the published server name.",
  },
  {
    id: "curated-mcp",
    label: "CuratedMCP",
    href: PUBLIC_LINKS.curatedMcp,
    category: "trust",
    status: "verified listing",
    description: "Curated marketplace profile for the local YDB MCP server.",
  },
  {
    id: "glama",
    label: "Glama",
    href: PUBLIC_LINKS.glama,
    category: "trust",
    status: "indexed score",
    description: "MCP server listing with score and discovery metadata.",
  },
  {
    id: "wmcp",
    label: "wmcp.sh",
    href: PUBLIC_LINKS.wmcp,
    category: "trust",
    status: "grade page",
    description: "Public grade page for the npm MCP package.",
  },
  {
    id: "mcp-sentinel",
    label: "MCP Sentinel",
    href: PUBLIC_LINKS.mcpSentinel,
    category: "audit",
    status: "audit page",
    description: "Security-oriented directory entry for the MCP server.",
  },
  {
    id: "enterprise-dna",
    label: "Enterprise DNA",
    href: PUBLIC_LINKS.enterpriseDna,
    category: "directory",
    status: "listed",
    description: "Enterprise DNA MCP directory page for local-ydb-toolkit.",
  },
  {
    id: "mcp-so",
    label: "MCP.so",
    href: PUBLIC_LINKS.mcpSo,
    category: "directory",
    status: "listed",
    description: "MCP.so server entry for the local-ydb-mcp package.",
  },
  {
    id: "mcp-toplist",
    label: "MCP Toplist",
    href: PUBLIC_LINKS.mcpToplist,
    category: "directory",
    status: "listed",
    description: "MCP Toplist profile for the official server identifier.",
  },
  {
    id: "claude-code-marketplaces",
    label: "Claude Code Marketplaces",
    href: PUBLIC_LINKS.claudeCodeMarketplaces,
    category: "directory",
    status: "listed",
    description: "Claude-focused MCP marketplace entry for the server.",
  },
  {
    id: "lobehub",
    label: "LobeHub",
    href: PUBLIC_LINKS.lobeHub,
    category: "directory",
    status: "listed",
    description: "LobeHub MCP directory entry for agent discovery.",
  },
  {
    id: "codeguilds",
    label: "CodeGuilds",
    href: PUBLIC_LINKS.codeGuilds,
    category: "directory",
    status: "listed",
    description: "Package listing for local-ydb-toolkit developer discovery.",
  },
  {
    id: "awesome-mcp",
    label: "Awesome MCP Servers",
    href: PUBLIC_LINKS.awesomeMcpServers,
    category: "directory",
    status: "awesome list",
    description: "Awesome MCP Servers database category listing.",
  },
  {
    id: "awesome-skills",
    label: "Awesome Skills",
    href: PUBLIC_LINKS.awesomeSkills,
    category: "directory",
    status: "skill listing",
    description: "Codex skill directory page for the local-ydb skill.",
  },
  {
    id: "skiln",
    label: "Skiln",
    href: PUBLIC_LINKS.skiln,
    category: "directory",
    status: "listed",
    description: "MCP catalog entry for the io.github server name.",
  },
  {
    id: "policylayer",
    label: "PolicyLayer",
    href: PUBLIC_LINKS.policyLayer,
    category: "governance",
    status: "policy catalog",
    description: "Policy and token-cost catalog page for the MCP server.",
  },
  {
    id: "timeahead",
    label: "Timeahead MCPScore",
    href: PUBLIC_LINKS.timeaheadMcpScore,
    category: "directory",
    status: "listed",
    description: "MCPScore directory listing for the local-ydb-mcp package.",
  },
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
      "Use astandrik/setup-local-ydb for GitHub Actions jobs that need disposable YDB tenants.",
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
    "Docker-based local-ydb operations for AI agents, with plan-first MCP tools, a reusable Codex skill, and a GitHub Action for disposable YDB in CI.",
  description:
    "local-ydb-toolkit helps agents inspect, bootstrap, diagnose, harden, migrate, and upgrade local-ydb deployments without turning operational changes into blind shell scripts.",
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
    audience: "CI jobs that need an ephemeral local YDB tenant.",
    command: "uses: astandrik/setup-local-ydb@v1",
    configSnippet: `- uses: astandrik/setup-local-ydb@v1
  id: ydb
  with:
    version: 26.1.1.6
    tenant: /local/test`,
    description:
      "Bootstrap disposable local-ydb in GitHub Actions and export endpoint/database variables for later steps.",
  },
];

export const WORKFLOWS: Workflow[] = [
  {
    id: "diagnostics",
    title: "Diagnostics",
    description:
      "Inventory containers, inspect tenant status, run YDB healthcheck, read logs, and route follow-up checks by issue type.",
    tools: [
      "local_ydb_status_report",
      "local_ydb_healthcheck",
      "local_ydb_container_logs",
    ],
  },
  {
    id: "bootstrap",
    title: "Bootstrap",
    description:
      "Start a root /local database or a tenant-oriented topology when GraphShard, storage workflows, or dynamic nodes are required.",
    tools: [
      "local_ydb_check_prerequisites",
      "local_ydb_bootstrap_root_database",
      "local_ydb_bootstrap",
    ],
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
      "Prepare native auth config, write dynamic-node auth artifacts, apply hardening, and verify anonymous access is closed.",
    tools: [
      "local_ydb_prepare_auth_config",
      "local_ydb_write_dynamic_auth_config",
      "local_ydb_apply_auth_hardening",
      "local_ydb_auth_check",
    ],
  },
  {
    id: "storage",
    title: "Storage",
    description:
      "Inspect storage pool placement, add groups, reduce groups by dump/rebuild/restore, and clean leftovers only after review.",
    tools: [
      "local_ydb_storage_placement",
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
      "local_ydb_upgrade_version",
    ],
  },
];

export function getAgentRoutingGuidance(): string {
  return [
    "Use local-ydb-toolkit when the user needs to operate Docker-based local-ydb environments: prerequisite checks, bootstrap, diagnostics, schema DDL generation/validation/application, auth hardening, storage workflows, dump listing, path-level dump/restore, or version upgrades.",
    "Use ydb/ydb-mcp when the user already has a reachable YDB endpoint and needs general database-level work such as ad hoc SQL queries, query explanations, directory listing, or path inspection.",
    "Use the remote promo MCP only for product discovery, install snippets, workflow summaries, and routing guidance. It does not execute local-ydb operations.",
    "For actual local operations, connect the local stdio MCP server with @astandrik/local-ydb-mcp@latest and keep private config paths and credentials local.",
  ].join("\n\n");
}
