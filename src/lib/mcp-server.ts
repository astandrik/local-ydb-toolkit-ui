import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { toPublicUrl } from "@/lib/base-path";
import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_REGISTRY_LINKS,
  PUBLIC_LINKS,
  WORKFLOWS,
  getAgentRoutingGuidance,
} from "@/lib/product-data";
import { MCP_SERVER_VERSION } from "@/lib/mcp-registry";

type PromoMcpToolResult = {
  structuredContent: Record<string, unknown>;
  content: Array<{ type: "text"; text: string }>;
  isError?: true;
};

type PromoToolName =
  | "get_product_overview"
  | "get_install_options"
  | "list_local_ydb_workflows"
  | "get_agent_routing_guidance"
  | "get_public_links";

const READ_ONLY_TOOL = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const toolHandlers: Record<PromoToolName, () => PromoMcpToolResult> = {
  get_product_overview: () =>
    toolResult(
      {
        product: LOCAL_YDB_PRODUCT,
        boundaries: AGENT_BOUNDARIES,
      },
      `${LOCAL_YDB_PRODUCT.summary}\n\n${AGENT_BOUNDARIES.remotePromoMcp}`,
    ),
  get_install_options: () =>
    toolResult(
      {
        installOptions: INSTALL_OPTIONS,
      },
      "Install options include the local stdio MCP server, Codex skill, and GitHub Action.",
    ),
  list_local_ydb_workflows: () =>
    toolResult(
      {
        workflows: WORKFLOWS,
      },
      "This is a read-only summary of local-ydb workflows. Execute them through the local stdio MCP server.",
    ),
  get_agent_routing_guidance: () =>
    toolResult(
      {
        guidance: getAgentRoutingGuidance(),
      },
      getAgentRoutingGuidance(),
    ),
  get_public_links: () =>
    toolResult(
      {
        links: {
          site: toPublicUrl("/"),
          indexMarkdown: toPublicUrl("/index.md"),
          mcp: toPublicUrl("/mcp"),
          openapi: toPublicUrl("/openapi.json"),
          llms: toPublicUrl("/llms.txt"),
          apiDocs: toPublicUrl("/docs/api"),
          guides: toPublicUrl("/guides"),
          guidesMarkdown: toPublicUrl("/guides/index.md"),
          guidePages: GUIDE_LINKS.map(({ label, href, markdownHref }) => ({
            label,
            href: toPublicUrl(href),
            markdownHref: toPublicUrl(markdownHref),
          })),
          webhooks: toPublicUrl("/docs/webhooks"),
          agentCard: toPublicUrl("/.well-known/agent-card.json"),
          github: PUBLIC_LINKS.github,
          npm: PUBLIC_LINKS.npm,
          githubAction: PUBLIC_LINKS.githubAction,
          officialYdbMcp: PUBLIC_LINKS.officialYdbMcp,
          mcpRegistries: MCP_REGISTRY_LINKS.map(
            ({ label, href, category, status }) => ({
              label,
              href,
              category,
              status,
            }),
          ),
        },
      },
      "Stable public links for local-ydb-toolkit discovery and installation.",
    ),
};

export function createPromoMcpServer(): McpServer {
  const server = new McpServer({
    name: "local-ydb-toolkit-promo",
    version: MCP_SERVER_VERSION,
  });

  registerReadOnlyTool(
    server,
    "get_product_overview",
    "Get product overview",
    "Return the local-ydb-toolkit product overview, primary CTA, and safety boundaries.",
  );
  registerReadOnlyTool(
    server,
    "get_install_options",
    "Get install options",
    "Return install snippets for the local stdio MCP server, Codex skill, and GitHub Action.",
  );
  registerReadOnlyTool(
    server,
    "list_local_ydb_workflows",
    "List local-ydb workflows",
    "Return workflow categories and representative local stdio MCP tools.",
  );
  registerReadOnlyTool(
    server,
    "get_agent_routing_guidance",
    "Get agent routing guidance",
    "Explain when to use local-ydb-toolkit and when to use ydb/ydb-mcp.",
  );
  registerReadOnlyTool(
    server,
    "get_public_links",
    "Get public links",
    "Return stable public URLs for discovery, source, package, and docs surfaces.",
  );

  return server;
}

export async function callPromoToolForTest(
  name: PromoToolName,
  _args: unknown,
): Promise<PromoMcpToolResult> {
  void _args;
  return toolHandlers[name]();
}

function registerReadOnlyTool(
  server: McpServer,
  name: PromoToolName,
  title: string,
  description: string,
): void {
  server.registerTool(
    name,
    {
      title,
      description,
      inputSchema: {},
      annotations: READ_ONLY_TOOL,
    },
    async () => toolHandlers[name](),
  );
}

function toolResult(
  structuredContent: Record<string, unknown>,
  text: string,
): PromoMcpToolResult {
  return {
    structuredContent,
    content: [
      {
        type: "text",
        text,
      },
    ],
  };
}
