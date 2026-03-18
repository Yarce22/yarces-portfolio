import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'
import type { Project } from '@/lib/contentful-types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className="flex flex-col rounded-[var(--radius-card)] bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] group"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Image */}
      <div className="aspect-video bg-[var(--color-surface-dark)] overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            width={640}
            height={360}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-dark)] flex items-center justify-center">
            <span className="text-[var(--color-accent)] text-4xl font-bold font-[family-name:var(--font-display)] opacity-30">
              {project.title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-[var(--color-text)] font-[family-name:var(--font-heading)] leading-snug">
            {project.title}
          </h3>
          <span className="shrink-0 text-[10px] font-semibold text-[var(--color-accent)] border border-[var(--color-accent)] rounded px-1.5 py-0.5 font-[family-name:var(--font-display)]">
            {project.category}
          </span>
        </div>

        <p className="text-xs text-[var(--color-text-muted)] font-[family-name:var(--font-display)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium px-2 py-0.5 rounded bg-[var(--color-surface-dark)] text-[var(--color-text-muted)] font-[family-name:var(--font-display)] border border-[var(--color-border)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)]"
            >
              <Github size={14} /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors font-[family-name:var(--font-display)]"
            >
              <ExternalLink size={14} /> Ver proyecto
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
