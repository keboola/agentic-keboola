'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Bell, ChevronDown, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import ToolsComponent from '@/components/tools-component'

export default function ToolsPage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Agentic Keboola</span>
        </div>
        <nav className="mt-6">
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/agents"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            Agents
          </Link>
          <Link
            href="/tools"
            className="flex items-center px-4 py-2 mt-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          >
            <Users className="w-5 h-5 mr-3" />
            Tools
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Tools</h1>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Tools Content */}
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Tools</CardTitle>
              <CardDescription>View and manage your Keboola AI tools</CardDescription>
            </CardHeader>
            <CardContent>
              <ToolsComponent />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}