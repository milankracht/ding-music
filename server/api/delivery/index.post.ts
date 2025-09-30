import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.clientId || !body.details) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Client ID and order details are required',
    })
  }

  try {
    const newDelivery = await prisma.delivery.create({
      data: {
        uuid: crypto.randomUUID(),
        clientId: body.clientId,
        details: body.details,
        createdAt: new Date(),
        status: 'pending',
        lastStatusUpdate: new Date(),
      },
    })

    return newDelivery
  } catch (err: any) {
    console.error('Prisma error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
