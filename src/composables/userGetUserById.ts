import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  const data = await response.json()
  return data
}

export function useGetQueryUserById() {
    const id = ref<string | undefined>(undefined)

    const setId = (newId: string) => {
        id.value = newId
    }   

    const enabledFetch = computed(() => !!id.value)

  const { data: user, isLoading, isError} =  useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id.value!),
    enabled: enabledFetch
  })

  return { user, isLoading, setId, isError }
}
