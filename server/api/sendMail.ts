import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const transporter = nodemailer.createTransport({
    host: 'ding-music.nl',
    port: 465,
    secure: true,
    auth: {
      user: 'info@ding-music.nl',
      pass: 'Wnur77%80',
    },
  })

  await transporter.sendMail({
    from: '"DING!" <info@ding-music.nl>',
    to: body.to,
    bcc: 'info@ding-music.nl',
    subject: body.subject,
    text: body.message,
    html: `<p>${body.message}</p>`,
  })

  return { success: true }
})
