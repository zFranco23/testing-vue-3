
import { describe, it, expect } from 'vitest'
import { useGetUsers } from '../../src/composables/useGetUsers'

describe('useGetUsers', () => {
  it('should fetch users', async () => {
    const { fetchUsers, users } = useGetUsers()
    await fetchUsers()
    expect(users.value.length).toBeGreaterThan(0)
  })
})