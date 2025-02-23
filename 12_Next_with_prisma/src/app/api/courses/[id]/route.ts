import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { courseSchema, paramsSchema } from '@/lib/validations/course'

const prisma = new PrismaClient()

async function validateRequest(params: { id: string }) {
  const result = paramsSchema.safeParse(params)
  if (!result.success) {
    return { error: result.error.errors, status: 400 }
  }
  return { id: result.data.id }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateRequest(params)
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    const course = await prisma.course.findUnique({
      where: { id: validation.id },
      include: { category: true }
    })

    if (!course) return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    return NextResponse.json(course)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch course' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateRequest(params)
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    const body = await request.json()
    const result = courseSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 })
    }

    const course = await prisma.course.update({
      where: { id: validation.id },
      data: result.data,
      include: { category: true }
    })

    return NextResponse.json(course)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const validation = await validateRequest(params)
    if ('error' in validation) {
      return NextResponse.json({ error: validation.error }, { status: validation.status })
    }

    await prisma.course.delete({ where: { id: validation.id } })
    return NextResponse.json({ message: 'Course deleted successfully' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 })
  }
}
