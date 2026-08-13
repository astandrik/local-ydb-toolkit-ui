import { describe, expect, it, vi } from "vitest";

import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/metrics/consent";

describe("analytics consent storage", () => {
  it.each(["accepted", "rejected"] as const)(
    "reads the supported %s value",
    (consent) => {
      const storage = { getItem: vi.fn(() => consent), setItem: vi.fn() };

      expect(readAnalyticsConsent(storage)).toBe(consent);
      expect(storage.getItem).toHaveBeenCalledWith(
        ANALYTICS_CONSENT_STORAGE_KEY,
      );
    },
  );

  it("treats missing, invalid, and unavailable storage as no consent", () => {
    expect(readAnalyticsConsent(null)).toBeNull();
    expect(
      readAnalyticsConsent({
        getItem: () => "unexpected",
        setItem: vi.fn(),
      }),
    ).toBeNull();
    expect(
      readAnalyticsConsent({
        getItem: () => {
          throw new Error("storage unavailable");
        },
        setItem: vi.fn(),
      }),
    ).toBeNull();
  });

  it("writes only the supported consent value under the versioned key", () => {
    const storage = { getItem: vi.fn(), setItem: vi.fn() };

    expect(writeAnalyticsConsent("accepted", storage)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(
      ANALYTICS_CONSENT_STORAGE_KEY,
      "accepted",
    );
  });

  it("fails closed when consent cannot be persisted", () => {
    expect(writeAnalyticsConsent("rejected", null)).toBe(false);
    expect(
      writeAnalyticsConsent("accepted", {
        getItem: vi.fn(),
        setItem: () => {
          throw new Error("storage unavailable");
        },
      }),
    ).toBe(false);
  });
});
