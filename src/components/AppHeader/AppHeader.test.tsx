import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import { withBasePath } from "@/lib/base-path";

vi.mock("@/components/GravityUI/GravityUI", () => ({
  Container: ({
    children,
    className,
  }: {
    children: ReactNode;
    className?: string;
  }) => <header className={className}>{children}</header>,
}));

describe("primary navigation", () => {
  it("keeps the guides index and highlights the managed SQL guide", () => {
    const html = renderToStaticMarkup(<AppHeader />);
    const [, sqlGuideAttributes = ""] =
      html.match(/<a\b([^>]*)>SQL guide<\/a>/) ?? [];
    const sqlGuideClasses =
      sqlGuideAttributes.match(/\bclass="([^"]*)"/)?.[1].split(/\s+/) ?? [];

    expect(html).toContain(`href="${withBasePath("/#workflows")}"`);
    expect(html).toContain(`href="${withBasePath("/#agent-access")}"`);
    expect(html).toContain(`href="${withBasePath("/guides")}"`);
    expect(sqlGuideAttributes).toContain(
      `href="${withBasePath("/guides/local-ydb-sql")}"`,
    );
    expect(sqlGuideClasses).toEqual(
      expect.arrayContaining([
        "app-header__link",
        "app-header__link--featured",
      ]),
    );
  });
});
