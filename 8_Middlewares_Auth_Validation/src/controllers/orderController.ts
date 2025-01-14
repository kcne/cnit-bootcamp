import { Request, Response } from 'express'
import prisma from '../prisma'

export const createOrder = async (req: Request, res: Response) => {
  const { userId, totalAmount } = req.body
  try {
    const order = await prisma.order.create({
      data: {
        totalAmount,
        user: { connect: { id: Number(userId) } },
      },
    })
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create order' })
  }
}

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(id) },
    })
    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
}

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const order = await prisma.order.delete({
      where: { id: Number(id) },
    })
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' })
  }
}
