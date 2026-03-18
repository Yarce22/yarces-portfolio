'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface CertificateFiltersProps {
  categories: string[]
}

export default function CertificateFilters({ categories }: CertificateFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const allCategories = ['Todos', ...categories]

  function handleClick(cat: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'Todos') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const current = searchParams.get('category') ?? 'Todos'

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {allCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={[
            'px-4 py-2 rounded-[var(--radius-btn)] text-xs font-semibold font-[family-name:var(--font-display)] transition-all duration-200 cursor-pointer',
            current === cat
              ? 'bg-[var(--color-accent)] text-[var(--color-surface-dark)]'
              : 'border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
          ].join(' ')}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
