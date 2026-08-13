import { ContentPage } from "@/components/ContentPage/ContentPage";
import { withBasePath } from "@/lib/base-path";
import { PUBLIC_LINKS } from "@/lib/product-data";
import { getPublicPageMetadata } from "@/lib/site-metadata";

export const metadata = getPublicPageMetadata({
  title: "Terms of Use",
  description:
    "Terms for using the local-ydb-toolkit website, skills-only package, and open-source project.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Effective August 13, 2026"
      title="Terms of Use"
      lead="These terms apply to the local-ydb-toolkit project website and skills-only package maintained by astandrik."
      sections={[
        {
          title: "Open-source project",
          body: [
            "local-ydb-toolkit is an independent open-source project provided under the MIT License. It is not an official OpenAI or YDB product and is not endorsed by or affiliated with OpenAI or the YDB project.",
            "The website provides read-only documentation and discovery metadata. The separately distributed repository plugin and npm MCP server are different installation paths with their own local execution requirements.",
          ],
        },
        {
          title: "Skills-only execution boundary",
          body: [
            "Installing or invoking the skills-only package does not grant access to your shell, Docker daemon, files, credentials, or YDB deployment. It provides guidance unless the current host separately exposes suitable tools and you authorize their use.",
            "Do not rely on a response as proof that a local system was inspected unless the response identifies the tool-backed checks and observed results.",
          ],
        },
        {
          title: "Your responsibilities",
          items: [
            "Review commands, generated schema, targets, paths, and configuration before use.",
            "Maintain current backups and a tested rollback path before destructive or state-changing operations.",
            "Protect credentials and avoid exposing unauthenticated YDB endpoints to untrusted networks.",
            "Obtain any required authorization before operating systems or data you do not own.",
            "Comply with the terms and privacy policies of OpenAI, Yandex, GitHub, npm, Docker, YDB, hosting providers, and other services you use.",
          ],
        },
        {
          title: "No warranty or service commitment",
          body: [
            "The project is provided as is, without warranties or guarantees, to the extent permitted by applicable law. There is no service-level agreement, uptime commitment, support commitment, or guarantee that guidance is complete or suitable for a particular deployment.",
            "You are responsible for deciding whether to apply a recommendation and for the resulting changes, downtime, data loss, security exposure, or other consequences.",
          ],
        },
        {
          title: "Questions and changes",
          body: [
            "Open a GitHub issue for project or terms questions without including secrets or private operational details. Updated terms will be published on this page with a new effective date; continued use after an update is subject to the updated terms.",
          ],
        },
      ]}
      links={[
        {
          href: `${PUBLIC_LINKS.github}/issues`,
          label: "Contact via GitHub Issues",
        },
        { href: PUBLIC_LINKS.github, label: "Source and MIT License" },
        { href: withBasePath("/privacy"), label: "Privacy Policy" },
      ]}
    />
  );
}
