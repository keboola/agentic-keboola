'use client'

import Link from 'next/link'
import { useState, ReactNode } from 'react'
import {
  Home,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen && (
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Agentic Keboola
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          <Link
            href="/"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Home className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Home</span>}
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>
          <Link
            href="/agents"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Agents</span>}
          </Link>
          <Link
            href="/tools"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Tools</span>}
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            {isSidebarOpen && <span>Settings</span>}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-1 max-w-2xl">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search..."
                className="bg-gray-100 dark:bg-gray-700 pl-10 pr-4 py-2 rounded-lg text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <Search className="h-5 w-5" />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline text-gray-700 dark:text-gray-200">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-300" />
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

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
