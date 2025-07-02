<template>
    <h1>主页面Home</h1>
    <input type="text" />
    <button>btn</button>
</template>

<script setup>
defineOptions({ name: 'HomePage' })
import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

onMounted(() => console.log('mounted'))
onUnmounted(() => console.log('unmounted'))
onActivated(() => console.log('activated'))
onDeactivated(() => console.log('deactivated'))
</script>