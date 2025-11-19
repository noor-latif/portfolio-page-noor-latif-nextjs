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