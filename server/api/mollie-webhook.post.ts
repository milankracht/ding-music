import mollieClient from '@mollie/api-client'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const mollie = mollieClient({ apiKey: process.env.MOLLIE_API_KEY || '' })

  const payment = await mollie.payments.get(body.id)

  type PaymentMetadata = {
    deliveryUuid: string
    clientId: string
  }

  const metadata = payment.metadata as PaymentMetadata

  if (payment.status === 'paid') {
    // change status delivery to 'processed'
    return $fetch(`/api/delivery/${metadata.deliveryUuid}`, {
      method: 'PUT',
      body: {
        clientId: metadata.clientId,
        status: 'processed',
      },
    })
  } else if (
    payment.status === 'failed' ||
    payment.status === 'expired' ||
    payment.status === 'canceled'
  ) {
    // change status delivery to 'error'
    return $fetch(`/api/delivery/${metadata.deliveryUuid}`, {
      method: 'PUT',
      body: {
        clientId: metadata.clientId,
        status: 'error',
      },
    })
  }

  return { status: 'ok' }
})
