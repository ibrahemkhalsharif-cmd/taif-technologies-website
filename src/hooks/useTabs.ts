import { useRef, type KeyboardEvent } from 'react';
import { useLanguage } from '../i18n/context';

/**
 * Keyboard support for a tablist (WAI-ARIA tabs pattern): arrow keys move between tabs,
 * mirrored in RTL, and Home / End jump to the first or last tab.
 */
export function useTabs(count: number, onSelect: (index: number) => void) {
  const { dir } = useLanguage();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number) => {
    const next = (index + count) % count;
    onSelect(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const forward = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
    const back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
    if (event.key === forward) select(index + 1);
    else if (event.key === back) select(index - 1);
    else if (event.key === 'Home') select(0);
    else if (event.key === 'End') select(count - 1);
    else return;
    event.preventDefault();
  };

  const tabRef = (index: number) => (el: HTMLButtonElement | null) => {
    tabs.current[index] = el;
  };

  return { onKeyDown, tabRef };
}
