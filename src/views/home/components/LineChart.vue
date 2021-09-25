<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '100%'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
    xAxisData: {
      type: Array,
      default: () => {
        return []
      }
    },
    legendData: {
      type: Array,
      default: () => {
        return ['', '']
      }
    },
    chartType: {
      type: Array,
      default: () => {
        return ['line', 'line']
      }
    },
    unit: {
      type: String,
      default: '单位'
    },
    color: {
      type: Array,
      default: () => {
        return [0, 1]
      }
    },
    colorLiner: {
      type: Array,
      default: () => {
        return [0, 1]
      }
    }
  },
  data() {
    return {
      chart: null,
      colorList: ['#3aadff', '#4fdfe3', '#08dafb', '#e4b437'], // 本年上网 去年上网  并网功率 辐射强度
      colorLinerGraList: [
        ['#4fd7ec', '#4fd7ec92', '#4fd7ec10'], // 并网功率
        // ['#24576b', '#24576b92', '#24576b10'], // 并网功率
        ['#264e4e', '#264e4e92', '#264e4e10'] // 辐射强度
      ]
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
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
      this.setOptions(this.chartData)
    },
    setOptions({ oneData, twoData } = {}) {
      this.chart.setOption({
        grid: {
          left: 10,
          right: 18,
          bottom: 10,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          padding: [5, 10]
        },
        xAxis: {
          show: true,
          data: this.xAxisData,
          boundaryGap: this.chartType[0] === 'bar',
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        yAxis: {
          show: true,
          name: this.unit,
          nameTextStyle: {
            fontSize: 10
          },
          nameGap: 8,
          splitLine: {
            show: false
          },
          splitArea: { show: false }
        },
        legend: {
          show: true,
          top: 5,
          itemWidth: 12, // 标识宽度
          itemHeight: 9, // 标识高度
          textStyle: {
            color: '#ddd'
          },
          data: this.legendData
        },
        series: [{
          name: this.legendData[0],
          type: this.chartType[0],
          data: oneData,
          itemStyle: {
            normal: {
              color: this.colorList[this.color[0]],
              lineStyle: {
                color: this.colorList[this.color[0]],
                width: 2
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.colorLinerGraList[this.colorLiner[0]][0]
                }, {
                  offset: 0.5,
                  color: this.colorLinerGraList[this.colorLiner[0]][1]
                }, {
                  offset: 1,
                  color: this.colorLinerGraList[this.colorLiner[0]][2]
                }])
              }
            }
          },
          barWidth: 10,
          smooth: true,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        this.chartType[1] && {
          name: this.legendData[1],
          smooth: true,
          type: this.chartType[1],
          itemStyle: {
            normal: {
              color: this.colorList[this.color[1]],
              lineStyle: {
                color: this.colorList[this.color[1]],
                width: 2
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.colorLinerGraList[this.colorLiner[1]][0]
                }, {
                  offset: 0.5,
                  color: this.colorLinerGraList[this.colorLiner[1]][1]
                }, {
                  offset: 1,
                  color: this.colorLinerGraList[this.colorLiner[1]][2]
                }])
              }
            }
          },
          barWidth: 10,
          data: twoData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
