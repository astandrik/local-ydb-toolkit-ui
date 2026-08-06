import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { AppHeader } from "@/components/AppHeader/AppHeader";

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

    expect(html).toContain('href="/guides"');
    expect(html).toContain(
      '<a class="app-header__link app-header__link--featured" href="/guides/local-ydb-sql">SQL guide</a>',
    );
  });
});
