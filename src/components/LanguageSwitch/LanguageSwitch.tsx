import { Link, useLocation } from 'react-router';
import { Languages } from 'lucide-react';
import { useLanguage, type Lang } from '../../i18n/context';
import { switchLanguagePath } from '../../i18n/paths';
import styles from './LanguageSwitch.module.css';

/** Links to the same page in the other language. */
export function LanguageSwitch({ className, onSwitch }: { className?: string; onSwitch?: () => void }) {
  const { t } = useLanguage();
  const { pathname, search, hash } = useLocation();
  const target = t.nav.switchLang as Lang;

  return (
    <Link
      to={switchLanguagePath(pathname, target) + search + hash}
      lang={target}
      hrefLang={target}
      aria-label={t.nav.switchAria}
      className={[styles.switch, className].filter(Boolean).join(' ')}
      onClick={onSwitch}
    >
      <Languages size={18} aria-hidden="true" />
      <span className={target === 'en' ? styles.latin : styles.arabic}>{t.nav.switchLabel}</span>
    </Link>
  );
}
