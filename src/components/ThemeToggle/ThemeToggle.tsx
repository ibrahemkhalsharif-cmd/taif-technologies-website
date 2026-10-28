import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { useTheme } from '../../theme/context';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { t } = useLanguage();
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={dark ? t.nav.themeToLight : t.nav.themeToDark}
      title={dark ? t.nav.themeToLight : t.nav.themeToDark}
    >
      {/* Key forces a fresh icon so the swap animates */}
      <span key={theme} className={styles.icon} aria-hidden="true">
        {dark ? <Sun size={19} /> : <Moon size={19} />}
      </span>
    </button>
  );
}
