<template>
  <div id="box">
    <Search ref="topSearch" time="year" @Info="getInfo" />
    <div class="container">
      <div class="main1">
        <div class="title">
          <div class="item">
            年综合效率：
            <span class="value">{{ obj1.efficiency||"-" }}<span class="unit" /></span>
          </div>
          <div class="item">
            本年最大出力：
            <span class="value">{{ obj3.maximumOutput||"-" }} <span class="unit">kw</span></span>
          </div>
          <div class="item">
            光伏方阵年均效率：
            <span class="value">{{ VoltaicData||"-" }} <span class="unit">%</span></span>
          </div>
        </div>
        <div class="chart1">
          <Chart
            :data="chart1Data"
            :show-legend="true"
            :is-double-y="true"
            :x-axis-data="xAxis1Data"
            :doubley-axis="[
              { name: '单位：kWH' },
              { name: '%' }
            ]"
            :title="{
              text:'电量对比分析',
              left:30,
              top:10,
            }"
          />
        </div>
      </div>
      <div class="main2">
        <div class="chart2">
          <Chart
            :data="chart2Data"
            :show-legend="true"
            :x-axis-data="xAxis2Data"
            :title="{
              text:'综合效率分析',
              left:30,
              top:10
            }"
          >
            <template v-slot:header>
              <SearchEchart ref="search1" @emitEchart="convertParams1" />
            </template>
          </Chart>
        </div>
      </div>
      <div class="main3">
        <div class="chart3">
          <Chart
            :data="chart3Data"
            :show-legend="true"
            :x-axis-data="xAxis3Data"
            singley-axis-unit="单位：kW"
            :title="{
              text:'最大出力分析',
              left:30,
              top:10
            }"
          >
            <template v-slot:header>
              <SearchEchart ref="search2" />
            </template>
          </Chart>
        </div>
      </div>
      <div class="main4">
        <div class="chart4">
          <Chart
            :data="chart4Data"
            :show-legend="true"
            :x-axis-data="xAxis4Data"
            singley-axis-unit="单位：%"
            :title="{
              text:'光伏方阵效率分析',
              left:30,
              top:10
            }"
          >
            <template v-slot:header>
              <SearchEchart ref="search3" />
            </template>
          </Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchNav'
