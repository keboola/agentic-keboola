'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Bell,
  Bot,
  ChevronDown,
  Database,
  FileText,
  Home,
  LayoutGrid,
  Menu,
  Search,
  Send,
  Settings,
  Trash,
  Video,
} from 'lucide-react'

export default function AgentChat({ agentId }: { agentId: string }) {
  // You can use agentId to fetch agent-specific data if necessary

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r flex flex-col items-center py-4 gap-6">
        <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <nav className="flex flex-col gap-4">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Home className="w-5 h-5 text-gray-500" />
          </Button>
          {/* Add more navigation items as needed */}
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Settings className="w-5 h-5 text-gray-500" />
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
          <div className="flex items-center flex-1 max-w-2xl">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-8 bg-gray-50 border-0"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>HD</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">Head of Design</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-auto p-4">
          {/* User Message */}
          <div className="flex justify-end mb-6">
            <Card className="bg-[#0066FF] text-white p-3 rounded-lg max-w-2xl">
              <p>Give me revenue projections for our next fiscal year</p>
            </Card>
          </div>

          {/* AI Response */}
          <div className="flex gap-3 mb-6">
            <Avatar className="w-8 h-8 bg-[#0066FF]">
              <Bot className="w-5 h-5 text-white" />
            </Avatar>
            <div className="flex flex-col gap-4 max-w-2xl">
              <Card className="p-4 bg-white">
                <p className="text-gray-800">
                  Sure, I'd be happy to help with this. Would you like me to start by helping to identify if the necessary data for this task already exists in Keboola? Or, is there a source for the data that you already had in mind?
                </p>
                <div className="flex gap-2 mt-4">
                  <Button className="bg-gradient-to-r from-[#0066FF] to-purple-600 text-white">
                    Help me find the data
                  </Button>
                  <Button variant="outline">Use table selector</Button>
                </div>
              </Card>
              <Card className="p-4 bg-white">
                <p className="text-gray-800 mb-4">
                  I found several tables related to forecasts and revenue in the project. Here are some options for forecasts:
                </p>
                <div className="space-y-3">
                  {/* List of tables */}
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    <span className="font-medium">prod-global-historical-revenue-forecasting</span>
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">OUT</span>
                  </div>
                  {/* Add more table items as needed */}
                </div>
                <p className="mt-4 text-gray-800">
                  Please let me know which specific tables you would like to use as a starting point for your 2025 budget, or if you need more information about any of these tables.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="max-w-4xl mx-auto relative">
            <Input
              placeholder="Type a message"
              className="pr-10"
            />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}