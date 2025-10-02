// /server/api/payment-status.get.ts
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const orderId = getQuery(event).orderId as string

  const order = await prisma.delivery.findUnique({ where: { uuid: orderId } })

  if (!order)
    throw createError({ statusCode: 404, statusMessage: 'Order not found' })

  return { status: order.status }
})
