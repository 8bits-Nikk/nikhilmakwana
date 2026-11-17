/**
 * Thin wrapper over the self-hosted Umami tracker loaded in `index.html`.
 *
 * Links are tracked declaratively: spread `trackAttrs(...)` onto an `<a>` and
 * Umami's own click listener records the event, which also works for links
 * that navigate away. Use `track()` for things that are not clicks (form
 * results, theme changes, sections scrolled into view).
 *
 * Every call is a no-op when the tracker is absent (dev server, ad blockers,
 * script failed to load), so nothing here may be relied on for app behaviour.
 * Never pass personal data — no names, emails or message text.
 */

export type AnalyticsEvent =
  | 'cv-download'
  | 'contact-cta'
  | 'contact-submit'
  | 'social-click'
  | 'project-click'
  | 'tech-click'
  | 'nav-click'
  | 'theme-toggle'
  | 'section-view'

type EventData = Record<string, string | number | boolean>

declare global {
  interface Window {
    umami?: { track: (event: string, data?: EventData) => void }
  }
}

export function track(event: AnalyticsEvent, data?: EventData): void {
  try {
    window.umami?.track(event, data)
  } catch {
    /* analytics must never break the page */
  }
}

/** `data-umami-event` attributes for an element Umami should track on click. */
export function trackAttrs(
  event: AnalyticsEvent,
  data: Record<string, string> = {},
): Record<string, string> {
  const attrs: Record<string, string> = { 'data-umami-event': event }
  for (const [key, value] of Object.entries(data)) {
    attrs[`data-umami-event-${key}`] = value
  }
  return attrs
}
