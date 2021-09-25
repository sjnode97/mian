<template>
  <div id="wrap">
    <div ref="chart" class="charts" />
  </div>
</template>

<script>
export default {
  name: 'Radiate',
  props: {},
  data() {
    return {}
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      const lUnit = 'MJ/㎡'
      const rUnit = 'W/㎡'
      const dayjs = ''
      const myCharts = this.$echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '辐射强度与辐射量',
          x: 'left',
          y: 0,
          textStyle: {
            color: '#AED8FA',
            fontSize: 16,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.6)',
          // formatter:"{b}:{c}"
          formatter: function(params) {
            let str = params[0].name + ' ' + params[0].data.stationName + '</br>'
            params.forEach(item => {
              if (item.seriesName === '辐射量') {
                str += item.marker + item.seriesName + ' : ' + item.data.value + lUnit + '</br>'
              } else if (item.seriesName === '辐射强度') {
                // 柱状图渐变时设置marker
                item.marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#68E4F4;"></span>'
                str += item.marker + item.seriesName + ' : ' + item.data.value + rUnit
              }
            })
            return str
          }
        },
        legend: {
          // 修改legend的高度宽度
          itemHeight: 5,
          itemWidth: 24,
          data: [{
            name: '辐射量',
            icon: 'rect' // legend的icon
          },
          {
            name: '辐射强度',
            icon: 'rect'
          }
          ],
          textStyle: {
            color: '#B4B4B4'
          },
          bottom: '0'
        },
        toolbox: {
          showTitle: false,
          tooltip: {
            show: true,
            backgroundColor: '#222',
            textStyle: {
              fontSize: 12
            },
            position: 'left'
          },
          show: true,
          orient: 'vertical',
          right: '0',
          top: this.div ? '30' : 'center',
          // 侧边栏
          feature: {
            /* myTool1: {
              show: true,
              title: '最值显示切换',
              icon:
                'path://M597.333333 810.666667a85.333333 85.333333 0 1 1-85.333333-85.333334 85.333333 85.333333 0 0 1 85.333333 85.333334z m149.333334-341.333334a149.333333 149.333333 0 1 0 149.333333 149.333334 149.333333 149.333333 0 0 0-149.333333-149.333334zM597.333333 362.666667A234.666667 234.666667 0 1 0 362.666667 597.333333 234.666667 234.666667 0 0 0 597.333333 362.666667z',
              onclick: function(e) {
                // console.log(e.option)
                if (e.option.series.length > 0) {
                  if (e.option.series[0].markPoint.data) {
                    e.option.series.forEach((ele) => {
                      ele.markPoint = {}
                      ele.markLine = {}
                    })
                  } else {
                    e.option.series.forEach((ele) => {
                      ele.markPoint = {
                        data: [
                          {
                            type: 'max',
                            name: '最大值'
                          },
                          {
                            type: 'min',
                            name: '最小值'
                          }
                        ]
                      }
                      ele.markLine = {
                        data: [
                          {
                            type: 'average',
                            name: '平均值'
                          }
                        ]
                      }
                    })
                  }
                }
                // 重新渲染，必须词步骤，否则无效果
                // eslint-disable-next-line no-undef
                // chart.setOption(e.getOption())
              }
            },*/
            dataZoom: {
              yAxisIndex: 'none'
            },
            magicType: this.div
              ? {}
              : {
                type: ['line', 'bar']
              },
            restore: this.div ? null : {},
            dataView: this.div
              ? null
              : {
                show: true,
                title: '数据视图',
                lang: ['数据视图', '关闭', '导出Excel'],
                contentToOption: () => {
                  // 下载表格
                  // eslint-disable-next-line no-undef
                  excel({
                    id: this.config.tableID,
                    echarts: true,
                    note: true,
                    filename: this.config.title
                  })
                },
                optionToContent: (opt) => {
                  // 图表数据
                  const axisData = opt.xAxis[0].data
                  // 坐标数据
                  const series = opt.series
                  // 折线图数据
                  const titleText = opt.title[0].text
                  let tdHeads = `<tr><td  colspan="${
                    series.length + 1
                  }" style="padding: 0 10px;text-align:center;">${titleText}</td></tr>`
                  // 表头第一列
                  tdHeads += '<td  style="padding: 0 10px">时间</td>'
                  // 表头第一列
                  let tdBodys = ''
                  // 表数据
                  let td = ''
                  const unit = opt.yAxis[0].name
                  // 获取单位
                  const index = unit ? unit.indexOf('(') : '-'
                  // 截取单位符号获取单位
                  const obj = unit ? unit.substring(index, unit.length) : '-'
                  // 每一列数据求和
                  let total
                  let validNumber = 0
                  // console.log(opt.series[1].data)
                  for (let m = 0; m < series.length; m++) {
                    total = 0
                    validNumber = 0
                    // console.log('data: ', opt.series[m].data)
                    const tempData = opt.series[m].data || []
                    for (let i = 0; i < tempData.length; i++) {
                      // eslint-disable-next-line eqeqeq
                      if (isNaN(tempData[i]) == false && tempData[i]) {
                        total += +tempData[i]
                        ++validNumber
                      }
                    }
                    if (validNumber) {
                      console.log(total, validNumber)
                      td += `<td>
                            ${(total / validNumber).toFixed(2) || ''}
                            </td>`
                    } else {
                      td += `<td></td>`
                    }
                  }
                  // 组装表头，循环series获取表头名
                  for (let index = 0; index < series.length; index++) {
                    const element = series[index]
                    tdHeads +=
                      '<td style="padding: 0 10px">' +
                      element.name +
                      obj +
                      '</td>'
                  }
                  let table =
                    '<table id="' +
                    this.config.tableID +
                    '" border="1" class="table-bordered table-striped" style="width:99%;text-align:center;overflow: scroll;border-collapse:collapse;" ><tbody><tr>' +
                    tdHeads +
                    ' </tr>'
                  // 组装表数据
                  for (let i = 0, l = axisData.length; i < l; i++) {
                    for (let j = 0; j < series.length; j++) {
                      const temp = series[j].data && series[j].data[i]
                      // eslint-disable-next-line eqeqeq
                      if (temp != null && temp != undefined) {
                        tdBodys += '<td>' + temp + '</td>'
                      } else {
                        tdBodys += '<td></td>'
                      }
                    }
                    table +=
                      '<tr><td style="padding: 0 10px">' +
                      axisData[i] +
                      '</td>' +
                      tdBodys +
                      '</tr>'
                    tdBodys = ''
                  }
                  // 表格最后加一行求和
                  table += '<tr><td>' + '平均值' + '</td>' + td + '</tr>'
                  table += `</tbody>
                      <tfoot style="display: none">
                        <tr></tr>
                        <tr></tr>
                        <tr>
                          <td colspan="3">备注：导出时间 ${dayjs().format(
    'YYYY-MM-DD HH:hh:ss'
  )}</td>
                        </tr>
                      </tfoot>
                    </table>`

                  // 返回表
                  return table
                }
              },
            saveAsImage: { show: true }
          }
        },
        grid: {
          x: '8%',
          width: '86%',
          y: '20%'
        },
        xAxis: [{
          // type:'category',
          data: ['1km', '2km', '3km', '4km', '5km', '6km'],
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#B4B4B4'
            }
          },
          axisTick: {
            show: false
          }
        }],
        yAxis: [{
          name: lUnit, // lUnit
          /* nameLocation: 'middle',
          nameTextStyle: {
            padding: [3, 4, 50, 6]
          },*/
          nameTextStyle: {
            // color: 'green',
            fontSize: 12,
            padding: 20
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#eee'
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            },
            formatter: '{value} '
          }
        },
        {
          name: rUnit, // rUnit
          nameTextStyle: {
            // color: 'green',
            fontSize: 12,
            padding: 20
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            },
            formatter: '{value} '
          }
        }
        ],
        series: [{
          name: '辐射量',
          type: 'line',
          smooth: true,
          showSymbol: true,
          // 矢量画五角星
          // symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
          symbolSize: 12,
          yAxisIndex: 0,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(250,180,101,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(250,180,101,0)'
              }
              ]),
              shadowColor: 'rgba(250,180,101,0.2)',
              shadowBlur: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#FF8000'
            }
          },
          // data中可以使用对象，value代表相应的值，另外可加入自定义的属性
          data: [{
            value: 1,
            stationName: 's1'
          }, {
            value: 3,
            stationName: 's2'
          }, {
            value: 4,
            stationName: 's3'
          }, {
            value: 9,
            stationName: 's4'
          }, {
            value: 3,
            stationName: 's5'
          }, {
            value: 2,
            stationName: 's6'
          }]
        },
        {
          name: '辐射强度',
          type: 'bar',
          barWidth: 30,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#58E1F3'
              },
              {
                offset: 1,
                color: 'rgba(88,225,243,0.2)'
              }
              ])
              // 柱状图圆角
              // barBorderRadius: [30,30,0,0],
            }
          },

          data: [{
            value: 11,
            stationName: 's1'
          }, {
            value: 34,
            stationName: 's2'
          }, {
            value: 54,
            stationName: 's3'
          }, {
            value: 39,
            stationName: 's4'
          }, {
            value: 63,
            stationName: 's5'
          }, {
            value: 24,
            stationName: 's6'
          }]
        }
        ]
      }
      myCharts.setOption(option, true)
    }
  }
}
</script>

<style scoped lang="scss">
#wrap {
  width: 100%;
  .charts {
    width: 100%;
    height: 400px;
  }
}
</style>

