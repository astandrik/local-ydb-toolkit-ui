import { describe, expect, it, vi } from "vitest";

import {
  buildAgentsMarkdown,
  buildApiDocsMarkdown,
  buildAuthMarkdown,
  buildBestToolsLocalYdbAiAgentsGuideMarkdown,
  buildCompareMarkdown,
  buildDiagnoseLocalYdbMcpGuideMarkdown,
  buildDevelopersMarkdown,
  buildGuidesIndexMarkdown,
  buildIndexMarkdown,
  buildLocalDatabaseDeploymentAutomationGuideMarkdown,
  buildLocalYdbMcpVsYdbMcpGuideMarkdown,
  buildLocalYdbCiGuideMarkdown,
  buildLocalYdbSqlGuideMarkdown,
  buildListingsMarkdown,
  buildLlmsFullText,
  buildLlmsText,
  buildMcpMarkdown,
  buildWebhooksMarkdown,
  buildYdbSchemaDdlMcpGuideMarkdown,
} from "@/lib/agent-markdown";
import { MCP_REGISTRY_LINKS, PUBLIC_LINKS } from "@/lib/product-data";

describe("agent-readable markdown", () => {
  it("publishes concise llms.txt discovery with canonical agent routes", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const body = buildLlmsText();

    expect(body).toContain("# local-ydb-toolkit");
    expect(body).toContain("## Product overview");
    expect(body).toContain("## Use cases");
    expect(body).toContain("[OpenAPI JSON]");
    expect(body).toContain("[llms-full.txt]");
    expect(body).toContain("/openapi.json");
    expect(body).toContain("/mcp");
    expect(body).toContain("/agents.md");
    expect(body).toContain("/docs/api");
    expect(body).toContain("/docs/webhooks");
    expect(body).toContain("/guides");
    expect(body).toContain("@astandrik/local-ydb-mcp@latest");
    expect(body).toContain("0.15.2, 39 tools");
    expect(body).toContain("confirm: true");
    expect(body).toContain("## Featured external listings");
    expect(body).not.toContain("[Enterprise DNA]");
    expect(body).toContain("[ModelScope MCP Plaza]");
    expect(body).toContain(
      "[Gilde](https://github.com/bendyline/gilde/blob/main/data/community/toolsets/as/astandrik-local-ydb-mcp/manifest.json)",
    );
    expect(body).toContain(
      "[mcpindex.ai](https://mcpindex.ai/server/io-github-astandrik-local-ydb-mcp)",
    );
    expect(body).not.toContain("[MCP Sentinel]");
    expect(body).not.toContain("[Timeahead MCPScore]");
    expect(body).toContain("Useful for:");
    expect(body).toContain("Confirmed:");
    expect(body).toContain("Limitations:");
    expect(body).toContain("Checked: 2026-08-11");
    expect(body).toContain("empty tools array");
    expect(body).toContain("not security findings");
    expect(body).toContain("Directory inclusion is not an endorsement");
    expect(body).toContain("/listings.md");
    expect(body).not.toContain("claim available");
    expect(body).not.toContain("https://timeahead.in/mcp/claim/local-ydb-mcp");

    vi.unstubAllEnvs();
  });

  it("keeps expanded LLM context explicit about the ydb/ydb-mcp split", () => {
    const body = buildLlmsFullText();

    expect(body).toContain("Use local-ydb-toolkit");
    expect(body).toContain("Use ydb/ydb-mcp");
    expect(body).toContain("local_ydb_sql");
    expect(body).toContain("plan-first");
    expect(body).toContain("remote promo MCP is read-only");
    expect(body).toContain("[Auth guide]");
    expect(body).toContain("[Guides index]");
    expect(body).toContain("## Featured external listings");
    expect(body).not.toContain("Timeahead MCPScore");
    expect(body).toContain("Directory inclusion is not an endorsement");
    expect(body).toContain("/listings.md");
    expect(body).not.toContain("https://timeahead.in/mcp/claim/local-ydb-mcp");
    expect(body).toContain("```json");
    expect(body).toContain("LOCAL_YDB_TOOLKIT_CONFIG");
    expect(body).toContain("GET /docs/api");
  });

  it("documents agent access without implying remote operational mutation", () => {
    const body = buildAgentsMarkdown();

    expect(body).toContain("## When to use local-ydb-toolkit");
    expect(body).toContain("## Agent instructions");
    expect(body).toContain("get_product_overview");
    expect(body).toContain("get_install_options");
    expect(body).toContain("list_local_ydb_workflows");
    expect(body).toContain("remote promo MCP is read-only");
    expect(body).not.toContain("remote bootstrap");
  });

  it("documents developer resources and public JSON endpoints", () => {
    const body = buildDevelopersMarkdown();

    expect(body).toContain("/api/product");
    expect(body).toContain("/api/install-options");
    expect(body).toContain("/api/workflows");
    expect(body).toContain("/openapi.json");
    expect(body).toContain("/docs/api");
    expect(body).toContain("/docs/webhooks");
    expect(body).toContain("## Featured external listings");
    expect(body).not.toContain("PolicyLayer");
    expect(body).toContain("Directory inclusion is not an endorsement");
    expect(body).toContain("/listings.md");
  });

  it("publishes every audited listing exactly once in the full markdown catalog", () => {
    const body = buildListingsMarkdown();

    expect(body).toContain("# External listings and verification notes");
    expect(body).toContain("## Identity");
    expect(body).toContain("## Installation discovery");
    expect(body).toContain("## Version metadata");
    expect(body).toContain("## Change monitoring");
    expect(body).toContain("## Independent analysis");
    expect(body.match(/^### \[/gm)).toHaveLength(26);
    for (const listing of MCP_REGISTRY_LINKS) {
      expect(body.split(`### [${listing.label}](${listing.href})`)).toHaveLength(
        2,
      );
    }
    expect(body).toContain(
      `### [MCP Conformance Census](${PUBLIC_LINKS.mcpConformance})`,
    );
    expect(body).toContain("Checked: 2026-08-12");
    expect(body).toContain("does not classify as a failure");
    expect(body).not.toContain("automated source");
    expect(body).not.toContain("unverified accuracy");
  });

  it("keeps compact discovery pages limited to the four featured listings", () => {
    const pages = [
      buildLlmsText(),
      buildLlmsFullText(),
      buildIndexMarkdown(),
      buildDevelopersMarkdown(),
    ];

    for (const body of pages) {
      for (const listing of MCP_REGISTRY_LINKS) {
        const markdownLink = `[${listing.label}](${listing.href})`;

        if (listing.featured) {
          expect(body).toContain(markdownLink);
        } else {
          expect(body).not.toContain(markdownLink);
        }
      }
      expect(body).toContain("/listings.md");
    }
  });

  it("states auth boundaries for agents", () => {
    const body = buildAuthMarkdown();

    expect(body).toContain("Public promo read endpoints require no authentication");
    expect(body).toContain("local YDB credentials stay local");
    expect(body).toContain("OAuth is not part of v1");
    expect(body).toContain("## Agent Authentication");
    expect(body).toContain("## 1. Discover");
    expect(body).toContain("## 2. Pick a method");
    expect(body).toContain("## 3. Register");
    expect(body).toContain("## 4. Claim");
    expect(body).toContain("## 5. Use credential");
    expect(body).toContain("## 6. Errors");
    expect(body).toContain("## 7. Revocation");
    expect(body).toContain("LOCAL_YDB_TOOLKIT_CONFIG");
    expect(body).toContain("configPath");
    expect(body).toContain("rootPasswordFile");
    expect(body).toContain("dynamicNodeAuthTokenFile");
  });

  it("states MCP safety boundaries", () => {
    const body = buildMcpMarkdown();

    expect(body).toContain("Read-only promo MCP");
    expect(body).toContain("Actual YDB operations stay in the local stdio MCP server");
    expect(body).toContain("confirm: true");
  });

  it("builds markdown twins for homepage and topical pages", () => {
    const pages = [
      buildIndexMarkdown(),
      buildGuidesIndexMarkdown(),
      buildCompareMarkdown(),
      buildLocalYdbMcpVsYdbMcpGuideMarkdown(),
      buildLocalYdbSqlGuideMarkdown(),
      buildDiagnoseLocalYdbMcpGuideMarkdown(),
      buildYdbSchemaDdlMcpGuideMarkdown(),
      buildBestToolsLocalYdbAiAgentsGuideMarkdown(),
      buildLocalDatabaseDeploymentAutomationGuideMarkdown(),
      buildLocalYdbCiGuideMarkdown(),
      buildApiDocsMarkdown(),
      buildWebhooksMarkdown(),
    ];

    for (const body of pages) {
      expect(body.trimStart()).toMatch(/^# /);
      expect(body).toContain("local-ydb-toolkit");
    }

    expect(buildGuidesIndexMarkdown()).toContain(
      "/guides/local-ydb-mcp-vs-ydb-mcp",
    );
    expect(buildCompareMarkdown()).toContain("Liquibase");
    expect(buildLocalYdbMcpVsYdbMcpGuideMarkdown()).toContain(
      "ydb-platform/ydb-mcp",
    );
    expect(buildLocalYdbSqlGuideMarkdown()).toContain("SnapshotRO");
    expect(buildLocalYdbSqlGuideMarkdown()).toContain("plan and AST");
    expect(buildLocalYdbSqlGuideMarkdown()).toContain("exactly one NoTx");
    expect(buildLocalYdbSqlGuideMarkdown()).toContain("maxRows");
    expect(buildLocalYdbSqlGuideMarkdown()).toContain("maxOutputBytes");
    expect(buildDiagnoseLocalYdbMcpGuideMarkdown()).toContain(
      "local_ydb_healthcheck",
    );
    expect(buildYdbSchemaDdlMcpGuideMarkdown()).toContain(
      "local_ydb_generate_schema",
    );
    expect(buildBestToolsLocalYdbAiAgentsGuideMarkdown()).toContain(
      "ghcr.io/ydb-platform/local-ydb",
    );
    expect(buildLocalDatabaseDeploymentAutomationGuideMarkdown()).toContain(
      "local database deployment automation",
    );
    expect(buildLocalYdbCiGuideMarkdown()).toContain(
      "astandrik/setup-local-ydb@v1",
    );
    expect(buildLocalYdbCiGuideMarkdown()).toContain("topology: root");
    expect(buildLocalYdbCiGuideMarkdown()).toContain("auth: true");
    expect(buildLocalYdbCiGuideMarkdown()).toContain("static-endpoint");
    expect(buildLocalYdbCiGuideMarkdown()).toContain("monitoring-url");
    expect(buildLocalYdbCiGuideMarkdown()).toContain("resolved-version");
    expect(buildLocalYdbCiGuideMarkdown()).toContain("password value");
    expect(buildApiDocsMarkdown()).toContain("GET /api/product");
    expect(buildWebhooksMarkdown()).toContain("Webhooks are not supported in v1");
  });
});
