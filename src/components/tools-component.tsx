"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Info, Database, Code, FileText, Cog, Play, Table, BarChart, 
  Workflow, Zap, Upload, Download, Shield, Brain, Image as ImageIcon, 
  MessageSquare, Eraser, TrendingUp 
} from "lucide-react"

interface InputType {
  name: string
  type: keyof typeof inputTypeStyles
}

interface OutputType {
  name: string
  type: keyof typeof outputTypeStyles
}

interface Tool {
  id: string
  name: string
  icon: React.ReactNode
  inputs: InputType[]
  outputs: OutputType[]
  description: string
}

const inputTypeStyles = {
  config: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100", 
  storage: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  session: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  table: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  bucket: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  query: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  data: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  model: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  pipeline: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  text: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
  image: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  metrics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  analysis: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  classification: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
} as const

const outputTypeStyles = {
  job: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  code: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  metadata: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100", 
  data: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  visualization: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  config: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  metrics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  model: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  analysis: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  classification: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  pipeline: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  text: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
  image: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100"
} as const

export const tools: Tool[] = [
    {
      id: "job-executor",
      name: "Job Executor",
      icon: <Play className="h-6 w-6 text-blue-400" />,
      inputs: [
        { name: "Configuration ID", type: "config" }
      ],
      outputs: [
        { name: "Job ID", type: "job" }
      ],
      description: "Executes jobs based on the provided configuration"
    },
    {
      id: "sql-generator", 
      name: "SQL Generator",
      icon: <Code className="h-6 w-6 text-purple-400" />,
      inputs: [
        { name: "User Input", type: "user" },
        { name: "Storage Objects", type: "storage" },
        { name: "Session Context", type: "session" }
      ],
      outputs: [
        { name: "Generated Code", type: "code" }
      ],
      description: "Generates SQL queries based on natural language input"
    },
    {
      id: "data-explorer",
      name: "Data Explorer", 
      icon: <Database className="h-6 w-6 text-green-400" />,
      inputs: [
        { name: "Table Name", type: "table" },
        { name: "Query Parameters", type: "query" }
      ],
      outputs: [
        { name: "Query Results", type: "data" },
        { name: "Result Metadata", type: "metadata" }
      ],
      description: "Explores and analyzes data from database tables"
    },
    {
      id: "visualization-creator",
      name: "Visualization Creator",
      icon: <BarChart className="h-6 w-6 text-indigo-400" />,
      inputs: [
        { name: "Dataset", type: "data" }
      ],
      outputs: [
        { name: "Chart Configuration", type: "visualization" }
      ],
      description: "Creates data visualizations and charts"
    },
    {
      id: "pipeline-builder",
      name: "Pipeline Builder",
      icon: <Workflow className="h-6 w-6 text-pink-400" />,
      inputs: [
        { name: "Pipeline Config", type: "config" },
        { name: "Input Data", type: "data" }
      ],
      outputs: [
        { name: "Pipeline Definition", type: "pipeline" }
      ],
      description: "Builds data processing pipelines"
    },
    {
      id: "model-trainer",
      name: "Model Trainer",
      icon: <Brain className="h-6 w-6 text-red-400" />,
      inputs: [
        { name: "Training Data", type: "data" },
        { name: "Model Config", type: "config" }
      ],
      outputs: [
        { name: "Trained Model", type: "model" },
        { name: "Training Metrics", type: "metrics" }
      ],
      description: "Trains machine learning models"
    },
    {
      id: "text-analyzer",
      name: "Text Analyzer",
      icon: <FileText className="h-6 w-6 text-violet-400" />,
      inputs: [
        { name: "Text Input", type: "text" }
      ],
      outputs: [
        { name: "Analysis Results", type: "analysis" }
      ],
      description: "Analyzes text content and extracts insights"
    },
    {
      id: "image-processor",
      name: "Image Processor",
      icon: <ImageIcon className="h-6 w-6 text-cyan-400" />,
      inputs: [
        { name: "Image Input", type: "image" }
      ],
      outputs: [
        { name: "Classification Results", type: "classification" }
      ],
      description: "Processes and analyzes images"
    },
    {
      id: "data-cleaner",
      name: "Data Cleaner",
      icon: <Eraser className="h-6 w-6 text-amber-400" />,
      inputs: [
        { name: "Raw Data", type: "data" }
      ],
      outputs: [
        { name: "Cleaned Data", type: "data" },
        { name: "Data Quality Metrics", type: "metrics" }
      ],
      description: "Cleans and preprocesses data"
    },
    {
      id: "trend-analyzer",
      name: "Trend Analyzer",
      icon: <TrendingUp className="h-6 w-6 text-teal-400" />,
      inputs: [
        { name: "Time Series Data", type: "data" }
      ],
      outputs: [
        { name: "Trend Analysis", type: "analysis" },
        { name: "Forecast Results", type: "data" }
      ],
      description: "Analyzes trends and generates forecasts"
    }
  ]

const getInputTypeStyles = (type: keyof typeof inputTypeStyles) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  return `${baseStyles} ${inputTypeStyles[type]}`
}

const getOutputTypeStyles = (type: keyof typeof outputTypeStyles) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  return `${baseStyles} ${outputTypeStyles[type]}`
}

export default function ToolsComponent({ agentId }: { agentId: string }) {
  const router = useRouter()
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  useEffect(() => {
    // Fetch existing selected tools for the agent
    const agentsTools = JSON.parse(localStorage.getItem('agentsTools') || '{}')
    const toolsForAgent = agentsTools[agentId] || []
    setSelectedTools(toolsForAgent)
  }, [agentId])

  const handleToolSelection = (toolId: string) => {
    setSelectedTools((prevSelected) =>
      prevSelected.includes(toolId)
        ? prevSelected.filter((id) => id !== toolId)
        : [...prevSelected, toolId]
    )
  }

  const handleSave = () => {
    // Save selected tools for this agent
    const agentsTools = JSON.parse(localStorage.getItem('agentsTools') || '{}')
    agentsTools[agentId] = selectedTools
    localStorage.setItem('agentsTools', JSON.stringify(agentsTools))

    // Redirect back to the agent details page
    router.push(`/agents/${agentId}`)
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <Card key={tool.id} className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
          <CardContent className="p-6 flex items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr,3fr,3fr] gap-4 items-center">
              <div className="flex items-center space-x-3">
                {tool.icon}
                <span className="font-medium text-gray-800 dark:text-gray-100">{tool.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.inputs.map((input, index) => (
                  <span key={index} className={getInputTypeStyles(input.type)}>
                    {input.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.outputs.map((output, index) => (
                  <span key={index} className={getOutputTypeStyles(output.type)}>
                    {output.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <Checkbox
                id={tool.id}
                checked={selectedTools.includes(tool.id)}
                onCheckedChange={() => handleToolSelection(tool.id)}
                className="border-gray-500 text-blue-600 dark:text-blue-400"
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          Save Selected Tools
        </Button>
      </div>
    </div>
  )
}
