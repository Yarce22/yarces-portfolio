import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionTitle from '@/components/ui/SectionTitle'
import type { SiteConfig } from '@/lib/contentful-types'

const stats = [
  { value: '3+', label: 'Años de experiencia' },
  { value: '20+', label: 'Proyectos completados' },
  { value: '10+', label: 'Clientes satisfechos' },
]

interface PresentationSectionProps {
  siteConfig: SiteConfig | null
}

export default function PresentationSection({ siteConfig }: PresentationSectionProps) {
  const photoSrc = siteConfig?.photo || '/profilePhoto.png'
  const bio = siteConfig?.bio || ''
  const altText = siteConfig?.fullName
    ? `${siteConfig.fullName} — ${siteConfig.jobTitle}`
    : 'Alejandro Mira — Desarrollador de Software'

  return (
    <section className="bg-[var(--color-surface-dark)] py-24 md:py-28">
      <div className="max-w-7xl mx-auto w-full"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Photo */}
          <AnimatedSection>
            <div className="relative mx-auto md:mx-0" style={{ width: 'fit-content' }}>
              <div
                className="absolute top-5 left-5 w-full h-full rounded-[var(--radius-card)] border-2 border-[var(--color-accent)]"
                aria-hidden
              />
              <div
                className="relative overflow-hidden rounded-[var(--radius-card)]"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Image
                  src={photoSrc}
                  alt={altText}
                  width={400}
                  height={480}
                  className="object-cover w-[280px] h-[340px] md:w-[360px] md:h-[440px]"
                  priority
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection delay={0.15} className="flex flex-col gap-8">
            <SectionTitle label="SOBRE MÍ" title="Conoce mi historia" />

            <p className="text-[var(--color-text-muted)] text-base leading-[1.8] font-[family-name:var(--font-display)]">
              {bio}
            </p>

            <div className="h-px bg-[var(--color-border)] w-full" />

            {/* Stats */}
            <div className="flex gap-10 md:gap-12 flex-wrap">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <span className="text-4xl md:text-5xl font-bold text-[var(--color-accent)] font-[family-name:var(--font-heading)]">
                    {value}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
