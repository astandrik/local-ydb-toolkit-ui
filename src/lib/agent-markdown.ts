import { toPublicUrl } from "@/lib/base-path";
import { discoveryHeaders } from "@/lib/discovery-links";
import {
  AGENT_BOUNDARIES,
  GUIDE_LINKS,
  INSTALL_OPTIONS,
  LOCAL_YDB_PRODUCT,
  MCP_DIRECTORY_SNAPSHOT_WARNING,
  MCP_REGISTRY_LINKS,
  PUBLIC_LINKS,
  WORKFLOWS,
  getAgentRoutingGuidance,
} from "@/lib/product-data";

function formatDirectoryAndTrustListings(): string {
  const listings = MCP_REGISTRY_LINKS.map(
    (link) =>
      `- [${link.label}](${link.href}) - ${link.category}; ${link.status}; source: ${link.sourceType}; accuracy: ${link.accuracy}; last checked: ${link.lastChecked ?? "not recorded"}. ${link.description} Note: ${link.note}`,
  ).join("\n");

  return `${MCP_DIRECTORY_SNAPSHOT_WARNING}\n\n${listings}`;
}

export function markdownResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: discoveryHeaders("text/markdown; charset=utf-8"),
  });
}

export function plainTextResponse(body: string): Response {
  return new Response(`${body.trim()}\n`, {
    headers: discoveryHeaders("text/plain; charset=utf-8"),
  });
}

export function buildLlmsText(): string {
  return `
# ${LOCAL_YDB_PRODUCT.name}

> ${LOCAL_YDB_PRODUCT.summary}

## Product overview

local-ydb-toolkit is for AI agents and developers operating Docker-based local-ydb deployments. It provides a local stdio MCP server, a reusable Codex skill, and a GitHub Action for CI jobs that need disposable YDB.

## Use cases

- Diagnose a local-ydb stack before changing it.
- Bootstrap a root /local database or CMS tenant topology.
- Generate, validate, and apply YDB table DDL with explicit confirmation.
- Harden local YDB native auth while keeping password files local.
- List dumps, dump or restore tenant-relative paths, inspect storage placement, and upgrade local-ydb images.

## Primary install

- MCP server: \`${INSTALL_OPTIONS[0]?.command}\`
- [NPM package](${PUBLIC_LINKS.npm})
- [GitHub repository](${PUBLIC_LINKS.github})
- [Project website](${PUBLIC_LINKS.targetSite})

## Directory and trust listings

${formatDirectoryAndTrustListings()}

## Agent resources

- [Homepage markdown](${toPublicUrl("/index.md")})
- [llms-full.txt](${toPublicUrl("/llms-full.txt")})
- [Agents guide](${toPublicUrl("/agents.md")})
- [Developer resources](${toPublicUrl("/developers.md")})
- [API docs](${toPublicUrl("/docs/api")})
- [Webhooks status](${toPublicUrl("/docs/webhooks")})
- [MCP guide](${toPublicUrl("/mcp.md")})
- [Auth guide](${toPublicUrl("/auth.md")})
- [Guides index](${toPublicUrl("/guides")})
- [OpenAPI JSON](${toPublicUrl("/openapi.json")})
- [Product JSON](${toPublicUrl("/api/product")})
- [Install options JSON](${toPublicUrl("/api/install-options")})
- [Workflows JSON](${toPublicUrl("/api/workflows")})
- [Read-only promo MCP](${toPublicUrl("/mcp")})

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

## Links

- [Homepage markdown](${toPublicUrl("/index.md")})
- [Agents guide](${toPublicUrl("/agents.md")})
- [Developer resources](${toPublicUrl("/developers.md")})
- [API docs](${toPublicUrl("/docs/api")})
- [Auth guide](${toPublicUrl("/auth.md")})
- [MCP guide](${toPublicUrl("/mcp.md")})
- [Comparison guide](${toPublicUrl("/compare")})
- [Guides index](${toPublicUrl("/guides")})
- [OpenAPI JSON](${toPublicUrl("/openapi.json")})
- [A2A Agent Card](${toPublicUrl("/.well-known/agent-card.json")})

## Directory and trust listings

${formatDirectoryAndTrustListings()}

## Install options

${installLines}

### MCP client example

\`\`\`json
${INSTALL_OPTIONS[0]?.configSnippet}
\`\`\`

### GitHub Actions example

\`\`\`yaml
${INSTALL_OPTIONS[2]?.configSnippet}
\`\`\`

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

## Authentication

Public docs, JSON endpoints, OpenAPI, and the hosted promo MCP do not require authentication. Local operations use the user's MCP client configuration. Set \`LOCAL_YDB_TOOLKIT_CONFIG\` to a local \`local-ydb.config.json\`, or pass a per-tool \`configPath\` where supported. Auth-enabled profiles may reference \`rootPasswordFile\`, \`authConfigPath\`, and \`dynamicNodeAuthTokenFile\`; those files stay on the user's local or SSH target host.

OAuth and browser account flows are not part of v1.

## Public API

- GET /api/product
- GET /api/install-options
- GET /api/workflows
- GET /docs/api
- GET /docs/webhooks
- GET /openapi.json
- POST /mcp
- GET /.well-known/mcp
- GET /.well-known/agent-card.json
- GET /server.json
`;
}

