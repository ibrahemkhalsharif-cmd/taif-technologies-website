import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { Logo } from '../Logo/Logo';
import { NAV_LINKS } from '../Header/navLinks';
import styles from './Footer.module.css';

/** Compact footer: brand, one row of links, location and contact. */
export function Footer() {
  const { t, path } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer data-tone="navy" data-menu-inert className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to={path('/')} className={styles.logoLink}>
              <Logo variant="reverse" width={120} />
            </Link>
            <p className={styles.description}>{t.footer.description}</p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="visually-hidden">
              {t.footer.navTitle}
            </h2>
            <ul role="list" className={styles.list}>
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link to={path(link.to)} className={styles.link}>
                    {t.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="visually-hidden">{t.footer.contactTitle}</h2>
            <ul role="list" className={styles.list}>
              <li className={styles.location}>
                <MapPin size={16} aria-hidden="true" />
                <span>{t.footer.location}</span>
              </li>
              <li>
                <Link to={path('/contact')} className={styles.link}>
                  {t.footer.contactLink}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className={styles.bottom}>
          © {year}{' '}
          <span className="brand-name" lang="en" dir="ltr">
            Taif Technologies
          </span>
          . {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
