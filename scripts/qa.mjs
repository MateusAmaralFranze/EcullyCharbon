import { chromium } from "playwright-core";

const executablePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const base = "http://localhost:3000";
const issues = [];

const browser = await chromium.launch({ executablePath, headless: true });

async function audit(viewport, label) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      issues.push(`[${label}] console.${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    issues.push(`[${label}] pageerror: ${error.message}`);
  });
  page.on("requestfailed", (request) => {
    const url = request.url();
    if (!url.includes("google.com/maps") && !url.includes("wa.me")) {
      issues.push(`[${label}] requestfailed: ${url} — ${request.failure()?.errorText}`);
    }
  });

  for (const path of ["/", "/cardapio", "/contato"]) {
    await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 90000 });
    await page.waitForTimeout(2600);

    const metrics = await page.evaluate(() => {
      const broken = Array.from(document.images)
        .filter((img) => img.complete && img.naturalWidth === 0)
        .map((img) => img.getAttribute("src"));
      const overflow = document.documentElement.scrollWidth - window.innerWidth;
      return {
        title: document.title,
        height: document.documentElement.scrollHeight,
        overflow,
        brokenImages: broken,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 80),
        sections: document.querySelectorAll("section").length,
      };
    });

    console.log(
      `[${label}] ${path} → "${metrics.title}" | h1="${metrics.h1}" | height=${metrics.height} | overflow=${metrics.overflow} | sections=${metrics.sections} | broken=${metrics.brokenImages.length}`
    );
    if (metrics.brokenImages.length) {
      issues.push(`[${label}] ${path} broken images: ${metrics.brokenImages.join(", ")}`);
    }
    if (metrics.overflow > 2) {
      issues.push(`[${label}] ${path} horizontal overflow: ${metrics.overflow}px`);
    }
  }

  // menu interaction
  await page.goto(`${base}/cardapio`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const search = page.locator('input[type="search"]');
  await search.fill("wagyu");
  await page.waitForTimeout(700);
  const searchState = await page.evaluate(() => ({
    items: document.querySelectorAll(".menu-item").length,
    text: document.body.innerText.includes("Burguer de Wagyu"),
    empty: document.body.innerText.includes("Nada encontrado"),
  }));
  console.log(`[${label}] search wagyu → items=${searchState.items} found=${searchState.text} empty=${searchState.empty}`);
  if (!searchState.text) issues.push(`[${label}] search failed to find Wagyu`);

  await search.fill("");
  await page.waitForTimeout(500);
  try {
    await page.locator("#sanduiches").scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const sticky = await page.evaluate(() => {
      const nav = document.querySelector(".sticky");
      if (!nav) return null;
      const rect = nav.getBoundingClientRect();
      return { top: Math.round(rect.top), height: Math.round(rect.height) };
    });
    console.log(`[${label}] sticky nav →`, sticky);
  } catch {
    console.log(`[${label}] sticky nav not measured`);
  }

  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2400);

  // menu overlay
  if (viewport.width < 1024) {
    await page.getByRole("button", { name: /abrir menu/i }).click();
    await page.waitForTimeout(900);
    const overlay = await page.evaluate(() => {
      const el = document.getElementById("site-menu");
      const rect = el?.getBoundingClientRect();
      return {
        ariaHidden: el?.getAttribute("aria-hidden"),
        visible: rect ? rect.height > 100 && getComputedStyle(el).visibility !== "hidden" : false,
        text: el?.innerText.includes("Cardápio"),
      };
    });
    console.log(`[${label}] overlay →`, overlay);
    if (!overlay.visible || !overlay.text) issues.push(`[${label}] menu overlay failed`);
  }

  // scroll and pin check
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(1200);
  const scrollState = await page.evaluate(() => ({
    y: window.scrollY,
    headerY: document.querySelector("header")?.getBoundingClientRect().top,
    fogoHeight: document.getElementById("fogo")?.getBoundingClientRect().height,
  }));
  console.log(`[${label}] scroll 3000 →`, scrollState);

  await page.screenshot({
    path: `assets/qa-${label}.png`,
    fullPage: false,
  });

  await context.close();
}

await audit({ width: 1440, height: 900 }, "desktop");
await audit({ width: 390, height: 844 }, "mobile");

await browser.close();

if (issues.length) {
  console.log("\n--- ISSUES ---");
  for (const issue of issues) console.log(issue);
  process.exitCode = 1;
} else {
  console.log("\nNo issues found.");
}
