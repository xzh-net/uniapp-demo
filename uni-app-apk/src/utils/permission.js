import { getToken } from './auth'

const LOGIN_PAGE = '/pages/login/login'

function getCurrentRoute() {
  const pages = getCurrentPages()
  if (!pages.length) return ''
  const current = pages[pages.length - 1]
  return '/' + (current.route || '')
}

/**
 * 登录拦截：无 token 时除登录页外一律重定向到登录页
 */
export function checkLogin() {
  const token = getToken()
  if (token) return true

  const route = getCurrentRoute()
  if (route && route !== LOGIN_PAGE) {
    uni.reLaunch({ url: LOGIN_PAGE })
  }
  return false
}

export function initPermission() {
  checkLogin()
}
