// Logs into ANC Twenty CRM and captures reference screenshots for the docs.
//
// Output: /root/anc-docs/public/img/screenshots/twenty-crm/*.png
// Run:    node /root/anc-docs/scripts/take-twenty-crm-screenshots.mjs

import { chromium } from 'playwright'
import { mkdir, readFile } from 'fs/promises'

const ENV_FILE = process.env.ANC_CRM_DOCS_ENV_FILE || '/root/.openclaw/.env'
const BASE_URL = process.env.ANC_CRM_DOCS_URL || 'https://crm.ancsports.net'
const OUT_DIR = '/root/anc-docs/public/img/screenshots/twenty-crm'

const SHOTS = [
  { slug: '01-companies', path: '/objects/companies', heading: /Companies|Account Names/i, wait: 2500 },
  { slug: '02-opportunities', path: '/objects/opportunities', heading: /Opportunities|Deals/i, wait: 2500 },
  { slug: '03-people', path: '/objects/people', heading: /People|Person/i, wait: 2500 },
  { slug: '04-tasks', path: '/objects/tasks', heading: /Tasks/i, wait: 2500 },
  { slug: '05-notes', path: '/objects/notes', heading: /Notes/i, wait: 2500 },
  { slug: '06-settings', path: '/settings/general', heading: /General|Workspace/i, wait: 2500 },
]

async function loadEnvFile(path) {
  try {
    const raw = await readFile(path, 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
      if (!match) continue

      const [, key, value] = match
      if (process.env[key] !== undefined) continue

      process.env[key] = value
        .replace(/^['"]|['"]$/g, '')
        .replace(/\\n/g, '\n')
    }
  } catch {
    // The script also supports normal process env vars, so a missing env file is fine.
  }
}

async function submitCurrentForm(page) {
  const continueButton = page.getByRole('button', { name: /^(Continue|Sign in|Log in)$/i }).last()

  if (await continueButton.count()) {
    await continueButton.click({ timeout: 10000 }).catch(async () => {
      await page.keyboard.press('Enter')
    })
  } else {
    await page.keyboard.press('Enter')
  }

  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(1000)
}

async function login(page, email, password) {
  console.log(`[1/${SHOTS.length + 1}] logging in at ${BASE_URL}/welcome`)
  await page.goto(`${BASE_URL}/welcome`, { waitUntil: 'domcontentloaded', timeout: 45000 })
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})

  const emailButton = page.getByRole('button', { name: /Continue with Email/i })
  if (await emailButton.count()) {
    await emailButton.click({ timeout: 10000 })
  }

  const emailInput = page.locator('input[placeholder="Email"], input[type="email"], input[name="email"]').first()
  await emailInput.fill(email, { timeout: 10000 })
  await submitCurrentForm(page)

  const passwordInput = page.locator('input[type="password"], input[placeholder="Password"], input[name="password"]').first()
  await passwordInput.fill(password, { timeout: 10000 })
  await submitCurrentForm(page)

  await page.waitForTimeout(2500)

  if (page.url().includes('/welcome') || await page.locator('input[type="password"]').count()) {
    throw new Error('Twenty CRM login failed: still on the auth screen after submitting credentials.')
  }

  console.log(`  logged in -> ${page.url()}`)
}

async function waitForScreen(page, shot) {
  await page.waitForLoadState('domcontentloaded', { timeout: 30000 }).catch(() => {})
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {})
  await page.waitForTimeout(shot.wait || 1500)

  if (await page.locator('input[type="password"]').count()) {
    throw new Error(`Auth screen appeared while capturing ${shot.slug}.`)
  }

  const heading = page.getByText(shot.heading).first()
  await heading.waitFor({ timeout: 8000 }).catch(() => {})
}

async function main() {
  await loadEnvFile(ENV_FILE)

  const email = process.env.ANC_CRM_DOCS_EMAIL
  const password = process.env.ANC_CRM_DOCS_PASSWORD

  if (!email || !password) {
    throw new Error('Missing ANC_CRM_DOCS_EMAIL or ANC_CRM_DOCS_PASSWORD. Add them to the environment or /root/.openclaw/.env.')
  }

  await mkdir(OUT_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  try {
    await login(page, email, password)

    for (let i = 0; i < SHOTS.length; i++) {
      const shot = SHOTS[i]
      const out = `${OUT_DIR}/${shot.slug}.png`
      console.log(`[${i + 2}/${SHOTS.length + 1}] ${shot.path}`)
      await page.goto(`${BASE_URL}${shot.path}`, { waitUntil: 'domcontentloaded', timeout: 45000 })
      await waitForScreen(page, shot)
      await page.screenshot({ path: out, fullPage: false })
      console.log(`  saved ${out}`)
    }
  } finally {
    await browser.close()
  }

  console.log(`\nDone. ${SHOTS.length} screenshots in ${OUT_DIR}`)
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
