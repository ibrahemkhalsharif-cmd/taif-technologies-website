import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { withBrand } from '../../i18n/withBrand';
import { SERVICE_IDS, SERVICE_ICONS } from '../../content/services';
import { Seo } from '../../components/Seo/Seo';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { HeroLines } from '../../components/SpectrumLines/SpectrumLines';
import { TraitList } from '../../components/TraitList/TraitList';
import { ProcessSteps } from '../../components/ProcessSteps/ProcessSteps';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import styles from './Home.module.css';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

export function Home() {
  const { t, path } = useLanguage();

  return (
    <>
      <Seo page="home" />

      <section
        data-tone="navy"
        data-header-dark
        className={styles.hero}
        aria-labelledby="hero-title"
      >
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <p className={styles.tagline} style={order(0)}>
              <span className={styles.arms} aria-hidden="true">
                <span />
                <span />
              </span>
              {t.tagline}
            </p>
            <h1 id="hero-title" className={styles.heroTitle} style={order(1)}>
              <span className={styles.titleLead}>{t.hero.titleLead}</span>{' '}
              <span className={styles.titleAccent}>
                {t.hero.titleAccent}{' '}
                <span className={styles.underlined}>{t.hero.titleAccentLast}</span>
              </span>
            </h1>
            <p className={styles.heroLead} style={order(2)}>
              {withBrand(t.hero.lead)}
            </p>
            <div className={styles.heroActions} style={order(3)}>
              <ButtonLink to={path('/contact')} variant="light" arrow>
                {t.hero.primary}
              </ButtonLink>
              <ButtonLink to={path('/services')} variant="outline">
                {t.hero.secondary}
              </ButtonLink>
            </div>
            <nav aria-label={t.hero.legend} className={styles.legend} style={order(4)}>
              <ul role="list">
                {SERVICE_IDS.map((id) => (
                  <li key={id} data-service={id}>
                    <Link to={`${path('/services')}#${id}`}>{t.serviceNames[id]}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={styles.heroArt}>
            <HeroLines />
          </div>
        </div>
        <div className={styles.spectrumBar} aria-hidden="true">
          <span />
          <span />
        </div>
      </section>

      <Section labelledBy="services-title" className={styles.servicesSection}>
        <div className={styles.servicesHead}>
          <SectionHeader
            titleId="services-title"
            eyebrow={t.homeServices.eyebrow}
            title={t.homeServices.title}
          />
          <p className={styles.servicesLead}>{t.homeServices.lead}</p>
        </div>

        <ol role="list" className={`stagger ${styles.rows}`}>
          {SERVICE_IDS.map((id, i) => {
            const Icon = SERVICE_ICONS[id];
            const service = t.services[id];
            return (
              <li key={id} data-service={id}>
                <Link to={`${path('/services')}#${id}`} className={styles.row}>
                  <span className={styles.rowNumber} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.rowIcon} aria-hidden="true">
                    <Icon size={22} />
                  </span>
                  <span className={styles.rowTitle}>{service.title}</span>
                  <span className={styles.rowSummary}>{service.summary}</span>
                  <span className={styles.rowArrow} aria-hidden="true">
                    <ArrowUpRight className="icon-dir" size={20} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="cream" labelledBy="promise-title" className={styles.promiseSection}>
        <div className="stagger">
          <p className={styles.promiseEyebrow}>{t.promise.eyebrow}</p>
          <h2 id="promise-title" className={styles.statement}>
            <span className={styles.statementFill}>{t.promise.title}</span>
          </h2>
          <p className={styles.promiseBody}>{t.promise.body}</p>
        </div>
        <TraitList />
      </Section>

      <Section labelledBy="process-title">
        <div className={styles.processHead}>
          <SectionHeader
            titleId="process-title"
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            lead={t.process.lead}
          />
        </div>
        <ProcessSteps />
      </Section>

      <CtaBand />
    </>
  );
}
