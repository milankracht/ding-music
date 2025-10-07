import SibApiV3Sdk from 'sib-api-v3-sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { to, orderId, total } = body

  const config = useRuntimeConfig()
  const apiKey = config.brevoApiKey

  if (!to || !orderId || !total) {
    throw createError({ statusCode: 400, statusMessage: 'Missing fields' })
  }

  const defaultClient = SibApiV3Sdk.ApiClient.instance
  defaultClient.authentications['api-key'].apiKey = apiKey

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi()

  const email = {
    sender: { name: 'Ding Music', email: 'noreply@ding-music.nl' },
    to: [{ email: to }],
    subject: `Bevestiging van je bestelling #${orderId}`,
    htmlContent: `
      <h2>Bedankt voor je bestelling bij Ding Music!</h2>
      <p>Je ordernummer is <strong>${orderId}</strong>.</p>
      <p>Totaalbedrag: <strong>€${total}</strong></p>
      <p>We sturen je een update zodra de bestelling verzonden is.</p>
    `,
  }

  try {
    await tranEmailApi.sendTransacEmail(email)
    return { success: true }
  } catch (error: any) {
    console.error(
      'Brevo error response:',
      error.response ? error.response.body : error
    )
    throw createError({
      statusCode: 500,
      statusMessage: 'E-mail verzenden mislukt',
    })
  }
})
