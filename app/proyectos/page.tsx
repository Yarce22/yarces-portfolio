import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { getProjects } from '@/lib/contentful'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Todos mis proyectos de desarrollo web, móvil y backend.',
}

export default async function ProyectosPage() {
  const projects = await getProjects()

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
              PORTAFOLIO
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
              Mis Proyectos
            </h1>
            <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-display)] text-sm max-w-xl">
              Una selección de proyectos que reflejan mi trabajo en desarrollo web, backend y aplicaciones móviles.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto w-full"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
            <ProjectGrid projects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
