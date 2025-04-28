
import { describe, it, expect} from 'vitest'
import { useGetQueryUsers } from '../../src/composables/useGetQueryUsers'
import { withSetup } from '../utils/with-setup'
import { waitFor } from '@testing-library/vue'


// vi.mock('@tanstack/vue-query', () => {
//   return {
//     useQuery: vi.fn(),
//   }
// })


// import { useQuery } from '@tanstack/vue-query'

describe('useGetQueryUsers', () => {
  // it('should fetch users', async () => {
  //   const mockQueryResult = {
  //     data: { value: { id: 1, name: 'John Doe', email: 'john@example.com' } },
  //     isLoading: { value: false },
  //     error: { value: null }
  //   }


  //   ;(useQuery as unknown as Mock).mockReturnValue(mockQueryResult)

  //   const { data, isLoading } = useGetQueryUsers()


  //   console.log(data.value);
    
  // })

  it('should fetch users', async () => {
    const [ result ] = withSetup(() => useGetQueryUsers())
    await waitFor(() => { 
      expect(result.data?.value?.length).toBeGreaterThan(0)
    })
  })
})