import type { ImageSourcePropType } from 'react-native'

export const profile = {
  name: 'Jorge Calcerrada Sánchez-Mateos',
  shortName: 'Jorge Calcerrada',
  role: 'Desarrollador de Aplicaciones Multiplataforma',
  location: 'Paiporta, Valencia',
  availability: 'Disponible para incorporación inmediata',
  intro:
    'Técnico en Desarrollo de Aplicaciones con experiencia en programación, bases de datos y redes. Me motivan los proyectos tecnológicos, aprendo rápido y me importa el trabajo bien hecho. Busco crecer en una empresa donde pueda aportar y seguir desarrollándome.',
  cv: '/cv-jorge-calcerrada.pdf',
  email: 'calcerradasanchezjorge@gmail.com',
  github: 'https://github.com/calcerritor3000',
  linkedin: 'https://www.linkedin.com/in/jorge-calcerrada-s%C3%A1nchez-mateos-aa3570333/',
}

export interface Project {
  title: string
  tag: string
  period: string
  description: string
  highlights: string[]
  stack: string[]
  image?: ImageSourcePropType
  imageDark?: ImageSourcePropType
  repo?: string
  demo?: string
  note?: string
  demoLabel?: string
}

export const projects: Project[] = [
  {
    title: 'Mis tareas',
    tag: 'App móvil',
    period: '2026',
    description:
      'App para organizar el día a día: tareas, horario semanal y progreso en un solo sitio. Funciona en Android, iOS y web, y se instala en el iPhone como PWA.',
    highlights: [
      'Tarjeta "Ahora" con el bloque del horario en curso',
      'Tareas con prioridad, categoría y repetición',
      'Rachas, gráfico semanal y copia de seguridad en JSON',
      'Modo claro/oscuro y datos solo en el dispositivo',
    ],
    stack: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'AsyncStorage'],
    image: require('../../assets/projects/mis-tareas.jpg'),
    imageDark: require('../../assets/projects/mis-tareas-oscuro.jpg'),
    repo: 'https://github.com/calcerritor3000/gestor-tareas',
    demo: 'https://gestor-tareas.expo.app/',
    demoLabel: 'Probar en el navegador',
  },
  {
    title: 'QR para restaurantes',
    tag: 'SaaS · Proyecto personal',
    period: '2026',
    description:
      'SaaS B2B para restaurantes: el cliente escanea un QR en la mesa, ve su cuenta, la divide a partes iguales y paga al instante con Stripe.',
    highlights: [
      'Pago de la cuenta (o de su parte) con Stripe',
      'Filtro inteligente de reseñas: 4-5 estrellas a Google, 1-3 a un formulario interno',
      'PWA instalable y monorepo con npm workspaces',
      'API propia con base de datos SQLite local',
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'Stripe', 'PWA'],
    repo: 'https://github.com/calcerritor3000/App-QR',
    note: '🚧 Aún no desplegado: se ejecuta en local (guía en el README)',
  },
  {
    title: 'CVN Alertas',
    tag: 'TFG',
    period: '2025 — 2026',
    description:
      'Trabajo de Fin de Grado que centraliza alertas ciudadanas en la Comunidad Valenciana, con mapa interactivo, datos de DANA y meteorología, y panel de administración.',
    highlights: [
      'Mapa y listado de alertas en tiempo real',
      'Integración de datos DANA y meteorológicos',
      'Panel de administración con autenticación JWT',
      'PWA con notificaciones push',
    ],
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'PWA'],
    repo: 'https://github.com/calcerritor3000/TFG-Sistema-de-Gesti-n-de-Alertas---CVN-24-7-Noticias-Calce',
    demo: 'https://alertascvn.onrender.com/',
  },
  {
    title: 'Web de fichajes',
    tag: 'Prácticas · TiaTools',
    period: 'Nov 2025 — Feb 2026',
    description:
      'Aplicación web para registrar la jornada laboral de los empleados: fichaje de entradas y salidas, autenticación segura y panel de administración.',
    highlights: [
      'Autenticación con Firebase',
      'Registro de fichajes en tiempo real',
      'Panel de administración',
      'Interfaz responsive',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    note: '🔒 Código privado (proyecto de empresa)',
  },
]

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'Programación',
    items: ['TypeScript', 'JavaScript', 'Java', 'HTML', 'CSS avanzado', 'Python (básico)', 'pandas', 'React', 'React Native', 'Next.js', 'Node.js', 'Express'],
  },
  {
    group: 'Datos y backend',
    items: ['MySQL', 'SQL (JOINs, agregaciones)', 'Firebase', 'APIs REST', 'JWT', 'Palantir Foundry (autodidacta)'],
  },
  {
    group: 'Herramientas y sistemas',
    items: ['Git', 'GitHub', 'Visual Studio', 'Expo', 'Vite', 'Windows', 'Linux', 'Redes locales'],
  },
  {
    group: 'Diseño y gestión',
    items: ['Diseño UX/UI', 'Metodologías ágiles', 'Trello', 'Asana', 'WordPress', 'Elementor', 'Divi', 'Oxygen'],
  },
  {
    group: 'IA',
    items: ['Asistentes de IA para refactorizar y resolver problemas', 'Palantir AIP'],
  },
  {
    group: 'Competencias',
    items: ['Trabajo en equipo', 'Resolución de problemas', 'Aprendizaje rápido', 'Adaptabilidad', 'Independencia', 'Puntualidad y compromiso'],
  },
]

export interface TimelineItem {
  title: string
  place: string
  period: string
  text: string
}

export const experience: TimelineItem[] = [
  {
    title: 'Prácticas de Desarrollo (DAM)',
    place: 'TiaTools S.L. · Valencia',
    period: 'Nov 2025 — Feb 2026',
    text: 'Aplicación web completa de fichajes con Next.js, React, Firebase y TypeScript: base de datos, autenticación e interfaces responsive.',
  },
  {
    title: 'Prácticas de Desarrollo (DAM)',
    place: 'K2asoft · Valencia',
    period: 'Mar 2025 — Jun 2025',
    text: 'Desarrollo con Java y tecnologías web: diseño de interfaces, funcionalidades backend y pruebas.',
  },
  {
    title: 'Prácticas de Sistemas y Redes',
    place: 'K2asoft · Valencia',
    period: 'Mar 2024 — Jun 2024',
    text: 'Mantenimiento de sistemas y redes.',
  },
]

export const education: TimelineItem[] = [
  {
    title: 'Máster en Inteligencia Artificial',
    place: 'Big School · Online',
    period: 'Ago 2026 — Ene 2027 · en curso',
    text: 'Formación especializada en inteligencia artificial para ampliar mi perfil como desarrollador.',
  },
  {
    title: 'CFGS Desarrollo de Aplicaciones Multiplataforma',
    place: 'Ceac · Valencia',
    period: '2024 — 2026',
    text: 'TFG: CVN Alertas, sistema de alertas ciudadanas para la Comunidad Valenciana.',
  },
  {
    title: 'CFGM Sistemas Microinformáticos y Redes',
    place: 'Progresa · Valencia',
    period: 'Sep 2022 — Jun 2024',
    text: 'Informática, sistemas operativos y redes.',
  },
  {
    title: 'Idiomas',
    place: 'Castellano nativo · Inglés B1 (Trinity College London)',
    period: '2024',
    text: 'Certificación oficial de nivel intermedio en inglés.',
  },
]

export const stats = [
  { value: '4', label: 'proyectos completos' },
  { value: '3', label: 'prácticas en empresas' },
  { value: 'DAM', label: 'ciclo terminado en 2026' },
  { value: 'B1', label: 'inglés (Trinity)' },
]
