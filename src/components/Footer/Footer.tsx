import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { SERVICE_IDS } from '../../content/services';
import { Logo } from '../Logo/Logo';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { NAV_LINKS } from '../Header/navLinks';
import styles from './Footer.module.css';

export function Footer() {
  const { t, path } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer data-tone="navy" data-menu-inert className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to={path('/')} className={styles.logoLink}>
              <Logo variant="reverse" width={120} />
            </Link>
            <p className={styles.description}>{t.footer.description}</p>
            <p className={styles.tagline}>{t.tagline}</p>
          </div>

          <nav aria-labelledby="footer-nav" className={styles.inlineCol}>
            <h2 id="footer-nav" className={styles.title}>
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

          <nav aria-labelledby="footer-services" className={styles.servicesCol}>
            <h2 id="footer-services" className={styles.title}>
              {t.footer.servicesTitle}
            </h2>
            <ul role="list" className={styles.list}>
              {SERVICE_IDS.map((id) => (
                <li key={id}>
                  <Link to={`${path('/services')}#${id}`} className={styles.link}>
                    {t.services[id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.inlineCol}>
            <h2 className={styles.title}>{t.footer.contactTitle}</h2>
            <ul role="list" className={styles.list}>
              <li className={styles.location}>
                <MapPin size={18} aria-hidden="true" />
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

        <div className={styles.bottom}>
          <p>
            © {year}{' '}
            <span className="brand-name" lang="en" dir="ltr">
              Taif Technologies
            </span>
            . {t.footer.rights}
          </p>
          <LanguageSwitch className={styles.bottomSwitch} />
        </div>
      </div>
    </footer>
  );
}
