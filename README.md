# Portfolio · Jorge Calcerrada 👨‍💻

Mi web personal: quién soy, qué proyectos he hecho y cómo contactarme.
Es una página de una sola vista, **responsive** y con **modo oscuro**, hecha con **Expo (React Native para web) + TypeScript**
y publicada gratis con **EAS Hosting**.

👉 **[Ver el portfolio](https://jorge-calcerrada.expo.app/)**, sin instalar nada.
📱 Demo de mi app *Mis tareas*: https://gestor-tareas.expo.app/

<p align="center">
  <img src="docs/screenshots/escritorio.jpg" width="640" alt="Portfolio en escritorio" />
</p>

<p align="center">
  <img src="docs/screenshots/movil.jpg" width="220" alt="Portfolio en móvil" />
  <img src="docs/screenshots/oscuro.jpg" width="420" alt="Portfolio en modo oscuro" />
</p>

## ✨ Funcionalidades

- **Presentación**: hero con tarjeta de código, cifras clave y enlaces a GitHub, LinkedIn y email.
- **Proyectos**: tarjetas con descripción, puntos clave, tecnologías y enlaces a código y demo.
  El proyecto destacado (*Mis tareas*) ocupa todo el ancho y se muestra en maquetas de móvil, en claro y en oscuro.
- **Tecnologías** agrupadas por tipo.
- **Trayectoria**: experiencia y formación en forma de línea de tiempo.
- **Contacto** directo por email, LinkedIn o GitHub.
- **Modo claro y oscuro**: sigue la preferencia del sistema y recuerda la elección del usuario.
- **Responsive** de móvil a escritorio, con menú hamburguesa y sin scroll horizontal.
- **Detalles**: animaciones al hacer scroll (respetan `prefers-reduced-motion`) y navegación que resalta la sección visible.

<p align="center">
  <img src="docs/screenshots/proyectos.jpg" width="640" alt="Sección de proyectos" />
</p>

## 🛠️ Tecnologías

| | |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 57 · React Native 0.86 · React 19 |
| Lenguaje | TypeScript (modo estricto) |
| Web | react-native-web, exportación estática con `expo export` |
| Estilos | `StyleSheet` y tema propio (sin librerías de UI) |
| Extras | expo-linear-gradient, react-native-svg, Inter (Google Fonts) |
| Calidad | ESLint (eslint-config-expo) + `tsc --noEmit` |
| Despliegue | EAS Hosting → `*.expo.app` |

## 🧩 Decisiones técnicas

- **Contenido separado del diseño**: todos los textos, proyectos y tecnologías viven en `src/data/profile.ts`.
  Añadir un proyecto nuevo es añadir un objeto a una lista, sin tocar componentes.
- **Tema con variables CSS**: los colores se definen una vez en `:root` y se redefinen con `[data-theme='dark']`.
  Un pequeño script en `index.html` aplica el tema antes de pintar la página para evitar el parpadeo.
- **Mismo stack que mis apps**: el portfolio usa Expo y React Native, igual que *Mis tareas*, así que el mismo código de interfaz podría reutilizarse en móvil.
- **Tema propio**: un `ThemeProvider` con paletas clara y oscura; sigue al sistema y recuerda la elección en `localStorage`.
- **Iconos SVG propios** con `react-native-svg`, para no cargar librerías de iconos.
- **Animaciones ligeras**: los bloques aparecen al entrar en pantalla con `IntersectionObserver` + `Animated`, sin librerías.
- **Despliegue con un comando**: `npm run deploy` exporta la web y la publica con EAS Hosting.

## 📁 Estructura

```
├── docs/screenshots/              # Capturas para este README
├── assets/                        # Favicon e imágenes de proyectos
└── src/
    ├── components/                # Header, Hero, Projects, Skills, Journey, Contact, ui…
    ├── data/profile.ts            # Datos personales, proyectos, tecnologías y trayectoria
    ├── theme.tsx                  # Paletas, modo claro/oscuro y tamaños de pantalla
    └── App.tsx                    # Composición de la página y navegación
```

## 🚀 Cómo ejecutarlo

Necesitas [Node.js](https://nodejs.org) 20 o superior.

```bash
git clone https://github.com/calcerritor3000/portfolio.git
cd portfolio
npm install
npm start            # abre la web en http://localhost:8081
```

Otros comandos:

```bash
npm run lint         # ESLint
npm run typecheck    # comprobación de tipos
npm run build        # exporta la web a dist/
npm run deploy       # exporta y publica en EAS Hosting (requiere npx eas-cli login)
```

## 📄 Licencia

[MIT](LICENSE) © calcerritor3000
