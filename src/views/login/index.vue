<script setup lang="ts">
import { LOGIN_TOKEN, USERINFO } from '@/global/constant'
import { useUserStore } from '@/stores/user'
import { localCache } from '@/utils/catch'
import { errorResponse } from '@/utils/errorResponse'
import { Message } from '@arco-design/web-vue'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const router = useRouter()

const form = reactive({
  userName: '',
  password: ''
})

//登录逻辑
const loginHandle = async () => {
  if (6 < form.userName.length || form.userName.length < 1) {
    Message.error('用户名长度必须在1到6这个范围之内')
    return
  }
  if (form.password.length < 5) {
    Message.error('密码长度必须大于5')
    return
  }
  const res = await userStore.loginAction(form)
  //把信息存储到local中

  if (res.code === 201) {
    //用户信息
    localCache.setCache(USERINFO, res.data.userInfo)
    //token
    localCache.setCache(LOGIN_TOKEN, res.data.accessToken)

    router.push({
      path: '/',
      replace: true
    })
    setTimeout(() => {
      window.location.reload()
    }, 100)

    Message.success('登录成功')
  } else {
    Message.error(errorResponse(res))
  }
}
//注册逻辑
const registerHandle = async () => {
  if (form.userName.length < 1) {
    Message.error('用户名长度必须大于二')
    return
  }
  if (form.password.length < 5) {
    Message.error('密码长度必须大于5')
    return
  }

  const res = await userStore.registerAction(form)
  if (res.code === 201) {
    Message.success('注册成功,赶紧登录吧')
  } else {
    Message.error(errorResponse(res))
  }
}
</script>

<template>
  <div class="login">
    <div class="title">
      <h1>用户登录/注册</h1>
    </div>
    <a-form :model="form" :style="{ width: '400px' }">
      <a-form-item field="userName" label="用户名" required>
        <a-input v-model="form.userName" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="password" label="密码" required>
        <a-input v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <div class="submit">
          <a-button html-type="submit" type="primary" @click="loginHandle">登录</a-button>
          <a-button html-type="submit" @click="registerHandle">注册</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="less" scoped>
.login {
  .title {
    text-align: center;
    margin-bottom: 30px;
  }

  .submit {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>
