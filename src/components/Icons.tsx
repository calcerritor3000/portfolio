import Svg, { Circle, Path, Rect } from 'react-native-svg'

interface IconProps {
  size?: number
  color: string
}

function Base({ size = 20, color, children }: IconProps & { children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </Svg>
  )
}

export const GitHubIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Base>
)

export const LinkedInIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <Rect x="2" y="9" width="4" height="12" />
    <Circle cx="4" cy="4" r="2" />
  </Base>
)

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <Rect x="2" y="4" width="20" height="16" rx="2" />
    <Path d="m22 7-10 6L2 7" />
  </Base>
)

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <Circle cx="12" cy="12" r="4" />
    <Path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
)

export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Base>
)

export const ArrowIcon = (p: IconProps) => (
  <Base size={16} {...p}>
    <Path d="M7 17 17 7M7 7h10v10" />
  </Base>
)

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M4 6h16M4 12h16M4 18h16" />
  </Base>
)

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M6 6l12 12M18 6 6 18" />
  </Base>
)