import Chart from '@/components/Echarts/bar'
import SearchEchart from '@/components/searchNav/echartSearch'
import { electricCompare, efficiency, maxPower, photovoltaic, comprehensive } from '@/api/analysis/powerStation'
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
          name: '上网电量',
          type: 'bar',
          data: []
        },
        {
          name: '理论发电量',
          type: 'bar',
          data: []
        },

        {
          name: '综合效率',
          type: 'line',
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
      chart3Data: [
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
      xAxis3Data: [],
      chart4Data: [
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
      xAxis4Data: [],
      // 电量对比分析
      obj1: {},
      // 综合效率分析
      obj2: {},
      // 最大出力
      obj3: {},
      // 光伏方阵效率分析
      obj4: {},
      // 光伏方阵年均效率
      VoltaicData: ''
    }
  },
  created() {

  },
  methods: {
    // 电量对比分析
    async batterCompare(params) {
      const { data } = await electricCompare(params)
      this.obj1 = data
      // 清空数据
      this.clearData(this.chart1Data, this.xAxis1Data)
      // 赋值
      for (var i1 in this.obj1.mapOne) {
        this.chart1Data[0].data.push(this.obj1.mapOne[i1])
      }
      for (var i2 in this.obj1.mapTwo) {
        this.chart1Data[1].data.push(this.obj1.mapTwo[i2])
      }
      for (var i3 in this.obj1.efficiencyMap) {
        this.chart1Data[2].data.push(this.obj1.efficiencyMap[i3])
      }
      // x轴
      for (var i4 in this.obj1.efficiencyMap) {
        this.xAxis1Data.push(i4)
      }
    },

    // 综合效率分析
    async efficiencyAnalysis(params) {
      const { data } = await efficiency(params)
      this.obj2 = data
      // 清空数据
      this.clearData(this.chart2Data, this.xAxis2Data)
      // 今年
      for (var i1 in this.obj2.mapOne) {
        this.chart2Data[0].data.push(this.obj2.mapOne[i1])
      }
      // 对比年
      for (var i2 in this.obj2.mapTwo) {
        this.chart2Data[1].data.push(this.obj2.mapTwo[i2])
      }
      if (params.type === 3) { // 类比
        this.chart2Data[0].name = data.oneName
        this.chart2Data[1].name = data.twoName
      } else {
        this.chart2Data[0].name = params.startTime
        this.chart2Data[1].name = params.endTime ? params.endTime : (params.startTime - 1).toString()
      }
      // x轴
      for (var i3 in this.obj2.mapTwo) {
        this.xAxis2Data.push(i3)
      }
      console.log(this.chart2Data)
    },

    // 最大出力分析
    async maxAnalysis(params) {
      const { data } = await maxPower(params)
      this.obj3 = data
      // 清空数据
      this.clearData(this.chart3Data, this.xAxis3Data)
      // 今年
      for (var i1 in this.obj3.mapOne) {
        this.chart3Data[0].data.push(this.obj3.mapOne[i1])
      }
      // 对比年
      for (var i2 in this.obj3.mapTwo) {
        this.chart3Data[1].data.push(this.obj3.mapTwo[i2])
      }
      if (params.type === 3) { // 类比
        this.chart3Data[0].name = data.oneName
        this.chart3Data[1].name = data.twoName
      } else {
        this.chart3Data[0].name = params.startTime
        this.chart3Data[1].name = params.endTime ? params.endTime : (params.startTime - 1).toString()
      }
      // x轴
      for (var i3 in this.obj3.mapTwo) {
        this.xAxis3Data.push(i3)
      }
    },

    // 光伏方阵效率分析
    async photovoltaicAnalysis(params) {
      const { data } = await photovoltaic(params)
      this.obj4 = data
      // 清空数据
      this.clearData(this.chart4Data, this.xAxis4Data)
      // 今年
      for (var i1 in this.obj4.mapOne) {
        this.chart4Data[0].data.push(this.obj4.mapOne[i1])
      }
      // 对比年
      for (var i2 in this.obj4.mapTwo) {
        this.chart4Data[1].data.push(this.obj4.mapTwo[i2])
      }
      if (params.type === 3) { // 类比
        this.chart4Data[0].name = data.oneName
        this.chart4Data[1].name = data.twoName
      } else {
        this.chart4Data[0].name = params.startTime
        this.chart4Data[1].name = params.endTime ? params.endTime : (params.startTime - 1).toString()
      }
      // x轴
      for (var i3 in this.obj4.mapTwo) {
        this.xAxis4Data.push(i3)
      }
    },

    // 光伏方阵年均效率 (顶部数据)
    async topVoltaic(params) {
      const { data } = await comprehensive(params)
      this.VoltaicData = data
    },

    // 查询按钮
    getInfo(val) {
      console.log(val)
      // 电量对比分析
      var data1 = { ...val, tType: 'yyyy' }
      this.batterCompare(data1)
      // 综合效率分析
      var data2 = { ...this.$refs.search1.emitData, ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.efficiencyAnalysis(data2)
      // 最大出力分析
      var data3 = { ...this.$refs.search2.emitData, ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.maxAnalysis(data3)
      // 光伏方阵效率分析
      var data4 = { ...this.$refs.search3.emitData, ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.photovoltaicAnalysis(data4)
      // 光伏方阵年均效率 (顶部数据)
      var data5 = { ...this.$refs.topSearch.form, tType: 'yyyy' }
      this.topVoltaic(data5)
    },

    // 清空数据
    clearData(list, xAxis) {
      xAxis.length = 0
      list.forEach((item) => {
        item.data = []
      })
    },

    test(v) {

    },
    convertParams1(v) {
      // this.obj2Form = JSON.parse(JSON.stringify(v))
      // var params={...this.obj2Form,}
      // console.log(this.obj2Form)
      console.log(this.$refs.topSearch.form)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    #box{
        .container{
            width: 96%;
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
                .chart2{
                    height:380px;
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
