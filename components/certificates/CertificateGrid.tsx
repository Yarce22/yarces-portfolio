import CertificateCard from '@/components/certificates/CertificateCard'
import type { Certificate } from '@/lib/contentful-types'

interface CertificateGridProps {
  certificates: Certificate[]
}

export default function CertificateGrid({ certificates }: CertificateGridProps) {
  if (certificates.length === 0) {
    return (
      <div className="text-center py-20 text-[var(--color-text-muted)] font-[family-name:var(--font-display)] text-sm">
        No hay certificados en esta categoría.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <CertificateCard key={cert.id} certificate={cert} />
      ))}
    </div>
  )
}
