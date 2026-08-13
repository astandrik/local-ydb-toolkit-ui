import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";
import { getInstallOption } from "@/lib/product-data";

export const metadata = {
  title: "Run local YDB in CI with local-ydb-toolkit",
  description:
    "Use astandrik/setup-local-ydb for tenant, root-only, and auth-enabled GitHub Actions jobs.",
};

const GITHUB_ACTION_INSTALL = getInstallOption("github-action");

const ROOT_TOPOLOGY_EXAMPLE = `- uses: astandrik/setup-local-ydb@v1
  id: ydb-root
  with:
    version: 26.1.1.6
    topology: root

- run: |
    test "\${{ steps.ydb-root.outputs.database }}" = "/local"
    test "\${{ steps.ydb-root.outputs.endpoint }}" = "\${{ steps.ydb-root.outputs.static-endpoint }}"`;

const AUTH_EXAMPLE = `- uses: astandrik/setup-local-ydb@v1
  id: ydb-auth
  with:
    version: 26.1.1.6
    topology: root
    auth: true

- run: |
    test "\${{ steps.ydb-auth.outputs.username }}" = "root"
    test -f "\${{ steps.ydb-auth.outputs.password-file }}"`;

export default function LocalYdbCiPage() {
  return (
    <ContentPage
      eyebrow="CI guide"
      title="Run local YDB in CI"
      lead="Use the GitHub Action when integration tests need a real YDB endpoint without sharing developer machines or long-lived databases."
      sections={[
        {
          title: "Tenant topology",
          code: GITHUB_ACTION_INSTALL.configSnippet,
        },
        {
          title: "Root-only topology",
          code: ROOT_TOPOLOGY_EXAMPLE,
        },
        {
          title: "Native auth",
          code: AUTH_EXAMPLE,
        },
        {
          title: "Connection outputs",
          items: [
            "endpoint: application gRPC endpoint; dynamic for tenant topology and equal to static-endpoint for root.",
            "static-endpoint: root/static gRPC endpoint.",
            "database: tenant path or /local for root.",
            "monitoring-url: host monitoring URL.",
            "image and resolved-version: concrete image reference and tag.",
            "username and password-file: present when auth: true.",
          ],
        },
        {
          title: "Credential boundary",
          body: [
            "The action exports the username and password-file path when auth is enabled. It never writes the password value as an action output.",
          ],
        },
        {
          title: "Best use cases",
          items: [
            "Integration tests that need LOCAL_YDB_ENDPOINT and LOCAL_YDB_DATABASE.",
            "Schema smoke tests against an isolated tenant or root /local database.",
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
