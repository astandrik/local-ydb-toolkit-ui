import type { MetadataRoute } from "next";
import { describe, expect, it, vi } from "vitest";

describe("agent discovery routes", () => {
  it.each([
    {
      modulePath: "@/app/llms.txt/route",
      contentType: "text/plain; charset=utf-8",
      expected: ["# local-ydb-toolkit", "/openapi.json", "/mcp"],
    },
    {
      modulePath: "@/app/llms-full.txt/route",
      contentType: "text/plain; charset=utf-8",
      expected: ["Use local-ydb-toolkit", "Use ydb/ydb-mcp"],
    },
    {
      modulePath: "@/app/agents.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["get_product_overview", "remote promo MCP is read-only"],
    },
    {
      modulePath: "@/app/developers.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["/api/product", "/openapi.json"],
    },
    {
      modulePath: "@/app/listings.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: [
        "# External listings and verification notes",
        "## Independent analysis",
        "### [Awesome MCP Servers]",
        "### [MCP Conformance Census]",
      ],
    },
    {
      modulePath: "@/app/mcp.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["Read-only promo MCP", "confirm: true"],
    },
    {
      modulePath: "@/app/auth.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["local YDB credentials stay local", "LOCAL_YDB_TOOLKIT_CONFIG"],
    },
    {
      modulePath: "@/app/index.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["# local-ydb-toolkit", "Quickstart"],
    },
    {
      modulePath: "@/app/compare.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["# Compare local-ydb-toolkit", "Liquibase"],
    },
    {
      modulePath: "@/app/guides/index.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["# local-ydb-toolkit guides", "/guides/ydb-schema-ddl-mcp"],
    },
    {
      modulePath: "@/app/guides/local-ydb-mcp-vs-ydb-mcp.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["local-ydb-mcp vs ydb-platform/ydb-mcp", "confirm: true"],
    },
    {
      modulePath: "@/app/guides/diagnose-local-ydb-mcp.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["Diagnose local-ydb", "local_ydb_healthcheck"],
    },
    {
      modulePath: "@/app/guides/local-ydb-sql.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["managed SQL against local YDB", "SnapshotRO", "NoTx"],
    },
    {
      modulePath: "@/app/guides/ydb-schema-ddl-mcp.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["YDB table schema DDL", "local_ydb_generate_schema"],
    },
    {
      modulePath: "@/app/guides/best-tools-local-ydb-ai-agents.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["Best tools for local YDB", "ghcr.io/ydb-platform/local-ydb"],
    },
    {
      modulePath:
        "@/app/guides/local-database-deployment-automation.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["local database deployment automation", "confirm: true"],
    },
    {
      modulePath: "@/app/guides/local-ydb-ci.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["local YDB in CI", "astandrik/setup-local-ydb@v1"],
    },
    {
      modulePath: "@/app/docs/api.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["# local-ydb-toolkit API docs", "GET /api/product"],
    },
    {
      modulePath: "@/app/docs/webhooks.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["# local-ydb-toolkit webhooks", "not supported in v1"],
    },
  ])("serves $modulePath", async ({ modulePath, contentType, expected }) => {
    vi.resetModules();
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const { GET } = await import(modulePath);
    const response = GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(contentType);
    expect(response.headers.get("Link")).toContain("/index.md");
    for (const text of expected) {
      expect(body).toContain(text);
    }

    vi.unstubAllEnvs();
  });

  it("serves OpenAPI from the canonical and API-prefixed routes", async () => {
    vi.resetModules();
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const { GET: getCanonical } = await import("@/app/openapi.json/route");
    const { GET: getAlias } = await import("@/app/api/openapi.json/route");

    await expect(getAlias().json()).resolves.toEqual(
      await getCanonical().json(),
    );

    vi.unstubAllEnvs();
  });

  it("serves static product JSON endpoints", async () => {
    const routeModules = [
      "@/app/api/product/route",
      "@/app/api/install-options/route",
      "@/app/api/workflows/route",
      "@/app/server.json/route",
      "@/app/.well-known/mcp/server.json/route",
      "@/app/.well-known/mcp/server-card.json/route",
      "@/app/.well-known/agent-card.json/route",
    ];

    for (const modulePath of routeModules) {
      vi.resetModules();
      const { GET } = await import(modulePath);
      const response = GET();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(response.headers.get("Link")).toContain("/openapi.json");
      expect(body).toBeTruthy();
    }
  });

  it("serves an A2A agent card from the well-known route", async () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const { GET } = await import("@/app/.well-known/agent-card.json/route");
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("application/json");
    expect(body.name).toBe("local-ydb-toolkit Promo Agent");
    expect(body.skills).toHaveLength(3);
    expect(JSON.stringify(body)).toContain("/mcp");

    vi.unstubAllEnvs();
  });

  it("publishes the repository Agent Plugin as the fourth compatible install option", async () => {
    const { GET } = await import("@/app/api/install-options/route");
    const response = GET();
    const body = (await response.json()) as {
      installOptions: Array<{ id: string; command: string }>;
    };

    expect(body.installOptions.map((option) => option.id)).toEqual([
      "mcp-npx",
      "codex-skill",
      "github-action",
      "codex-plugin",
    ]);
    expect(body.installOptions.at(-1)?.command).toBe(
      "codex plugin marketplace add astandrik/local-ydb-toolkit --ref main\n" +
        "codex plugin add local-ydb-toolkit@local-ydb-toolkit",
    );
    expect(JSON.stringify(body)).not.toContain(
      "available in the public OpenAI marketplace",
    );
  });

  it("includes local-ydb project links in the product endpoint", async () => {
    const { GET } = await import("@/app/api/product/route");
    const response = GET();
    const body = await response.json();

    expect(body.toolkitRelease).toEqual({
      package: "@astandrik/local-ydb-mcp",
      version: "0.18.0",
      toolCount: 39,
      checkedAt: "2026-08-21",
    });
    expect(body.links.security).toBe(
      "https://github.com/astandrik/local-ydb-toolkit/security/policy",
    );

    expect(body.guideLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: "/guides/ydb-schema-ddl-mcp",
          markdownHref: "/guides/ydb-schema-ddl-mcp.md",
        }),
        expect.objectContaining({
          href: "/guides/local-ydb-sql",
          markdownHref: "/guides/local-ydb-sql.md",
        }),
      ]),
    );
    expect(body.projectsUsingLocalYdb).toEqual([
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
    ]);
    expect(body.mcpRegistryLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Enterprise DNA",
          accuracy: "stale",
          purpose: "version-metadata",
          lastChecked: "2026-08-21",
        }),
        expect.objectContaining({
          label: "Timeahead MCPScore",
          sourceType: "automated",
          accuracy: "unverified",
          limitations: expect.any(Array),
        }),
        expect.objectContaining({
          id: "mcp-conformance",
          label: "MCP Conformance Census",
          accuracy: "stale",
          purpose: "independent-analysis",
          lastChecked: "2026-08-21",
          featured: false,
          includeInSameAs: false,
        }),
      ]),
    );
    expect(body.mcpRegistryLinks).toHaveLength(26);
    expect(
      body.mcpRegistryLinks.filter((link: { featured: boolean }) => link.featured),
    ).toHaveLength(3);
    expect(body.mcpDirectorySnapshotWarning).toContain(
      "not security attestations",
    );
    expect(body.mcpListingContext).toContain(
      "dated external observations",
    );
  });
});

