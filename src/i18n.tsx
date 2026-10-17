import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Platform } from 'react-native'
import { content, type Content, type Lang } from './data/content'

const STORAGE_KEY = 'lang'

/** Idioma inicial: el elegido antes por el usuario o, si no, el del navegador (inglés si no es español). */
function initialLang(): Lang {
  if (Platform.OS !== 'web') return 'es'
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'es' || saved === 'en') return saved
  } catch {
    // localStorage puede no estar disponible (modo privado)
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'es'
  return nav.startsWith('es') || nav.startsWith('ca') || nav.startsWith('gl') || nav.startsWith('eu') ? 'es' : 'en'
}

interface LangValue {
  lang: Lang
  t: Content
  toggleLang: () => void
}

const LangContext = createContext<LangValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.lang = lang
  }, [lang])

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === 'es' ? 'en' : 'es'
      if (Platform.OS === 'web') {
        try {
          localStorage.setItem(STORAGE_KEY, next)
        } catch {
          // ignorar
        }
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ lang, t: content[lang], toggleLang }), [lang, toggleLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

/** Textos y datos en el idioma actual. */
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang debe usarse dentro de LangProvider')
  return ctx
}
