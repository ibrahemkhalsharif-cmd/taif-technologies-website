import { Link, useLocation } from 'react-router';
import { Languages } from 'lucide-react';
import { useLanguage, type Lang } from '../../i18n/context';
import { switchLanguagePath } from '../../i18n/paths';
import styles from './LanguageSwitch.module.css';

/** Icon button linking to the same page in the other language. Named for screen readers and on hover. */
export function LanguageSwitch({ onSwitch }: { onSwitch?: () => void }) {
  const { t } = useLanguage();
  const { pathname, search, hash } = useLocation();
  const target = t.nav.switchLang as Lang;

  return (
    <Link
      to={switchLanguagePath(pathname, target) + search + hash}
      lang={target}
      hrefLang={target}
      aria-label={t.nav.switchAria}
      title={t.nav.switchAria}
      className={styles.switch}
      onClick={onSwitch}
    >
      <Languages size={19} aria-hidden="true" />
    </Link>
  );
}