describe("robots and sitemap", () => {
  it("allows public agent resources and disallows private operational paths", async () => {
    const { default: robots } = await import("@/app/robots");
    const result = robots();
    const firstRule = Array.isArray(result.rules)
      ? result.rules[0]
      : result.rules;

    expect(firstRule?.allow).toContain("/llms.txt");
    expect(firstRule?.allow).toContain("/index.md");
    expect(firstRule?.allow).toContain("/guides");
    expect(firstRule?.allow).toContain("/guides/index.md");
    expect(firstRule?.allow).toContain("/listings");
    expect(firstRule?.allow).toContain("/listings.md");
    expect(firstRule?.allow).toContain("/privacy");
    expect(firstRule?.allow).toContain("/terms");
    expect(firstRule?.allow).toContain("/mcp");
    expect(firstRule?.allow).toContain("/.well-known/mcp");
    expect(firstRule?.allow).toContain("/.well-known/agent-card.json");
    expect(firstRule?.disallow).toContain("/api/private");

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    expect(rules).toContainEqual(
      expect.objectContaining({
        userAgent: "ChatGPT-User",
        allow: expect.arrayContaining(["/"]),
      }),
    );
    expect(rules).toContainEqual(
      expect.objectContaining({
        userAgent: "CCBot",
        disallow: expect.arrayContaining(["/"]),
      }),
    );
    expect(rules).toContainEqual(
      expect.objectContaining({
        userAgent: "ByteSpider",
        disallow: expect.arrayContaining(["/"]),
      }),
    );
  });

  it("lists canonical promo and agent-readable routes", async () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const { default: sitemap } = await import("@/app/sitemap");
    const entries = sitemap() as MetadataRoute.Sitemap;
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/");
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/llms.txt",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/openapi.json",
    );
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/mcp");
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/index.md");
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/compare");
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/privacy");
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/terms");
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/compare.md",
    );
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/guides");
    expect(urls).toContain("https://local-ydb-toolkit.ydb-qdrant.tech/listings");
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/listings.md",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/guides/index.md",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/guides/local-ydb-mcp-vs-ydb-mcp",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/guides/ydb-schema-ddl-mcp.md",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/guides/local-ydb-sql",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/guides/local-ydb-sql.md",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/docs/api",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/docs/webhooks",
    );
    expect(urls).toContain(
      "https://local-ydb-toolkit.ydb-qdrant.tech/.well-known/agent-card.json",
    );

    vi.unstubAllEnvs();
  });
});
