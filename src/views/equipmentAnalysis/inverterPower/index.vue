<template>
  <div id="box">
    <Search time="date" :show-station="false" @Info="getInfo" />
    <div class="container">
      <div class="main2">
        <div class="titleBox">
          <div class="tableTitle-device">
            <span>全部电站逆变器功率离散率分布</span>
            <com-search
              :show-station="false"
              :show-date="false"
              @FormData="getFormData"
            />
          </div>
          <div class="download">
            <i class="iconfont icon-xiazai" @click="exportDataEvent" />
          </div>
        </div>
        <equipmentTable :databases="databases" :table-name="tableName" />
        <intro />
      </div>
      <div class="main2">
        <div class="titleBox">
          <div class="tableTitle-device">
            <span>电站逆变器功率离散率分布</span>
            <com-search :show-station="true" @FormData="getFormData" />
          </div>
          <div class="download">
            <i class="iconfont icon-xiazai" @click="exportDataEvent" />
          </div>
        </div>
        <equipmentTable :databases="databases2" />
        <intro :show-des="true" />
      </div>
      <div class="main3">
        <div class="chart3">
          <Chart
            :data="chartData"
            :x-axis-data="xAxisData"
            :show-legend="true"
            :singley-axis-unit="unit"
            :grid="{ x: 80, y: 70, x2: 80, y2: 35 }"
            :title="{
              text: '等效小时分析',
              left: '30px',
              top: '10px',
            }"
          >
            <template v-slot:header>
              <com-search :show-date="false" @FormData="getFormData" />
            </template>
          </Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import excel from '@/utils/excel'
import { parseTime, uniqueArr } from '@/utils'
import Search from '@/components/searchNav'
import Chart from '@/components/Echarts/bar'
import equipmentTable from '../component/equipmentTable'
import comSearch from '../component/search'
import intro from '../component/intro'
import { stationList } from '@/api/common'
import { allIvtPower, singleIvtPower, acPowerAnalysis } from '@/api/equipmentAnalysis'
export default {
  components: {
    Chart,
    Search,
    equipmentTable,
    comSearch,
    intro
  },
  data() {
    return {
      chartData: [
        {
          name: '2020',
          type: 'line',
          data: [
            2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2
          ]
        },
        {
          name: '2021',
          type: 'line',
          data: [
            2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
          ]
        }
      ],
      lineXAxis: [],
      lineData: [],
      xAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      unit: '单位：h',
      tableData: [],
      timeTop: ['08:00', '17:00'],
      startTime: parseTime(new Date(), '{y}-{m}-{d}'),
      dataRange: [
        parseTime(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1
          ),
          '{y}-{m}-{d}'
        ),
        parseTime(new Date(), '{y}-{m}-{d}')
      ],
      timeRange: ['08:00', '17:00'],
      tableName: '电站名称',
      databases: [],
      databases2: [],
      dataLine: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      powerStationId: '',
      selectName: []
    }
  },

  async created() {
    await this.getStationList()

    this.getAllIntever()
    this.getIntever()
  },

  methods: {
    getInfo(val) {
      this.startTime = val.startTime
      this.getAllIntever()
      this.getInteverLine()
    },
    getFormData(val) {
      console.warn(val)
      this.timeRange = val.timeRange
      if (val.showStation) {
        this.powerStationId = val.powerStationId
        if (val.showDate) {
          this.dataRange = val.dataRange
          this.getIntever()
        } else {
          this.getInteverLine()
        }
      } else {
        this.getAllIntever()
      }
    },
    async getStationList() {
      const { data } = await stationList()
      this.selectName = data
      this.powerStationId = data[0].id
    },
    async getAllIntever() {
      const day = this.startTime
      const start = this.timeRange[0]
      const end = this.timeRange[1]
      await allIvtPower({ day, start, end })
        .then(({ data }) => {
          this.databases = data
        })
        .catch((rej) => {
          this.databases = []
        })
    },
    async getIntever() {
      const powerId = this.powerStationId
      const dayStart = this.dataRange[0]
      const dayEnd = this.dataRange[1]
      const minuteStart = this.timeRange[0]
      const minuteEnd = this.timeRange[1]
      await singleIvtPower({
        powerId,
        dayStart,
        dayEnd,
        minuteStart,
        minuteEnd
      })
        .then(({ data }) => {
          this.databases2 = data
        })
        .catch((rej) => {
          this.databases2 = []
        })
    },
    async getInteverLine() {
      const powerId = this.powerStationId
      const day = this.startTime
      const start = this.timeRange[0]
      const end = this.timeRange[1]
      await acPowerAnalysis({
        powerId,
        day,
        start,
        end
      })
        .then(({ data }) => {
          this.dataLine = data
          this.fmtData()
        })
        .catch((rej) => {
          this.dataLine = []
        })
    },
    fmtData() {
      let tempXAxis = []
      const dataList = this.dataLine.map((item, i) => {
        tempXAxis = [...tempXAxis, ...(Object.keys(item.map))]
        const obj = item
        obj.type = 'line'
        this.unit = '单位：' + (obj.unit || '')
        const dataQ = Object.values(item.map)
        obj.data = dataQ
        delete obj.map
        return obj
      })
      this.chartData = dataList
      this.xAxisData = uniqueArr(tempXAxis)
    },
    exportDataEvent() {
      excel('table', 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
#box {
  .container {
    width: 96%;
    margin: 70px auto 20px;
    .main2 {
      margin-top: 20px;
      padding: 12px;
      border: 1px solid #d9d9d9;
      background: #fff;
      .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          color: $blue;
        }
      }
      ::v-deep .cell {
        position: relative;
        .caret-wrapper {
          position: absolute;
          top: 8px;
          right: 5px;
        }
      }
      ::v-deep tr th:nth-of-type(1) .cell,
      ::v-deep tr th:nth-of-type(8) .cell {
        .caret-wrapper {
          top: -4px;
        }
      }
    }
    .main3 {
      margin-top: 20px;
      border: 1px solid #d9d9d9;
      background: #fff;
      .chart3 {
        height: 380px;
      }
    }
    .main4 {
      margin-top: 20px;
      border: 1px solid #d9d9d9;
      background: #fff;
      .chart4 {
        height: 380px;
      }
    }
    .search {
      margin-left: 30px;
      font-size: 15px;
      color: $black-dark;
    }
    ::v-deep {
      .el-date-editor--timerange.el-input,
      .el-date-editor--timerange.el-input__inner {
        width: 160px;
      }
      .el-date-editor--daterange.el-input,
      .el-date-editor--daterange.el-input__inner {
        width: 260px;
      }
    }
  }
}
</style>
