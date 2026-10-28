import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Public address of the site, needed for absolute link-preview URLs (og:image must be absolute).
 * Order: VITE_SITE_URL from .env, the host's own production URL (Vercel, Netlify), then the
 * company domain taken from its email address.
 */
function resolveSiteUrl(mode: string): string {
  // Empty prefix: .env files plus every variable the host sets (VERCEL_*, URL…)
  const env = loadEnv(mode, '.', '');
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
  const url =
    env.VITE_SITE_URL ||
    (vercel ? `https://${vercel}` : '') ||
    env.URL || // Netlify
    'https://taiftechnologies.cloud';
  return url.replace(/\/$/, '');
}

/** Replaces %SITE_URL% in index.html, so link-preview tags work without JavaScript. */
function siteUrlInHtml(siteUrl: string): Plugin {
  return {
    name: 'site-url-in-html',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteUrlInHtml(resolveSiteUrl(mode))],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
}));
