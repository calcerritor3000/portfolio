/**
 * Después de `expo export`, inserta en dist/index.html la pantalla de carga (una J que se dibuja),
 * el favicon en SVG y las etiquetas para compartir el enlace. Así la pantalla de carga aparece al instante,
 * antes de que se descargue y arranque el JavaScript de la app.
 */
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'dist', 'index.html')
let html = fs.readFileSync(file, 'utf8')

if (html.includes('id="preloader"')) {
  console.log('La pantalla de carga ya estaba inyectada.')
  process.exit(0)
}

const J_PATH = 'M26 15H46M41 15V37C41 47 35.5 52 28 52C21.5 52 17.5 48.5 16 43'

const head = `
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:title" content="Jorge Calcerrada · Desarrollador" />
    <meta property="og:description" content="Proyectos, tecnologías y trayectoria de Jorge Calcerrada, desarrollador de aplicaciones multiplataforma." />
    <meta property="og:type" content="website" />
    <style>
      #preloader{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;background:#080c18;color:#e8eaf2;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;overflow:hidden;transition:opacity .7s ease,transform .9s cubic-bezier(.76,0,.24,1),visibility .9s}
      #preloader.is-hiding{opacity:0;transform:translateY(-6%) scale(1.04);visibility:hidden;pointer-events:none}
      #preloader .pl-glow{position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(91,91,240,.35),rgba(6,182,212,.12) 55%,transparent 70%);filter:blur(30px);animation:pl-breathe 3.2s ease-in-out infinite}
      #preloader .pl-mark{position:relative;width:132px;height:132px;display:grid;place-items:center}
      #preloader .pl-ring{position:absolute;inset:0;border-radius:32px;border:1.5px solid rgba(139,139,255,.35);background:rgba(16,22,42,.7);box-shadow:0 0 60px rgba(91,91,240,.35);animation:pl-ring .9s cubic-bezier(.2,.8,.2,1) both,pl-float 3.2s ease-in-out 1s infinite}
      #preloader .pl-spin{position:absolute;inset:-10px;border-radius:40px;background:conic-gradient(from 0deg,transparent 0 70%,#22d3ee 85%,#8b8bff 100%,transparent);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));animation:pl-rot 2.4s linear infinite;opacity:.9}
      #preloader svg{position:relative;width:78px;height:78px;overflow:visible;filter:drop-shadow(0 0 14px rgba(139,139,255,.75))}
      #preloader .pl-j{stroke-dasharray:1;stroke-dashoffset:1;animation:pl-draw 1.3s cubic-bezier(.65,0,.35,1) .35s forwards}
      #preloader .pl-name{font-size:13px;font-weight:600;letter-spacing:.42em;text-transform:uppercase;color:#9aa4bd;opacity:0;animation:pl-fade .8s ease 1s forwards;padding-left:.42em}
      #preloader .pl-bar{width:160px;height:3px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden;opacity:0;animation:pl-fade .6s ease .9s forwards}
      #preloader .pl-bar i{display:block;height:100%;width:40%;border-radius:3px;background:linear-gradient(90deg,#8b8bff,#22d3ee);animation:pl-slide 1.15s cubic-bezier(.6,0,.4,1) infinite}
      @keyframes pl-draw{to{stroke-dashoffset:0}}
      @keyframes pl-fade{to{opacity:1}}
      @keyframes pl-ring{from{opacity:0;transform:scale(.7) rotate(-12deg)}to{opacity:1;transform:none}}
      @keyframes pl-float{50%{transform:translateY(-6px)}}
      @keyframes pl-rot{to{transform:rotate(360deg)}}
      @keyframes pl-breathe{50%{transform:scale(1.15);opacity:.75}}
      @keyframes pl-slide{0%{transform:translateX(-110%)}100%{transform:translateX(260%)}}
      @media (prefers-reduced-motion:reduce){#preloader *{animation-duration:.01s!important;animation-iteration-count:1!important}}
    </style>
`

const body = `
    <div id="preloader" role="status" aria-label="Cargando">
      <div class="pl-glow"></div>
      <div class="pl-mark">
        <div class="pl-spin"></div>
        <div class="pl-ring"></div>
        <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="plg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#a5a5ff"/>
              <stop offset="1" stop-color="#22d3ee"/>
            </linearGradient>
          </defs>
          <path class="pl-j" pathLength="1" d="${J_PATH}" stroke="url(#plg)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="pl-name">Jorge Calcerrada</div>
      <div class="pl-bar"><i></i></div>
    </div>
`

html = html.replace('</head>', `${head}  </head>`).replace(/<body[^>]*>/, (m) => `${m}${body}`)
fs.writeFileSync(file, html)
console.log('Pantalla de carga y favicon inyectados en dist/index.html')
