import { createContext, useContext } from 'react';
import type { Dictionary } from './en';

export type Lang = 'ar' | 'en';

export interface LanguageValue {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Dictionary;
  /** Turns a language-neutral path ("/about") into this language's URL ("/en/about"). */
  path: (to: string) => string;
}

export const LanguageContext = createContext<LanguageValue | null>(null);

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside a LanguageProvider');
  return value;
}
