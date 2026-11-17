/**
 * Email bodies for the contact flow. Every interpolated value that came from
 * the visitor goes through `escapeHtml` — the HTML here is rendered by mail
 * clients, so an unescaped name is an injection vector.
 *
 * Styles are inline and layout is table-based because that is what mail
 * clients (Gmail, Outlook) reliably render.
 */

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export interface Signature {
  name: string
  title: string
  siteUrl: string
}

const siteLabel = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')

const shell = (inner: string) => `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f7">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;line-height:1.6">
          <tr><td style="height:4px;background:linear-gradient(90deg,#6366f1,#8b5cf6);background-color:#6366f1"></td></tr>
          ${inner}
        </table>
      </td></tr>
    </table>
  </body>
</html>`

/* ------------------------------------------------------------------------ */
/* Auto-reply to the visitor                                                 */
/* ------------------------------------------------------------------------ */

/**
 * Deliberately does NOT echo the visitor's message back. The form accepts any
 * address, so echoing would let someone use this server to send arbitrary
 * text to arbitrary inboxes. A fixed body is useless to a spammer.
 */
export function autoReply(visitorName: string, sig: Signature) {
  const firstName = visitorName.trim().split(/\s+/)[0] || 'there'
  const site = siteLabel(sig.siteUrl)

  const subject = `Thanks for reaching out, ${firstName}`

  const text = [
    `Hi ${firstName},`,
    '',
    'Thank you for getting in touch! Your message has reached me, and I really appreciate you taking the time to write.',
    '',
    'I read every enquiry personally and will get back to you as soon as possible.',
    '',
    `In the meantime, feel free to explore more of my work at ${sig.siteUrl}`,
    '',
    'Warm regards,',
    sig.name,
    sig.title,
    site,
    '',
    '—',
    'This is an automatic confirmation that your message was received. You can reply to this email directly.',
  ].join('\n')

  const html = shell(`
          <tr><td style="padding:32px 32px 8px">
            <p style="margin:0 0 16px;font-size:16px">Hi ${escapeHtml(firstName)},</p>
            <p style="margin:0 0 16px;font-size:15px">Thank you for getting in touch! Your message has reached me, and I really appreciate you taking the time to write.</p>
            <p style="margin:0 0 24px;font-size:15px">I read every enquiry personally and will get back to you as soon as possible.</p>
            <p style="margin:0 0 12px;font-size:15px">In the meantime, feel free to explore more of my work:</p>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px"><tr>
              <td style="border-radius:8px;background:#4f46e5">
                <a href="${escapeHtml(sig.siteUrl)}" style="display:inline-block;padding:11px 22px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none">Visit ${escapeHtml(site)} &rarr;</a>
              </td>
            </tr></table>
            <p style="margin:0;font-size:15px">Warm regards,</p>
          </td></tr>
          <tr><td style="padding:4px 32px 28px">
            <p style="margin:0;font-size:16px;font-weight:700;color:#111827">${escapeHtml(sig.name)}</p>
            <p style="margin:0;font-size:14px;color:#6b7280">${escapeHtml(sig.title)}</p>
            <p style="margin:0;font-size:14px"><a href="${escapeHtml(sig.siteUrl)}" style="color:#4f46e5;text-decoration:none">${escapeHtml(site)}</a></p>
          </td></tr>
          <tr><td style="padding:16px 32px;background:#f9fafb;border-top:1px solid #eef0f3;font-size:12px;color:#9ca3af">
            This is an automatic confirmation that your message was received. You can reply to this email directly.
          </td></tr>`)

  return { subject, text, html }
}

/* ------------------------------------------------------------------------ */
/* Enquiry notification to the site owner                                    */
/* ------------------------------------------------------------------------ */

export interface EnquiryInput {
  name: string
  email: string
  subject: string
  message: string
  receivedAt: Date
  meta: ReadonlyArray<readonly [string, string]>
}

export function enquiryNotification(input: EnquiryInput) {
  const when = input.receivedAt.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const subject = `[Portfolio] ${input.subject}`

  const text = [
    `New enquiry from ${input.name} <${input.email}>`,
    `Subject: ${input.subject}`,
    `Received: ${when} IST`,
    '',
    input.message,
    '',
    '---',
    ...input.meta.map(([key, value]) => `${key}: ${value}`),
  ].join('\n')

  const replyHref = `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: ${input.subject}`)}`

  const html = shell(`
          <tr><td style="padding:28px 32px 4px">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#6366f1">New portfolio enquiry</p>
            <h1 style="margin:0 0 20px;font-size:20px;line-height:1.35;color:#111827">${escapeHtml(input.subject)}</h1>
            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin:0 0 20px">
              <tr><td style="padding:2px 16px 2px 0;color:#6b7280">From</td><td style="font-weight:600">${escapeHtml(input.name)}</td></tr>
              <tr><td style="padding:2px 16px 2px 0;color:#6b7280">Email</td><td><a href="mailto:${escapeHtml(input.email)}" style="color:#4f46e5;text-decoration:none">${escapeHtml(input.email)}</a></td></tr>
              <tr><td style="padding:2px 16px 2px 0;color:#6b7280">Received</td><td>${escapeHtml(when)} IST</td></tr>
            </table>
            <div style="white-space:pre-wrap;font-size:15px;background:#f9fafb;border-left:3px solid #6366f1;border-radius:6px;padding:14px 16px;margin:0 0 24px">${escapeHtml(input.message)}</div>
            <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px"><tr>
              <td style="border-radius:8px;background:#4f46e5">
                <a href="${replyHref}" style="display:inline-block;padding:10px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none">Reply to ${escapeHtml(input.name.split(/\s+/)[0] ?? input.name)}</a>
              </td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:14px 32px 20px;background:#f9fafb;border-top:1px solid #eef0f3">
            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:12px;color:#6b7280">
              ${input.meta
                .map(
                  ([key, value]) =>
                    `<tr><td style="padding:1px 12px 1px 0"><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
                )
                .join('')}
            </table>
          </td></tr>`)

  return { subject, text, html }
}
