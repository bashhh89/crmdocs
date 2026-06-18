// Batch 2: reuse saved CRM session, capture the remaining lesson screens
// (dashboard tabs, record pages, tasks, pipeline-by-BU, AI panel).
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

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, storageState: "/tmp/crm-state.json" });
  const page = await ctx.newPage();

  // 1) ANC 2026 dashboard — overview already have; click Technology + M&S tabs
  await go(page, "/object/dashboard/b992711d-1b7a-456b-b0dd-b5113a22f4d4");
  for (const [label, name] of [["Technology", "dash-technology"], ["Media & Sponsorship", "dash-mns"], ["Venue Services", "dash-venue"]]) {
    try {
      const tab = page.getByText(new RegExp(label, "i")).first();
      await tab.click({ timeout: 6000 }); await page.waitForTimeout(3500); await shot(page, name);
    } catch (e) { console.log("  tab fail", label, e.message); }
  }

  // 2) Opportunities list (All Deals) — orientation / daily-basics list view
  await go(page, "/objects/opportunities?viewId=3da2419d-c8b0-4c6e-8c0a-000000000000");
  if (!page.url().includes("opportunities")) await go(page, "/objects/opportunities");
  await shot(page, "opps-list");
  // open first record -> opportunity record page
  try {
    const href = await page.evaluate(() => { const a = [...document.querySelectorAll('a[href*="/object/"]')].find(x => /\/object\/[a-zA-Z]+\/[0-9a-f-]{36}/.test(x.getAttribute("href") || "")); return a ? a.getAttribute("href") : null; });
    if (href) { await page.goto(CRM + href, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(6000); await shot(page, "opp-record"); }
  } catch (e) { console.log("  opp-record fail", e.message); }

  // 3) Companies -> open first company (account view)
  await go(page, "/objects/companies");
  try {
    const href = await page.evaluate(() => { const a = [...document.querySelectorAll('a[href*="/object/"]')].find(x => /\/object\/company\/[0-9a-f-]{36}/.test(x.getAttribute("href") || "")); return a ? a.getAttribute("href") : null; });
    if (href) { await page.goto(CRM + href, { waitUntil: "domcontentloaded" }); await page.waitForTimeout(6000); await shot(page, "company-record"); }
  } catch (e) { console.log("  company-record fail", e.message); }

  // 4) Tasks (your day-to-day)
  await go(page, "/objects/tasks"); await shot(page, "tasks-list");

  // 5) Service tickets
  await go(page, "/objects/serviceTickets"); await shot(page, "tickets-list");
  console.log("  serviceTickets url ->", page.url());

  // 6) Pipeline by Business Unit (forecasting & pipeline)
  await go(page, "/objects/opportunities?viewId=a5b4cfa5-0000-0000-0000-000000000000");
  await shot(page, "pipeline-by-bu");
  console.log("  pipeline-by-bu url ->", page.url());

  // 7) AI panel — find an "Ask AI" button
  await go(page, "/objects/opportunities");
  try {
    const aiBtn = page.getByRole("button", { name: /ask ai|ai assistant/i }).first();
    await aiBtn.click({ timeout: 6000 }); await page.waitForTimeout(2500); await shot(page, "ai-panel-empty");
  } catch (e) {
    console.log("  no Ask AI button, dumping candidates");
    const cands = await page.evaluate(() => [...document.querySelectorAll("button,[role=button],a")].map(b => (b.getAttribute("aria-label") || b.textContent || "").trim()).filter(s => /ai|assist|ask/i.test(s)).slice(0, 20));
    console.log("  AI candidates:", JSON.stringify(cands));
  }

  await browser.close();
  console.log("batch2 done");
})().catch(e => { console.error(e); process.exit(1); });
