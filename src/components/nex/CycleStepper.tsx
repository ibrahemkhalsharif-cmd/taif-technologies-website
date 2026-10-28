import { useEffect, useId, useState, type CSSProperties } from 'react';
import { ArrowRight, CircleAlert, CircleCheck } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { useTabs } from '../../hooks/useTabs';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';
import styles from './CycleStepper.module.css';

const AUTOPLAY_MS = 5200;

/** The NEX ERP operation cycle: pick a step to see the problem it solves and how the system handles it. */
export function CycleStepper() {
  const { t } = useLanguage();
  const cycle = t.nex.cycle;
  const steps = cycle.steps;
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const id = useId();

  const choose = (index: number) => {
    setAutoplay(false); // the visitor took over
    setActive(index);
  };
  const { onKeyDown, tabRef } = useTabs(steps.length, choose);

  // Walk through the cycle on its own until the visitor interacts.
  useEffect(() => {
    if (!autoplay || !inView || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay, inView, steps.length]);

  const step = steps[active]!;
  const progress = { '--progress': active / (steps.length - 1) } as CSSProperties;

  return (
    <div
      ref={ref}
      className={styles.stepper}
      onPointerEnter={() => setAutoplay(false)}
      onFocusCapture={() => setAutoplay(false)}
    >
      <div className={styles.trackWrap}>
        <div className={styles.track} aria-hidden="true" style={progress}>
          <span />
        </div>
        <div role="tablist" aria-label={cycle.title} className={styles.tabs}>
          {steps.map((s, i) => (
            <button
              key={s.label}
              ref={tabRef(i)}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              data-state={i < active ? 'done' : i === active ? 'active' : 'todo'}
              onClick={() => choose(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className={styles.dot}>{i + 1}</span>
              <span className={styles.tabLabel}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        key={active}
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className={styles.panel}
      >
        <div className={styles.panelHead}>
          <span className={styles.bigNumber} aria-hidden="true">
            {String(active + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.panelTitle}>{step.label}</h3>
        </div>
        <div className={styles.columns}>
          <div className={styles.problem}>
            <p className={styles.columnLabel}>
              <CircleAlert size={18} aria-hidden="true" />
              {cycle.problemLabel}
            </p>
            <p>{step.problem}</p>
          </div>
          <ArrowRight className={`icon-dir ${styles.arrow}`} size={28} aria-hidden="true" />
          <div className={styles.solution}>
            <p className={styles.columnLabel}>
              <CircleCheck size={18} aria-hidden="true" />
              {cycle.solutionLabel}
            </p>
            <p>{step.solution}</p>
          </div>
        </div>
        {autoplay && inView && (
          <span
            className={styles.timer}
            aria-hidden="true"
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        )}
      </div>
    </div>
  );
}
