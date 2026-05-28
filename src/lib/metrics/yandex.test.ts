import { describe, expect, it, vi } from "vitest";

import {
  YANDEX_METRIKA_ID,
  getYandexMetrikaInlineScript,
  trackGoal,
} from "@/lib/metrics/yandex";

describe("Yandex Metrika", () => {
  it("uses the shared project counter", () => {
    expect(YANDEX_METRIKA_ID).toBe(104844437);
  });

  it("builds the production inline script for the counter", () => {
    const script = getYandexMetrikaInlineScript();

    expect(script).toContain("https://mc.yandex.ru/metrika/tag.js");
    expect(script).toContain("ym(104844437, \"init\"");
    expect(script).toContain("trackLinks:true");
    expect(script).toContain("webvisor:true");
  });

  it("tracks goals when window.ym is available", () => {
    const ym = vi.fn();
    Object.defineProperty(globalThis, "window", {
      value: { ym },
      configurable: true,
    });

    trackGoal("promo_mcp_cta_click", { surface: "hero" });

    expect(ym).toHaveBeenCalledWith(104844437, "reachGoal", "promo_mcp_cta_click", {
      surface: "hero",
    });

    Reflect.deleteProperty(globalThis, "window");
  });
});
