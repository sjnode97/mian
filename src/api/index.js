import request from '@/utils/request'
const cockpit = '/business/cockpitAndFront/'

// 运行数据1 实时功率最大出力辐射强度辐射量
export function overView1(params) {
  return request({
    url: cockpit + 'singlePowerOverView',
    method: 'get',
    params
  })
}
// 运行数据2 月年计划上网电量
export function overView2(params) {
  return request({
    url: '/business/generation-scheduling/monthAndYearPlan',
    method: 'get',
    params
  })
}

// 运行数据3  上网电量-折标媒-二氧化碳-等效指数
export function overView3(params) {
  return request({
    url: cockpit + 'singleSocialContributions',
    method: 'get',
    params
  })
}

// 本月本年上网电量 ?powerStationId=1
export function singlePowerDayMonthYear(params) {
  return request({
    url: cockpit + 'singlePowerDayMonthYear',
    method: 'get',
    params
  })
}
// 本日并网功率 ?powerStationId=1
export function singleOnGridPower(params) {
  return request({
    url: cockpit + 'singleOnGridPower',
    method: 'get',
    params
  })
}

// 设备运行- 逆变器状态 ?powerStationId=1
export function inverterStatusChart(params) {
  return request({
    url: cockpit + 'inverterStatusChart',
    method: 'get',
    params
  })
}
// 设备运行- 支路离散率分布 ?powerStationId=1
export function dispersionRateChart(params) {
  return request({
    url: cockpit + 'dispersionRateChart',
    method: 'get',
    params
  })
}
// 电站指标-等效小时
export function equivalentHours(params) {
  return request({
    url: cockpit + 'equivalentHoursMonth',
    method: 'get',
    params
  })
}

// 电站指标-计划完成率
export function planCompletionRate(params) {
  return request({
    url: cockpit + 'planCompletionRateMonthOrYear',
    method: 'get',
    params
  })
}

// 电站指标-综合效率
export function overallEfficiency(params) {
  return request({
    url: cockpit + 'overallEfficiencyMonthOrYear',
    method: 'get',
    params
  })
}

// 右上角上网电量
export function internetPower(params) {
  return request({
    url: cockpit + 'internetPowerChart',
    method: 'get',
    params
  })
}

// 地图上的设备信息
export function equipmentQuantity(params) {
  return request({
    url: cockpit + 'equipmentQuantity',
    method: 'get',
    params
  })
}

// 地图上的设备信息 stationId=1
export function powerStationOne(stationId) {
  return request({
    url: '/business/power-station/powerStationOne',
    method: 'get',
    params: {
      stationId
    }
  })
}

// 逆变器效率
export function inverterRateSort(params) {
  return request({
    url: cockpit + 'inverterRateSort',
    method: 'get',
    params
  })
}

// 支路电流
export function dispersionRateSort(params) {
  return request({
    url: cockpit + 'dispersionRateSort',
    method: 'get',
    params
  })
}
