"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import YandexMetrika from "@/app/YandexMetrika";
import { withBasePath } from "@/lib/base-path";
import {
  ANALYTICS_SETTINGS_EVENT,
  type AnalyticsConsent as AnalyticsConsentValue,
  notifyAnalyticsConsentChanged,
  readAnalyticsConsent,
  subscribeToAnalyticsConsent,
  writeAnalyticsConsent,
} from "@/lib/metrics/consent";
import { disableYandexMetrika } from "@/lib/metrics/yandex";

import "./AnalyticsConsent.scss";

const subscribeToHydration = () => () => undefined;

export function AnalyticsConsent() {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const storedConsent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    readAnalyticsConsent,
    () => null,
  );
  const [areSettingsOpen, setAreSettingsOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const openSettings = () => {
      setStorageError(false);
      setAreSettingsOpen(true);
    };
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    return () => {
      window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    };
  }, []);

  useEffect(() => {
    if (areSettingsOpen) {
      headingRef.current?.focus();
    }
  }, [areSettingsOpen]);

  function chooseConsent(nextConsent: AnalyticsConsentValue) {
    const previousConsent = storageError ? null : storedConsent;
    if (!writeAnalyticsConsent(nextConsent)) {
      disableYandexMetrika();
      setStorageError(true);
      setAreSettingsOpen(true);
      return;
    }

    setStorageError(false);
    setAreSettingsOpen(false);
    notifyAnalyticsConsentChanged();

    if (previousConsent === "accepted" && nextConsent === "rejected") {
      disableYandexMetrika();
      window.location.reload();
    }
  }

  if (!isHydrated) {
    return null;
  }

  const consent = storageError ? null : storedConsent;
  const showConsentPanel = consent === null || areSettingsOpen;

  return (
    <>
      {consent === "accepted" ? <YandexMetrika /> : null}
      {showConsentPanel ? (
        <aside
          className="analytics-consent"
          role="dialog"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
          aria-modal="false"
        >
          <div className="analytics-consent__copy">
            <h2
              id="analytics-consent-title"
              className="analytics-consent__title"
              ref={headingRef}
              tabIndex={-1}
            >
              Optional analytics
            </h2>
            <p
              id="analytics-consent-description"
              className="analytics-consent__description"
            >
              Allow Yandex Metrica, including Webvisor, to help us understand
              how this public documentation is used. Analytics stays off until
              you allow it. Read the{" "}
              <Link href={withBasePath("/privacy")}>Privacy Policy</Link>.
            </p>
            {storageError ? (
              <p className="analytics-consent__error" role="status">
                This preference could not be saved. Analytics remains off.
              </p>
            ) : null}
          </div>
          <div className="analytics-consent__actions">
            <button
              type="button"
              className="analytics-consent__button analytics-consent__button--secondary"
              onClick={() => chooseConsent("rejected")}
            >
              Reject
            </button>
            <button
              type="button"
              className="analytics-consent__button analytics-consent__button--primary"
              onClick={() => chooseConsent("accepted")}
            >
              Allow analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
