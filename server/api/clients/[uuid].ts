import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const { uuid } = event.context.params as { uuid: string }

  if (!uuid) {
    throw createError({
      statusCode: 400,
      statusMessage: 'UUID is required',
    })
  }

  const client = await prisma.client.findUnique({
    where: { uuid },
  })

  if (!client) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Client not found',
    })
  }

  return client
})
