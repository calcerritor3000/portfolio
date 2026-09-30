import { profile, stats } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

function CodeCard() {
  return (
    <div className="code" aria-hidden="true">
      <div className="code__bar">
        <i />
        <i />
        <i />
        <span>jorge.ts</span>
      </div>
      <pre>
        <span className="k">const</span> <span className="v">jorge</span> = {'{'}
        {'\n'}  <span className="p">rol</span>: <span className="s">'Desarrollador DAM'</span>,
        {'\n'}  <span className="p">ciudad</span>: <span className="s">'Valencia'</span>,
        {'\n'}  <span className="p">stack</span>: [
        {'\n'}    <span className="s">'React'</span>, <span className="s">'TypeScript'</span>,
        {'\n'}    <span className="s">'Node.js'</span>, <span className="s">'React Native'</span>,
        {'\n'}  ],
        {'\n'}  <span className="p">disponible</span>: <span className="b">true</span>,
        {'\n'}  <span className="p">buscando</span>: <span className="s">'mi primer equipo'</span>,
        {'\n'}
        {'}'}
      </pre>
    </div>
  )
}

export function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div>
          <p className="hero__badge">
            <span className="dot" aria-hidden="true" />
            {profile.availability}
          </p>
          <h1 className="hero__title">
            Hola, soy <span className="gradient-text">Jorge</span>.
            <br />
            Creo software que funciona.
          </h1>
          <p className="hero__intro">
            <strong>{profile.role}</strong> en {profile.location}. {profile.intro}
          </p>
          <div className="hero__actions">
            <a href="#proyectos" className="btn btn--primary">
              Ver proyectos
            </a>
            <a href={`mailto:${profile.email}`} className="btn">
              <MailIcon size={18} /> Escríbeme
            </a>
          </div>
          <div className="hero__social">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <CodeCard />
      </div>
      <div className="container">
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
