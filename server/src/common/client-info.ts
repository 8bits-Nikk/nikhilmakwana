import type { Request } from 'express'
import { UAParser } from 'ua-parser-js'

export type ClientInfo = {
  /** Real client IP. Express resolves this from X-Forwarded-For because
   *  `trust proxy` is enabled — nginx is the only hop in front of us. */
  ip: string
  forwardedFor: string | null
  userAgent: string | null
  browser: string | null
  os: string | null
  deviceType: string
  referer: string | null
  origin: string | null
  language: string | null
}

const header = (request: Request, name: string): string | null => {
  const value = request.headers[name.toLowerCase()]
  if (Array.isArray(value)) return value[0] ?? null
  return value ?? null
}

const label = (name?: string, version?: string): string | null => {
  if (!name) return null
  return version ? `${name} ${version}` : name
}

export const getClientInfo = (request: Request): ClientInfo => {
  const userAgent = header(request, 'user-agent')
  const { browser, os, device } = UAParser(userAgent ?? '')

  return {
    ip: request.ip ?? 'unknown',
    forwardedFor: header(request, 'x-forwarded-for'),
    userAgent,
    browser: label(browser.name, browser.version),
    os: label(os.name, os.version),
    // ua-parser only names non-desktop devices, so anything unnamed is desktop.
    deviceType: device.type ?? 'desktop',
    referer: header(request, 'referer'),
    origin: header(request, 'origin'),
    language: header(request, 'accept-language'),
  }
}
