import {
  Building2,
  ChartColumn,
  Landmark,
  Package,
  Printer,
  UserCog,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import styles from './ModulesGrid.module.css';

// Same order as the module groups in the brief (§2).
const ICONS: LucideIcon[] = [
  Workflow,
  Building2,
  Users,
  Package,
  Landmark,
  UserCog,
  ChartColumn,
  Printer,
];

/** The NEX ERP module groups. The first two (operations, real estate) are the core story and stand out. */
export function ModulesGrid() {
  const { t } = useLanguage();
  return (
    <ul role="list" className={`stagger ${styles.grid}`}>
      {t.nex.modules.groups.map((group, i) => {
        const Icon = ICONS[i]!;
        return (
          <li key={group.name} className={styles.item} data-core={i < 2 ? '' : undefined}>
            <span className={styles.icon}>
              <Icon size={22} aria-hidden="true" />
            </span>
            <h3 className={styles.name}>{group.name}</h3>
            <p className={styles.body}>{group.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
