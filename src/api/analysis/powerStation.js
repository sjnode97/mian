
import request from '@/utils/request'

const bussiness = '/business'

// 电量对比分析
export function electricCompare(params) {
  return request({
    url: bussiness + '/electricity_analysis/comparison',
    method: 'get',
    params
  })
}

// 综合效率分析
export function efficiency(params) {
  return request({
    url: bussiness + '/electricity_analysis/comprehensive',
    method: 'get',
    params
  })
}

// 最大出力分析
export function maxPower(params) {
  return request({
    url: bussiness + '/electricity_analysis/maximum_output',
    method: 'get',
    params
  })
}

// 光伏方阵效率分析
export function photovoltaic(params) {
  return request({
    url: bussiness + '/electricity_analysis/photovoltaic_array',
    method: 'get',
    params
  })
}

// 光伏方阵年均效率 (顶部数据)
export function comprehensive(params) {
  return request({
    url: bussiness + '/electricity_analysis/comprehensive_total',
    method: 'get',
    params
  })
}