export function buildAgentsMarkdown(): string {
  return `
# local-ydb-toolkit Agent Access

Connect agents to local-ydb-toolkit through machine-readable docs, public JSON, and the read-only promo MCP.

## When to use local-ydb-toolkit

Use local-ydb-toolkit when the user asks an agent to operate a Docker-based local-ydb target: diagnostics, bootstrap, schema DDL, auth hardening, storage changes, dump listing, path-level dump/restore, or version upgrades.

Do not use local-ydb-toolkit for general SQL exploration against an already running YDB endpoint. Use ydb/ydb-mcp for database-level query and path inspection work.

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

## Agent instructions

- Start with [llms.txt](${toPublicUrl("/llms.txt")}) or [llms-full.txt](${toPublicUrl("/llms-full.txt")}) when evaluating the product.
- Fetch [OpenAPI JSON](${toPublicUrl("/openapi.json")}) before calling public HTTP endpoints.
- Treat the hosted [promo MCP](${toPublicUrl("/mcp")}) as discovery-only.
- For actual operations, configure the local stdio MCP server with \`LOCAL_YDB_TOOLKIT_CONFIG\`.
- Never send local YDB passwords, SSH keys, private config paths, or password files to the hosted promo site.
- For mutating local tools, return the plan first and execute only after \`confirm: true\` is supplied by an approved user workflow.

## Routing

${getAgentRoutingGuidance()}
`;
}

