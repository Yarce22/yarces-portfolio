import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/lib/contentful-types'

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-[var(--color-text-muted)] font-[family-name:var(--font-display)] text-sm">
        No hay proyectos en esta categoría.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
