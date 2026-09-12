/**
 * The leasyro GmbH as it describes itself.
 *
 * Every value below is taken verbatim from the imprint of the live site.
 * Source: https://leasyro.com/impressum, read 12.09.2026.
 * Nothing here is invented. If a field is unknown it is not in this file.
 */

export const company = {
  name: "leasyro GmbH",
  shortName: "leasyro",
  // Source: https://leasyro.com/impressum, 12.09.2026
  street: "Kurfürstendamm 194",
  postalCode: "10707",
  city: "Berlin",
  country: "DE",
  countryName: "Deutschland",
  managingDirector: "Benjamin Böhm",
  registerCourt: "Amtsgericht Charlottenburg",
  registerNumber: "HRB 238025 B",
  vatId: "DE350881300",
  phone: "+49 30 665038520",
  phoneHref: "tel:+4930665038520",
  email: "support@leasyro.com",
  website: "https://leasyro.com",
} as const;

/** External targets of the live site. Nothing here is a local route. */
export const externalLinks = {
  // Source: https://leasyro.com, 12.09.2026
  appointment: "https://leasyro.com/termin",
  shop: "https://leasyro.com/shop",
  careers: "https://leasyro.com/karriere",
  imprint: "https://leasyro.com/impressum",
} as const;
