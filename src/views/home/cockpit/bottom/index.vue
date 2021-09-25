<template>
  <div class="bottom-container">
    <div class="alarm">
      <borderbox title="告警统计">
        <pieCard :alarm="true" style="margin-top: 20px;" />
      </borderbox>
    </div>
    <div class="alarmTable">
      <borderbox title="告警表格">
        <alarmTable />
      </borderbox>
    </div>
    <div class="power">
      <borderbox title="功率">
        <LineChart
          :chart-data="barData"
          :x-axis-data="xAxisData"
          :color="colorList"
          :unit="unit"
          :legend-data="legendData"
        />
      </borderbox>
    </div>
  </div>
</template>

<script>
import borderbox from '../../components/borderBox.vue'
import pieCard from '../../components/pieCard.vue'
import LineChart from '../../components/LineChart.vue'
import alarmTable from '../../components/table.vue'
import { onGridPower } from '@/api/cockpit'
export default {
  name: 'Bottom',
  components: {
    borderbox,
    pieCard,
    LineChart,
    alarmTable
  },
  data() {
    return {
      barData: {
        oneData: [0, 0, 0, 0, 0, 0, 0]
      },
      xAxisData: [0, 0, 0, 0, 0, 0, 0],
      unit: 'kW',
      legendData: ['功率'],
      colorList: [2],
      mTime: 0
    }
  },
  mounted() {
    this.getData()
    this.mTime = setInterval(() => { this.getData() }, 1000 * 60)
  },
  beforeDestroy() {
    clearInterval(this.mTime)
  },
  methods: {
    async getData() {
      await onGridPower().then(({ data }) => {
        const list = data.map
        this.barData.oneData = Object.values(list)
        this.xAxisData = Object.keys(list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.bottom-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  .alarm {
    width: 18%;
    height: 100%;
  }
  .alarmTable {
    width: 43%;
    height: 100%;
  }
  .power {
    width: 39%;
    height: 100%;
  }
}
</style>
