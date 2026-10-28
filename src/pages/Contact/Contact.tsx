import { Mail, MapPin, Phone } from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_PHONE_LINK } from '../../content/company';
import { useLanguage } from '../../i18n/context';
import { Seo } from '../../components/Seo/Seo';
import { PageHero } from '../../components/PageHero/PageHero';
import { Section } from '../../components/Section/Section';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import styles from './Contact.module.css';

export function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <>
      <Seo page="contact" />
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

      <Section>
        <div className={styles.layout}>
          <ContactForm />

          <aside className={styles.aside} aria-labelledby="next-title">
            <h2 id="next-title" className={styles.asideTitle}>
              {c.nextTitle}
            </h2>
            <ol role="list" className={styles.steps}>
              {c.nextSteps.map((step, i) => (
                <li key={step}>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <dl className={styles.details}>
              <div>
                <dt>{c.emailLabel}</dt>
                <dd>
                  <Mail size={18} aria-hidden="true" />
                  <a href={`mailto:${COMPANY_EMAIL}`} dir="ltr" className={styles.contactLink}>
                    {COMPANY_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{c.phoneLabel}</dt>
                <dd>
                  <Phone size={18} aria-hidden="true" />
                  <a href={COMPANY_PHONE_LINK} dir="ltr" className={styles.contactLink}>
                    {COMPANY_PHONE}
                  </a>
                </dd>
              </div>
              <div>
                <dt>{c.locationLabel}</dt>
                <dd>
                  <MapPin size={18} aria-hidden="true" />
                  {c.location}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
