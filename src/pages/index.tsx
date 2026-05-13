import Layout from '@/components/Layout';
import { siteConfig } from '@/content/site';
import { cvData, currentPosition } from '@/content/cvGenerated';
import { researchContent } from '@/content/research';
import { publications, workInProgress } from '@/content/publications';
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
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-[10px] text-gray-400 leading-tight text-center">Photo by Hantol</span>
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

      {/* Research overview */}
      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed text-sm">{researchContent.overview}</p>
      </section>

      {/* Research areas */}
      {researchContent.strands.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-3 border-b border-sky-200 pb-1 text-sky-900">
            Research Areas
          </h2>
          <div className="space-y-3">
            {researchContent.strands.map((strand) => (
              <div key={strand.title}>
                <h3 className="font-medium text-gray-900 text-sm">{strand.title}</h3>
                <p className="text-sm text-gray-600">{strand.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Work in progress */}
      {workInProgress.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-3 border-b border-sky-200 pb-1 text-sky-900">
            Work in Progress
          </h2>
          <ul className="space-y-3">
            {workInProgress.map((wip, i) => (
              <li key={i} className="text-sm leading-relaxed text-gray-800">
                {wip.authors} {wip.year}.{' '}
                &ldquo;{wip.title}&rdquo;
                {wip.venue && ` ${wip.venue}`}
                {wip.note && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded">
                    {wip.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Publications */}
      <section className="mb-8">
        <h2 className="text-base font-semibold mb-3 border-b border-sky-200 pb-1 text-sky-900">
          Publications
        </h2>
        <ul className="space-y-4">
          {publications.map((pub, i) => (
            <li key={i} className="text-sm leading-relaxed text-gray-800">
              {pub.authors} {pub.year}.{' '}
              {pub.type === 'book' ? <em>{pub.title}</em> : <>&ldquo;{pub.title}&rdquo;</>}{' '}
              <span className="italic">{pub.venue}</span>
              {pub.details && ` ${pub.details}`}
              {pub.note && <span className="ml-1 text-gray-500 not-italic"> {pub.note}</span>}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return { props: { cv: cvData } };
};
