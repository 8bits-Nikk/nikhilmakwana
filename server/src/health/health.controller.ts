import { Controller, Get } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler'

@Controller('health')
// Bare @SkipThrottle() only skips the 'default' throttler; name them all.
@SkipThrottle({ default: true, contact: true })
export class HealthController {
  @Get()
  check(): { status: 'ok'; uptime: number; timestamp: string } {
    return {
      status: 'ok',
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    }
  }
}
