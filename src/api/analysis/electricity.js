import request from '@/utils/request'

const bussiness = '/business'

// 电量对比分析
export function compareAnalysis(params) {
  return request({
    url: bussiness + '/electricity_analysis/columnar',
    method: 'get',
    params
  })
}

// 等效小时分析
export function equivalentHour(params) {
  return request({
    url: bussiness + '/electricity_analysis/equivalent_hour',
    method: 'get',
    params
  })
}

// 电量对比列表
export function getTableList(params) {
  return request({
    url: bussiness + '/electricity_analysis/electricity_Analysis_Table',
    method: 'get',
    params
  })
}

