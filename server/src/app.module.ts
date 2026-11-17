import {
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule } from '@nestjs/throttler'

import { FriendlyThrottlerGuard } from './common/friendly-throttler.guard'
import { RequestLoggerMiddleware } from './common/request-logger.middleware'
import { ContactModule } from './contact/contact.module'
import { HealthController } from './health/health.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      // Blanket ceiling for every route.
      { name: 'default', ttl: 60_000, limit: 60 },
      // Every throttler listed here applies to EVERY route, so this one is
      // deliberately permissive. The contact endpoint tightens it to
      // 3 per 10 minutes with @Throttle — that is the only place it bites.
      { name: 'contact', ttl: 60_000, limit: 1000 },
    ]),
    ContactModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: FriendlyThrottlerGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}
