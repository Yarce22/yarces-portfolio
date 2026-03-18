'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, Award, Wrench } from 'lucide-react'
import TabNav from '@/components/ui/TabNav'
import ToolsGrid from '@/components/tools/ToolsGrid'
import SectionTitle from '@/components/ui/SectionTitle'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { Tool, Project, Certificate } from '@/lib/contentful-types'

const tabs = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'herramientas', label: 'Herramientas' },
]

interface ShowcaseSectionProps {
  tools: Tool[]
  projects: Project[]
  certificates: Certificate[]
}

export default function ShowcaseSection({ tools, projects, certificates }: ShowcaseSectionProps) {
  const [activeTab, setActiveTab] = useState('proyectos')

  return (
    <section className="bg-[var(--color-bg)] py-24 md:py-28">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
        <AnimatedSection className="flex flex-col items-center gap-10">
          <div className="text-center">
            <SectionTitle label="PORTAFOLIO" title="Mis Proyectos & Habilidades" align="center" />
          </div>
          <TabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {activeTab === 'proyectos' && (
            <motion.div
              key="proyectos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-8 py-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="group flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="aspect-video bg-[var(--color-surface-dark)] overflow-hidden">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={640}
                          height={360}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-dark)] flex items-center justify-center">
                          <span className="text-[var(--color-accent)] text-4xl font-bold font-[family-name:var(--font-display)] opacity-30">
                            {project.title.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-3 p-5">
                      <h3 className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)] leading-snug">
                        {project.title}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline font-[family-name:var(--font-display)]"
                        >
                          <ExternalLink size={13} /> Ver sitio web
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] font-semibold font-[family-name:var(--font-display)] text-sm hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-0.5"
              >
                Ver todos los proyectos <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}

          {activeTab === 'certificados' && (
            <motion.div
              key="certificados"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-8 py-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="group flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
                    style={{ boxShadow: 'var(--shadow-card)' }}
                  >
                    <div className="aspect-video bg-[var(--color-surface-dark)] overflow-hidden">
                      {cert.image ? (
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          width={640}
                          height={360}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-dark)] flex items-center justify-center">
                          <Award size={40} className="text-[var(--color-accent)] opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 p-5">
                      <h3 className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)] leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/certificados"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] font-semibold font-[family-name:var(--font-display)] text-sm hover:bg-[var(--color-accent-hover)] transition-all hover:-translate-y-0.5"
              >
                Ver todos los certificados <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}

          {activeTab === 'herramientas' && (
            <motion.div
              key="herramientas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="py-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 justify-center">
                  <Wrench size={20} className="text-[var(--color-accent)]" />
                  <span className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">
                    Stack tecnológico
                  </span>
                </div>
                <ToolsGrid tools={tools} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
