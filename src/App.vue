<script setup lang="ts">
import { useRouter } from 'vue-router'
import Baselayouts from './components/Baselayouts.vue'
import { useUserStore } from './stores/user'

const router = useRouter()

const userStore = useUserStore()

router.beforeEach((to, from, next) => {
  if (to.meta?.access === 'admin') {
    if (userStore.userInfo.userRole !== 'admin') {
      next('/NotAuth')
      return
    }
  }
  next()
})
</script>

<template>
  <div class="wrapper">
    <Baselayouts />
  </div>
</template>

<style scoped></style>
