import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});

async function shots(viewport, label, targets) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(iso(label));
  for (const target of targets) {
    if (target.path) {
      await page.goto(`http://localhost:3000${target.path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(2600);
    }
    if (typeof target.scroll === "number") {
      await page.evaluate((y) => window.scrollTo(0, y), target.scroll);
      await page.waitForTimeout(1200);
    } else if (target.selector) {
      await page.evaluate((selector) => {
        const el = document.querySelector(selector);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
      }, target.selector);
      await page.waitForTimeout(1400);
    }
    await page.screenshot({ path: `assets/review-${label}-${target.name}.png` });
    console.log(`saved ${label} ${target.name}`);
  }

  await context.close();
}

function iso(label) {
  return label === "desktop" ? 6000 : 5000;
}

const desktopTargets = [
  { name: "hero", scroll: 0 },
  { name: "manifesto", selector: "#proposta" },
  { name: "fogo", scroll: 3000 },
  { name: "destaques", selector: "#destaques" },
  { name: "chefs", selector: "#chefs" },
  { name: "galeria", selector: "#galeria" },
  { name: "happyhour", selector: "#happy-hour" },
  { name: "reserva", selector: "#reservar" },
  { name: "cardapio", path: "/cardapio" },
  { name: "contato", path: "/contato" },
];

const mobileTargets = [
  { name: "hero", scroll: 0 },
  { name: "manifesto", selector: "#proposta" },
  { name: "fogo", selector: "#fogo" },
  { name: "destaques", selector: "#destaques" },
  { name: "happyhour", selector: "#happy-hour" },
  { name: "reserva", selector: "#reservar" },
  { name: "cardapio", path: "/cardapio" },
  { name: "contato", path: "/contato" },
];

await shots({ width: 1440, height: 900 }, "desktop", desktopTargets);
await shots({ width: 390, height: 844 }, "mobile", mobileTargets);

await browser.close();
