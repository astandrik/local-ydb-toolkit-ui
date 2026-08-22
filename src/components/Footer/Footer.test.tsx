import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/Footer/Footer";
import { PUBLIC_LINKS } from "@/lib/product-data";

vi.mock("@/components/AnalyticsConsent/AnalyticsSettingsButton", () => ({
  AnalyticsSettingsButton: () => <button>Analytics settings</button>,
}));

vi.mock("@/components/GravityUI/GravityUI", () => ({
  Container: ({ children }: { children: ReactNode }) => <footer>{children}</footer>,
}));

describe("Footer", () => {
  it("links the canonical security policy", () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain(`href="${PUBLIC_LINKS.security}"`);
    expect(html).toContain(">Security</a>");
  });
});
