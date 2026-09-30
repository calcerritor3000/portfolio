import { Contact, Footer } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Projects theme={theme} />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
