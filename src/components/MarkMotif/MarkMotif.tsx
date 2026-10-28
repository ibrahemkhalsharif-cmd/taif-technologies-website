import styles from './MarkMotif.module.css';

/**
 * Oversized, faint outline of the t, as on the cover of the brand guide (v1.0).
 * Same geometry as the official taif-mark.svg, drawn tone-on-tone as background decoration.
 * Never mirrored, never used as the logo itself.
 */
export function MarkMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="10 6 44 50"
      className={[styles.motif, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M28 13 V40 Q28 50 38 50 H42" />
      <path d="M17 25 H20" />
      <path d="M36 25 H46" />
    </svg>
  );
}
