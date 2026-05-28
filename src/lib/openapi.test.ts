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
    expect(spec.servers).toEqual([
      { url: "https://local-ydb-toolkit.ydb-qdrant.tech" },
    ]);
    expect(spec.paths).toHaveProperty("/api/product");
    expect(spec.paths).toHaveProperty("/api/install-options");
    expect(spec.paths).toHaveProperty("/api/workflows");
    expect(spec.paths).toHaveProperty("/mcp");
    expect(spec.info.description).toContain("read-only promo MCP");

    vi.unstubAllEnvs();
  });
});
