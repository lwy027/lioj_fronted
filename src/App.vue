<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Baselayouts from './components/Baselayouts.vue'
import { useUserStore } from './stores/user'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
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
    <template v-if="route.path.startsWith('/user')">
      <RouterView />
    </template>
    <template v-else>
      <Baselayouts />
    </template>
  </div>
</template>

<style scoped style="less"></style>
