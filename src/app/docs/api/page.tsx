import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";

export const metadata = {
  title: "local-ydb-toolkit API docs",
  description:
    "Read-only public API docs for local-ydb-toolkit discovery, OpenAPI, MCP metadata, and agent resources.",
};

export default function ApiDocsPage() {
  return (
    <ContentPage
      eyebrow="Developer resources"
      title="local-ydb-toolkit API docs"
      lead="The public HTTP API is read-only and exists for product discovery, install guidance, workflow summaries, and agent-readable metadata."
      sections={[
        {
          title: "Public JSON endpoints",
          items: [
            "GET /api/product",
            "GET /api/install-options",
            "GET /api/workflows",
            "GET /openapi.json",
            "GET /api/openapi.json",
            "GET /server.json",
            "GET /.well-known/mcp",
            "GET /.well-known/agent-card.json",
          ],
        },
        {
          title: "Hosted promo MCP",
          body: [
            "POST /mcp exposes read-only product discovery tools. It does not execute local-ydb operations or receive local credentials.",
          ],
        },
        {
          title: "Example",
          code: "curl -s https://local-ydb-toolkit.ydb-qdrant.tech/api/product\ncurl -s https://local-ydb-toolkit.ydb-qdrant.tech/openapi.json",
        },
      ]}
      links={[
        { href: withBasePath("/openapi.json"), label: "OpenAPI JSON" },
        { href: withBasePath("/auth.md"), label: "Auth guide" },
        { href: withBasePath("/docs/api.md"), label: "Markdown version" },
      ]}
    />
  );
}
