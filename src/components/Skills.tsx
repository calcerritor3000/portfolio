import { skills } from '../data/profile'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="tecnologias" eyebrow="Tecnologías" title="Mi caja de herramientas" subtitle="Con lo que trabajo habitualmente.">
      <div className="skills">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 80}>
            <div className="card skill">
              <h3>{g.group}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
