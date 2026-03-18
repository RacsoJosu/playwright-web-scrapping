import { chromium, Browser, Page } from 'playwright'
import dotenv from 'dotenv'
dotenv.config()

let browser: Browser | null = null
let page: Page | null = null

const BASE_URL = process.env.BASE_URL!
const LOGIN_EMAIL = process.env.LOGIN_EMAIL!
const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD!

export async function initBrowser() {
  if (browser) return

  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  page = await context.newPage()

  // Login una sola vez
  await page.goto(`${BASE_URL}/login`)
  await page.locator('[name="email"]').fill(LOGIN_EMAIL)
  await page.locator('[name="password"]').fill(LOGIN_PASSWORD)
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/login') && resp.status() === 200),
    page.locator('button[type="submit"]').click()
  ])


  // Guardar estado de la sesión (opcional)
  await context.storageState({ path: 'auth.json' })
 await page.goto(`${BASE_URL}/usuarios`)
  console.log('🚀 Browser inicializado y login realizado')
}

export function getBrowser() {
  if (!browser) throw new Error('Browser no inicializado. Llama initBrowser() primero.')
  return browser
}

export function getPage() {
  if (!page) throw new Error('Page no inicializada. Llama initBrowser() primero.')
  return page
}
