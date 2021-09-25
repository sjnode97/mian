<template>
  <div id="box">
    <Search ref="topSearch" time="year" @Info="getInfo" />
    <div class="container">
      <div class="main1">
        <div class="title">
          <div class="item">
            年等效小时：
            <span class="value">{{ tableList.hours||"-" }} <span class="unit">h</span></span>
          </div>
          <div class="item">
            年累计上网量：
            <span class="value">{{ tableList.internet||"-" }} <span class="unit">万kWh</span></span>
          </div>
          <div class="item">
            年累计发电量：
            <span class="value">{{ tableList.hair||"-" }} <span class="unit">万kWh</span></span>
          </div>
          <div class="item">
            年累计完成率：
            <span class="value">{{ tableList.rate||"-" }} <span class="unit">%</span></span>
          </div>
        </div>
        <div class="chart1">
          <Chart
            :data="chart1Data"
            :show-legend="true"
            :x-axis-data="xAxis1Data"
            singley-axis-unit="单位：kW"
            :title="{
              text:'电量对比分析',
              left:30,
              top:10,
            }"
          />
        </div>
        <div class="download">
          <i class="iconfont icon-xiazai" @click="exportDataEvent" />
        </div>
        <el-table
          id="table"
          :data="tableList.list"
          border
          :header-cell-style="{'text-align':'center'}"
          max-height="330"
        >
          <el-table-column
            prop="time"
            label="年月"
            sortable
          />
          <el-table-column
            prop="internetElectric"
            label="上网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="hairElectric"
            label="发电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="pnElectric"
            label="购网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="aElectric"
            label="总弃光电路"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="planElectric"
            label="计划上网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="equivalentHour"
            label="等效小时"
            :render-header="(h,obj) => renderHeader(h,obj,'h')"
            sortable
          />
          <el-table-column
            prop="oee"
            label="综合效率"
            sortable
          />
          <el-table-column
            prop="planOee"
            label="计划完成率"
            :render-header="(h,obj) => renderHeader(h,obj,'%')"
            sortable
          />
          <el-table-column
            prop="radiation"
            label="辐射量"
            :render-header="(h,obj) => renderHeader(h,obj,'MJ/m3')"
            sortable
          />
        </el-table>
      </div>
      <div class="main2">
        <!-- <el-table
          :data="tableData"
          border
          :header-cell-style="{'text-align':'center'}"
          max-height="330"
        >
          <el-table-column
            prop="a"
            label="年月"
            sortable
          />
          <el-table-column
            prop="b"
            label="上网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="c"
            label="发电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="d"
            label="购网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="e"
            label="总弃光电路"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="f"
            label="计划上网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="g"
            label="等效小时"
            :render-header="(h,obj) => renderHeader(h,obj,'h')"
            sortable
          />
          <el-table-column
            prop="h"
            label="综合效率"
            sortable
          />
          <el-table-column
            prop="i"
            label="计划完成率"
            :render-header="(h,obj) => renderHeader(h,obj,'%')"
            sortable
          />
          <el-table-column
            prop="j"
            label="辐射量"
            :render-header="(h,obj) => renderHeader(h,obj,'MJ/m3')"
            sortable
          />
        </el-table> -->
      </div>
      <div class="main3">
        <div class="chart3">
          <Chart
            :data="chart2Data"
            :show-legend="true"
            :x-axis-data="xAxis2Data"
            singley-axis-unit="单位：h"
            :title="{
              text:'等效小时分析',
              left:30,
              top:10
            }"
          >
            <template v-slot:header>
              <SearchEchart ref="search1" />
            </template>
          </Chart>
        </div>
      </div>
      <div class="main4">
        <div class="chart4">
          <Chart
            :data="chart1Data"
            :show-legend="true"

            :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
            singley-axis-unit="单位：kW"
            :title="{
              text:'弃量电光分析',
              left:30,
              top:10,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchNav'
