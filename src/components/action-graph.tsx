import React, { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  EdgeChange,
  NodeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ToolSidebar from '@/components/tool-sidebar'
import CustomNode from '@/components/custom-node'

export default function ActionGraph() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  const nodeTypes = {
    customNode: CustomNode,
  }

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const data = event.dataTransfer.getData('application/reactflow')
      const toolData = JSON.parse(data)

      if (!toolData || !reactFlowBounds) return

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }

      const newNode: Node = {
        id: `${toolData.id}_${Date.now()}`,
        type: 'customNode',
        position,
        data: {
          label: toolData.name,
          toolId: toolData.id, // Pass the tool ID
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  return (
    <div className="flex h-full">
      <div className="w-64 h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <ToolSidebar />
      </div>

      <div
        className="flex-1 h-full"
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  )
}