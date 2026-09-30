import { Image, StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Float, Pop } from '../anim'
import { ArrowIcon } from './Icons'
import { Button, Card, Chip, openUrl, Reveal, Section, Txt } from './ui'
import { projects, type Project } from '../data/profile'
import { useLayout, useTheme } from '../theme'

function Links({ project }: { project: Project }) {
  const { colors } = useTheme()
  return (
    <View style={styles.links}>
      {project.demo && (
        <Button
          small
          variant="primary"
          label={project.demoLabel ?? 'Ver demo'}
          icon={<ArrowIcon color="#fff" />}
          onPress={() => openUrl(project.demo!)}
        />
      )}
      {project.repo && (
        <Button small label="Ver código" icon={<ArrowIcon color={colors.text} />} onPress={() => openUrl(project.repo!)} />
      )}
      {project.note && (
        <Txt size={14} muted>
          🔒 {project.note}
        </Txt>
      )}
    </View>
  )
}

function Body({ project, padding }: { project: Project; padding: number }) {
  const { colors } = useTheme()
  return (
    <View style={{ padding, flex: 1, justifyContent: 'center' }}>
      <View style={styles.meta}>
        <Chip label={project.tag} accent />
        <Txt size={13.5} muted>
          {project.period}
        </Txt>
      </View>
      <Txt size={26} weight="extrabold" style={{ letterSpacing: -0.5, lineHeight: 32, marginBottom: 6 }}>
        {project.title}
      </Txt>
      <Txt muted style={{ marginBottom: 14 }}>
        {project.description}
      </Txt>
      <View style={{ marginBottom: 18, gap: 4 }}>
        {project.highlights.map((h) => (
          <View key={h} style={styles.bullet}>
            <Txt size={15} color={colors.accent} style={{ width: 16 }}>
              •
            </Txt>
            <Txt size={15} muted style={{ flex: 1 }}>
              {h}
            </Txt>
          </View>
        ))}
      </View>
      <View style={styles.chips}>
        {project.stack.map((s, i) => (
          <Pop key={s} index={i}>
            <Chip label={s} />
          </Pop>
        ))}
      </View>
      <Links project={project} />
    </View>
  )
}

function Featured({ project }: { project: Project }) {
  const { colors } = useTheme()
  const { isDesktop, isMobile } = useLayout()
  return (
    <Card style={{ flexDirection: isDesktop ? 'row' : 'column' }}>
      <View style={[styles.media, { flex: isDesktop ? 0.46 : undefined, height: isMobile ? 330 : 380 }]}>
        <LinearGradient colors={[colors.accentSoft, colors.surface2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        {project.image && (
          <Float amplitude={10} duration={3000} style={{ zIndex: 1 }}>
            <Image
              source={project.image}
              accessibilityLabel={`${project.title}: modo claro`}
              resizeMode="cover"
              style={[styles.phone, { height: isMobile ? 290 : 340 }]}
            />
          </Float>
        )}
        {project.imageDark && (
          <Float amplitude={10} duration={3000} delay={900} style={styles.phoneBack}>
            <Image
              source={project.imageDark}
              accessibilityLabel={`${project.title}: modo oscuro`}
              resizeMode="cover"
              style={[styles.phone, { height: isMobile ? 290 : 340 }]}
            />
          </Float>
        )}
      </View>
      <View style={{ flex: isDesktop ? 0.54 : undefined }}>
        <Body project={project} padding={isMobile ? 24 : 40} />
      </View>
    </Card>
  )
}

export function Projects({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  const { isMobile } = useLayout()
  const [featured, ...rest] = projects
  return (
    <Section
      id="proyectos"
      eyebrow="Proyectos"
      title="Cosas que he construido"
      subtitle="Desde una app móvil propia hasta un TFG desplegado en producción."
      onLayout={onLayout}
    >
      <Reveal>
        <Featured project={featured} />
      </Reveal>
      <View style={styles.grid}>
        {rest.map((p, i) => (
          <Reveal key={p.title} delay={i * 100} style={{ flexGrow: 1, flexBasis: 320 }}>
            <Card style={{ flex: 1 }}>
              <Body project={p} padding={isMobile ? 24 : 28} />
            </Card>
          </Reveal>
        ))}
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  media: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', overflow: 'hidden', paddingHorizontal: 24 },
  phone: {
    width: 165,
    aspectRatio: 0.5,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderWidth: 6,
    borderBottomWidth: 0,
    borderColor: '#111827',
    backgroundColor: '#111827',
  },
  phoneBack: { marginLeft: -24, marginBottom: -28, transform: [{ rotate: '4deg' }] },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24, marginTop: 24 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  bullet: { flexDirection: 'row' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  links: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 12, paddingTop: 22 },
})
