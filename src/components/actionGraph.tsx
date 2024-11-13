import CustomNode from './custom-node'

const nodeTypes = {
  customNode: CustomNode,
}

// In ReactFlow component:
<ReactFlow
  elements={elements}
  onConnect={onConnect}
  nodeTypes={nodeTypes}
  /* ... */
>
  {/* ... */}
</ReactFlow>
