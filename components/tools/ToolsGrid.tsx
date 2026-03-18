import Image from 'next/image'
import type { Tool } from '@/lib/contentful-types'

interface ToolsGridProps {
  tools: Tool[]
}

export default function ToolsGrid({ tools }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="flex flex-col items-center justify-center gap-2 h-28 rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-200 hover:-translate-y-1 cursor-default"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {tool.icon ? (
            <Image
              src={tool.icon}
              alt={tool.name}
              width={36}
              height={36}
              className="object-contain"
            />
          ) : (
            <div className="w-9 h-9 rounded bg-[var(--color-surface-dark)]" />
          )}
          <span className="text-xs font-semibold text-[var(--color-text)] font-[family-name:var(--font-display)] text-center leading-tight px-1">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  )
}
