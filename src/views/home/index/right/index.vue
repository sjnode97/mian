<template>
  <div class="right-container">
    <div class="fst-bar right-bar">
      <borderbox title="上网电量">
        <div class="btnIcon" @click="iconBtn">
          <i class="iconfont icon-nian active " />
          <i class="iconfont icon-yue" />
        </div>
        <LineChart
          :chart-data="barData"
          :chart-type="chartTypeTop"
          :color="[2, 3]"
          :x-axis-data="xAxisData"
          :legend-data="legendDataTop"
          :height="'90%'"
        />
      </borderbox>
    </div>
    <div class="snd-bar right-bar">
      <borderbox title="综合效率">
        <LineChart
          :chart-data="barData"
          :chart-type="chartType"
          :color="[0,3]"
          :x-axis-data="xAxisData"
          :legend-data="legendData"
        />
      </borderbox>
    </div>
    <div class="trd-bar right-bar">
      <borderbox title="排名">
        <el-radio-group v-model="powerType" class="btnGroup" @change="powerTypeBtn">
          <el-radio-button :value="1" label="逆变器效率" />
          <el-radio-button :value="2" label="支路电流离散率" />
        </el-radio-group>
        <div class="sortBox">
          <el-tooltip class="item" effect="dark" :content="tips" placement="left">
            <div class="right" @click="sortRight">
              <i class="el-icon-d-caret" />
            </div>
          </el-tooltip>
        </div>
        <rightBar
          :y-axis-data="yAxisData"
          :valdata="valData"
          :max-data="maxData"
        />
      </borderbox>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import borderbox from '../../components/borderBox.vue'
import rightBar from '../../components/rightBar.vue'
import LineChart from '../../components/LineChart.vue'
import { internetPower, inverterRateSort, dispersionRateSort } from '@/api/index'
export default {
  name: 'Home',
  components: {
    borderbox,
    rightBar,
    LineChart
  },
  data() {
    return {
      data: [120, 114, 154, 124, 272, 114, 154],
      barData: {
        oneData: [120, 120, 120, 120, 120, 120, 120],
        twoData: [120, 120, 120, 120, 120, 120, 120]
      },
      chartType: ['line', 'line'],
      chartTypeTop: ['bar', 'line'],
      colorList: [2, 3],
      xAxisData: ['周一', '周二', '周三', '周四', '周五'],
      legendDataTop: ['上网电量', '理论发电量'],
      legendData: ['本年', '去年'],
      current: 1,
      powerType: '逆变器效率',
      sortright: true,
      tips: '从低到高排序',
      maxData: [],
      valData: [],
      yAxisData: [],
      name: []
    }
  },
  computed: {
    ...mapGetters([
      'station',
      'city'
    ])
  },
  mounted() {
    this.totalGet()
    this.getInverterData()
  },
  methods: {
    // 右上角上网电量
    async getData() {
      await internetPower({ powerStationId: this.station }).then(({ data }) => {
        const two = []; const time = []
        const one = data?.[this.current]?.map((item) => {
          two.push(item.lastVal)
          time.push(item.time)
          return item.val
        })
        this.barData.oneData = one
        this.barData.twoData = two
        this.xAxisData = time
      })
    },
    totalGet() {
      this.getData()
    },
    iconBtn(e) {
      e.target.classList.add('active')
      e.target.previousSibling && e.target.previousSibling.classList.remove('active')
      e.target.nextSibling && e.target.nextSibling.classList.remove('active')
      if (e.target.nextSibling) {
        // 年
        this.current = 1
      } else {
        // 月
        this.current = 0
      }
      this.totalGet()
    },
    powerTypeBtn() {
      if (this.powerType === '逆变器效率') {
        this.getInverterData(1)
        this.sortright = true
      } else {
        this.getDispersionData(1)
        this.sortright = true
      }
    },
    sortRight() {
      this.sortright = !this.sortright
      this.tips = this.sortright ? '从高到低排序' : '从低到高排序'
      if (this.powerType === '逆变器效率') {
        this.getInverterData(this.sortright ? 1 : 2)
      } else {
        this.getDispersionData(this.sortright ? 1 : 2)
      }
    },
    // 逆变器效率
    async getInverterData(sort) {
      await inverterRateSort({ powerStationId: this.station, sort }).then(({ data }) => {
        this.dataFmt(data)
      })
    },
    // 支路电流离散率
    async getDispersionData(sort) {
      await dispersionRateSort({ powerStationId: this.station, sort }).then(({ data }) => {
        this.dataFmt(data)
      })
    },
    dataFmt(data) {
      const names = []
      const val1 = []
      data.forEach(ele => {
        names.push(ele.name)
        val1.push(+ele.val1)
      })
      // 最大值填充背景
      const max = Math.max(...val1)
      // 小于10个数据时填充空值，使数据显示集中
      let emptyName = []
      if (names.length < 10) {
        emptyName = new Array(10 - names.length).fill('')
      }
      this.yAxisData = [...names, ...emptyName]
      this.valData = val1
      this.maxData = val1.map(() => { return max })
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
    .btnIcon{
      align-self: flex-start;
      flex: 1;
      text-align: left;
      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size: 28px;
        color: #fff;
      }
      .active {
        color: $num-font-color;
      }
    }
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
      right: 20px;
      // background: #4caf50;
      ::v-deep {
        .el-radio-button {
          width: 95px;
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
