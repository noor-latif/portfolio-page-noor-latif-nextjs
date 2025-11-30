import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@/components/theme-provider'
import { useTheme } from 'next-themes'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock localStorage
    Storage.prototype.getItem = vi.fn()
    Storage.prototype.setItem = vi.fn()
    Storage.prototype.removeItem = vi.fn()
  })

  it('renders children correctly', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    )
    expect(container.textContent).toContain('Test Content')
  })

  it('provides theme context', () => {
    const TestComponent = () => {
      const theme = useTheme()
      return <div>{theme.theme || 'no-theme'}</div>
    }

    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn(),
      resolvedTheme: 'light',
      systemTheme: 'light',
    } as any)

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(useTheme).toHaveBeenCalled()
  })
})

