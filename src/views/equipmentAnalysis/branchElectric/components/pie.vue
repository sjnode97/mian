<template>
  <div ref="box" class="box" />
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default() {
        return 25
      }
    }
  },

  data() {
    return {

    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const myChart = this.$echarts.init(this.$refs.box)
      // //自适应
      window.addEventListener('resize', () => {
        myChart.resize()
      })

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
        if (labelData[i].name < this.num) {
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
          labelData1[i].itemStyle = {
            normal: {
              color: '#05283e'
            }
          }
        }
      }
      myChart.setOption(
        {
          title: [
            {
              text: '{val|' + this.num + '}{unit|' + '%' + '}\n{name|' + '完成率' + '}',
              top: 'center',
              left: 'center',
              textStyle: {
                rich: {
                  name: {
                    fontSize: 16,
                    color: '#5abdf8'
                  },
                  val: {
                    fontSize: 16,
                    color: 'black',
                    padding: [10, 0]
                  },
                  unit: {
                    fontSize: 16,
                    color: 'black'
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
              data: labelData,
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
              }
            },
            {
              hoverAnimation: false,
              type: 'pie',
              z: 1,
              data: labelData1,
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
              }
            }
          ]
        }
      )
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