export function buildDevelopersMarkdown(): string {
  return `
# local-ydb-toolkit Developer Resources

Developer resources for local-ydb-toolkit are intentionally public and predictable so agents can find API docs, auth docs, MCP metadata, and integration guides by product name.

## JSON endpoints

- [Product JSON](${toPublicUrl("/api/product")})
- [Install options JSON](${toPublicUrl("/api/install-options")})
- [Workflows JSON](${toPublicUrl("/api/workflows")})

## Discovery

- [API docs](${toPublicUrl("/docs/api")})
- [Webhooks status](${toPublicUrl("/docs/webhooks")})
- [OpenAPI](${toPublicUrl("/openapi.json")})
- [API OpenAPI alias](${toPublicUrl("/api/openapi.json")})
- [llms.txt](${toPublicUrl("/llms.txt")})
- [llms-full.txt](${toPublicUrl("/llms-full.txt")})
- [MCP metadata](${toPublicUrl("/server.json")})
- [Well-known MCP](${toPublicUrl("/.well-known/mcp")})
- [A2A Agent Card](${toPublicUrl("/.well-known/agent-card.json")})

## Source

- [GitHub](${PUBLIC_LINKS.github})
- [NPM](${PUBLIC_LINKS.npm})
- [GitHub Action](${PUBLIC_LINKS.githubAction})
- [Project website](${PUBLIC_LINKS.targetSite})

## Directory and trust listings

${formatDirectoryAndTrustListings()}
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

OAuth is not part of v1. There is no browser account flow in v1. Agents use local MCP configuration; OAuth agentic registration is not supported in v1.

## Agent Authentication

Agents use local MCP configuration. Set local credentials or config files in the MCP client environment; OAuth agentic registration is not supported in v1. Required credential locations are local file paths such as \`LOCAL_YDB_TOOLKIT_CONFIG\`, \`rootPasswordFile\`, \`authConfigPath\`, and \`dynamicNodeAuthTokenFile\`. Credential lifecycle is local: create, rotate, move, or delete those files on the user's machine, CI runner, or SSH target.

## 1. Discover

Read [llms.txt](${toPublicUrl("/llms.txt")}), [mcp.md](${toPublicUrl("/mcp.md")}), and [OpenAPI JSON](${toPublicUrl("/openapi.json")}) to discover public docs and the hosted read-only promo MCP. Public promo read endpoints require no authentication.

## 2. Pick a method

Pick one of two v1 methods:

- Public discovery: call docs, JSON endpoints, OpenAPI, and the hosted promo MCP with no credential.
- Local operations: run the local stdio MCP server through an MCP client where Docker, SSH profiles, and local-ydb credentials are available.

## 3. Register

There is no hosted account registration, OAuth dynamic client registration, PRM metadata chain, or browser authorization flow in v1. To register the local operational server with an MCP client, add a local server entry that runs \`${INSTALL_OPTIONS[0]?.command}\`.

\`\`\`json
${INSTALL_OPTIONS[0]?.configSnippet}
\`\`\`

## 4. Claim

The MCP client claims access by supplying local configuration only. Set \`LOCAL_YDB_TOOLKIT_CONFIG\` to a \`local-ydb.config.json\` file, or pass \`configPath\` to profile-based tools that support per-call config loading.

Auth-enabled profiles can reference these local file paths:

- \`rootPasswordFile\`: root password file for authenticated YDB CLI and viewer checks.
- \`authConfigPath\`: reviewed hardened YDB config written on the target host.
- \`dynamicNodeAuthTokenFile\`: dynamic node auth token file for hardened tenant topologies.

## 5. Use credential

Use credentials only from the local MCP process, local shell, CI runner, or SSH target. Do not paste password values into prompts. Mutating tools remain plan-first and require \`confirm: true\`; a missing \`confirm: true\` returns the planned command, rollback, and verification instead of executing changes.

## 6. Errors

- Missing \`LOCAL_YDB_TOOLKIT_CONFIG\`: the local MCP server falls back to \`local-ydb.config.json\` in the current working directory.
- Unknown profile: choose a configured profile name or update the local config file.
- Missing password file: create or rotate the local \`rootPasswordFile\`, then rerun the tool.
- OAuth metadata 404: expected in v1 because OAuth and agent-auth registration are intentionally deferred.

## 7. Revocation

Revoke local access by removing the MCP client server entry, deleting or moving the local config file, deleting obsolete \`rootPasswordFile\` and auth token files, or rotating the runtime root password with the local auth workflow. Hosted discovery endpoints have no user credential to revoke.
`;
}

