import { chromium } from "playwright-core";
import fs from "node:fs/promises";

const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3000";
const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const problems = [];

page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(6000);

const hero = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const rect = h1.getBoundingClientRect();
  const styles = getComputedStyle(h1);
  return {
    font: styles.fontFamily,
    size: styles.fontSize,
    top: Math.round(rect.top),
    bottom: Math.round(rect.bottom),
    width: Math.round(rect.width),
    viewport: window.innerWidth,
  };
});
console.log("hero", hero);
if (hero.bottom > 900) problems.push(`hero title overflows viewport: ${hero.bottom}`);

const headerLogo = await page.evaluate(() => {
  const img = document.querySelector("header img");
  const rect = img.getBoundingClientRect();
  return {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    src: img.currentSrc,
  };
});
console.log("header logo", headerLogo);
if (!headerLogo.src.includes("w=256")) {
  problems.push(`header logo serving oversized file: ${headerLogo.src}`);
}

// pin + horizontal movement
const fogo = await page.evaluate(() => {
  const el = document.getElementById("fogo");
  return {
    top: el.getBoundingClientRect().top + window.scrollY,
    height: el.getBoundingClientRect().height,
  };
});
console.log("fogo geometry", fogo);

const trackX = (value) => {
  if (!value || value === "none") return 0;
  const parts = value.replace("matrix(", "").replace(")", "").split(",");
  return Math.abs(Number.parseFloat(parts[4] ?? "0"));
};

await page.evaluate((y) => window.scrollTo(0, y), fogo.top + 600);
await page.waitForTimeout(1600);
const pinState = await page.evaluate(() => {
  const section = document.getElementById("fogo");
  const inner = section.querySelector("div[class*='w-max']");
  const rect = section.getBoundingClientRect();
  return {
    sectionTop: Math.round(rect.top),
    sectionPosition: getComputedStyle(section).position,
    trackTransform: inner ? getComputedStyle(inner).transform : null,
  };
});
console.log("pin state", pinState);
if (Math.abs(pinState.sectionTop) > 2 || pinState.sectionPosition !== "fixed") {
  problems.push(
    `fogo pin not stuck: top=${pinState.sectionTop} position=${pinState.sectionPosition}`
  );
}
if (trackX(pinState.trackTransform) < 50) {
  problems.push(`fogo track did not translate: ${pinState.trackTransform}`);
}

await page.evaluate((y) => window.scrollTo(0, y), fogo.top + 1500);
await page.waitForTimeout(1400);
const pinState2 = await page.evaluate(() => {
  const section = document.getElementById("fogo");
  const inner = section.querySelector("div[class*='w-max']");
  return {
    top: Math.round(section.getBoundingClientRect().top),
    transform: inner ? getComputedStyle(inner).transform : null,
  };
});
console.log("pin state 2", pinState2);
if (trackX(pinState2.transform) <= trackX(pinState.trackTransform)) {
  problems.push("fogo horizontal scroll did not advance");
}

// menu page sticky behavior
await page.goto(`${base}/cardapio`, { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
const navChip = page.locator('a[href="#sanduiches"]').first();
await navChip.click();
await page.waitForTimeout(2400);
const menuState = await page.evaluate(() => {
  const active = document.querySelector('[aria-current="true"]');
  const section = document.getElementById("sanduiches");
  const nav = document.querySelector(".sticky");
  const flat = document.body.innerText.replace(/\u00a0/g, " ");
  return {
    active: active?.textContent?.trim(),
    sectionTop: Math.round(section.getBoundingClientRect().top),
    navTop: nav ? Math.round(nav.getBoundingClientRect().top) : null,
    priceSample: flat.includes("R$ 74,90"),
    noPdf: !flat.toLowerCase().includes("pdf"),
  };
});
console.log("menu state", menuState);
if (menuState.sectionTop < 120 || menuState.sectionTop > 220) {
  problems.push(`menu anchor offset wrong: sectionTop=${menuState.sectionTop}`);
}
if (!menuState.priceSample) problems.push(`menu prices not rendered`);
if (!menuState.noPdf) problems.push(`PDF reference still visible on menu page`);

// axe accessibility
const axeSource = await fs.readFile("node_modules/axe-core/axe.min.js", "utf8");
for (const path of ["/", "/cardapio", "/contato"]) {
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(path === "/" ? 5500 : 2400);
  await page.evaluate(axeSource);
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    });
  });
  const serious = results.violations.filter((violation) =>
    ["serious", "critical"].includes(violation.impact)
  );
  console.log(
    `${path} axe → violations=${results.violations.length} serious=${serious.length}`
  );
  for (const violation of serious) {
    console.log(`  - ${violation.id}: ${violation.help} (${violation.nodes.length})`);
    problems.push(`${path} axe: ${violation.id} — ${violation.help}`);
  }
}

// contact form validation
await page.goto(`${base}/contato`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.getByRole("button", { name: /enviar pelo whatsapp/i }).click();
await page.waitForTimeout(400);
const errors = await page.evaluate(() =>
  Array.from(document.querySelectorAll("form p.text-brasa")).map((el) => el.textContent)
);
console.log("form validation errors", errors);
if (!errors.some((text) => text?.includes("nome"))) {
  problems.push("contact form validation did not trigger");
}

// deep links
for (const [path, hash] of [
  ["/contato", "#reserva"],
  ["/cardapio", "#sobremesas"],
]) {
  await page.goto(`${base}${path}${hash}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  const pos = await page.evaluate((id) => {
    const el = document.querySelector(id);
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  }, hash);
  console.log(`deep link ${path}${hash} → top=${pos}`);
  if (pos === null || pos < 0 || pos > 240) {
    problems.push(`deep link ${path}${hash} wrong position: ${pos}`);
  }
}

await context.close();
await browser.close();

if (problems.length) {
  console.log("\n--- PROBLEMS ---");
  problems.forEach((problem) => console.log(problem));
  process.exitCode = 1;
} else {
  console.log("\nAll checks passed.");
}
