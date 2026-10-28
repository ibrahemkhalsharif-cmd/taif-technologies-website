import { useEffect, useId, useState, type CSSProperties } from 'react';
import {
  Building2,
  Check,
  ClipboardCheck,
  FileText,
  FolderKanban,
  ShoppingCart,
  Truck,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { useTabs } from '../../hooks/useTabs';
import { prefersReducedMotion, useInView } from '../../hooks/useInView';
import styles from './Previews.module.css';

// Illustrations of NEX ERP screens, drawn in HTML/CSS with clearly fictional sample data (brief §4, owner answers).

const TABS = ['activation', 'occupancy', 'pnl', 'ticket'] as const;
type Tab = (typeof TABS)[number];

const order = (i: number) => ({ '--i': i }) as CSSProperties;
const number = new Intl.NumberFormat('en-US');

/** Steps through 0..max one by one once started (instantly with reduced motion). */
function useSequence(max: number, start: boolean, stepMs: number, runKey = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setCount(max);
      return;
    }
    setCount(0);
    let n = 0;
    const timer = window.setInterval(() => {
      n += 1;
      setCount(n);
      if (n >= max) window.clearInterval(timer);
    }, stepMs);
    return () => window.clearInterval(timer);
  }, [max, start, stepMs, runKey]);
  return count;
}

/** Counts a number up from zero once started. */
function useCountUp(target: number, start: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / durationMs);
      setValue(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, durationMs]);
  return value;
}

/* ---------- Contract activation ---------- */

const OUTPUT_ICONS = [ShoppingCart, FileText, FolderKanban, Truck, Wrench];

