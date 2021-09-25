import request from '@/utils/request'
const cockpit = '/business/cockpitAndFront/'

// 电站概况
export function powerStation1() {
  return request({
    url: '/business/power-station/overview1',
    method: 'get'
  })
}
// 地图电站
export function mapStation(params) {
  return request({
    url: cockpit + 'powerStation',
    method: 'get',
    params
  })
}

export function powerStation2() {
  return request({
    url: cockpit + 'overView',
    method: 'get'
  })
}

// 社会贡献
export function social() {
  return request({
    url: cockpit + 'socialContributions',
    method: 'get'
  })
}

// 本月本年上网电量
export function dayOrMonth() {
  return request({
    url: cockpit + 'dayOrMonthSort',
    method: 'get'
  })
}

// 电站排名-综合效率
// sort 1综合效率 正 2综合效率 逆 3综合厂用电率 正 4综合厂用电率 逆
export function overallEfficiency(params) {
  return request({
    url: cockpit + 'overallEfficiencySort',
    method: 'get',
    params
  })
}

// 电站排名-等效小时
// sort 1综合效率 正 2综合效率 逆 3综合厂用电率 正 4综合厂用电率 逆
export function equivalentHours(params) {
  return request({
    url: cockpit + 'equivalentHoursSort',
    method: 'get',
    params
  })
}

// 本日并网功率曲线图 1分钟1次
export function onGridPower(params) {
  return request({
    url: cockpit + 'onGridPower',
    method: 'get',
    params
  })
}

// 本日本月本年 15分钟1次
export function dayMonthYear(params) {
  return request({
    url: cockpit + 'dayMonthYear',
    method: 'get',
    params
  })
}

