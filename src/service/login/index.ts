import type { UserDto } from '@/types'
import WYrequest from '../requests'

//注册
export const registerRequest = (registerDate: UserDto) => {
  return WYrequest.post({
    data: registerDate,
    url: '/user/register'
  })
}
//登录
export const loginRequest = (registerDate: UserDto) => {
  return WYrequest.post({
    data: registerDate,
    url: '/user/login'
  })
}
