import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "Compare local-ydb-toolkit for local YDB automation",
  description:
    "How local-ydb-toolkit fits among local database deployment automation, schema migration, and CI database setup tools.",
};

export default function ComparePage() {
  return (
    <ContentPage
      eyebrow="Comparison"
      title="Compare local-ydb-toolkit for local YDB automation"
      lead="Use local-ydb-toolkit when an AI agent needs to operate Docker-based local-ydb itself, not just run migrations after a database already exists."
      sections={[
        {
          title: "Category fit",
          body: [
            "Liquibase, Redgate SQL Change Automation, Harness, and Bytebase are useful for schema change management, release governance, and shared database workflows.",
            "local-ydb-toolkit is narrower and operational: it checks host prerequisites, starts local-ydb, diagnoses health, handles tenant topology, prepares auth, manages storage workflows, and upgrades local-ydb images.",
          ],
        },
        {
          title: "Use local-ydb-toolkit for",
          items: [
            "Disposable local YDB environments for development and CI.",
            "Agent-safe local-ydb diagnostics before mutation.",
            "YDB table DDL generation and validation for local deployments.",
            "Auth hardening, dump listing, path-level dump/restore, storage placement, and image upgrades.",
          ],
        },
        {
          title: "Use another tool for",
          items: [
            "Enterprise schema approval workflows across many database engines.",
            "Release orchestration that does not need local-ydb container lifecycle control.",
            "General SQL exploration against an already running YDB endpoint.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/guides/local-database-deployment-automation"), label: "Automation guide" },
        { href: withBasePath("/docs/api"), label: "API docs" },
        { href: withBasePath("/compare.md"), label: "Markdown version" },
      ]}
    />
  );
}
