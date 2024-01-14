import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-zinc-800/30">
      <nav>
        <ul className="flex items-left gap-4">
          <Link
            href={'/'}
            className="flex items-center text-md m-4 duration-500 text-zinc-800/3 hover:text-zinc-800/60"
          >
            <ArrowLeft /> Back to Tasks
          </Link>
        </ul>
      </nav>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
