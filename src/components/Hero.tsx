import { Fragment, useContext } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appear, Blink, Blob, Float, Pulse, ReadyContext, Reveal, useCountUp } from '../anim'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Button, Card, Container, open3D, openUrl, Txt } from './ui'
import { links } from '../data/content'
import { useLang } from '../i18n'
import { font, useLayout, useTheme } from '../theme'

const CODE = {
  k: '#c4a7ff',
  v: '#7dd3fc',
  p: '#93c5fd',
  s: '#86efac',
  b: '#fdba74',
  base: '#cdd6f4',
}

type Token = [color: string, text: string]
const base = (text: string): Token => [CODE.base, text]

const CODE_KEYS = {
  es: { obj: 'jorge', role: 'rol', roleVal: "'Desarrollador DAM'", city: 'ciudad', stack: 'stack', avail: 'disponible', look: 'buscando', lookVal: "'mi primer equipo'" },
  en: { obj: 'jorge', role: 'role', roleVal: "'DAM Developer'", city: 'city', stack: 'stack', avail: 'available', look: 'lookingFor', lookVal: "'my first team'" },
}

function codeLines(lang: 'es' | 'en'): Token[][] {
  const k = CODE_KEYS[lang]
  return [
    [[CODE.k, 'const '], [CODE.v, k.obj], base(' = {')],
    [base('  '), [CODE.p, k.role], base(': '), [CODE.s, k.roleVal], base(',')],
    [base('  '), [CODE.p, k.city], base(': '), [CODE.s, "'Valencia'"], base(',')],
    [base('  '), [CODE.p, k.stack], base(': [')],
    [base('    '), [CODE.s, "'React'"], base(', '), [CODE.s, "'TypeScript'"], base(',')],
    [base('    '), [CODE.s, "'Node.js'"], base(', '), [CODE.s, "'React Native'"], base(',')],
    [base('  ],')],
    [base('  '), [CODE.p, k.avail], base(': '), [CODE.b, 'true'], base(',')],
    [base('  '), [CODE.p, k.look], base(': '), [CODE.s, k.lookVal], base(',')],
    [base('}')],
  ]
}

function CodeText({ color, text }: { color: string; text: string }) {
  return (
    <Txt size={14} color={color} style={{ fontFamily: font.mono, lineHeight: 24, whiteSpace: 'pre' } as object}>
      {text}
    </Txt>
  )
}

function CodeCard({ ready }: { ready: boolean }) {
  const { lang } = useLang()
  const LINES = codeLines(lang)
  return (
    <Appear show={ready} dir="right" distance={60} delay={500} duration={1000}>
      <Float amplitude={7} duration={3600}>
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
            {LINES.map((line, i) => (
              <Appear key={i} show={ready} dir="left" distance={14} delay={1100 + i * 150} duration={400}>
                <View style={{ flexDirection: 'row' }}>
                  {line.map(([color, text], j) => (
                    <CodeText key={j} color={color} text={text} />
                  ))}
                  {i === LINES.length - 1 && (
                    <Blink>
                      <CodeText color={CODE.v} text="▍" />
                    </Blink>
                  )}
                </View>
              </Appear>
            ))}
          </View>
        </View>
      </Float>
    </Appear>
  )
}

function SocialButton({ label, url, children }: { label: string; url: string; children: React.ReactNode }) {
  const { colors } = useTheme()
  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={label}
      onPress={() => openUrl(url)}
      style={({ hovered }: { hovered?: boolean; pressed: boolean }) => [
        styles.social,
        { backgroundColor: colors.surface, borderColor: hovered ? colors.accent : colors.border, transform: [{ translateY: hovered ? -3 : 0 }] },
      ]}
    >
      {children}
    </Pressable>
  )
}

function StatValue({ value, show }: { value: string; show: boolean }) {
  const { colors } = useTheme()
  const numeric = /^\d+$/.test(value)
  const n = useCountUp(numeric ? Number(value) : 0, show && numeric)
  return (
    <Txt size={30} weight="extrabold" color={colors.accent} style={{ lineHeight: 36 }}>
      {numeric ? n : value}
    </Txt>
  )
}

function StatCell({ value, label, width, index }: { value: string; label: string; width: '50%' | '25%'; index: number }) {
  const ready = useContext(ReadyContext)
  return (
    <Reveal delay={index * 120} style={{ width, padding: 12 }}>
      <StatValue value={value} show={ready} />
      <Txt size={14} muted style={{ lineHeight: 20 }}>
        {label}
      </Txt>
    </Reveal>
  )
}


