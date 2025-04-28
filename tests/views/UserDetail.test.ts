import { describe, it, expect, vi } from 'vitest'
import { waitFor} from '@testing-library/vue'
import UserDetail from '../../src/views/UserDetail.vue'

import { useGetQueryUserById } from '../../src/composables/userGetUserById'
import { computed } from 'vue'
import { renderWithRouter } from '../utils/with-router'

vi.mock('../../src/composables/userGetUserById', () => {
  return {
    useGetQueryUserById: vi.fn()
  }
})

describe('UserDetailPage', () => {
  it('should show loading state while data is loading', async () => {
    vi.mocked(useGetQueryUserById).mockReturnValue({
        isError: computed(() => false),
        isLoading: computed(() => true),
        user: computed(() => undefined),
        setId: vi.fn()
    })

    const { wrapper} =  await renderWithRouter(UserDetail)


    expect(wrapper.html()).toContain('Loading...')
  })

  it('should show user details when data is available', async () => {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    }
    vi.mocked(useGetQueryUserById).mockReturnValue({
      user: computed(() => mockUser),
      isLoading: computed(() => false),
      isError: computed(() => false),
      setId: vi.fn()
    })

    const { wrapper} = await renderWithRouter(UserDetail)

    expect(wrapper.html()).toContain(mockUser.name)
  })

  it('Should set the id from the route params', async () => {

    const mockSetId = vi.fn()

    vi.mocked(useGetQueryUserById).mockReturnValue({
      user: computed(() => undefined), 
      isLoading: computed(() => false),
      isError: computed(() => false),
      setId: mockSetId
    })


    const { router } = await renderWithRouter(UserDetail, { 
      initialRoute: '/users/1'
    })

    await router.isReady()
    
    await waitFor(() => {   
      expect(mockSetId).toHaveBeenCalledWith('1') 
    })
  })


})