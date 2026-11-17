import { Quote } from 'lucide-react'

import Typography from '@/components/general/typography'
import Card from '@/components/layout/card'
import type { TestimonialDetails } from '@/lib/types'

const TestimonialCard = ({
  personName,
  personAvatar,
  testimonial,
  title,
}: TestimonialDetails) => (
  <Card interactive className="flex max-w-xl flex-col gap-6 p-8 md:p-10">
    <Quote className="size-8 shrink-0 text-brand/40" aria-hidden />

    <Typography variant="body1" className="text-pretty italic">
      “{testimonial}”
    </Typography>

    <div className="mt-auto flex items-center gap-4 border-t border-line pt-6">
      {personAvatar && (
        <img
          src={personAvatar}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-12 shrink-0 rounded-full bg-muted object-cover ring-1 ring-line"
        />
      )}
      <div className="flex flex-col">
        <Typography variant="body2" className="font-semibold text-gray-900">
          {personName}
        </Typography>
        <Typography variant="body3" className="text-gray-500">
          {title}
        </Typography>
      </div>
    </div>
  </Card>
)

export default TestimonialCard
