/**
 * Estadísticas de visitas con GoatCounter (gratis, sin cookies y sin banner de consentimiento).
 * Se activa poniendo el código de tu cuenta en analytics.json → "goatcounter": "tu-codigo".
 * Inserta el contador en la web clásica (dist/index.html) y en el portafolio 3D (dist/3d/index.html).
 */
const fs = require('fs')
const path = require('path')

const { goatcounter } = require('../analytics.json')
if (!goatcounter) {
  console.log('Estadísticas desactivadas (sin código de GoatCounter en analytics.json).')
  process.exit(0)
}
if (!/^[a-z0-9-]+$/.test(goatcounter)) {
  console.error('El código de GoatCounter solo puede tener letras minúsculas, números y guiones.')
  process.exit(1)
}

const tag = `    <script data-goatcounter="https://${goatcounter}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>\n`
for (const rel of ['index.html', '3d/index.html']) {
  const file = path.join(__dirname, '..', 'dist', rel)
  if (!fs.existsSync(file)) continue
  let html = fs.readFileSync(file, 'utf8')
  if (html.includes('data-goatcounter')) continue
  html = html.replace('</head>', `${tag}  </head>`)
  fs.writeFileSync(file, html)
  console.log(`Estadísticas activadas en dist/${rel}`)
}
