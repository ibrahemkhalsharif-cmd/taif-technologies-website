import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import {
  ArrowUpRight,
  Building,
  Building2,
  Calculator,
  ChartLine,
  Construction,
  CircleCheck,
  FileSpreadsheet,
  FileText,
  HardHat,
  MessageCircle,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { withBrand } from '../../i18n/withBrand';
import { SERVICE_IDS, SERVICE_ICONS } from '../../content/services';
import { Seo } from '../../components/Seo/Seo';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { HeroLines } from '../../components/SpectrumLines/SpectrumLines';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import { CycleStepper } from '../../components/nex/CycleStepper';
import { OccupancyBoard, Previews } from '../../components/nex/Previews';
import { ModulesGrid } from '../../components/nex/ModulesGrid';
import styles from './Home.module.css';

const order = (i: number) => ({ '--i': i }) as CSSProperties;

const TOOL_ICONS: LucideIcon[] = [FileSpreadsheet, FileText, MessageCircle, Calculator];
const SEGMENT_ICONS: LucideIcon[] = [HardHat, Wrench, Construction, Building, Building2, ChartLine];

// Where each item of the hero audience row leads on the NEX ERP page (same order as nex.audienceShort)
const AUDIENCE_TARGETS = [
  '/nex-erp#operations',
  '/nex-erp/electromechanical',
  '/nex-erp/development',
  '/nex-erp/contracting',
];

// Sector chips with a full sector page; the rest open their card on the NEX ERP page
const SECTOR_PAGES: Record<string, string> = {
  contracting: '/nex-erp/contracting',
  development: '/nex-erp/development',
};

/** Home: NEX ERP first (owner's direction, Oct 2026); Taif's other services follow as secondary. */
export function Home() {
  const { t, path } = useLanguage();
  const nex = t.nex;
  const demo = `${path('/contact')}?service=nex`;

  return (
    <>
      <Seo page="home" />

      {/* ---------- Hero ---------- */}
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
              {nex.hero.eyebrow}
            </p>
            <h1 id="hero-title" className={styles.heroTitle} style={order(1)}>
              <span className={styles.titleLead}>{nex.hero.titleLead}</span>{' '}
              <span className={styles.titleAccent}>
                {nex.hero.titleAccent}{' '}
                <span className={`brand-name ${styles.underlined}`} lang="en" dir="ltr">
                  {nex.hero.titleAccentLast}
                </span>
              </span>
            </h1>
            <p className={styles.heroLead} style={order(2)}>
              {withBrand(nex.hero.lead)}
            </p>
            <div className={styles.heroActions} style={order(3)}>
              <ButtonLink to={demo} variant="light" arrow>
                {nex.hero.primary}
              </ButtonLink>
              <ButtonLink to={`${path('/')}#cycle`} variant="outline">
                {nex.hero.secondary}
              </ButtonLink>
            </div>
            <nav aria-label={nex.hero.audienceLabel} className={styles.legend} style={order(4)}>
              <ul role="list">
                {nex.audienceShort.map((label, i) => (
                  // data-service only borrows the four accent colours used across the site
                  <li key={label} data-service={SERVICE_IDS[i]}>
                    <Link to={path(AUDIENCE_TARGETS[i] ?? '/nex-erp#sectors')}>{label}</Link>
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

      {/* ---------- The problem ---------- */}
      <Section labelledBy="problem-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="problem-title"
            eyebrow={nex.problem.eyebrow}
            title={nex.problem.title}
            lead={nex.problem.lead}
          />
        </div>
        <ul role="list" className={`stagger ${styles.problemGrid}`}>
          {nex.problem.items.map((item, i) => {
            const Icon = TOOL_ICONS[i]!;
            return (
              <li key={item.tool} className={styles.problemCard}>
                <span className={styles.toolIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className={styles.toolName}>{item.tool}</h3>
                <p className={styles.pain}>{item.pain}</p>
              </li>
            );
          })}
        </ul>
        <p className={styles.answer}>
          <span className={styles.statementFill}>{nex.problem.answer}</span>
        </p>
      </Section>

      {/* ---------- The operation cycle ---------- */}
      <Section tone="cream" id="cycle" labelledBy="cycle-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="cycle-title"
            eyebrow={nex.cycle.eyebrow}
            title={nex.cycle.title}
            lead={nex.cycle.lead}
          />
        </div>
        <CycleStepper />
      </Section>

      {/* ---------- Inside NEX ERP ---------- */}
      <Section tone="navy" labelledBy="previews-title" className={styles.previewsSection}>
        <div className={styles.head}>
          <SectionHeader
            titleId="previews-title"
            eyebrow={nex.previews.eyebrow}
            title={nex.previews.title}
            lead={nex.previews.lead}
          />
        </div>
        <Previews />
      </Section>

      {/* ---------- Who it's for ---------- */}
      <Section id="audience" labelledBy="audience-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="audience-title"
            eyebrow={nex.audience.eyebrow}
            title={nex.audience.title}
          />
        </div>
        <ul role="list" className={`stagger ${styles.segments}`}>
          {nex.audience.segments.map((segment, i) => {
            const Icon = SEGMENT_ICONS[i]!;
            return (
              <li
                key={segment.title}
                className={styles.segment}
                data-service={SERVICE_IDS[i % SERVICE_IDS.length]}
              >
                <span className={styles.segmentIcon}>
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className={styles.segmentTitle}>{segment.title}</h3>
                <p className={styles.pain}>{segment.body}</p>
              </li>
            );
          })}
        </ul>

        <div className={styles.sectors}>
          <div>
            <h3 className={styles.sectorsTitle}>{nex.audience.sectorsTitle}</h3>
            <p className={styles.pain}>{nex.audience.sectorsLead}</p>
          </div>
          <ul role="list" className={`stagger ${styles.chips}`}>
            {nex.audience.sectors.map((sector) => (
              <li key={sector.name}>
                <Link
                  to={path(SECTOR_PAGES[sector.id] ?? `/nex-erp#sector-${sector.id}`)}
                  className={styles.chip}
                >
                  {sector.name}
                  <span className={styles.chipTag} data-kind={sector.kind}>
                    {sector.kind === 'tested' ? nex.audience.tested : nex.audience.setup}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------- Real estate ---------- */}
      <Section tone="cream" labelledBy="re-title">
        <div className={styles.realEstate}>
          <div className="stagger">
            <SectionHeader
              titleId="re-title"
              eyebrow={nex.realEstate.eyebrow}
              title={nex.realEstate.title}
            />
            <p className={styles.reBody}>{nex.realEstate.body}</p>
            <ButtonLink to={`${path('/nex-erp')}#real-estate`} variant="outline" arrow>
              {nex.realEstate.link}
            </ButtonLink>
          </div>
          <OccupancyBoard />
        </div>
      </Section>

      {/* ---------- Why NEX ERP ---------- */}
      <Section labelledBy="why-title">
        <div className={styles.head}>
          <SectionHeader titleId="why-title" eyebrow={nex.why.eyebrow} title={nex.why.title} />
        </div>
        <ul role="list" className={`stagger ${styles.why}`}>
          {nex.why.items.map((item) => (
            <li key={item.message} className={styles.whyItem}>
              <CircleCheck className={styles.whyIcon} size={22} aria-hidden="true" />
              <h3 className={styles.whyMessage}>{item.message}</h3>
              <p className={styles.pain}>{item.proof}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------- Integrated modules ---------- */}
      <Section tone="cream" labelledBy="modules-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="modules-title"
            eyebrow={nex.modules.eyebrow}
            title={nex.modules.title}
            lead={nex.modules.lead}
          />
        </div>
        <ModulesGrid />
      </Section>

      {/* ---------- Taif's other services (secondary) ---------- */}
      <Section labelledBy="services-title">
        <div className={styles.servicesHead}>
          <SectionHeader
            titleId="services-title"
            eyebrow={nex.other.eyebrow}
            title={nex.other.title}
          />
          <p className={styles.servicesLead}>{nex.other.lead}</p>
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
        <div className={styles.otherLink}>
          <ButtonLink to={path('/services')} variant="outline" arrow>
            {nex.other.link}
          </ButtonLink>
        </div>
      </Section>

      <CtaBand nex />
    </>
  );
}
