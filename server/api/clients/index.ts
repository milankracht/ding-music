export default defineEventHandler(async (event) => {
  const clients = await prisma.client.findMany()
  return clients
})
