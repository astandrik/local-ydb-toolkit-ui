"use client";

import Script from "next/script";

import { getYandexMetrikaInlineScript } from "@/lib/metrics/yandex";

const IS_PRODUCTION = process.env.NODE_ENV === "production";

export default function YandexMetrika() {
  if (!IS_PRODUCTION) {
    return null;
  }

  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {getYandexMetrikaInlineScript()}
    </Script>
  );
}
