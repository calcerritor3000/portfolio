import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'
import { Container, Txt } from './ui'
import { useLayout, useTheme } from '../theme'

export const NAV_LINKS = [
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tecnologias', label: 'Tecnologías' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'contacto', label: 'Contacto' },
]

interface Props {
  active: string
  onNavigate: (id: string) => void
}

export function Header({ active, onNavigate }: Props) {
  const { colors, mode, toggle } = useTheme()
  const { isMobile } = useLayout()
  const [open, setOpen] = useState(false)

  const go = (id: string) => {
    setOpen(false)
    onNavigate(id)
  }

  const iconBtn = (label: string, onPress: () => void, icon: React.ReactNode) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      {icon}
    </Pressable>
  )

  return (
    <View style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
      <Container style={styles.row}>
        <Pressable accessibilityRole="link" onPress={() => go('inicio')}>
          <Txt size={21} weight="extrabold" style={{ letterSpacing: -0.5 }}>
            JC<Txt size={21} weight="extrabold" color={colors.accent}>.</Txt>
          </Txt>
        </Pressable>

        <View style={styles.spacer} />

        {!isMobile && (
          <View style={styles.nav}>
            {NAV_LINKS.map((l) => {
              const isActive = active === l.id
              return (
                <Pressable
                  key={l.id}
                  accessibilityRole="link"
                  onPress={() => go(l.id)}
                  style={[styles.navItem, isActive && { backgroundColor: colors.accentSoft }]}
                >
                  <Txt size={14.5} weight="medium" color={isActive ? colors.accent : colors.muted}>
                    {l.label}
                  </Txt>
                </Pressable>
              )
            })}
          </View>
        )}

        {iconBtn(
          mode === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro',
          toggle,
          mode === 'dark' ? <SunIcon color={colors.text} /> : <MoonIcon color={colors.text} />,
        )}
        {isMobile &&
          iconBtn('Abrir menú', () => setOpen((o) => !o), open ? <CloseIcon color={colors.text} /> : <MenuIcon color={colors.text} />)}
      </Container>

      {isMobile && open && (
        <View style={[styles.menu, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
          {NAV_LINKS.map((l) => (
            <Pressable key={l.id} accessibilityRole="link" onPress={() => go(l.id)} style={styles.menuItem}>
              <Txt size={16} weight="medium" color={active === l.id ? colors.accent : colors.text}>
                {l.label}
              </Txt>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, borderBottomWidth: 1 },
  row: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 8 },
  spacer: { flex: 1 },
  nav: { flexDirection: 'row', gap: 4, marginRight: 8 },
  navItem: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 999 },
  iconBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  menu: { paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 14 },
})
