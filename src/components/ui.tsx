import { useState, type ReactNode } from 'react'
import {
  Animated,
  Easing,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Reveal } from '../anim'
import { font, MAX_WIDTH, useLayout, useTheme } from '../theme'

export { Reveal }

type Weight = 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold'

interface TxtProps extends TextProps {
  size?: number
  weight?: Weight
  muted?: boolean
  color?: string
  style?: StyleProp<TextStyle>
}

/** Texto con la tipografía y los colores del tema. */
export function Txt({ size = 16, weight = 'regular', muted, color, style, ...rest }: TxtProps) {
  const { colors } = useTheme()
  return (
    <Text
      {...rest}
      style={[
        { fontFamily: font[weight], fontSize: size, lineHeight: size * 1.55, color: color ?? (muted ? colors.muted : colors.text) },
        style,
      ]}
    />
  )
}

/**
 * Abre un enlace externo. En web usa `window.open` con `noopener,noreferrer`
 * para que la página abierta no pueda acceder a `window.opener` (reverse tabnabbing).
 */
export function openUrl(url: string) {
  if (Platform.OS === 'web') {
    // mailto: se abre en la misma pestaña (con _blank dejaría una pestaña vacía)
    if (url.startsWith('mailto:')) window.location.href = url
    else window.open(url, '_blank', 'noopener,noreferrer')
    return
  }
  void Linking.openURL(url)
}

/** Contenedor centrado con ancho máximo y márgenes laterales. */
export function Container({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { isMobile } = useLayout()
  return (
    <View style={[{ width: '100%', maxWidth: MAX_WIDTH, alignSelf: 'center', paddingHorizontal: isMobile ? 16 : 28 }, style]}>
      {children}
    </View>
  )
}

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: 'primary' | 'default' | 'light' | 'ghost'
  small?: boolean
  icon?: ReactNode
}

export function Button({ label, onPress, variant = 'default', small, icon }: ButtonProps) {
  const { colors } = useTheme()
  const padding = small ? { paddingVertical: 8, paddingHorizontal: 16 } : { paddingVertical: 12, paddingHorizontal: 22 }
  const textColor = variant === 'primary' ? '#fff' : variant === 'light' ? '#1e1b4b' : variant === 'ghost' ? '#fff' : colors.text

  const content = (
    <View style={[styles.btnInner, padding]}>
      {icon}
      <Txt size={small ? 14 : 15} weight="semibold" color={textColor} style={{ flexShrink: 1 }}>
        {label}
      </Txt>
    </View>
  )

  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      style={({ hovered, pressed }: { hovered?: boolean; pressed: boolean }) => [
        styles.btn,
        variant === 'default' && { backgroundColor: colors.surface, borderColor: hovered ? colors.accent : colors.border },
        variant === 'light' && { backgroundColor: '#fff', borderColor: '#fff' },
        variant === 'ghost' && { backgroundColor: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.3)' },
        variant === 'primary' && { borderColor: 'transparent', overflow: 'hidden' },
        { opacity: pressed ? 0.85 : 1, transform: [{ translateY: hovered ? -2 : 0 }] },
      ]}
    >
      {variant === 'primary' ? (
        <LinearGradient colors={[colors.accent, colors.accent2]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </Pressable>
  )
}

export function Chip({ label, accent }: { label: string; accent?: boolean }) {
  const { colors } = useTheme()
  return (
    <View
      style={[
        styles.chip,
        { backgroundColor: accent ? colors.accentSoft : colors.surface2, borderColor: accent ? 'transparent' : colors.border },
      ]}
    >
      <Txt size={12.5} weight={accent ? 'bold' : 'medium'} color={accent ? colors.accent : colors.text} style={{ lineHeight: 18 }}>
        {label}
      </Txt>
    </View>
  )
}

const APressable = Animated.createAnimatedComponent(Pressable)

/** Tarjeta que se eleva suavemente al pasar el ratón por encima. */
export function Card({ children, style, lift = 6 }: { children: ReactNode; style?: StyleProp<ViewStyle>; lift?: number }) {
  const { colors } = useTheme()
  const [v] = useState(() => new Animated.Value(0))
  const to = (toValue: number) => Animated.timing(v, { toValue, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start()
  return (
    <APressable
      accessible={false}
      focusable={false}
      onHoverIn={() => to(1)}
      onHoverOut={() => to(0)}
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.shadow },
        {
          borderColor: v.interpolate({ inputRange: [0, 1], outputRange: [colors.border, colors.accent] }),
          transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -lift] }) }],
        },
        style,
      ]}
    >
      {children}
    </APressable>
  )
}

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
  onLayout: (id: string, e: LayoutChangeEvent) => void
}

export function Section({ id, eyebrow, title, subtitle, children, onLayout }: SectionProps) {
  const { colors } = useTheme()
  const { isMobile } = useLayout()
  return (
    <View onLayout={(e) => onLayout(id, e)}>
      <Container style={{ paddingTop: isMobile ? 56 : 80 }}>
        <Reveal>
          <Txt size={12.5} weight="bold" color={colors.accent} style={{ letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 6 }}>
            {eyebrow}
          </Txt>
          <Txt size={isMobile ? 28 : 40} weight="extrabold" style={{ lineHeight: isMobile ? 34 : 46, letterSpacing: -1 }}>
            {title}
          </Txt>
          {subtitle && (
            <Txt muted style={{ marginTop: 8, maxWidth: 560 }}>
              {subtitle}
            </Txt>
          )}
        </Reveal>
        <View style={{ marginTop: 32 }}>{children}</View>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: { borderRadius: 12, borderWidth: 1, maxWidth: '100%' },
  btnInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  chip: { paddingVertical: 3, paddingHorizontal: 12, borderRadius: 999, borderWidth: 1 },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    overflow: 'hidden',
  },
})
