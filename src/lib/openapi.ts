import { getPublicOrigin } from "@/lib/base-path";
import { MCP_SERVER_VERSION } from "@/lib/mcp-registry";

const jsonResponse = (schema: string) => ({
  description: "JSON response.",
  content: {
    "application/json": {
      schema: { $ref: schema },
    },
  },
});

const textResponse = (contentType: string) => ({
  description: "Text response.",
  content: {
    [contentType]: {
      schema: { type: "string" },
    },
  },
});

export function buildOpenApiSpec() {
  return {
    openapi: "3.1.0",
    info: {
      title: "local-ydb-toolkit API",
      version: MCP_SERVER_VERSION,
      description:
        "Static public contract for local-ydb-toolkit discovery, docs, install options, workflow summaries, and the read-only promo MCP. This API does not expose local-ydb operational mutations.",
      contact: {
        name: "local-ydb-toolkit",
        url: "https://github.com/astandrik/local-ydb-toolkit",
      },
    },
    servers: [{ url: getPublicOrigin() }],
    tags: [
      { name: "Discovery", description: "Agent-readable discovery surfaces." },
      { name: "Product", description: "Static product and install data." },
      { name: "MCP", description: "Read-only hosted promo MCP." },
    ],
    paths: {
      "/api/product": {
        get: {
          operationId: "getProduct",
          tags: ["Product"],
          summary: "Get local-ydb-toolkit product overview",
          security: [],
          responses: { "200": jsonResponse("#/components/schemas/Product") },
        },
      },
      "/api/install-options": {
        get: {
          operationId: "getInstallOptions",
          tags: ["Product"],
          summary: "Get install options",
          security: [],
          responses: {
            "200": jsonResponse("#/components/schemas/InstallOptions"),
          },
        },
      },
      "/api/workflows": {
        get: {
          operationId: "getWorkflows",
          tags: ["Product"],
          summary: "Get supported local-ydb workflow summaries",
          security: [],
          responses: { "200": jsonResponse("#/components/schemas/Workflows") },
        },
      },
      "/llms.txt": {
        get: {
          operationId: "getLlmsTxt",
          tags: ["Discovery"],
          summary: "Get concise LLM discovery context",
          security: [],
          responses: { "200": textResponse("text/plain") },
        },
      },
      "/llms-full.txt": {
        get: {
          operationId: "getLlmsFullTxt",
          tags: ["Discovery"],
          summary: "Get expanded LLM context",
          security: [],
          responses: { "200": textResponse("text/plain") },
        },
      },
      "/agents.md": {
        get: {
          operationId: "getAgentsMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown agent guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/developers.md": {
        get: {
          operationId: "getDevelopersMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown developer resources",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/mcp.md": {
        get: {
          operationId: "getMcpMarkdown",
          tags: ["Discovery", "MCP"],
          summary: "Get markdown MCP guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/auth.md": {
        get: {
          operationId: "getAuthMarkdown",
          tags: ["Discovery"],
          summary: "Get auth boundary notes",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/index.md": {
        get: {
          operationId: "getIndexMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown homepage",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/compare": {
        get: {
          operationId: "getComparePage",
          tags: ["Discovery"],
          summary: "Get comparison page",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/compare.md": {
        get: {
          operationId: "getCompareMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown comparison page",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides": {
        get: {
          operationId: "getGuidesIndexPage",
          tags: ["Discovery"],
          summary: "Get guides index page",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/index.md": {
        get: {
          operationId: "getGuidesIndexMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown guides index",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/local-ydb-mcp-vs-ydb-mcp": {
        get: {
          operationId: "getLocalYdbMcpVsYdbMcpGuide",
          tags: ["Discovery"],
          summary: "Get local-ydb-mcp vs ydb-mcp guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/local-ydb-mcp-vs-ydb-mcp.md": {
        get: {
          operationId: "getLocalYdbMcpVsYdbMcpGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown local-ydb-mcp vs ydb-mcp guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/diagnose-local-ydb-mcp": {
        get: {
          operationId: "getDiagnoseLocalYdbMcpGuide",
          tags: ["Discovery"],
          summary: "Get local-ydb diagnostics guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/diagnose-local-ydb-mcp.md": {
        get: {
          operationId: "getDiagnoseLocalYdbMcpGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown local-ydb diagnostics guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/local-ydb-sql": {
        get: {
          operationId: "getLocalYdbSqlGuide",
          tags: ["Discovery"],
          summary: "Get managed local YDB SQL guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/local-ydb-sql.md": {
        get: {
          operationId: "getLocalYdbSqlGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown managed local YDB SQL guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/ydb-schema-ddl-mcp": {
        get: {
          operationId: "getYdbSchemaDdlMcpGuide",
          tags: ["Discovery"],
          summary: "Get YDB schema DDL MCP guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/ydb-schema-ddl-mcp.md": {
        get: {
          operationId: "getYdbSchemaDdlMcpGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown YDB schema DDL MCP guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/best-tools-local-ydb-ai-agents": {
        get: {
          operationId: "getBestToolsLocalYdbAiAgentsGuide",
          tags: ["Discovery"],
          summary: "Get local YDB AI-agent tools roundup",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/best-tools-local-ydb-ai-agents.md": {
        get: {
          operationId: "getBestToolsLocalYdbAiAgentsGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown local YDB AI-agent tools roundup",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/local-database-deployment-automation": {
        get: {
          operationId: "getLocalDatabaseDeploymentAutomationGuide",
          tags: ["Discovery"],
          summary: "Get local database deployment automation guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/local-database-deployment-automation.md": {
        get: {
          operationId: "getLocalDatabaseDeploymentAutomationGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown local database deployment automation guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/guides/local-ydb-ci": {
        get: {
          operationId: "getLocalYdbCiGuide",
          tags: ["Discovery"],
          summary: "Get local YDB CI guide",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/guides/local-ydb-ci.md": {
        get: {
          operationId: "getLocalYdbCiGuideMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown local YDB CI guide",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/docs/api": {
        get: {
          operationId: "getApiDocsPage",
          tags: ["Discovery"],
          summary: "Get API docs page",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/docs/api.md": {
        get: {
          operationId: "getApiDocsMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown API docs",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/docs/webhooks": {
        get: {
          operationId: "getWebhooksPage",
          tags: ["Discovery"],
          summary: "Get webhooks status page",
          security: [],
          responses: { "200": textResponse("text/html") },
        },
      },
      "/docs/webhooks.md": {
        get: {
          operationId: "getWebhooksMarkdown",
          tags: ["Discovery"],
          summary: "Get markdown webhooks status",
          security: [],
          responses: { "200": textResponse("text/markdown") },
        },
      },
      "/openapi.json": {
        get: {
          operationId: "getOpenApi",
          tags: ["Discovery"],
          summary: "Get OpenAPI JSON",
          security: [],
          responses: {
            "200": jsonResponse("#/components/schemas/OpenApiDocument"),
          },
        },
      },
      "/api/openapi.json": {
        get: {
          operationId: "getOpenApiAlias",
          tags: ["Discovery"],
          summary: "Get OpenAPI JSON from API-prefixed alias",
          security: [],
          responses: {
            "200": jsonResponse("#/components/schemas/OpenApiDocument"),
          },
        },
      },
      "/.well-known/agent-card.json": {
        get: {
          operationId: "getA2aAgentCard",
          tags: ["Discovery"],
          summary: "Get A2A agent card",
          security: [],
          responses: {
            "200": jsonResponse("#/components/schemas/AgentCard"),
          },
        },
      },
      "/mcp": {
        post: {
          operationId: "callPromoMcp",
          tags: ["MCP"],
          summary: "Call the read-only local-ydb-toolkit promo MCP",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { type: "object", additionalProperties: true },
              },
            },
          },
          responses: {
            "200": {
              description: "MCP JSON-RPC response.",
              content: {
                "application/json": {
                  schema: { type: "object", additionalProperties: true },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        OpenApiDocument: { type: "object", additionalProperties: true },
        AgentCard: { type: "object", additionalProperties: true },
        Product: {
          type: "object",
          required: ["product", "toolkitRelease"],
          properties: {
            product: { type: "object", additionalProperties: true },
            toolkitRelease: {
              type: "object",
              required: ["package", "version", "toolCount", "checkedAt"],
              properties: {
                package: { type: "string" },
                version: { type: "string" },
                toolCount: { type: "integer", minimum: 1 },
                checkedAt: { type: "string", format: "date" },
              },
              additionalProperties: false,
            },
          },
          additionalProperties: true,
        },
        InstallOptions: {
          type: "object",
          properties: {
            installOptions: {
              type: "array",
              items: { type: "object", additionalProperties: true },
            },
          },
        },
        Workflows: {
          type: "object",
          properties: {
            workflows: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "title", "description", "tools"],
                properties: {
                  id: {
                    type: "string",
                    enum: [
                      "diagnostics",
                      "query",
                      "schema",
                      "auth",
                      "bootstrap",
                      "dynamic-nodes",
                      "storage",
                      "backup",
                      "upgrade",
                    ],
                  },
                  title: { type: "string" },
                  description: { type: "string" },
                  tools: {
                    type: "array",
                    items: { type: "string", pattern: "^local_ydb_" },
                  },
                },
                additionalProperties: false,
              },
            },
          },
        },
      },
    },
  } as const;
}
