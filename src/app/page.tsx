import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ContactBand } from "@/components/home/contact-band";
import { EffortCalculator } from "@/components/home/effort-calculator";
import { Hero } from "@/components/home/hero";
import { QuotesSection } from "@/components/home/quotes-section";
import { ServicesSplit } from "@/components/home/services-split";
import { Story } from "@/components/home/story";
import { ValuesList } from "@/components/home/values-list";
import { WorldsBento } from "@/components/home/worlds-bento";
import { Button } from "@/components/ui";
import { calculator } from "@/content/calculator";
import { company, externalLinks } from "@/content/company";
import { worlds } from "@/content/worlds";

/**
 * Title and description come from the root layout. Only the canonical address
 * is page specific: metadataBase plus this path, so the tag stays correct on
 * localhost and on the deployed draft without a second place to maintain.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home page.
 *
 * Section order and layout families, no two neighbours alike:
 * hero (centred) · bento (asymmetric) · split with list · calculator
 * (form left, result right) · text list · quote band · single column story ·
 * contact band.
 *
 * The calculator is the only interactive part of the site, and it is a server
 * component too: the first result is rendered here, a small script without any
 * dependency wires the controls. No file under src/ carries the client
 * directive, so this page hydrates exactly as much as the three pages that
 * have no calculator. Its appointment button is built here and handed down
 * as a prop, which keeps the markup of the section free of next/link and the
 * Phosphor icon.
 */

/**
 * Organization data for search engines. Every field comes from the imprint of
 * the live site, nothing is invented. The page carries noindex, so this is a
 * demonstration of correct markup rather than a bid for a search result.
 * Source: https://leasyro.com/impressum, 12.09.2026.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  legalName: company.name,
  url: company.website,
  email: company.email,
  telephone: company.phone,
  vatID: company.vatId,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.country,
  },
  founder: {
    "@type": "Person",
    name: company.managingDirector,
  },
  subOrganization: worlds.map((world) => ({
    "@type": "Organization",
    name: world.name,
    url: world.href,
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <WorldsBento />
      <ServicesSplit />
      <EffortCalculator
        cta={
          <Button href={externalLinks.appointment} external>
            {calculator.cta}
          </Button>
        }
      />
      <ValuesList />
      <QuotesSection />
      <Story />
      <ContactBand />
    </>
  );
}
