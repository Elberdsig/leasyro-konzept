import { JsonLd } from "@/components/json-ld";
import { ContactBand } from "@/components/home/contact-band";
import { Hero } from "@/components/home/hero";
import { QuotesSection } from "@/components/home/quotes-section";
import { ServicesSplit } from "@/components/home/services-split";
import { Story } from "@/components/home/story";
import { ValuesList } from "@/components/home/values-list";
import { WorldsBento } from "@/components/home/worlds-bento";
import { company } from "@/content/company";
import { worlds } from "@/content/worlds";

/**
 * Home page.
 *
 * Section order and layout families, no two neighbours alike:
 * hero (centred) · bento (asymmetric) · split with list · text list ·
 * quote band · single column story · contact band.
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
      <ValuesList />
      <QuotesSection />
      <Story />
      <ContactBand />
    </>
  );
}
