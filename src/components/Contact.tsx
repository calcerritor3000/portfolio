import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Blob } from '../anim'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Button, Container, openUrl, Reveal, Txt } from './ui'
import { profile } from '../data/profile'
import { useLayout } from '../theme'

export function Contact({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  const { isMobile } = useLayout()
  return (
    <View onLayout={(e) => onLayout('contacto', e)}>
      <Container style={{ paddingTop: isMobile ? 56 : 80 }}>
        <Reveal dir="scale">
          <LinearGradient colors={['#3b3bd6', '#5b5bf0', '#2563eb']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.box}>
              <Blob size={300} color="rgba(34,211,238,0.45)" top={-90} right={-60} drift={40} />
              <Blob size={260} color="rgba(167,139,250,0.4)" bottom={-90} left={-60} drift={36} duration={11000} />
            <Txt size={isMobile ? 28 : 40} weight="extrabold" color="#fff" style={{ textAlign: 'center', letterSpacing: -1, lineHeight: isMobile ? 34 : 46 }}>
              ¿Trabajamos juntos?
            </Txt>
            <Txt color="rgba(255,255,255,0.85)" style={{ textAlign: 'center', maxWidth: 520, marginTop: 8 }}>
              Busco mi primera oportunidad como desarrollador. Si tienes una propuesta o solo quieres charlar, escríbeme.
            </Txt>
            <View style={styles.actions}>
              <Button variant="light" label={profile.email} icon={<MailIcon size={18} color="#1e1b4b" />} onPress={() => openUrl(`mailto:${profile.email}`)} />
              <Button variant="ghost" label="LinkedIn" icon={<LinkedInIcon size={18} color="#fff" />} onPress={() => openUrl(profile.linkedin)} />
              <Button variant="ghost" label="GitHub" icon={<GitHubIcon size={18} color="#fff" />} onPress={() => openUrl(profile.github)} />
            </View>
          </LinearGradient>
        </Reveal>
      </Container>
      <Container style={{ paddingVertical: 40 }}>
        <Txt size={13.5} muted style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} {profile.name} · Hecho con Expo, React Native y TypeScript
        </Txt>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  box: { borderRadius: 28, paddingVertical: 56, paddingHorizontal: 24, alignItems: 'center', overflow: 'hidden' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 },
})
