import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { uuid } = getRouterParams(event)

  if (!uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Delivery UUID is required',
    })
  }

  if (!body.status) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Status is required',
    })
  }

  try {
    const updatedDelivery = await prisma.delivery.update({
      where: { uuid },
      data: {
        status: body.status,
        lastStatusUpdate: new Date(),
      },
    })

    return updatedDelivery
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: `Delivery with UUID ${uuid} not found`,
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update delivery',
    })
  }
})
