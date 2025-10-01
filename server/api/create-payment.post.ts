import mollieClient from '@mollie/api-client'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const mollie = mollieClient({ apiKey: process.env.MOLLIE_API_KEY || '' })

  const payment = await mollie.payments.create({
    amount: {
      currency: 'EUR',
      value: `${body.amount}`,
    },
    description: `Bestelling #${body.deliveryUuid.substring(0, 8)}`,
    redirectUrl: `${process.env.BASE_URL}/success?clientId=${body.clientId}`,
    webhookUrl: `${process.env.BASE_ENV}/api/mollie-webhook`,
  })

  return { checkoutUrl: payment.getCheckoutUrl() }
})
