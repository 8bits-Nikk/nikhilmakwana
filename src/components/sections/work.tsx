import ProjectCard from '@/components/data-display/project-card'
import Reveal from '@/components/general/reveal'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import { PROJECTS } from '@/lib/data'

const WorkSection = () => (
  <Container id="work">
    <SectionHeading
      eyebrow="Work"
      title="Selected projects"
      description="Client work spanning fintech, healthcare, retail and industrial analytics — primarily mobile applications, and the APIs behind them."
    />

    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      {PROJECTS.map((project, index) => (
        <Reveal key={project.name} delay={(index % 2) * 80}>
          <ProjectCard {...project} index={index} />
        </Reveal>
      ))}
    </div>
  </Container>
)

export default WorkSection
