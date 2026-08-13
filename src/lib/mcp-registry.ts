import { toPublicUrl } from "@/lib/base-path";

export const MCP_REGISTRY_SCHEMA_URL =
  "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json";
export const MCP_SERVER_NAME =
  "tech.ydb-qdrant.local-ydb-toolkit/promo";
export const MCP_SERVER_TITLE = "local-ydb-toolkit Promo";
export const MCP_SERVER_DESCRIPTION =
  "Read-only product discovery and install guidance, including the repository Agent Plugin, plus workflow summaries and routing help for local-ydb-toolkit.";
export const MCP_SERVER_VERSION = "1.2.0";

export function buildMcpRegistryServerMetadata() {
  return {
    $schema: MCP_REGISTRY_SCHEMA_URL,
    name: MCP_SERVER_NAME,
    title: MCP_SERVER_TITLE,
    description: MCP_SERVER_DESCRIPTION,
    version: MCP_SERVER_VERSION,
    websiteUrl: toPublicUrl("/"),
    remotes: [
      {
        type: "streamable-http",
        url: toPublicUrl("/mcp"),
      },
    ],
  };
}

export function buildMcpServerCard() {
  return {
    name: MCP_SERVER_TITLE,
    description: MCP_SERVER_DESCRIPTION,
    version: MCP_SERVER_VERSION,
    serverUrl: toPublicUrl("/mcp"),
    endpoint: toPublicUrl("/mcp"),
    instructions:
      "Use this read-only promo MCP to understand local-ydb-toolkit, choose install options, list supported workflows, and decide when to use the local stdio MCP versus ydb/ydb-mcp. Do not use it for local-ydb operational execution.",
    tools: [
      {
        name: "get_product_overview",
        description: "Return the product overview and safety boundaries.",
      },
      {
        name: "get_install_options",
        description:
          "Return MCP, Codex skill, GitHub Action, and repository Agent Plugin install paths.",
      },
      {
        name: "list_local_ydb_workflows",
        description: "Return supported local-ydb workflow summaries.",
      },
      {
        name: "get_agent_routing_guidance",
        description: "Explain local-ydb-toolkit versus ydb/ydb-mcp routing.",
      },
      {
        name: "get_public_links",
        description: "Return stable public links for docs and package pages.",
      },
    ],
    resources: [
      {
        title: "Homepage markdown",
        url: toPublicUrl("/index.md"),
        type: "text/markdown",
      },
      {
        title: "llms.txt",
        url: toPublicUrl("/llms.txt"),
        type: "text/plain",
      },
      {
        title: "llms-full.txt",
        url: toPublicUrl("/llms-full.txt"),
        type: "text/plain",
      },
      {
        title: "Featured external listings",
        url: toPublicUrl("/developers.md#featured-external-listings"),
        type: "text/markdown",
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
      {
        title: "OpenAPI JSON",
        url: toPublicUrl("/openapi.json"),
        type: "application/json",
      },
      {
        title: "Product JSON",
        url: toPublicUrl("/api/product"),
        type: "application/json",
      },
    ],
  };
}
