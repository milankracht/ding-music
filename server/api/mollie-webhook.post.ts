import { createMollieClient, Payment } from '@mollie/api-client'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY || '',
  })

  const payment: Payment = await mollieClient.payments.get(body.id)

  type PaymentMetadata = {
    order_id: string
  }

  const metadata = payment.metadata as PaymentMetadata

  if (payment.status === 'paid') {
    // change status delivery to 'processed'
    return $fetch(`/api/delivery/${metadata.order_id}`, {
      method: 'PUT',
      body: {
        status: 'processed',
      },
    })
  } else if (
    payment.status === 'failed' ||
    payment.status === 'expired' ||
    payment.status === 'canceled'
  ) {
    // change status delivery to 'error'
    return $fetch(`/api/delivery/${metadata.order_id}`, {
      method: 'PUT',
      body: {
        status: 'error',
      },
    })
  }

  return { status: 'ok' }
})
