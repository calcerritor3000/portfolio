import type { ImageSourcePropType } from 'react-native'

export type Lang = 'es' | 'en'

// ---------- Datos que no cambian con el idioma ----------
export const links = {
  name: 'Jorge Calcerrada Sánchez-Mateos',
  shortName: 'Jorge Calcerrada',
  location: 'Paiporta, Valencia',
  cv: '/cv-jorge-calcerrada.pdf',
  email: 'calcerradasanchezjorge@gmail.com',
  github: 'https://github.com/calcerritor3000',
  linkedin: 'https://www.linkedin.com/in/jorge-calcerrada-s%C3%A1nchez-mateos-aa3570333/',
  photo: require('../../assets/jorge.jpg') as ImageSourcePropType,
}

export interface Project {
  id: string
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
  video?: string
  poster?: string
}

export interface TimelineItem {
  title: string
  place: string
  period: string
  text: string
}

export interface Content {
  profile: { role: string; availability: string; intro: string }
  nav: { id: string; label: string }[]
  ui: {
    explore3d: string
    portfolio3d: string
    seeProjects: string
    downloadCv: string
    writeMe: string
    lightMode: string
    darkMode: string
    openMenu: string
    photoAlt: string
    seeDemo: string
    seeCode: string
    langSwitch: string
  }
  hero: { title: string[]; accentIndex: number; breakBefore: number }
  stats: { value: string; label: string }[]
  about: { eyebrow: string; title: string; paragraphs: string[]; facts: { emoji: string; label: string; value: string }[] }
  spotlight: {
    badge: string
    kicker: string
    tagline: string
    text: string
    features: string[]
    cta: string
    videoLabel: string
  }
  projectsSection: { eyebrow: string; title: string; subtitle: string }
  projects: Project[]
  skillsSection: { eyebrow: string; title: string; subtitle: string }
  skills: { group: string; items: string[] }[]
  journeySection: { eyebrow: string; title: string; experience: string; education: string }
  experience: TimelineItem[]
  education: TimelineItem[]
  contact: {
    title: string
    text: string
    form: { name: string; email: string; message: string; send: string; sent: string; hint: string; errors: { name: string; email: string; message: string } }
    subject: string
  }
  footer: string
}

const TASKORIT_MEDIA = {
  image: require('../../assets/projects/mis-tareas.jpg') as ImageSourcePropType,
  imageDark: require('../../assets/projects/mis-tareas-oscuro.jpg') as ImageSourcePropType,
  repo: 'https://github.com/calcerritor3000/gestor-tareas',
  demo: 'https://gestor-tareas.expo.app/',
  video: '/taskorit-anuncio.mp4',
  poster: '/taskorit-poster.jpg',
}

const TECH = {
  taskorit: ['React Native', 'Expo', 'TypeScript', 'Expo Router', 'AsyncStorage'],
  qr: ['React', 'Vite', 'Node.js', 'Express', 'SQLite', 'Stripe', 'PWA'],
  cvn: ['React', 'Node.js', 'Express', 'MySQL', 'JWT', 'PWA'],
  fichajes: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
}

const REPOS = {
  qr: 'https://github.com/calcerritor3000/App-QR',
  cvn: 'https://github.com/calcerritor3000/TFG-Sistema-de-Gesti-n-de-Alertas---CVN-24-7-Noticias-Calce',
}

