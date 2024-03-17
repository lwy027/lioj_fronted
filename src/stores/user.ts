import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { UserDto } from '@/types'
import { loginRequest, registerRequest } from '@/service/login'
import { localCache } from '@/utils/catch'
import type { IUserInfo } from '../types/index'
import { USERINFO } from '@/global/constant'
export const useUserStore = defineStore('user', () => {
  const info = localCache.getCache(USERINFO)

  const userInfo: IUserInfo = reactive({
    userName: info?.userName,
    userRole: info?.userRole === 1 ? 'admin' : 'user',
    userAvotor: info?.userAvotor,
    id: info?.id
  })

  //注册
  const registerAction = async (registerDate: UserDto) => {
    const res = await registerRequest(registerDate)
    return res
  }
  const loginAction = async (loginDate: UserDto) => {
    const res = await loginRequest(loginDate)
    return res
  }

  return {
    registerAction,
    loginAction,
    userInfo
  }
})
