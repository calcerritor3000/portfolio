import type { Theme } from '../hooks/useTheme'
import { profile } from '../data/profile'
import { MoonIcon, SunIcon } from './Icons'

const links = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#tecnologias', label: 'Tecnologías' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#contacto', label: 'Contacto' },
]

interface Props {
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: Props) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="header__logo" aria-label="Inicio">
          JC<span>.</span>
        </a>
        <nav className="header__nav" aria-label="Secciones">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          title={profile.shortName}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}
