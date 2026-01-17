export const ARDB_API_PREFIX = (Cypress.env("API_PREFIX") as string) || "/api/ardb";

export const MF_API_PREFIX = (Cypress.env("METAFORGE_PREFIX") as string) || "/api/metaforge"