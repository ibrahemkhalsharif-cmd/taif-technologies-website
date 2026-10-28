import logo from '../../assets/logos/taif-logo.svg';
import logoReverse from '../../assets/logos/taif-logo-reverse.svg';

const RATIO = 64 / 186; // official artwork proportions; never stretched

interface LogoProps {
  /** "reverse" for navy or dark backgrounds. */
  variant?: 'default' | 'reverse';
  /** Rendered width in px. The brand minimum on screen is 110px. */
  width?: number;
  className?: string;
}

export function Logo({ variant = 'default', width = 120, className }: LogoProps) {
  const safeWidth = Math.max(width, 110);
  return (
    <img
      src={variant === 'reverse' ? logoReverse : logo}
      alt="Taif Technologies"
      width={safeWidth}
      height={Math.round(safeWidth * RATIO)}
      className={className}
      decoding="async"
    />
  );
}