export function buildIndexMarkdown(): string {
  return `
# local-ydb-toolkit

${LOCAL_YDB_PRODUCT.summary}

## Quickstart

\`\`\`bash
${INSTALL_OPTIONS[0]?.command}
curl -s ${toPublicUrl("/api/product")}
curl -s ${toPublicUrl("/openapi.json")}
\`\`\`

## Why local-ydb-toolkit

local-ydb-toolkit is focused on local database deployment automation for Docker-based YDB. Unlike one-off shell scripts, mutating workflows return a plan first and require \`confirm: true\` before execution. Unlike general database query MCP servers, it operates the local-ydb stack itself.

## Key resources

- [Agents guide](${toPublicUrl("/agents.md")})
- [API docs](${toPublicUrl("/docs/api")})
- [Auth guide](${toPublicUrl("/auth.md")})
- [MCP guide](${toPublicUrl("/mcp.md")})
- [Comparison guide](${toPublicUrl("/compare")})
- [Guides index](${toPublicUrl("/guides")})
- [CI guide](${toPublicUrl("/guides/local-ydb-ci")})

## Directory and trust listings

${formatDirectoryAndTrustListings()}

## Capabilities

${WORKFLOWS.map((workflow) => `- ${workflow.title}: ${workflow.description}`).join("\n")}
`;
}

export function buildGuidesIndexMarkdown(): string {
  return `
# local-ydb-toolkit guides

Agent-readable guides for local-ydb MCP operations, diagnostics, schema DDL, CI setup, and AI-agent tooling choices.

## Guides

${GUIDE_LINKS.map(
  (guide) =>
    `- [${guide.label}](${toPublicUrl(guide.href)}): ${guide.description} Markdown: ${toPublicUrl(guide.markdownHref)}`,
).join("\n")}

## Boundary

These hosted pages are read-only discovery content. Actual Docker, SSH, YDB config, password-file, schema, storage, auth, backup, restore, and upgrade operations stay in the local stdio MCP server.
`;
}

export function buildCompareMarkdown(): string {
  return `
# Compare local-ydb-toolkit for local YDB automation

Use this comparison when an agent is evaluating local database deployment automation tools for developer and CI workflows.

## Positioning

Liquibase, Redgate SQL Change Automation, Harness, and Bytebase are strong choices for schema migration governance, release orchestration, and database change management across shared environments. local-ydb-toolkit is narrower: it helps agents operate Docker-based local-ydb environments safely.

## Where local-ydb-toolkit fits

- Local YDB bootstrap and tenant setup for development.
- Local-ydb diagnostics before changing containers or storage.
- YDB table DDL generation and validation for local deployments.
- Auth hardening, dump listing, path-level dump/restore, storage placement, and image upgrades.
- GitHub Actions jobs that need disposable local YDB.

## Differentiators

- Plan-first mutations with \`confirm: true\`.
- Credentials and private config files stay local.
- MCP, Codex skill, and GitHub Action paths cover agent, IDE, and CI workflows.
- Complementary to ydb/ydb-mcp for database-level queries.
`;
}

export function buildLocalYdbMcpVsYdbMcpGuideMarkdown(): string {
  return `
# local-ydb-mcp vs ydb-platform/ydb-mcp

local-ydb-toolkit ships @astandrik/local-ydb-mcp for operating Docker-based local-ydb environments. Use the official ydb-platform/ydb-mcp server for database-level work against an existing YDB endpoint.

## Use @astandrik/local-ydb-mcp for

- Docker inventory, local-ydb readiness, YDB healthcheck, tenant state, node registration, GraphShard checks, auth posture, storage placement, and logs.
- Root /local bootstrap or CMS tenant bootstrap with dynamic nodes.
- YDB table DDL generation, validation, plan-only application, and confirmed application.
- Auth hardening, dump listing, path-level dump/restore, storage group workflows, cleanup, and version upgrades.

## Use ydb-platform/ydb-mcp for

- Ad hoc SQL and query explanation against an already running YDB endpoint.
- Database-level directory listing, path inspection, and query-oriented exploration.
- General YDB interaction that does not need Docker local-ydb lifecycle control.

## Safety model

@astandrik/local-ydb-mcp is plan-first: mutating tools return planned commands, risk, rollback, and verification unless the caller supplies \`confirm: true\`. That matters when an agent can touch containers, volumes, auth files, storage pools, and dumps.
`;
}

