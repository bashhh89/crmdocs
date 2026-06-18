// Batch 3: the captures that need precise targeting — opp record (+timeline),
// dashboard Technology/M&S tabs, the AI assistant panel, sponsor contracts.
const { chromium } = require("playwright");
const fs = require("fs");
const creds = Object.fromEntries(
  fs.readFileSync("/root/.crm-creds", "utf8").split("\n").filter(l => l && !l.startsWith("#") && l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const CRM = creds.CRM_URL;
const OUT = "/tmp/crm-shots";
const shot = async (page, name) => { await page.screenshot({ path: `${OUT}/${name}.png` }); console.log("  ✓", name); };
const go = async (page, url) => { await page.goto(CRM + url, { waitUntil: "domcontentloaded", timeout: 45000 }); await page.waitForTimeout(6500); };

// click the first VISIBLE element matching text (avoids hidden duplicates / overflow copies)
async function clickVisible(page, text, exact = false) {
  const loc = page.getByText(text, { exact });
  const n = await loc.count();
  for (let i = 0; i < n; i++) {
    const el = loc.nth(i);
    try { if (await el.isVisible()) { await el.scrollIntoViewIfNeeded().catch(() => {}); await el.click({ timeout: 4000 }); return true; } } catch {}
  }
  try { await loc.first().click({ force: true, timeout: 4000 }); return true; } catch { return false; }
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, storageState: "/tmp/crm-state.json" });
  const page = await ctx.newPage();

  // 1) Opportunity record (+ Timeline tab) — from the Proposal Pipeline rows
  await go(page, "/objects/opportunities?viewId=d468e33e-4ed2-49c4-8012-2d3d904a30d0");
  const href = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a[href*="/object/opportunity/"]')][0];
    return a ? a.getAttribute("href") : null;
  });
  console.log("  opp href:", href);
  if (href) {
    await page.goto(CRM + href, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(6000);
    await shot(page, "opp-record");
    if (await clickVisible(page, "Timeline", true)) { await page.waitForTimeout(3000); await shot(page, "opp-timeline"); }
  }

  // 2) Dashboard tabs — match the emoji-prefixed tab labels (nav items have no emoji)
  await go(page, "/object/dashboard/b992711d-1b7a-456b-b0dd-b5113a22f4d4");
  if (await clickVisible(page, "🔵 Technology", true)) { await page.waitForTimeout(3500); await shot(page, "dash-technology"); }
  await go(page, "/object/dashboard/b992711d-1b7a-456b-b0dd-b5113a22f4d4");
  if (await clickVisible(page, "🟣 Media & Sponsorship", true)) { await page.waitForTimeout(3500); await shot(page, "dash-mns-tab"); }

  // 3) AI assistant panel — "New chat" opens it; type a question
  await go(page, "/objects/opportunities");
  if (await clickVisible(page, "New chat", false)) {
    await page.waitForTimeout(2500);
    try {
      const input = page.locator('textarea, [contenteditable="true"], input[type="text"]').last();
      await input.click({ timeout: 4000 });
      await input.fill("What are my biggest open opportunities right now?");
      await shot(page, "ai-panel-typed");
      await input.press("Enter");
      await page.waitForTimeout(8000);
      await shot(page, "ai-panel-answer");
    } catch (e) { console.log("  ai input fail:", e.message); await shot(page, "ai-panel-open"); }
  } else {
    console.log("  no New chat button found");
    const cands = await page.evaluate(() => [...document.querySelectorAll("button,[role=button],a")].map(b => (b.getAttribute("aria-label") || b.textContent || "").trim()).filter(s => /ai|assist|ask|chat/i.test(s)).slice(0, 20));
    console.log("  AI candidates:", JSON.stringify(cands));
  }

  // 4) Sponsor contracts (best effort)
  await go(page, "/objects/sponsorContracts");
  await shot(page, "sponsor-contracts");
  console.log("  sponsorContracts url ->", page.url());

  await browser.close();
  console.log("batch3 done");
})().catch(e => { console.error(e); process.exit(1); });
