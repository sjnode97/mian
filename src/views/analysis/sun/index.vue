<template>
  <div id="box">
    <Search time="month" @Info="getInfo" />
    <div class="container">
      <div class="main1">
        <div class="title">
          <div class="item">
            年累计辐照量：
            <span class="value">5519 <span class="unit">MJ/²</span></span>
          </div>
          <div class="item">
            月辐照量：
            <span class="value">1234564 <span class="unit">MJ/²</span></span>
          </div>
          <div class="item">
            日辐照量：
            <span class="value">1234564 <span class="unit">MJ/²</span></span>
          </div>
        </div>
        <div class="chart1">
          <Chart
            :data="chartData"
            :show-legend="true"
            :is-double-y="true"
            :doubley-axis="[
              { name: '单位：MJ/m平方' },
              { name: '单位：kWh' }
            ]"
            :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
            :grid="{x:80,y:70,x2:80,y2:45}"
            :title="{
              text:'用电量',
              left:30,
              top:10
            }"
          >
            <template v-slot:header>
              <h1 style="font-size:26px">插槽内容</h1>
            </template>
          </Chart>
        </div>
      </div>
      <div class="main2">
        <div class="item">
          <Chart
            :data="chartData1"
            singley-axis-unit="单位：%"
            :x-axis-data="['0-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '900-1000', '1000-1100', '1100以上']"
            :grid="{x:80,y:70,x2:80,y2:45}"
            :color="['#FAC858']"
            x-axis-unit="W/m²"
            :title="{
              text:'太阳能资源分布图',
              left:30,
              top:10
            }"
          />
        </div>
        <div class="item">
          <div class="title">太阳能资源分析表</div>
          <div class="download">
            <i class="iconfont icon-xiazai" @click="exportDataEvent" />
          </div>
          <el-table
            id="table"
            :data="tableData"
            border
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column
              prop="a"
              label="瞬时辐照度区间（W/m²）"
              sortable
            />
            <el-table-column
              prop="b"
              label="辐照量（MJ/m²）"
              sortable
            />
            <el-table-column
              prop="c"
              label="占比（%）"
              sortable
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchNav'
import Chart from '@/components/Echarts/bar'
import excel from '@/utils/excel'
export default {
  components: {
    Search,
    Chart
  },
  data() {
    return {
      chartData: [
        {
          name: '2020',
          type: 'bar',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        },
        {
          name: '2021',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: '2021年发电量',
          type: 'line',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }
      ],
      chartData1: [
        {
          name: '2020',
          type: 'bar',
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ],
      tableData: [
        { a: '0-100', b: 25.25, c: 14.54 },
        { a: '100-200', b: 25.25, c: 14.54 },
        { a: '200-300', b: 25.25, c: 14.54 },
        { a: '300-400', b: 25.25, c: 14.54 },
        { a: '400-500', b: 25.25, c: 14.54 },
        { a: '500-600', b: 25.25, c: 14.54 },
        { a: '600-700', b: 25.25, c: 14.54 },
        { a: '700-800', b: 25.25, c: 14.54 }
      ]
    }
  },

  created() {

  },

  methods: {
    getInfo(val) {

    },

    exportDataEvent() {
      excel('table', 1)
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
                border: 1px solid #D9D9D9;
                background: #fff;
                height:380px;
                display: flex;
                padding-right: 30px;
                justify-content: space-between;
                .item{
                    height: 380px;
                    width: 48%;
                    .title{
                         color: #1ec0ff;
                         font-weight: bold;
                         margin: 15px 0 5px 0;
                         font-size: 0.9rem;
                    }
                    .download{
                        text-align: right;
                        i{
                            cursor: pointer;
                        }
                    }
                }
                ::v-deep .el-table .el-table__body-wrapper{
                    max-height:235px;
                    overflow-y: scroll;
                }
            }
        }
    }

</style>
