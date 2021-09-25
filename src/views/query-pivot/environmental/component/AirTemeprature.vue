<template>
  <div id="wrap">
    <div ref="echarts" class="echarts" />
    <div ref="air" class="air">
      <div class="title">空气</div>
      <div v-for="(item, key) in airData" :key="key" class="air-item">
        <div :class="weather+item.value" />
      </div>
    </div>
    <div ref="wind-power" class="wind-power">
      <div class="title">风力</div>
      <div v-for="(item, key) in windData" :key="key" class="wind-power-item">
        <div :class="wind+item.value" />
      </div>
    </div>
    <div class="time">
      <div class="title" />
      <div v-for="(item, key) in airData" :key="key" class="time-item">
        <div :class="weather+item.value">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AirTemeprature',
  data() {
    return {
      weather: 'weather',
      wind: 'wind',
      airData: [
        {
          date: '00:00',
          value: 1
        },
        {
          date: '01:00',
          value: 1
        },
        {
          date: '02:00',
          value: 1
        },
        {
          date: '03:00',
          value: 1
        },
        {
          date: '04:00',
          value: 2
        },
        {
          date: '05:00',
          value: 2
        },
        {
          date: '06:00',
          value: 2
        },
        {
          date: '07:00',
          value: 2
        },
        {
          date: '08:00',
          value: 2
        },
        {
          date: '09:00',
          value: 3
        },
        {
          date: '10:00',
          value: 4
        },
        {
          date: '11:00',
          value: 2
        },
        {
          date: '12:00',
          value: 1
        },
        {
          date: '13:00',
          value: 1
        },
        {
          date: '14:00',
          value: 1
        },
        {
          date: '15:00',
          value: 1
        },
        {
          date: '16:00',
          value: 2
        },
        {
          date: '17:00',
          value: 2
        },
        {
          date: '18:00',
          value: 2
        },
        {
          date: '19:00',
          value: 2
        },
        {
          date: '20:00',
          value: 2
        },
        {
          date: '21:00',
          value: 3
        },
        {
          date: '22:00',
          value: 4
        },
        {
          date: '23:00',
          value: 2
        }
      ],
      windData: [
        {
          date: '00:00',
          value: 1
        },
        {
          date: '01:00',
          value: 1
        },
        {
          date: '02:00',
          value: 1
        },
        {
          date: '03:00',
          value: 1
        },
        {
          date: '04:00',
          value: 2
        },
        {
          date: '05:00',
          value: 2
        },
        {
          date: '06:00',
          value: 2
        },
        {
          date: '07:00',
          value: 2
        },
        {
          date: '08:00',
          value: 2
        },
        {
          date: '09:00',
          value: 3
        },
        {
          date: '10:00',
          value: 4
        },
        {
          date: '11:00',
          value: 2
        },
        {
          date: '00:00',
          value: 1
        },
        {
          date: '01:00',
          value: 1
        },
        {
          date: '02:00',
          value: 1
        },
        {
          date: '03:00',
          value: 1
        },
        {
          date: '04:00',
          value: 2
        },
        {
          date: '05:00',
          value: 2
        },
        {
          date: '06:00',
          value: 2
        },
        {
          date: '07:00',
          value: 2
        },
        {
          date: '08:00',
          value: 2
        },
        {
          date: '09:00',
          value: 3
        },
        {
          date: '10:00',
          value: 4
        },
        {
          date: '11:00',
          value: 2
        }
      ],
      date: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
      ]
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
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            // console.log(params)
            let str = ''
            for (let i = 0; i < params.length; i++) {
              // eslint-disable-next-line eqeqeq
              if (i == 0) {
                str += `${params[i].name}<br/>${params[i].seriesName.slice(0, params[i].seriesName.indexOf('('))}<br/><span>${params[0].data}</span>%<br/>`
                continue
              }
              str += `${params[i].seriesName.slice(0, params[i].seriesName.indexOf('('))}<br/><span>${params[i].data}</span>个<br/>`
            }
            return str
          }
        },
        grid: {
          left: '7%',
          right: '5%',
          bottom: '0%',
          top: '16%',
          containLabel: true
        },
        legend: {
          show: false,
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
          show: false,
          type: 'category',
          data: ['01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '12时', '01时', '02时', '03时', '04时', '05时', '06时', '07时', '08时', '09时', '10时', '11时', '121时'],
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
          max: '40',
          mix: '-30',
          interval: 60,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#06090e'
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
          type: 'line',
          barWidth: '15%',
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#2c87b1'
              }, {
                offset: 1,
                color: '#0256ef'
              }]),
              barBorderRadius: 0
            }
          },
          data: [10, 12, 15, 16, 16, 17, 18, 19, 18, -16, 15, 13, 11, 10, 12, 15, 16, 16, 17, 18, 19, 18, -16, 15]
        }]
      }
      myChart.setOption(option, true)
    }
  }
}
</script>

<style scoped lang="scss">
#wrap {
  .echarts {
    width: 100%;
    height: 260px;
  }
  .air {
    margin: 0 auto;
    display: flex;
    width: 90%;
    height: 20px;
    justify-content: space-between;
    .title {
      width: 60px;
    }
    .air-item {
      text-align: center;
      width: 56px;
      height: 100%;
      /*background: #F5F3B6;*/
      border-radius: 25px;
      .weather1 {
        height: 100%;
        background: #F5F3B7;
        color: #F5F3B7;
        border-radius: 3px;
      }
      .weather2 {
        height: 100%;
        background: #F5F3B7;
        color: #F5F3B7;
        border-radius: 3px;
      }
      .weather3 {
        height: 100%;
        background: #9FF0B3;
        color: #9FF0B3;
        border-radius: 3px;
      }
      .weather4 {
        height: 100%;
        background: #9FF0B3;
        color: #9FF0B3;
        border-radius: 3px;
      }
    }
  }
  .wind-power {
    margin: 20px auto;
    display: flex;
    width: 90%;
    height: 20px;
    justify-content: space-between;
    .title {
      width: 65px;
    }
    .wind-power-item {
      text-align: center;
      width: 60px;
      height: 100%;
      /*background: #F5F3B6;*/
      .wind1 {
        height: 100%;
        background: #EDECEB;
      }
      .wind2 {
        height: 100%;
        background: #EDECEB;
      }
      .wind3 {
        height: 100%;
        background: #F6F6F6;
      }
      .wind4 {
        height: 100%;
        background: #F6F6F6;
      }
    }
  }
  .time {
    margin: 20px auto;
    display: flex;
    width: 90%;
    height: 20px;
    justify-content: space-between;
    .title {
      width: 65px;
    }
    .time-item {
      text-align: center;
      width: 60px;
      height: 100%;
      color: #8b8b8b;
    }
  }
}
</style>
