import Layout from '@/components/Layout';
import { siteConfig } from '@/content/site';
import { cvData, currentPosition } from '@/content/cvGenerated';
import type { GetStaticProps } from 'next';
import type { CvData } from '@/content/cvGenerated';

interface HomeProps {
  cv: CvData;
}

export default function Home({ cv }: HomeProps) {
  const position = currentPosition();
  const displayName = cv.name || siteConfig.name;
  const displayTitle = position?.role || cv.title || '';
  const displayAffiliation = position?.institution || cv.affiliation || '';

  return (
    <Layout>
      {/* Bio block */}
      <section className="mb-10 flex gap-6 items-start">
        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.headshotUrl}
            alt={displayName}
            width={100}
            height={100}
            className="rounded-sm object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="text-[10px] text-gray-400 leading-tight text-center">
            Photo by Hantol
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-1 text-sky-900">{displayName}</h1>
          {displayTitle && <p className="text-gray-700">{displayTitle}</p>}
          {displayAffiliation && <p className="text-gray-700">{displayAffiliation}</p>}
          {cv.email && (
            <p className="text-sm mt-2">
              <a href={`mailto:${cv.email}`}>{cv.email}</a>
            </p>
          )}
          <p className="mt-3 text-sm flex gap-4">
            <a href={siteConfig.cvUrl} download>Download CV (PDF)</a>
            <a href="/cv/">View CV page</a>
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-2 border-b border-sky-200 pb-1 text-sky-900">
          About
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Dedicated humanitarian professional and emerging researcher with extensive field experience
          in managing projects, fostering partnerships, and delivering results in complex refugee settings.
          Currently pursuing a Master&rsquo;s degree in Political Science while conducting research on
          refugee livelihoods and women&rsquo;s economic empowerment. Seeking to bridge humanitarian
          practice and academic research to contribute evidence-based solutions for conflict-affected
          communities worldwide.
        </p>
      </section>

      {/* Research areas */}
      {cv.researchAreas.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-2 border-b border-sky-200 pb-1 text-sky-900">
            Research Areas
          </h2>
          <p className="text-sm text-gray-700">{cv.researchAreas.join(' · ')}</p>
          <p className="mt-3 text-sm">
            <a href="/research/">Publications and work in progress →</a>
          </p>
        </section>
      )}

      {/* Quick links */}
      <section className="mt-10 grid grid-cols-3 gap-4 text-center text-sm">
        {[
          { label: 'Research', href: '/research/', desc: 'Publications & WIP' },
          { label: 'Projects', href: '/projects/', desc: 'Field & research projects' },
          { label: 'CV', href: '/cv/', desc: 'Full curriculum vitae' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="border border-sky-200 rounded-lg p-4 hover:border-sky-400 hover:bg-sky-50 no-underline transition-colors"
          >
            <div className="font-semibold text-sky-800">{item.label}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </a>
        ))}
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return { props: { cv: cvData } };
};
