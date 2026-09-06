import { createElement, type ReactNode } from "react";
// Load Vitest's JSX runtime before testing production module initialization.
import "react/jsx-dev-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import type { ScriptProps } from "next/script";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({
  default: ({ id, strategy, children }: ScriptProps) =>
    createElement("script", { id, "data-strategy": strategy }, children),
}));

vi.mock("@/app/Providers", () => ({
  Providers: ({ children }: { children: ReactNode }) => children,
}));

vi.mock("@/components/GravityUI/GravityUI", () => ({
  Container: ({ children }: { children: ReactNode }) =>
    createElement("div", null, children),
}));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function renderLayout(environment: string): Promise<string> {
  vi.stubEnv("NODE_ENV", environment);
  const { default: RootLayout } = await import("./layout");
  return renderToStaticMarkup(
    createElement(RootLayout, null, createElement("main", null, "Documentation")),
  );
}

describe("Root layout analytics", () => {
  it("includes the production tracker without a consent interaction", async () => {
    const html = await renderLayout("production");

    expect(html).toContain('id="yandex-metrika"');
    expect(html).toContain('data-strategy="afterInteractive"');
    expect(html).toContain("https://mc.yandex.ru/metrika/tag.js");
    expect(html).not.toContain("Optional analytics");
    expect(html).not.toContain("Analytics settings");
  });

  it.each(["development", "test"])(
    "does not include analytics in %s",
    async (environment) => {
      const html = await renderLayout(environment);

      expect(html).not.toContain('id="yandex-metrika"');
      expect(html).not.toContain("mc.yandex.ru");
      expect(html).not.toContain("Optional analytics");
      expect(html).not.toContain("Analytics settings");
    },
  );
});
