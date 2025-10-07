import { createMollieClient } from '@mollie/api-client'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const config = useRuntimeConfig()

    const mollieClient = createMollieClient({
      apiKey: config.mollieApiKey,
    })

    const payment = await mollieClient.payments.create({
      amount: {
        currency: 'EUR',
        value: String(body.amount),
      },
      description: `Bestelling #${body.deliveryUuid}`,
      redirectUrl: `${config.baseUrl}/payment-result?orderId=${body.deliveryUuid}`,
      webhookUrl: `${config.webhookBaseUrl}/api/mollie-webhook`,
      metadata: {
        order_id: body.deliveryUuid,
      },
      method: ['ideal', 'creditcard'], // ✅ let op: dit moet 'methods' zijn (array), niet 'method'
    })

    return { checkoutUrl: payment.getCheckoutUrl() }
  } catch (err: any) {
    console.error('❌ Mollie create-payment error:', err)

    // Geeft een nettere fout terug naar de frontend
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Mollie payment creation failed',
    })
  }
})
