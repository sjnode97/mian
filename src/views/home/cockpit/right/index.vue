<template>
  <div class="right-container">
    <div class="fst-bar right-bar">
      <borderbox title="本月上网电量">
        <LineChart
          :chart-data="barMonthData"
          :chart-type="chartTypeTop"
          :x-axis-data="xAxisMonthData"
          :legend-data="legendMonthData"
        />
      </borderbox>
    </div>
    <div class="snd-bar right-bar">
      <borderbox title="本年上网电量">
        <LineChart
          :chart-data="barYearData"
          :chart-type="chartType"
          :x-axis-data="xAxisYearData"
          :legend-data="legendYearData"
        />
      </borderbox>
    </div>
    <div class="trd-bar right-bar">
      <borderbox title="电站排名">
        <el-radio-group v-model="powerType" class="btnGroup" @change="powerTypeBtn">
          <el-radio-button :value="1" label="综合效率" />
          <el-radio-button :value="2" label="等效小时" />
        </el-radio-group>
        <div class="sortBox">
          <el-tooltip class="item" effect="dark" :content="tips" placement="right">
            <div class="left" @click="sortLeft">
              <i class="el-icon-d-caret" />
            </div>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" :content="tips" placement="left">
            <div class="right" @click="sortRight">
              <i class="el-icon-d-caret" />
            </div>
          </el-tooltip>
        </div>
        <doubleBar
          :config="{yAxisData, val1Data, val2Data, maxData, legendname}"
        />
      </borderbox>
    </div>
  </div>
</template>

