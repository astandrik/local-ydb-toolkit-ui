import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "local-ydb-toolkit webhooks",
  description:
    "Webhook support status and integration guidance for local-ydb-toolkit.",
};

export default function WebhooksPage() {
  return (
    <ContentPage
      eyebrow="Developer resources"
      title="local-ydb-toolkit webhooks"
      lead="Webhooks are not supported in v1 because the hosted site is a read-only discovery surface and operational tools run locally over stdio."
      sections={[
        {
          title: "Current status",
          body: [
            "There is no hosted account system, browser OAuth flow, remote job queue, or remote local-ydb mutation endpoint in v1. That means there is no webhook callback channel to configure.",
          ],
        },
        {
          title: "Use instead",
          items: [
            "Use the public API for read-only discovery.",
            "Use the local stdio MCP server for Docker, SSH, password-file, and YDB config operations.",
            "Use GitHub Actions outputs from astandrik/setup-local-ydb@v1 for CI integration.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/docs/api"), label: "API docs" },
        { href: withBasePath("/auth.md"), label: "Auth guide" },
        { href: withBasePath("/docs/webhooks.md"), label: "Markdown version" },
      ]}
    />
  );
}
