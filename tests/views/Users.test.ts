import { describe, it, expect, vi } from 'vitest'
import { waitFor} from '@testing-library/vue'
import Users from '../../src/views/Users.vue'

import { useGetQueryUsers } from '../../src/composables/useGetQueryUsers'
import { computed } from 'vue'
import { renderWithRouter } from '../utils/with-router'

vi.mock('../../src/composables/useGetQueryUsers', () => {
  return {
    useGetQueryUsers: vi.fn()
  }
})

describe('UserPage', () => {
  it('should show loading state while data is loading', async () => {
    vi.mocked(useGetQueryUsers).mockReturnValue({
      data: computed(() => []),   // no hay datos
      isLoading: computed(() => true)
    })

    const { wrapper} = await  renderWithRouter(Users)


    expect(wrapper.html()).toContain('Loading...')
  })

  it('should show users when data is available', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]

    vi.mocked(useGetQueryUsers).mockReturnValue({
      data: computed(() => mockData), 
      isLoading: computed(() => false)
    })

    const { wrapper} = await renderWithRouter(Users)

    
    expect(wrapper.getAllByRole('link')).toHaveLength(2)
  })

  it('should display no users message when data is empty', async () => {
    vi.mocked(useGetQueryUsers ).mockReturnValue({
      data: computed(() => []), 
      isLoading: computed(() => false)
    })

    const { wrapper } = await renderWithRouter(Users)

    expect(wrapper.html()).toContain('No users available')
    expect(wrapper.queryByRole('link')).toBeNull()
  })

  it('should navigate to user detail page when clicking on a user', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]

    vi.mocked(useGetQueryUsers).mockReturnValue({
      data: computed(() => mockData), 
      isLoading: computed(() => false)
    })

    const { wrapper, router } = await renderWithRouter(Users) 
    
    await router.isReady()

    const link = wrapper.getAllByRole('link')[1]
    link.click()
    
    await waitFor(() => {   
      expect(router.currentRoute.value.path).toEqual('/users/2')
    } )

  })


  it('should return to home page when clicking on return to home button', async () => {
    const mockData = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ]

    vi.mocked(useGetQueryUsers).mockReturnValue({
      data: computed(() => mockData), 
      isLoading: computed(() => false)
    })

    const { wrapper, router } = await renderWithRouter(Users) 
    
    await router.isReady()

    const returnToHomeButton = wrapper.getByText('Return to Home')
    returnToHomeButton.click()
    
    await waitFor(() => {   
      expect(router.currentRoute.value.path).toEqual('/')
    } )
  })
})
