import type { ReactNode } from 'react';
import { BandLines } from '../SpectrumLines/SpectrumLines';
import styles from './PageHero.module.css';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  children?: ReactNode;
}

/** Navy opening band for inner pages. The header turns navy over it. */
export function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section data-tone="navy" data-header-dark className={styles.hero} aria-labelledby="page-title">
      <BandLines className={styles.lines} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.lead}>{lead}</p>
        {children}
      </div>
    </section>
  );
}
