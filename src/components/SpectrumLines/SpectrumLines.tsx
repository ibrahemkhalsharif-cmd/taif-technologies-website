import { useEffect, useRef, type CSSProperties } from 'react';
import markReverse from '../../assets/logos/taif-mark-reverse.svg';
import styles from './SpectrumLines.module.css';

// Brand illustration rule (guide §5): rounded lines of one thickness, the curve of the t,
// short orange and teal accents. Mostly quiet cream lines, with the service colours picked out.
// Each line carries a travelling pulse, so the drawing "pumps" into the mark.

const ACCENTS: Record<number, string> = {
  2: 'software',
  4: 'consulting',
  7: 'custom',
  9: 'hardware',
};

interface Line {
  d: string;
  accent?: string;
  quiet: number;
}

const HERO_LINES: Line[] = Array.from({ length: 12 }, (_, i) => {
  const y = -90 + i * 70;
  const end = 300 + (y - 300) * 0.04;
  return {
    d: `M -1100 ${y} C -380 ${y}, 40 ${300 + (y - 300) * 0.42}, 336 ${end}`,
    accent: ACCENTS[i],
    quiet: (i % 3) + 1,
  };
});

const BAND_LINES: Line[] = Array.from({ length: 11 }, (_, i) => {
  const y = 10 + i * 38;
  return {
    d: `M -200 200 C 260 200, 420 ${y}, 1300 ${y}`,
    accent: ACCENTS[i],
    quiet: (i % 3) + 1,
  };
});

/** Draw order, plus pulse timing that varies per line so the pulses never march in step. */
function timing(i: number, start: number): CSSProperties {
  return {
    '--i': i,
    '--pulse-duration': `${2.4 + (i % 4) * 0.55}s`,
    '--pulse-delay': `${start + ((i * 0.37) % 2.2)}s`,
  } as CSSProperties;
}

/** Pauses the looping animations while the drawing is off screen. */
function usePauseOffscreen<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      el.toggleAttribute('data-paused', !entry?.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function LineSet({ lines, pulseStart }: { lines: Line[]; pulseStart: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <path
          key={`line-${i}`}
          d={line.d}
          pathLength={1}
          className={line.accent ? styles.accent : styles.quiet}
          data-service={line.accent}
          data-quiet={line.quiet}
          style={timing(i, pulseStart)}
        />
      ))}
      {lines.map((line, i) => (
        <path
          key={`pulse-${i}`}
          d={line.d}
          pathLength={1}
          className={line.accent ? styles.pulseAccent : styles.pulse}
          data-service={line.accent}
          style={timing(i, pulseStart)}
        />
      ))}
    </>
  );
}

/** Many lines flowing into one point: the official mark. Decorative. */
export function HeroLines() {
  const ref = usePauseOffscreen<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={styles.hero}
      viewBox="0 0 600 600"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Lines stay faint where they pass behind the headline and reach full strength at the mark */}
        <linearGradient id="hero-lines-fade" gradientUnits="userSpaceOnUse" x1="-650" x2="180">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask
          id="hero-lines-mask"
          maskUnits="userSpaceOnUse"
          x="-1200"
          y="-300"
          width="1900"
          height="1200"
        >
          <rect x="-1200" y="-300" width="1900" height="1200" fill="url(#hero-lines-fade)" />
        </mask>
      </defs>
      {/* Ripples sent out by the mark on each beat */}
      <circle cx="400" cy="300" r="72" className={styles.ripple} />
      <circle cx="400" cy="300" r="72" className={`${styles.ripple} ${styles.rippleLate}`} />
      <g mask="url(#hero-lines-mask)">
        <LineSet lines={HERO_LINES} pulseStart={2.2} />
      </g>
      {/* The single beam continues past the mark and bends down, like the stem of the t */}
      <path d="M 464 300 H 506 Q 546 300 546 340 V 760" pathLength={1} className={styles.beam} />
      <path
        d="M 464 300 H 506 Q 546 300 546 340 V 760"
        pathLength={1}
        className={styles.beamPulse}
      />
      <image href={markReverse} x="336" y="236" width="128" height="128" className={styles.mark} />
    </svg>
  );
}

/** One line splitting into the spectrum, for page openings and the closing band. Decorative. */
export function BandLines({ className }: { className?: string }) {
  const ref = usePauseOffscreen<SVGSVGElement>();
  return (
    <svg
      ref={ref}
      className={[styles.band, className].filter(Boolean).join(' ')}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <LineSet lines={BAND_LINES} pulseStart={1.6} />
    </svg>
  );
}
