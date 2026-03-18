'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { MessageCircle, Linkedin, Github } from 'lucide-react'
import type { SiteConfig } from '@/lib/contentful-types'

const HeroBackground3D = dynamic(() => import('@/components/home/HeroBackground3D'), { ssr: false })

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

interface HeroSectionProps {
  siteConfig: SiteConfig | null
}

export default function HeroSection({ siteConfig }: HeroSectionProps) {
  const firstName = siteConfig?.fullName?.split(' ')[0] ?? 'Alejandro'
  const whatsappUrl = siteConfig?.whatsappNumber
    ? `https://wa.me/57${siteConfig.whatsappNumber}`
    : 'https://wa.me/573123119897'

  const socialLinks = [
    { href: whatsappUrl, icon: MessageCircle, label: 'WhatsApp' },
    { href: siteConfig?.linkedinUrl ?? '#', icon: Linkedin, label: 'LinkedIn' },
    { href: siteConfig?.githubUrl ?? '#', icon: Github, label: 'GitHub' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-bg)]">
      <HeroBackground3D />

      <div className="relative z-10 max-w-7xl mx-auto w-full py-24"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl flex flex-col gap-7"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 border border-[var(--color-accent)] rounded px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] font-[family-name:var(--font-display)] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Disponible para proyectos
            </span>
          </motion.div>

          {/* Headlines */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-text)] font-[family-name:var(--font-display)] leading-tight">
              Hola, soy {firstName}
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-accent)] font-[family-name:var(--font-display)] leading-tight">
              {siteConfig?.jobTitle ?? 'Desarrollador de Software'}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-[var(--color-text-muted)] font-[family-name:var(--font-display)] leading-relaxed max-w-xl"
          >
            Construyo soluciones digitales modernas, escalables y de alto rendimiento.
            Especializado en desarrollo web y backend.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] text-[15px] font-medium font-[family-name:var(--font-display)] hover:bg-[var(--color-accent-hover)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Ver Proyectos
            </Link>
            <a
              href="/CV-Alejandro_Mira.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[var(--radius-btn)] border border-[var(--color-accent)] text-[var(--color-accent)] text-[15px] font-medium font-[family-name:var(--font-display)] hover:bg-[var(--color-accent)] hover:text-[var(--color-surface-dark)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Descargar CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
