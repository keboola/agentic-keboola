import React from 'react'
import { Handle, Position } from 'reactflow'
import { tools } from '@/components/tools-component'

interface CustomNodeProps {
  data: {
    label: string
    toolId: string
  }
}

export default function CustomNode({ data }: CustomNodeProps) {
  const tool = tools.find((t) => t.id === data.toolId)
  const icon = tool ? tool.icon : null

  return (
    <div className="p-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        {icon}
        <div className="text-gray-800 dark:text-gray-100 font-medium">
          {data.label}
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 bg-blue-500 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 bg-blue-500 border-white"
      />
    </div>
  )
}