import request from '@/utils/request'

const bussiness = '/business'

// 电量对比分析
export function getAlarmTable(params) {
  return request({
    url: bussiness + '/warning-prompt/queryWarningList',
    method: 'get',
    params
  })
}

