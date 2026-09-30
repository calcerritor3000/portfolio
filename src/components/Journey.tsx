import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { Reveal, Section, Txt } from './ui'
import { education, experience, type TimelineItem } from '../data/profile'
import { useTheme } from '../theme'

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  const { colors } = useTheme()
  return (
    <Reveal style={{ flexGrow: 1, flexBasis: 340 }}>
      <Txt size={18} weight="bold" style={{ marginBottom: 22 }}>
        {title}
      </Txt>
      <View style={[styles.line, { borderLeftColor: colors.border }]}>
        {items.map((i, n) => (
          <Reveal key={i.title + i.period} dir="left" distance={30} delay={n * 140} style={styles.item}>
            <View style={[styles.marker, { backgroundColor: colors.accent, borderColor: colors.bg }]} />
            <Txt size={12.5} weight="bold" color={colors.accent}>
              {i.period}
            </Txt>
            <Txt size={16.5} weight="bold">
              {i.title}
            </Txt>
            <Txt size={15} muted style={{ marginBottom: 4 }}>
              {i.place}
            </Txt>
            <Txt size={15} muted>
              {i.text}
            </Txt>
          </Reveal>
        ))}
      </View>
    </Reveal>
  )
}

export function Journey({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  return (
    <Section id="trayectoria" eyebrow="Trayectoria" title="Experiencia y formación" onLayout={onLayout}>
      <View style={styles.cols}>
        <Timeline title="Experiencia" items={experience} />
        <Timeline title="Formación" items={education} />
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  cols: { flexDirection: 'row', flexWrap: 'wrap', gap: 48 },
  line: { borderLeftWidth: 2, paddingLeft: 22, marginLeft: 6 },
  item: { paddingBottom: 26 },
  marker: { position: 'absolute', left: -31, top: 4, width: 14, height: 14, borderRadius: 7, borderWidth: 3 },
})
