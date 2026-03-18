interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`max-w-7xl mx-auto w-full ${className ?? ''}`}
      style={{ paddingLeft: 'var(--page-px)', paddingRight: 'var(--page-px)' }}
    >
      {children}
    </div>
  )
}
