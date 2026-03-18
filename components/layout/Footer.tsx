import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Linkedin, Github } from 'lucide-react'
import type { SiteConfig } from '@/lib/contentful-types'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/certificados', label: 'Certificados' },
  { href: '/contacto', label: 'Contacto' },
]

interface FooterProps {
  siteConfig?: SiteConfig | null
}

export default function Footer({ siteConfig }: FooterProps) {
  const whatsappUrl = siteConfig?.whatsappNumber
    ? `https://wa.me/57${siteConfig.whatsappNumber}`
    : 'https://wa.me/573123119897'

  const socialLinks = [
    { href: whatsappUrl, icon: MessageCircle, label: 'WhatsApp' },
    { href: siteConfig?.linkedinUrl ?? 'https://www.linkedin.com/in/alejomiyar/', icon: Linkedin, label: 'LinkedIn' },
    { href: siteConfig?.githubUrl ?? 'https://github.com/Yarce22', icon: Github, label: 'GitHub' },
  ]

  const fullName = siteConfig?.fullName ?? 'Alejandro Mira'
  const jobTitle = siteConfig?.jobTitle ?? 'Desarrollador de Software'

  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)' }} className="w-full">
      <div className="max-w-7xl mx-auto w-full py-16"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-1.5">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/logo_AM.svg"
                alt={fullName}
                width={64}
                height={64}
              />
            </Link>
            <span className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-body)]">
              {jobTitle}
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-body)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--color-border)] w-full" />

        {/* Bottom */}
        <div className="pt-6 flex items-center justify-center">
          <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-body)]">
            &copy; {new Date().getFullYear()} {fullName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
