import Image from "next/image";
import Link from "next/link";

import { withBasePath } from "@/lib/base-path";

import "./ContentPage.scss";

export type ContentPageSection = {
  title: string;
  body?: string[];
  items?: string[];
  code?: string;
};

type ContentPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  sections: ContentPageSection[];
  links?: Array<{ href: string; label: string }>;
};

export function ContentPage({
  eyebrow,
  title,
  lead,
  sections,
  links = [],
}: ContentPageProps) {
  return (
    <main className="content-page">
      <section className="content-page__hero">
        <div className="content-page__hero-copy">
          <p className="content-page__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
        <Image
          src={withBasePath("/assets/ydb-icon.svg")}
          alt="YDB"
          width={104}
          height={32}
          unoptimized
          className="content-page__logo"
        />
      </section>

      <section className="content-page__body">
        {sections.map((section) => (
          <article key={section.title} className="content-page__section">
            <h2>{section.title}</h2>
            {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {section.code ? <pre>{section.code}</pre> : null}
          </article>
        ))}
      </section>

      {links.length ? (
        <nav className="content-page__links" aria-label="Related resources">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </main>
  );
}
