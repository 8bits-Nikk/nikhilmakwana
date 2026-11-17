import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

/**
 * Same behaviour as the stock guard, but returns a message the contact form can
 * show a visitor verbatim instead of the default "ThrottlerException".
 */
@Injectable()
export class FriendlyThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(): Promise<void> {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message:
          'Too many messages sent from this network. Please try again in a few minutes.',
        error: 'Too Many Requests',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    )
  }
}
