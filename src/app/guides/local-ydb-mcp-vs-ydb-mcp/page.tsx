import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "local-ydb-mcp vs ydb-platform/ydb-mcp",
  description:
    "Choose @astandrik/local-ydb-mcp for Docker local-ydb operations and managed local-profile SQL, or ydb-platform/ydb-mcp for general database-level work.",
};

export default function LocalYdbMcpVsYdbMcpPage() {
  return (
    <ContentPage
      eyebrow="MCP comparison"
      title="local-ydb-mcp vs ydb-platform/ydb-mcp"
      lead="Use local-ydb-mcp for operating Docker-based local-ydb environments, including managed YQL against the selected configured profile. Use the official ydb-platform/ydb-mcp server for general database-level work against arbitrary reachable YDB endpoints."
      sections={[
        {
          title: "Use @astandrik/local-ydb-mcp for",
          items: [
            "Docker inventory, local-ydb readiness, YDB healthcheck, tenant state, node registration, GraphShard checks, auth posture, storage placement, and logs.",
            "Root /local bootstrap or CMS tenant bootstrap with dynamic nodes.",
            "YDB table DDL generation, validation, plan-only application, and confirmed application.",
            "Managed YQL with local_ydb_sql: SnapshotRO query, non-executing explain, or plan-first confirmed execution.",
            "Auth hardening, dump listing, path-level dump/restore, storage group workflows, cleanup, and version upgrades.",
          ],
        },
        {
          title: "Use ydb-platform/ydb-mcp for",
          items: [
            "General SQL and query exploration against an arbitrary already running YDB endpoint.",
            "Database-level directory listing, path inspection, and query-oriented exploration.",
            "General YDB interaction that does not need Docker local-ydb lifecycle control.",
          ],
        },
        {
          title: "Safety model",
          body: [
            "@astandrik/local-ydb-mcp is plan-first: mutating tools return planned commands, risk, rollback, and verification unless the caller supplies confirm: true. That matters when an agent can touch containers, volumes, auth files, storage pools, and dumps.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/guides/local-ydb-mcp-vs-ydb-mcp.md"), label: "Markdown version" },
        { href: withBasePath("/guides/diagnose-local-ydb-mcp"), label: "Diagnostics guide" },
        { href: withBasePath("/guides/local-ydb-sql"), label: "Managed SQL guide" },
        { href: withBasePath("/compare"), label: "Broader comparison" },
      ]}
    />
  );
}
