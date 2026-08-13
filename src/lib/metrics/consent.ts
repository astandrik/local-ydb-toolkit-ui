export const ANALYTICS_CONSENT_STORAGE_KEY =
  "local-ydb-toolkit.analytics-consent.v1";
export const ANALYTICS_SETTINGS_EVENT =
  "local-ydb-toolkit:open-analytics-settings";
export const ANALYTICS_CONSENT_CHANGE_EVENT =
  "local-ydb-toolkit:analytics-consent-changed";

export type AnalyticsConsent = "accepted" | "rejected";

type AnalyticsConsentStorage = Pick<Storage, "getItem" | "setItem">;

export function readAnalyticsConsent(
  storage: AnalyticsConsentStorage | null = getBrowserStorage(),
): AnalyticsConsent | null {
  if (!storage) {
    return null;
  }

  try {
    const value = storage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(
  consent: AnalyticsConsent,
  storage: AnalyticsConsentStorage | null = getBrowserStorage(),
): boolean {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
    return true;
  } catch {
    return false;
  }
}

export function subscribeToAnalyticsConsent(
  onStoreChange: () => void,
): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_STORAGE_KEY) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ANALYTICS_CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

export function notifyAnalyticsConsentChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGE_EVENT));
  }
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
