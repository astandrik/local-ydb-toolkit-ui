import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "Diagnose local-ydb with MCP tools",
  description:
    "Use @astandrik/local-ydb-mcp read-only tools to diagnose Docker local-ydb stacks before planning repair.",
};

export default function DiagnoseLocalYdbMcpPage() {
  return (
    <ContentPage
      eyebrow="Diagnostics"
      title="Diagnose local-ydb with MCP tools"
      lead="Start broad and read-only, then route by YDB healthcheck issue type. Do not repair a local-ydb stack before collecting current evidence."
      sections={[
        {
          title: "Recommended order",
          items: [
            "Run local_ydb_check_prerequisites on a new host or profile.",
            "Run local_ydb_status_report to capture Docker, tenant, node, auth, and health context.",
            "Run local_ydb_healthcheck when a fresh YDB self-check signal is needed.",
            "Route by issue type rather than trying repair commands immediately.",
          ],
        },
        {
          title: "Route by symptom",
          items: [
            "STORAGE: run local_ydb_storage_placement, then inspect static and dynamic logs.",
            "COMPUTE, COMPUTE_POOL, tablet, or node issues: run local_ydb_nodes_check, local_ydb_tenant_check, and dynamic container logs.",
            "DATABASE or SCHEME symptoms: run local_ydb_database_status and local_ydb_scheme.",
            "Auth symptoms: run local_ydb_auth_check.",
          ],
        },
        {
          title: "Prompt support",
          body: [
            "The MCP server includes local_ydb_diagnose_stack and local_ydb_diagnose_database prompts. They instruct the client to inspect current state, summarize observed evidence, and avoid automatic repair.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/guides/diagnose-local-ydb-mcp.md"), label: "Markdown version" },
        { href: withBasePath("/guides/ydb-schema-ddl-mcp"), label: "Schema DDL guide" },
        { href: withBasePath("/docs/api"), label: "API docs" },
      ]}
    />
  );
}
