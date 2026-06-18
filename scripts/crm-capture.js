// Log into the live ANC CRM and capture topic-matched screenshots for the training lessons.
// Reads creds from /root/.crm-creds. Saves storageState so re-runs skip login.
// Usage: node scripts/crm-capture.js
const { chromium } = require("playwright");
const fs = require("fs");

const creds = Object.fromEntries(
  fs.readFileSync("/root/.crm-creds", "utf8")
    .split("\n").filter(l => l && !l.startsWith("#") && l.includes("="))
    .map(l => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]; })
);
const CRM_URL = creds.CRM_URL;
const OUT = "/tmp/crm-shots";
fs.mkdirSync(OUT, { recursive: true });

// First batch: URL-addressable views to validate the pipeline + learn the dashboard.
const TARGETS = [
  { name: "tech-dashboard",  url: "/object/dashboard/b992711d-1b7a-456b-b0dd-b5113a22f4d4", dump: true },
  { name: "tech-pipeline",   url: "/objects/opportunities?viewId=d468e33e-4ed2-49c4-8012-2d3d904a30d0" },
  { name: "tech-estimation", url: "/objects/opportunities?viewId=6d488595-b04d-465b-81ea-0eb151418268" },
  { name: "mns-nielsen",     url: "/page/f6e184f5-24b5-44db-a720-bc1ed6205705" },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  // --- Login ---
  console.log("logging in…");
  await page.goto(CRM_URL + "/welcome", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1500);
  try { await page.getByText(/Continue with Email/i).first().click({ timeout: 8000 }); } catch {}
  await page.waitForTimeout(1500);
  const email = page.locator('input[autocomplete="email"], input[placeholder="Email"]').first();
  await email.waitFor({ state: "visible", timeout: 15000 });
  await email.fill(creds.CRM_EMAIL);
  await email.press("Enter");
  // password field appears on the same email form; do NOT click any "Continue" button
  // (it would match "Continue with Microsoft" and bounce to SSO).
  const pwd = page.locator('input[type="password"]').first();
  await pwd.waitFor({ state: "visible", timeout: 15000 });
  await pwd.fill(creds.CRM_PASSWORD);
  await pwd.press("Enter");
  try {
    await page.waitForURL(u => !u.toString().includes("/welcome") && !u.toString().includes("/sign"), { timeout: 30000 });
  } catch {}
  await page.waitForTimeout(3000);
  console.log("post-login URL:", page.url());
  fs.writeFileSync("/tmp/crm-state.json", JSON.stringify(await ctx.storageState()));

  // --- Capture ---
  for (const t of TARGETS) {
    try {
      await page.goto(CRM_URL + t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(6500); // SPA renders data after DOM; networkidle never fires (live sockets)
      await page.screenshot({ path: `${OUT}/${t.name}.png` });
      console.log("captured:", t.name, "->", page.url());
      if (t.dump) {
        // print visible tab/button labels so we can find the Technology dashboard tab
        const labels = await page.evaluate(() =>
          Array.from(document.querySelectorAll('[role="tab"], button, a'))
            .map(e => (e.textContent || "").trim()).filter(s => s && s.length < 40)
        );
        console.log("  TABS/BUTTONS:", JSON.stringify([...new Set(labels)].slice(0, 60)));
      }
    } catch (e) {
      console.log("FAILED:", t.name, e.message);
    }
  }
  await browser.close();
  console.log("done");
})().catch(e => { console.error(e); process.exit(1); });
