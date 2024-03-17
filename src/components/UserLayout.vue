<script setup>
import { useRouter } from 'vue-router'
import Login from '../views/login/index'

const router = useRouter()
</script>

<template>
  <div class="userLayout">
    <Login />
  </div>
</template>

<style lang="less" scoped>
.userLayout {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/img/login-bg.svg);
}
</style>
