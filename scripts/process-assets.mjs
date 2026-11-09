import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "assets", "source");
const outImages = path.join(root, "public", "images");
const outBrand = path.join(root, "public", "brand");

await fs.mkdir(outImages, { recursive: true });
await fs.mkdir(outBrand, { recursive: true });

const log = (msg) => console.log(`  ${msg}`);

/* ------------------------------------------------------------------ */
/* Fotografias                                                         */
/* ------------------------------------------------------------------ */

const photos = [
  ["ambiente-wide.jpg", "ambiente", 2400],
  ["fogo-wide.jpg", "fogo", 2000],
  ["foto-01.jpg", "foto-01", 1800],
  ["foto-02.jpg", "foto-02", 1400],
  ["foto-03.jpg", "foto-03", 1800],
  ["foto-04.jpg", "foto-04", 1500],
  ["foto-05.jpg", "foto-05", 1400],
  ["foto-06.jpg", "foto-06", 1400],
];

console.log("Fotografias:");
for (const [file, name, width] of photos) {
  const input = path.join(source, file);
  const output = path.join(outImages, `${name}.webp`);
  const image = sharp(input).rotate();
  const meta = await image.metadata();
  const targetWidth = Math.min(width, meta.width ?? width);
  await image
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output);
  const outMeta = await sharp(output).metadata();
  log(`${name}.webp — ${outMeta.width}x${outMeta.height}`);
}

/* ------------------------------------------------------------------ */
/* Logo principal (wordmark)                                           */
/* ------------------------------------------------------------------ */

console.log("Logo:");
const wordmarkBuffer = await sharp(path.join(source, "logo-wordmark.png"))
  .trim({ threshold: 12 })
  .toBuffer();

const wordmarkMeta = await sharp(wordmarkBuffer).metadata();
log(`wordmark limpo — ${wordmarkMeta.width}x${wordmarkMeta.height}`);

await sharp(wordmarkBuffer)
  .resize({ width: 1600 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outBrand, "charbon-logo-light.png"));

await sharp(wordmarkBuffer)
  .resize({ width: 1600 })
  .tint({ r: 24, g: 21, b: 19 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outBrand, "charbon-logo-dark.png"));

// versão compacta: apenas a parte inferior do lockup (wordmark grande)
const compact = await sharp(wordmarkBuffer)
  .extract({
    left: 0,
    top: Math.round(wordmarkMeta.height * 0.28),
    width: wordmarkMeta.width,
    height: Math.round(wordmarkMeta.height * 0.72),
  })
  .trim({ threshold: 12 })
  .resize({ width: 1200 })
  .png({ compressionLevel: 9 })
  .toBuffer();
await sharp(compact).toFile(path.join(outBrand, "charbon-logo-compact.png"));

/* ------------------------------------------------------------------ */
/* Marca quadrada (favicon / app icon)                                 */
/* ------------------------------------------------------------------ */

const squareSrc = path.join(root, "assets", "logo.jpg");
const { data, info } = await sharp(squareSrc)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data.length);
for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  // remove o fundo branco mantendo as bordas suaves
  const alpha = Math.max(0, Math.min(255, Math.round(((238 - lum) / 58) * 255)));
  pixels[i] = r;
  pixels[i + 1] = g;
  pixels[i + 2] = b;
  pixels[i + 3] = alpha;
}

const markDarkBase = await sharp(pixels, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim({ threshold: 12 })
  .png()
  .toBuffer();

const markMeta = await sharp(markDarkBase).metadata();
log(`marca limpa — ${markMeta.width}x${markMeta.height}`);

await sharp(markDarkBase)
  .resize(640, 640, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outBrand, "charbon-mark-dark.png"));

await sharp(markDarkBase)
  .resize(640, 640, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .negate({ alpha: false })
  .tint({ r: 255, g: 255, b: 255 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outBrand, "charbon-mark-light.png"));

// ícone com fundo carvão
const markWhite = await sharp(markDarkBase)
  .resize(360, 360, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .negate({ alpha: false })
  .tint({ r: 247, g: 242, b: 233 })
  .png()
  .toBuffer();

const iconSvg = Buffer.from(
  `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="96" fill="#0B0A09"/>
    <rect x="8" y="8" width="496" height="496" rx="90" fill="none" stroke="#2A2420" stroke-width="2"/>
  </svg>`
);

const iconBuffer = await sharp(iconSvg)
  .composite([{ input: markWhite, gravity: "center" }])
  .png()
  .toBuffer();

await sharp(iconBuffer).toFile(path.join(root, "app", "icon.png"));
await sharp(iconBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "app", "apple-icon.png"));

/* ------------------------------------------------------------------ */
/* Open Graph                                                          */
/* ------------------------------------------------------------------ */

const ogBackground = await sharp(path.join(source, "fogo-wide.jpg"))
  .resize(1200, 630, { fit: "cover" })
  .modulate({ brightness: 0.28, saturation: 0.7 })
  .toBuffer();

const ogOverlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0B0A09" stop-opacity="0.55"/>
        <stop offset="1" stop-color="#0B0A09" stop-opacity="0.95"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="1040" cy="520" r="240" fill="#E4572E" opacity="0.13"/>
    <text x="72" y="470" fill="#F3EDE3" font-family="Georgia, serif" font-size="44">Primitivo no fogo,</text>
    <text x="72" y="524" fill="#F3EDE3" font-family="Georgia, serif" font-size="44" font-style="italic">contemporâneo no sabor.</text>
    <text x="74" y="584" fill="#C97B3A" font-family="Helvetica, Arial, sans-serif" font-size="20" letter-spacing="4">PERDIZES · SÃO PAULO</text>
  </svg>`
).toString();

const wordmarkSmall = await sharp(wordmarkBuffer)
  .resize({ width: 560 })
  .png()
  .toBuffer();

await sharp(ogBackground)
  .composite([
    { input: Buffer.from(ogOverlay), gravity: "center" },
    { input: wordmarkSmall, top: 70, left: 72 },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(root, "app", "opengraph-image.jpg"));

console.log("Pronto.");
