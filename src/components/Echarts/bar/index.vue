<template>
  <div class="containerBox">
    <div class="slot">
      <slot name="header" />
    </div>
    <div ref="box" class="box" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },

    // 文本标题
    title: {
      type: Object,
      default: () => {
        return {}
      }
    },

    // 柱状图颜色
    color: {
      type: Array,
      default: () => {
        return ['#4EC88D', '#3F75F5', '#73C0DE', '#EE6666', '#FAC858']
      }
    },

    // 是否显示
    showLegend: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    // 图标位置
    grid: {
      type: Object,
      default: () => {
        return { x: 80, y: 70, x2: 80, y2: 45 }
      }
    },

    // 是否显示工具栏
    showToolbox: {
      type: Boolean,
      default: () => {
        return true
      }
    },

    // x轴数据
    xAxisData: {
      type: Array,
      default: () => {
        return []
      }
    },

    // x轴单位
    xAxisUnit: {
      type: String,
      default: () => {
        return ''
      }
    },

    // 是否显示双Y轴
    isDoubleY: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    // 双Y轴属性
    doubleyAxis: {
      type: Array,
      default: () => {
        return [
          { name: '' },
          { name: '' }
        ]
      }
    },

    // 单Y轴单位
    singleyAxisUnit: {
      type: String,
      default: () => {
        return ''
      }
    }
  },

  computed: {
    // 传过来的data添加属性字段
    dataComputed() {
      this.data.forEach((item, index) => {
        // 柱状图颜色
        item.color = this.color[index]
        // 柱状图大小
        item.barWidth = 18
        // 柱状图圆角
        item.itemStyle = {
          normal: {
            barBorderRadius: [5, 5, 0, 0]
          }
        }
        item.smooth = true
      })
      return this.data
    },

    // Y轴属性
    yAxisComputed() {
      var arr = []
      for (var i = 0; i < this.doubleyAxis.length; i++) {
        var obj = {
          type: this.doubleyAxis[i].type ? this.doubleyAxis[i].type : 'value',
          name: this.doubleyAxis[i].name,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333'
            }
          }
        }
        arr.push(obj)
      }
      return arr
    }

  },
  watch: {
    data: {
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
        title: { ...this.title, textStyle: { color: '#1ec0ff', fontSize: 15 }},
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: this.showLegend,
          data: this.data.map((item) => {
            return item.name
          }),
          y: 'bottom'
        },
        grid: this.grid ? this.grid : {},
        toolbox: {
          show: this.showToolbox,
          orient: 'vertical',
          right: 20,
          top: '20%',
          feature: {
            magicType: { type: ['line', 'bar'] },
            dataView: {},
            restore: {},
            saveAsImage: {}
          }
        },

        xAxis: {
          type: 'category',
          name: this.xAxisUnit,
          data: this.xAxisData
        },
        yAxis: this.isDoubleY ? this.yAxisComputed : { type: 'value', name: this.singleyAxisUnit },
        series: this.dataComputed
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .containerBox{
    height: 100%;
    position: relative;
     .box {
      height: 100%;
      width: 100%;
    }
    .slot{
      position: absolute;
      left:30%;
      z-index: 1;
      top:10px
    }
  }

</style>
