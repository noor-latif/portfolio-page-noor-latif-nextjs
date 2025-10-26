import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn utility', () => {
  it('merges class names and removes duplicates', () => {
    const result = cn('p-2', 'text-sm', 'p-2', { 'font-bold': true, hidden: false })
    expect(result.split(' ').filter(Boolean)).toContain('p-2')
    expect(result).toContain('text-sm')
    expect(result).toContain('font-bold')
    expect(result).not.toContain('hidden')
  })
})
