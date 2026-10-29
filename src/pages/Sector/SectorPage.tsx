import { useId, useState, type CSSProperties } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowRight, Check, CircleCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import type { SectorId, Sectors } from '../../i18n/sectors.en';
import { useTabs } from '../../hooks/useTabs';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import { NotFound } from '../NotFound/NotFound';
import styles from './SectorPage.module.css';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

/** One NEX ERP sector (electromechanical, contracting, real estate development, elevators, HVAC, solar), from the company's notes. */
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
              {group.chips.length > 0 &&
                (group.flow ? (
                  // Stages in order, with an arrow to the next one
                  <ol role="list" className={styles.flow}>
                    {group.chips.map((chip, c) => (
                      <li key={chip} style={order(c)}>
                        <span>{chip}</span>
                        {c < group.chips.length - 1 && (
                          <ArrowRight className="icon-dir" size={14} aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul role="list" className={styles.chips}>
                    {group.chips.map((chip, c) => (
                      <li key={chip} style={order(c)}>
                        {chip}
                      </li>
                    ))}
                  </ul>
                ))}
            </li>
          ))}
        </ol>
      </Section>

      {sector === 'hvac' && (
        <Section tone="navy" labelledBy="surveys-title">
          <SurveyForms surveys={sectors.surveys} />
        </Section>
      )}

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

/** The company's two site survey forms (split and central), one tab each; the boxes tick down the sheet. */
function SurveyForms({ surveys }: { surveys: Sectors['surveys'] }) {
  const id = useId();
  const [active, setActive] = useState(0);
  const { onKeyDown, tabRef } = useTabs(surveys.forms.length, setActive);
  const form = surveys.forms[active]!;

  return (
    <>
      <div className={styles.head}>
        <SectionHeader titleId="surveys-title" title={surveys.title} lead={surveys.lead} />
      </div>
      <div role="tablist" aria-label={surveys.title} className={styles.tabs}>
        {surveys.forms.map((f, i) => (
          <button
            key={f.tab}
            ref={tabRef(i)}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {f.tab}
          </button>
        ))}
      </div>
      {/* key restarts the ticking when the tab changes */}
      <div
        key={active}
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className={styles.sheet}
      >
        <h3 className={styles.sheetTitle}>{form.name}</h3>
        <p className={styles.sheetNote}>{form.note}</p>
        <ol role="list" className={styles.sheetSections}>
          {form.sections.map((section, i) => (
            <li key={section} style={order(i)}>
              <span className={styles.box} aria-hidden="true">
                <Check size={14} strokeWidth={3} />
              </span>
              <span className={styles.sheetNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {section}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
