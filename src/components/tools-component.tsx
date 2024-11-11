"use client"

import { 
  Info, Database, Code, FileText, Cog, Play, Table, BarChart, 
  Workflow, Zap, Upload, Download, Shield, Brain, Image, 
  MessageSquare, Eraser, TrendingUp 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { pipeline } from "stream"

interface Tool {
  id: string
  name: string
  icon: React.ReactNode
  inputs: Array<{
    name: string
    type: "config" | "user" | "storage" | "session" | "table" | "bucket" | "query" | "data" | "model" | "pipeline" | "text" | "image"
  }>
  outputs: Array<{
    name: string
    type: "job" | "code" | "metadata" | "data" | "visualization" | "config" | "metrics" | "model" | "analysis" | "classification"
  }>
  description: string
}

const tools: Tool[] = [
    {
      id: "job-executor",
      name: "Job Executor",
      icon: <Play className="h-6 w-6 text-blue-500" />,
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
      icon: <Code className="h-6 w-6 text-purple-500" />,
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
      id: "data-storage-reader",
      name: "Data Storage Reader",
      icon: <Database className="h-6 w-6 text-green-500" />,
      inputs: [
        { name: "Table ID", type: "table" },
        { name: "Bucket ID", type: "bucket" }
      ],
      outputs: [
        { name: "Table/Bucket Metadata", type: "metadata" },
        { name: "Data Sample", type: "data" }
      ],
      description: "Reads and samples data from storage locations"
    },
    {
      id: "python-generator",
      name: "Python Generator",
      icon: <Code className="h-6 w-6 text-yellow-500" />,
      inputs: [
        { name: "User Input", type: "user" },
        { name: "Data Context", type: "data" }
      ],
      outputs: [
        { name: "Generated Code", type: "code" }
      ],
      description: "Generates Python code for data processing tasks"
    },
    {
      id: "extractor-config-generator",
      name: "Extractor Configuration Generator",
      icon: <Cog className="h-6 w-6 text-indigo-500" />,
      inputs: [
        { name: "Source Type", type: "user" },
        { name: "Credentials", type: "config" }
      ],
      outputs: [
        { name: "Extractor Config", type: "config" }
      ],
      description: "Generates configuration for data extraction components"
    },
    {
      id: "writer-config-generator",
      name: "Writer Configuration Generator",
      icon: <Cog className="h-6 w-6 text-pink-500" />,
      inputs: [
        { name: "Destination Type", type: "user" },
        { name: "Schema", type: "data" }
      ],
      outputs: [
        { name: "Writer Config", type: "config" }
      ],
      description: "Generates configuration for data writing components"
    },
    {
      id: "data-profiler",
      name: "Data Profiler",
      icon: <BarChart className="h-6 w-6 text-orange-500" />,
      inputs: [
        { name: "Table ID", type: "table" }
      ],
      outputs: [
        { name: "Profile Report", type: "data" },
        { name: "Data Quality Metrics", type: "metrics" }
      ],
      description: "Analyzes and profiles data, providing statistical insights"
    },
    {
      id: "transformation-suggester",
      name: "Transformation Suggester",
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      inputs: [
        { name: "Source Data", type: "data" },
        { name: "Target Schema", type: "data" }
      ],
      outputs: [
        { name: "Suggested Transformations", type: "code" }
      ],
      description: "Suggests data transformations based on source and target schemas"
    },
    {
      id: "pipeline-optimizer",
      name: "Pipeline Optimizer",
      icon: <Workflow className="h-6 w-6 text-blue-500" />,
      inputs: [
        { name: "Pipeline Config", type: "pipeline" },
        { name: "Performance Metrics", type: "metrics" }
      ],
      outputs: [
        { name: "Optimized Pipeline", type: "pipeline" }
      ],
      description: "Analyzes and optimizes data pipeline configurations for better performance"
    },
    {
      id: "data-validator",
      name: "Data Validator",
      icon: <FileText className="h-6 w-6 text-green-500" />,
      inputs: [
        { name: "Data Sample", type: "data" },
        { name: "Validation Rules", type: "config" }
      ],
      outputs: [
        { name: "Validation Report", type: "data" }
      ],
      description: "Validates data against predefined rules and generates a report"
    },
    {
      id: "ml-model-trainer",
      name: "ML Model Trainer",
      icon: <Cog className="h-6 w-6 text-purple-500" />,
      inputs: [
        { name: "Training Data", type: "data" },
        { name: "Model Parameters", type: "config" }
      ],
      outputs: [
        { name: "Trained Model", type: "model" },
        { name: "Performance Metrics", type: "metrics" }
      ],
      description: "Trains machine learning models on provided data"
    },
    {
      id: "data-anonymizer",
      name: "Data Anonymizer",
      icon: <Shield className="h-6 w-6 text-red-500" />,
      inputs: [
        { name: "Source Data", type: "data" },
        { name: "Anonymization Rules", type: "config" }
      ],
      outputs: [
        { name: "Anonymized Data", type: "data" }
      ],
      description: "Anonymizes sensitive data based on predefined rules"
    },
    {
      id: "nlp-processor",
      name: "NLP Processor",
      icon: <Brain className="h-6 w-6 text-violet-500" />,
      inputs: [
        { name: "Text Input", type: "text" },
        { name: "Processing Config", type: "config" }
      ],
      outputs: [
        { name: "Processed Text", type: "data" },
        { name: "NLP Analysis", type: "analysis" }
      ],
      description: "Processes and analyzes natural language text using advanced NLP techniques"
    },
    {
      id: "image-classifier",
      name: "Image Classifier",
      icon: <Image className="h-6 w-6 text-cyan-500" />,
      inputs: [
        { name: "Image Data", type: "image" },
        { name: "Model Config", type: "config" }
      ],
      outputs: [
        { name: "Classification Results", type: "classification" },
        { name: "Confidence Scores", type: "data" }
      ],
      description: "Classifies images using pre-trained or custom machine learning models"
    },
    {
      id: "sentiment-analyzer",
      name: "Sentiment Analyzer",
      icon: <MessageSquare className="h-6 w-6 text-amber-500" />,
      inputs: [
        { name: "Text Data", type: "text" },
        { name: "Analysis Config", type: "config" }
      ],
      outputs: [
        { name: "Sentiment Scores", type: "data" },
        { name: "Detailed Analysis", type: "analysis" }
      ],
      description: "Analyzes the sentiment and emotional tone of text data"
    },
    {
      id: "data-cleaner",
      name: "Data Cleaner",
      icon: <Eraser className="h-6 w-6 text-teal-500" />,
      inputs: [
        { name: "Raw Data", type: "data" },
        { name: "Cleaning Rules", type: "config" }
      ],
      outputs: [
        { name: "Cleaned Data", type: "data" },
        { name: "Cleaning Report", type: "metrics" }
      ],
      description: "Cleanses and preprocesses data by removing duplicates, handling missing values, and standardizing formats"
    },
    {
      id: "predictive-model",
      name: "Predictive Model",
      icon: <TrendingUp className="h-6 w-6 text-rose-500" />,
      inputs: [
        { name: "Training Data", type: "data" },
        { name: "Model Parameters", type: "config" }
      ],
      outputs: [
        { name: "Predictions", type: "data" },
        { name: "Model Performance", type: "metrics" }
      ],
      description: "Creates and applies predictive models for forecasting and pattern recognition"
    }
  ]

const getInputTypeStyles = (type: Tool["inputs"][0]["type"]) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  const typeStyles = {
    config: "bg-blue-100 text-blue-800",
    user: "bg-blue-100 text-blue-800",
    storage: "bg-amber-100 text-amber-800",
    session: "bg-yellow-100 text-yellow-800",
    table: "bg-blue-100 text-blue-800",
    bucket: "bg-blue-100 text-blue-800",
    query: "bg-purple-100 text-purple-800",
    data: "bg-green-100 text-green-800",
    model: "bg-indigo-100 text-indigo-800",
    pipeline: "bg-pink-100 text-pink-800",
    text: "bg-violet-100 text-violet-800",
    image: "bg-cyan-100 text-cyan-800",
    metrics: "bg-orange-100 text-orange-800"
  }
  return `${baseStyles} ${typeStyles[type]}`
}

const getOutputTypeStyles = (type: Tool["outputs"][0]["type"]) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  const typeStyles = {
    job: "bg-green-100 text-green-800",
    code: "bg-purple-100 text-purple-800",
    metadata: "bg-yellow-100 text-yellow-800",
    data: "bg-blue-100 text-blue-800",
    visualization: "bg-indigo-100 text-indigo-800",
    config: "bg-pink-100 text-pink-800",
    metrics: "bg-orange-100 text-orange-800",
    model: "bg-red-100 text-red-800",
    analysis: "bg-amber-100 text-amber-800",
    classification: "bg-teal-100 text-teal-800",
    pipeline: "bg-pink-100 text-pink-800"
  }
  return `${baseStyles} ${typeStyles[type]}`
}

export default function ToolsComponent() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Keboola AI Tools</h1>
      <div className="space-y-4">
        {tools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr,3fr,auto] gap-4 items-center">
                <div className="flex items-center space-x-3">
                  {tool.icon}
                  <span className="font-medium">{tool.name}</span>
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

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto"
                        aria-label={`More information about ${tool.name}`}
                      >
                        <Info className="h-5 w-5 text-green-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tool.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}