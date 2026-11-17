import SocialIcons from '@/components/data-display/social-icons'
import Typography from '@/components/general/typography'
import { trackAttrs } from '@/lib/analytics'
import { NAV_LINKS, PROFILE } from '@/lib/data'

const Footer = () => (
  <footer className="w-full border-t border-line bg-muted">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 md:px-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
        <div className="flex max-w-sm flex-col gap-3">
          <Typography variant="h4" component="p" className="font-bold">
            <span className="text-gray-400">&lt;</span>
            NM
            <span className="text-gray-400"> /&gt;</span>
          </Typography>
          <Typography variant="body3">
            {PROFILE.role} based in {PROFILE.location}, building fast,
            accessible and well-crafted mobile products.
          </Typography>
          <SocialIcons className="mt-1" location="footer" />
        </div>

        <nav aria-label="Footer">
          <ul className="grid list-none grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3 md:grid-cols-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...trackAttrs('nav-click', { section: link.href.slice(1), location: 'footer' })}
                  className="text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col items-center justify-between gap-2 border-t border-line pt-6 sm:flex-row">
        <Typography variant="body3" className="text-gray-500">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </Typography>
        <Typography variant="body3" className="text-gray-500">
          Built with React, Vite and Tailwind CSS
        </Typography>
      </div>
    </div>
  </footer>
)

export default Footer
