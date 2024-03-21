<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const quesId = route.query.id
console.log(quesId)
</script>

<template>
  <div class="onlineQuestion">
    <h1>在线做题</h1>
  </div>
</template>

<style></style>
