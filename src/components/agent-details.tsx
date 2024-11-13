'use client'

import { useState } from 'react'
import { Bot, Database, Play, Search, Terminal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export default function AgentDetails({ agentData }: { agentData: any }) {
  const [agentName, setAgentName] = useState(agentData.name || 'Agent Name')
  const [agentId] = useState(agentData.id || '000000000')
  const [created] = useState(agentData.created || 'Unknown')

  // Sample data for the usage graph
  const usageData = [
    { name: '1', value: 4 },
    { name: '2', value: 3 },
    { name: '3', value: 7 },
    { name: '4', value: 5 },
    { name: '5', value: 6 },
    { name: '6', value: 4 },
    { name: '7', value: 8 },
    { name: '8', value: 3 },
    { name: '9', value: 6 },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Agent Details: {agentName}</h1>
            <div className="text-sm text-muted-foreground">
              ID: {agentId} | Created: {created}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Open in Agent Playground</Button>
          <Button>Start Agent</Button>
          <Button variant="destructive">Remove from Organization</Button>
        </div>
      </div>

      {/* Rest of your code remains the same, including cards and tabs */}
      {/* ... */}
    </div>
  )
}