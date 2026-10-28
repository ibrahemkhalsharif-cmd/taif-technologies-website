import type { Lang } from './context';

// Arabic is the default language and lives at the root; English lives under /en.

export function localizePath(to: string, lang: Lang): string {
  if (lang === 'ar') return to;
  return to === '/' ? '/en' : `/en${to}`;
}

/** The same page in the other language, keeping query and hash. */
export function switchLanguagePath(pathname: string, target: Lang): string {
  const neutral = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  return localizePath(neutral, target);
}
