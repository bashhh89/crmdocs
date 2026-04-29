import { chromium } from 'playwright'
import { readFile } from 'fs/promises'

const html = await readFile('/tmp/proposal.html', 'utf8')
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
await page.pdf({
  path: '/root/anc-services/ANC-Phase-4-6-Proposal.pdf',
  format: 'Letter',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
})
await browser.close()
console.log('Rendered → /root/anc-services/ANC-Phase-4-6-Proposal.pdf')
