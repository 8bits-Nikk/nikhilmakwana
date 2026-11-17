import type { ComponentType, SVGProps } from 'react'

/**
 * Images are imported as modules from `src/assets` — Vite resolves those to a
 * hashed URL string at build time, so every image field is simply a string.
 */
export type ImageSource = string

/**
 * Narrow enough that both the local brand SVGs and lucide's icons satisfy it —
 * lucide's own props type omits `ref`, so the full `SVGProps` does not fit.
 */
export type IconComponent = ComponentType<
  Pick<SVGProps<SVGSVGElement>, 'className' | 'color' | 'aria-hidden'>
>

export type NavLink = {
  label: string
  href: `#${string}`
}

export type SocialLink = {
  label: string
  icon: IconComponent
  url: string
}

export type TechDetails = {
  label: string
  /** One line on how I actually use it — shown on the skill card. */
  description: string
  /** Groups the skill grid into meaningful buckets. */
  category: TechCategory
  /** Omitted for entries with no natural destination, e.g. on-device AI. */
  url?: string
  /** Brand mark from `src/assets/images/logos`. */
  logo?: ImageSource
  darkModeLogo?: ImageSource
  /**
   * Glyph fallback for technologies with no usable brand mark — either because
   * the vendor restricts it (AWS, Oracle) or because it is a capability rather
   * than a product (AI work).
   */
  icon?: IconComponent
  /** Accent colour for the glyph fallback. */
  iconColor?: string
}

export type TechCategory =
  | 'Languages'
  | 'Mobile'
  | 'Backend'
  | 'Data & Cloud'
  | 'AI'
  | 'Tools'

export type ExperienceDetails = {
  logo: ImageSource
  darkModeLogo?: ImageSource
  logoAlt: string
  company: string
  position: string
  location?: string
  currentlyWorkHere?: boolean
  startDate: Date
  endDate?: Date
  summary: string[]
  technologies?: string[]
}

export type ProjectDetails = {
  name: string
  /** Short label shown above the project name, e.g. "Mobile app". */
  category?: string
  description: string
  url?: string
  keyFeatures?: string[]
  previewImage?: ImageSource
  technologies: string[]
}

export type TestimonialDetails = {
  personName: string
  personAvatar?: ImageSource
  testimonial: string
  title: string
}

export type Stat = {
  value: string
  label: string
}
