import { SOCIAL_LINKS } from '@/lib/data'
import { trackAttrs } from '@/lib/analytics'
import { mergeClasses } from '@/lib/utils'

type SocialIconsProps = {
  className?: string
  size?: 'md' | 'lg'
  /** Where the icons sit, recorded with the analytics event. */
  location: string
}

const SocialIcons = ({ className, size = 'md', location }: SocialIconsProps) => (
  <div className={mergeClasses('flex items-center gap-2', className)}>
    {SOCIAL_LINKS.map(({ label, icon: Icon, url }) => (
      <a
        key={label}
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        {...trackAttrs('social-click', { platform: label, location })}
        title={label}
        className={mergeClasses(
          'inline-flex items-center justify-center rounded-xl border border-line bg-surface text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand hover:shadow-md',
          size === 'lg' ? 'size-12' : 'size-10',
        )}
      >
        <Icon className={size === 'lg' ? 'size-5' : 'size-4'} />
      </a>
    ))}
  </div>
)

export default SocialIcons
