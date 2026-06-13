import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";
import { INSTALL_OPTIONS } from "@/lib/product-data";

export const metadata = {
  title: "Run local YDB in CI with local-ydb-toolkit",
  description:
    "Use astandrik/setup-local-ydb for GitHub Actions jobs that need disposable local YDB tenants.",
};

export default function LocalYdbCiPage() {
  return (
    <ContentPage
      eyebrow="CI guide"
      title="Run local YDB in CI"
      lead="Use the GitHub Action when integration tests need a real YDB endpoint without sharing developer machines or long-lived databases."
      sections={[
        {
          title: "GitHub Actions quickstart",
          code: INSTALL_OPTIONS[2]?.configSnippet,
        },
        {
          title: "Best use cases",
          items: [
            "Integration tests that need LOCAL_YDB_ENDPOINT and LOCAL_YDB_DATABASE.",
            "Schema smoke tests against an isolated /local tenant.",
            "Auth-enabled test scenarios that should not expose raw passwords.",
          ],
        },
        {
          title: "Agent guidance",
          body: [
            "For CI setup, prefer the action. For interactive local operations, use the local stdio MCP server so tools can inspect Docker, logs, storage, auth, and version state.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/docs/api"), label: "API docs" },
        { href: withBasePath("/guides/local-ydb-ci.md"), label: "Markdown version" },
      ]}
    />
  );
}
