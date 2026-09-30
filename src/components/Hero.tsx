import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export function Hero() {
  return (
    <section id="inicio" className="hero container">
      <p className="hero__badge">
        <span className="dot" aria-hidden="true" />
        {profile.availability} · {profile.location}
      </p>
      <h1 className="hero__title">
        Hola, soy <span className="accent">{profile.shortName}</span>.
      </h1>
      <p className="hero__role">{profile.role}</p>
      <p className="hero__intro">{profile.intro}</p>
      <div className="hero__actions">
        <a href="#proyectos" className="btn btn--primary">
          Ver proyectos
        </a>
        <a href="#contacto" className="btn">
          Contactar
        </a>
      </div>
      <div className="hero__social">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <MailIcon />
        </a>
      </div>
    </section>
  )
}
