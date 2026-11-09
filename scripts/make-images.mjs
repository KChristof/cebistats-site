// Génère les images dérivées du logo : node scripts/make-images.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logo = readFileSync('public/logo-cb.svg');

// Icône carrée (apple-touch-icon, données structurées)
await sharp({ create: { width: 512, height: 512, channels: 4, background: '#ffffff' } })
  .composite([{ input: await sharp(logo, { density: 600 }).resize({ height: 420 }).png().toBuffer(), gravity: 'center' }])
  .png()
  .toFile('public/logo-cb.png');

// Image de partage (Open Graph) 1200 x 630
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#06223d"/>
  <rect x="0" y="0" width="460" height="630" fill="#ffffff"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="530" y="230" font-size="76" font-weight="800" fill="#ffffff">CEBI <tspan fill="#5fd0cb" font-weight="400">Stats</tspan></text>
    <text x="532" y="310" font-size="38" fill="#dbe6ef">Biostatistique, données</text>
    <text x="532" y="360" font-size="38" fill="#dbe6ef">et tableaux de bord en santé</text>
    <rect x="532" y="420" width="64" height="4" fill="#0e9a9a"/>
    <text x="532" y="478" font-size="28" fill="#9fb2c4">Abidjan · cebistats.com</text>
  </g>
</svg>`;
await sharp(Buffer.from(og))
  .composite([{ input: await sharp(logo, { density: 600 }).resize({ height: 380 }).png().toBuffer(), left: 62, top: 125 }])
  .png()
  .toFile('public/og-image.png');

console.log('ok');
