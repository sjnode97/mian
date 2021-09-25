<template>
  <div id="box">
    <Search time="month" @Info="getInfo" />
    <div class="container">
      <div class="main1">
        <Border class="border" unit="kWh" num="882" @changeDataType="chageType($event,1)">
          <template v-slot:echarts>
            <div class="flexbox">
              <Circle1 class="pie" />
            </div>
          </template>
        </Border>
        <Border class="border" unit="kWh" num="1882" @changeDataType="chageType($event,2)">
          <template v-slot:echarts>
            <div class="flexbox">
              <Circle1 class="pie" />
            </div>
          </template>
        </Border>
        <Border class="border" unit="kg" num="88222" @changeDataType="chageType($event,3)">
          <template v-slot:echarts>
            <div class="flexbox">
              <Circle1 class="pie" />
              <Pie

                :pie-data="data"
                :radius="['55%', '90%']"
                class="pie"
              />
            </div>
          </template>
        </Border>
        <Border class="border" unit="kWh" num="3282" @changeDataType="chageType($event,4)">
          <template v-slot:echarts>
            <div class="flexbox">
              <Circle1 class="pie" />
            </div>
          </template>
        </Border>
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
            label="综合厂用电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="c"
            label="损耗电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="d"
            label="厂用电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="e"
            label="购网电量"
            :render-header="(h,obj) => renderHeader(h,obj,'kWh')"
            sortable
          />
          <el-table-column
            prop="f"
            label="综合厂用电率"
            :render-header="(h,obj) => renderHeader(h,obj,'%')"
            sortable
          />
          <el-table-column
            prop="g"
            label="厂损率"
            :render-header="(h,obj) => renderHeader(h,obj,'%')"
            sortable
          />
          <el-table-column
            prop="h"
            label="厂用电率"
            sortable
          />
          <el-table-column
            prop="i"
            label="购网电率"
            :render-header="(h,obj) => renderHeader(h,obj,'%')"
            sortable
          />
        </el-table>
      </div>
      <div class="main3">
        <Chart
          :data="chartData"
          :show-legend="true"
          singley-axis-unit="单位：kWh"
          :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
          :grid="{x:80,y:70,x2:80,y2:45}"
          :title="{
            text:'用电量',
            left:'30px',
            top:'10px'
          }"
        >
          <template v-slot:header>
            <h1>插槽内容</h1>
          </template>
        </Chart>
      </div>
      <div class="main4">
        <Chart
          :data="chart1Data"
          :show-legend="true"
          singley-axis-unit="单位：%"
          :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
          :grid="{x:80,y:70,x2:80,y2:45}"
          :title="{
            text:'用电率',
            left:'30px',
            top:'10px'
          }"
        >
          <template v-slot:header>
            <h1>插槽内容</h1>
          </template>
        </Chart>
      </div>
      <div class="main5">
        <Chart
          :data="chartData"
          :show-legend="true"
          singley-axis-unit="单位：kWh"
          :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']"
          :grid="{x:80,y:70,x2:80,y2:45}"
          :title="{
            text:'用电量',
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
  </div>
</template>

<script>
import Search from '@/components/searchNav'
import Border from '@/components/Card/border.vue'
import Pie from '@/components/Echarts/pie'
import Chart from '@/components/Echarts/bar'
import Circle1 from './components/pie.vue'
export default {
  components: {
    Search,
    Border,
    Pie,
    Chart,
    Circle1
  },
  data() {
    return {
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 680, name: '邮件营销' }
      ],
      tableData: [
        { a: 2022, b: 22, c: 22, d: 22, e: 22, f: 22, g: 22, h: 22, i: 22, j: 22 },
        { a: 2023, b: 33, c: 33, d: 33, e: 33, f: 33, g: 33, h: 33, i: 33, j: 33 },
        { a: 2024, b: 44, c: 44, d: 44, e: 44, f: 44, g: 44, h: 44, i: 44, j: 44 },
        { a: 2025, b: 55, c: 55, d: 55, e: 55, f: 55, g: 55, h: 55, i: 55, j: 55 },
        { a: 2026, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2027, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 },
        { a: 2028, b: 66, c: 66, d: 66, e: 66, f: 66, g: 66, h: 66, i: 66, j: 66 }
      ],
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
        }
      ],
      chart1Data: [
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
      ]
    }
  },

  created() {

  },

  methods: {
    getInfo() {

    },
    chageType(index, val) {
      console.log(index, val)
    },

    renderHeader(h, { column }, val) {
      return h('div', [h('div', column.label), h('span', `(${val})`)])
    }
  }
}
</script>

<style lang="scss" scoped>
    #box{
        .container{
            width:96%;
            margin:70px auto 20px;
            .main1{
                margin-top: 20px;
                border: 1px solid #D9D9D9;
                background: #fff;
                height: 350px;
                display: flex;
                .border{
                    width:22% ;
                    .flexbox{
                        display: flex;
                        justify-content: center;
                        .pie{
                            height: 165px;
                            width:33%;
                        }
                    }
                }
            }
            .main2{
                padding:30px;
                margin-top: 20px;
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
                ::v-deep tr th:nth-of-type(1) .cell
                 {
                    .caret-wrapper{
                        top: -4px;
                    }
                }

            }
            .main3,.main4,.main5{
                margin-top: 20px;
                border: 1px solid #D9D9D9;
                background: #fff;
                height:380px;
            }
        }
    }
</style>
