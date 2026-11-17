import ExperienceItem from '@/components/data-display/experience-item'
import Reveal from '@/components/general/reveal'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import { EXPERIENCES } from '@/lib/data'

const ExperienceSection = () => (
  <Container id="experience" tone="muted">
    <SectionHeading
      eyebrow="Experience"
      title="Professional experience"
      description="A summary of my most recent roles and the work they involved."
    />

    <div className="relative mx-auto w-full max-w-4xl">
      {/* The rail the timeline nodes sit on. */}
      <span
        className="absolute inset-y-0 left-2 w-px bg-linear-to-b from-transparent via-line to-transparent md:left-6"
        aria-hidden
      />

      <div className="flex flex-col gap-8">
        {EXPERIENCES.map((experience, index) => (
          <Reveal key={experience.company} delay={index * 80}>
            <ExperienceItem {...experience} />
          </Reveal>
        ))}
      </div>
    </div>
  </Container>
)

export default ExperienceSection
