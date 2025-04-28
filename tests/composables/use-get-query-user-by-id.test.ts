
import { describe, it, expect, vi} from 'vitest'
import { withSetup } from '../utils/with-setup'
import { waitFor } from '@testing-library/vue'
import { useGetQueryUserById } from '../../src/composables/userGetUserById'



describe('useGetQueryUserById', () => {

  it('should fetch user', async () => {
    const [ result ] = withSetup(() => useGetQueryUserById())

    result.setId('2')

    await waitFor(() => {
      expect(result.user.value?.name).toBe('Franco Jossep')
    })
    
  })

})