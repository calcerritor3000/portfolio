import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, subtitle, children }: Props) {
  return (
    <section id={id} className="section container">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section__title">{title}</h2>
        {subtitle && <p className="section__subtitle">{subtitle}</p>}
      </Reveal>
      {children}
    </section>
  )
}
