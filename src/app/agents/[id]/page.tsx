'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AgentDetails from '@/components/agent-details'

export default function AgentDetailsPage() {
  const { id } = useParams()
  const [agentData, setAgentData] = useState(null)

  useEffect(() => {
    const fetchAgent = async () => {
      const res = await fetch(`/api/agents?id=${id}`)
      if (res.ok) {
        const data = await res.json()
        setAgentData(data)
      } else {
        console.error('Failed to fetch agent data')
      }
    }

    fetchAgent()
  }, [id])

  if (!agentData) {
    return <div>Loading...</div>
  }

  return <AgentDetails agentData={agentData} />
}