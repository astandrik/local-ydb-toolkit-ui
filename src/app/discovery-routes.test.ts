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
      modulePath: "@/app/mcp.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["Read-only promo MCP", "confirm: true"],
    },
    {
      modulePath: "@/app/auth.md/route",
      contentType: "text/markdown; charset=utf-8",
      expected: ["local YDB credentials stay local", "OAuth is not part of v1"],
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
    ];

    for (const modulePath of routeModules) {
      vi.resetModules();
      const { GET } = await import(modulePath);
      const response = GET();
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toBeTruthy();
    }
  });

  it("includes local-ydb project links in the product endpoint", async () => {
    const { GET } = await import("@/app/api/product/route");
    const response = GET();
    const body = await response.json();

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
    expect(firstRule?.allow).toContain("/mcp");
    expect(firstRule?.allow).toContain("/.well-known/mcp");
    expect(firstRule?.disallow).toContain("/api/private");
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

    vi.unstubAllEnvs();
  });
});
