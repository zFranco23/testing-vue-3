

import { describe, it, expect } from 'vitest'
import { useCounter } from '../../src/composables/useCounter'

describe('useCounter', () => {
  it('should increment counter', () => {
    const { count, increment } = useCounter()
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
})