const TOKEN_KEY = 'token'
const ACCOUNT_KEY = 'account'

export function getToken() {
  return uni.getStorageSync(TOKEN_KEY)
}

export function setToken(token) {
  uni.setStorageSync(TOKEN_KEY, token)
}

export function clearToken() {
  uni.removeStorageSync(TOKEN_KEY)
}

export function getSavedAccount() {
  return uni.getStorageSync(ACCOUNT_KEY)
}

export function setSavedAccount(account) {
  uni.setStorageSync(ACCOUNT_KEY, account)
}

export function clearSavedAccount() {
  uni.removeStorageSync(ACCOUNT_KEY)
}
