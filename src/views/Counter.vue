
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterStore } from '../stores/counter-store';

const counterStore = useCounterStore()
const { increment} = counterStore
const { count } = storeToRefs(counterStore)
</script>

<template>
    <h1>Counter</h1>
    <div>
        Count: {{ count }}
    </div>
    <button type="button" role="button" @click="() => increment()">Increment</button>
</template> 