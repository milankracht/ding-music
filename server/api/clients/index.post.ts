import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.name || !body.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required',
    })
  }

  const newClient = await prisma.client.create({
    data: {
      uuid: crypto.randomUUID(),
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

  return newClient
})
