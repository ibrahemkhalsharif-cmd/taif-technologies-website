import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import { useLanguage } from '../../i18n/context';
import { ButtonLink } from '../Button/Button';
import { NAV_LINKS } from './navLinks';
import styles from './MobileMenu.module.css';

export function MobileMenu({ id, onNavigate }: { id: string; onNavigate: () => void }) {
  const { t, path } = useLanguage();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstLink.current?.focus();
  }, []);

  return (
    <div id={id} className={styles.sheet}>
      <nav aria-label={t.nav.label} className="container">
        <ul role="list" className={styles.list}>
          {NAV_LINKS.map((link, i) => (
            <li key={link.key}>
              <NavLink
                ref={i === 0 ? firstLink : undefined}
                to={path(link.to)}
                end={link.end}
                className={({ isActive }) =>
                  [styles.link, isActive && styles.active].filter(Boolean).join(' ')
                }
                onClick={onNavigate}
              >
                {t.nav[link.key]}
              </NavLink>
            </li>
          ))}
        </ul>
        <ButtonLink to={path('/contact')} arrow className={styles.cta} onClick={onNavigate}>
          {t.nav.cta}
        </ButtonLink>
        <p className={styles.tagline}>{t.tagline}</p>
      </nav>
    </div>
  );
}
