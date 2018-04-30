// public.js
import HTTP from './http-common'

/**
 * Send mail by SMTP
 *
 * @param {Object} contact
 * @param {string} name
 * @param {string} toEmail
 * @param {string} fromEmail
 * @param {string} subject
 * @param {string} message
 *
 * @returns Promisse
 */
export const sendMail = (contact) => {
  let message = `
    Responda essa mesagem neste e-mail: ${contact.toEmail}
  `
  let mail = {
    name: contact.name,
    email: contact.fromEmail,
    subject: contact.subject,
    message: contact.message + message
  }

  return HTTP.post('mail', JSON.stringify(mail))
}

/**
 * Create qrcode by URL
 *
 * @param {string} url
 *
 * @returns Promisse
 */
export const qrcode = (url) => {
  return HTTP.get(`qrcode?url=${url}`, {
    responseType: 'arraybuffer'
  })
    .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}
