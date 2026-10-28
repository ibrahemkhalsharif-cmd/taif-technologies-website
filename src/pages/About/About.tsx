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

export function About() {
  const { t, path } = useLanguage();
  const a = t.about;

  return (
    <>
      <Seo page="about" />
      <PageHero eyebrow={a.eyebrow} title={a.title} lead={withBrand(a.lead)} />

      <Section labelledBy="name-title">
        <div className={`stagger ${styles.nameLayout}`}>
          <h2 id="name-title" className={styles.nameTitle}>
            {a.nameTitle}
          </h2>
          <div className={`stagger ${styles.nameText}`}>
            {a.nameBody.map((p) => (
              <p key={p} className={styles.paragraph}>
                {p}
              </p>
            ))}
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
