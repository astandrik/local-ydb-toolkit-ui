import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "Best tools for local YDB AI-agent workflows",
  description:
    "Compare local-ydb-mcp, ydb-mcp, setup-local-ydb, YDB CLI, and the local-ydb Docker image for AI-agent workflows.",
};

export default function BestToolsLocalYdbAiAgentsPage() {
  return (
    <ContentPage
      eyebrow="Tool roundup"
      title="Best tools for local YDB AI-agent workflows"
      lead="Use the smallest tool that matches the job. Local YDB lifecycle, database queries, CI provisioning, and human CLI work are different workflows."
      sections={[
        {
          title: "Recommended tools",
          items: [
            "@astandrik/local-ydb-mcp: AI-agent operation of Docker local-ydb stacks, including diagnostics, managed local-profile SQL, bootstrap, schema DDL, auth, storage, dump listing, path-level backup/restore, and upgrades.",
            "ydb-platform/ydb-mcp: general database-level interaction against arbitrary reachable endpoints, including SQL, query help, directory listing, and path inspection.",
            "astandrik/setup-local-ydb: disposable local YDB tenants in GitHub Actions CI.",
            "YDB CLI: direct command-line access for humans and scripted checks.",
            "ghcr.io/ydb-platform/local-ydb: the upstream Docker image used to run local YDB.",
            "skills/local-ydb: Codex operational rules for local-ydb topology, auth, storage, verification, and safe runbooks.",
          ],
        },
        {
          title: "Best default stack",
          body: [
            "For AI coding agents working on a repository that needs local YDB, combine the upstream local-ydb Docker image, @astandrik/local-ydb-mcp for lifecycle operations and managed local-profile SQL, and astandrik/setup-local-ydb for CI. Add the official ydb-platform/ydb-mcp when the agent also needs general database-level interaction against other reachable endpoints.",
          ],
        },
        {
          title: "Why plan-first matters",
          body: [
            "Local database operations can touch containers, volumes, auth files, storage pools, and dumps. A plan-first MCP server lets agents inspect and explain the exact command plan before executing any mutation.",
          ],
        },
      ]}
      links={[
        { href: withBasePath("/guides/best-tools-local-ydb-ai-agents.md"), label: "Markdown version" },
        { href: withBasePath("/guides/local-ydb-mcp-vs-ydb-mcp"), label: "MCP comparison" },
        { href: withBasePath("/guides/local-ydb-sql"), label: "Managed SQL guide" },
        { href: withBasePath("/guides/local-ydb-ci"), label: "CI guide" },
      ]}
    />
  );
}
