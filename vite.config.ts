import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Rutas relativas para que funcione en GitHub Pages (usuario.github.io/portfolio/)
export default defineConfig({
  base: './',
  plugins: [react()],
})
