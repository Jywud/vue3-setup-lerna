<template>
  <div class="hello">
    {{props.msg}}
  </div>
  <div>from pinia count: {{mainStore.count}}, getters: {{mainStore.count2}}</div>
  <button @click="mainStore.increment">change count</button>
</template>

<script setup>
import { useMainStore } from '@/stores'
let props = defineProps(['msg'])
let mainStore = useMainStore()


</script>

<style scoped lang="less">

</style>
