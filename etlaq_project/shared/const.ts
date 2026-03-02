// Shared constants used by both client and (optional) server parts of the project.
// This project is deployed as a static site on Netlify, so these are kept minimal and safe.

export const COOKIE_NAME = 'etlaq_session';
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;

// Used by the TRPC client to detect unauthorized errors and redirect to the login portal.
// Keep this stable across environments.
export const UNAUTHED_ERR_MSG = 'UNAUTHORIZED';
