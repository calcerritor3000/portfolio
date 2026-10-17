import { useContext, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons'
import { Appear, ReadyContext } from '../anim'
import { Button, Container, open3D, Txt } from './ui'
import { useLang } from '../i18n'
import { useLayout, useTheme } from '../theme'

interface Props {
  active: string
  onNavigate: (id: string) => void
}

export function Header({ active, onNavigate }: Props) {
  const { colors, mode, toggle } = useTheme()
  const { lang, t, toggleLang } = useLang()
  const { width } = useLayout()
  const [open, setOpen] = useState(false)
  const ready = useContext(ReadyContext)
  // Con 6 secciones, el menú completo solo cabe en pantallas anchas
  const compact = width < 1060

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
    <Appear show={ready} dir="down" distance={70} style={[styles.header, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
      <Container style={styles.row}>
        <Pressable accessibilityRole="link" onPress={() => go('inicio')}>
          <Txt size={21} weight="extrabold" style={{ letterSpacing: -0.5 }}>
            JC<Txt size={21} weight="extrabold" color={colors.accent}>.</Txt>
          </Txt>
        </Pressable>

        <View style={styles.spacer} />

        {!compact && (
          <View style={styles.nav}>
            {t.nav.map((l) => {
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

        {width >= 560 && <Button small variant="primary" label="🧊 3D" onPress={open3D} />}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={(lang === 'es' ? 'EN' : 'ES') + ' · ' + t.ui.langSwitch}
          onPress={toggleLang}
          style={[styles.iconBtn, { backgroundColor: colors.surface, borderColor: colors.border, width: 46 }]}
        >
          <Txt size={13} weight="bold" style={{ lineHeight: 16 }}>
            {lang === 'es' ? 'EN' : 'ES'}
          </Txt>
        </Pressable>
        {iconBtn(
          mode === 'dark' ? t.ui.lightMode : t.ui.darkMode,
          toggle,
          mode === 'dark' ? <SunIcon color={colors.text} /> : <MoonIcon color={colors.text} />,
        )}
        {compact &&
          iconBtn(t.ui.openMenu, () => setOpen((o) => !o), open ? <CloseIcon color={colors.text} /> : <MenuIcon color={colors.text} />)}
      </Container>

      {compact && open && (
        <View style={[styles.menu, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
          {t.nav.map((l) => (
            <Pressable key={l.id} accessibilityRole="link" onPress={() => go(l.id)} style={styles.menuItem}>
              <Txt size={16} weight="medium" color={active === l.id ? colors.accent : colors.text}>
                {l.label}
              </Txt>
            </Pressable>
          ))}
          <Pressable accessibilityRole="link" onPress={open3D} style={styles.menuItem}>
            <Txt size={16} weight="bold" color={colors.accent}>
              {t.ui.portfolio3d}
            </Txt>
          </Pressable>
        </View>
      )}
    </Appear>
  )
}

const styles = StyleSheet.create({
  header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, borderBottomWidth: 1 },
  row: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 8 },
  spacer: { flex: 1 },
  nav: { flexDirection: 'row', gap: 2, marginRight: 6 },
  navItem: { paddingVertical: 6, paddingHorizontal: 11, borderRadius: 999 },
  iconBtn: { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  menu: { paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1 },
  menuItem: { paddingVertical: 12, paddingHorizontal: 14 },
})
