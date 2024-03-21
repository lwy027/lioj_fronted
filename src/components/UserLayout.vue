<script setup>
import Login from '../views/login/index'
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
