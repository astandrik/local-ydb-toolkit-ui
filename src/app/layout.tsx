import type { Metadata, Viewport } from "next";
import { getRootClassName } from "@gravity-ui/uikit/server";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "@/styles/globals.scss";

import { AnalyticsConsent } from "@/components/AnalyticsConsent/AnalyticsConsent";
import { AppHeader } from "@/components/AppHeader/AppHeader";
import { Footer } from "@/components/Footer/Footer";
import { Providers } from "@/app/Providers";
import { getPublicOrigin, toPublicUrl, withBasePath } from "@/lib/base-path";
import {
  getAgentResourceAlternateTypes,
  getWebsiteJsonLd,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/site-metadata";

const THEME = "dark" as const;

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
};

export const metadata: Metadata = {
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  metadataBase: new URL(getPublicOrigin()),
  alternates: {
    canonical: withBasePath("/"),
    types: getAgentResourceAlternateTypes(),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: withBasePath("/favicon.svg"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: withBasePath("/"),
    images: [
      {
        url: toPublicUrl("/favicon.svg"),
        secureUrl: toPublicUrl("/favicon.svg"),
        alt: "local-ydb-toolkit Y mark",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [toPublicUrl("/favicon.svg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const rootClassName = getRootClassName({ theme: THEME });
  const websiteJsonLd = getWebsiteJsonLd();

  return (
    <html lang="en">
      <body className={rootClassName}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <AppHeader />
          {children}
          <Footer />
        </Providers>
        <AnalyticsConsent />
      </body>
    </html>
  );
}
