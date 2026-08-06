import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContentPage } from "@/components/ContentPage/ContentPage";

describe("content page", () => {
  it("renders content without a hero logo block", () => {
    const html = renderToStaticMarkup(
      <ContentPage
        eyebrow="Guide"
        title="Test guide"
        lead="Test lead"
        sections={[
          {
            title: "Test section",
            body: ["Test paragraph"],
            items: ["Test item"],
          },
        ]}
        links={[{ href: "/related", label: "Related guide" }]}
      />,
    );

    expect(html).toContain("Test guide");
    expect(html).toContain("Test lead");
    expect(html).toContain("Test section");
    expect(html).toContain("Test paragraph");
    expect(html).toContain("Test item");
    expect(html).toContain('href="/related"');
    expect(html).not.toContain('alt="YDB"');
    expect(html).not.toContain("content-page__logo");
  });
});
