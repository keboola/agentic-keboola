'use client'

import { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Bot, Send } from 'lucide-react'

export default function AgentChat({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState([
    { id: 1, type: 'agent', text: 'Hello! How can I assist you today?' },
    // Add more messages if needed
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    // Logic to send the message
    if (inputValue.trim() === '') return
    setMessages([...messages, { id: Date.now(), type: 'user', text: inputValue }])
    setInputValue('')
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto relative">
          <Input
            placeholder="Type a message"
            className="pr-12 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleSend}
          >
            <Send className="w-5 h-5 text-gray-800 dark:text-gray-100" />
          </Button>
        </div>
      </div>
    </div>
  )
}