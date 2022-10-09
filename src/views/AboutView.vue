<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>from pinia count: {{mainStore.count}}, getters: {{mainStore.count2}}</div>
  </div>
</template>
<script setup>
  import { useMainStore } from '@/stores'
  let mainStore = useMainStore()
</script>
