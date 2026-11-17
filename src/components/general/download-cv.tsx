import { Download } from 'lucide-react'

import Button from '@/components/general/button'
import { trackAttrs } from '@/lib/analytics'
import { PROFILE } from '@/lib/data'

type DownloadCVProps = {
  className?: string
  variant?: 'primary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  /** Where the button sits, recorded with the analytics event. */
  location: string
}

const DownloadCV = ({
  className,
  variant = 'primary',
  size = 'md',
  location,
}: DownloadCVProps) => (
  <Button asChild variant={variant} size={size} className={className}>
    <a
      href={PROFILE.resumeUrl}
      target="_blank"
      rel="noreferrer"
      download
      {...trackAttrs('cv-download', { location })}
    >
      <Download aria-hidden />
      Download CV
    </a>
  </Button>
)

export default DownloadCV
