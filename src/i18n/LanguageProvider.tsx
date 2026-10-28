import { useEffect, useMemo, type ReactNode } from 'react';
import ar from './ar';
import en from './en';
import { LanguageContext, type Lang, type LanguageValue } from './context';
import { localizePath } from './paths';

const dictionaries = { ar, en };

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      t: dictionaries[lang],
      path: (to) => localizePath(to, lang),
    }),
    [lang],
  );

  // The single place where document language and direction are set (index.html sets them before first paint).
  useEffect(() => {
    document.documentElement.lang = value.lang;
    document.documentElement.dir = value.dir;
  }, [value.lang, value.dir]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
