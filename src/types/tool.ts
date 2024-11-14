export interface Tool {
  id: string
  name: string
  category: 'tool' | 'workflow'
  icon: React.ReactNode
} 