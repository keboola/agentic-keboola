import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Keboola AI Tools</h1>
      <div className="flex space-x-4 mt-4">
        <Link href="/tools" className="text-blue-500 hover:underline">
          View AI Tools
        </Link>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Agent Dashboard
        </Link>
      </div>

      <section className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Introducing Agentic-First Automation in Keboola
          </h2>
          
          <p className="text-lg text-gray-600">
            Empower your data to autonomously generate insights, optimize processes, and drive decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">Define Intent</h3>
            <p className="text-gray-600">
              Simply articulate your goals - from financial optimization to inventory management. Our platform translates your objectives into actionable workflows automatically.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-semibold text-green-600">Leverage Primitives</h3>
            <p className="text-gray-600">
              Build powerful solutions using our core components - extractors, writers, transformations, orchestrators, and storage - combined intelligently to create autonomous workflows.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-semibold text-purple-600">Visualize Actions</h3>
            <p className="text-gray-600">
              Monitor agent behavior through dynamic action graphs, providing real-time visual mapping of processes and identifying optimization opportunities.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
            <h3 className="text-xl font-semibold text-orange-600">Evolve & Customize</h3>
            <p className="text-gray-600">
              Adapt and refine your automation as needs change. Agents learn from historical data while you maintain full control to customize workflows.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Realize Concrete Value</h3>
          <p className="text-lg opacity-90">
            Transform your data from a passive resource into an active, value-generating force. Let intelligent agents handle repetitive tasks while you focus on innovation, strategy, and growth.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="space-x-4">
            <Link 
              href="/tools" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Explore Our AI Tools
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View Dashboard
            </Link>
            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Manage Agents
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
