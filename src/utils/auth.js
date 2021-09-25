import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setLocalStorage(key, value) {
  return window.localStorage.setItem(key, value)
}

export function getLocalStorage(key) {
  return window.localStorage.getItem(key)
}
