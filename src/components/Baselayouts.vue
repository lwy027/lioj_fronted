<script setup>
import { useRouter } from 'vue-router'
import GlobelHader from './GlobleHeader.vue'

const router = useRouter()
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
    background-color: #dcd9d4;
    background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(0, 0, 0, 0.5) 100%
      ),
      radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.5) 50%);
    background-blend-mode: soft-light, screen;
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
