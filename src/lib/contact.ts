import { PROFILE } from '@/lib/data'

export type ContactFields = {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — real users never see it, so anything here means a bot. */
  company: string
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>

export const EMPTY_CONTACT_FIELDS: ContactFields = {
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
}

/**
 * Where submissions are POSTed. The site is a static bundle with no server of
 * its own, so this has to be a third-party form endpoint (Formspree,
 * Web3Forms, Formsubmit, …). Set it in `.env.local` — Vite inlines it at build
 * time, so the Docker image has to be rebuilt after changing it.
 *
 * When it is unset the form falls back to opening the visitor's mail client,
 * which means the form still works out of the box on a fresh checkout.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim()

export const hasContactEndpoint = Boolean(ENDPOINT)

// Deliberately loose: the goal is to catch typos, not to police valid addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateContactFields = (fields: ContactFields): ContactErrors => {
  const errors: ContactErrors = {}

  if (fields.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (fields.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.'
  }

  return errors
}

const buildMailtoUrl = ({ name, email, subject, message }: ContactFields) => {
  const body = [
    message.trim(),
    '',
    '—',
    `${name.trim()}${email.trim() ? ` (${email.trim()})` : ''}`,
  ].join('\n')

  const params = new URLSearchParams({
    subject: subject.trim() || `Portfolio enquiry from ${name.trim()}`,
    body,
  })

  return `mailto:${PROFILE.email}?${params.toString()}`
}

export type SubmitResult = { delivery: 'endpoint' | 'mail-client' }

const FALLBACK_ERRORS: Record<number, string> = {
  400: 'Please check the details you entered and try again.',
  429: 'Too many messages sent from this network. Please try again in a few minutes.',
  503: 'The contact service is unavailable right now. Please reach out on LinkedIn instead.',
}

/**
 * Pulls the message out of the API's error body. Nest returns `message` as a
 * string, or as an array of field messages for validation failures. Every
 * message the API produces is written to be shown to a visitor as-is.
 */
const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body: unknown = await response.json()

    if (body && typeof body === 'object' && 'message' in body) {
      const { message } = body as { message: unknown }
      if (typeof message === 'string' && message.trim()) return message
      if (Array.isArray(message) && message.length > 0) {
        return message.filter((item) => typeof item === 'string').join(' ')
      }
    }
  } catch {
    /* not JSON — fall through to the status-based message */
  }

  return (
    FALLBACK_ERRORS[response.status] ??
    'Your message could not be sent right now. Please try again shortly.'
  )
}

/**
 * Sends the message, or hands it to the visitor's mail client when no endpoint
 * is configured. Throws on failure so the caller can show an error state.
 */
export const submitContactForm = async (
  fields: ContactFields,
): Promise<SubmitResult> => {
  if (!ENDPOINT) {
    window.location.href = buildMailtoUrl(fields)
    return { delivery: 'mail-client' }
  }

  let response: Response

  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: fields.subject.trim() || undefined,
        message: fields.message.trim(),
        // Forwarded so the server can drop bot submissions too, not just the
        // client. Empty for real visitors.
        company: fields.company || undefined,
      }),
    })
  } catch {
    throw new Error(
      'Could not reach the server. Please check your connection and try again.',
    )
  }

  if (!response.ok) {
    throw new Error(await readErrorMessage(response))
  }

  return { delivery: 'endpoint' }
}
