'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReactFlow, { 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges, 
  Background, 
  Controls,
  Panel
} from 'reactflow'
import 'reactflow/dist/style.css'
import { GraphNode, GraphEdge } from '@/types/graph'
import ToolSidebar from '@/components/tool-sidebar'
import { Tool } from '@/types/tool'
import CustomNode from '@/components/custom-node'

interface NodeData {
  label: string
  toolId: string
  category: 'tool' | 'workflow'
}

export default function ActionGraph() {
  const params = useParams()
  const agentId = params?.id as string

  const [nodes, setNodes] = useState<GraphNode[]>([])
  const [edges, setEdges] = useState<GraphEdge[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const nodeTypes = {
    custom: CustomNode,
  }

  useEffect(() => {
    const fetchActionGraph = async () => {
      try {
        const res = await fetch(`/api/agents/${agentId}/action-graph`)
        if (res.ok) {
          const data = await res.json()
          const loadedNodes = data.nodes.map((node: any) => ({
            ...node,
            type: 'custom',
            data: { 
              label: node.data.label || '',
              toolId: node.data.toolId,
              category: node.data.category
            } as NodeData,
          }))
          setNodes(loadedNodes)
          setEdges(data.edges || [])
        } else {
          console.error('Failed to fetch action graph:', res.status, res.statusText)
        }
      } catch (error) {
        console.error('Error fetching action graph:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (agentId) {
      fetchActionGraph()
    }
  }, [agentId])

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault()

    const reactFlowBounds = event.currentTarget.getBoundingClientRect()
    const data = event.dataTransfer.getData('application/reactflow')
    if (!data) {
      return
    }

    const tool = JSON.parse(data) as Tool
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    }

    const newNode: GraphNode = {
      id: `node_${nodes.length + 1}`,
      type: 'custom',
      position,
      data: { 
        label: tool.name,
        toolId: tool.id,
        category: tool.category
      } as NodeData,
    }

    setNodes((nds) => nds.concat(newNode))
  }

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/agents/${agentId}/action-graph`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      })
      if (res.ok) {
        console.log('Action graph saved successfully')
      } else {
        console.error('Failed to save action graph:', res.status, res.statusText)
      }
    } catch (error) {
      console.error('Error saving action graph:', error)
    }
  }

  if (isLoading) {
    return <div>Loading action graph...</div>
  }

  return (
    <div style={{ width: '100%', height: '500px', display: 'flex' }}>
      <div style={{ width: '200px' }}>
        <ToolSidebar />
      </div>
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => {
            setNodes((nds) =>
              applyNodeChanges(changes, nds)
            )
          }}
          onEdgesChange={(changes) => {
            setEdges((eds) =>
              applyEdgeChanges(changes, eds)
            )
          }}
          onConnect={(params) => {
            setEdges((eds) => addEdge({...params, id: `e${eds.length + 1}`}, eds))
          }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
        </ReactFlow>
        <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Save Action Graph
        </button>
      </div>
    </div>
  )
}