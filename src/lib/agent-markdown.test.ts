import { describe, expect, it, vi } from "vitest";

import {
  buildAgentsMarkdown,
  buildAuthMarkdown,
  buildDevelopersMarkdown,
  buildLlmsFullText,
  buildLlmsText,
  buildMcpMarkdown,
} from "@/lib/agent-markdown";

describe("agent-readable markdown", () => {
  it("publishes concise llms.txt discovery with canonical agent routes", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const body = buildLlmsText();

    expect(body).toContain("# local-ydb-toolkit");
    expect(body).toContain("/openapi.json");
    expect(body).toContain("/mcp");
    expect(body).toContain("/agents.md");
    expect(body).toContain("@astandrik/local-ydb-mcp@latest");
    expect(body).toContain("confirm: true");

    vi.unstubAllEnvs();
  });

  it("keeps expanded LLM context explicit about the ydb/ydb-mcp split", () => {
    const body = buildLlmsFullText();

    expect(body).toContain("Use local-ydb-toolkit");
    expect(body).toContain("Use ydb/ydb-mcp");
    expect(body).toContain("plan-first");
    expect(body).toContain("remote promo MCP is read-only");
  });

  it("documents agent access without implying remote operational mutation", () => {
    const body = buildAgentsMarkdown();

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
  });

  it("states auth boundaries for agents", () => {
    const body = buildAuthMarkdown();

    expect(body).toContain("Public promo read endpoints require no authentication");
    expect(body).toContain("local YDB credentials stay local");
    expect(body).toContain("OAuth is not part of v1");
  });

  it("states MCP safety boundaries", () => {
    const body = buildMcpMarkdown();

    expect(body).toContain("Read-only promo MCP");
    expect(body).toContain("Actual YDB operations stay in the local stdio MCP server");
    expect(body).toContain("confirm: true");
  });
});
