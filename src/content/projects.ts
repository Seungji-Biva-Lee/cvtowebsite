/**
 * projects.ts – Manually maintained project list.
 * Edit this file to add, update, or remove projects.
 */

export interface Project {
  title: string;
  country: string;
  sector: 'Research' | 'Humanitarian Assistance' | 'Health' | 'Social Welfare';
  years: string;
  funder: string;
  highlight?: string;
}

export const projects: Project[] = [
  {
    title: 'Sustainable Livelihoods and Refugee Field Research in Thailand',
    country: 'Thailand',
    sector: 'Research',
    years: '2025',
    funder: 'Bongong Foundation',
  },
  {
    title: 'KOICA Public-Private Partnership Incubating Program Field Research in Bangladesh',
    country: 'Bangladesh',
    sector: 'Research',
    years: '2025',
    funder: 'KOICA',
  },
  {
    title: 'Psychosocial Support ODA Project for Rohingya Refugees in Bangladesh',
    country: 'Bangladesh',
    sector: 'Humanitarian Assistance',
    years: '2021–2024',
    funder: 'KOICA',
    highlight: 'KOICA External Evaluation: 19.5/20 — Grade A (Highly Successful)',
  },
  {
    title: "Rohingya Refugee Women's Livelihood Support Project in Bangladesh",
    country: 'Bangladesh',
    sector: 'Humanitarian Assistance',
    years: '2023–2024',
    funder: 'Jesuitenweltweit',
  },
  {
    title: 'Livelihood Support for North Korean Women and Children in China',
    country: 'China',
    sector: 'Social Welfare',
    years: '2018–2019',
    funder: 'NGO Internal Project',
  },
  {
    title: "Raw Medicine Supply for Children's Hospital in North Korea",
    country: 'North Korea',
    sector: 'Humanitarian Assistance',
    years: '2019',
    funder: 'Local Government',
  },
  {
    title: 'Healthcare Supplies to North Korea',
    country: 'North Korea',
    sector: 'Humanitarian Assistance',
    years: '2019',
    funder: 'Local Government',
  },
  {
    title: 'Finished Medicine Supply to North Korea',
    country: 'North Korea',
    sector: 'Humanitarian Assistance',
    years: '2018',
    funder: 'NGO Internal Project',
  },
];
