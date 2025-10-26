import { test, expect } from '@playwright/test'

test('home page renders hero and sections', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Noor Latif' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Core Competencies/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Case Studies/i })).toBeVisible()
})
