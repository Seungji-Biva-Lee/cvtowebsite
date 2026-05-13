import Link from 'next/link';
import { siteConfig } from '@/content/site';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.tagline}`;

  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={siteConfig.tagline} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <div className="min-h-screen flex flex-col bg-[#f8fbff]">
        <header className="border-b border-sky-200 bg-white shadow-sm">
          <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-sky-900 no-underline hover:no-underline hover:text-sky-700"
            >
              {siteConfig.name}
            </Link>
            <ul className="flex gap-6 text-sm list-none m-0 p-0">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sky-700 hover:text-sky-900 no-underline font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-sky-100 bg-white mt-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between items-center">
            <span>
              {siteConfig.name} &mdash;{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-sky-600">
                {siteConfig.email}
              </a>
            </span>
            <span>
              <a
                href={siteConfig.cvUrl}
                className="text-sky-600 hover:text-sky-800"
                download
              >
                Download CV
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
