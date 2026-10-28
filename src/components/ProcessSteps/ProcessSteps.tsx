import { useLanguage } from '../../i18n/context';
import styles from './ProcessSteps.module.css';

/** A suggested working path, not a contractual process. */
export function ProcessSteps() {
  const { t } = useLanguage();
  return (
    <div className={styles.wrap}>
      {/* One continuous line behind the steps; it draws itself as the section scrolls into view */}
      <div className={styles.track} aria-hidden="true">
        <span className={styles.fill} />
      </div>
      <ol role="list" className={styles.steps}>
        {t.process.steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.body}>{step.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
