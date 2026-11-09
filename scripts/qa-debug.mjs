import { chromium } from "playwright-core";
import fs from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2800);

const state = await page.evaluate(() => {
  const section = document.getElementById("fogo");
  const rect = section.getBoundingClientRect();
  const parent = section.parentElement;
  const track = section.querySelector("div[class*='w-max']");
  const spacer = section.closest(".pin-spacer");
  return {
    scrollY: window.scrollY,
    rectTop: Math.round(rect.top),
    offsetTop: section.offsetTop,
    position: getComputedStyle(section).position,
    parentClass: parent?.className,
    spacer: spacer ? { class: spacer.className, height: spinnerHeight(spacer) } : null,
    track: track
      ? {
          class: track.className,
          transform: getComputedStyle(track).transform,
          scrollWidth: track.scrollWidth,
          rectWidth: Math.round(track.getBoundingClientRect().width),
        }
      : null,
  };
  function spinnerHeight(el) {
    return Math.round(el.getBoundingClientRect().height);
  }
});
console.log(JSON.stringify(state, null, 2));

// scroll using lenis-aware wheel to the fogo section
const offset = await page.evaluate(() => {
  const section = document.getElementById("fogo");
  return section.getBoundingClientRect().top + window.scrollY;
});
console.log("absolute fogo top", offset);

for (const delta of [0, 300, 900, 1500, 2100]) {
  await page.mouse.wheel(0, delta === 0 ? offset : 300);
  await page.waitForTimeout(900);
  const s = await page.evaluate(() => {
    const section = document.getElementById("fogo");
    const track = section.querySelector("div[class*='w-max']");
    return {
      scrollY: Math.round(window.scrollY),
      top: Math.round(section.getBoundingClientRect().top),
      height: Math.round(section.getBoundingClientRect().height),
      transform: track ? getComputedStyle(track).transform : null,
      position: getComputedStyle(section).position,
    };
  });
  console.log(delta, s);
}

// axe details
const axeSource = await fs.readFile("node_modules/axe-core/axe.min.js", "utf8");
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.evaluate(axeSource);
const result = await page.evaluate(async () =>
  window.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
  })
);
for (const violation of result.violations) {
  console.log(`\n### ${violation.id} (${violation.impact})`);
  for (const node of violation.nodes.slice(0, 20)) {
    const contrast = node.any?.[0]?.data?.contrastRatio;
    console.log(`- ${node.target.join(" ")} | ratio=${contrast ?? "?"} | ${node.html.slice(0, 120)}`);
  }
}

console.log("\nConsole:", logs.filter((l) => !l.includes("hot-update")).slice(0, 20));
await browser.close();