export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  const { colors } = useTheme()
  const { isMobile, isDesktop } = useLayout()
  const { t } = useLang()
  const ready = useContext(ReadyContext)
  const titleSize = isMobile ? 38 : 62
  const titleLine = isMobile ? 44 : 68

  return (
    <View style={{ paddingTop: (isDesktop ? 96 : 64) + 64, overflow: 'hidden' }}>
      <LinearGradient
        pointerEvents="none"
        colors={[colors.accentSoft, colors.bg, colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Blob size={420} color={`${colors.accent}55`} top={-80} left={-120} drift={60} />
      <Blob size={380} color={`${colors.accent2}40`} top={120} right={-100} drift={50} duration={11000} />

      <Container style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'center' : 'stretch', gap: 48 }}>
        <View style={{ flex: isDesktop ? 1.15 : undefined }}>
          <Appear show={ready} dir="up" delay={100} style={{ maxWidth: '100%' }}>
            <View style={styles.intro}>
              <LinearGradient colors={[colors.accent, colors.accent2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.avatarRing}>
                <Image
                  source={links.photo}
                  accessibilityLabel={t.ui.photoAlt}
                  resizeMode="cover"
                  style={[styles.avatar, { borderColor: colors.bg }]}
                />
              </LinearGradient>
              <View style={[styles.badge, { backgroundColor: colors.surface, borderColor: colors.border, flexShrink: 1 }]}>
                <Pulse color={colors.success} />
                <Txt size={13.5} muted style={{ flexShrink: 1 }}>
                  {t.profile.availability}
                </Txt>
              </View>
            </View>
          </Appear>

          <View style={[styles.title, { columnGap: isMobile ? 9 : 16 }]}>
            {t.hero.title.map((w, i) => (
              <Fragment key={w + i}>
              {i === t.hero.breakBefore && <View style={{ width: '100%', height: 0 }} />}
              <Appear show={ready} dir="up" distance={40} delay={250 + i * 90} duration={800}>
                <Txt
                  size={titleSize}
                  weight="extrabold"
                  color={i === t.hero.accentIndex ? colors.accent : undefined}
                  style={{ lineHeight: titleLine, letterSpacing: isMobile ? -1 : -2 }}
                >
                  {w}
                </Txt>
              </Appear>
              </Fragment>
            ))}
          </View>

          <Appear show={ready} dir="up" delay={950}>
            <Txt size={17} muted style={{ maxWidth: 560 }}>
              <Txt size={17} weight="semibold">
                {t.profile.role}
              </Txt>
              {' · ' + links.location + '. ' + t.profile.intro}
            </Txt>
          </Appear>
          <Appear show={ready} dir="up" delay={1100} style={styles.actions}>
            <Button label={t.ui.explore3d} variant="primary" onPress={open3D} />
            <Button label={t.ui.seeProjects} onPress={() => onNavigate('proyectos')} />
            <Button label={t.ui.downloadCv} onPress={() => openUrl(links.cv)} />
            <Button label={t.ui.writeMe} icon={<MailIcon size={18} color={colors.text} />} onPress={() => onNavigate('contacto')} />
          </Appear>
          <Appear show={ready} dir="up" delay={1250} style={styles.socials}>
            <SocialButton label="GitHub" url={links.github}>
              <GitHubIcon color={colors.muted} />
            </SocialButton>
            <SocialButton label="LinkedIn" url={links.linkedin}>
              <LinkedInIcon color={colors.muted} />
            </SocialButton>
          </Appear>
        </View>
        <View style={{ flex: isDesktop ? 0.85 : undefined }}>
          <CodeCard ready={ready} />
        </View>
      </Container>

      <Container style={{ marginTop: 56 }}>
        <Reveal dir="scale">
          <Card lift={4} style={styles.stats}>
            {t.stats.map((s, i) => (
              <StatCell key={s.label} value={s.value} label={s.label} width={isMobile ? '50%' : '25%'} index={i} />
            ))}
          </Card>
        </Reveal>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  intro: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarRing: { width: 108, height: 108, borderRadius: 54, padding: 4 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3 },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  title: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 16, marginTop: 18, marginBottom: 20 },
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
