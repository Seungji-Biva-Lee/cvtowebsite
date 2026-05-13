import Layout from '@/components/Layout';
import { siteConfig } from '@/content/site';

export default function CvPage() {
  const pdfUrl = siteConfig.cvUrl;

  return (
    <Layout title="CV">
      <div className="mb-4 flex gap-4 items-center">
        <h1 className="text-2xl font-semibold text-sky-900">Curriculum Vitae</h1>
        <div className="flex gap-3 text-sm ml-auto">
          <a
            href={pdfUrl}
            download
            className="inline-block px-3 py-1 bg-sky-600 text-white rounded hover:bg-sky-700 no-underline"
          >
            Download PDF
          </a>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 border border-gray-400 rounded hover:border-gray-600 text-gray-700 no-underline"
          >
            Open in new tab ↗
          </a>
        </div>
      </div>

      {/* Embedded PDF viewer */}
      <div className="border border-gray-300 rounded overflow-hidden" style={{ height: '80vh' }}>
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          title="Curriculum Vitae PDF"
          style={{ border: 'none' }}
        />
      </div>

      {/* Fallback for browsers that don't support inline PDF */}
      <p className="mt-3 text-sm text-gray-600">
        If the PDF does not display,{' '}
        <a href={pdfUrl} download>
          download it here
        </a>{' '}
        or{' '}
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          open it in a new tab
        </a>
        .
      </p>
    </Layout>
  );
}
