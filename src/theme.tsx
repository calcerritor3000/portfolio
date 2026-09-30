import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { Platform, useColorScheme, useWindowDimensions } from 'react-native'

export interface Palette {
  bg: string
  surface: string
  surface2: string
  text: string
  muted: string
  border: string
  accent: string
  accent2: string
  accentSoft: string
  success: string
  shadow: string
}

const light: Palette = {
  bg: '#f6f7fb',
  surface: '#ffffff',
  surface2: '#f0f2f8',
  text: '#0f172a',
  muted: '#526079',
  border: '#e3e7f0',
  accent: '#5b5bf0',
  accent2: '#06b6d4',
  accentSoft: '#ececff',
  success: '#16a34a',
  shadow: 'rgba(40, 50, 120, 0.12)',
}

const dark: Palette = {
  bg: '#080c18',
  surface: '#10162a',
  surface2: '#161e38',
  text: '#e8eaf2',
  muted: '#9aa4bd',
  border: '#222c48',
  accent: '#8b8bff',
  accent2: '#22d3ee',
  accentSoft: '#1b2250',
  success: '#4ade80',
  shadow: 'rgba(0, 0, 0, 0.45)',
}

export type Mode = 'light' | 'dark'

const STORAGE_KEY = 'theme'

function savedMode(): Mode | null {
  if (Platform.OS !== 'web') return null
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

interface ThemeValue {
  mode: Mode
  colors: Palette
  toggle: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

/** Tema claro/oscuro: respeta el del sistema y recuerda la elección del usuario. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme()
  const [chosen, setChosen] = useState<Mode | null>(savedMode)
  const mode: Mode = chosen ?? (system === 'light' ? 'light' : 'dark')

  const toggle = useCallback(() => {
    const next: Mode = mode === 'dark' ? 'light' : 'dark'
    setChosen(next)
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage puede no estar disponible (modo privado)
      }
    }
  }, [mode])

  const value = useMemo(() => ({ mode, colors: mode === 'dark' ? dark : light, toggle }), [mode, toggle])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}

/** Tamaño de pantalla: móvil, tablet o escritorio. */
export function useLayout() {
  const { width } = useWindowDimensions()
  return { width, isMobile: width < 720, isDesktop: width >= 900 }
}

export const font = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  mono: Platform.select({ web: "ui-monospace, 'Cascadia Code', Consolas, monospace", default: 'monospace' }),
}

export const MAX_WIDTH = 1120
