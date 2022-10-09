<template>
    <div class="home">
        <HelloWorld msg="hello vue3 ~" />
        <div>
            <button class="btn" @click="updateNum">num++</button> {{ num }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

let num = ref(1)

let updateNum = () => {
    num.value++
}

</script>
<style scoped>
.btn {
    font-size: 20px;
}
</style>
