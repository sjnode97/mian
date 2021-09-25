<template>
  <div class="left-container">
    <div class="icon-card card">
      <borderbox title="运行数据">
        <iconList :station-obj="stationObj" />
      </borderbox>
    </div>
    <div class="card">
      <div class="pie-card-check">
        <borderbox title="设备运行">
          <p class="pie-title">逆变器状态</p>
          <div style="width:100%;height: 39.5%">
            <indexPie :data="pieData" />
          </div>
          <p class="pie-title">支路离散率分布</p>
          <div style="width:100%;height: 39.5%">
            <indexPie :pie-num="1" :data="pieData2" />
          </div>
        </borderbox>
      </div>
      <div class="pie-card-card">
        <borderbox title="电站指标">
          <stationIndex />
        </borderbox>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import borderbox from '../../components/borderBox.vue'
import iconList from '../../components/iconList.vue'
import stationIndex from './stationIndex.vue'
import indexPie from '../../components/indexPie.vue'
import { overView1, overView2, overView3, inverterStatusChart, dispersionRateChart } from '@/api/index'
export default {
  name: 'Home',
  components: {
    borderbox,
    iconList,
    stationIndex,
    indexPie
  },
  data() {
    return {
      stationObj: [{
        icon: 'icon-power',
        name: '并网实时功率',
        value: 0,
        unit: 'MW'
      }, {
        icon: 'icon-pmark',
        name: '今日最大出力',
        value: 0,
        unit: 'MW'
      }, {
        icon: 'icon-fushe',
        name: '当前辐射强度',
        value: 0,
        unit: '座'
      }, {
        icon: 'icon-radiation',
        name: '月辐射量',
        value: 0,
        unit: 'MW'
      },
      {
        icon: 'icon-monthele',
        name: '本月计划上网电量',
        value: 0,
        unit: '座'
      }, {
        icon: 'icon-yearele',
        name: '本年计划上网电量',
        value: 0,
        unit: 'MW'
      }, {
        icon: 'icon-listdian',
        name: '累计上网电量',
        value: 0,
        unit: '万kWh'
      }, {
        icon: 'icon-biaozhunmei',
        name: '累计节约标准煤量',
        value: 0,
        unit: '万tce'
      }, {
        icon: 'icon-co2',
        name: '累计减排二氧化碳',
        value: 0,
        unit: '万吨'
      }, {
        icon: 'icon-tree',
        name: '等效植树',
        value: 0,
        unit: '棵'
      }],
      pieData: [],
      pieData2: [],
      keyName: {
        'val1': '0-5%',
        'val2': '5%-10%',
        'val3': '10%-20%',
        'val4': '20%'
      }
    }
  },
  computed: {
    ...mapGetters([
      'station',
      'city'
    ])
  },
  mounted() {
    this.getData()
    this.getData2()
    this.getData3()
    this.inverterStatusChart()
    this.dispersionRateChart()
  },
  methods: {
    // 电站概况1
    async getData() {
      await overView1({ powerStationId: this.station }).then(({ data }) => {
        this.stationObj[0].value = data.val1.val1
        this.stationObj[1].value = data.val1.val2
        this.stationObj[0].unit = data.val1.unit
        this.stationObj[1].unit = data.val1.unit2
        this.stationObj[2].value = data.val2.val1
        this.stationObj[3].value = data.val2.val2
        this.stationObj[2].unit = data.val2.unit
        this.stationObj[3].unit = data.val2.unit2
      })
    },
    // 电站概况2
    async getData2() {
      await overView2({ powerStationId: this.station }).then(({ data }) => {
        this.stationObj[4].value = data.val1
        this.stationObj[5].value = data.val2
        this.stationObj[4].unit = data.unit
        this.stationObj[5].unit = data.unit2
      })
    },
    // 电站概况3
    async getData3() {
      await overView3({ powerStationId: this.station }).then(({ data }) => {
        this.stationObj[6].value = data.val
        this.stationObj[6].unit = data.unit
        this.stationObj[7].value = data.standardCoalVal
        this.stationObj[7].unit = data.standardCoalUnit
        this.stationObj[8].value = data.carbonDivisorVal
        this.stationObj[8].unit = data.carbonDivisorUnit
        this.stationObj[9].value = data.treeVal
      })
    },
    // 逆变器
    async inverterStatusChart() {
      await inverterStatusChart({ powerStationId: this.station }).then(({ data }) => {
        this.pieData = this.fmtData(data)
      })
    },
    // 支路离散率
    async dispersionRateChart() {
      await dispersionRateChart({ powerStationId: this.station }).then(({ data }) => {
        this.pieData2 = this.fmtData(data)
      })
    },
    // 处理数据 逆变器/支路离散率
    fmtData(data) {
      const tempList = []
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const ele = data[key]
          tempList.push({
            name: this.keyName[key],
            value: ele
          })
        }
      }
      return tempList
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.left-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  .card{
    width: 44%;
    .pie-card-card {
    width: 100%;
    margin-top: 0%;
    height: 50%;
    }
    .pie-card-check{
      width: 100%;
      height: 50%;

      .pie-title {
        font-size: $menu-font-size;
        text-align: center;
        margin: 5px;
        color: $green-font-color;
      }
    }
  }
  .icon-card{
    width: 56%;
    height: 100%;
  }
}
</style>
