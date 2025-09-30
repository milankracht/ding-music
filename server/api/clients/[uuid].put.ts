import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { uuid } = getRouterParams(event)

  if (!uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Client UUID is required',
    })
  }

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required',
    })
  }

  try {
    const updatedClient = await prisma.client.update({
      where: { uuid },
      data: {
        name: body.name,
        email: body.email,
        address: body.address ?? '',
        postalCode: body.postalCode ?? '',
        city: body.city ?? '',
        country: body.country ?? '',
        status: 'active',
        lastActivity: new Date(),
      },
    })

    return updatedClient
  } catch (error: any) {
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: `Client with UUID ${uuid} not found`,
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update client',
    })
  }
})
