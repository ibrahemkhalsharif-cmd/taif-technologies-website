import { useLanguage } from '../../i18n/context';
import { Seo } from '../../components/Seo/Seo';
import { Section, SectionHeader } from '../../components/Section/Section';
import { ButtonLink } from '../../components/Button/Button';
import styles from './NotFound.module.css';

export function NotFound() {
  const { t, path } = useLanguage();
  return (
    <>
      <Seo page="notFound" noIndex />
      <Section tone="cream">
        <div className={styles.inner}>
          <SectionHeader as="h1" eyebrow="404" title={t.notFound.title} lead={t.notFound.body} />
          <ButtonLink to={path('/')} arrow>
            {t.notFound.home}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