function ActivationPreview({ start }: { start: boolean }) {
  const { t } = useLanguage();
  const a = t.nex.previews.activation;
  const [run, setRun] = useState(0);
  const shown = useSequence(a.outputs.length + 1, start, 420, run);
  const activated = shown > 0;

  return (
    <div className={styles.activation}>
      <div className={styles.contractCard}>
        <span className={styles.docNumber} dir="ltr">
          {a.number}
        </span>
        <p className={styles.contractName}>{a.contract}</p>
        <p className={styles.muted}>{a.type}</p>
        <button
          type="button"
          className={styles.activateButton}
          data-done={activated ? '' : undefined}
          onClick={() => setRun((r) => r + 1)}
          aria-label={activated ? `${a.done}. ${a.replay}` : a.button}
        >
          {activated ? (
            <>
              <Check size={18} aria-hidden="true" /> {a.done}
            </>
          ) : (
            a.button
          )}
        </button>
        {activated && <span className={styles.replayHint}>{a.replay} ↻</span>}
      </div>

      <ul role="list" className={styles.outputs}>
        {a.outputs.map((output, i) => {
          const Icon = OUTPUT_ICONS[i]!;
          return (
            <li key={output} className={styles.output} data-shown={shown > i + 1 ? '' : undefined}>
              <span className={styles.outputIcon}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <span>{output}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------- Occupancy board ---------- */

type Status = 'rented' | 'reserved' | 'blocked' | 'vacant';
const FLOORS: Status[][] = [
  ['rented', 'rented', 'vacant', 'rented', 'reserved', 'rented'],
  ['rented', 'blocked', 'rented', 'rented', 'vacant', 'rented'],
  ['reserved', 'rented', 'rented', 'vacant', 'rented', 'blocked'],
];

function OccupancyPreview({ start }: { start: boolean }) {
  const { t } = useLanguage();
  const o = t.nex.previews.occupancy;

  return (
    <div className={styles.occupancy}>
      <div className={styles.boardHead}>
        <Building2 size={20} aria-hidden="true" />
        <span>{o.building}</span>
      </div>
      <div className={styles.floors} data-start={start ? '' : undefined}>
        {FLOORS.map((units, f) => {
          const floor = FLOORS.length - f;
          return (
            <div key={floor} className={styles.floor}>
              <span className={styles.floorLabel}>
                {o.floor} <span dir="ltr">{floor}</span>
              </span>
              <div className={styles.units}>
                {units.map((status, u) => (
                  <span
                    key={u}
                    className={styles.unit}
                    data-status={status}
                    style={order(f * 6 + u)}
                    title={`${String.fromCharCode(65 + f)}-${u + 1} · ${o.statuses[status]}`}
                  >
                    <span dir="ltr">
                      {String.fromCharCode(65 + f)}-{u + 1}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ul role="list" className={styles.legend}>
        {(Object.keys(o.statuses) as Status[]).map((status) => (
          <li key={status}>
            <span className={styles.swatch} data-status={status} aria-hidden="true" />
            {o.statuses[status]}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Project P&L ---------- */

const PNL = {
  contractValue: 120000,
  invoiced: 48000,
  actualCost: 61500,
  completion: 55,
  margin: 24,
};

function PnlPreview({ start }: { start: boolean }) {
  const { t } = useLanguage();
  const p = t.nex.previews.pnl;
  const contract = useCountUp(PNL.contractValue, start);
  const invoiced = useCountUp(PNL.invoiced, start);
  const cost = useCountUp(PNL.actualCost, start);
  const completion = useCountUp(PNL.completion, start);
  const margin = useCountUp(PNL.margin, start);

  const rows: [string, string][] = [
    [p.contractValue, number.format(contract)],
    [p.invoiced, number.format(invoiced)],
    [p.actualCost, number.format(cost)],
  ];

  return (
    <div className={styles.pnl}>
      <div className={styles.pnlHead}>
        <p className={styles.pnlTitle}>{p.title}</p>
        <p className={styles.muted} dir="auto">
          {p.project}
        </p>
      </div>
      <dl className={styles.pnlRows}>
        {rows.map(([label, value]) => (
          <div key={label} className={styles.pnlRow}>
            <dt>{label}</dt>
            <dd dir="ltr">{value}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.progressBlock}>
        <div className={styles.pnlRow}>
          <span>{p.completion}</span>
          <span dir="ltr" className={styles.strong}>
            {completion}%
          </span>
        </div>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ transform: `scaleX(${completion / 100})` }} />
        </div>
      </div>
      <div className={styles.margin}>
        <span>{p.margin}</span>
        <span dir="ltr">{margin}%</span>
      </div>
    </div>
  );
}

/* ---------- Ticket & checklist ---------- */

function TicketPreview({ start }: { start: boolean }) {
  const { t } = useLanguage();
  const k = t.nex.previews.ticket;
  const done = useSequence(k.items.length + 1, start, 650);
  const signed = done > k.items.length;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHead}>
        <span className={styles.docNumber} dir="ltr">
          {k.number}
        </span>
        <span className={styles.priority}>{k.priority}</span>
      </div>
      <p className={styles.ticketTitle}>{k.title}</p>
      <p className={styles.muted}>
        {k.technicianLabel}: <strong className={styles.strong}>{k.technician}</strong>
      </p>

      <p className={styles.checklistTitle}>
        <ClipboardCheck size={18} aria-hidden="true" />
        {k.checklistTitle}
      </p>
      <ul role="list" className={styles.checklist}>
        {k.items.map((item, i) => (
          <li key={item} data-done={done > i ? '' : undefined}>
            <span className={styles.checkbox} aria-hidden="true">
              <Check size={14} />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.signoff} data-signed={signed ? '' : undefined}>
        <span className={styles.signLabel}>{k.signoff}</span>
        <svg viewBox="0 0 220 50" className={styles.signature} aria-hidden="true">
          <path
            d="M6 34 C 22 6, 34 46, 48 24 S 70 12, 80 30 C 88 44, 98 14, 112 22 S 140 40, 152 18 C 160 6, 170 40, 186 26 S 206 20, 214 24"
            pathLength={1}
          />
        </svg>
        <span className={styles.muted}>{k.signoffHint}</span>
      </div>
    </div>
  );
}

/* ---------- Tabs ---------- */

/** Four illustrated NEX ERP screens behind tabs, in an app-like frame. */
export function Previews() {
  const { t } = useLanguage();
  const pv = t.nex.previews;
  const [active, setActive] = useState<Tab>('activation');
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const id = useId();
  const { onKeyDown, tabRef } = useTabs(TABS.length, (i) => setActive(TABS[i]!));

  return (
    <div ref={ref} className={styles.previews}>
      <div role="tablist" aria-label={pv.title} className={styles.tabs}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={tabRef(i)}
            type="button"
            role="tab"
            id={`${id}-${tab}`}
            aria-selected={tab === active}
            aria-controls={`${id}-panel`}
            tabIndex={tab === active ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(tab)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {pv.tabs[tab]}
          </button>
        ))}
      </div>

      <div className={styles.window}>
        <div className={styles.chrome}>
          <span className={styles.chromeName} dir="ltr">
            NEX ERP
          </span>
          <span className={styles.chromeTab}>{pv.tabs[active]}</span>
          <span className={styles.badge}>{pv.note}</span>
        </div>
        <div
          key={active}
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-${active}`}
          className={styles.screen}
        >
          {active === 'activation' && <ActivationPreview start={inView} />}
          {active === 'occupancy' && <OccupancyPreview start={inView} />}
          {active === 'pnl' && <PnlPreview start={inView} />}
          {active === 'ticket' && <TicketPreview start={inView} />}
        </div>
      </div>
    </div>
  );
}

/** The occupancy board on its own, in the same app frame (real estate sections). */
export function OccupancyBoard() {
  const { t } = useLanguage();
  const pv = t.nex.previews;
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={styles.window}>
      <div className={styles.chrome}>
        <span className={styles.chromeName} dir="ltr">
          NEX ERP
        </span>
        <span className={styles.chromeTab}>{pv.tabs.occupancy}</span>
        <span className={styles.badge}>{pv.note}</span>
      </div>
      <div className={styles.screen}>
        <OccupancyPreview start={inView} />
      </div>
    </div>
  );
}
