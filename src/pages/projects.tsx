import Layout from '@/components/Layout';
import { projects } from '@/content/projects';

const sectorColors: Record<string, string> = {
  'Research': 'bg-sky-100 text-sky-800',
  'Humanitarian Assistance': 'bg-orange-100 text-orange-800',
  'Health': 'bg-green-100 text-green-800',
  'Social Welfare': 'bg-purple-100 text-purple-800',
};

export default function Projects() {
  return (
    <Layout title="Projects">
      <h1 className="text-2xl font-semibold mb-2">Projects</h1>
      <p className="text-sm text-gray-600 mb-8">
        Field projects and research initiatives in humanitarian and development settings.
      </p>

      <div className="space-y-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border border-sky-100 rounded-lg p-4 hover:border-sky-300 transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
              <h2 className="text-sm font-semibold text-gray-900 leading-snug">
                {project.title}
              </h2>
              <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                {project.years}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${sectorColors[project.sector] ?? 'bg-gray-100 text-gray-700'}`}
              >
                {project.sector}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                {project.country}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {project.funder}
              </span>
            </div>

            {project.highlight && (
              <p className="mt-2 text-xs text-sky-700 font-medium">
                ★ {project.highlight}
              </p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
