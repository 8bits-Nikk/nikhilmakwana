import ImageWrapper from '@/components/data-display/image-wrapper'
import Tag from '@/components/data-display/tag'
import Typography from '@/components/general/typography'
import Card from '@/components/layout/card'
import type { ExperienceDetails } from '@/lib/types'
import { formatDateRange, formatDuration } from '@/lib/utils'

/**
 * One entry on the experience timeline. The vertical rail and the node dot are
 * drawn here; the parent only needs to stack these in a `relative` list.
 */
const ExperienceItem = ({
  logo,
  darkModeLogo,
  logoAlt,
  company,
  position,
  location,
  currentlyWorkHere,
  startDate,
  endDate,
  summary,
  technologies,
}: ExperienceDetails) => (
  <div className="relative pl-10 md:pl-16">
    {/* Timeline node */}
    <span
      className="absolute left-2 top-8 flex size-4 -translate-x-1/2 items-center justify-center md:left-6"
      aria-hidden
    >
      <span className="absolute size-4 rounded-full bg-brand/20" />
      <span className="relative size-2.5 rounded-full bg-brand ring-4 ring-canvas" />
      {currentlyWorkHere && (
        <span className="absolute size-4 animate-ping rounded-full bg-brand/40" />
      )}
    </span>

    <Card interactive className="flex flex-col gap-5 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Both company marks are dark-on-transparent, so they always sit on
              a light tile to stay legible in dark mode. */}
          <span className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2 ring-1 ring-gray-200/60 dark:ring-white/10">
            <ImageWrapper
              src={logo}
              srcForDarkMode={darkModeLogo}
              alt={logoAlt}
              className="max-h-8 max-w-full object-contain"
            />
          </span>
          <div className="flex flex-col gap-0.5">
            <Typography variant="h4">{position}</Typography>
            <Typography variant="body3" className="font-medium">
              {company}
              {location && (
                <span className="text-gray-500"> · {location}</span>
              )}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1 md:items-end">
          {currentlyWorkHere ? (
            <Tag size="sm" variant="brand" label="Current" />
          ) : null}
          <Typography variant="body3" className="text-gray-500">
            {formatDateRange(startDate, endDate, currentlyWorkHere)}
            <span className="mx-1.5">·</span>
            {formatDuration(startDate, currentlyWorkHere ? undefined : endDate)}
          </Typography>
        </div>
      </div>

      <ul className="flex list-none flex-col gap-2">
        {summary.map((sentence) => (
          <li key={sentence} className="flex gap-3">
            <span
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand/60"
              aria-hidden
            />
            <Typography>{sentence}</Typography>
          </li>
        ))}
      </ul>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <Tag key={technology} size="sm" label={technology} />
          ))}
        </div>
      )}
    </Card>
  </div>
)

export default ExperienceItem
