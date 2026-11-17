import { ArrowDown, MapPin, Sparkles } from 'lucide-react'

import FaceImage from '@/assets/images/nikhil-face-image.jpg'
import SocialIcons from '@/components/data-display/social-icons'
import Button from '@/components/general/button'
import DownloadCV from '@/components/general/download-cv'
import Typography from '@/components/general/typography'
import { trackAttrs } from '@/lib/analytics'
import { CAREER_START, PROFILE, PROJECTS, TECHNOLOGIES } from '@/lib/data'

const yearsOfExperience = Math.max(
  1,
  Math.floor(
    (Date.now() - CAREER_START.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  ),
)

const STATS = [
  { value: `${yearsOfExperience}+`, label: 'Years of experience' },
  { value: `${PROJECTS.length}`, label: 'Featured projects' },
  { value: `${TECHNOLOGIES.length}+`, label: 'Technologies' },
]

const HeroSection = () => (
  <section
    id="hero"
    className="relative w-full overflow-hidden bg-canvas pt-16 pb-20 md:pt-24 md:pb-28"
  >
    {/* Decorative background: a dot grid fading out, plus two soft colour blobs. */}
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
      <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_20%,transparent_75%)] opacity-60" />
      <div className="animate-float absolute -top-24 -left-24 size-[28rem] rounded-full bg-indigo-500/12 blur-3xl" />
      <div
        className="animate-float absolute -top-32 -right-32 size-[32rem] rounded-full bg-violet-500/12 blur-3xl"
        style={{ animationDelay: '-7s' }}
      />
    </div>

    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
      {/* Content */}
      <div className="flex flex-col items-start gap-7">
        {PROFILE.availableForWork && (
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 py-1.5 pr-4 pl-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </span>
        )}

        <div className="flex flex-col gap-5">
          <Typography variant="display" className="text-balance">
            Hi, I&apos;m{' '}
            <span className="text-gradient">{PROFILE.shortName}</span>{' '}
            <span className="animate-waving-hand inline-block origin-[70%_70%]">
              👋
            </span>
          </Typography>

          <Typography
            variant="h3"
            component="p"
            className="font-medium text-gray-700"
          >
            {PROFILE.role} —{' '}
            <span className="text-gray-500">{PROFILE.focus}</span>
          </Typography>

          <Typography variant="body1" className="max-w-2xl text-pretty">
            I design and build production mobile applications end to end, from
            the React Native client through to the APIs and services behind it.
            Over the past {yearsOfExperience} years I have delivered products
            for clients across fintech, healthcare and retail, with a consistent
            focus on performance, accessibility and maintainable code.
          </Typography>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="size-5 shrink-0 text-brand" aria-hidden />
          <Typography variant="body2">{PROFILE.location}</Typography>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="accent" size="lg">
            <a href="#contact" {...trackAttrs('contact-cta', { location: 'hero' })}>
              <Sparkles aria-hidden />
              Get in touch
            </a>
          </Button>
          <DownloadCV variant="outline" size="lg" location="hero" />
        </div>

        <SocialIcons location="hero" />

        {/* Stats */}
        <dl className="mt-2 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-line pt-7">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 md:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Portrait */}
      <div className="order-first flex justify-center lg:order-last lg:justify-end">
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-tr from-indigo-500/25 via-violet-500/15 to-transparent blur-2xl"
            aria-hidden
          />
          <div
            className="absolute -top-5 -right-5 size-28 rounded-3xl border-2 border-brand/30"
            aria-hidden
          />
          <div
            className="absolute -bottom-6 -left-6 size-24 rounded-3xl bg-brand/10"
            aria-hidden
          />

          <div className="relative aspect-4/5 w-60 overflow-hidden rounded-[1.75rem] border border-line bg-muted shadow-card-hover sm:w-72 lg:w-80">
            <img
              src={FaceImage}
              alt={`Portrait of ${PROFILE.name}`}
              width={320}
              height={400}
              fetchPriority="high"
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="mt-16 flex justify-center md:mt-20">
      <a
        href="#about"
        className="group inline-flex flex-col items-center gap-2 text-gray-500 transition-colors hover:text-gray-900"
      >
        <span className="text-xs font-medium tracking-[0.18em] uppercase">
          Scroll
        </span>
        <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
      </a>
    </div>
  </section>
)

export default HeroSection
