import { Image, StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Float, Pop } from '../anim'
import { Card, Reveal, Section, Txt } from './ui'
import { links } from '../data/content'
import { useLang } from '../i18n'
import { useLayout, useTheme } from '../theme'

export function About({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  const { colors } = useTheme()
  const { t } = useLang()
  const { isDesktop, isMobile } = useLayout()
  const a = t.about

  return (
    <Section id="sobre-mi" eyebrow={a.eyebrow} title={a.title} onLayout={onLayout}>
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: isDesktop ? 48 : 28, alignItems: isDesktop ? 'flex-start' : 'stretch' }}>
        <Reveal dir="left" style={{ alignItems: 'center', alignSelf: isDesktop ? 'flex-start' : 'center' }}>
          <Float amplitude={6} duration={4200}>
            <LinearGradient colors={[colors.accent, colors.accent2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.frame}>
              <Image
                source={links.photo}
                accessibilityLabel={t.ui.photoAlt}
                resizeMode="cover"
                style={[styles.photo, { width: isMobile ? 220 : 260, height: isMobile ? 260 : 310, borderColor: colors.bg }]}
              />
            </LinearGradient>
          </Float>
        </Reveal>

        <View style={{ flex: isDesktop ? 1 : undefined, gap: 22 }}>
          {a.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <Txt size={16.5} muted style={{ lineHeight: 27 }}>
                {p}
              </Txt>
            </Reveal>
          ))}
          <Reveal delay={360}>
            <Card lift={3} style={styles.facts}>
              {a.facts.map((f, i) => (
                <Pop key={f.label} index={i} step={70}>
                  <View style={[styles.fact, { width: isMobile ? 260 : 250 }]}>
                    <Txt size={20} style={{ lineHeight: 26 }}>
                      {f.emoji}
                    </Txt>
                    <View style={{ flexShrink: 1 }}>
                      <Txt size={12} weight="bold" color={colors.accent} style={{ letterSpacing: 0.6, textTransform: 'uppercase', lineHeight: 16 }}>
                        {f.label}
                      </Txt>
                      <Txt size={14.5} weight="medium" style={{ lineHeight: 21 }}>
                        {f.value}
                      </Txt>
                    </View>
                  </View>
                </Pop>
              ))}
            </Card>
          </Reveal>
        </View>
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  frame: { borderRadius: 28, padding: 4, transform: [{ rotate: '-2deg' }] },
  photo: { borderRadius: 24, borderWidth: 4 },
  facts: { flexDirection: 'row', flexWrap: 'wrap', gap: 18, padding: 22 },
  fact: { flexDirection: 'row', alignItems: 'center', gap: 12 },
})
