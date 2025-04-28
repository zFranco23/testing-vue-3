import { defineStore } from "pinia"
import {  ref } from "vue"

export const useCounterStore = defineStore('counter', () => {
    const count = ref<number>(0)

    const increment = (value: number = 1) => {
      count.value = count.value + value
    }


  
    return { count, increment }
})