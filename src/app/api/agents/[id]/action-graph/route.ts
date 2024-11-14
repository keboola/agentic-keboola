import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/agents/{id}/action-graph
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params

  try {
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      select: { actionGraph: true },
    })

    if (agent) {
      return NextResponse.json(agent.actionGraph || { nodes: [], edges: [] })
    } else {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching action graph:', error)
    return NextResponse.json({ error: 'Failed to fetch action graph' }, { status: 500 })
  }
}

// POST /api/agents/{id}/action-graph
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params

  try {
    const graphData = await request.json()

    const updatedAgent = await prisma.agent.update({
      where: { id: agentId },
      data: { actionGraph: graphData },
    })

    return NextResponse.json({ message: 'Graph saved successfully' })
  } catch (error) {
    console.error('Error saving action graph:', error)
    return NextResponse.json({ error: 'Failed to save action graph' }, { status: 500 })
  }
}