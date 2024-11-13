import React from 'react'
import { tools } from '@/components/tools-component'

export default function ToolSidebar() {
  const onDragStart = (event: React.DragEvent, tool: any) => {
    const dragData = { id: tool.id, name: tool.name }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData))
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Tools</h3>
      <div className="mt-4 space-y-2">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="p-2 bg-white dark:bg-gray-700 rounded-md shadow cursor-pointer"
            onDragStart={(event) => onDragStart(event, tool)}
            draggable
          >
            <div className="flex items-center space-x-2">
              {tool.icon}
              <span className="text-gray-800 dark:text-gray-100">{tool.name}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}