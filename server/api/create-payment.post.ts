import { createMollieClient } from '@mollie/api-client'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const mollieClient = createMollieClient({
    apiKey: process.env.MOLLIE_API_KEY!,
  })

  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: String(body.amount),
    },
    description: `Bestelling #${body.deliveryUuid}`,
    redirectUrl: `${process.env.BASE_URL}/success?clientId=${body.clientId}`,
    webhookUrl: `${process.env.BASE_URL}/api/mollie-webhook`,
    metadata: {
      order_id: body.deliveryUuid,
    },
  })

  return { checkoutUrl: payment.getCheckoutUrl() }
})
