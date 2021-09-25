<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
export default {
  name: 'IndexPie',
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
    data: {
      type: Array,
      default: () => {
        return [{
          'name': '1',
          'value': 100
        }, {
          'name': '2',
          'value': 200
        }, {
          'name': '3',
          'value': 300
        }, {
          'name': '4',
          'value': 400
        }, {
          'name': '5',
          'value': 500
        }]
      }
    },
    pieNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      options: { },
      intervalTime: '',
      nextTime: 5000, // 循环调用间隔
      tipIndex: 0,
      colorList: [
        ['#0097FB', '#92E1FF', '#FFC227', '#30ECA6', '#FDFA4E', '#FF4848'],
        ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']
      ]
    }
  },
  watch: {
    data(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.options.series[0].data = newVal
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
    clearInterval(this.intervalTime)
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
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          radius: this.pieNum ? ['55%', '88%'] : ['64%', '90%'],
          clockwise: true,
          avoidLabelOverlap: false,
          roseType: this.pieNum ? '' : 'radius',
          hoverOffset: 0,
          emphasis: {
            itemStyle: {
              borderColor: '#f3f3f3',
              borderWidth: 2
            }
          },
          itemStyle: {
            normal: {
              color: (params) => {
                const color = this.colorList[this.pieNum][params.dataIndex]
                return color
              }
            }
          },
          label: {
            show: false,
            position: 'outside',
            formatter: '{a|{b}：{d}%}\n{hr|}',
            rich: {
              hr: {
                backgroundColor: 't',
                borderRadius: 2,
                width: 2,
                height: 2,
                padding: [2, 2, 0, -12]
              },
              a: {
                padding: [-10, 5, -10, 5]
              }
            }
          },
          labelLine: {
            normal: {
              length: 10,
              length2: 5,
              lineStyle: {
                width: 1
              }
            }
          },
          data: this.data
        }]
      }
      this.chart.setOption(this.options)

      this.tipIndex = 0 // 播放所在下标

      clearInterval(this.intervalTime)
      this.intervalTime = this.pieNum && setTimeout(this.setdispatchAction, this.nextTime)
    },
    setdispatchAction() {
      // this.intervalTime = setInterval(() => {
      // console.log(this.tipIndex)
      this.chart.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex: this.tipIndex
      })
      // 显示提示框
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.tipIndex
      })
      // 取消高亮指定的数据图形
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.tipIndex === 0 ? this.data.length : this.tipIndex - 1
      })
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.tipIndex
      })
      this.tipIndex++
      if (this.tipIndex > this.data.length) {
        this.tipIndex = 0
      }
      // 使用setTimeout替代setInterval，优化计时，避免混乱
      setTimeout(this.setdispatchAction, this.nextTime)
    }
  }
}
</script>
