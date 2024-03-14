import ACCESS_ENUM from '../access/AccessMenu'

/**
 * 检查权限(判断当前用户是否有某个权限)
 * @param loginInfo 当前登录的用户
 * @param needAccess 判断当前用户需要有的权限
 * @returns 有无权限
 */
const checkAccess = (loginInfo: any, needAccess = ACCESS_ENUM.NOT_LOGIN): boolean => {
  //获取当前用户具有的权限，如果没有则表示未登录
  const userAccess = loginInfo?.userRole ?? ACCESS_ENUM.NOT_LOGIN

  //1.不需要登录就有的权限
  if (userAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }

  //2.只有用户登录才有的权限
  if (needAccess === ACCESS_ENUM.USER) {
    //用户没有登录则返回
    if (userAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }
  //3.管理员权限
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (userAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }

  return true
}

export default checkAccess
