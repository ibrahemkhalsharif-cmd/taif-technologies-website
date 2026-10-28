import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

type Variant = 'primary' | 'teal' | 'light' | 'outline';

interface StyleProps {
  variant?: Variant;
  size?: 'md' | 'sm';
  /** Adds a direction-aware arrow after the label. */
  arrow?: boolean;
  className?: string;
}

function classes({ variant = 'primary', size = 'md', className }: StyleProps) {
  return [styles.button, styles[variant], size === 'sm' && styles.sm, className]
    .filter(Boolean)
    .join(' ');
}

function Content({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className={`icon-dir ${styles.arrow}`} size={18} aria-hidden="true" />}
    </>
  );
}

interface ButtonLinkProps extends StyleProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

export function ButtonLink({ to, children, arrow, onClick, ...style }: ButtonLinkProps) {
  return (
    <Link to={to} className={classes(style)} onClick={onClick}>
      <Content arrow={arrow}>{children}</Content>
    </Link>
  );
}

type ButtonProps = StyleProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, arrow, className, children, ...rest }: ButtonProps) {
  return (
    <button className={classes({ variant, size, className })} {...rest}>
      <Content arrow={arrow}>{children}</Content>
    </button>
  );
}
