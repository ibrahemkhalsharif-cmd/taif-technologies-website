import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { LanguageProvider } from '../../i18n/LanguageProvider';
import { useLanguage, type Lang } from '../../i18n/context';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';

export function Layout({ lang }: { lang: Lang }) {
  return (
    <LanguageProvider lang={lang}>
      <Shell />
    </LanguageProvider>
  );
}

function Shell() {
  const { t } = useLanguage();
  const { pathname, hash, key } = useLocation();
  const main = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  // New page: start at the top and move focus to the content, so screen readers announce it.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!window.location.hash) window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }, [pathname]);

  // Links like /services#consulting glide to their section (instantly with reduced motion).
  // Depends on the location key so clicking the same link again scrolls again.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [pathname, hash, key]);

  return (
    <div className={styles.shell}>
      <a href="#main" className={styles.skip}>
        {t.nav.skip}
      </a>
      <Header />
      <main id="main" ref={main} tabIndex={-1} data-menu-inert className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
