'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string
}

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/certificados', label: 'Certificados' },
  { href: '/contacto', label: 'Contacto' },
]

export default function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-72 bg-[var(--color-surface-dark)] border-l border-[var(--color-border)] z-50 lg:hidden flex flex-col p-8 gap-8"
          >
            <button
              onClick={onClose}
              className="self-end text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={[
                    'text-lg font-semibold font-[family-name:var(--font-display)] transition-colors',
                    pathname === link.href
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text)] hover:text-[var(--color-accent)]',
                  ].join(' ')}
                >
                  {link.href === '/contacto' ? (
                    <span className="px-[22px] py-[10px] rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] text-sm font-medium inline-block">
                      {link.label}
                    </span>
                  ) : link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
