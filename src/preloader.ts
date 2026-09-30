/** Tiempo mínimo que se ve la pantalla de carga, para que la J alcance a dibujarse entera. */
const MIN_VISIBLE_MS = 2100

/**
 * Retira la pantalla de carga que `scripts/inject-preloader.js` mete en el HTML.
 * Resuelve en cuanto empieza la salida, para que las animaciones de entrada arranquen a la vez.
 * En desarrollo no existe, y resuelve al instante.
 */
export function hidePreloader(): Promise<void> {
  return new Promise((resolve) => {
    const el = typeof document === 'undefined' ? null : document.getElementById('preloader')
    if (!el) {
      resolve()
      return
    }
    const wait = Math.max(0, MIN_VISIBLE_MS - performance.now())
    setTimeout(() => {
      el.classList.add('is-hiding')
      resolve()
      setTimeout(() => el.remove(), 1100)
    }, wait)
  })
}
