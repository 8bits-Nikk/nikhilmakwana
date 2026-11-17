import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createTransport, type Transporter } from 'nodemailer'

import type { ClientInfo } from '../common/client-info'
import type { CreateContactDto } from './dto/create-contact.dto'
import { autoReply, enquiryNotification, type Signature } from './mail-templates'

@Injectable()
export class ContactService implements OnModuleInit {
  private readonly logger = new Logger(ContactService.name)
  private transporter: Transporter | null = null

  constructor(private readonly config: ConfigService) {}

  private get dryRun(): boolean {
    return this.config.get('MAIL_DRY_RUN') === 'true'
  }

  /**
   * `"Nikhil Makwana" <hello@example.com>` — the display name is what a
   * recipient's inbox shows instead of the bare address. Quotes are stripped
   * from the name so it cannot break out of the quoted-string form.
   */
  private get fromAddress(): string {
    const appName = (
      this.config.get<string>('APP_NAME') ?? 'Nikhil Makwana'
    ).replace(/"/g, '')

    return `"${appName}" <${this.config.get<string>('FROM_EMAIL')}>`
  }

  onModuleInit(): void {
    const host = this.config.get<string>('SMTP_HOST')

    if (!host) {
      this.logger.warn(
        this.dryRun
          ? 'SMTP is not configured — running in dry-run mode, messages will be logged instead of sent.'
          : 'SMTP is not configured. The contact endpoint will return 503 until SMTP_HOST is set.',
      )
      return
    }

    const port = Number(this.config.get<string>('SMTP_PORT') ?? 587)

    this.transporter = createTransport({
      host,
      port,
      // Implicit TLS on 465; STARTTLS is negotiated on 587.
      secure: this.config.get('SMTP_SECURE') === 'true' || port === 465,
      auth: {
        user: this.config.get<string>('SMTP_USER'),
        pass: this.config.get<string>('SMTP_PASS'),
      },
    })

    // Surface bad credentials at boot rather than on the first visitor.
    this.transporter
      .verify()
      .then(() => this.logger.log(`SMTP ready (${host}:${port})`))
      .catch((error: Error) =>
        this.logger.error(`SMTP verification failed: ${error.message}`),
      )
  }

  async send(
    dto: CreateContactDto,
    client: ClientInfo,
    requestId: string,
  ): Promise<void> {
    // Honeypot filled: accept the request so the bot sees success, send nothing.
    if (dto.company) {
      this.logger.warn(
        JSON.stringify({
          requestId,
          event: 'contact.honeypot',
          ip: client.ip,
          userAgent: client.userAgent,
        }),
      )
      return
    }

    const subject = dto.subject?.length
      ? dto.subject
      : `Portfolio enquiry from ${dto.name}`

    // Metadata only — the message body itself is never written to the logs.
    this.logger.log(
      JSON.stringify({
        requestId,
        event: 'contact.received',
        name: dto.name,
        email: dto.email,
        subject,
        messageLength: dto.message.length,
        ip: client.ip,
        browser: client.browser,
        os: client.os,
        device: client.deviceType,
        referer: client.referer,
      }),
    )

    if (this.dryRun) {
      this.logger.warn(
        `[dry-run] Would email "${subject}" from ${dto.email} (${dto.message.length} chars)`,
      )
      return
    }

    if (!this.transporter) {
      throw new ServiceUnavailableException(
        'The contact service is not available right now. Please reach out on LinkedIn instead.',
      )
    }

    const receiver =
      this.config.get<string>('CONTACT_RECEIVER') ??
      this.config.get<string>('FROM_EMAIL')

    if (!receiver) {
      throw new ServiceUnavailableException(
        'The contact service is not available right now. Please reach out on LinkedIn instead.',
      )
    }

    const meta = [
      ['IP', client.ip],
      ['Browser', client.browser ?? 'unknown'],
      ['OS', client.os ?? 'unknown'],
      ['Device', client.deviceType],
      ['Referer', client.referer ?? 'direct'],
      ['Request ID', requestId],
    ] as const

    const notification = enquiryNotification({
      name: dto.name,
      email: dto.email,
      subject,
      message: dto.message,
      receivedAt: new Date(),
      meta: meta.map(([key, value]) => [key, String(value)] as const),
    })

    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to: receiver,
        // Replying in the mail client goes straight back to the visitor.
        replyTo: `${dto.name} <${dto.email}>`,
        ...notification,
      })

      this.logger.log(
        JSON.stringify({ requestId, event: 'contact.sent', to: receiver }),
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      this.logger.error(
        JSON.stringify({ requestId, event: 'contact.failed', error: message }),
      )
      throw new InternalServerErrorException(
        'Your message could not be sent right now. Please try again shortly.',
      )
    }

    // The enquiry is safely delivered at this point, so a failed confirmation
    // must not turn the visitor's request into an error, nor delay the response.
    void this.sendAutoReply(dto, receiver, requestId)
  }

  private get signature(): Signature {
    return {
      name: this.config.get<string>('APP_NAME') ?? 'Nikhil Makwana',
      title: this.config.get<string>('SIGNATURE_TITLE') ?? 'Senior Software Engineer',
      siteUrl: this.config.get<string>('SITE_URL') ?? 'https://nikhilmakwana.in',
    }
  }

  private async sendAutoReply(
    dto: CreateContactDto,
    receiver: string,
    requestId: string,
  ): Promise<void> {
    if (this.config.get('AUTO_REPLY_ENABLED') === 'false' || !this.transporter) {
      return
    }

    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to: `${dto.name.replace(/[<>"]/g, '')} <${dto.email}>`,
        // Their reply lands in the owner's inbox, not the sending mailbox.
        replyTo: receiver,
        ...autoReply(dto.name, this.signature),
      })
      this.logger.log(
        JSON.stringify({ requestId, event: 'contact.autoreply.sent' }),
      )
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      this.logger.warn(
        JSON.stringify({ requestId, event: 'contact.autoreply.failed', error: message }),
      )
    }
  }
}
