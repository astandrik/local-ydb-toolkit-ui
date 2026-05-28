import { getPublicOrigin } from "@/lib/base-path";

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
      version: "1.0.0",
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
        Product: { type: "object", additionalProperties: true },
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
              items: { type: "object", additionalProperties: true },
            },
          },
        },
      },
    },
  } as const;
}
