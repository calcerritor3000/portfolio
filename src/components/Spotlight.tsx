import { createElement, useState } from 'react'
import { Platform, StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Blob, Float, Pop, Reveal } from '../anim'
import { ArrowIcon, GitHubIcon } from './Icons'
import { Button, Chip, Container, openUrl, Txt } from './ui'
import { projects } from '../data/profile'
import { useLayout, useTheme } from '../theme'

const taskorit = projects.find((p) => p.title === 'Taskorit')

/** Vídeo HTML nativo: en web react-native-web renderiza elementos del DOM tal cual. */
export function PromoVideo({ src, width, showSound = true }: { src: string; width: number; showSound?: boolean }) {
  const [muted, setMuted] = useState(true)
  if (Platform.OS !== 'web') return null
  return (
    <View style={[styles.phone, { width, height: (width * 16) / 9 }]}>
      {createElement('video', {
        src,
        autoPlay: true,
        muted,
        loop: true,
        playsInline: true,
        controls: !muted,
        preload: 'metadata',
        'aria-label': 'Anuncio de Taskorit',
        style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#000' },
      })}
      {showSound && muted && (
        <View style={styles.soundBtn}>
          <Button small variant="light" label="🔊 Activar sonido" onPress={() => setMuted(false)} />
        </View>
      )}
    </View>
  )
}

export function Spotlight({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  const { colors } = useTheme()
  const { isDesktop, isMobile } = useLayout()
  if (!taskorit?.video) return null

  return (
    <View onLayout={(e) => onLayout('taskorit', e)}>
      <Container style={{ paddingTop: isMobile ? 56 : 80 }}>
        <Reveal dir="scale">
          <LinearGradient
            colors={['#0d1028', '#1b1f5c', '#0b3a4a']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.box, { flexDirection: isDesktop ? 'row' : 'column', padding: isMobile ? 20 : 40 }]}
          >
            <Blob size={360} color="rgba(139,139,255,0.35)" top={-120} left={-80} drift={50} />
            <Blob size={320} color="rgba(34,211,238,0.3)" bottom={-120} right={-80} drift={45} duration={11000} />

            <View style={{ flex: isDesktop ? 1 : undefined, justifyContent: 'center', gap: 14 }}>
              <View style={styles.badges}>
                <Chip label="✨ Nuevo" accent />
                <Txt size={13} color="rgba(255,255,255,0.7)">
                  Mi app destacada
                </Txt>
              </View>
              <Txt size={isMobile ? 40 : 58} weight="extrabold" color="#fff" style={{ letterSpacing: -2, lineHeight: isMobile ? 46 : 62 }}>
                Taskorit
              </Txt>
              <Txt size={isMobile ? 19 : 22} weight="semibold" color="#a5b4fc" style={{ lineHeight: isMobile ? 26 : 30 }}>
                Tu día organizado, de un vistazo.
              </Txt>
              <Txt color="rgba(255,255,255,0.8)" style={{ maxWidth: 480 }}>
                Tareas, horario semanal y rachas en una sola app. Funciona en Android, iOS y web, se instala como PWA y tus
                datos se quedan en tu dispositivo.
              </Txt>
              <View style={styles.chips}>
                {['Tareas inteligentes', 'Horario semanal', 'Rachas 🔥', 'Modo oscuro', 'Sin cuentas'].map((f, i) => (
                  <Pop key={f} index={i}>
                    <View style={styles.feature}>
                      <Txt size={13} weight="medium" color="#fff" style={{ lineHeight: 18 }}>
                        {f}
                      </Txt>
                    </View>
                  </Pop>
                ))}
              </View>
              <View style={styles.actions}>
                {taskorit.demo && (
                  <Button
                    variant="primary"
                    label="Probar Taskorit gratis"
                    icon={<ArrowIcon color="#fff" />}
                    onPress={() => openUrl(taskorit.demo!)}
                  />
                )}
                {taskorit.repo && (
                  <Button variant="ghost" label="Ver código" icon={<GitHubIcon size={18} color="#fff" />} onPress={() => openUrl(taskorit.repo!)} />
                )}
              </View>
            </View>

            <View style={{ flex: isDesktop ? 0.8 : undefined, alignItems: 'center', justifyContent: 'center', marginTop: isDesktop ? 0 : 12 }}>
              <Float amplitude={8} duration={3400}>
                <View style={[styles.glow, { shadowColor: colors.accent }]}>
                  <PromoVideo src={taskorit.video} width={isMobile ? 240 : 290} />
                </View>
              </Float>
            </View>
          </LinearGradient>
        </Reveal>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  box: { borderRadius: 28, overflow: 'hidden', gap: 40, alignItems: 'stretch' },
  badges: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  feature: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 10 },
  phone: { borderRadius: 34, borderWidth: 7, borderColor: '#0b0f1e', overflow: 'hidden', backgroundColor: '#000' },
  glow: { borderRadius: 34, shadowOffset: { width: 0, height: 24 }, shadowOpacity: 0.6, shadowRadius: 50 },
  soundBtn: { position: 'absolute', left: 0, right: 0, bottom: 14, alignItems: 'center' },
})
