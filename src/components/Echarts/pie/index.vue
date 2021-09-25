<template>
  <div ref="box" class="box" />
</template>

<script>
export default {
  props: {
    // 饼图数据
    pieData: {
      type: Array,
      default: () => {
        return [
          { value: 0, name: '暂无数据' }
        ]
      }
    },
    // 饼图颜色
    bgColor: {
      type: Array,
      default: () => {
        return ['#5470C6', '#91CC75', '#73C0DE', '#EE6666', '#FAC858']
      }
    },

    // 是否显示
    showLegend: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    // 是否显示南丁格尔图
    roseType: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // 控制实心圆或空心圆 以及大小
    radius: {
      type: null,
      default: () => {
        return '50%'
      }
    },
    // 是否显示提示文字
    tooltip: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    // 饼图标题文字
    text: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  watch: {
    pieData: {
      handler() {
        this.echartInit()
      },
      deep: true
    }
  },
  mounted() {
    this.echartInit()
  },
  methods: {
    echartInit() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(this.$refs.box)
      // //自适应
      window.addEventListener('resize', () => {
        myChart.resize()
      })

      // 绘制图表
      myChart.setOption({
        title: {
          text: this.text,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: this.showLegend,
          data: this.pieData.map((item) => {
            return item
          }),
          y: 'bottom'
        },
        roseType: this.roseType ? 'radius' : '',
        color: this.bgColor,
        series: [
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: this.radius,
            label: {
              show: this.tooltip
            },
            data: this.pieData
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    height: 100%;
    width: 100%;
  }
</style>
