import { Clock, MapPin } from 'lucide-react'

import SocialIcons from '@/components/data-display/social-icons'
import ContactForm from '@/components/general/contact-form'
import DownloadCV from '@/components/general/download-cv'
import Reveal from '@/components/general/reveal'
import Typography from '@/components/general/typography'
import Card from '@/components/layout/card'
import Container from '@/components/layout/container'
import SectionHeading from '@/components/layout/section-heading'
import { PROFILE } from '@/lib/data'

const ContactSection = () => (
  <Container id="contact">
    <SectionHeading
      eyebrow="Get in touch"
      title="Let's work together"
      description="If you are looking for a developer, have a question about my work, or would simply like to connect, send me a message below."
    />

    <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.5fr_1fr]">
      <Reveal>
        <Card className="h-full p-6 md:p-8">
          <ContactForm />
        </Card>
      </Reveal>

      <Reveal delay={100} className="flex flex-col gap-6">
        <Card className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex flex-col gap-1">
            <Typography variant="overline">Availability</Typography>
            {PROFILE.availableForWork ? (
              <span className="mt-1 inline-flex items-center gap-2.5 self-start rounded-full border border-emerald-500/25 bg-emerald-500/10 py-1.5 pr-4 pl-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                Open to new opportunities
              </span>
            ) : (
              <Typography variant="body3">
                Not currently taking on new work.
              </Typography>
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-line pt-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4.5 shrink-0 text-brand" aria-hidden />
              <div className="flex flex-col">
                <Typography variant="body3" className="font-medium text-gray-900">
                  Based in
                </Typography>
                <Typography variant="body3">{PROFILE.location}</Typography>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4.5 shrink-0 text-brand" aria-hidden />
              <div className="flex flex-col">
                <Typography variant="body3" className="font-medium text-gray-900">
                  Response time
                </Typography>
                <Typography variant="body3">
                  Usually within one to two working days
                </Typography>
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-6 md:p-8">
          <Typography variant="overline">Elsewhere</Typography>
          <Typography variant="body3">
            You can also find me on these platforms.
          </Typography>
          <SocialIcons location="contact" />
          <div className="border-t border-line pt-5">
            <DownloadCV variant="outline" className="w-full" location="contact" />
          </div>
        </Card>
      </Reveal>
    </div>
  </Container>
)

export default ContactSection
