import { ArrowUpRight, Check } from 'lucide-react'

import Tag from '@/components/data-display/tag'
import Typography from '@/components/general/typography'
import Card from '@/components/layout/card'
import { trackAttrs } from '@/lib/analytics'
import type { ProjectDetails } from '@/lib/types'

type ProjectCardProps = ProjectDetails & {
  /** 0-based position, rendered as the "01" index badge. */
  index: number
}

const ProjectCard = ({
  index,
  name,
  category,
  description,
  technologies,
  url,
  keyFeatures,
}: ProjectCardProps) => (
  <Card interactive className="group relative overflow-hidden p-6 md:p-9">
    {/* Oversized index number, purely decorative. */}
    <span
      className="pointer-events-none absolute -top-6 right-2 text-[7rem] leading-none font-bold text-gray-100/80 transition-colors duration-300 select-none group-hover:text-brand/10 md:text-[9rem]"
      aria-hidden
    >
      {String(index + 1).padStart(2, '0')}
    </span>

    <div className="relative flex flex-col gap-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          {category && <Typography variant="overline">{category}</Typography>}
          <Typography variant="h3" className="text-balance">
            {name}
          </Typography>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${name}`}
            {...trackAttrs('project-click', { project: name })}
            title={`Open ${name}`}
            className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
          >
            <ArrowUpRight className="size-5" />
          </a>
        )}
      </div>

      <Typography variant="body1" className="max-w-3xl text-pretty">
        {description}
      </Typography>

      {keyFeatures && keyFeatures.length > 0 && (
        <div className="flex flex-col gap-3">
          <Typography variant="body3" className="font-semibold text-gray-900">
            Key features
          </Typography>
          <ul className="grid list-none gap-2 md:grid-cols-2">
            {keyFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check
                  className="mt-1 size-4 shrink-0 text-brand"
                  aria-hidden
                />
                <Typography variant="body3">{feature}</Typography>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-t border-line pt-5">
        {technologies.map((technology) => (
          <Tag key={technology} size="sm" label={technology} />
        ))}
      </div>
    </div>
  </Card>
)

export default ProjectCard
