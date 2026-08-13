import { toPublicUrl } from "@/lib/base-path";
import {
  AGENT_BOUNDARIES,
  LOCAL_YDB_PRODUCT,
  PUBLIC_LINKS,
} from "@/lib/product-data";
import { MCP_SERVER_VERSION } from "@/lib/mcp-registry";

export function buildA2aAgentCard() {
  return {
    name: "local-ydb-toolkit Promo Agent",
    description:
      "Read-only discovery agent for local-ydb-toolkit install guidance, workflow routing, public docs, and agent-readiness metadata. It does not execute local-ydb operations.",
    url: toPublicUrl("/mcp"),
    documentationUrl: toPublicUrl("/agents.md"),
    provider: {
      organization: "local-ydb-toolkit",
      url: PUBLIC_LINKS.github,
    },
    version: MCP_SERVER_VERSION,
    iconUrl: toPublicUrl("/favicon.svg"),
    capabilities: {
      streaming: false,
      pushNotifications: false,
      extendedAgentCard: false,
    },
    securitySchemes: {},
    security: [],
    defaultInputModes: ["application/json", "text/plain"],
    defaultOutputModes: ["application/json", "text/plain"],
    skills: [
      {
        id: "product-discovery",
        name: "Product Discovery",
        description:
          "Explain what local-ydb-toolkit is, where the public docs live, and which install path fits an agent or developer workflow.",
        tags: ["local-ydb", "MCP", "developer-tools", "discovery"],
        examples: [
          "What is local-ydb-toolkit and when should an AI coding agent use it?",
          `Fetch ${toPublicUrl("/llms.txt")} and summarize the public agent resources.`,
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
      {
        id: "install-guidance",
        name: "Install Guidance",
        description:
          "Return safe setup instructions for the local stdio MCP server, repository Agent Plugin, Codex skill, and GitHub Action.",
        tags: [
          "install",
          "npx",
          "Codex",
          "Agent Plugin",
          "repo marketplace",
          "GitHub Actions",
        ],
        examples: [
          "Show the MCP client config for @astandrik/local-ydb-mcp.",
          "How do I install the full repository Agent Plugin in Codex?",
          "How do I start local YDB in GitHub Actions?",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
      {
        id: "workflow-routing",
        name: "Workflow Routing",
        description:
          "Route users between local-ydb-toolkit, the hosted read-only promo MCP, and ydb/ydb-mcp based on whether they need operations, discovery, or database-level queries.",
        tags: [
          "routing",
          "diagnostics",
          "managed-sql",
          "lifecycle",
          "schema",
          "auth",
          "storage",
        ],
        examples: [
          "Should I use local-ydb-toolkit or ydb/ydb-mcp for this task?",
          "How do I run SnapshotRO YQL against my configured local-ydb profile?",
          "Which local_ydb_* workflow handles auth hardening?",
        ],
        inputModes: ["application/json", "text/plain"],
        outputModes: ["application/json", "text/plain"],
      },
    ],
    resources: [
      {
        title: "Homepage markdown",
        url: toPublicUrl("/index.md"),
        type: "text/markdown",
      },
      {
        title: "llms-full.txt",
        url: toPublicUrl("/llms-full.txt"),
        type: "text/plain",
      },
      {
        title: "External listing verification notes",
        url: toPublicUrl("/listings.md"),
        type: "text/markdown",
      },
      {
        title: "OpenAPI",
        url: toPublicUrl("/openapi.json"),
        type: "application/json",
      },
      {
        title: "Auth guide",
        url: toPublicUrl("/auth.md"),
        type: "text/markdown",
      },
      {
        title: "Managed local YDB SQL guide",
        url: toPublicUrl("/guides/local-ydb-sql.md"),
        type: "text/markdown",
      },
    ],
    boundaries: {
      remotePromoMcp: AGENT_BOUNDARIES.remotePromoMcp,
      localOperations: AGENT_BOUNDARIES.localOperations,
      productSummary: LOCAL_YDB_PRODUCT.summary,
    },
  } as const;
}
