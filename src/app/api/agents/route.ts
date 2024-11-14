import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(_request: NextRequest) {
  try {
    const agents = await prisma.agent.findMany()
    return NextResponse.json(agents)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, type, status } = body
    const newAgent = await prisma.agent.create({
      data: { name, description, type, status },
    })
    return NextResponse.json(newAgent, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create agent' }, { status: 400 })
  }
}
