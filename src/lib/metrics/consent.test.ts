import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ANALYTICS_CONSENT_CHANGE_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
  hasAnalyticsConsentBeenWithdrawn,
  readAnalyticsConsent,
  subscribeToAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/metrics/consent";

afterEach(() => {
  vi.unstubAllGlobals();
});

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

  it("refreshes consent after the preference changes or storage is cleared", () => {
    const browserEvents = new EventTarget();
    const onStoreChange = vi.fn();
    vi.stubGlobal("window", browserEvents);

    const unsubscribe = subscribeToAnalyticsConsent(onStoreChange);

    browserEvents.dispatchEvent(
      Object.assign(new Event("storage"), {
        key: ANALYTICS_CONSENT_STORAGE_KEY,
      }),
    );
    browserEvents.dispatchEvent(
      Object.assign(new Event("storage"), { key: null }),
    );
    browserEvents.dispatchEvent(
      Object.assign(new Event("storage"), { key: "unrelated" }),
    );
    browserEvents.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));

    expect(onStoreChange).toHaveBeenCalledTimes(3);

    unsubscribe();
    browserEvents.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
    expect(onStoreChange).toHaveBeenCalledTimes(3);
  });

  it("detects every transition away from accepted consent", () => {
    expect(hasAnalyticsConsentBeenWithdrawn("accepted", "rejected")).toBe(
      true,
    );
    expect(hasAnalyticsConsentBeenWithdrawn("accepted", null)).toBe(true);
    expect(hasAnalyticsConsentBeenWithdrawn(undefined, "accepted")).toBe(
      false,
    );
    expect(hasAnalyticsConsentBeenWithdrawn("rejected", null)).toBe(false);
  });
});
