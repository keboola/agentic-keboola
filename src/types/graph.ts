export type GraphNode = {
  id: string
  data: { label: string }
  position: { x: number; y: number }
  type?: string
  // ... other properties
}

export type GraphEdge = {
  id: string
  source: string
  target: string
  // ... other properties
}
