import { chromium } from "playwright-core";
import fs from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const axeSource = await fs.readFile("node_modules/axe-core/axe.min.js", "utf8");

for (const path of ["/", "/cardapio", "/contato"]) {
  await page.goto(`http://localhost:3000${path}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(path === "/" ? 6000 : 2400);
  await page.evaluate(axeSource);
  const result = await page.evaluate(async () =>
    window.axe.run(document, {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    })
  );
  console.log(`\n=== ${path} → ${result.violations.length} violations`);
  for (const violation of result.violations) {
    console.log(`  ${violation.id} (${violation.impact}) x${violation.nodes.length}`);
    for (const node of violation.nodes.slice(0, 15)) {
      console.log(
        `    ${node.target.join(" ")} | ${node.any?.[0]?.data?.contrastRatio ?? "?"} | ${node.html.slice(0, 100)}`
      );
    }
  }
}

// anchor offset check with enough time
await page.goto("http://localhost:3000/cardapio", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.locator('a[href="#sanduiches"]').first().click();
for (const wait of [600, 1400, 2600]) {
  await page.waitForTimeout(wait === 600 ? 600 : 800);
  const state = await page.evaluate(() => {
    const section = document.getElementById("sanduiches");
    const nav = document.querySelector(".sticky");
    return {
      sectionTop: Math.round(section.getBoundingClientRect().top),
      navBottom: nav ? Math.round(nav.getBoundingClientRect().bottom) : null,
      scrollY: Math.round(window.scrollY),
    };
  });
  console.log("anchor", wait, state);
}

// logo request size
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
const logos = await page.evaluate(() =>
  Array.from(document.querySelectorAll("header img, footer img"))
    .map((img) => ({ src: img.currentSrc, w: Math.round(img.getBoundingClientRect().width) }))
    .slice(0, 4)
);
console.log("logos", logos);

await browser.close();
