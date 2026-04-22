// Logs into the Service Dashboard as a dedicated bot user and captures
// reference screenshots for embedding in the docs pages.
//
// Output: /root/anc-docs/public/img/screenshots/service-dashboard/*.png
// Run:    node /root/anc-docs/scripts/take-service-dashboard-screenshots.mjs

import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const BASE_URL    = process.env.SERVICE_DASHBOARD_URL || 'https://abc-anc-services.izcgmb.easypanel.host'
const BOT_EMAIL   = 'docs-bot@basheer.app'
const BOT_PASS    = 'ScreenshotBot2026!'
const OUT_DIR     = '/root/anc-docs/public/img/screenshots/service-dashboard'

const SHOTS = [
  { slug: '01-dashboard',         path: '/dashboard',          wait: 2000 },
  { slug: '02-events-list',       path: '/events',             wait: 2500 },
  { slug: '03-tickets-list',      path: '/tickets',            wait: 2000 },
  { slug: '04-my-assignments',    path: '/my-events',          wait: 2000 },
  { slug: '05-preview-staff',     path: '/preview-tech',       wait: 1500 },
  { slug: '06-venues-list',       path: '/venues',             wait: 2000 },
  { slug: '07-staff-list',        path: '/staff',              wait: 2000 },
  { slug: '08-portals',           path: '/portals',            wait: 1500 },
  { slug: '09-reports',           path: '/reports',            wait: 2000 },
  { slug: '10-account',           path: '/account',            wait: 1000 },
  { slug: '11-inventory',         path: '/inventory',          wait: 1500 },
  { slug: '12-shifts',            path: '/shifts',             wait: 1500 },
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,  // retina — crisper screenshots
  })
  const page = await ctx.newPage()

  // ── Login ──
  console.log(`[1/${SHOTS.length + 1}] logging in at ${BASE_URL}/login`)
  await page.goto(`${BASE_URL}/login`)
  await page.waitForLoadState('domcontentloaded')
  await page.fill('input[type="email"]', BOT_EMAIL)
  await page.fill('input[type="password"]', BOT_PASS)
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {}),
    page.click('button[type="submit"]'),
  ])
  await page.waitForTimeout(2000)

  // verify we didn't land back on /login
  if (page.url().includes('/login')) {
    console.error('Login failed — still on /login page. Check credentials.')
    await browser.close()
    process.exit(1)
  }
  console.log(`  logged in → ${page.url()}`)

  // ── Loop through pages ──
  for (let i = 0; i < SHOTS.length; i++) {
    const shot = SHOTS[i]
    const out = `${OUT_DIR}/${shot.slug}.png`
    try {
      console.log(`[${i + 2}/${SHOTS.length + 1}] ${shot.path}`)
      await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'networkidle', timeout: 30000 })
      await page.waitForTimeout(shot.wait || 1500)
      await page.screenshot({ path: out, fullPage: false })  // viewport only — cleaner for docs
      console.log(`  saved ${out}`)
    } catch (e) {
      console.error(`  FAILED ${shot.path}: ${e.message.slice(0, 200)}`)
    }
  }

  await browser.close()
  console.log(`\nDone. ${SHOTS.length} screenshots in ${OUT_DIR}`)
}

main().catch(err => { console.error(err); process.exit(1) })
