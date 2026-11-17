import { ArrowUpRight } from 'lucide-react'

import ImageWrapper from '@/components/data-display/image-wrapper'
import Typography from '@/components/general/typography'
import { trackAttrs } from '@/lib/analytics'
import type { TechDetails } from '@/lib/types'

const TechCard = ({
  label,
  description,
  url,
  logo,
  darkModeLogo,
  icon: Icon,
  iconColor,
}: TechDetails) => {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted ring-1 ring-line transition-colors duration-300 group-hover:bg-brand-soft">
        {logo ? (
          <ImageWrapper
            src={logo}
            srcForDarkMode={darkModeLogo}
            alt={`${label} logo`}
            className="max-h-6 max-w-6 object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : Icon ? (
          <Icon
            className="size-6 transition-transform duration-300 group-hover:scale-110"
            color={iconColor}
            aria-hidden
          />
        ) : null}
      </span>

      <span className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-1.5">
          <Typography
            variant="body2"
            component="span"
            className="font-semibold text-gray-900"
          >
            {label}
          </Typography>
          {url && (
            <ArrowUpRight
              className="size-3.5 text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-hidden
            />
          )}
        </span>
        <Typography variant="body3" className="text-pretty">
          {description}
        </Typography>
      </span>
    </>
  )

  const className =
    'group flex h-full items-start gap-4 rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover'

  // Capabilities such as on-device AI have no vendor page to link to.
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={className}
      {...trackAttrs('tech-click', { tech: label })}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  )
}

export default TechCard
