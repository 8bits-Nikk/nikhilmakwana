import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'

import Button from '@/components/general/button'
import FormField, {
  controlClasses,
  controlErrorClasses,
} from '@/components/general/form-field'
import Typography from '@/components/general/typography'
import { track } from '@/lib/analytics'
import {
  EMPTY_CONTACT_FIELDS,
  submitContactForm,
  validateContactFields,
  type ContactErrors,
  type ContactFields,
} from '@/lib/contact'
import { mergeClasses } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ContactForm = () => {
  const [fields, setFields] = useState<ContactFields>(EMPTY_CONTACT_FIELDS)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [successNote, setSuccessNote] = useState('')
  const [errorNote, setErrorNote] = useState('')

  const updateField =
    (field: keyof ContactFields) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setFields((current) => ({ ...current, [field]: event.target.value }))
      // Clear the error as soon as the visitor starts fixing it.
      setErrors((current) =>
        current[field] ? { ...current, [field]: undefined } : current,
      )
    }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // The honeypot is checked server-side so bot hits are logged in one place;
    // the field is still submitted below.
    const nextErrors = validateContactFields(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')

    try {
      const { delivery } = await submitContactForm(fields)
      setStatus('success')
      track('contact-submit', { result: 'success', delivery })
      setSuccessNote(
        delivery === 'endpoint'
          ? 'Thanks for reaching out — I will get back to you shortly.'
          : 'Your email client should now be open with the message ready to send.',
      )
      setFields(EMPTY_CONTACT_FIELDS)
    } catch (error) {
      setStatus('error')
      track('contact-submit', { result: 'error' })
      // The API writes its error messages for visitors, so show them as-is.
      setErrorNote(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong while sending your message. Please try again.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <Typography variant="h4">Message sent</Typography>
        <Typography variant="body2" className="max-w-sm text-pretty">
          {successNote}
        </Typography>
        <Button
          variant="outline"
          onClick={() => {
            setStatus('idle')
            setSuccessNote('')
          }}
        >
          Send another message
        </Button>
      </div>
    )
  }

  const isSubmitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={fields.name}
            onChange={updateField('name')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={mergeClasses(
              controlClasses,
              errors.name && controlErrorClasses,
            )}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={fields.email}
            onChange={updateField('email')}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={mergeClasses(
              controlClasses,
              errors.email && controlErrorClasses,
            )}
          />
        </FormField>
      </div>

      <FormField label="Subject" htmlFor="subject">
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="Project enquiry"
          value={fields.subject}
          onChange={updateField('subject')}
          disabled={isSubmitting}
          className={controlClasses}
        />
      </FormField>

      <FormField
        label="Message"
        htmlFor="message"
        error={errors.message}
        required
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Tell me a little about what you are building and how I can help."
          value={fields.message}
          onChange={updateField('message')}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={mergeClasses(
            controlClasses,
            'resize-y',
            errors.message && controlErrorClasses,
          )}
        />
      </FormField>

      {/* Honeypot: off-screen and skipped by keyboard, so only bots fill it. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company}
          onChange={updateField('company')}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:self-start"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : (
            <Send aria-hidden />
          )}
          {isSubmitting ? 'Sending…' : 'Send message'}
        </Button>

        <div aria-live="polite">
          {status === 'error' && (
            <Typography
              variant="body3"
              className="flex items-start gap-2 text-red-600 dark:text-red-400"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {errorNote}
            </Typography>
          )}
        </div>
      </div>
    </form>
  )
}

export default ContactForm
