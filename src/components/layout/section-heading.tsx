import type { ReactNode } from 'react'

import Reveal from '@/components/general/reveal'
import Typography from '@/components/general/typography'
import Tag from '@/components/data-display/tag'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: ReactNode
}

/** The centred eyebrow + title + blurb block that opens every section. */
const SectionHeading = ({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) => (
  <Reveal className="flex flex-col items-center gap-4 text-center">
    <Tag label={eyebrow} variant="brand" />
    <Typography variant="h2" className="max-w-2xl text-balance">
      {title}
    </Typography>
    {description && (
      <Typography variant="body1" className="max-w-2xl text-pretty">
        {description}
      </Typography>
    )}
    <span className="divider-glow mt-2 h-px w-24" />
  </Reveal>
)

export default SectionHeading
