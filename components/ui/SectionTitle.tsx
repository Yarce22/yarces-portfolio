interface SectionTitleProps {
  label?: string
  title: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionTitle({ label, title, align = 'left', className }: SectionTitleProps) {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : ''} ${className ?? ''}`}>
      {label && (
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-display)]"
        >
          {label}
        </span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)]"
      >
        {title}
      </h2>
    </div>
  )
}
