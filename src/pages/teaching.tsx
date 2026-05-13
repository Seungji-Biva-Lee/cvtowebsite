import Layout from '@/components/Layout';
import { teachingContent } from '@/content/teaching';
import { cvData } from '@/content/cvGenerated';
import type { GetStaticProps } from 'next';
import type { TeachingEntry } from '@/content/cvGenerated';

interface TeachingProps {
  courses: TeachingEntry[];
}

export default function Teaching({ courses }: TeachingProps) {
  return (
    <Layout title="Teaching">
      <h1 className="text-2xl font-semibold mb-4">Teaching</h1>

      <section className="mb-8">
        <p className="text-gray-700 leading-relaxed">{teachingContent.overview}</p>
      </section>

      {teachingContent.highlighted.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">
            Courses
          </h2>
          <div className="space-y-4">
            {teachingContent.highlighted.map((course) => (
              <div key={course.title}>
                <h3 className="font-medium text-gray-900">
                  {course.title}
                  <span className="ml-2 text-xs text-gray-500 font-normal">
                    {course.level}
                  </span>
                </h3>
                <p className="text-sm text-gray-700">{course.description}</p>
                {course.syllabusUrl && (
                  <a
                    href={course.syllabusUrl}
                    className="text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Syllabus (PDF)
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {courses.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">
            Teaching Record
          </h2>
          <ul className="space-y-1">
            {courses.map((c, i) => (
              <li key={i} className="text-sm text-gray-800 flex justify-between">
                <span>{c.course}</span>
                {c.year && <span className="text-gray-500">{c.year}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<TeachingProps> = async () => {
  return {
    props: {
      courses: cvData.teaching,
    },
  };
};
