import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { AlertCircle, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import { useLanguage } from '../../i18n/context';
import { SERVICE_IDS, isContactOption, type ServiceId } from '../../content/services';
import { Button } from '../Button/Button';
import { validate, type ContactErrors, type ContactValues } from './validate';
import styles from './ContactForm.module.css';

// Where submissions go. Without it the form validates but tells the visitor it cannot send (see README).
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

type Status = 'idle' | 'sending' | 'success' | 'failure' | 'unavailable';
const FIELD_ORDER: (keyof ContactValues)[] = ['name', 'email', 'service', 'message'];

export function ContactForm() {
  const { t, lang } = useLanguage();
  const f = t.contact.form;
  const [params] = useSearchParams();
  const requested = params.get('service');

  const empty: ContactValues = {
    name: '',
    email: '',
    company: '',
    service: isContactOption(requested) ? requested : '',
    message: '',
  };
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (attempted) setErrors(validate(next)); // live feedback only after the first submit
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const found = validate(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      const el = formRef.current?.elements.namedItem(firstInvalid);
      if (el instanceof HTMLElement) el.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus('unavailable');
      return;
    }

    // Send the service's name, as the visitor saw it in the list, not its id
    const service =
      values.service === 'nex'
        ? f.serviceNex
        : values.service === 'unsure'
          ? f.serviceUnsure
          : t.services[values.service as ServiceId].title;

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, service, language: lang }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('success');
      setValues({ ...empty, service: '' });
      setAttempted(false);
    } catch {
      setStatus('failure');
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      ref={formRef}
      className={styles.form}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className={styles.title}>
        {f.title}
      </h2>

      {attempted && hasErrors && (
        <p className={styles.summary} role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          {f.errorSummary}
        </p>
      )}

      <div className={styles.grid}>
        <Field name="name" label={f.name} error={errors.name && f.errors[errors.name]}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={update}
            />
          )}
        </Field>

        <Field name="email" label={f.email} error={errors.email && f.errors[errors.email]}>
          {(props) => (
            <input
              {...props}
              type="email"
              dir="ltr"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={update}
            />
          )}
        </Field>

        <Field name="company" label={f.company} optional={f.optional}>
          {(props) => (
            <input
              {...props}
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={update}
            />
          )}
        </Field>

        <Field name="service" label={f.service} error={errors.service && f.errors[errors.service]}>
          {(props) => (
            <div className={styles.selectWrap}>
              <select {...props} value={values.service} onChange={update}>
                <option value="" disabled>
                  {f.servicePlaceholder}
                </option>
                <option value="nex">{f.serviceNex}</option>
                {SERVICE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t.services[id].title}
                  </option>
                ))}
                <option value="unsure">{f.serviceUnsure}</option>
              </select>
              <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
            </div>
          )}
        </Field>

        <Field
          name="message"
          label={f.message}
          hint={f.messageHint}
          error={errors.message && f.errors[errors.message]}
          wide
        >
          {(props) => <textarea {...props} rows={6} value={values.message} onChange={update} />}
        </Field>
      </div>

      <div className={styles.footer}>
        <Button type="submit" variant="teal" arrow disabled={status === 'sending'}>
          {status === 'sending' ? f.sending : f.submit}
        </Button>

        <div role="status" aria-live="polite">
          {status === 'success' && (
            <p className={`${styles.notice} ${styles.success}`}>
              <CheckCircle2 size={20} aria-hidden="true" />
              {f.success}
            </p>
          )}
          {(status === 'failure' || status === 'unavailable') && (
            <p className={`${styles.notice} ${styles.warning}`}>
              <Info size={20} aria-hidden="true" />
              {status === 'failure' ? f.failure : f.unavailable}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

interface FieldProps {
  name: keyof ContactValues;
  label: string;
  optional?: string;
  hint?: string;
  error?: string;
  wide?: boolean;
  children: (props: {
    id: string;
    name: string;
    required: boolean;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
    className?: string;
  }) => ReactNode;
}

function Field({ name, label, optional, hint, error, wide, children }: FieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={[styles.field, wide && styles.wide].filter(Boolean).join(' ')}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> ({optional})</span>}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {children({
        id,
        name,
        required: !optional,
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
        className: styles.control,
      })}
      {error && (
        <p id={errorId} className={styles.error}>
          <AlertCircle size={16} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
