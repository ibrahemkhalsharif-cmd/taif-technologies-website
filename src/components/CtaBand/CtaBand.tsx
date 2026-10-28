import { useLanguage } from '../../i18n/context';
import { useReveal } from '../../hooks/useReveal';
import { ButtonLink } from '../Button/Button';
import { BandLines } from '../SpectrumLines/SpectrumLines';
import styles from './CtaBand.module.css';

/** Closing call to action, shared by every page. `nex` switches it to the NEX ERP demo request. */
export function CtaBand({ nex = false }: { nex?: boolean }) {
  const { t, path } = useLanguage();
  const copy = nex ? t.nex.cta : t.cta;
  const to = nex ? `${path('/contact')}?service=nex` : path('/contact');
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
          {copy.title}
        </h2>
        <p className={styles.body}>{copy.body}</p>
        <ButtonLink to={to} variant="light" arrow className={styles.button}>
          {copy.button}
        </ButtonLink>
      </div>
    </section>
  );
}
