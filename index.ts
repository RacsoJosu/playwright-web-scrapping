import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { getPage, initBrowser } from './browser'
import dotenv from 'dotenv'
dotenv.config()

const app = new Hono()
const PORT = parseInt(process.env.PORT || '3000')

await initBrowser()
app.get('/scrape', async (c) => {
  const emailQuery = c.req.query('email')
  if (!emailQuery) return c.json({ ok: false, error: 'Email query missing' }, 400)

  console.time('scrape')
  const page = getPage()

  await page.goto(`${process.env.BASE_URL}/usuarios`)

  const input = page.locator('input[type="text"]')
  await input.waitFor()
  await input.fill(emailQuery)
  await input.press('Enter')

  const table = page.locator('[data-slot="table"]')
  await table.waitFor()

  const row = table.locator('tr', { hasText: emailQuery })
  await row.waitFor()
  const userData = await row.locator('td').allTextContents()

  console.timeEnd('scrape')
  return c.json({ ok: true, userData })
})


serve({
  fetch: app.fetch,
  port: PORT,
})
