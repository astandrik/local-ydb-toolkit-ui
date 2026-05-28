import { toPublicUrl } from "@/lib/base-path";
import {
  AGENT_BOUNDARIES,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  PUBLIC_LINKS,
  WORKFLOWS,
  getAgentRoutingGuidance,
} from "@/lib/product-data";

export function markdownResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: discoveryLinkHeader(),
    },
  });
}

export function plainTextResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600",
      "Content-Type": "text/plain; charset=utf-8",
      Link: discoveryLinkHeader(),
    },
  });
}

export function buildLlmsText(): string {
  return `
# ${LOCAL_YDB_PRODUCT.name}

> ${LOCAL_YDB_PRODUCT.summary}

local-ydb-toolkit is for AI agents and developers operating Docker-based local-ydb deployments. It provides a local stdio MCP server, a Codex skill, and a GitHub Action.

## Primary install

- MCP server: ${INSTALL_OPTIONS[0]?.command}
- NPM package: ${PUBLIC_LINKS.npm}
- GitHub repository: ${PUBLIC_LINKS.github}

## Agent resources

- Homepage: ${toPublicUrl("/")}
- Agents guide: ${toPublicUrl("/agents.md")}
- Developers guide: ${toPublicUrl("/developers.md")}
- MCP guide: ${toPublicUrl("/mcp.md")}
- Auth notes: ${toPublicUrl("/auth.md")}
- OpenAPI JSON: ${toPublicUrl("/openapi.json")}
- Product JSON: ${toPublicUrl("/api/product")}
- Install options JSON: ${toPublicUrl("/api/install-options")}
- Workflows JSON: ${toPublicUrl("/api/workflows")}
- Read-only promo MCP: ${toPublicUrl("/mcp")}

## Safety boundary

${AGENT_BOUNDARIES.remotePromoMcp}

${AGENT_BOUNDARIES.localOperations}

${getAgentRoutingGuidance()}
`;
}

export function buildLlmsFullText(): string {
  const workflowLines = WORKFLOWS.map(
    (workflow) =>
      `- ${workflow.title}: ${workflow.description} Tools: ${workflow.tools.join(", ")}.`,
  ).join("\n");
  const installLines = INSTALL_OPTIONS.map(
    (option) => `- ${option.label}: ${option.command}`,
  ).join("\n");

  return `
# ${LOCAL_YDB_PRODUCT.name} full agent context

${LOCAL_YDB_PRODUCT.description}

## Install options

${installLines}

## Agent routing

${getAgentRoutingGuidance()}

## Workflows

${workflowLines}

## Boundaries

- ${AGENT_BOUNDARIES.remotePromoMcp}
- ${AGENT_BOUNDARIES.localOperations}
- ${AGENT_BOUNDARIES.credentials}

The operational model is plan-first: mutating tools describe planned commands, risk, rollback, and verification before execution.

The remote promo MCP is read-only. It is an agent-friendly discovery and documentation surface, not the operational local-ydb server.

## Public API

- GET /api/product
- GET /api/install-options
- GET /api/workflows
- GET /openapi.json
- POST /mcp
- GET /.well-known/mcp
- GET /server.json
`;
}

export function buildAgentsMarkdown(): string {
  return `
# local-ydb-toolkit Agent Access

Connect agents to local-ydb-toolkit through machine-readable docs, public JSON, and the read-only promo MCP.

## Quickstart

\`\`\`bash
${INSTALL_OPTIONS[0]?.command}
curl -s ${toPublicUrl("/api/product")}
curl -s ${toPublicUrl("/llms.txt")}
\`\`\`

## Read-only promo MCP tools

- get_product_overview
- get_install_options
- list_local_ydb_workflows
- get_agent_routing_guidance
- get_public_links

The remote promo MCP is read-only and only returns product/documentation help. Actual local-ydb operations stay in the local stdio MCP server.

## Routing

${getAgentRoutingGuidance()}
`;
}

export function buildDevelopersMarkdown(): string {
  return `
# local-ydb-toolkit Developer Resources

## JSON endpoints

- ${toPublicUrl("/api/product")}
- ${toPublicUrl("/api/install-options")}
- ${toPublicUrl("/api/workflows")}

## Discovery

- OpenAPI: ${toPublicUrl("/openapi.json")}
- API OpenAPI alias: ${toPublicUrl("/api/openapi.json")}
- llms.txt: ${toPublicUrl("/llms.txt")}
- llms-full.txt: ${toPublicUrl("/llms-full.txt")}
- MCP metadata: ${toPublicUrl("/server.json")}
- Well-known MCP: ${toPublicUrl("/.well-known/mcp")}

## Source

- GitHub: ${PUBLIC_LINKS.github}
- NPM: ${PUBLIC_LINKS.npm}
- GitHub Action: ${PUBLIC_LINKS.githubAction}
`;
}

export function buildMcpMarkdown(): string {
  return `
# local-ydb-toolkit MCP

## Read-only promo MCP

The hosted /mcp endpoint is a read-only promo MCP. It helps agents discover what local-ydb-toolkit is, how to install it, which workflows it supports, and where public docs live.

## Local operational MCP

Actual YDB operations stay in the local stdio MCP server installed with @astandrik/local-ydb-mcp. Mutating tools remain plan-first and require confirm: true before execution.

## Tools on hosted /mcp

- get_product_overview
- get_install_options
- list_local_ydb_workflows
- get_agent_routing_guidance
- get_public_links
`;
}

export function buildAuthMarkdown(): string {
  return `
# local-ydb-toolkit auth

Public promo read endpoints require no authentication.

The hosted promo site does not receive local-ydb credentials, SSH keys, password files, or private config paths. local YDB credentials stay local to the user's MCP client, shell, CI runner, or chosen secret store.

OAuth is not part of v1. There is no browser account flow in v1. Actual operational authorization is controlled by the user's local MCP client configuration and by the local-ydb-toolkit confirm: true execution gates.
`;
}

function discoveryLinkHeader(): string {
  return [
    `<${toPublicUrl("/llms.txt")}>; rel="describedby"; type="text/plain"`,
    `<${toPublicUrl("/openapi.json")}>; rel="service-desc"; type="application/json"`,
    `<${toPublicUrl("/mcp")}>; rel="service"; type="application/json"`,
  ].join(", ");
}
