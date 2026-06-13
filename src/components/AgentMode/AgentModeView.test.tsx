import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { AgentModeView } from "@/components/AgentMode/AgentModeView";

describe("homepage agent mode", () => {
  it("renders a structured agent view for crawler requests", () => {
    const html = renderToStaticMarkup(<AgentModeView />);

    expect(html).toContain("local-ydb-toolkit agent mode");
    expect(html).toContain("GET /api/product");
    expect(html).toContain("Authentication");
    expect(html).toContain("LOCAL_YDB_TOOLKIT_CONFIG");
    expect(html).toContain("confirm: true");
    expect(html).not.toContain("hero-band");
  });

  it("routes mode=agent requests away from the normal promo page", () => {
    const source = readFileSync(
      new URL("../../app/page.tsx", import.meta.url),
      "utf8",
    );

    expect(source).toContain('mode === "agent"');
    expect(source).toContain("<AgentModeView />");
  });
});
