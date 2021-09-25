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
      default: '90%'
    },
    height: {
      type: String,
      default: '110px'
    },
    ratio: {
      type: String,
      default: '80'
    },
    name: {
      type: String,
      default: '完成率'
    },
    onlyNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      options: {}
    }
  },
  watch: {
    data(newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(this.options)
        // this.options.options[0].series[1].data = newVal
        this.chart.setOption(this.options)
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
      const labelData = []
      for (var i = 0; i < 100; ++i) {
        labelData.push({
          value: 1,
          name: i,
          itemStyle: {
            normal: {
              color: 'rgba(0,0,0,0)'
            }
          }
        })
      }
      for (let i = 0; i < labelData.length; ++i) {
        if (labelData[i].name < Math.floor(Math.abs(this.ratio))) {
          labelData[i].itemStyle = {
            normal: {
              color: '#03FCF3'
            }
          }
        }
      }
      const labelData1 = []
      for (let i = 0; i < 100; ++i) {
        labelData1.push({
          value: 1,
          name: i
        })
      }
      for (let i = 0; i < labelData1.length; ++i) {
        if (labelData1[i].name < 100) {
          // labelData[i].value = 2
          labelData1[i].itemStyle = {
            normal: {
              color: '#05283e'
            }
          }
        }
      }
      const remTopx = (rem) => {
        const fontSize = '16'
        return fontSize * rem
      }
      let titleText = '{val|' + this.ratio + '}{unit|' + '%' + `}\n{name|` + this.name + '}'
      if (this.onlyNum) {
        titleText = '{val|' + this.ratio + '}{unit|' + '%' + '}'
      }
      this.options = {
        title: [
          {
            text: titleText,
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: remTopx(0.9),
                  color: '#5abdf8'
                },
                val: {
                  fontSize: remTopx(1),
                  color: this.onlyNum ? '#fbe04e' : '#CEF3FE',
                  padding: [10, 0]
                },
                unit: {
                  fontSize: remTopx(0.9),
                  color: this.onlyNum ? '#fbe04e' : '#CEF3FE'
                }
              }
            },
            // 是否触发事件
            triggerEvent: true
          }
        ],
        series: [
          {
            hoverAnimation: false,
            type: 'pie',
            clockwise: false,
            z: 2,
            radius: ['75%', '90%'],
            zlevel: -2,
            itemStyle: {
              normal: {
                borderColor: '#315a75',
                borderWidth: 0.5
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: labelData
          },
          {
            hoverAnimation: false,
            type: 'pie',
            z: 1,
            radius: ['75%', '90%'],
            zlevel: -2,
            itemStyle: {
              normal: {
                borderColor: '#315a75',
                borderWidth: 0.5
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: labelData1
          }
        ]
      }
      this.chart.setOption(this.options)
    }
  }
}
</script>
