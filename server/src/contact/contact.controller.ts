import { Body, Controller, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import type { Request } from 'express'

import { getClientInfo } from '../common/client-info'
import { ContactService } from './contact.service'
import { CreateContactDto } from './dto/create-contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /** Deliberately much stricter than the global limit: 3 messages per 10
   *  minutes per IP is generous for a human and useless for a spammer. */
  @Throttle({ contact: { limit: 3, ttl: 600_000 } })
  @Post()
  @HttpCode(HttpStatus.OK)
  async submit(
    @Body() dto: CreateContactDto,
    @Req() request: Request,
  ): Promise<{ success: true; message: string }> {
    await this.contactService.send(
      dto,
      getClientInfo(request),
      request.requestId ?? 'unknown',
    )

    return {
      success: true,
      message: 'Thanks for reaching out — I will get back to you shortly.',
    }
  }
}
