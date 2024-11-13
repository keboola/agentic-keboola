'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

import AgentDetails from '@/components/agent-details'

export default function AgentDetailsPage() {
  const params = useParams()
  const id = params.id

  // Fetch agent data based on the `id` or use placeholder data
  const [agentData, setAgentData] = useState({
    id,
    name: 'Agent Name',
    // ...other agent properties
  })

  return (
    <AgentDetails agentData={agentData} />
  )
}