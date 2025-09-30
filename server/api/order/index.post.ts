import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.clientId || !body.details) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Client ID and order details are required',
    })
  }

  const newOrder = await prisma.order.create({
    data: {
      uuid: crypto.randomUUID(),
      clientId: body.clientId,
      details: body.details,
      createdAt: new Date(),
      status: 'pending',
      lastStatusUpdate: new Date(),
    },
  })

  return newOrder
})
