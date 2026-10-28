import { useLanguage } from '../../i18n/context';
import styles from './TraitList.module.css';

/** The three brand personality traits from the guide. */
export function TraitList() {
  const { t } = useLanguage();
  return (
    <ul role="list" className={styles.list}>
      {t.traits.map((trait, i) => (
        <li key={trait.title} className={styles.item}>
          <span className={styles.index} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.title}>{trait.title}</h3>
          <p className={styles.body}>{trait.body}</p>
        </li>
      ))}
    </ul>
  );
}
