'use client'

import { useParams } from 'next/navigation'
import AgentDetails from '@/components/agent-details'

export default function AgentDetailsPage() {
  const { id } = useParams()

  // Fetch or define agent data based on the ID
  const agentData = {
    id,
    name: 'Agent Name',
    created: '1.3.2023',
    // ...other agent-specific data
  }

  return <AgentDetails agentData={agentData} />
}