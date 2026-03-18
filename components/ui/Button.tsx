'use client'
import { forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer select-none',
          'rounded-[var(--radius-btn)] font-[family-name:var(--font-display)]',
          // sizes
          size === 'sm' && 'px-4 py-2 text-sm',
          size === 'md' && 'px-6 py-3 text-[15px]',
          size === 'lg' && 'px-8 py-4 text-lg',
          // variants
          variant === 'primary' && [
            'bg-[var(--color-accent)] text-[var(--color-surface-dark)]',
            'hover:bg-[var(--color-accent-hover)] hover:-translate-y-0.5',
            'active:translate-y-0',
          ],
          variant === 'secondary' && [
            'border border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent',
            'hover:bg-[var(--color-accent)] hover:text-[var(--color-surface-dark)] hover:-translate-y-0.5',
          ],
          variant === 'ghost' && [
            'border border-[var(--color-border)] text-[var(--color-text)] bg-transparent',
            'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5',
          ],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
