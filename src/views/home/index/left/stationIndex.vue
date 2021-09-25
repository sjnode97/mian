<template>
  <div class="station-container">
    <div class="btnIcon" @click="iconBtn">
      <i class="iconfont icon-nian active " />
      <i class="iconfont icon-yue" />
    </div>
    <div class="pieWapper">
      <div class="pieBox">
        <span>等效小时</span>
        <span>{{ hour }} <span class="unit">{{ unit }}</span></span>
      </div>
      <div class="pieBox">
        <span>综合效率</span>
        <pie height="100%" width="50%" :only-num="true" :ratio="pieData" />
      </div>
      <div class="pieBox">
        <span>计划完成率</span>
        <pie height="100%" width="50%" :only-num="true" :ratio="pieData2" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pie from '../../components/pie.vue'
import { equivalentHours, planCompletionRate, overallEfficiency } from '@/api/index'
export default {
  name: 'Station',
  components: {
    pie
  },
  data() {
    return {
      current: 0,
      hour: 0,
      unit: 'h',
      pieData: '0',
      pieData2: '0'

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
  },
  methods: {
    // 电站指标-等效小时
    async getData() {
      await equivalentHours({ powerStationId: this.station, month: this.current }).then(({ data }) => {
        this.hour = data.val1
      })
    },
    // 电站指标-综合效率
    async getData2() {
      await overallEfficiency({ powerStationId: this.station, month: this.current }).then(({ data }) => {
        this.pieData = '' + data
      })
    },
    // 电站指标-计划完成率
    async getData3() {
      await planCompletionRate({ powerStationId: this.station, month: this.current }).then(({ data }) => {
        this.pieData2 = '' + data
      })
    },
    totalGet() {
      this.getData()
      this.getData2()
      this.getData3()
    },
    iconBtn(e) {
      e.target.classList.add('active')
      e.target.previousSibling && e.target.previousSibling.classList.remove('active')
      e.target.nextSibling && e.target.nextSibling.classList.remove('active')
      if (e.target.nextSibling) {
        // 年
        this.current = 0
      } else {
        // 月
        this.current = 1
      }
      this.totalGet()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.station-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 10px 10px;
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
  .pieWapper {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .pieBox {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      width: 100%;
      height: 88px;

      &:nth-child(1){
        height: 45px;
        span {
          line-height: 45px;
          &:nth-child(2) {
            text-align: center;
            color: $yellow;
            font-size: $numTitle-font-size;
            .unit {
              font-size: $unitTitle-font-size;
              color: $yellow;
            }
          }
        }
      }

      span {
        width: 50%;
        line-height: 90px;
        color: $green-font-color;
        font-size: $chartTableTitle-font-size;
      }
    }
  }
}
</style>
