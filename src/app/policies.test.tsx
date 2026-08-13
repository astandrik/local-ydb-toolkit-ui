import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import PrivacyPage from "@/app/privacy/page";
import TermsPage from "@/app/terms/page";
import { Footer } from "@/components/Footer/Footer";
import { withBasePath } from "@/lib/base-path";

vi.mock("@/components/GravityUI/GravityUI", () => ({
  Container: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

describe("public policies", () => {
  it("publishes the privacy boundary and analytics disclosure", () => {
    const html = renderToStaticMarkup(<PrivacyPage />);

    expect(html).toContain("Privacy Policy");
    expect(html).toContain("Effective August 13, 2026");
    expect(html).toContain("published by astandrik");
    expect(html).toContain("does not gain implicit access");
    expect(html).toContain("Yandex Metrica, including Webvisor, is optional");
    expect(html).toContain("local-ydb-toolkit.analytics-consent.v1");
    expect(html).toContain("does not sell personal data");
    expect(html).toContain("https://github.com/astandrik/local-ydb-toolkit/issues");
  });

  it("publishes the open-source terms and skills-only execution boundary", () => {
    const html = renderToStaticMarkup(<TermsPage />);

    expect(html).toContain("Terms of Use");
    expect(html).toContain("Effective August 13, 2026");
    expect(html).toContain("provided under the MIT License");
    expect(html).toContain("not an official OpenAI or YDB product");
    expect(html).toContain("does not grant access to your shell");
    expect(html).toContain("No warranty or service commitment");
  });

  it("links policies and analytics settings from the global footer", () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain(`href="${withBasePath("/privacy")}"`);
    expect(html).toContain(`href="${withBasePath("/terms")}"`);
    expect(html).toContain("Analytics settings");
  });
});
