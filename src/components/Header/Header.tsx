import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { Logo } from '../Logo/Logo';
import { ButtonLink } from '../Button/Button';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../theme/context';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS } from './navLinks';
import styles from './Header.module.css';

const DESKTOP_QUERY = '(width >= 64em)';

/**
 * The header turns navy (with the reverse logo) while it sits over a navy opening section
 * marked with data-header-dark, and gains a shadow once the page has scrolled.
 */
function useHeaderSurface(headerRef: RefObject<HTMLElement | null>) {
  const { pathname } = useLocation();
  const [state, setState] = useState({ dark: false, scrolled: false });

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const darkSection = document.querySelector('[data-header-dark]');
      const rect = darkSection?.getBoundingClientRect();
      const dark = Boolean(rect && rect.top <= headerBottom && rect.bottom > headerBottom);
      const scrolled = window.scrollY > 4;
      setState((s) => (s.dark === dark && s.scrolled === scrolled ? s : { dark, scrolled }));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname, headerRef]);

  return state;
}

export function Header() {
  const { t, path } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const surface = useHeaderSurface(headerRef);
  const { theme } = useTheme();
  const dark = surface.dark && !open;
  // Reverse logo on any dark surface: over a navy opening, or everywhere in the dark theme
  const reverseLogo = dark || theme === 'dark';

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) menuButton.current?.focus();
  }, []);

  // While the menu is open: page behind it is inert, scroll is locked, Escape closes it.
  useEffect(() => {
    if (!open) return;
    const behind = document.querySelectorAll<HTMLElement>('[data-menu-inert]');
    behind.forEach((el) => (el.inert = true));
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close(true);
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onResize = () => desktop.matches && close();
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);

    return () => {
      behind.forEach((el) => (el.inert = false));
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [open, close]);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-tone={dark ? 'navy' : 'white'}
      data-scrolled={surface.scrolled && !dark ? '' : undefined}
    >
      <div className={`container ${styles.inner}`}>
        <Link to={path('/')} className={styles.logoLink} onClick={() => close()}>
          <Logo width={120} variant={reverseLogo ? 'reverse' : 'default'} />
        </Link>

        <nav aria-label={t.nav.label} className={styles.nav}>
          <ul role="list" className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <NavLink
                  to={path(link.to)}
                  end={link.end}
                  className={({ isActive }) =>
                    [styles.navLink, isActive && styles.active].filter(Boolean).join(' ')
                  }
                >
                  {t.nav[link.key]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <LanguageSwitch onSwitch={() => close()} />
          <ButtonLink to={path('/contact')} size="sm" className={styles.cta}>
            {t.nav.cta}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && <MobileMenu id="mobile-menu" onNavigate={() => close()} />}
    </header>
  );
}
