import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <section id="contacto" className="section container">
      <Reveal>
        <div className="contact">
          <h2 className="section__title">¿Trabajamos juntos?</h2>
          <p>
            Busco mi primera oportunidad como desarrollador. Si tienes una propuesta o solo quieres charlar, escríbeme.
          </p>
          <div className="hero__actions">
            <a href={`mailto:${profile.email}`} className="btn btn--light">
              <MailIcon size={18} /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <LinkedInIcon size={18} /> LinkedIn
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn--ghost">
              <GitHubIcon size={18} /> GitHub
            </a>
          </div>
        </div>
      </Reveal>
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
