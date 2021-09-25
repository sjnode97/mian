<template>
  <div id="wrap">
    <div class="title">
      <Top />
    </div>
    <div class="charts">
      <div ref="echarts" class="echarts" />
    </div>
  </div>
</template>

<script>
import Top from '../../../../components/ChartTop'
export default {
  name: 'Curve',
  components: {
    Top
  },
  data() {
    return {
      Curve: 'Curve',
      barData: [
        {
          name: '2021-07-25',
          type: 'line',
          data: [0, 74.1, 67.2, 79.5, 46.4, 46.4, 46.4, 74.1, 67.2, 79.5, 46.4, 1]
        },
        {
          name: '2021-07-24',
          type: 'line',
          data: [55, 20, 67, 50, 20, 10, 6.4, 14, 37.2, 79.5, 66.4, 22]
        }
      ]
    }
  },
  created() {
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      const myChart = this.$echarts.init(this.$refs.echarts)
      myChart.setOption({
        title: {
          show: false,
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2021-07-25', '2021-07-24'],
          bottom: '10%'
        },
        'dataZoom': [{
          'show': true,
          'height': 20,
          'xAxisIndex': [
            0
          ],
          bottom: 10,
          'start': 0,
          'end': 70,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '100%',
          handleStyle: {
            color: '#6d6d6e'

          },
          textStyle: {
            color: '#383838'
          },
          borderColor: '#46494b'
        }/* {
          'type': 'inside',
          'show': true,
          'height': 10,
          'start': 1,
          'end': 35
        }*/],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '00:40', '01:20', '01:20', '01:20', '01:20']
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          name: '单位：kw',
          nameTextStyle: {
            color: '#34b9cb'
          }
        },
        series: this.barData
      })
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
