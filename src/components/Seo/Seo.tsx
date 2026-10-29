import { useLocation } from 'react-router';
import { useLanguage } from '../../i18n/context';
import type { Dictionary } from '../../i18n/en';
import { switchLanguagePath } from '../../i18n/paths';

const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');

/**
 * Per-page title, description and links. React 19 hoists these into <head>.
 * Link-preview (Open Graph) tags are static in index.html, because preview crawlers don't run JavaScript.
 */
interface SeoProps {
  page?: keyof Dictionary['meta'];
  /** Explicit title and description, for pages without an entry in t.meta */
  title?: string;
  description?: string;
  noIndex?: boolean;
}

export function Seo({ page = 'home', title, description, noIndex }: SeoProps) {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const meta = {
    title: title ?? t.meta[page].title,
    description: description ?? t.meta[page].description,
  };

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {noIndex && <meta name="robots" content="noindex" />}
      {SITE_URL && (
        <>
          <link rel="canonical" href={SITE_URL + pathname} />
          <link
            rel="alternate"
            hrefLang="ar"
            href={SITE_URL + switchLanguagePath(pathname, 'ar')}
          />
          <link
            rel="alternate"
            hrefLang="en"
            href={SITE_URL + switchLanguagePath(pathname, 'en')}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={SITE_URL + switchLanguagePath(pathname, 'ar')}
          />
        </>
      )}
    </>
  );
}
