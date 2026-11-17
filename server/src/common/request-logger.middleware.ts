import { randomUUID } from 'node:crypto'

import { Injectable, Logger, type NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

import { getClientInfo } from './client-info'

/**
 * Logs one structured JSON line per request, emitted on response finish so the
 * status code and duration are known. JSON keeps the output greppable and
 * ready for `docker compose logs` or any log shipper.
 */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP')

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = process.hrtime.bigint()

    // Correlates this log line with the response the caller received.
    const requestId = randomUUID()
    request.requestId = requestId
    response.setHeader('X-Request-Id', requestId)

    response.on('finish', () => {
      const durationMs =
        Number(process.hrtime.bigint() - startedAt) / 1_000_000
      const client = getClientInfo(request)

      const entry = {
        requestId,
        method: request.method,
        path: request.originalUrl,
        status: response.statusCode,
        durationMs: Number(durationMs.toFixed(1)),
        ip: client.ip,
        forwardedFor: client.forwardedFor,
        browser: client.browser,
        os: client.os,
        device: client.deviceType,
        referer: client.referer,
        language: client.language,
        userAgent: client.userAgent,
        bytes: Number(response.getHeader('content-length') ?? 0),
      }

      const line = JSON.stringify(entry)

      // 4xx/5xx are worth surfacing at a higher level — 429 especially, since
      // that is the rate limiter doing its job.
      if (response.statusCode >= 500) this.logger.error(line)
      else if (response.statusCode >= 400) this.logger.warn(line)
      else this.logger.log(line)
    })

    next()
  }
}
