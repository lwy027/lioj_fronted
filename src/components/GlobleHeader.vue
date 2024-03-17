<script setup>
import { useRouter } from 'vue-router'
import routes from '../router/routes.ts'
import { ref } from 'vue'

import checkAccess from '@/utils/CheckAccess.ts'
import { useUserStore } from '@/stores/user.ts'
import userInfo from './userInfo.vue'

const router = useRouter()
const userStore = useUserStore()

const visibleRoutes = routes.filter((item) => {
  if (item.meta?.hideInMenu) {
    return false
  }
  //根据权限过滤菜单
  if (!checkAccess(userStore.userInfo, item.meta?.access)) {
    return false
  }
  return true
})

let curKey = ref(['/'])

const doMenuClick = (key) => {
  router.push(key)
}
</script>

<template>
  <div class="header">
    <a-menu mode="horizontal" :default-selected-keys="curKey" @menu-item-click="doMenuClick">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }"> </a-menu-item>
      <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{ item.name }} </a-menu-item>
    </a-menu>
    <userInfo />
  </div>
</template>

<style lang="less" scoped>
.header {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
</style>
