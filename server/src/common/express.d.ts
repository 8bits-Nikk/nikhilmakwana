declare global {
  namespace Express {
    interface Request {
      /** Set by RequestLoggerMiddleware; also returned as the X-Request-Id header. */
      requestId?: string
    }
  }
}

export {}
