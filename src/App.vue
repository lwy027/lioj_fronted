<script setup lang="ts">
import { useRouter } from 'vue-router'
import Baselayouts from './components/Baselayouts.vue'
import { useUserStore } from './stores/user'
import { onMounted } from 'vue'

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

//全局初始化调用
const oninit = () => {
  console.log('欢迎来到我的项目')
}

onMounted(() => {
  oninit()
})
</script>

<template>
  <div class="wrapper">
    <Baselayouts />
  </div>
</template>

<style scoped></style>
