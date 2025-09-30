import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const deliveries = await prisma.delivery.findMany()
  return deliveries
})
