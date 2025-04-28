import { ref } from "vue"
import { getUsers } from "../services/get-users"

interface User {
    id: number
    name: string
    username: string
    email: string
    address: {
      street: string
      suite: string
      city: string
      zipcode: string
      geo: {
        lat: string
        lng: string
      }
    }
    phone: string
    website: string
    company: {
      name: string
      catchPhrase: string
      bs: string
    }
}


export const useGetUsers = () => {
    const isLoading = ref<boolean>(false)
    const users = ref<User[]>([]) 

    const fetchUsers = async () => {
            isLoading.value = true
            const data = await getUsers() ?? []
            users.value = data
            isLoading.value = false
    }
  return {
    users,
    fetchUsers,
  }
}