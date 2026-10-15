/**
 * 用户相关接口（演示用本地 Mock，无真实网络请求）
 * 后续接入真实后端时，把 login 内部实现替换为 uni.request 即可
 */
const MOCK_TOKEN = 'mock-token-' + Date.now()

export function login(account, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (account === 'admin' && password === '123456') {
        resolve({ token: MOCK_TOKEN, account })
      } else {
        reject(new Error('账号或密码错误'))
      }
    }, 800)
  })
}
