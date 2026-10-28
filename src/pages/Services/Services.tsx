import { Link, useLocation } from 'react-router';
import { Check } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { SERVICE_IDS, SERVICE_ICONS } from '../../content/services';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import styles from './Services.module.css';

export function Services() {
  const { t, path } = useLanguage();
  const { hash, key } = useLocation();
  const s = t.servicesPage;
  // The section a link just pointed at. Keying on the location key replays the
  // arrival animation every time, even when the same shortcut is clicked twice.
  const arrivedId = decodeURIComponent(hash.slice(1));

  return (
    <>
      <Seo page="services" />
      <PageHero eyebrow={s.eyebrow} title={s.title} lead={s.lead}>
        <nav aria-label={s.jumpLabel}>
          <ul role="list" className={styles.jump}>
            {SERVICE_IDS.map((id) => {
              const Icon = SERVICE_ICONS[id];
              return (
                <li key={id} data-service={id}>
                  <Link
                    to={{ hash: id }}
                    className={styles.jumpLink}
                    aria-current={arrivedId === id ? 'location' : undefined}
                  >
                    <Icon size={18} className={styles.jumpIcon} aria-hidden="true" />
                    {t.services[id].title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageHero>

      {SERVICE_IDS.map((id, i) => {
        const Icon = SERVICE_ICONS[id];
        const service = t.services[id];
        const arrives = arrivedId === id;
        const animKey = arrives ? key : 'idle';
        return (
          <Section
            key={id}
            id={id}
            tone={i % 2 === 0 ? 'white' : 'cream'}
            labelledBy={`${id}-title`}
            className={styles.section}
          >
            {arrives && (
              <span key={animKey} className={styles.sweep} data-service={id} aria-hidden="true" />
            )}
            <span
              key={`n-${animKey}`}
              className={[styles.bigNumber, arrives && styles.numberArrive].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div
              key={`l-${animKey}`}
              className={[styles.layout, arrives && styles.arrive].filter(Boolean).join(' ')}
              data-service={id}
            >
              <div className={styles.intro}>
                <div className={styles.meta}>
                  <span className={styles.icon}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className={styles.number} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h2 id={`${id}-title`} className={styles.title}>
                  {service.title}
                </h2>
                <p className={styles.lead}>{service.intro}</p>
              </div>

              <div className={styles.details}>
                <h3 className={styles.detailsTitle}>{s.includesTitle}</h3>
                <ul role="list" className={styles.includes}>
                  {service.includes.map((item) => (
                    <li key={item}>
                      <Check size={20} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.value}>
                  <h3 className={styles.valueTitle}>{s.valueTitle}</h3>
                  <p>{service.value}</p>
                </div>
                <ButtonLink to={`${path('/contact')}?service=${id}`} variant="outline" arrow>
                  {service.cta}
                </ButtonLink>
              </div>
            </div>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
