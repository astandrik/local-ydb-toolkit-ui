import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "Local database deployment automation with local-ydb-toolkit",
  description:
    "Agent-ready workflow for operating local YDB deployments with diagnostics, bootstrap, schema, auth, storage, and upgrade guardrails.",
};

export default function LocalDatabaseDeploymentAutomationPage() {
  return (
    <ContentPage
      eyebrow="Guide"
      title="Local database deployment automation with local-ydb-toolkit"
      lead="A local YDB automation flow starts by proving the Docker target state, then returns plans for any operation that can change containers, storage, auth, or schema."
      sections={[
        {
          title: "Agent workflow",
          items: [
            "Run local_ydb_check_prerequisites before deeper checks on a new target.",
            "Run local_ydb_status_report, then local_ydb_healthcheck for database-level diagnosis.",
            "Choose root database bootstrap for simple local work, or tenant topology for GraphShard and dynamic-node testing.",
            "Generate and validate schema DDL before applying it.",
            "Require confirm: true for mutating operations.",
          ],
        },
        {
          title: "Safety model",
          body: [
            "Read-only diagnostics establish the current state before any planned mutation. Plans include command shape, risk, rollback, and verification so the user can review the exact effect.",
            "Private config paths, SSH settings, password files, and database credentials stay in the local MCP client, shell, CI runner, or SSH target.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/mcp.md"), label: "MCP guide" },
        { href: withBasePath("/auth.md"), label: "Auth guide" },
        {
          href: withBasePath("/guides/local-database-deployment-automation.md"),
          label: "Markdown version",
        },
      ]}
    />
  );
}
