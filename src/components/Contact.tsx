import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

export function Contact() {
  return (
    <section id="contacto" className="section container">
      <div className="card contact">
        <h2 className="section__title">¿Hablamos?</h2>
        <p className="section__subtitle">
          Busco mi primera oportunidad como desarrollador. Si tienes una propuesta o simplemente quieres charlar, escríbeme.
        </p>
        <div className="hero__actions">
          <a href={`mailto:${profile.email}`} className="btn btn--primary">
            <MailIcon size={18} /> {profile.email}
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn">
            <LinkedInIcon size={18} /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn">
            <GitHubIcon size={18} /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer container">
      © {YEAR} {profile.name} · Hecho con React y TypeScript
    </footer>
  )
}
