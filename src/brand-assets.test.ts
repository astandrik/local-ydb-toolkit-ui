import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("brand assets", () => {
  it("uses the official YDB wordmark geometry", () => {
    const svg = readFileSync(
      join(process.cwd(), "public/assets/ydb-icon.svg"),
      "utf8",
    );

    expect(svg).toContain('width="104" height="32" viewBox="0 0 104 32"');
    expect(svg).toContain("0.68396 4.36825");
    expect(svg).toContain("94.9475 5.7543");
    expect(svg).not.toContain('<rect width="104" height="32" rx="6"');
  });
});
