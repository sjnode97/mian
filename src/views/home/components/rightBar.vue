<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

var attackSourcesColor = [
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#EB3B5A' },
    { offset: 1, color: '#FE9C5A' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#FA8231' },
    { offset: 1, color: '#FFD14C' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#F7B731' },
    { offset: 1, color: '#FFEE96' }
  ]),
  new echarts.graphic.LinearGradient(0, 1, 1, 1, [
    { offset: 0, color: '#395CFE' },
    { offset: 1, color: '#2EC7CF' }
  ])
]
var attackSourcesColor1 = [
  '#EB3B5A',
  '#FA8231',
  '#F7B731',
  '#3860FC',
  '#1089E7',
  '#F57474',
  '#56D0E3',
  '#1089E7',
  '#F57474',
  '#1089E7',
  '#F57474',
  '#F57474'
]

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '430px'
    },
    // 柱子
    valdata: {
      type: Array,
      default: () => { return [21, 20, 19, 18, 17, 15, 13, 12, 10, 5] }
    },
    // 柱子最大值
    maxData: {
      type: Array,
      default: () => { return [25, 25, 25, 25, 25, 25, 25, 25, 25, 25] }
    },
    // 柱子名
    yAxisData: {
      type: Array,
      default: () => { return ['变压器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1', '逆变器1'] }
    }
  },
  data() {
    return {
      chart: null,
      options: {}
    }
  },
  watch: {
    valdata(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal)
        this.initChart()
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.options = {
        tooltip: {
          show: true,
          backgroundColor: 'rgba(3,3,3, 0.8)' // 背景颜色（此时为默认色）
        },
        color: ['#F7B731'],
        legend: {
          data: ['']
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitArea: {
            show: false,
            areaStyle: {
              color: ['#08093f', '#08093f']
            }
          }
        },
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisPointer: {
              label: {
                show: true
              }
            },
            postion: 'right',
            data: this.yAxisData,
            axisLabel: {
              fontSize: 10,
              padding: [2, 0, 0, 0],
              color: '#000',
              rich: {
                nt1: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[0],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  lineHeight: '5',
                  padding: [0, 1, 2, 1]
                  // padding:[0,0,2,0],
                },
                nt2: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[1],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                },
                nt3: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[2],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                },
                nt: {
                  color: '#fff',
                  backgroundColor: attackSourcesColor1[3],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: 'center',
                  lineHeight: 3,
                  borderRadius: 100,
                  padding: [0, 1, 2, 1]
                  // lineHeight: 5
                }
              },
              formatter: (value, index) => {
                if (this.valdata.length > index) {
                  index = index + 1
                  if (index - 1 < 3) {
                    return ['{nt' + index + '|' + index + '}'].join('\n')
                  } else {
                    return ['{nt|' + index + '}'].join('\n')
                  }
                } else { return [' '] }
              }
            }
          }
        ],
        series: [
          {
            zlevel: 1,
            name: '逆变器效率',
            type: 'bar',
            barWidth: 10,
            animationDuration: 1500,
            data: this.attackSourcesDataFmt(this.valdata),
            align: 'center',
            itemStyle: {
              normal: {
                barBorderRadius: 10
              }
            },
            label: {
              show: true,
              fontSize: 10,
              color: '#fff',
              textBorderWidth: 2,
              padding: [2, 0, 0, 0]
            }
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            data: this.maxData,
            tooltip: {
              show: false
            },
            textStyle: {
              // 图例文字的样式
              fontSize: 10,
              color: '#fff'
            },
            itemStyle: {
              normal: {
                color: '#05325F',
                fontSize: 10,
                barBorderRadius: 30
              }
            }
          }
        ]
      }
      this.chart.setOption(this.options)
    },
    // 数据格式化
    attackSourcesDataFmt(sData) {
      var dataList = []
      sData.forEach((item, i) => {
        const itemStyle = {
          color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i]
        }
        dataList.push({
          value: item,
          itemStyle: itemStyle
        })
      })
      return dataList
    }
  }
}
</script>
