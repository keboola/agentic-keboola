'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  ChevronDown,
  Cpu,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Home,
  Search,
} from 'lucide-react'
import Image from "next/image"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function Dashboard() {
  const [activeAgents, setActiveAgents] = useState(42)
  const [completedTasks, setCompletedTasks] = useState(128)
  const [systemHealth, setSystemHealth] = useState(98)

  const recentTasks = [
    { id: 1, name: 'Data Processing', status: 'Completed', agent: 'Agent-001' },
    {
      id: 2,
      name: 'Model Training',
      status: 'In Progress',
      agent: 'Agent-015',
    },
    {
      id: 3,
      name: 'Anomaly Detection',
      status: 'Queued',
      agent: 'Agent-007',
    },
    {
      id: 4,
      name: 'Report Generation',
      status: 'Completed',
      agent: 'Agent-022',
    },
  ]

  const performanceData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 },
  ]

  // Additional data for the new content
  const onlineOrdersData = [
    { date: '2023-06-01', orders: 120 },
    { date: '2023-06-02', orders: 132 },
    { date: '2023-06-03', orders: 101 },
    { date: '2023-06-04', orders: 134 },
    { date: '2023-06-05', orders: 90 },
    { date: '2023-06-06', orders: 110 },
    { date: '2023-06-07', orders: 85 },
  ]

  const websiteVisitorsData = [
    { date: '2023-06-01', visitors: 1500 },
    { date: '2023-06-02', visitors: 1600 },
    { date: '2023-06-03', visitors: 1750 },
    { date: '2023-06-04', visitors: 1400 },
    { date: '2023-06-05', visitors: 2000 },
    { date: '2023-06-06', visitors: 2200 },
    { date: '2023-06-07', visitors: 1900 },
  ]

  const userActivityData = [
    { date: '2023-06-01', edits: 500 },
    { date: '2023-06-02', edits: 400 },
    { date: '2023-06-03', edits: 300 },
    { date: '2023-06-04', edits: 600 },
    { date: '2023-06-05', edits: 500 },
    { date: '2023-06-06', edits: 700 },
    { date: '2023-06-07', edits: 800 },
    { date: '2023-06-08', edits: 900 },
    { date: '2023-06-09', edits: 750 },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        {/* Sidebar content remains the same */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Agentic Keboola
          </span>
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
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/agents"
            className="flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            Agents
          </Link>
          <Link
            href="/tools"
            className="flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="bg-background pl-8 md:w-[300px]"
                />
              </div>
            </form>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">John Doe</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
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

        {/* Dashboard Content */}
        <div className="p-6">
          {/* New Content Added Here */}
          {/* AI Assistant Section */}
          <div className="mb-8 rounded-xl bg-gradient-to-r from-[#0066FF] to-purple-600 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="rounded-full bg-white p-2">
                <Image src="/placeholder.svg" alt="Assistant" width={48} height={48} className="rounded-full" />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="How can I help you?"
                  className="mb-4 bg-white/10 text-white placeholder:text-white/70 sm:mb-0 sm:mr-4"
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                    Give me revenue projections for our next fiscal year
                  </Button>
                  <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                    Help me begin collecting customer feedback from a Typeform survey
                  </Button>
                  <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                    Analyze customer data for insights and trends
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Section */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between rounded-lg border bg-background p-4">
              <div className="flex items-center gap-4">
                <span className="rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-600">FLOWS</span>
                <p>Flow Data import from Hotjar has encountered ERROR.</p>
              </div>
              <div className="flex gap-2">
                <Button>DETAILS</Button>
                <Button variant="outline">CLOSE</Button>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border bg-background p-4">
              <div className="flex items-center gap-4">
                <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">USERS</span>
                <p>Petr Dospiva has been added to project User Feedback.</p>
              </div>
              <div className="flex gap-2">
                <Button>DETAILS</Button>
                <Button variant="outline">CLOSE</Button>
              </div>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold">0.23 TB</div>
                  <div className="text-sm text-muted-foreground">+2% vs last month</div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold">672 tables</div>
                  <div className="text-sm text-muted-foreground">+5% vs last month</div>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm text-muted-foreground">(368,268,914 Rows)</div>
                  <Button variant="link" className="mt-2 text-[#0066FF]">
                    Storage Overview &gt;
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Identified Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">online_orders</span>
                      <span className="text-sm text-red-600">There have been fewer orders this week.</span>
                    </div>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={onlineOrdersData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="orders" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">website_visitors</span>
                      <span className="text-sm text-green-600">Website visits hit a new all-time high this month.</span>
                    </div>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={websiteVisitorsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* User Activity Graph */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>User Activity Graph - Configuration Edits</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="edits" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="AI Gorithm" />
                    <AvatarFallback>AG</AvatarFallback>
                  </Avatar>
                  <span>AI Gorithm</span>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="Dee Cipher" />
                    <AvatarFallback>DC</AvatarFallback>
                  </Avatar>
                  <span>Dee Cipher</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Existing Dashboard Content */}
          <div className="mt-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeAgents}</div>
                  <p className="text-xs text-muted-foreground">+2 from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedTasks}</div>
                  <p className="text-xs text-muted-foreground">+15% from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{systemHealth}%</div>
                  <Progress value={systemHealth} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={100}>
                    <BarChart data={performanceData}>
                      <Bar dataKey="value" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tasks</CardTitle>
                  <CardDescription>
                    Overview of the latest agent activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{task.name}</p>
                          <p className="text-sm text-muted-foreground">{task.agent}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : task.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>
                    Real-time metrics of your Agentic Keboola system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">CPU Usage</span>
                        <span className="text-sm text-muted-foreground">65%</span>
                      </div>
                      <Progress value={65} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Memory Usage</span>
                        <span className="text-sm text-muted-foreground">48%</span>
                      </div>
                      <Progress value={48} />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Network Load</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}