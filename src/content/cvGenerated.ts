/**
 * cvGenerated.ts – Type definitions and loader for cv-data.json.
 *
 * This file is NOT auto-generated; it provides stable TypeScript types
 * for the JSON produced by scripts/cv/parse_docx.py.
 * Do not edit cv-data.json by hand.
 */

export interface EmploymentEntry {
  role: string;
  institution: string;
  years: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export interface Publication {
  citation: string;
  year: string;
}

export interface WorkInProgressItem {
  title: string;
  description: string;
}

export interface TeachingEntry {
  course: string;
  year: string;
}

export interface GenericEntry {
  text: string;
  year: string;
}

export interface CvData {
  name: string;
  title: string;
  affiliation: string;
  email: string;
  website: string;
  researchAreas: string[];
  employment: EmploymentEntry[];
  education: EducationEntry[];
  publications: Publication[];
  workInProgress: WorkInProgressItem[];
  teaching: TeachingEntry[];
  invitedTalks: GenericEntry[];
  honorsGrants: GenericEntry[];
  service: GenericEntry[];
}

// eslint-disable-next-line @typescript-eslint/no-require-imports
const raw = require('../generated/cv-data.json') as CvData;

export const cvData: CvData = raw;

/** Return the most recent employment entry, or undefined. */
export function currentPosition(): EmploymentEntry | undefined {
  return cvData.employment.find(
    (e) =>
      e.years.toLowerCase().includes('present') ||
      e.years.toLowerCase().includes('current'),
  ) ?? cvData.employment[0];
}
