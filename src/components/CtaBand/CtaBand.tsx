import { useLanguage } from '../../i18n/context';
import { useReveal } from '../../hooks/useReveal';
import { ButtonLink } from '../Button/Button';
import { BandLines } from '../SpectrumLines/SpectrumLines';
import styles from './CtaBand.module.css';

/** Closing call to action, shared by every page. */
export function CtaBand() {
  const { t, path } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section data-tone="navy" aria-labelledby="cta-title" className={styles.band}>
      <BandLines className={styles.lines} />
      <div ref={ref} className={`container stagger ${styles.inner}`}>
        <div className={styles.arms} aria-hidden="true">
          <span />
          <span />
        </div>
        <h2 id="cta-title" className={styles.title}>
          {t.cta.title}
        </h2>
        <p className={styles.body}>{t.cta.body}</p>
        <ButtonLink to={path('/contact')} variant="light" arrow className={styles.button}>
          {t.cta.button}
        </ButtonLink>
      </div>
    </section>
  );
}
