<template>
  <div id="box">
    <Search time="year" @Info="getInfo" />
    <div class="container">
      <div class="main1">
        <div class="title">
          <div class="item">
            年等效小时：
            <span class="value">5519 <span class="unit">h</span></span>
          </div>
          <div class="item">
            年累计上网量：
            <span class="value">1234564 <span class="unit">万kWh</span></span>
          </div>
          <div class="item">
            年累计发电量：
            <span class="value">1234564 <span class="unit">万kWh</span></span>
          </div>
          <div class="item">
            年累计完成率：
            <span class="value">83.56 <span class="unit">%</span></span>
          </div>
        </div>
        <div class="chart1">
          <Chart
            :data="chart1Data"
            :show-legend="true"

            :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
            singley-axis-unit="单位：kW"
            :grid="{x:80,y:70,x2:80,y2:45}"
            :title="{
              text:'电量对比分析',
              left:'30px',
              top:'10px',
            }"
          />
        </div>
      </div>
      <div class="main2">
        <el-table
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
            :render-header="(h,obj) => renderHeader(h,obj,'MJ/m³')"
            sortable
          />
        </el-table>
      </div>
      <div class="main3">
        <div class="chart3">
          <Chart
            :data="chart2Data"
            :show-legend="true"
            singley-axis-unit="单位：h"
            :grid="{x:80,y:70,x2:80,y2:35}"
            :title="{
              text:'等效小时分析',
              left:'30px',
              top:'10px'
            }"
          >
            <template v-slot:header>
              <h1>插槽内容</h1>
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
            :grid="{x:80,y:70,x2:80,y2:45}"
            :title="{
              text:'弃量电光分析',
              left:'30px',
              top:'10px',
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
export default {
  components: {
    Chart,
    Search
  },
  data() {
    return {
      chart1Data: [
        {
          name: '发电量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },

        {
          name: '计划上网电量',
          type: 'bar',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        },
        {
          name: '上网电量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      ],
      chart2Data: [
        {
          name: '2020',
          type: 'line',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        },
        {
          name: '2021',
          type: 'line',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      ],
      tableData: [
        { a: 2022, b: 22, c: 22, d: 22, e: 22, f: 22, g: 22, h: 22, i: 22, j: 22 },
        { a: 2023, b: 33, c: 33, d: 33, e: 33, f: 33, g: 33, h: 33, i: 33, j: 33 },
        { a: 2024, b: 44, c: 44, d: 44, e: 44, f: 44, g: 44, h: 44, i: 44, j: 44 },
        { a: 2025, b: 55, c: 55, d: 55, e: 55, f: 55, g: 55, h: 55, i: 55, j: 55 },
        { a: 2026, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2027, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2028, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 }
      ]
    }
  },

  created() {

  },

  methods: {
    getInfo(val) {
      console.log(val)
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
            }
            .main2{
                margin-top: 20px;
                padding:30px;
                border: 1px solid #D9D9D9;
                background: #fff;
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
