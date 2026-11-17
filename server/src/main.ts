import 'reflect-metadata'

import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const logger = new Logger('Bootstrap')

  // Requests arrive through two proxies: the host nginx terminating TLS for
  // nikhilmakwana.in, then the container nginx serving the site. Both append to
  // X-Forwarded-For, so a fixed hop count would silently break the moment one
  // is added or removed. Trusting the private ranges instead makes Express walk
  // the chain and return the first public address — the real visitor.
  //
  // This is also spoof-resistant: a forged X-Forwarded-For from the internet
  // has the client's real (public) address appended after it by the host nginx,
  // and that public address is what stops the walk.
  //
  // Without this, every visitor would share the host's IP and the rate limiter
  // would throttle them all as a single client.
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])

  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // Field-level messages are shown next to the inputs by the form.
      stopAtFirstError: true,
    }),
  )

  // Same-origin in production (nginx proxies /api), so CORS is only needed for
  // the Vite dev server on another port.
  const corsOrigin = process.env.CORS_ORIGIN
  if (corsOrigin) {
    app.enableCors({ origin: corsOrigin.split(',').map((o) => o.trim()) })
    logger.log(`CORS enabled for ${corsOrigin}`)
  }

  app.enableShutdownHooks()

  const port = Number(process.env.PORT ?? 3000)
  await app.listen(port, '0.0.0.0')
  logger.log(`Contact API listening on port ${port}`)
}

void bootstrap()
