import mark from '../../assets/logos/taif-mark.svg';
import { useLanguage } from '../../i18n/context';
import { withBrand } from '../../i18n/withBrand';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import { TraitList } from '../../components/TraitList/TraitList';
import { CtaBand } from '../../components/CtaBand/CtaBand';
import { MarkMotif } from '../../components/MarkMotif/MarkMotif';
import styles from './About.module.css';

const MARK_PARTS = ['stem', 'teal', 'orange'] as const;

export function About() {
  const { t, path } = useLanguage();
  const a = t.about;

  return (
    <>
      <Seo page="about" />
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={withBrand(a.lead)} />

      <Section labelledBy="name-title">
        <div className={styles.nameLayout}>
          <div className={styles.nameText}>
            <h2 id="name-title" className={styles.nameTitle}>
              {a.nameTitle}
            </h2>
            {a.nameBody.map((p) => (
              <p key={p} className={styles.paragraph}>
                {p}
              </p>
            ))}
          </div>

          <div className={styles.markPanel} data-tone="cream">
            <img src={mark} alt={a.markAlt} width={96} height={96} className={styles.mark} />
            <div className={styles.markCaption}>
              <h3 className={styles.markTitle}>{a.markTitle}</h3>
              <p className={styles.markLead}>{a.markLead}</p>
            </div>
            <dl className={styles.markList}>
              {a.markItems.map((item, i) => (
                <div key={item.label} className={styles.markItem} data-part={MARK_PARTS[i]}>
                  <dt>{item.label}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="navy" labelledBy="traits-title" className={styles.traitsSection}>
        <MarkMotif />
        <div className={styles.traitsHeader}>
          <SectionHeader titleId="traits-title" eyebrow={a.traitsEyebrow} title={a.traitsTitle} />
        </div>
        <TraitList />
      </Section>

      <Section labelledBy="about-promise">
        <div className={styles.promise}>
          <p className={styles.promiseEyebrow}>{a.promiseEyebrow}</p>
          <p id="about-promise" className={styles.promiseText}>
            {t.promise.title}
          </p>
          <div className={styles.promiseActions}>
            <ButtonLink to={path('/services')} arrow>
              {a.toServices}
            </ButtonLink>
            <ButtonLink to={path('/contact')} variant="outline">
              {a.toContact}
            </ButtonLink>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
