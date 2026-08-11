import { describe, expect, it, vi } from "vitest";

import { buildOpenApiSpec } from "@/lib/openapi";

describe("OpenAPI spec", () => {
  it("documents the static public and agent-facing contract", () => {
    vi.stubEnv(
      "NEXT_PUBLIC_APP_URL",
      "https://local-ydb-toolkit.ydb-qdrant.tech",
    );

    const spec = buildOpenApiSpec();

    expect(spec.openapi).toBe("3.1.0");
    expect(spec.info.title).toBe("local-ydb-toolkit API");
    expect(spec.info.version).toBe("1.1.0");
    expect(spec.servers).toEqual([
      { url: "https://local-ydb-toolkit.ydb-qdrant.tech" },
    ]);
    expect(spec.paths).toHaveProperty("/api/product");
    expect(spec.paths).toHaveProperty("/api/install-options");
    expect(spec.paths).toHaveProperty("/api/workflows");
    expect(spec.paths).toHaveProperty("/mcp");
    expect(spec.paths).toHaveProperty("/index.md");
    expect(spec.paths).toHaveProperty("/compare");
    expect(spec.paths).toHaveProperty("/compare.md");
    expect(spec.paths).toHaveProperty("/listings");
    expect(spec.paths).toHaveProperty("/listings.md");
    expect(spec.paths).toHaveProperty("/guides");
    expect(spec.paths).toHaveProperty("/guides/index.md");
    expect(spec.paths).toHaveProperty("/guides/local-ydb-mcp-vs-ydb-mcp");
    expect(spec.paths).toHaveProperty("/guides/local-ydb-mcp-vs-ydb-mcp.md");
    expect(spec.paths).toHaveProperty("/guides/diagnose-local-ydb-mcp");
    expect(spec.paths).toHaveProperty("/guides/diagnose-local-ydb-mcp.md");
    expect(spec.paths).toHaveProperty("/guides/local-ydb-sql");
    expect(spec.paths).toHaveProperty("/guides/local-ydb-sql.md");
    expect(spec.paths).toHaveProperty("/guides/ydb-schema-ddl-mcp");
    expect(spec.paths).toHaveProperty("/guides/ydb-schema-ddl-mcp.md");
    expect(spec.paths).toHaveProperty(
      "/guides/best-tools-local-ydb-ai-agents",
    );
    expect(spec.paths).toHaveProperty(
      "/guides/best-tools-local-ydb-ai-agents.md",
    );
    expect(spec.paths).toHaveProperty("/guides/local-database-deployment-automation");
    expect(spec.paths).toHaveProperty("/guides/local-ydb-ci");
    expect(spec.paths).toHaveProperty("/docs/api");
    expect(spec.paths).toHaveProperty("/docs/api.md");
    expect(spec.paths).toHaveProperty("/docs/webhooks");
    expect(spec.paths).toHaveProperty("/docs/webhooks.md");
    expect(spec.paths).toHaveProperty("/.well-known/agent-card.json");
    expect(spec.info.description).toContain("read-only promo MCP");
    expect(spec.components.schemas.Product.required).toContain(
      "toolkitRelease",
    );
    expect(spec.components.schemas.Product.required).toEqual(
      expect.arrayContaining([
        "mcpDirectorySnapshotWarning",
        "mcpListingContext",
        "mcpRegistryLinks",
      ]),
    );
    expect(spec.components.schemas.ExternalListing.required).toEqual(
      expect.arrayContaining([
        "category",
        "sourceType",
        "accuracy",
        "status",
        "note",
        "purpose",
        "userValue",
        "confirmedClaims",
        "limitations",
        "featured",
        "includeInSameAs",
      ]),
    );
    expect(
      spec.components.schemas.ExternalListing.properties.purpose.enum,
    ).toEqual([
      "identity",
      "installation-discovery",
      "version-metadata",
      "change-monitoring",
      "independent-analysis",
    ]);
    expect(spec.components.schemas.Workflows.properties.workflows.items.properties.id.enum).toContain(
      "dynamic-nodes",
    );

    vi.unstubAllEnvs();
  });
});