export function buildDiagnoseLocalYdbMcpGuideMarkdown(): string {
  return `
# Diagnose local-ydb with MCP tools

local-ydb-toolkit diagnostics start broad and read-only, then route by YDB healthcheck issue type. Do not repair a local-ydb stack before collecting current evidence.

## Recommended order

1. Run \`local_ydb_check_prerequisites\` on a new host or profile.
2. Run \`local_ydb_status_report\` to capture Docker, tenant, node, auth, and health context.
3. Run \`local_ydb_healthcheck\` when a fresh YDB self-check signal is needed.
4. Route by issue type rather than trying repair commands immediately.

## Route by symptom

- STORAGE: run \`local_ydb_storage_placement\`, then inspect static and dynamic logs.
- COMPUTE, COMPUTE_POOL, tablet, or node issues: run \`local_ydb_nodes_check\`, \`local_ydb_tenant_check\`, and dynamic container logs.
- DATABASE or SCHEME symptoms: run \`local_ydb_database_status\` and \`local_ydb_scheme\`.
- Auth symptoms: run \`local_ydb_auth_check\`.

## Prompt support

The MCP server includes \`local_ydb_diagnose_stack\` and \`local_ydb_diagnose_database\` prompts. They instruct the client to inspect current state, summarize observed evidence, and avoid automatic repair.
`;
}

export function buildYdbSchemaDdlMcpGuideMarkdown(): string {
  return `
# Generate and apply YDB table schema DDL safely

local-ydb-toolkit keeps YDB schema DDL work plan-first. \`local_ydb_generate_schema\` is read-only. \`local_ydb_apply_schema\` validates first and applies only when \`action\` is \`apply\` and \`confirm: true\` is supplied.

## Safe schema workflow

1. Inspect the target tenant with \`local_ydb_status_report\` and \`local_ydb_scheme\`.
2. Call \`local_ydb_generate_schema\` with a strict JSON table spec and \`validate: true\`.
3. Review generated DDL, script SHA-256, warnings, risk, and SDK validation status.
4. Call \`local_ydb_apply_schema\` with \`action: validate\`.
5. Call \`local_ydb_apply_schema\` with \`action: apply\` and \`confirm: false\` to return the plan.
6. Execute only after approval with the exact same apply call plus \`confirm: true\`.
7. Verify with \`local_ydb_scheme\` using \`action: describe\`.

## Example generator spec

\`\`\`json
{
  "validate": true,
  "statements": [
    {
      "kind": "createTable",
      "tableName": "schema_apply_smoke",
      "columns": [
        { "name": "id", "type": "Uint64", "notNull": true },
        { "name": "value", "type": "Utf8" }
      ],
      "primaryKey": ["id"],
      "indexes": [
        {
          "name": "schema_apply_smoke_by_value",
          "columns": ["value"],
          "global": true
        }
      ]
    }
  ]
}
\`\`\`

## Important constraints

- Use \`notNull\` only for primary key columns in generated CREATE TABLE specs.
- Use the top-level \`store\` field instead of \`with.STORE\`.
- Keep secondary and vector indexes on row-oriented tables.
- Do not add an index on a column added or dropped in the same ALTER TABLE spec.
- Prefer adding vector indexes after representative data is loaded.
`;
}

