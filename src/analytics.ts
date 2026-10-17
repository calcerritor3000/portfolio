import { Platform } from 'react-native'

interface GoatCounter {
  count?: (vars: { path: string; title?: string; event?: boolean }) => void
}

/**
 * Registra un evento (clic en "Descargar CV", en una demo, etc.) en GoatCounter.
 * Si las estadísticas no están activadas (sin código en analytics.json) no hace nada.
 */
export function track(name: string) {
  if (Platform.OS !== 'web') return
  const gc = (window as unknown as { goatcounter?: GoatCounter }).goatcounter
  gc?.count?.({ path: name, title: name, event: true })
}
