<template>
  <div id="wrap">
    <div class="title">
      <Top :right-item="botton" />
    </div>
    <div class="charts">
      <div ref="echarts" class="echarts" />
    </div>
  </div>
</template>

<script>
import Top from '../../../../components/ChartTop'
export default {
  name: 'Echarts',
  components: {
    Top
  },
  data() {
    return {
      title: 'jj',
      botton: ['输出电量', '输入电量']
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      const myChart = this.$echarts.init(this.$refs.echarts)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '14%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: ['2020年', '2021年'],
          left: '47%',
          bottom: 12,
          textStyle: {
            color: '#6171bb'
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        xAxis: {
          type: 'category',
          data: ['01月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
          axisLine: {
            lineStyle: {
              color: '#427bbd'
            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei'
            }
          }
        },
        yAxis: {
          type: 'value',
          max: '1200',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#427bbd'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {},
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '2020年',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#fccb05'
              }, {
                offset: 1,
                color: '#f5804d'
              }]),
              barBorderRadius: 0
            }
          },
          data: [400, null, 300, 300, 300, 400, 400, 400, 300, 400, 300, 300, 300]
        },
        {
          name: '2021年',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#288BF6'
              }, {
                offset: 1,
                color: '#6454F2'
              }]),
              barBorderRadius: 0
            }

          },
          data: [400, 500, 500, 500, 500, 400, 400, 500, 500, 400, 300, 300, 300]
        }]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped lang="scss">
  #wrap {
    width: 100%;
      .title {
        width: 100%;
      }
      .charts {
        width: 100%;
        height: 400px;
        .echarts {
          width: 100%;
          height: 400px;
        }
    }
  }
</style>
