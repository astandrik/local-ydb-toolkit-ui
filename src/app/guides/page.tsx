import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";
import { GUIDE_LINKS } from "@/lib/product-data";

export const metadata = {
  title: "local-ydb-toolkit guides",
  description:
    "Guides for local-ydb MCP operations, diagnostics, schema DDL, CI setup, and AI-agent tooling choices.",
};

export default function GuidesPage() {
  return (
    <ContentPage
      eyebrow="Guides"
      title="local-ydb-toolkit guides"
      lead="Use these pages to route an agent or developer to the right local-ydb workflow without replacing the existing hosted discovery UI."
      sections={[
        {
          title: "Choose the right guide",
          items: GUIDE_LINKS.map((guide) => `${guide.label}: ${guide.description}`),
        },
        {
          title: "Hosted vs local boundary",
          body: [
            "These hosted guides are read-only discovery content. Actual Docker, SSH, YDB config, password-file, schema, storage, auth, backup, restore, and upgrade operations stay in the local stdio MCP server.",
          ],
        },
      ]}
      links={[
        ...GUIDE_LINKS.map((guide) => ({
          href: withBasePath(guide.href),
          label: guide.label,
        })),
        { href: withBasePath("/llms.txt"), label: "llms.txt" },
      ]}
    />
  );
}
