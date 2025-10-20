/**
 *
 */

import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
    host: 'ding-music.nl',
    port: 465,
    secure: true,
    auth: {
      user: 'mail@ding-music.nl',
      pass: process.env.MAIL_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: '"DING!" <noreply@ding-music.nl>',
    to: body.to,
    bcc: 'milankr8@icloud.com',
    subject: body.subject,
    text: body.message,
    html: `<p>${body.message}</p>`,
  })

  return { success: true }
})

/**
 * Sends a confirmation email using the Resend API.
 */
/*
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const RESEND_API_KEY = config.resendApiKey
  if (!RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY in environment')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DING! <info@ding-music.nl>',
      to: [body.to],
      bcc: ['milankr8@icloud.com'],
      subject: body.subject,
      html: `<p>${body.message}</p>`,
      text: body.message,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Failed to send email: ${error}`)
  }

  return { success: true }
})
*/

/**
 * Sends a confirmation email using the Brevo (formerly Sendinblue) API.
 */
/*
import SibApiV3Sdk from 'sib-api-v3-sdk'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { to, orderId, total, subject, message } = body

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
    bcc: 'milankr8@icloud.com',
    subject,
    htmlContent: message,
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
  */
