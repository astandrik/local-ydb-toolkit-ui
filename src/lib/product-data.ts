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

export type McpListingPurpose =
  | "identity"
  | "installation-discovery"
  | "version-metadata"
  | "change-monitoring"
  | "independent-analysis";

export type McpRegistryLink = {
  id:
    | "official-mcp-registry"
    | "modelscope"
    | "gilde"
    | "mcpindex"
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
    | "mcp-conformance"
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
  purpose: McpListingPurpose;
  userValue: string;
  confirmedClaims: string[];
  limitations: string[];
  featured: boolean;
  includeInSameAs: boolean;
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
  gilde:
    "https://github.com/bendyline/gilde/blob/main/data/community/toolsets/as/astandrik-local-ydb-mcp/manifest.json",
  mcpIndex:
    "https://mcpindex.ai/server/io-github-astandrik-local-ydb-mcp",
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
  mcpConformance:
    "https://github.com/Ahmad-Faraj/mcp-conformance/blob/a4dceadd14c7a01ab255d822ca4fcfb2987dac57/data/release/probe_census.jsonl#L5699",
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

const MCP_REGISTRY_REVIEW_DATE = "2026-08-11";

function reviewedRegistryLink(
  link: Omit<McpRegistryLink, "lastChecked" | "note"> & {
    lastChecked?: string;
  },
): McpRegistryLink {
  return {
    ...link,
    lastChecked: link.lastChecked ?? MCP_REGISTRY_REVIEW_DATE,
    note: link.limitations.join(" "),
  };
}

export const MCP_DIRECTORY_SNAPSHOT_WARNING =
  "Third-party directory scores, tool counts, and install metrics are external snapshots, often automated, not security attestations.";

export const MCP_LISTING_CONTEXT =
  "Use these third-party pages to confirm the canonical repository, npm package, current version, or installation metadata. Directory inclusion is not an endorsement or security audit.";

export const MCP_LISTING_PURPOSES: ReadonlyArray<{
  id: McpListingPurpose;
  label: string;
  description: string;
}> = [
  {
    id: "identity",
    label: "Identity",
    description: "Confirm the published server ID, package, and canonical repository.",
  },
  {
    id: "installation-discovery",
    label: "Installation discovery",
    description: "Find client-oriented install examples and marketplace entry points.",
  },
  {
    id: "version-metadata",
    label: "Version metadata",
    description: "Compare release, package, and indexed tool-surface snapshots.",
  },
  {
    id: "change-monitoring",
    label: "Change monitoring",
    description: "Review observations about metadata changes between crawls.",
  },
  {
    id: "independent-analysis",
    label: "Independent analysis",
    description: "Inspect third-party capability, policy, and static-analysis reports with their limitations.",
  },
];

export const MCP_REGISTRY_LINKS: McpRegistryLink[] = [
  reviewedRegistryLink({
    id: "official-mcp-registry",
    label: "Official MCP Registry",
    href: PUBLIC_LINKS.officialMcpRegistry,
    category: "registry",
    status: "published identity metadata",
    description: "Canonical Registry record for the published MCP server identity.",
    sourceType: "official",
    accuracy: "current",
    purpose: "identity",
    userValue: "Confirm the server ID, npm package, and canonical repository before installing.",
    confirmedClaims: [
      "The published server ID is io.github.astandrik/local-ydb-mcp.",
      "Version 0.15.2 points to @astandrik/local-ydb-mcp and the canonical GitHub repository.",
    ],
    limitations: [
      "Registry publication confirms identity metadata, not runtime behavior or security.",
    ],
    featured: true,
    includeInSameAs: true,
  }),
  reviewedRegistryLink({
    id: "modelscope",
    label: "ModelScope MCP Plaza",
    href: PUBLIC_LINKS.modelScope,
    category: "directory",
    status: "marketplace listing",
    description: "Marketplace discovery page for Local YDB MCP installation guidance.",
    sourceType: "community",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Find the marketplace installation entry and its npx stdio configuration.",
    confirmedClaims: [
      "The marketplace entry links the canonical repository and exposes an npx stdio configuration for @astandrik/local-ydb-mcp@latest.",
      "LOCAL_YDB_TOOLKIT_CONFIG is represented as optional installation metadata.",
    ],
    limitations: [
      "The current marketplace snapshot exposes an empty tools list.",
      "Marketplace inclusion is not a security assessment.",
    ],
    featured: true,
    includeInSameAs: true,
  }),
  reviewedRegistryLink({
    id: "gilde",
    label: "Gilde",
    href: PUBLIC_LINKS.gilde,
    category: "directory",
    status: "versioned catalog record",
    description: "Versioned community manifest imported from the Official MCP Registry.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "version-metadata",
    userValue: "Inspect a versioned manifest with package integrity and runtime metadata.",
    confirmedClaims: [
      "The manifest matches version 0.15.2, the canonical repository, npm package, entrypoint, and environment fields.",
      "Its tarball SHA-256 matches the npm 0.15.2 artifact.",
    ],
    limitations: [
      "The version manifest exposes an empty tools array.",
      "Gilde has no stable rendered deep link for this record and provides no independent audit.",
    ],
    featured: true,
    includeInSameAs: true,
  }),
  reviewedRegistryLink({
    id: "mcpindex",
    label: "mcpindex.ai",
    href: PUBLIC_LINKS.mcpIndex,
    category: "directory",
    status: "registry and drift snapshot",
    description: "Registry metadata and description-drift observation for Local YDB MCP.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "change-monitoring",
    userValue: "Check install metadata and whether the public description changed between crawls.",
    confirmedClaims: [
      "Version 0.15.2, repository, website, npx command, and environment fields match primary sources.",
      "The page records a description-level drift snapshot.",
    ],
    limitations: [
      "Its quality score measures listing maturity, not trust.",
      "PARTIAL and no-drift refer only to the observed description and are not security findings.",
    ],
    featured: true,
    includeInSameAs: true,
  }),
  reviewedRegistryLink({
    id: "curated-mcp",
    label: "CuratedMCP",
    href: PUBLIC_LINKS.curatedMcp,
    category: "trust",
    status: "marketplace install profile",
    description: "Marketplace profile with an npx command and canonical project links.",
    sourceType: "community",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Copy a basic npx command and open the canonical repository.",
    confirmedClaims: ["The page identifies the maintainer, repository, and current npm package command."],
    limitations: [
      "The page's Verified label and security-review link do not expose a current artifact, scan date, and methodology together.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "glama",
    label: "Glama",
    href: PUBLIC_LINKS.glama,
    category: "trust",
    status: "capability summary",
    description: "Source-derived overview of the server's operational capabilities.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "independent-analysis",
    userValue: "Review a categorized overview of what the server can operate.",
    confirmedClaims: ["The page links the canonical project and reflects the current broad capability areas."],
    limitations: [
      "Most content is derived from project documentation; directory scores are not runtime or security verification.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "wmcp",
    label: "wmcp.sh",
    href: PUBLIC_LINKS.wmcp,
    category: "trust",
    status: "stale package analysis",
    description: "Static package analysis with a published grading rubric.",
    sourceType: "automated",
    accuracy: "stale",
    purpose: "version-metadata",
    userValue: "See which package version a third-party static analysis actually inspected.",
    confirmedClaims: ["The page identifies @astandrik/local-ydb-mcp as a local stdio package."],
    limitations: [
      "The analysis is for version 0.14.1, detects one tool, and exposes no scan date, so its grade is not evidence about the current 0.15.2 artifact.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "mcp-sentinel",
    label: "MCP Sentinel",
    href: PUBLIC_LINKS.mcpSentinel,
    category: "audit",
    status: "unattested rules report",
    description: "Security-oriented rules report with per-rule methodology text.",
    sourceType: "automated",
    accuracy: "unverified",
    purpose: "independent-analysis",
    userValue: "Inspect which security rule families the service attempts to evaluate.",
    confirmedClaims: ["The page exposes rule names, test methodology, and evidence placeholders."],
    limitations: [
      "The report is explicitly not attested and does not reliably identify a current artifact version and scan date.",
      "Displayed passed rules must not be read as a current package security verdict.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "enterprise-dna",
    label: "Enterprise DNA",
    href: PUBLIC_LINKS.enterpriseDna,
    category: "directory",
    status: "older directory snapshot",
    description: "Directory snapshot with a package command and partial tool list.",
    sourceType: "automated",
    accuracy: "stale",
    purpose: "version-metadata",
    userValue: "Compare an older indexed snapshot with the current server surface.",
    confirmedClaims: ["The page links the canonical repository and names the npm package."],
    limitations: [
      "Its 2026-05-28 source snapshot lists only 20 tools and includes stale adoption metadata.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "mcp-so",
    label: "MCP.so",
    href: PUBLIC_LINKS.mcpSo,
    category: "directory",
    status: "install and tool profile",
    description: "Install configuration and browsable tool descriptions for the npm server.",
    sourceType: "community",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Copy an npx client configuration and browse the current tool surface.",
    confirmedClaims: ["The page links canonical sources, uses the current package, and lists 39 tools."],
    limitations: [
      "Its example includes only one of the two optional environment variables and is not an independent runtime or security check.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "mcp-toplist",
    label: "MCP Toplist",
    href: PUBLIC_LINKS.mcpToplist,
    category: "directory",
    status: "version history snapshot",
    description: "Tracked release history and install metadata for the official server ID.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "version-metadata",
    userValue: "Review the indexed release sequence through version 0.15.2.",
    confirmedClaims: ["The page links the canonical repository and records versions 0.8.0 through 0.15.2."],
    limitations: [
      "Registry totals on the page are internally inconsistent, and ranks and counts are volatile directory metrics.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "claude-code-marketplaces",
    label: "Claude Code Marketplaces",
    href: PUBLIC_LINKS.claudeCodeMarketplaces,
    category: "directory",
    status: "client discovery profile",
    description: "Claude-focused marketplace summary of the local stdio server.",
    sourceType: "community",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Discover the server from a Claude-oriented marketplace and follow its repository link.",
    confirmedClaims: ["The page uses the official registry identity and canonical repository."],
    limitations: [
      "The generated summary does not independently validate package contents, tools, or runtime behavior.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "lobehub",
    label: "LobeHub",
    href: PUBLIC_LINKS.lobeHub,
    category: "directory",
    status: "README-derived install profile",
    description: "Client discovery page with install paths and generated feature summaries.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Find repository-based install instructions for Codex and other MCP clients.",
    confirmedClaims: ["The page links the canonical repository and reproduces current project install guidance."],
    limitations: [
      "The page is largely a README mirror; displayed versions, scores, and counts are not authoritative package or security evidence.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "codeguilds",
    label: "CodeGuilds",
    href: PUBLIC_LINKS.codeGuilds,
    category: "directory",
    status: "package snapshot",
    description: "Developer directory page that mirrors the project README.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "version-metadata",
    userValue: "Compare the directory's package snapshot with the canonical project.",
    confirmedClaims: ["The page identifies the canonical repository and current project scope."],
    limitations: [
      "Its versions section reports zero, and ratings or download metrics describe the directory channel rather than npm usage.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "awesome-mcp",
    label: "Awesome MCP Servers",
    href: PUBLIC_LINKS.awesomeMcpServers,
    category: "directory",
    status: "community list entry",
    description: "Community-maintained Databases category entry linking the canonical repository.",
    sourceType: "community",
    accuracy: "current",
    purpose: "installation-discovery",
    userValue: "Discover Local YDB MCP alongside other database-oriented MCP servers.",
    confirmedClaims: ["The canonical upstream README contains the Local YDB entry in its Databases section."],
    limitations: ["List inclusion is a community discovery signal, not runtime or security verification."],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "awesome-skills",
    label: "Awesome Skills",
    href: PUBLIC_LINKS.awesomeSkills,
    category: "directory",
    status: "minimal skill profile",
    description: "Agent-skill discovery page with a short project description.",
    sourceType: "automated",
    accuracy: "misleading",
    purpose: "installation-discovery",
    userValue: "Open a lightweight directory page for the companion local-ydb skill.",
    confirmedClaims: ["The page identifies local-ydb-toolkit and its Docker-based local-ydb purpose."],
    limitations: [
      "It provides no practical install or configuration metadata and incorrectly groups the skill under Writing & Editing.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "skiln",
    label: "Skiln",
    href: PUBLIC_LINKS.skiln,
    category: "directory",
    status: "registry-derived snapshot",
    description: "Official Registry-derived profile with community availability feedback.",
    sourceType: "automated",
    accuracy: "misleading",
    purpose: "version-metadata",
    userValue: "Confirm that Skiln indexed the official server identity and source repository.",
    confirmedClaims: ["The page names the exact server ID, repository, and Official Registry as its source."],
    limitations: [
      "Its install command is a repository clone rather than the canonical npm stdio configuration, and a community Works vote is not security verification.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "policylayer",
    label: "PolicyLayer",
    href: PUBLIC_LINKS.policyLayer,
    category: "governance",
    status: "capability policy profile",
    description: "Tool authority classification and suggested policy controls.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "independent-analysis",
    userValue: "Review which tools can read, write, execute, or delete before setting agent policy.",
    confirmedClaims: ["The page identifies the npm package and enumerates the current 39-tool surface."],
    limitations: [
      "The record is explicitly unverified and no remote endpoint was probed.",
      "Its risk grade describes potential authority and blast radius, not a discovered vulnerability, and does not capture every plan-first confirmation guard.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "mcp-conformance",
    label: "MCP Conformance Census",
    href: PUBLIC_LINKS.mcpConformance,
    category: "audit",
    status: "execution-based conformance snapshot",
    description: "Sandboxed execution probe of the published npm MCP server.",
    sourceType: "automated",
    accuracy: "stale",
    lastChecked: "2026-08-12",
    purpose: "independent-analysis",
    userValue: "Inspect an independently executed MCP handshake and protocol checks.",
    confirmedClaims: [
      "The census launched @astandrik/local-ydb-mcp@0.14.1, completed the MCP handshake, and enumerated 38 tools.",
      "Initialize, ping, tool-list, schema validation, invalid-argument rejection, malformed-JSON survival, and stdout-purity checks passed.",
    ],
    limitations: [
      "The snapshot covers version 0.14.1 rather than current version 0.15.2, does not exercise operational tools against a configured local YDB target, and is not a security audit.",
      "Its error-as-result outcome for an unknown tool is measured SDK behavior that the study explicitly does not classify as a failure.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "timeahead",
    label: "Timeahead MCPScore",
    href: PUBLIC_LINKS.timeaheadMcpScore,
    category: "directory",
    status: "conflicting metadata snapshot",
    description: "Repository activity and package-discovery snapshot.",
    sourceType: "automated",
    accuracy: "misleading",
    purpose: "version-metadata",
    userValue: "See where automated ecosystem metadata conflicts with primary package sources.",
    confirmedClaims: ["The page links the canonical repository and recognizes the Local YDB MCP project."],
    limitations: [
      "It incorrectly reports that no npm package exists; its score, downloads, CI state, stars, and timestamps are volatile or conflict with primary sources.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "pulse-mcp",
    label: "PulseMCP",
    href: PUBLIC_LINKS.pulseMcp,
    category: "directory",
    status: "server.json discovery profile",
    description: "Community directory record linking the maintainer, repository, and server.json metadata.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "version-metadata",
    userValue: "Open the indexed server.json identity and canonical repository from one page.",
    confirmedClaims: ["The page shows the exact server ID, maintainer, repository, and a server.json view."],
    limitations: ["Traffic, popularity, download, and star figures are estimates or volatile snapshots."],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "mcp-store",
    label: "MCP Store",
    href: PUBLIC_LINKS.mcpStore,
    category: "directory",
    status: "README mirror",
    description: "Repository discovery page with mirrored project documentation.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Find the canonical repository and read its install documentation in the directory.",
    confirmedClaims: ["The page identifies the correct repository and project description."],
    limitations: [
      "The content is primarily a README mirror, provides no independent validation, and mixes in directory hosting or authentication prompts.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "unyly",
    label: "Unyly",
    href: PUBLIC_LINKS.unyly,
    category: "directory",
    status: "unchecked README profile",
    description: "Client-oriented directory page with mirrored installation documentation.",
    sourceType: "automated",
    accuracy: "partial",
    purpose: "installation-discovery",
    userValue: "Review the repository's MCP and Codex installation paths from a client directory.",
    confirmedClaims: ["The page links the canonical repository and reproduces the current 39-tool README."],
    limitations: ["The directory explicitly labels the entry Not checked; it does not validate runtime behavior or security."],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "manifold",
    label: "Manifold Manifest",
    href: PUBLIC_LINKS.manifold,
    category: "audit",
    status: "stale source scan",
    description: "Static manifest, lineage, and tool-surface analysis for an older server version.",
    sourceType: "automated",
    accuracy: "stale",
    purpose: "independent-analysis",
    userValue: "Inspect which source files and tools a third-party scanner analyzed.",
    confirmedClaims: ["The page identifies the canonical repository and shows its per-tool source analysis."],
    limitations: [
      "The scan is dated 2026-08-02 for version 0.15.0, so its clean result does not establish the security of current version 0.15.2.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "forge",
    label: "Forge Registry",
    href: PUBLIC_LINKS.forge,
    category: "trust",
    status: "stale supply-chain profile",
    description: "Supply-chain metadata and static checks for an older npm artifact.",
    sourceType: "automated",
    accuracy: "stale",
    purpose: "independent-analysis",
    userValue: "Review which package provenance and static-analysis checks Forge exposes.",
    confirmedClaims: ["The page links the correct npm package, repository, and npm provenance signal."],
    limitations: [
      "The report covers version 0.14.1, reports stale license and tool-count data, and marks the publisher unverified.",
      "Its scan cannot establish the security of current version 0.15.2.",
    ],
    featured: false,
    includeInSameAs: false,
  }),
  reviewedRegistryLink({
    id: "vibehackers",
    label: "Vibehackers",
    href: PUBLIC_LINKS.vibehackers,
    category: "directory",
    status: "stale install guide",
    description: "Generated client configuration and prerequisite guide.",
    sourceType: "automated",
    accuracy: "stale",
    purpose: "installation-discovery",
    userValue: "Use its client-specific npx examples as a starting point, then compare them with primary metadata.",
    confirmedClaims: ["The page identifies the correct package, repository, stdio transport, and Node.js prerequisite."],
    limitations: [
      "It remains on version 0.14.0, lists only five tools, and incorrectly marks an optional environment variable as required.",
    ],
    featured: false,
    includeInSameAs: false,
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