export function buildBestToolsLocalYdbAiAgentsGuideMarkdown(): string {
  return `
# Best tools for local YDB AI-agent workflows

local-ydb-toolkit fits one part of the local YDB toolchain. Use the smallest tool that matches the job because local YDB lifecycle, database queries, CI provisioning, and human CLI work are different workflows.

## Recommended tools

- @astandrik/local-ydb-mcp: AI-agent operation of Docker local-ydb stacks, including diagnostics, bootstrap, schema DDL, auth, storage, dump listing, path-level backup/restore, and upgrades.
- ydb-platform/ydb-mcp: database-level YDB interaction such as SQL, query help, directory listing, and path inspection.
- astandrik/setup-local-ydb: disposable local YDB tenants in GitHub Actions CI.
- YDB CLI: direct command-line access for humans and scripted checks.
- ghcr.io/ydb-platform/local-ydb: the upstream Docker image used to run local YDB.
- skills/local-ydb: Codex operational rules for local-ydb topology, auth, storage, verification, and safe runbooks.

## Best default stack

For AI coding agents working on a repository that needs local YDB, combine the upstream local-ydb Docker image, @astandrik/local-ydb-mcp for operational tooling, and astandrik/setup-local-ydb for CI. Add the official ydb-platform/ydb-mcp when the agent also needs query-level database interaction.

## Why plan-first matters

Local database operations can touch containers, volumes, auth files, storage pools, and dumps. A plan-first MCP server lets agents inspect and explain the exact command plan before executing any mutation.
`;
}

export function buildLocalDatabaseDeploymentAutomationGuideMarkdown(): string {
  return `
# Local database deployment automation with local-ydb-toolkit

local database deployment automation for YDB is different from generic schema migration tooling: the agent often needs to create or repair the local database process before it can run schema work.

## Workflow

1. Run \`local_ydb_check_prerequisites\` to verify Docker and host helpers.
2. Run \`local_ydb_status_report\` and \`local_ydb_healthcheck\` to capture state.
3. Bootstrap either a root /local database or a tenant topology depending on the task.
4. Generate and validate schema DDL before applying it.
5. Execute mutating steps only after the user approves \`confirm: true\`.

## Agent guardrails

- Do not invent profile names, hosts, tenant paths, password files, or backup locations.
- Keep private paths and credentials inside the user's local MCP process or CI runner.
- Prefer read-only diagnostics before any bootstrap, auth, storage, or upgrade step.
`;
}

export function buildLocalYdbCiGuideMarkdown(): string {
  return `
# Run local YDB in CI with local-ydb-toolkit

Use \`astandrik/setup-local-ydb@v1\` when a GitHub Actions workflow needs a disposable local YDB tenant for integration tests.

## Example

\`\`\`yaml
${INSTALL_OPTIONS[2]?.configSnippet}

- run: |
    echo "$LOCAL_YDB_ENDPOINT"
    echo "$LOCAL_YDB_DATABASE"
\`\`\`

## When to use it

- Test code that expects a real YDB endpoint.
- Run schema smoke tests against an isolated tenant.
- Validate auth-enabled behavior without reusing developer credentials.
`;
}

export function buildApiDocsMarkdown(): string {
  return `
# local-ydb-toolkit API docs

The public HTTP API is read-only and exists for product discovery, agent routing, and documentation. It does not expose remote local-ydb mutations.

## Endpoints

- GET /api/product
- GET /api/install-options
- GET /api/workflows
- GET /openapi.json
- GET /api/openapi.json
- GET /server.json
- GET /.well-known/mcp
- GET /.well-known/mcp/server-card.json
- GET /.well-known/agent-card.json
- POST /mcp

## Example

\`\`\`bash
curl -s ${toPublicUrl("/api/product")}
curl -s ${toPublicUrl("/openapi.json")}
\`\`\`

## Auth

Public docs and product APIs do not require authentication. Local operational credentials are configured only in the local stdio MCP server.
`;
}

export function buildWebhooksMarkdown(): string {
  return `
# local-ydb-toolkit webhooks

Webhooks are not supported in v1.

The hosted site is a read-only discovery surface, and the operational MCP server runs locally through stdio. Because there is no hosted account system, no OAuth flow, and no remote job execution, there is no webhook callback channel to configure.

## Agent guidance

- Use [API docs](${toPublicUrl("/docs/api")}) for read-only public endpoints.
- Use [auth.md](${toPublicUrl("/auth.md")}) for local credential handling.
- Use the local stdio MCP server for operations that need Docker, SSH, password files, or YDB config.
`;
}
