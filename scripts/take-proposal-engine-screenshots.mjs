// Logs into the Proposal Engine and captures reference screenshots.
//
// Output: /root/anc-docs/public/img/screenshots/proposal-engine/*.png

import { chromium } from 'playwright'
import { mkdir } from 'fs/promises'

const BASE_URL  = process.env.PROPOSAL_ENGINE_URL || 'https://proposals.anc.com'
const BOT_EMAIL = process.env.RAG2_BOT_EMAIL || 'docs-bot@basheer.app'
const BOT_PASS  = process.env.RAG2_BOT_PASS  || 'ScreenshotBot2026!'
const OUT_DIR   = '/root/anc-docs/public/img/screenshots/proposal-engine'

const SHOTS = [
  { slug: '01-pipeline',         path: '/pipeline',         wait: 2500 },
  { slug: '02-estimator-list',   path: '/estimator',        wait: 2500 },
  { slug: '03-projects',         path: '/projects',         wait: 2000 },
  { slug: '04-tracker',          path: '/tracker',          wait: 2000 },
  { slug: '05-rfp-analyzer',     path: '/tools/rfp-analyzer', wait: 2000 },
  { slug: '06-rate-card',        path: '/admin/rate-card',  wait: 2000 },
  { slug: '07-products',         path: '/admin/products',   wait: 2000 },
  { slug: '08-venues',           path: '/admin/venues',     wait: 2000 },
  { slug: '09-pricing-logic',    path: '/admin/pricing-logic', wait: 2000 },
  { slug: '10-performance',      path: '/admin/performance', wait: 2000 },
  { slug: '11-submittal-compiler', path: '/admin/submittal-compiler', wait: 2000 },
]

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()

  // Proposal Engine uses a different auth — first try visiting the root and
  // see what the login looks like. If it requires creds we don't have, skip
  // screenshots but log so ops knows.
  console.log(`[1/${SHOTS.length + 1}] checking auth at ${BASE_URL}/`)
  await page.goto(BASE_URL)
  await page.waitForLoadState('domcontentloaded').catch(() => {})
  await page.waitForTimeout(2000)

  // If there's a login form, try the bot creds
  const hasLogin = await page.locator('input[type="password"]').count() > 0
  if (hasLogin) {
    console.log('  login form detected, attempting bot creds')
    try {
      await page.fill('input[type="email"]', BOT_EMAIL).catch(() => {})
      await page.fill('input[name="email"]', BOT_EMAIL).catch(() => {})
      await page.fill('input[type="password"]', BOT_PASS)
      await Promise.all([
        page.waitForNavigation({ timeout: 15000 }).catch(() => {}),
        page.click('button[type="submit"]').catch(() => page.press('input[type="password"]', 'Enter')),
      ])
      await page.waitForTimeout(2500)
    } catch (e) {
      console.error('  login attempt failed:', e.message.slice(0, 200))
    }
  } else {
    console.log('  no login required (or auth via SSO)')
  }

  for (let i = 0; i < SHOTS.length; i++) {
    const shot = SHOTS[i]
    const out = `${OUT_DIR}/${shot.slug}.png`
    try {
      console.log(`[${i + 2}/${SHOTS.length + 1}] ${shot.path}`)
      await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {})
      await page.waitForTimeout(shot.wait || 1500)
      await page.screenshot({ path: out, fullPage: false })
      console.log(`  saved ${out}`)
    } catch (e) {
      console.error(`  FAILED ${shot.path}: ${e.message.slice(0, 200)}`)
    }
  }

  await browser.close()
  console.log(`\nDone.`)
}

main().catch(err => { console.error(err); process.exit(1) })
