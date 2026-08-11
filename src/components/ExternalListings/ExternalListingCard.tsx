import { ArrowRight } from "@gravity-ui/icons";

import type { McpRegistryLink } from "@/lib/product-data";

import "./ExternalListingCard.scss";

type ExternalListingCardProps = {
  listing: McpRegistryLink;
};

export function ExternalListingCard({ listing }: ExternalListingCardProps) {
  return (
    <article className="external-listing-card" data-listing-id={listing.id}>
      <header className="external-listing-card__header">
        <h3>{listing.label}</h3>
        <p>{listing.description}</p>
      </header>

      <dl className="external-listing-card__value">
        <div>
          <dt>Useful for</dt>
          <dd>{listing.userValue}</dd>
        </div>
      </dl>

      <div className="external-listing-card__evidence">
        <section aria-label={`${listing.label} confirmed claims`}>
          <h4>Confirmed</h4>
          <ul>
            {listing.confirmedClaims.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
        </section>
        <section aria-label={`${listing.label} limitations`}>
          <h4>Limitations</h4>
          <ul>
            {listing.limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </section>
      </div>

      <footer className="external-listing-card__footer">
        <span>
          Checked{" "}
          {listing.lastChecked ? (
            <time dateTime={listing.lastChecked}>{listing.lastChecked}</time>
          ) : (
            "date not recorded"
          )}
        </span>
        <a href={listing.href} target="_blank" rel="noopener noreferrer">
          Open external listing
          <ArrowRight />
        </a>
      </footer>
    </article>
  );
}
