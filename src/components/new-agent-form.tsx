'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function NewAgentForm() {
  const router = useRouter()
  const [agentName, setAgentName] = useState('')
  const [agentDescription, setAgentDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle agent creation logic here
    // For example, send a POST request to your API
    // After creation, redirect to the new agent's details page
    router.push('/agents')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="agentName">Agent Name</Label>
            <Input
              id="agentName"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Enter agent name"
            />
          </div>
          <div>
            <Label htmlFor="agentDescription">Description</Label>
            <Textarea
              id="agentDescription"
              value={agentDescription}
              onChange={(e) => setAgentDescription(e.target.value)}
              placeholder="Enter agent description"
            />
          </div>
          <Button type="submit">Create Agent</Button>
        </form>
      </CardContent>
    </Card>
  )
}

