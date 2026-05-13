/**
 * publications.ts – Manually curated, properly formatted publication list.
 * Edit this file directly when adding or updating publications.
 * Types: "article" | "book" | "report" | "wip"
 */

export interface Pub {
  authors: string;
  year: string;
  title: string;
  venue: string;
  details?: string;
  note?: string;
  type: 'article' | 'book' | 'report' | 'wip';
}

export const publications: Pub[] = [
  // ── Peer-reviewed articles ─────────────────────────────────────────────
  {
    authors: 'Kong, Seonju, Seungji Lee, Young Hoon Song, and Sanghoon Park.',
    year: '2025',
    title: 'Motivations for Humanitarian Assistance Activists\u2019 Participation in Public Education in South Korea.',
    venue: 'Korean Journal of International Migration',
    details: '12(2): 147\u2013174.',
    note: 'Published in Korean.',
    type: 'article',
  },

  // ── Books ──────────────────────────────────────────────────────────────
  {
    authors: 'Lee, Seungji, Seonju Kong, Solbi Jeon, Minkyung Oro, and Yukyung Lee.',
    year: '2024',
    title: 'We Want to Dance But Our Houses Are Too Small: The Story of Shanti-Khana, A Women\u2019s Community Space in a Rohingya Refugee Camp.',
    venue: 'Fascicles.',
    type: 'book',
  },

  // ── Reports ────────────────────────────────────────────────────────────
  {
    authors: 'Asian Dignity Initiative.',
    year: '2024',
    title: 'Psychosocial Support Project for Rohingya and Host Community Women; Resilience Building, Phase 5 (2022\u20132024) \u2013 Baseline Assessment Report, Project Evaluation Report.',
    venue: 'ReliefWeb.',
    note: 'Contributing author.',
    type: 'report',
  },
  {
    authors: 'Asian Dignity Initiative.',
    year: '2024',
    title: 'Operations Manual of Multipurpose Women\u2019s Healing Center (MWHC) in Rohingya Refugee Camps.',
    venue: 'ReliefWeb.',
    note: 'Contributing author.',
    type: 'report',
  },
  {
    authors: 'Asian Dignity Initiative.',
    year: '2021',
    title: 'Stories from Shanti Khana.',
    venue: 'ReliefWeb.',
    note: 'Contributing author.',
    type: 'report',
  },
];

export const workInProgress: Pub[] = [
  {
    authors: 'Lee, Seungji, Sanghoon Park, Yoojin Lim, and Young Hoon Song.',
    year: '2025',
    title: 'Thriving in Confinement: What Enables Rohingya Refugee Women\u2019s Economic Empowerment in Cox\u2019s Bazar.',
    venue: '',
    note: 'Under review.',
    type: 'wip',
  },
];
