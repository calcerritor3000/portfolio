import { education, experience, type TimelineItem } from '../data/profile'
import { Reveal } from './Reveal'
import { Section } from './Section'

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  return (
    <Reveal>
      <h3 className="timeline__heading">{title}</h3>
      <ol className="timeline">
        {items.map((i) => (
          <li key={i.title + i.period}>
            <p className="timeline__period">{i.period}</p>
            <h4>{i.title}</h4>
            <p className="timeline__place">{i.place}</p>
            <p>{i.text}</p>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}

export function Journey() {
  return (
    <Section id="trayectoria" eyebrow="Trayectoria" title="Experiencia y formación">
      <div className="journey">
        <Timeline title="Experiencia" items={experience} />
        <Timeline title="Formación" items={education} />
      </div>
    </Section>
  )
}
