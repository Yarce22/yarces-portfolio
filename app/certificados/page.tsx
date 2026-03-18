import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CertificateGrid from '@/components/certificates/CertificateGrid'
import CertificateFilters from '@/components/certificates/CertificateFilters'
import { getCertificates, getCertificateCategories } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Certificados',
  description: 'Mis certificados y cursos completados en plataformas reconocidas.',
}

interface CertificadosPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function CertificadosPage({ searchParams }: CertificadosPageProps) {
  const { category } = await searchParams
  const [certificates, categories] = await Promise.all([
    getCertificates({ category }),
    getCertificateCategories(),
  ])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-bg)]">
        {/* Hero Banner */}
        <section className="bg-[var(--color-surface-dark)] py-20 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-4"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)]"
            >
              <ArrowLeft size={14} /> Volver al inicio
            </Link>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-display)]">
              FORMACIÓN
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
              Mis Certificados
            </h1>
            <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-display)] text-sm max-w-xl">
              Certificaciones obtenidas en plataformas reconocidas que respaldan mi formación continua.
            </p>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto w-full flex flex-col gap-10"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
            <Suspense fallback={null}>
              <CertificateFilters categories={categories} />
            </Suspense>
            <CertificateGrid certificates={certificates} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
