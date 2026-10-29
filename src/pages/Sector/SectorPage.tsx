import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowRight, CircleCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import type { SectorId } from '../../i18n/sectors.en';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import { NotFound } from '../NotFound/NotFound';
import styles from './SectorPage.module.css';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

/** One NEX ERP sector (electromechanical, contracting, real estate development), from the company's notes. */
export function SectorPage() {
  const { t, path } = useLanguage();
  const { sector } = useParams();
  const sectors = t.sectors;

  if (!sector || !(sector in sectors.items)) return <NotFound />;
  const item = sectors.items[sector as SectorId];

  return (
    <>
      <Seo title={`${item.name} — NEX ERP`} description={item.lead} />
      <PageHero eyebrow={`${sectors.eyebrow} · ${item.name}`} title={item.title} lead={item.lead}>
        <div className={styles.heroActions}>
          <ButtonLink to={`${path('/contact')}?service=nex`} variant="light" arrow>
            {t.nex.hero.primary}
          </ButtonLink>
          <ButtonLink to={path('/nex-erp')} variant="outline">
            {sectors.back}
          </ButtonLink>
        </div>
      </PageHero>

      <Section labelledBy="groups-title">
        <h2 id="groups-title" className="visually-hidden">
          {item.name}
        </h2>
        <ol role="list" className={`stagger ${styles.groups}`}>
          {item.groups.map((group, i) => (
            <li key={group.title} className={styles.group}>
              <span className={styles.number} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <ul role="list" className={styles.points}>
                {group.points.map((point) => (
                  <li key={point}>
                    <CircleCheck size={18} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {group.chips.length > 0 && (
                <ul role="list" className={styles.chips}>
                  {group.chips.map((chip, c) => (
                    <li key={chip} style={order(c)}>
                      {chip}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {sector === 'development' && (
        <Section tone="navy" labelledBy="leads-title">
          <div className={styles.head}>
            <SectionHeader
              titleId="leads-title"
              title={sectors.leads.title}
              lead={sectors.leads.lead}
            />
          </div>
          {/* A highlight walks through the stages, like a lead moving through the pipeline */}
          <ol role="list" className={`stagger ${styles.pipeline}`}>
            {sectors.leads.stages.map((stage, i) => (
              <li
                key={stage}
                className={styles.stage}
                style={order(i)}
                data-outcome={
                  i === sectors.leads.stages.length - 2
                    ? 'won'
                    : i === sectors.leads.stages.length - 1
                      ? 'lost'
                      : undefined
                }
              >
                <span className={styles.stageDot} aria-hidden="true">
                  {i + 1}
                </span>
                {stage}
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section tone="cream" labelledBy="related-title">
        <h2 id="related-title" className={styles.relatedTitle}>
          {sectors.related}
        </h2>
        <ul role="list" className={`stagger ${styles.related}`}>
          {item.relatedLinks.map((link) => (
            <li key={link.to}>
              <Link to={path(link.to)} className={styles.relatedLink}>
                <span>{link.label}</span>
                <ArrowRight className="icon-dir" size={20} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand nex />
    </>
  );
}
