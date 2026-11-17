import TestimonialCard from '@/components/data-display/testimonial-card'
import Reveal from '@/components/general/reveal'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import { TESTIMONIALS } from '@/lib/data'

const TestimonialsSection = () => (
  <Container id="testimonials" tone="muted">
    <SectionHeading
      eyebrow="Testimonials"
      title="What colleagues say"
      description="Feedback from the people I have worked alongside."
    />

    <div className="flex flex-wrap justify-center gap-8">
      {TESTIMONIALS.map((testimonial, index) => (
        <Reveal
          key={testimonial.personName}
          delay={index * 80}
          className="flex w-full max-w-xl"
        >
          <TestimonialCard {...testimonial} />
        </Reveal>
      ))}
    </div>
  </Container>
)

export default TestimonialsSection
