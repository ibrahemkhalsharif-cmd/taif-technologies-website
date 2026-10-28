import { useLocation } from 'react-router';
import { useLanguage } from '../../i18n/context';
import type { Dictionary } from '../../i18n/en';
import { switchLanguagePath } from '../../i18n/paths';

const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '');

/** Per-page title and meta tags. React 19 hoists these into <head>. */
export function Seo({ page, noIndex }: { page: keyof Dictionary['meta']; noIndex?: boolean }) {
  const { t, lang } = useLanguage();
  const { pathname } = useLocation();
  const meta = t.meta[page];

  return (
    <>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Taif Technologies" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_PS' : 'en_US'} />
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
