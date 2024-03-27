<script setup>
import GlobelHader from './GlobleHeader.vue'
</script>

<template>
  <div class="baseLayout">
    <a-layout style="height: 600px">
      <a-layout-header class="header">
        <GlobelHader />
      </a-layout-header>
      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="less" scoped>
.baseLayout {
  margin-left: 10px;
  .header {
    margin-bottom: 7px;
  }
  .content {
    background: linear-gradient(to right, #fefefe, #fff);
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    left: 0;
    text-align: center;
  }
}
</style>
