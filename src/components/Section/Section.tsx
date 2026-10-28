import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import styles from './Section.module.css';

export type Tone = 'white' | 'cream' | 'navy';

interface SectionProps {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ tone = 'white', id, labelledBy, className, children }: SectionProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id={id}
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={[styles.section, className].filter(Boolean).join(' ')}
    >
      <div ref={ref} className="container">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  titleId?: string;
  lead?: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  lead,
  as: Heading = 'h2',
  className,
}: SectionHeaderProps) {
  return (
    <header className={['stagger', styles.header, className].filter(Boolean).join(' ')}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <Heading id={titleId} className={Heading === 'h1' ? styles.titleLarge : styles.title}>
        {title}
      </Heading>
      {lead && <p className={styles.lead}>{lead}</p>}
    </header>
  );
}
