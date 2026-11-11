// Génère les icônes du site à partir de public/logo-cb.svg : node scripts/make-favicons.mjs
// Google affiche dans ses résultats une icône carrée d'au moins 48 px : on fournit PNG 48, 96, 192
// et un favicon.ico (le fichier que les robots demandent par défaut).
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const logo = readFileSync('public/logo-cb.svg');

// Logo centré sur fond blanc, avec une marge pour rester lisible une fois rogné en cercle
const icon = async (size) => {
  const inner = Math.round(size * 0.78);
  const mark = await sharp(logo, { density: 1200 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toBuffer();
};

const sizes = { 'favicon-48.png': 48, 'favicon-96.png': 96, 'icon-192.png': 192 };
for (const [file, size] of Object.entries(sizes)) writeFileSync(`public/${file}`, await icon(size));

// favicon.ico : conteneur ICO contenant des images PNG (16, 32, 48)
const pngs = await Promise.all([16, 32, 48].map(async (s) => ({ s, buf: await icon(s) })));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const entries = pngs.map(({ s, buf }) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]));

console.log('icônes générées');
