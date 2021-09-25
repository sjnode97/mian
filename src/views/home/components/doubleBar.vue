<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000

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
    config: {
      type: Object,
      default: () => {
        return {}
      },
      yAxisData: {
        type: Array,
        default: () => { return [] }
      },
      // 左边柱子
      val1Data: {
        type: Array,
        default: () => { return [] }
      },
      // 右边柱子
      val2Data: {
        type: Array,
        default: () => { return [] }
      },
      // 柱子最大值
      maxData: {
        type: Array,
        default: () => { return [] }
      },
      // 名字
      legendname: {
        type: Array,
        default: () => { return [] }
      }
    }
  },
  data() {
    return {
      chart: null,
      options: {}
    }
  },
  watch: {
    config(newVal, oldVal) {
      if (newVal !== oldVal) {
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
        baseOption: {
          // backgroundColor: '#08093f',
          timeline: {
            show: false,
            top: 0,
            data: []
          },
          legend: {
            show: true,
            textStyle: {
              color: '#ddd'
            },
            top: 20,
            itemWidth: 15, // 标识宽度
            itemHeight: 10, // 标识高度
            left: 'center'
          },
          grid: [
            // 左边柱子
            {
              show: false,
              left: '10',
              top: '10%',
              bottom: '0',
              containLabel: true,
              width: '40%'
            },
            // 中间年龄
            {
              show: false,
              left: '51%',
              top: '12%',
              bottom: '2.5%',
              width: '0%'
            },
            // 右边柱子
            {
              show: false,
              right: '10',
              top: '10%',
              bottom: '0',
              containLabel: true,
              width: '40%'
            }
          ],
          xAxis: [
            {
              type: 'value',
              inverse: true,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                color: '#08093f'
              },
              splitLine: {
                show: false
              },
              splitArea: {
                show: false,
                areaStyle: {
                  color: ['#08093f', '#08093f']
                }
              }
            },
            {
              gridIndex: 1,
              show: false
            },
            {
              gridIndex: 2,
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false,
                color: '#08093f'
              },
              splitLine: {
                show: false
              },
              splitArea: {
                show: false,
                areaStyle: {
                  color: ['#08093f', '#08093f']
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'category',
              inverse: true,
              position: 'right',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: this.config.yAxisData
            },
            {
              gridIndex: 1,
              type: 'category',
              inverse: true,
              position: 'center',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  align: 'center',
                  color: '#bfcacd',
                  fontSize: 12
                },
                formatter: (value, index) => {
                  return value.substring(0, 6)
                }
              },
              data: this.config.yAxisData
            },
            {
              gridIndex: 2,
              type: 'category',
              inverse: true,
              position: 'left',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              data: this.config.yAxisData
            }
          ],
          series: []
        },
        options: [
          {
            series: [
              {
                name: '',
                type: 'bar',
                barWidth: 10,
                xAxisIndex: 0,
                yAxisIndex: 0,
                z: -10,
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  normal: {
                    barBorderRadius: 2,
                    color: '#47505f'
                  }
                },
                data: this.config.maxData
              },
              {
                name: this.config.legendname?.[0],
                type: 'bar',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 2,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: '#3c6fcc'
                      },
                      {
                        offset: 1,
                        color: '#4ce4e9'
                      }
                    ])
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: (series) => {
                      return series.data
                      // console.info(series.data);
                    },
                    position: 'left',
                    textStyle: {
                      color: '#09d4e9',
                      fontSize: 12
                    },
                    offset: [0, 0]
                  }
                },
                data: this.config.val1Data
              },
              {
                name: '',
                type: 'bar',
                barWidth: 10,
                xAxisIndex: 2,
                yAxisIndex: 2,
                z: -10,
                barGap: '-100%',
                barCategoryGap: 0,
                itemStyle: {
                  normal: {
                    barBorderRadius: 2,
                    color: '#47505f'
                  }
                },
                data: this.config.maxData
              },
              {
                name: this.config.legendname?.[1],
                type: 'bar',
                xAxisIndex: 2,
                yAxisIndex: 2,
                barWidth: 10,
                itemStyle: {
                  normal: {
                    barBorderRadius: 2,
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0,
                        color: '#fdd947'
                      },
                      {
                        offset: 1,
                        color: '#f3963d'
                      }
                    ])
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: (series) => {
                      return series.data
                      // console.info(series.data);
                    },
                    position: 'right',
                    textStyle: {
                      color: '#f3a63d',
                      fontSize: 12
                    },
                    offset: [0, 0]
                  }
                },
                data: this.config.val2Data
              }
            ],
            dataZoom: this.config.maxData.length > 10 && [{
              // show: true, // 为true 滚动条出现
              type: 'slider',
              yAxisIndex: [0, 1, 2], // 同时控制多个y轴
              start: 0,
              end: (10 / this.config.maxData.length) * 100,
              right: 5,
              bottom: 30,
              showDetail: false,
              backgroundColor: '#fff0',
              fillerColor: '#999',
              borderColor: '#fff0',
              width: 7,
              handleSize: 0
            }]
          }
        ]
      }
      this.chart.setOption(this.options)
    }
  }
}
</script>
