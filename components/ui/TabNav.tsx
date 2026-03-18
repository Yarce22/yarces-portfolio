'use client'

interface Tab {
  id: string
  label: string
}

interface TabNavProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export default function TabNav({ tabs, activeTab, onChange }: TabNavProps) {
  return (
    <div className="flex items-center justify-center border-b border-[var(--color-border)] w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={[
            'px-7 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer',
            'font-[family-name:var(--font-display)]',
            activeTab === tab.id
              ? 'text-[var(--color-accent)] border-b-[3px] border-[var(--color-accent)] -mb-px'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
          ].join(' ')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
