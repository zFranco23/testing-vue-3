<script setup lang="ts">
import {  watch } from 'vue';
import { useGetQueryUserById } from '../composables/userGetUserById';
import { useRoute } from 'vue-router';

const route = useRoute()
const { setId, user, isLoading, isError  } = useGetQueryUserById()



// onMounted(() => {            
//     setId(route.params.id as string) 
// })

watch(
  () => route.params.id,
  (id) => {
    if (id) {
      setId(id as string)
    }
  },
  { immediate: true }
)

</script>
<template>
    <h1>User detail</h1>

    <div>
        User id: {{  route.params.id }}
    </div>

    <div v-if="isError">
        Error
    </div>

    <div v-if="isLoading">
        Loading...
    </div>

    <div v-if="user">
        <div>
            Name: {{ user.name}}
        </div>
        <div>
            Email: {{ user.email }}
        </div>

        <div>
            Id: {{ user.id }}
        </div>

    </div>

    <button type="button" @click="$router.push('/')">
        Return to Home
    </button>
</template>