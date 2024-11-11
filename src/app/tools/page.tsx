import Link from 'next/link'
import ToolsComponent from '@/components/tools-component'

export default function ToolsPage() {
  return (
    <div>
      <div className="container mx-auto py-4">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-500 hover:text-blue-700"
        >
          ← Back to Home
        </Link>
      </div>
      <ToolsComponent />
    </div>
  )
}