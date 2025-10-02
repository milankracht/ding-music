export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Use Resend API (https://resend.com/docs/api-reference/emails/send-email)
  const RESEND_API_KEY = process.env.RESEND_API_KEY
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
      bcc: ['info@ding-music.nl'],
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
