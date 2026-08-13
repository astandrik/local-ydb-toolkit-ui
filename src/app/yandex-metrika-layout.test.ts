import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Root layout analytics", () => {
  it("mounts the consent boundary instead of the tracker directly", () => {
    const source = readFileSync(new URL("layout.tsx", import.meta.url), "utf8");

    expect(source).toContain(
      'import { AnalyticsConsent } from "@/components/AnalyticsConsent/AnalyticsConsent"',
    );
    expect(source).toContain("<AnalyticsConsent />");
    expect(source).not.toContain('import YandexMetrika from "@/app/YandexMetrika"');
  });

  it("does not include an ungated noscript tracking pixel", () => {
    const source = readFileSync(
      new URL("YandexMetrika.tsx", import.meta.url),
      "utf8",
    );

    expect(source).not.toContain("<noscript>");
    expect(source).not.toContain("mc.yandex.ru/watch");
  });
});
