<template>
  <div class="left-container">
    <div class="icon-card card">
      <borderbox title="电站概况">
        <iconList :station-obj="stationObj" />
      </borderbox>
    </div>
    <div class="pie-card-check card">
      <borderbox title="巡检任务">
        <pieCard />
      </borderbox>
    </div>
    <div class="icon-card-social card">
      <borderbox title="社会贡献">
        <iconList :station-obj="socialObj" />
      </borderbox>
    </div>
    <div class="pie-card-card card">
      <borderbox title="维修任务">
        <pieCard />
      </borderbox>
    </div>
  </div>
</template>

<script>
import borderbox from '../../components/borderBox.vue'
import iconList from '../../components/iconList.vue'
import pieCard from '../../components/pieCard.vue'
import { powerStation1, powerStation2, social } from '@/api/cockpit'
export default {
  name: 'Home',
  components: {
    borderbox,
    iconList,
    pieCard
  },
  data() {
    return {
      stationObj: [{
        icon: 'icon-dianzhan',
        name: '电站',
        value: 0,
        unit: '座'
      }, {
        icon: 'icon-zhuangji',
        name: '总装机容量',
        value: 0,
        unit: 'MW'
      }, {
        icon: 'icon-power',
        name: '当前并网功率',
        value: 0,
        unit: 'MW'
      }, {
        icon: 'icon-pmark',
        name: '今日最大出力',
        value: 0,
        unit: 'MW'
      }],
      socialObj: [{
        icon: 'icon-shandian1',
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
      }]
    }
  },
  mounted() {
    this.getData()
    this.getData2()
    this.getData3()
  },
  methods: {
    async getData() {
      // 电站概况1
      await powerStation1().then(({ data }) => {
        this.stationObj[0].value = data.val1
        this.stationObj[1].value = data.val2
      })
    },
    async getData2() {
      // 电站概况2
      await powerStation2().then(({ data }) => {
        this.stationObj[2].value = data.val1
        this.stationObj[3].value = data.val2
        this.stationObj[2].unit = data.unit
        this.stationObj[3].unit = data.unit
      })
    },
    async getData3() {
      // 社会贡献
      await social().then(({ data }) => {
        this.socialObj[0].value = data.val
        this.socialObj[0].unit = data.unit
        this.socialObj[1].value = data.standardCoalVal
        this.socialObj[1].unit = data.standardCoalUnit
        this.socialObj[2].value = data.carbonDivisorVal
        this.socialObj[2].unit = data.carbonDivisorUnit
        this.socialObj[3].value = data.treeVal
      })
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
    width: 50%;
  }
  .icon-card-social,
  .pie-card-card {
    margin-top: 10px;
  }
  .icon-card,
  .icon-card-social {
    width: 56%;
  }
  .pie-card-check,
  .pie-card-card {
    width: 44%;
  }
}
</style>
