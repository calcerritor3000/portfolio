import { useCallback, useRef, useState } from 'react'
import { ScrollView, View, type LayoutChangeEvent, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native'
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter'
import { StatusBar } from 'expo-status-bar'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { ThemeProvider, useTheme } from './theme'

const HEADER_HEIGHT = 64

function Portfolio() {
  const { colors, mode } = useTheme()
  const scroll = useRef<ScrollView>(null)
  const offsets = useRef<Record<string, number>>({})
  const [active, setActive] = useState('')

  const onSectionLayout = useCallback((id: string, e: LayoutChangeEvent) => {
    offsets.current[id] = e.nativeEvent.layout.y
  }, [])

  const navigate = useCallback((id: string) => {
    const y = id === 'inicio' ? 0 : (offsets.current[id] ?? 0) - HEADER_HEIGHT + 8
    scroll.current?.scrollTo({ y: Math.max(0, y), animated: true })
  }, [])

  // La sección activa es la última cuyo inicio ya ha pasado por debajo de la cabecera
  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y + HEADER_HEIGHT + 120
    let current = ''
    for (const [id, top] of Object.entries(offsets.current)) {
      if (top <= y && (current === '' || top > offsets.current[current])) current = id
    }
    setActive((prev) => (prev === current ? prev : current))
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <ScrollView ref={scroll} onScroll={onScroll} scrollEventThrottle={32} contentContainerStyle={{ paddingBottom: 0 }}>
        <Hero onNavigate={navigate} />
        <Projects onLayout={onSectionLayout} />
        <Skills onLayout={onSectionLayout} />
        <Journey onLayout={onSectionLayout} />
        <Contact onLayout={onSectionLayout} />
      </ScrollView>
      <Header active={active} onNavigate={navigate} />
    </View>
  )
}

export default function App() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  })
  if (!loaded) return null
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
