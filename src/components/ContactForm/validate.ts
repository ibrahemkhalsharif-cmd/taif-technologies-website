import type { Dictionary } from '../../i18n/en';

export interface ContactValues {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export type ErrorKey = keyof Dictionary['contact']['form']['errors'];
export type ContactErrors = Partial<Record<keyof ContactValues, ErrorKey>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MIN_MESSAGE = 20;

export function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = 'nameRequired';

  const email = values.email.trim();
  if (!email) errors.email = 'emailRequired';
  else if (!EMAIL.test(email)) errors.email = 'emailInvalid';

  if (!values.service) errors.service = 'serviceRequired';

  const message = values.message.trim();
  if (!message) errors.message = 'messageRequired';
  else if (message.length < MIN_MESSAGE) errors.message = 'messageShort';

  return errors;
}
