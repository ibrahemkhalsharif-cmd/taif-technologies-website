import { CircleAlert, CircleCheck, ParkingSquare } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import { OccupancyBoard } from '../../components/nex/Previews';
import { ModulesGrid } from '../../components/nex/ModulesGrid';
import styles from './NexErp.module.css';

/** Document numbers and line codes stay left-to-right inside Arabic text. */
function Codes({ text }: { text: string }) {
  const parts = text.split(/([A-Z]{2,}(?:-[A-Z0-9]+)+)/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <bdi key={i} dir="ltr" className={styles.code}>
            {part}
          </bdi>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** NEX ERP in detail: operation lines, each stage, real estate, sectors, modules and the platform. Source: brief §1–6. */
export function NexErp() {
  const { t, path } = useLanguage();
  const nex = t.nex;
  const page = nex.page;

  return (
    <>
      <Seo page="nex" />
      <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} lead={page.hero.lead}>
        <div className={styles.heroActions}>
          <ButtonLink to={`${path('/contact')}?service=nex`} variant="light" arrow>
            {nex.hero.primary}
          </ButtonLink>
          <ButtonLink to={`${path('/')}#cycle`} variant="outline">
            {nex.hero.secondary}
          </ButtonLink>
        </div>
      </PageHero>

      {/* Operation lines */}
      <Section labelledBy="lines-title">
        <div className={styles.split}>
          <SectionHeader
            titleId="lines-title"
            eyebrow={page.lines.eyebrow}
            title={page.lines.title}
            lead={page.lines.body}
          />
          <ul role="list" className={`stagger ${styles.points}`}>
            {page.lines.points.map((point) => (
              <li key={point}>
                <CircleCheck size={20} aria-hidden="true" />
                <span>
                  <Codes text={point} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Stages: problem → solution */}
      <Section tone="cream" id="operations" labelledBy="stages-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="stages-title"
            eyebrow={page.stages.eyebrow}
            title={page.stages.title}
          />
        </div>
        <ol role="list" className={`stagger ${styles.stages}`}>
          {page.stages.items.map((stage, i) => (
            <li key={stage.title} className={styles.stage}>
              <span className={styles.stageNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.stageTitle}>{stage.title}</h3>
              <p className={styles.pain}>
                <CircleAlert size={18} aria-hidden="true" />
                <span>{stage.pain}</span>
              </p>
              <ul role="list" className={styles.points}>
                {stage.points.map((point) => (
                  <li key={point}>
                    <CircleCheck size={18} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* Real estate */}
      <Section id="real-estate" labelledBy="pre-title">
        <div className={styles.split}>
          <div className={`stagger ${styles.stack}`}>
            <SectionHeader
              titleId="pre-title"
              eyebrow={page.realEstate.eyebrow}
              title={page.realEstate.title}
              lead={page.realEstate.lead}
            />
            <ul role="list" className={styles.points}>
              {page.realEstate.points.map((point) => (
                <li key={point}>
                  <CircleCheck size={20} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className={styles.parking}>
              <ParkingSquare size={22} aria-hidden="true" />
              <div>
                <p className={styles.parkingTitle}>{page.realEstate.parkingTitle}</p>
                <p className={styles.muted}>{page.realEstate.parking}</p>
              </div>
            </div>
          </div>
          <OccupancyBoard />
        </div>
        <p className={styles.reMessage}>{nex.realEstate.body}</p>
      </Section>

      {/* Sectors */}
      <Section tone="navy" id="sectors" labelledBy="sectors-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="sectors-title"
            eyebrow={page.sectors.eyebrow}
            title={page.sectors.title}
            lead={page.sectors.lead}
          />
        </div>
        <ul role="list" className={`stagger ${styles.sectors}`}>
          {page.sectors.items.map((sector) => (
            <li key={sector.name} className={styles.sector} data-kind={sector.kind}>
              <div className={styles.sectorHead}>
                <h3 className={styles.sectorName}>{sector.name}</h3>
                <span className={styles.tag} data-kind={sector.kind}>
                  {sector.kind === 'tested' ? nex.audience.tested : nex.audience.setup}
                </span>
              </div>
              {sector.lines && (
                <p className={styles.lines}>
                  <Codes text={sector.lines} />
                </p>
              )}
              <ul role="list" className={styles.points}>
                {sector.points.map((point) => (
                  <li key={point}>
                    <CircleCheck size={18} aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* Integrated modules */}
      <Section labelledBy="pmodules-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="pmodules-title"
            eyebrow={nex.modules.eyebrow}
            title={nex.modules.title}
            lead={nex.modules.lead}
          />
        </div>
        <ModulesGrid />
      </Section>

      {/* Platform facts and roles */}
      <Section tone="cream" labelledBy="facts-title">
        <div className={styles.head}>
          <SectionHeader
            titleId="facts-title"
            eyebrow={page.facts.eyebrow}
            title={page.facts.title}
          />
        </div>
        <ul role="list" className={`stagger ${styles.facts}`}>
          {page.facts.items.map((fact) => (
            <li key={fact.title} className={styles.fact}>
              <h3 className={styles.factTitle}>{fact.title}</h3>
              <p className={styles.muted}>{fact.body}</p>
            </li>
          ))}
        </ul>
        <div className={styles.roles}>
          <h3 className={styles.rolesTitle}>{page.roles.title}</h3>
          <ul role="list" className={`stagger ${styles.roleChips}`}>
            {page.roles.items.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand nex />
    </>
  );
}
