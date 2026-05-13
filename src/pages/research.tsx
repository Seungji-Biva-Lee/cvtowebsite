import Layout from '@/components/Layout';
import { researchContent } from '@/content/research';
import { publications, workInProgress } from '@/content/publications';

export default function Research() {
  return (
    <Layout title="Research">
      <h1 className="text-2xl font-semibold mb-4 text-sky-900">Research</h1>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed text-sm">{researchContent.overview}</p>
      </section>

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

      {workInProgress.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-semibold mb-3 border-b border-sky-200 pb-1 text-sky-900">
            Work in Progress
          </h2>
          <ul className="space-y-3">
            {workInProgress.map((wip, i) => (
              <li key={i} className="text-sm leading-relaxed text-gray-800">
                {wip.authors}{' '}
                {wip.year}.{' '}
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

      <section className="mb-8">
        <h2 className="text-base font-semibold mb-3 border-b border-sky-200 pb-1 text-sky-900">
          Publications
        </h2>
        <ul className="space-y-4">
          {publications.map((pub, i) => (
            <li key={i} className="text-sm leading-relaxed text-gray-800">
              {pub.authors}{' '}
              {pub.year}.{' '}
              {pub.type === 'book' ? (
                <em>{pub.title}</em>
              ) : (
                <>&ldquo;{pub.title}&rdquo;</>
              )}{' '}
              <span className="italic">{pub.venue}</span>
              {pub.details && ` ${pub.details}`}
              {pub.note && (
                <span className="ml-1 text-gray-500 not-italic"> {pub.note}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
