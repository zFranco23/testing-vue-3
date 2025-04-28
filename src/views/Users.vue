<script lang="ts" setup>
import { useGetQueryUsers } from '../composables/useGetQueryUsers';


    const { data, isLoading } = useGetQueryUsers()

</script>


<template>  

        <h1>Users page</h1>

        <div v-if="isLoading">
            Loading...
        </div>
        <div v-if="data">
            <div v-if="data.length > 0">
                <div v-for="user in data">
                <router-link :to="`/users/${user.id}`"> 
                    <div>
                    Name: {{ user.name }} - {{ user.email }}
                    </div>
                    
                </router-link>
            </div>
            </div>

            <div v-else>
                No users available
            </div>
        </div>
        <button type="button" @click="$router.push('/')">
        Return to Home
    </button>

</template>