<script>
import borderbox from '../../components/borderBox.vue'
import doubleBar from '../../components/doubleBar.vue'
import LineChart from '../../components/LineChart.vue'
import { dayOrMonth, overallEfficiency, equivalentHours } from '@/api/cockpit'
export default {
  name: 'Home',
  components: {
    borderbox,
    doubleBar,
    LineChart
  },
  data() {
    return {
      // 电站排名数据
      yAxisData: ['电站1', '电站2', '电站3', '电站4', '电站5'],
      val1Data: [],
      val2Data: [],
      maxData: [], // 柱子背景
      powerType: '综合效率',
      sortleft: true,
      sortright: true,
      tips: '从高到低排序',
      // 本月/年上网电量
      barMonthData: { oneData: [120, 114, 154, 124, 272, 114, 154] },
      barYearData: {
        oneData: [120, 114, 154, 124, 272, 114, 154],
        twoData: [120, 124, 134, 164, 232, 124, 272]
      },
      xAxisMonthData: [1, 2, 3, 4, 5, 6, 7],
      xAxisYearData: [1, 2, 3, 4, 5, 6, 7],
      legendMonthData: ['本年'],
      legendYearData: ['本年', '去年'],
      chartType: ['bar', 'bar'],
      chartTypeTop: ['bar'],
      legendname: ['综合能效', '综合厂用电率']
    }
  },
  mounted() {
    this.getData()
    this.getPowerEfficiencyData(1)
    this.getPowerHoursData()
  },
  methods: {
    powerTypeBtn() {
      if (this.powerType === '综合效率') {
        this.getPowerEfficiencyData(1)
        this.sortleft = true
        this.sortright = true
        this.legendname = ['综合能效', '综合厂用电率']
      } else {
        this.getPowerHoursData(1)
        this.sortleft = true
        this.sortright = true
        this.legendname = ['年等效小时', '本年上网电量']
      }
    },
    sortLeft() {
      this.sortleft = !this.sortleft
      this.tips = this.sortleft ? '从高到低排序' : '从低到高排序'
      if (this.powerType === '综合效率') {
        this.getPowerEfficiencyData(this.sortleft ? 1 : 2)
      } else {
        this.getPowerHoursData(this.sortleft ? 1 : 2)
      }
    },
    sortRight() {
      this.sortright = !this.sortright
      this.tips = this.sortright ? '从高到低排序' : '从低到高排序'
      if (this.powerType === '综合效率') {
        this.getPowerEfficiencyData(this.sortright ? 3 : 4)
      } else {
        this.getPowerHoursData(this.sortright ? 3 : 4)
      }
    },
    btnChange(e) {
      e.target.classList.add('active')
      e.target.previousSibling && e.target.previousSibling.classList.remove('active')
      e.target.nextSibling && e.target.nextSibling.classList.remove('active')
      if (e.target.nextSibling) {
        // 日
        this.current = 0
      } else {
        // 月
        this.current = 1
      }
    },
    // 本月/年上网电量
    async getData() {
      await dayOrMonth().then(({ data }) => {
        const dayData = []
        const dayTime = []
        const monthData = []
        const lastMonthData = []
        const monthTime = []
        data?.day.forEach(ele => {
          dayData.push([ele.time, ele.val])
          dayTime.push(ele.time)
        })
        data?.month.forEach(ele => {
          monthData.push([ele.time, ele.val])
          monthTime.push(ele.time)
          lastMonthData.push([ele.time, ele.lastVal])
        })
        this.barMonthData.oneData = dayData
        this.xAxisMonthData = dayTime
        this.barYearData.oneData = monthData
        this.barYearData.twoData = lastMonthData
        this.xAxisYearData = monthTime
      })
    },
    // 电站排名-综合效率
    async getPowerEfficiencyData(sort) {
      await overallEfficiency({ sort }).then(({ data }) => {
        const names = []; const val1 = []; const val2 = []
        data.forEach(ele => {
          names.push(ele.name)
          val1.push(+ele.val1)
          val2.push(+ele.val2)
        })
        // 最大值填充背景
        const max = Math.max(...val2) > Math.max(...val1) ? Math.max(...val2) : Math.max(...val1)
        // 小于10个数据时填充空值，使数据显示集中
        let emptyName = []
        if (names.length < 10) {
          emptyName = new Array(10 - names.length).fill('')
        }
        this.yAxisData = [...names, ...emptyName]
        this.val1Data = val1
        this.val2Data = val2
        this.maxData = val1.map(() => { return max + max * 0.35 })
      })
    },
    // 电站排名-等效小时
    async getPowerHoursData(sort) {
      await equivalentHours({ sort }).then(({ data }) => {
        const names = []; const val1 = []; const val2 = []
        data.forEach(ele => {
          names.push(ele.name)
          val1.push(+ele.val1)
          val2.push(+ele.val2)
        })
        // 最大值填充背景
        const max = Math.max(...val2) > Math.max(...val1) ? Math.max(...val2) : Math.max(...val1)
        // 小于10个数据时填充空值，使数据显示集中
        let emptyName = []
        if (names.length < 10) {
          emptyName = new Array(10 - names.length).fill('')
        }
        this.yAxisData = [...names, ...emptyName]
        this.val1Data = val1
        this.val2Data = val2
        this.maxData = val1.map(() => { return max + max * 0.35 })
      })
    }

  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.right-container {
  width: 100%;
  height: 100%;
  .fst-bar {
    height: 22%;
    // background: $bg-module;
  }
  .snd-bar {
    height: 23%;
    margin-top: 1%;
  }
  .trd-bar {
    height: 55%;
    margin-top: 1%;
    .btnGroup {
      position: absolute;
      top: -32px;
      right: 25px;
      // background: #4caf50;
      ::v-deep {
        .el-radio-button {
          width: 80px;
          height: 25px;
          margin: 0;
          padding: 0;
          border-radius: 0;
          font-size: $icon-font-size;
          background: transparent;

          .el-radio-button__orig-radio + .el-radio-button__inner {
            width: 100%;
            padding: 5px!important;
            background: transparent!important;
            font-size: $icon-font-size!important;
            border-radius: 0!important;
            border:1px solid #3c607f;
            color: $num-font-color;
          }
            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
              background: $num-font-color!important;
              color: #fff;
              border:1px solid $num-font-color;
            }
        }
      }
    }
    .sortBox {
      .left,
      .right {
        position: absolute;
        top: 15px;
        z-index: 1;
        font-size: 18px;
        transform: scale(1, 1.8);
        &:hover {
          color: #4caf50;
        }
      }
      .left {
        left: 5px;
        color: #4ce4e9;
      }
      .right {
        right: 5px;
        color: #fdd947;
      }
    }
  }
}
</style>
