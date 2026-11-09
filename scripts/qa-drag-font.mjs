import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const problems = [];

await page.goto("http://localhost:3000/cardapio", { waitUntil: "networkidle" });
await page.waitForTimeout(4200);

const strip = page.locator('[aria-labelledby="sugestoes"] > div').last();
await strip.scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

const before = await strip.evaluate((el) => ({
  scrollLeft: Math.round(el.scrollLeft),
  scrollWidth: el.scrollWidth,
  clientWidth: el.clientWidth,
}));
const box = await strip.boundingBox();
const viewport = page.viewportSize();
console.log("strip before", before, "box", box, "viewport", viewport);

if (!box) problems.push("strip not found");
else {
  const y = Math.round(box.y + box.height / 2);
  console.log("drag at", { x: Math.round(box.x + box.width - 120), y });
  await page.mouse.move(Math.round(box.x + box.width - 120), y);
  await page.mouse.down();
  for (let i = 1; i <= 8; i += 1) {
    await page.mouse.move(Math.round(box.x + box.width - 120 - i * 45), y, { steps: 1 });
    await page.waitForTimeout(25);
  }
  const during = await strip.evaluate((el) => Math.round(el.scrollLeft));
  await page.mouse.up();
  await page.waitForTimeout(700);
  const after = await strip.evaluate((el) => ({
    scrollLeft: Math.round(el.scrollLeft),
    hash: window.location.hash,
    cursor: el.style.cursor,
    snap: el.style.scrollSnapType,
  }));
  console.log("strip during", during, "after", after);
  if (after.scrollLeft - before.scrollLeft < 100) {
    problems.push(`drag did not scroll strip: ${before.scrollLeft} -> ${after.scrollLeft}`);
  }
  if (after.hash) problems.push(`drag triggered navigation: ${after.hash}`);
  if (after.cursor === "grabbing") problems.push("cursor stuck grabbing");
}

// plain click still works
await page.goto("http://localhost:3000/cardapio", { waitUntil: "networkidle" });
await page.waitForTimeout(3200);
const firstCard = page.locator('[aria-labelledby="sugestoes"] a').first();
await firstCard.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
const cardBox = await firstCard.boundingBox();
const hit = cardBox
  ? await page.evaluate(
      (point) => {
        const el = document.elementFromPoint(point.x, point.y);
        return el ? `${el.tagName}.${el.className}`.slice(0, 120) : null;
      },
      { x: cardBox.x + cardBox.width / 2, y: cardBox.y + cardBox.height / 2 }
    )
  : null;
console.log("card hit", hit, cardBox);
await firstCard.click();
await page.waitForTimeout(1800);
const clicked = await page.evaluate(() => ({
  hash: window.location.hash,
  scrollY: Math.round(window.scrollY),
}));
console.log("click card", clicked);
if (!clicked.hash) problems.push("clicking a suggestion no longer navigates");

await browser.close();

if (problems.length) {
  console.log("\n--- PROBLEMS ---");
  problems.forEach((p) => console.log(p));
  process.exitCode = 1;
} else {
  console.log("\nDrag + font checks passed.");
}
