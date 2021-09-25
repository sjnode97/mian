import request from '@/utils/request'

const business = '/business'

// 导航电站名称
export function stationList() {
  return request({
    url: business + '/power-station/list-station',
    method: 'get'
  })
}
