# Taif Technologies website

Bilingual (Arabic default, English) company website for Taif Technologies.
Front end only: Vite + React 19 + TypeScript, CSS Modules with design tokens, React Router.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Other scripts: `npm run build` (type-check + production build into `dist/`), `npm run preview`,
`npm run lint`, `npm run lint:css`, `npm run format`.

## Structure

```
docs/brand/            Brand packs: original guide/logos/seals, plus v1.0-2026-10/ (PDF guide v1.0,
                       templates, colour files). Source of truth for visual decisions.
public/                favicon (taif-mark.svg), robots.txt, SPA redirects for Netlify (_redirects)
src/
  styles/              tokens.css (palette, scales, surface tones), fonts.css, base.css
  i18n/                ar.ts / en.ts (all copy), LanguageProvider, path helpers
  content/services.ts  service ids and icons
  components/          Header, MobileMenu, Footer, Section, PageHero, Button, Logo,
                       SpectrumVisual, TraitList, ProcessSteps, CtaBand, ContactForm, Seo
  pages/               Home, About, Services, Contact, NotFound
```

## Routes

| Arabic (default) | English |
|---|---|
| `/` | `/en` |
| `/about` | `/en/about` |
| `/services` (anchors `#software`, `#consulting`, `#custom`, `#hardware`) | `/en/services` |
| `/contact` (accepts `?service=<id>` to preselect) | `/en/contact` |

The language switch links to the same page in the other language. `<html lang dir>` is set before
first paint (index.html) and by `LanguageProvider`.

## Design decisions

- **Colours** come only from the brand guide, defined once in `src/styles/tokens.css`. Components use
  semantic tokens (`--text`, `--text-muted`, `--link`, `--border`…). A section with `data-tone="white" |
  "cream" | "navy"` redefines them, so content inside stays readable automatically.
- **Contrast** (checked): navy/white 17.2, teal/white 4.85, cream/navy 15.0, orange/navy 6.2,
  slate/white 7.5. Teal on cream (4.2) and teal on navy (3.5) are too low for body text, so links are
  navy on cream sections and `#3FB8A3` on navy (the light teal used in the official reverse logo).
  Orange is never text on light backgrounds; text on teal buttons is white.
- **Orange is kept rare**: the consulting line in the hero visual, step numbers on navy, the small
  arm accents in the call-to-action band and page heroes.
- **Logo**: official SVGs only, never recoloured or mirrored (the orange arm stays left in Arabic too).
  Header uses `taif-logo.svg` at 120px (minimum is 110px), footer uses `taif-logo-reverse.svg`, the
  favicon and the hero visual use the mark. The header height leaves the required clear space
  (half the mark height). The seal is not used.
- **Brand name** stays "Taif Technologies" in Latin script in both languages, set in Poppins and
  isolated from the Arabic text direction.
- **Typography**: Poppins 400/500/700 (English), Tajawal 400/500/700/800 (Arabic). Arabic line-height
  1.75 for body and 1.35 for headings. Both fonts are the brand-pack files converted to `.woff2`
  (Poppins ~51 KB, Tajawal ~20 KB per weight); the original `.ttf` files are in `docs/brand/Fonts`.
- **Brand guide v1.0 details**: secondary buttons use the template's light cream-grey border; the hero
  strip is the business card's short-orange / long-teal bar; English labels use spaced capitals as on
  the card and letterhead; the oversized faint t from the guide cover appears once (About page).
  Approved sample copy from the guide ("Software that grows with you", "Digital transformation for
  businesses") is used on Home and Services.
- **RTL**: only logical CSS properties (`margin-inline-start`, `inset-inline-end`…), enforced by
  Stylelint (`csstools/use-logical`). Directional icons use `.icon-dir`; the hero lines mirror via
  `--dir`.
- **No red exists in the palette**, so form errors use a message with an icon, a thicker navy border and
  an orange start edge rather than colour alone.
- **Process section** is presented as a typical path, not a contractual commitment.

## Missing company information

The brand materials do not include these, so the site does not show them. Please provide:

- Phone number and email address (the brand templates only have placeholders)
- A street address, if one should be shown (the site shows only "Ramallah", per review feedback)
- Social media links
- The public domain (set `VITE_SITE_URL` to enable canonical and hreflang links, then add a
  `sitemap.xml`)
- Real photography of the team or office, if wanted (none is used; the brand guide forbids fabricated
  photos)

## Contact form integration (required before launch)

The form validates input in both languages but **does not send anything until an endpoint is set**.
Without one, it tells the visitor that online sending is not connected yet; it never shows a false
success message.

1. Create an endpoint that accepts a JSON POST, e.g. a Formspree form, a Netlify Function, or the
   company's own API. Body sent:
   `{ "name", "email", "company", "service", "message", "language" }`
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT=<url>`.
3. Rebuild. A 2xx response shows the success message; anything else shows a retry message.

## Deploying

Any static host works. `public/_redirects` (Netlify) and `vercel.json` (Vercel) send every path to
`index.html` so deep links like `/en/services` load correctly.
