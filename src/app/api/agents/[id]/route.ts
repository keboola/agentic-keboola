import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const agent = await prisma.agent.findUnique({ where: { id } })
    if (agent) {
      return NextResponse.json(agent)
    } else {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const body = await request.json()
    const { name, description, type, status } = body
    const updatedAgent = await prisma.agent.update({
      where: { id },
      data: { name, description, type, status },
    })
    return NextResponse.json(updatedAgent)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 400 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    await prisma.agent.delete({ where: { id } })
    return NextResponse.json({ message: 'Agent deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete agent' }, { status: 400 })
  }
} 