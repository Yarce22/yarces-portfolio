import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Linkedin, Github } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contáctame para hablar sobre tu proyecto. Disponible vía WhatsApp, email y LinkedIn.',
}

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--color-bg)]">
        <section className="py-24 md:py-32">
          <div
            className="max-w-5xl mx-auto w-full"
            style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)] mb-10"
            >
              <ArrowLeft size={14} /> Volver al inicio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
              {/* Left: Info */}
              <AnimatedSection className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-display)]">
                    CONTACTO
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
                    Hablemos de tu proyecto
                  </h1>
                </div>
                <p className="text-[var(--color-text-muted)] font-[family-name:var(--font-body)] text-base leading-relaxed">
                  ¿Tienes un proyecto en mente? Me encantaría escucharte y
                  ayudarte a hacerlo realidad. Respondo en menos de 24 horas.
                </p>

                <div className="flex flex-col gap-5">
                  <a
                    href="mailto:alejomira96@gmail.com"
                    className="flex items-center gap-4 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                      <Mail size={18} className="text-[var(--color-accent)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">Email</span>
                      <span className="font-[family-name:var(--font-body)] text-sm">alejomira96@gmail.com</span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/573123119897"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0 group-hover:border-[var(--color-accent)] transition-colors">
                      <Phone size={18} className="text-[var(--color-accent)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">WhatsApp</span>
                      <span className="font-[family-name:var(--font-body)] text-sm">+57 312 311 9897</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[var(--color-accent)]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)]">Ubicación</span>
                      <span className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text)]">Pereira, Colombia</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {[
                    { href: 'https://wa.me/573123119897', icon: MessageCircle, label: 'WhatsApp' },
                    { href: 'https://www.linkedin.com/in/alejomiyar/', icon: Linkedin, label: 'LinkedIn' },
                    { href: 'https://github.com/Yarce22', icon: Github, label: 'GitHub' },
                  ].map(({ href, icon: Icon, label }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-200"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </AnimatedSection>

              {/* Right: Form */}
              <AnimatedSection delay={0.15}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
