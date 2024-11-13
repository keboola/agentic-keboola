
'use client'

import { useParams } from 'next/navigation'
import AgentChat from '@/components/agent-chat'

export default function AgentChatPage() {
  const params = useParams()
  const { id } = params

  // You can fetch agent data here if needed

  return (
    <AgentChat agentId={id as string} />
  )
}
