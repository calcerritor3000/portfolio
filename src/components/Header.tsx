import { useState } from 'react'
import type { Theme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'
import { MoonIcon, SunIcon } from './Icons'

const links = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
]
const ids = ['inicio', ...links.map((l) => l.id)]

interface Props {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="header__logo" aria-label="Inicio">
          JC<span>.</span>
        </a>
        <nav className={`header__nav${open ? ' is-open' : ''}`} aria-label="Secciones">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span className={`burger${open ? ' burger--open' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
