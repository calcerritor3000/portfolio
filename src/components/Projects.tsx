import { projects, type Project } from '../data/profile'
import { ArrowIcon } from './Icons'
import { Reveal } from './Reveal'
import { Section } from './Section'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

function Links({ project }: { project: Project }) {
  return (
    <div className="project__links">
      {project.demo && (
        <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
          Ver demo <ArrowIcon />
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer" className="btn btn--sm">
          Código <ArrowIcon />
        </a>
      )}
      {project.note && <span className="project__note">🔒 {project.note}</span>}
    </div>
  )
}

function Body({ project }: { project: Project }) {
  return (
    <div className="project__body">
      <p className="project__meta">
        <span className="chip chip--accent">{project.tag}</span>
        <span>{project.period}</span>
      </p>
      <h3>{project.title}</h3>
      <p className="project__desc">{project.description}</p>
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
      <Links project={project} />
    </div>
  )
}

function Featured({ project }: { project: Project }) {
  return (
    <article className="card project project--featured">
      <div className="project__media">
        {project.image && (
          <img className="phone" src={asset(project.image)} alt={`${project.title}: modo claro`} loading="lazy" />
        )}
        {project.imageDark && (
          <img
            className="phone phone--back"
            src={asset(project.imageDark)}
            alt={`${project.title}: modo oscuro`}
            loading="lazy"
          />
        )}
      </div>
      <Body project={project} />
    </article>
  )
}

export function Projects() {
  const [featured, ...rest] = projects
  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Cosas que he construido"
      subtitle="Desde una app móvil propia hasta un TFG desplegado en producción."
    >
      <Reveal>
        <Featured project={featured} />
      </Reveal>
      <div className="projects">
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <article className="card project">
              <Body project={p} />
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
