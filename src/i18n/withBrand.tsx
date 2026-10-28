import { Fragment, type ReactNode } from 'react';

/** Replaces "{brand}" in a translated string with the brand name, isolated as Latin text. */
export function withBrand(text: string): ReactNode {
  const parts = text.split('{brand}');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <span className="brand-name" lang="en" dir="ltr">
          Taif Technologies
        </span>
      )}
    </Fragment>
  ));
}
