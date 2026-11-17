import { GraduationCap, Lightbulb, Rocket, Smartphone } from 'lucide-react'

import NikhilFullPose from '@/assets/images/nikhil-full-pose.jpg'
import Reveal from '@/components/general/reveal'
import Typography from '@/components/general/typography'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import Link from '@/components/navigation/link'
import { EXTERNAL_LINKS, PROFILE } from '@/lib/data'

const HIGHLIGHTS = [
  { icon: GraduationCap, label: 'B.E. in Computer Engineering' },
  { icon: Smartphone, label: 'Senior Software Engineer at Cephei Infotech' },
  { icon: Lightbulb, label: 'Committed to continuous learning' },
  { icon: Rocket, label: 'Product-minded, end-to-end ownership' },
]

const AboutMeSection = () => (
  <Container id="about" tone="muted">
    <SectionHeading
      eyebrow="About me"
      title="A closer look at my background"
      description="Where I started, what I build today and how I approach my work."
    />

    <div className="flex w-full flex-col items-start gap-12 lg:flex-row lg:gap-16">
      {/* Portrait */}
      <Reveal className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-2/5">
        <div className="relative">
          <div
            className="absolute -bottom-5 -left-5 h-full w-full rounded-[1.75rem] border-2 border-brand/25"
            aria-hidden
          />
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-[1.75rem] border border-line bg-canvas shadow-card-hover">
            <img
              src={NikhilFullPose}
              alt={`${PROFILE.name} standing`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          </div>
        </div>
      </Reveal>

      {/* Content */}
      <Reveal delay={100} className="flex flex-1 flex-col gap-5">
        <Typography variant="body1" className="text-pretty">
          I am a software engineer specializing in full-stack mobile
          development with React Native, Java Spring Boot and Node.js. I care
          equally about the technical and the visual side of a product: user
          experience, faithful design implementation, and clear, maintainable,
          high-performance code.
        </Typography>

        <Typography variant="body1" className="text-pretty">
          I began my career as an Android developer and have since grown into
          building cross-platform mobile products end to end. Today I work
          primarily with React Native — including its new architecture —
          alongside TypeScript, Firebase, PostgreSQL and Node.js, delivering
          applications for clients in fintech, healthcare and retail.
        </Typography>

        <Typography variant="body1" className="text-pretty">
          I enjoy contributing across the full product lifecycle, from early
          ideation and technical design through to release and ongoing support,
          and I work closely with designers, QA and stakeholders to get there.
        </Typography>

        <Typography variant="body1" className="text-pretty">
          Outside of client work I follow the early-stage startup ecosystem and
          keep an eye on where the mobile platform is heading. You can see my
          code on{' '}
          <Link
            noCustomization
            externalLink
            withUnderline
            href={EXTERNAL_LINKS.GITHUB}
          >
            GitHub
          </Link>{' '}
          or follow what I am building on{' '}
          <Link
            noCustomization
            externalLink
            withUnderline
            href={EXTERNAL_LINKS.TWITTER}
          >
            X
          </Link>
          .
        </Typography>

        <Typography variant="body1" className="font-medium text-gray-900">
          A few highlights:
        </Typography>

        <ul className="grid list-none gap-3 sm:grid-cols-2">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <Typography variant="body3" className="font-medium">
                {label}
              </Typography>
            </li>
          ))}
        </ul>

        <Typography variant="body1" className="text-pretty">
          I am currently open to freelance and contract work. If you have a
          project in mind, I would be glad to hear about it.
        </Typography>
      </Reveal>
    </div>
  </Container>
)

export default AboutMeSection