// ---------- Español ----------
const es: Content = {
  profile: {
    role: 'Desarrollador de Aplicaciones Multiplataforma',
    availability: 'Disponible para incorporación inmediata',
    intro:
      'Técnico en Desarrollo de Aplicaciones con experiencia en programación, bases de datos y redes. Me motivan los proyectos tecnológicos, aprendo rápido y me importa el trabajo bien hecho. Busco crecer en una empresa donde pueda aportar y seguir desarrollándome.',
  },
  nav: [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'taskorit', label: 'Taskorit' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'tecnologias', label: 'Tecnologías' },
    { id: 'trayectoria', label: 'Trayectoria' },
    { id: 'contacto', label: 'Contacto' },
  ],
  ui: {
    explore3d: '🧊 Explorar en 3D',
    portfolio3d: '🧊 Portafolio 3D',
    seeProjects: 'Ver proyectos',
    downloadCv: 'Descargar CV',
    writeMe: 'Escríbeme',
    lightMode: 'Activar modo claro',
    darkMode: 'Activar modo oscuro',
    openMenu: 'Abrir menú',
    photoAlt: 'Foto de Jorge Calcerrada',
    seeDemo: 'Ver demo',
    seeCode: 'Ver código',
    langSwitch: 'View in English',
  },
  hero: { title: ['Hola,', 'soy', 'Jorge.', 'Creo', 'software', 'que', 'funciona.'], accentIndex: 2, breakBefore: 3 },
  stats: [
    { value: '4', label: 'proyectos completos' },
    { value: '3', label: 'prácticas en empresas' },
    { value: 'DAM', label: 'ciclo terminado en 2026' },
    { value: 'B1', label: 'inglés (Trinity)' },
  ],
  about: {
    eyebrow: 'Sobre mí',
    title: 'Un poco más de mí',
    paragraphs: [
      'Empecé en la informática por los sistemas y las redes (grado medio en SMR) y ahí descubrí que lo que de verdad me gustaba era crear cosas. Por eso hice el ciclo superior de DAM, y desde entonces no he parado de programar.',
      'En mis prácticas en K2asoft y TiaTools trabajé en proyectos reales: desde Java y tecnologías web hasta una aplicación completa de fichajes con Next.js y Firebase. En paralelo hice mi TFG, CVN Alertas, y mis propias apps como Taskorit.',
      'Ahora estoy haciendo un máster en Inteligencia Artificial y busco mi primer puesto como desarrollador, en un equipo donde pueda aportar desde el primer día, aprender de gente con experiencia y seguir creciendo.',
    ],
    facts: [
      { emoji: '📍', label: 'Ubicación', value: 'Paiporta, Valencia' },
      { emoji: '🎓', label: 'Formación', value: 'DAM · Máster en IA (en curso)' },
      { emoji: '💼', label: 'Busco', value: 'Primer puesto como desarrollador' },
      { emoji: '🗣️', label: 'Idiomas', value: 'Castellano nativo · Inglés B1' },
      { emoji: '🤝', label: 'Me definen', value: 'Organizado, puntual y con ganas de aprender' },
    ],
  },
  spotlight: {
    badge: '✨ Nuevo',
    kicker: 'Mi app destacada',
    tagline: 'Tu día organizado, de un vistazo.',
    text: 'Tareas, horario semanal y rachas en una sola app. Funciona en Android, iOS y web, se instala como PWA y tus datos se quedan en tu dispositivo.',
    features: ['Tareas inteligentes', 'Horario semanal', 'Rachas 🔥', 'Modo oscuro', 'Sin cuentas'],
    cta: 'Probar Taskorit gratis',
    videoLabel: 'Anuncio de Taskorit',
  },
  projectsSection: {
    eyebrow: 'Proyectos',
    title: 'Cosas que he construido',
    subtitle: 'Desde una app móvil propia hasta un TFG con mapa en tiempo real.',
  },
  projects: [
    {
      id: 'taskorit',
      title: 'Taskorit',
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
      stack: TECH.taskorit,
      demoLabel: 'Probar en el navegador',
      ...TASKORIT_MEDIA,
    },
    {
      id: 'qr',
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
      stack: TECH.qr,
      repo: REPOS.qr,
      note: '🚧 Aún no desplegado: se ejecuta en local (guía en el README)',
    },
    {
      id: 'cvn',
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
      stack: TECH.cvn,
      repo: REPOS.cvn,
    },
    {
      id: 'fichajes',
      title: 'Web de fichajes',
      tag: 'Prácticas · TiaTools',
      period: 'Nov 2025 — Feb 2026',
      description:
        'Aplicación web para registrar la jornada laboral de los empleados: fichaje de entradas y salidas, autenticación segura y panel de administración.',
      highlights: ['Autenticación con Firebase', 'Registro de fichajes en tiempo real', 'Panel de administración', 'Interfaz responsive'],
      stack: TECH.fichajes,
      note: '🔒 Código privado (proyecto de empresa)',
    },
  ],
  skillsSection: {
    eyebrow: 'Tecnologías',
    title: 'Mi caja de herramientas',
    subtitle: 'Con lo que trabajo habitualmente y lo que estoy aprendiendo.',
  },
  skills: [
    {
      group: 'Programación',
      items: ['TypeScript', 'JavaScript', 'Java', 'HTML', 'CSS avanzado', 'Python (básico)', 'pandas', 'React', 'React Native', 'Next.js', 'Node.js', 'Express'],
    },
    { group: 'Datos y backend', items: ['MySQL', 'SQL (JOINs, agregaciones)', 'Firebase', 'APIs REST', 'JWT', 'Palantir Foundry (autodidacta)'] },
    { group: 'Herramientas y sistemas', items: ['Git', 'GitHub', 'Visual Studio', 'Expo', 'Vite', 'Windows', 'Linux', 'Redes locales'] },
    { group: 'Diseño y gestión', items: ['Diseño UX/UI', 'Metodologías ágiles', 'Trello', 'Asana', 'WordPress', 'Elementor', 'Divi', 'Oxygen'] },
    {
      group: 'Inteligencia artificial',
      items: [
        'IA generativa y LLMs',
        'Ingeniería de prompts',
        'RAG (búsqueda aumentada)',
        'Agentes de IA',
        'MCP (Model Context Protocol)',
        'Ollama y modelos en local',
        'Datos para entrenar y evaluar modelos',
        'Palantir AIP',
        'Asistentes de IA en el desarrollo',
      ],
    },
    { group: 'Competencias', items: ['Trabajo en equipo', 'Resolución de problemas', 'Aprendizaje rápido', 'Adaptabilidad', 'Independencia', 'Puntualidad y compromiso'] },
  ],
  journeySection: { eyebrow: 'Trayectoria', title: 'Experiencia y formación', experience: 'Experiencia', education: 'Formación' },
  experience: [
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
    { title: 'Prácticas de Sistemas y Redes', place: 'K2asoft · Valencia', period: 'Mar 2024 — Jun 2024', text: 'Mantenimiento de sistemas y redes.' },
  ],
  education: [
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
    { title: 'CFGM Sistemas Microinformáticos y Redes', place: 'Progresa · Valencia', period: 'Sep 2022 — Jun 2024', text: 'Informática, sistemas operativos y redes.' },
    { title: 'Idiomas', place: 'Castellano nativo · Inglés B1 (Trinity College London)', period: '2024', text: 'Certificación oficial de nivel intermedio en inglés.' },
  ],
  contact: {
    title: '¿Trabajamos juntos?',
    text: 'Busco mi primera oportunidad como desarrollador. Si tienes una propuesta o solo quieres charlar, escríbeme.',
    form: {
      name: 'Tu nombre',
      email: 'Tu email',
      message: 'Cuéntame en qué puedo ayudarte',
      send: 'Enviar mensaje',
      sent: '¡Listo! Se ha abierto tu correo con el mensaje preparado.',
      hint: 'Al enviar se abre tu aplicación de correo con el mensaje ya escrito.',
      errors: { name: 'Escribe tu nombre', email: 'Escribe un email válido', message: 'Escribe un mensaje' },
    },
    subject: 'Contacto desde tu portfolio',
  },
  footer: 'Hecho con Expo, React Native y TypeScript',
}

