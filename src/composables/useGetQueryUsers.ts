import { useQuery } from '@tanstack/vue-query'

interface User {
  id: number
  name: string
  email: string
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  const data = await response.json()
  return data
}

export function useGetQueryUsers() {
  const { data, isLoading} =  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })


  return { data, isLoading }
}
