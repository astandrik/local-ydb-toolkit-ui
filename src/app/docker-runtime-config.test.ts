import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Docker runtime Next config", () => {
  it("keeps next.config.ts independent from src imports copied out of the runner image", () => {
    const nextConfig = readFileSync("next.config.ts", "utf8");

    expect(nextConfig).not.toContain('from "./src/');
    expect(nextConfig).not.toContain("from './src/");
  });
});
