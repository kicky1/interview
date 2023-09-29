export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-zinc-800/30">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
