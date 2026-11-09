import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "assets", "source");
const outBrand = path.join(root, "public", "brand");

const wordmark = await sharp(path.join(source, "logo-wordmark.png"))
  .trim({ threshold: 12 })
  .toBuffer();

const meta = await sharp(wordmark).metadata();
const width = meta.width;
const height = meta.height;

// isola o "C" inicial de CHARBON no lockup oficial
const monogram = await sharp(wordmark)
  .extract({
    left: 0,
    top: Math.round(height * 0.38),
    width: Math.round(width * 0.14),
    height: Math.round(height * 0.62),
  })
  .trim({ threshold: 12 })
  .png()
  .toBuffer();

const monoMeta = await sharp(monogram).metadata();
console.log(`monograma — ${monoMeta.width}x${monoMeta.height}`);

const lightMono = await sharp(monogram)
  .resize(340, 340, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .negate({ alpha: false })
  .tint({ r: 247, g: 242, b: 233 })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(lightMono).toFile(path.join(outBrand, "charbon-monogram-light.png"));

await sharp(monogram)
  .resize(560, 560, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .tint({ r: 24, g: 21, b: 19 })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outBrand, "charbon-monogram-dark.png"));

const iconSvg = Buffer.from(
  `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="104" fill="#0B0A09"/>
    <rect x="7" y="7" width="498" height="498" rx="97" fill="none" stroke="#2E2722" stroke-width="2"/>
  </svg>`
);

const iconBuffer = await sharp(iconSvg)
  .composite([{ input: lightMono, gravity: "center" }])
  .png()
  .toBuffer();

await sharp(iconBuffer).toFile(path.join(root, "app", "icon.png"));
await sharp(iconBuffer)
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "app", "apple-icon.png"));

console.log("Ícones atualizados.");
