import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { AccessibilityInfo, Animated, Easing, Platform, View, type StyleProp, type ViewStyle } from 'react-native'

/** Indica que la pantalla de carga ya se ha ido y pueden empezar las animaciones de entrada. */
export const ReadyContext = createContext(true)
/** Lo usan los elementos hijos de un Reveal para animarse escalonados cuando este aparece. */
const ShownContext = createContext<boolean | null>(null)

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    let alive = true
    void AccessibilityInfo.isReduceMotionEnabled().then((v) => alive && setReduced(v))
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced)
    return () => {
      alive = false
      sub.remove()
    }
  }, [])
  return reduced
}

type Dir = 'up' | 'down' | 'left' | 'right' | 'scale'

interface AppearProps {
  show?: boolean
  delay?: number
  dir?: Dir
  distance?: number
  duration?: number
  children: ReactNode
  style?: StyleProp<ViewStyle>
  innerRef?: React.Ref<View>
}

/** Aparece con fundido + desplazamiento (o zoom) cuando `show` pasa a true. */
export function Appear({ show = true, delay = 0, dir = 'up', distance = 28, duration = 750, children, style, innerRef }: AppearProps) {
  const reduced = useReducedMotion()
  const [p] = useState(() => new Animated.Value(0))

  useEffect(() => {
    if (!show) return
    if (reduced) {
      p.setValue(1)
      return
    }
    const anim = Animated.timing(p, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false })
    anim.start()
    return () => anim.stop()
  }, [show, reduced, delay, duration, p])

  const range = (from: number, to: number) => p.interpolate({ inputRange: [0, 1], outputRange: [from, to] })
  const transform =
    dir === 'up'
      ? [{ translateY: range(distance, 0) }]
      : dir === 'down'
        ? [{ translateY: range(-distance, 0) }]
        : dir === 'left'
          ? [{ translateX: range(-distance, 0) }]
          : dir === 'right'
            ? [{ translateX: range(distance, 0) }]
            : [{ scale: range(0.9, 1) }]

  return (
    <Animated.View ref={innerRef} style={[style, { opacity: p, transform }]}>
      {children}
    </Animated.View>
  )
}

interface IntersectionLike {
  observe(el: unknown): void
  disconnect(): void
}

type IntersectionCtor = new (cb: (e: { isIntersecting: boolean }[]) => void, o: object) => IntersectionLike

/** Se anima al entrar en pantalla al hacer scroll (en web). */
export function Reveal({ children, delay = 0, dir = 'up', distance, style }: Omit<AppearProps, 'show' | 'innerRef'>) {
  const ref = useRef<View>(null)
  const [shown, setShown] = useState(Platform.OS !== 'web')

  useEffect(() => {
    const IO = (globalThis as { IntersectionObserver?: IntersectionCtor }).IntersectionObserver
    if (Platform.OS !== 'web' || !IO || !ref.current) {
      setShown(true)
      return
    }
    const observer = new IO(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <ShownContext.Provider value={shown}>
      <Appear innerRef={ref} show={shown} delay={delay} dir={dir} distance={distance} style={style}>
        {children}
      </Appear>
    </ShownContext.Provider>
  )
}

/** Elemento dentro de un Reveal que aparece con zoom y retraso escalonado. */
export function Pop({ index = 0, step = 45, children }: { index?: number; step?: number; children: ReactNode }) {
  const shown = useContext(ShownContext)
  return (
    <Appear show={shown ?? true} dir="scale" delay={120 + index * step} duration={450}>
      {children}
    </Appear>
  )
}

/** Flota suavemente arriba y abajo, en bucle. */
export function Float({ children, amplitude = 8, duration = 3200, delay = 0, style }: { children: ReactNode; amplitude?: number; duration?: number; delay?: number; style?: StyleProp<ViewStyle> }) {
  const reduced = useReducedMotion()
  const [v] = useState(() => new Animated.Value(0))

  useEffect(() => {
    if (reduced) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration, delay, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [reduced, duration, delay, v])

  return <Animated.View style={[style, { transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] }) }] }]}>{children}</Animated.View>
}

/** Mancha de color difuminada que se desplaza despacio (fondos). */
export function Blob({ size, color, top, left, right, bottom, drift = 40, duration = 9000 }: { size: number; color: string; top?: number; left?: number | string; right?: number | string; bottom?: number; drift?: number; duration?: number }) {
  const reduced = useReducedMotion()
  const [v] = useState(() => new Animated.Value(0))

  useEffect(() => {
    if (reduced) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
        Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [reduced, duration, v])

  const blur = Platform.OS === 'web' ? ({ filter: 'blur(70px)' } as object) : null
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          top,
          left: left as number | undefined,
          right: right as number | undefined,
          bottom,
          transform: [
            { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [0, drift] }) },
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -drift * 0.7] }) },
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) },
          ],
        },
        blur,
      ]}
    />
  )
}

/** Devuelve un número que sube de 0 a `target` cuando `show` es true. */
export function useCountUp(target: number, show: boolean, duration = 1400) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!show) return
    if (reduced) return
    const v = new Animated.Value(0)
    const id = v.addListener(({ value }) => setN(Math.round(value)))
    const anim = Animated.timing(v, { toValue: target, duration, easing: Easing.out(Easing.cubic), useNativeDriver: false })
    anim.start()
    return () => {
      anim.stop()
      v.removeListener(id)
    }
  }, [show, reduced, target, duration])

  return reduced && show ? target : n
}

/** Anillo que se expande y desvanece (latido del punto de estado). */
export function Pulse({ color, size = 8 }: { color: string; size?: number }) {
  const reduced = useReducedMotion()
  const [v] = useState(() => new Animated.Value(0))

  useEffect(() => {
    if (reduced) return
    const loop = Animated.loop(Animated.timing(v, { toValue: 1, duration: 1800, easing: Easing.out(Easing.quad), useNativeDriver: false }))
    loop.start()
    return () => loop.stop()
  }, [reduced, v])

  return (
    <View style={{ width: size, height: size }}>
      <Animated.View
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: size,
          backgroundColor: color,
          opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0] }),
          transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 3.2] }) }],
        }}
      />
      <View style={{ width: size, height: size, borderRadius: size, backgroundColor: color }} />
    </View>
  )
}

/** Cursor parpadeante de la tarjeta de código. */
export function Blink({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [v] = useState(() => new Animated.Value(1))

  useEffect(() => {
    if (reduced) return
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 0, duration: 500, useNativeDriver: false }),
        Animated.timing(v, { toValue: 1, duration: 500, useNativeDriver: false }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [reduced, v])

  return <Animated.View style={{ opacity: v }}>{children}</Animated.View>
}
