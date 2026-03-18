import Image from 'next/image'
import { Award, ExternalLink, Calendar } from 'lucide-react'
import type { Certificate } from '@/lib/contentful-types'

interface CertificateCardProps {
  certificate: Certificate
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <div
      className="flex flex-col gap-4 p-6 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] cursor-default"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {certificate.image ? (
        <div className="aspect-video rounded-lg overflow-hidden bg-[var(--color-surface-dark)]">
          <Image
            src={certificate.image}
            alt={certificate.title}
            width={480}
            height={270}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <Award size={32} className="text-[var(--color-accent)]" />
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)] leading-snug">
          {certificate.title}
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">
          {certificate.issuer}
        </p>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">
        <Calendar size={12} />
        <span>{formatDate(certificate.date)}</span>
      </div>
      {certificate.certificateUrl && certificate.certificateUrl !== '#' && (
        <a
          href={certificate.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent)] hover:underline font-[family-name:var(--font-display)] mt-auto"
        >
          <ExternalLink size={13} /> Ver certificado
        </a>
      )}
    </div>
  )
}
