/**
 * site.ts – Manual site-wide configuration.
 *
 * Edit these values to match your profile.
 * Generated content (publications, work-in-progress, etc.) comes from
 * src/generated/cv-data.json, which is produced by scripts/cv/parse_docx.py.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const siteConfig = {
  /** Your full name as it should appear in the browser tab and headings. */
  name: 'Seungji Lee',

  /** Short tagline shown in the browser title and meta description. */
  tagline: 'Humanitarian Professional & Researcher · Kangwon National University',

  /** Path to the downloadable/embeddable PDF CV (relative to /public). */
  cvUrl: `${basePath}/cv.pdf`,

  /** Path to your profile photo (relative to /public). */
  headshotUrl: `${basePath}/headshot.png`,

  /** GitHub Pages or custom domain URL (no trailing slash). */
  siteUrl: 'https://Seungji-Biva-Lee.github.io/cvtowebsite',

  /** Email address shown in the footer and contact section. */
  email: 'lsj2020kr@gmail.com',

  /** Optional external profile links. Set to empty string to hide. */
  links: {
    googleScholar: '',
    orcid: '',
    twitter: '',
    github: '',
  },

  /** Navigation items. */
  nav: [
    { label: 'Research', href: '/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'CV', href: '/cv/' },
  ],
};
