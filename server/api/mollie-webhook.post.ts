import { createMollieClient, Payment } from '@mollie/api-client'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ id: string }>(event)
  const config = useRuntimeConfig()

  if (!body.id)
    throw createError({
      statusCode: 400,
      statusMessage: 'Payment ID is required',
    })

  const mollieClient = createMollieClient({
    apiKey: config.mollieApiKey,
  })
  const payment: Payment = await mollieClient.payments.get(body.id)

  const metadata = payment.metadata as { order_id: string }

  console.log(
    '***** Mollie webhook received for payment:',
    payment.id,
    'with status:',
    payment.status
  )

  if (!metadata?.order_id) return { status: 'ok' }

  // Update database direct
  let newStatus: 'processed' | 'error' | 'pending' = 'pending'

  if (payment.status === 'paid') newStatus = 'processed'
  else if (['failed', 'canceled', 'expired'].includes(payment.status))
    newStatus = 'error'

  if (newStatus) {
    try {
      await prisma.delivery.update({
        where: { uuid: metadata.order_id },
        data: { status: newStatus, lastStatusUpdate: new Date() },
      })
    } catch (err: any) {
      console.error('Failed to update delivery from webhook:', err)
    }
  }

  return { status: 'ok' }
})
