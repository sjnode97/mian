import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/security/common/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/security/user/get_user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/security/common/logout',
    method: 'get'
  })
}

// 获取菜单
export function getMenu() {
  return request({
    url: '/security/menu/get',
    method: 'get'
  })
}

