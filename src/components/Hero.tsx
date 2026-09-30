import { Pressable, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Button, Card, Container, openUrl, Reveal, Txt } from './ui'
import { profile, stats } from '../data/profile'
import { font, useLayout, useTheme } from '../theme'

const CODE = {
  k: '#c4a7ff',
  v: '#7dd3fc',
  p: '#93c5fd',
  s: '#86efac',
  b: '#fdba74',
  base: '#cdd6f4',
}

function CodeLine({ children }: { children: React.ReactNode }) {
  return (
    <Txt size={14} color={CODE.base} style={{ fontFamily: font.mono, lineHeight: 24 }}>
      {children}
    </Txt>
  )
}

const c = (color: string, text: string) => <Txt size={14} color={color} style={{ fontFamily: font.mono, lineHeight: 24 }}>{text}</Txt>

function CodeCard() {
  return (
    <View style={styles.code} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.codeBar}>
        <View style={[styles.dot, { backgroundColor: '#ff5f57' }]} />
        <View style={[styles.dot, { backgroundColor: '#febc2e' }]} />
        <View style={[styles.dot, { backgroundColor: '#28c840' }]} />
        <Txt size={12.5} color="#7d88ad" style={{ marginLeft: 10, fontFamily: font.mono }}>
          jorge.ts
        </Txt>
      </View>
      <View style={{ padding: 22 }}>
        <CodeLine>{c(CODE.k, 'const ')}{c(CODE.v, 'jorge')} = {'{'}</CodeLine>
        <CodeLine>{'  '}{c(CODE.p, 'rol')}: {c(CODE.s, "'Desarrollador DAM'")},</CodeLine>
        <CodeLine>{'  '}{c(CODE.p, 'ciudad')}: {c(CODE.s, "'Valencia'")},</CodeLine>
        <CodeLine>{'  '}{c(CODE.p, 'stack')}: [</CodeLine>
        <CodeLine>{'    '}{c(CODE.s, "'React'")}, {c(CODE.s, "'TypeScript'")},</CodeLine>
        <CodeLine>{'    '}{c(CODE.s, "'Node.js'")}, {c(CODE.s, "'React Native'")},</CodeLine>
        <CodeLine>{'  '}],</CodeLine>
        <CodeLine>{'  '}{c(CODE.p, 'disponible')}: {c(CODE.b, 'true')},</CodeLine>
        <CodeLine>{'  '}{c(CODE.p, 'buscando')}: {c(CODE.s, "'mi primer equipo'")},</CodeLine>
        <CodeLine>{'}'}</CodeLine>
      </View>
    </View>
  )
}

function SocialButton({ label, url, children }: { label: string; url: string; children: React.ReactNode }) {
  const { colors } = useTheme()
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      onPress={() => openUrl(url)}
      style={[styles.social, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {children}
    </Pressable>
  )
}

export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { colors } = useTheme()
  const { isMobile, isDesktop } = useLayout()

  return (
    <View style={{ paddingTop: (isDesktop ? 96 : 64) + 64, overflow: 'hidden' }}>
      <LinearGradient
        pointerEvents="none"
        colors={[colors.accentSoft, colors.bg, colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Container style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'stretch', gap: 48 }}>
        <View style={{ flex: isDesktop ? 1.15 : undefined }}>
          <View style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            <Txt size={13.5} muted style={{ flexShrink: 1 }}>
              {profile.availability}
            </Txt>
          </View>
          <Txt
            size={isMobile ? 38 : 62}
            weight="extrabold"
            style={{ lineHeight: isMobile ? 44 : 68, letterSpacing: isMobile ? -1 : -2, marginTop: 18, marginBottom: 20 }}
          >
            Hola, soy <Txt size={isMobile ? 38 : 62} weight="extrabold" color={colors.accent} style={{ lineHeight: isMobile ? 44 : 68 }}>Jorge</Txt>
            .{'\n'}Creo software que funciona.
          </Txt>
          <Txt size={17} muted style={{ maxWidth: 560 }}>
            <Txt size={17} weight="semibold">{profile.role}</Txt> en {profile.location}. {profile.intro}
          </Txt>
          <View style={styles.actions}>
            <Button label="Ver proyectos" variant="primary" onPress={() => onNavigate('proyectos')} />
            <Button
              label="Escríbeme"
              icon={<MailIcon size={18} color={colors.text} />}
              onPress={() => openUrl(`mailto:${profile.email}`)}
            />
          </View>
          <View style={styles.socials}>
            <SocialButton label="GitHub" url={profile.github}>
              <GitHubIcon color={colors.muted} />
            </SocialButton>
            <SocialButton label="LinkedIn" url={profile.linkedin}>
              <LinkedInIcon color={colors.muted} />
            </SocialButton>
          </View>
        </View>
        <View style={{ flex: isDesktop ? 0.85 : undefined }}>
          <CodeCard />
        </View>
      </Container>

      <Container style={{ marginTop: 56 }}>
        <Reveal>
          <Card style={styles.stats}>
            {stats.map((s) => (
              <View key={s.label} style={{ width: isMobile ? '50%' : '25%', padding: 12 }}>
                <Txt size={30} weight="extrabold" color={colors.accent} style={{ lineHeight: 36 }}>
                  {s.value}
                </Txt>
                <Txt size={14} muted style={{ lineHeight: 20 }}>
                  {s.label}
                </Txt>
              </View>
            ))}
          </Card>
        </Reveal>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    maxWidth: '100%',
  },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 28 },
  socials: { flexDirection: 'row', gap: 14, marginTop: 28 },
  social: { width: 42, height: 42, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  code: {
    backgroundColor: '#0d1224',
    borderWidth: 1,
    borderColor: '#263055',
    borderRadius: 20,
    overflow: 'hidden',
    transform: [{ rotate: '1.5deg' }],
  },
  codeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#141b36',
    borderBottomWidth: 1,
    borderBottomColor: '#263055',
  },
  dot: { width: 11, height: 11, borderRadius: 6 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', padding: 12 },
})
