import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";
import { PUBLIC_LINKS } from "@/lib/product-data";
import { getPublicPageMetadata } from "@/lib/site-metadata";

export const metadata = getPublicPageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy practices for the local-ydb-toolkit website and public skills-only package.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Effective August 13, 2026"
      title="Privacy Policy"
      lead="This policy explains what the local-ydb-toolkit project website and public skills-only package do with data. The project is published by astandrik."
      sections={[
        {
          title: "What this policy covers",
          body: [
            "This policy covers the public local-ydb-toolkit website and the skills-only package prepared by astandrik for use in OpenAI products. It does not replace the privacy terms of OpenAI, Yandex, GitHub, npm, a hosting provider, or another service you choose to use.",
            "The website does not offer user accounts. The skills-only package contains reusable instructions and assets, not a hosted operational MCP server, and it does not gain implicit access to your shell, Docker daemon, files, credentials, or YDB deployment.",
          ],
        },
        {
          title: "Local and submitted data",
          body: [
            "Local YDB configuration, command output, schema, and credentials stay on your machine unless you intentionally provide them to an OpenAI product or another service. The project website does not receive prompts or local command output that you submit directly to those services.",
            "Do not paste secrets or sensitive database contents into public GitHub issues. Redact credentials, tokens, private hostnames, and user data before sharing diagnostic material.",
          ],
        },
        {
          title: "Website analytics",
          body: [
            "Yandex Metrica, including Webvisor, is optional. No analytics script or tracking pixel is loaded before you select Allow analytics. If enabled, Yandex may process page-view and interaction telemetry under its own terms and privacy policy.",
            "Your choice is stored in your browser under local-ydb-toolkit.analytics-consent.v1 as accepted or rejected. It is not an authentication token. You can reopen Analytics settings in the footer and reject analytics; the page then reloads without the tracker.",
            "If the browser does not allow the preference to be read or saved, the website treats that as no consent and keeps analytics off.",
          ],
        },
        {
          title: "Technical logs and retention",
          body: [
            "Website hosting infrastructure may produce standard request and security logs, such as request time, requested URL, user agent, IP address, and error diagnostics, to deliver the site, investigate failures, and prevent abuse. The project does not use these logs to create user profiles.",
            "Analytics data is retained according to the configured Yandex Metrica account and Yandex policies. Hosting logs are retained only as needed for delivery, reliability, and security. The project does not sell personal data.",
          ],
        },
        {
          title: "Questions and changes",
          body: [
            "Open a GitHub issue for privacy questions or requests, but do not include secrets or private operational details. Material policy changes will be published on this page with a new effective date.",
          ],
        },
      ]}
      links={[
        {
          href: `${PUBLIC_LINKS.github}/issues`,
          label: "Contact via GitHub Issues",
        },
        {
          href: "https://yandex.com/legal/confidential/",
          label: "Yandex Privacy Policy",
        },
        { href: withBasePath("/terms"), label: "Terms of Use" },
      ]}
    />
  );
}
