"use client";

import { ANALYTICS_SETTINGS_EVENT } from "@/lib/metrics/consent";

export function AnalyticsSettingsButton() {
  return (
    <button
      type="button"
      className="footer__link footer__link--button"
      onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
    >
      Analytics settings
    </button>
  );
}