import Chart from '@/components/Echarts/bar'
import { compareAnalysis, getTableList, equivalentHour } from '@/api/analysis/electricity'
import excel from '@/utils/excel'
import SearchEchart from '@/components/searchNav/echartSearch'
export default {
  components: {
    Chart,
    Search,
    SearchEchart
  },
  data() {
    return {
      chart1Data: [
        {
          name: '发电量',
          type: 'bar',
          data: []
        },

        {
          name: '计划上网电量',
          type: 'bar',
          data: []
        },
        {
          name: '上网电量',
          type: 'bar',
          data: []
        }
      ],
      xAxis1Data: [],
      chart2Data: [
        {
          name: '',
          type: 'line',
          data: []
        },
        {
          name: '',
          type: 'line',
          data: []
        }
      ],
      xAxis2Data: [],
      tableData: [
        { a: 2022, b: 22, c: 22, d: 22, e: 22, f: 22, g: 22, h: 22, i: 22, j: 22 },
        { a: 2023, b: 33, c: 33, d: 33, e: 33, f: 33, g: 33, h: 33, i: 33, j: 33 },
        { a: 2024, b: 44, c: 44, d: 44, e: 44, f: 44, g: 44, h: 44, i: 44, j: 44 },
        { a: 2025, b: 55, c: 55, d: 55, e: 55, f: 55, g: 55, h: 55, i: 55, j: 55 },
        { a: 2026, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2027, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2028, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 }
      ],
      tableList: {}
    }
  },

  created() {

  },

  methods: {

    // 电量对比分析
    async compare(params) {
      const { data } = await compareAnalysis(params)
      // 清空数据
      this.clearData(this.chart1Data, this.xAxis1Data)

      // 赋值
      for (var i1 in data.gmap) {
        this.chart1Data[0].data.push(data.gmap[i1])
      }
      for (var i2 in data.pMap) {
        this.chart1Data[1].data.push(data.pMap[i2])
      }
      for (var i3 in data.siMap) {
        this.chart1Data[2].data.push(data.siMap[i3])
      }
      // x轴
      for (var i4 in data.siMap) {
        this.xAxis1Data.push(i4)
      }
      console.log(data)
    },

    // 等效小时分析
    async hours(params) {
      const { data } = await equivalentHour(params)
      // 清空数据
      this.clearData(this.chart2Data, this.xAxis2Data)
      // 今年
      for (var i1 in data.oneMap) {
        this.chart2Data[0].data.push(data.oneMap[i1])
      }
      // 对比年
      for (var i2 in data.twoMap) {
        this.chart2Data[1].data.push(data.twoMap[i2] ? data.twoMap[i2] : 0)
      }
      if (params.type === 3) { // 类比
        this.chart2Data[0].name = data.oneName
        this.chart2Data[1].name = data.twoName
      } else {
        this.chart2Data[0].name = params.startTime
        this.chart2Data[1].name = params.endTime ? params.endTime : (params.startTime - 1).toString()
      }
      // // x轴
      for (var i3 in data.twoMap) {
        this.xAxis2Data.push(i3)
      }
    },

    // 表格数据
    async getTable(params) {
      const { data } = await getTableList(params)
      this.tableList = data
      console.log(this.tableList)
    },

    // 清空数据
    clearData(list, xAxis) {
      xAxis.length = 0
      list.forEach((item) => {
        item.data = []
      })
    },

    // 表格导出
    exportDataEvent() {
      excel('table', 1)
    },

    // 查询按钮
    getInfo() {
      var data1 = { ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.getTable(data1)
      this.compare(data1)
      var data2 = { ...this.$refs.search1.emitData, ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.hours(data2)
    },

    renderHeader(h, { column }, val) {
      return h('div', [h('div', column.label), h('span', `(${val})`)])
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    #box{
       .container{
           width:96%;
           margin:70px auto 20px;
            .main1{
                margin-top: 20px;
                border: 1px solid #D9D9D9;
                background: #fff;

                .title{
                    height:60px;
                    background: $blue;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .item .value{
                        color:white;
                        font-size: 18px;
                    }
                    .item .unit{
                        font-size: 12px;
                    }
                }
                .chart1{
                    height:380px;
                }
                .download{
                    width: 95%;
                    margin:20px auto;
                    text-align: right;
                    i{
                        cursor: pointer;
                    }
                }
                .el-table{
                  width: 95%;
                  margin:20px auto;
                    ::v-deep .cell{
                      position: relative;
                      .caret-wrapper{
                          position: absolute;
                          top: 8px;
                          right:5px
                      }
                  }
                  ::v-deep tr th:nth-of-type(1) .cell,
                  ::v-deep tr th:nth-of-type(8) .cell
                  {
                      .caret-wrapper{
                          top: -4px;
                      }
                  }
                }

            }
            // .main2{
            //     margin-top: 20px;
            //     padding:30px;
            //     border: 1px solid #D9D9D9;
            //     background: #fff;
            //     ::v-deep .cell{
            //         position: relative;
            //         .caret-wrapper{
            //             position: absolute;
            //             top: 8px;
            //             right:5px
            //         }
            //     }
            //      ::v-deep tr th:nth-of-type(1) .cell,
            //      ::v-deep tr th:nth-of-type(8) .cell
            //      {
            //         .caret-wrapper{
            //             top: -4px;
            //         }
            //     }
            // }
            .main3{
                 margin-top: 20px;
                 border: 1px solid #D9D9D9;
                 background: #fff;
                .chart3{
                    height:380px;
                }
            }
            .main4{
                 margin-top: 20px;
                 border: 1px solid #D9D9D9;
                 background: #fff;
                .chart4{
                    height:380px;
                }
            }
       }
    }

</style>
