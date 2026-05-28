import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Root layout analytics", () => {
  it("mounts the Yandex Metrika component", () => {
    const source = readFileSync(new URL("layout.tsx", import.meta.url), "utf8");

    expect(source).toContain('import YandexMetrika from "@/app/YandexMetrika"');
    expect(source).toContain("<YandexMetrika />");
  });
});
