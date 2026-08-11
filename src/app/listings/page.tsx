import type { Metadata } from "next";
import Link from "next/link";

import { ExternalListingCard } from "@/components/ExternalListings/ExternalListingCard";
import { Container } from "@/components/GravityUI/GravityUI";
import { toPublicUrl, withBasePath } from "@/lib/base-path";
import {
  MCP_LISTING_CONTEXT,
  MCP_LISTING_PURPOSES,
  MCP_REGISTRY_LINKS,
} from "@/lib/product-data";

import "./listings.scss";

export const metadata: Metadata = {
  title: "External listings and verification notes",
  description:
    "A transparent audit of external Local YDB MCP listings, including confirmed claims, user value, limitations, and review dates.",
  alternates: {
    canonical: toPublicUrl("/listings"),
    types: {
      "text/markdown": toPublicUrl("/listings.md"),
    },
  },
};

export default function ListingsPage() {
  return (
    <main className="listings-page">
      <Container maxWidth="xl" gutters={5} className="listings-page__content">
        <header className="listings-page__hero">
          <p className="eyebrow">External listings</p>
          <h1>Verification notes for every public listing</h1>
          <p>{MCP_LISTING_CONTEXT}</p>
          <div className="listings-page__hero-links">
            <Link href={withBasePath("/#mcp-registries")}>Featured listings</Link>
            <Link href={withBasePath("/listings.md")}>Markdown version</Link>
          </div>
        </header>

        {MCP_LISTING_PURPOSES.map((purpose) => {
          const listings = MCP_REGISTRY_LINKS.filter(
            (listing) => listing.purpose === purpose.id,
          );

          return (
            <section
              key={purpose.id}
              className="listings-page__group"
              aria-labelledby={`listings-${purpose.id}`}
            >
              <div className="listings-page__heading">
                <h2 id={`listings-${purpose.id}`}>{purpose.label}</h2>
                <p>{purpose.description}</p>
              </div>
              <div className="listings-page__grid">
                {listings.map((listing) => (
                  <ExternalListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </main>
  );
}
