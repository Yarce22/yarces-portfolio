'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import MobileMenu from '@/components/layout/MobileMenu'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/certificados', label: 'Certificados' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-[var(--color-surface-dark)]/90 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-[var(--color-surface-dark)] border-b border-[var(--color-border)]',
        ].join(' ')}
        style={{ height: 80 }}
      >
        <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between"
          style={{ paddingLeft: "var(--page-px)", paddingRight: "var(--page-px)" }}>
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/logo_AM.svg"
              alt="Alejandro Mira"
              width={64}
              height={64}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'text-sm font-normal font-[family-name:var(--font-display)] transition-colors duration-200',
                  pathname === link.href
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text)] hover:text-[var(--color-accent)]',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contacto"
              className="px-[22px] py-[10px] rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] text-sm font-medium font-[family-name:var(--font-display)] hover:bg-[var(--color-accent-hover)] transition-colors duration-200"
            >
              Contáctame
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  )
}
