<script setup>
import { useRouter } from 'vue-router'
import routes from '../router/routes.ts'
import { ref } from 'vue'

const router = useRouter()

let curKey = ref(['/'])

const doMenuClick = (key) => {
  router.push(key)
}
</script>

<template>
  <div class="home">
    <a-menu mode="horizontal" :default-selected-keys="curKey" @menu-item-click="doMenuClick">
      <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }"> </a-menu-item>
      <a-menu-item v-for="item in routes" :key="item.path">{{ item.name }} </a-menu-item>
    </a-menu>
  </div>
</template>

<style lang="less" scoped></style>