// ---------- English ----------
const en: Content = {
  profile: {
    role: 'Cross-Platform Application Developer',
    availability: 'Available to start immediately',
    intro:
      'Application development technician with experience in programming, databases and networking. I love tech projects, I learn fast and I care about doing things well. I am looking to grow in a company where I can contribute and keep improving.',
  },
  nav: [
    { id: 'sobre-mi', label: 'About' },
    { id: 'taskorit', label: 'Taskorit' },
    { id: 'proyectos', label: 'Projects' },
    { id: 'tecnologias', label: 'Skills' },
    { id: 'trayectoria', label: 'Experience' },
    { id: 'contacto', label: 'Contact' },
  ],
  ui: {
    explore3d: '🧊 Explore in 3D',
    portfolio3d: '🧊 3D Portfolio',
    seeProjects: 'See projects',
    downloadCv: 'Download CV',
    writeMe: 'Email me',
    lightMode: 'Switch to light mode',
    darkMode: 'Switch to dark mode',
    openMenu: 'Open menu',
    photoAlt: 'Photo of Jorge Calcerrada',
    seeDemo: 'Live demo',
    seeCode: 'View code',
    langSwitch: 'Ver en español',
  },
  hero: { title: ["Hi,", "I'm", 'Jorge.', 'I', 'build', 'software', 'that', 'works.'], accentIndex: 2, breakBefore: 3 },
  stats: [
    { value: '4', label: 'finished projects' },
    { value: '3', label: 'company internships' },
    { value: 'DAM', label: 'degree completed in 2026' },
    { value: 'B1', label: 'English (Trinity)' },
  ],
  about: {
    eyebrow: 'About me',
    title: 'A bit more about me',
    paragraphs: [
      'I got into IT through systems and networking (a vocational degree in SMR), and that is where I found out that what I really enjoy is building things. So I studied Cross-Platform Application Development (DAM), and I have been coding ever since.',
      'During my internships at K2asoft and TiaTools I worked on real projects: from Java and web technologies to a full time-tracking web app built with Next.js and Firebase. At the same time I built my final degree project, CVN Alertas, and my own apps such as Taskorit.',
      'I am now studying a Master’s in Artificial Intelligence and looking for my first developer role, in a team where I can contribute from day one, learn from experienced people and keep growing.',
    ],
    facts: [
      { emoji: '📍', label: 'Location', value: 'Paiporta, Valencia (Spain)' },
      { emoji: '🎓', label: 'Education', value: 'DAM degree · AI Master (in progress)' },
      { emoji: '💼', label: 'Looking for', value: 'My first developer role' },
      { emoji: '🗣️', label: 'Languages', value: 'Spanish (native) · English B1' },
      { emoji: '🤝', label: 'People say I am', value: 'Organised, punctual and eager to learn' },
    ],
  },
  spotlight: {
    badge: '✨ New',
    kicker: 'My featured app',
    tagline: 'Your day, organised at a glance.',
    text: 'Tasks, weekly schedule and streaks in a single app. It runs on Android, iOS and the web, installs as a PWA and your data stays on your device.',
    features: ['Smart tasks', 'Weekly schedule', 'Streaks 🔥', 'Dark mode', 'No sign-up'],
    cta: 'Try Taskorit for free',
    videoLabel: 'Taskorit promo video',
  },
  projectsSection: {
    eyebrow: 'Projects',
    title: 'Things I have built',
    subtitle: 'From my own mobile app to a final degree project with a real-time map.',
  },
  projects: [
    {
      id: 'taskorit',
      title: 'Taskorit',
      tag: 'Mobile app',
      period: '2026',
      description:
        'An app to organise your day: tasks, weekly schedule and progress in one place. It runs on Android, iOS and the web, and installs on the iPhone as a PWA.',
      highlights: [
        '"Now" card showing the current block of your schedule',
        'Tasks with priority, category and repetition',
        'Streaks, weekly chart and JSON backup',
        'Light/dark mode and data stored only on the device',
      ],
      stack: TECH.taskorit,
      demoLabel: 'Try it in the browser',
      ...TASKORIT_MEDIA,
    },
    {
      id: 'qr',
      title: 'QR for restaurants',
      tag: 'SaaS · Side project',
      period: '2026',
      description:
        'B2B SaaS for restaurants: customers scan a QR code on the table, see their bill, split it evenly and pay instantly with Stripe.',
      highlights: [
        'Pay the bill (or your share) with Stripe',
        'Smart review filter: 4-5 stars go to Google, 1-3 to an internal form',
        'Installable PWA and monorepo with npm workspaces',
        'Own API with a local SQLite database',
      ],
      stack: TECH.qr,
      repo: REPOS.qr,
      note: '🚧 Not deployed yet: runs locally (guide in the README)',
    },
    {
      id: 'cvn',
      title: 'CVN Alertas',
      tag: 'Final degree project',
      period: '2025 — 2026',
      description:
        'Final degree project that brings together citizen alerts in the Valencian Community, with an interactive map, DANA and weather data, and an admin panel.',
      highlights: ['Real-time map and list of alerts', 'DANA and weather data integration', 'Admin panel with JWT authentication', 'PWA with push notifications'],
      stack: TECH.cvn,
      repo: REPOS.cvn,
    },
    {
      id: 'fichajes',
      title: 'Time-tracking web app',
      tag: 'Internship · TiaTools',
      period: 'Nov 2025 — Feb 2026',
      description: 'Web app to record employees’ working hours: clock in and out, secure authentication and an admin panel.',
      highlights: ['Firebase authentication', 'Real-time clock-in records', 'Admin panel', 'Responsive interface'],
      stack: TECH.fichajes,
      note: '🔒 Private code (company project)',
    },
  ],
  skillsSection: { eyebrow: 'Skills', title: 'My toolbox', subtitle: 'What I use day to day and what I am learning.' },
  skills: [
    {
      group: 'Programming',
      items: ['TypeScript', 'JavaScript', 'Java', 'HTML', 'Advanced CSS', 'Python (basic)', 'pandas', 'React', 'React Native', 'Next.js', 'Node.js', 'Express'],
    },
    { group: 'Data & backend', items: ['MySQL', 'SQL (JOINs, aggregations)', 'Firebase', 'REST APIs', 'JWT', 'Palantir Foundry (self-taught)'] },
    { group: 'Tools & systems', items: ['Git', 'GitHub', 'Visual Studio', 'Expo', 'Vite', 'Windows', 'Linux', 'Local networks'] },
    { group: 'Design & management', items: ['UX/UI design', 'Agile methodologies', 'Trello', 'Asana', 'WordPress', 'Elementor', 'Divi', 'Oxygen'] },
    {
      group: 'Artificial intelligence',
      items: [
        'Generative AI and LLMs',
        'Prompt engineering',
        'RAG (retrieval-augmented generation)',
        'AI agents',
        'MCP (Model Context Protocol)',
        'Ollama and local models',
        'Data to train and evaluate models',
        'Palantir AIP',
        'AI assistants for development',
      ],
    },
    { group: 'Soft skills', items: ['Teamwork', 'Problem solving', 'Fast learner', 'Adaptability', 'Independence', 'Punctuality and commitment'] },
  ],
  journeySection: { eyebrow: 'Experience', title: 'Experience and education', experience: 'Experience', education: 'Education' },
  experience: [
    {
      title: 'Software Development Intern (DAM)',
      place: 'TiaTools S.L. · Valencia',
      period: 'Nov 2025 — Feb 2026',
      text: 'Full time-tracking web app with Next.js, React, Firebase and TypeScript: database, authentication and responsive interfaces.',
    },
    {
      title: 'Software Development Intern (DAM)',
      place: 'K2asoft · Valencia',
      period: 'Mar 2025 — Jun 2025',
      text: 'Development with Java and web technologies: interface design, backend features and testing.',
    },
    { title: 'Systems and Networks Intern', place: 'K2asoft · Valencia', period: 'Mar 2024 — Jun 2024', text: 'Systems and network maintenance.' },
  ],
  education: [
    {
      title: 'Master’s in Artificial Intelligence',
      place: 'Big School · Online',
      period: 'Aug 2026 — Jan 2027 · in progress',
      text: 'Specialised training in artificial intelligence to broaden my profile as a developer.',
    },
    {
      title: 'Higher Degree in Cross-Platform Application Development (DAM)',
      place: 'Ceac · Valencia',
      period: '2024 — 2026',
      text: 'Final project: CVN Alertas, a citizen alert system for the Valencian Community.',
    },
    { title: 'Vocational Degree in Microcomputer Systems and Networks', place: 'Progresa · Valencia', period: 'Sep 2022 — Jun 2024', text: 'IT, operating systems and networking.' },
    { title: 'Languages', place: 'Spanish (native) · English B1 (Trinity College London)', period: '2024', text: 'Official intermediate-level English certificate.' },
  ],
  contact: {
    title: 'Shall we work together?',
    text: 'I am looking for my first opportunity as a developer. If you have an offer or just want to chat, drop me a line.',
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'Tell me how I can help',
      send: 'Send message',
      sent: 'Done! Your email app has opened with the message ready to send.',
      hint: 'Sending opens your email app with the message already written.',
      errors: { name: 'Please enter your name', email: 'Please enter a valid email', message: 'Please write a message' },
    },
    subject: 'Message from your portfolio',
  },
  footer: 'Built with Expo, React Native and TypeScript',
}

export const content: Record<Lang, Content> = { es, en }
