import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Header } from '@/components/header'
import { useTheme } from 'next-themes'

// Mock next-themes
const mockSetTheme = vi.fn()
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      systemTheme: 'light',
    } as any)
  })

  it('renders header with navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
  })

  it('renders theme toggle button', async () => {
    render(<Header />)
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i })
      expect(toggleButton).toBeInTheDocument()
    })
  })

  it('shows moon icon when in light mode', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
      systemTheme: 'light',
    } as any)

    render(<Header />)
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i })
      expect(toggleButton).toBeInTheDocument()
    })
  })

  it('shows sun icon when in dark mode', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
    } as any)

    render(<Header />)
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i })
      expect(toggleButton).toBeInTheDocument()
    })
  })

  it('calls setTheme when toggle button is clicked', async () => {
    render(<Header />)
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /switch to dark mode/i })
      fireEvent.click(toggleButton)
      expect(mockSetTheme).toHaveBeenCalledWith('dark')
    })
  })

  it('toggles from dark to light when clicked', async () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
      systemTheme: 'dark',
    } as any)

    render(<Header />)
    await waitFor(() => {
      const toggleButton = screen.getByRole('button', { name: /switch to light mode/i })
      fireEvent.click(toggleButton)
      expect(mockSetTheme).toHaveBeenCalledWith('light')
    })
  })
})

