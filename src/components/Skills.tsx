import { StyleSheet, View, type LayoutChangeEvent } from 'react-native'
import { Card, Chip, Reveal, Section, Txt } from './ui'
import { skills } from '../data/profile'

export function Skills({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  return (
    <Section id="tecnologias" eyebrow="Tecnologías" title="Mi caja de herramientas" subtitle="Con lo que trabajo habitualmente." onLayout={onLayout}>
      <View style={styles.grid}>
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 80} style={{ flexGrow: 1, flexBasis: 250 }}>
            <Card style={{ padding: 24, flex: 1 }}>
              <Txt size={16} weight="bold" style={{ marginBottom: 14 }}>
                {g.group}
              </Txt>
              <View style={styles.chips}>
                {g.items.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </View>
            </Card>
          </Reveal>
        ))}
      </View>
    </Section>
  )
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
})
