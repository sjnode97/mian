import request from '@/utils/request'

// 电站概况
export function postData(params) {
  return request({
    url: '/business/threeDimensional/saveBody',
    method: 'post',
    params
  })
}
