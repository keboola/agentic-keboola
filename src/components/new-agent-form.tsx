'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import MainLayout from '@/components/main-layout'

export default function NewAgentForm() {
  const router = useRouter()
  const [agentName, setAgentName] = useState('')
  const [agentDescription, setAgentDescription] = useState('')
  const [agentType, setAgentType] = useState('')
  const [agentStatus, setAgentStatus] = useState('Active')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: agentName,
          description: agentDescription,
          type: agentType,
          status: agentStatus,
        }),
      })

      if (res.ok) {
        const newAgent = await res.json()
        // Redirect to the agent's detail page
        router.push(`/agents/${newAgent.id}`)
      } else {
        const errorData = await res.json()
        setErrorMessage(errorData.error || 'Failed to create agent')
      }
    } catch (error) {
      console.error('Error creating agent:', error)
      setErrorMessage('An unexpected error occurred')
    }
  }

  return (
    <MainLayout>
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Create New Agent
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Fill out the form below to create a new agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
              <div>
                <Label htmlFor="agentName" className="text-gray-800 dark:text-gray-100">
                  Name
                </Label>
                <Input
                  id="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter agent name"
                  className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <Label htmlFor="agentDescription" className="text-gray-800 dark:text-gray-100">
                  Description
                </Label>
                <Textarea
                  id="agentDescription"
                  value={agentDescription}
                  onChange={(e) => setAgentDescription(e.target.value)}
                  placeholder="Enter agent description"
                  className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="agentType" className="text-gray-800 dark:text-gray-100">
                  Type
                </Label>
                <Input
                  id="agentType"
                  value={agentType}
                  onChange={(e) => setAgentType(e.target.value)}
                  placeholder="Enter agent type"
                  className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <Label htmlFor="agentStatus" className="text-gray-800 dark:text-gray-100">
                  Status
                </Label>
                <select
                  id="agentStatus"
                  value={agentStatus}
                  onChange={(e) => setAgentStatus(e.target.value)}
                  className="mt-1 w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Agent
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

