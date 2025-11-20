import { test, expect } from '@playwright/test'

test('home page renders hero and sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Noor Latif' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Core Competencies/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Case Studies/i })).toBeVisible()
})

test('AI assistant shows suggested questions only once (at the bottom)', async ({ page }) => {
  await page.goto('/')

  // Open the AI assistant modal from the hero section
  await page.getByRole('button', { name: /Ask AI about my fit/i }).click()

  // There should only be a single "Suggested Questions:" section visible
  await expect(page.getByText('Suggested Questions:')).toHaveCount(1)
})

test('theme toggle is visible in header', async ({ page }) => {
  await page.goto('/')
  
  // Wait for the theme toggle button to be visible
  const toggleButton = page.getByRole('button', { name: /switch to (dark|light) mode/i })
  await expect(toggleButton).toBeVisible()
})

test('theme toggle switches between light and dark mode', async ({ page }) => {
  await page.goto('/')
  
  // Wait for page to load and theme to initialize
  await page.waitForLoadState('networkidle')
  
  // Get initial theme state
  const htmlElement = page.locator('html')
  const initialHasDark = await htmlElement.evaluate((el) => el.classList.contains('dark'))
  
  // Click the toggle button
  const toggleButton = page.getByRole('button', { name: /switch to (dark|light) mode/i })
  await toggleButton.click()
  
  // Wait for theme to change
  await page.waitForTimeout(200)
  
  // Check that theme has changed
  const newHasDark = await htmlElement.evaluate((el) => el.classList.contains('dark'))
  expect(newHasDark).not.toBe(initialHasDark)
})

test('theme preference persists after page reload', async ({ page }) => {
  await page.goto('/')
  
  // Wait for page to load
  await page.waitForLoadState('networkidle')
  
  // Click the toggle to set a theme
  const toggleButton = page.getByRole('button', { name: /switch to (dark|light) mode/i })
  await toggleButton.click()
  
  // Wait for theme to change
  await page.waitForTimeout(200)
  
  // Get the theme state
  const htmlElement = page.locator('html')
  const themeAfterToggle = await htmlElement.evaluate((el) => el.classList.contains('dark'))
  
  // Reload the page
  await page.reload()
  await page.waitForLoadState('networkidle')
  
  // Check that theme persisted
  const themeAfterReload = await htmlElement.evaluate((el) => el.classList.contains('dark'))
  expect(themeAfterReload).toBe(themeAfterToggle)
})