import { skills } from '../data/profile'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="tecnologias" title="Tecnologías" subtitle="Con lo que trabajo habitualmente.">
      <div className="skills">
        {skills.map((g) => (
          <div key={g.group} className="card">
            <h3>{g.group}</h3>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
