'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Loader2, CheckCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const schema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  whatsapp: z.string().optional(),
  asunto: z.string().min(3, 'Mínimo 3 caracteres'),
  mensaje: z.string().min(10, 'Mínimo 10 caracteres'),
})

type FormValues = z.infer<typeof schema>
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [showPopup, setShowPopup] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormValues) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      setStatus('success')
      setShowPopup(true)
      reset()
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = [
    'w-full h-12 px-4 rounded-[var(--radius-btn)] bg-[var(--color-bg)] border border-[var(--color-border)]',
    'text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] text-sm font-[family-name:var(--font-body)]',
    'focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200',
  ].join(' ')

  const labelClass = 'text-sm font-semibold text-[var(--color-text)] font-[family-name:var(--font-body)]'
  const errorClass = 'text-xs text-red-400 font-[family-name:var(--font-display)] mt-1'

  return (
    <>
      <div
        className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 md:p-10"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Nombre completo</label>
              <input {...register('nombre')} placeholder="Tu nombre" className={fieldClass} />
              {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Correo electrónico</label>
              <input {...register('email')} placeholder="correo@ejemplo.com" type="email" className={fieldClass} />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>
              WhatsApp{' '}
              <span className="text-[var(--color-text-muted)] font-normal">(opcional)</span>
            </label>
            <input {...register('whatsapp')} placeholder="+57 300 000 0000" className={fieldClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Asunto / Servicio</label>
            <input {...register('asunto')} placeholder="¿En qué te puedo ayudar?" className={fieldClass} />
            {errors.asunto && <p className={errorClass}>{errors.asunto.message}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Mensaje</label>
            <textarea
              {...register('mensaje')}
              placeholder="Cuéntame sobre tu proyecto..."
              rows={5}
              className={[
                'w-full px-4 py-3 rounded-[var(--radius-btn)] bg-[var(--color-bg)] border border-[var(--color-border)]',
                'text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] text-sm font-[family-name:var(--font-body)]',
                'focus:outline-none focus:border-[var(--color-accent)] transition-colors duration-200 resize-none',
              ].join(' ')}
            />
            {errors.mensaje && <p className={errorClass}>{errors.mensaje.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full h-[52px] flex items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] font-bold font-[family-name:var(--font-body)] text-base hover:bg-[var(--color-accent-hover)] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>Enviar mensaje <Send size={18} /></>
            )}
          </button>

          {status === 'error' && (
            <p className="text-xs text-red-400 text-center font-[family-name:var(--font-display)]">
              Hubo un error al enviar el mensaje. Intenta de nuevo.
            </p>
          )}
        </form>
      </div>

      {/* Success popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => { setShowPopup(false); setStatus('idle') }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-10 max-w-md w-full flex flex-col items-center gap-5 text-center"
              style={{ boxShadow: 'var(--shadow-card)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowPopup(false); setStatus('idle') }}
                className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/15 flex items-center justify-center">
                <CheckCircle size={36} className="text-[var(--color-accent)]" />
              </div>

              <h3 className="text-xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]">
                ¡Mensaje enviado!
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] font-[family-name:var(--font-body)] leading-relaxed">
                Gracias por escribirme. Revisaré tu mensaje y te responderé lo antes posible.
              </p>

              <button
                onClick={() => { setShowPopup(false); setStatus('idle') }}
                className="px-6 py-2.5 rounded-[var(--radius-btn)] bg-[var(--color-accent)] text-[var(--color-surface-dark)] font-semibold font-[family-name:var(--font-body)] text-sm hover:bg-[var(--color-accent-hover)] transition-all"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
