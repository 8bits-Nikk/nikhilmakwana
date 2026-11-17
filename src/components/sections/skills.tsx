import TechCard from '@/components/data-display/tech-card'
import Reveal from '@/components/general/reveal'
import Typography from '@/components/general/typography'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import { TECHNOLOGIES, TECH_CATEGORIES } from '@/lib/data'

const SkillsSection = () => (
  <Container id="skills">
    <SectionHeading
      eyebrow="Skills"
      title="Skills and technologies"
      description="The tools and technologies I work with day to day, grouped by where they sit in the stack."
    />

    <div className="flex flex-col gap-10">
      {TECH_CATEGORIES.map((category, categoryIndex) => {
        const technologies = TECHNOLOGIES.filter(
          (technology) => technology.category === category,
        )

        if (technologies.length === 0) return null

        return (
          <Reveal
            key={category}
            delay={categoryIndex * 60}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <Typography variant="overline">{category}</Typography>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <Typography variant="body3" className="text-gray-400">
                {technologies.length}
              </Typography>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {technologies.map((technology) => (
                <TechCard key={technology.label} {...technology} />
              ))}
            </div>
          </Reveal>
        )
      })}
    </div>
  </Container>
)

export default SkillsSection
