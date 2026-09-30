import type { Theme } from '../hooks/useTheme'
import { projects, type Project } from '../data/profile'
import { ArrowIcon } from './Icons'
import { Section } from './Section'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function ProjectCard({ project, theme }: { project: Project; theme: Theme }) {
  const image = theme === 'dark' && project.imageDark ? project.imageDark : project.image
  return (
    <article className={`card project${image ? ' project--featured' : ''}`}>
      {image && (
        <div className="project__media">
          <img src={asset(image)} alt={`Captura de ${project.title}`} loading="lazy" />
        </div>
      )}
      <div className="project__body">
        <p className="project__meta">
          <span className="chip chip--accent">{project.tag}</span>
          <span>{project.period}</span>
        </p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul className="project__highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="chips" aria-label="Tecnologías">
          {project.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <div className="project__links">
          <a href={project.repo} target="_blank" rel="noreferrer">
            Código <ArrowIcon />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Demo <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects({ theme }: { theme: Theme }) {
  return (
    <Section id="proyectos" title="Proyectos" subtitle="Lo último que he construido, de lo más reciente a lo más antiguo.">
      <div className="projects">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} theme={theme} />
        ))}
      </div>
    </Section>
  )
}
