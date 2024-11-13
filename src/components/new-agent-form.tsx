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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle agent creation logic here
    // For example, send a POST request to your API
    // After creation, redirect to the new agent's details page
    router.push('/agents')
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
              <div>
                <Label
                  htmlFor="agentName"
                  className="text-gray-800 dark:text-gray-100"
                >
                  Agent Name
                </Label>
                <Input
                  id="agentName"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Enter agent name"
                  className="mt-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                />
              </div>
              <div>
                <Label
                  htmlFor="agentDescription"
                  className="text-gray-800 dark:text-gray-100"
                >
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

