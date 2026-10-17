import { useState } from 'react'
import { StyleSheet, TextInput, View, type LayoutChangeEvent } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Blob } from '../anim'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import { Button, Container, openUrl, Reveal, Txt } from './ui'
import { links } from '../data/content'
import { useLang } from '../i18n'
import { font, useLayout } from '../theme'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Formulario sin servidor: valida los campos y abre la app de correo del visitante
 * con el mensaje ya escrito (mailto). Así no hace falta backend ni servicios de terceros.
 */
function ContactForm() {
  const { t } = useLang()
  const f = t.contact.form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({})
  const [sent, setSent] = useState(false)

  const submit = () => {
    const next: typeof errors = {}
    if (!name.trim()) next.name = f.errors.name
    if (!EMAIL_RE.test(email.trim())) next.email = f.errors.email
    if (!message.trim()) next.message = f.errors.message
    setErrors(next)
    if (Object.keys(next).length) return
    const body = `${message.trim()}\n\n— ${name.trim()} (${email.trim()})`
    openUrl(`mailto:${links.email}?subject=${encodeURIComponent(`${t.contact.subject}: ${name.trim()}`)}&body=${encodeURIComponent(body)}`)
    setSent(true)
  }

  const field = (value: string, onChange: (v: string) => void, placeholder: string, error?: string, props?: object, style?: object) => (
    <View style={{ gap: 4 }}>
      <TextInput
        value={value}
        onChangeText={(v) => {
          onChange(v)
          setSent(false)
        }}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.6)"
        accessibilityLabel={placeholder}
        style={[styles.input, error && styles.inputError, style]}
        {...props}
      />
      {error && (
        <Txt size={12.5} color="#fecaca">
          {error}
        </Txt>
      )}
    </View>
  )

  return (
    <View style={styles.form}>
      <View style={styles.row}>
        <View style={{ flex: 1, minWidth: 200 }}>{field(name, setName, f.name, errors.name, { autoComplete: 'name' })}</View>
        <View style={{ flex: 1, minWidth: 200 }}>
          {field(email, setEmail, f.email, errors.email, { autoComplete: 'email', keyboardType: 'email-address', autoCapitalize: 'none' })}
        </View>
      </View>
      {field(message, setMessage, f.message, errors.message, { multiline: true, numberOfLines: 4 }, { height: 120, textAlignVertical: 'top' })}
      <View style={{ alignItems: 'flex-start', gap: 8 }}>
        <Button variant="light" label={f.send} icon={<MailIcon size={18} color="#1e1b4b" />} onPress={submit} />
        <Txt size={12.5} color="rgba(255,255,255,0.75)">
          {sent ? f.sent : f.hint}
        </Txt>
      </View>
    </View>
  )
}

export function Contact({ onLayout }: { onLayout: (id: string, e: LayoutChangeEvent) => void }) {
  const { t } = useLang()
  const { isMobile } = useLayout()
  return (
    <View onLayout={(e) => onLayout('contacto', e)}>
      <Container style={{ paddingTop: isMobile ? 56 : 80 }}>
        <Reveal dir="scale">
          <LinearGradient colors={['#3b3bd6', '#5b5bf0', '#2563eb']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.box, { padding: isMobile ? 22 : 48 }]}>
            <Blob size={300} color="rgba(34,211,238,0.45)" top={-90} right={-60} drift={40} />
            <Blob size={260} color="rgba(167,139,250,0.4)" bottom={-90} left={-60} drift={36} duration={11000} />
            <Txt size={isMobile ? 28 : 40} weight="extrabold" color="#fff" style={{ textAlign: 'center', letterSpacing: -1, lineHeight: isMobile ? 34 : 46 }}>
              {t.contact.title}
            </Txt>
            <Txt color="rgba(255,255,255,0.85)" style={{ textAlign: 'center', maxWidth: 520, marginTop: 8 }}>
              {t.contact.text}
            </Txt>
            <ContactForm />
            <View style={styles.actions}>
              <Button variant="ghost" label={links.email} icon={<MailIcon size={18} color="#fff" />} onPress={() => openUrl(`mailto:${links.email}`)} />
              <Button variant="ghost" label="LinkedIn" icon={<LinkedInIcon size={18} color="#fff" />} onPress={() => openUrl(links.linkedin)} />
              <Button variant="ghost" label="GitHub" icon={<GitHubIcon size={18} color="#fff" />} onPress={() => openUrl(links.github)} />
            </View>
          </LinearGradient>
        </Reveal>
      </Container>
      <Container style={{ paddingVertical: 40 }}>
        <Txt size={13.5} muted style={{ textAlign: 'center' }}>
          © {new Date().getFullYear()} {links.name} · {t.footer}
        </Txt>
      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  box: { borderRadius: 28, alignItems: 'center', overflow: 'hidden' },
  form: { width: '100%', maxWidth: 620, gap: 12, marginTop: 28 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#fff',
    fontFamily: font.regular,
    fontSize: 15,
  },
  inputError: { borderColor: '#fca5a5' },
  actions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 28 },
})
