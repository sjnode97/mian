import request from '@/utils/request'
const epmtAnl = '/business/equipmentAnalysis/'

// 逆变器功率离散率 - 全部 ?day=2021-08-31&start=08:00&end=09:15
export function allIvtPower(params) {
  return request({
    url: epmtAnl + 'inverterPowerDiscreteRate',
    method: 'get',
    params
  })
}
// 逆变器功率离散率 - 单个电站
export function singleIvtPower(params) {
  return request({
    url: epmtAnl + 'inverterPowerDiscreteRateSingle',
    method: 'get',
    params
  })
}

// 逆变器功率离散率 - 逆变器交流功率分析
export function acPowerAnalysis(params) {
  return request({
    url: epmtAnl + 'acPowerAnalysisSingle',
    method: 'get',
    params
  })
}

// 支路电流离散率 - 单个电站
export function branchCurrentSingle(params) {
  return request({
    url: epmtAnl + 'branchCurrentDispersionRateSingle',
    method: 'get',
    params
  })
}

// 支路电流离散率 - 全部设备
export function branchCurrent(params) {
  return request({
    url: epmtAnl + 'branchCurrentDispersionRate',
    method: 'get',
    params
  })
}

// 支路电流离散率 - 分析
export function branchCurrentLine(params) {
  return request({
    url: epmtAnl + 'branchCurrentDispersionRateAnalysis',
    method: 'get',
    params
  })
}
