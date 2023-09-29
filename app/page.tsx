import Tasks from '@/components/Tasks/Tasks'

export default function Home () {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 dark:bg-zinc-800/30">
      <div className="my-16 text-center">
        <p className="text-2xl">
          Interview <code className="font-mono font-bold">Tasks</code>
        </p>
      </div>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <Tasks />
      </div>
    </div>
  )
}
