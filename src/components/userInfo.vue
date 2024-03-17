<script setup lang="ts">
import { localCache } from '@/utils/catch'
import { useUserStore } from '@/stores/user'
import type { IUserInfo } from '@/types'
import { USERINFO } from '@/global/constant'

const userStore = useUserStore()

const userInfo: IUserInfo = localCache.getCache(USERINFO)
const url =
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'

//退出登录
const exitLogin = () => {
  localCache.clearcache()
  window.location.reload()
}
</script>

<template>
  <div class="userInfo">
    <template v-if="userInfo">
      <div class="avator">
        <a-space size="large">
          <a-avatar>
            <img alt="avatar" :src="userStore.userInfo?.userAvotor ? userInfo?.userAvotor : url" />
          </a-avatar>
        </a-space>
      </div>
      <div class="username">
        <h3>{{ userStore?.userInfo?.userName }}</h3>
      </div>

      <p @click="exitLogin" class="exit">退出登录</p>
    </template>

    <template v-else>
      <RouterLink to="/user">登录</RouterLink>|
      <RouterLink to="/user">注册</RouterLink>
    </template>
  </div>
</template>

<style lang="less" scoped>
.userInfo {
  width: 200px;
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 40px;

  .username {
    h3 {
      margin-top: 10px;
    }
  }
  .exit {
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
