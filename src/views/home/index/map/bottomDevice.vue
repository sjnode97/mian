<template>
  <div class="summary">
    <li v-for="(item, key, index) of barData" :key="index">
      <div class="icon"><i class="iconfont" :class="item.icon" /></div>
      <div class="numBox">
        <div class="numTitle">{{ item.name }}</div>
        <div class="num">
          <span>{{ item.ele }}</span>
          <span>{{ item.total | addSplit(item.ele) }}</span>
          <span> {{ item.unit }}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import { equipmentQuantity, powerStationOne } from '@/api/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Device',
  filters: {
    addSplit(value, ele) {
      return isNaN(ele) ? value : ' / ' + value
    }
  },
  props: {
    cockpit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      barData: [{
        name: '装机容量',
        icon: 'icon-zhuangji',
        total: '0',
        unit: 'MWp'
      }, {
        name: '逆变器',
        icon: 'icon-jiajian',
        ele: '0',
        total: '0',
        unit: '台'
      }, {
        name: '直流汇流箱',
        icon: 'icon-huiliuxiang',
        ele: '0',
        total: '0',
        unit: '台'
      }, {
        name: '组串支路',
        icon: 'icon-treechart',
        ele: '0',
        total: '0',
        unit: '台'
      }],
      height: 0,
      time: 0
    }
  },
  computed: {
    ...mapGetters([
      'station'
    ])
  },
  mounted() {
    this.getTimeData()
  },
  beforeDestroy() {
    clearTimeout(this.time)
  },
  methods: {
    getTimeData() {
      this.getPowerData()
      this.getData()
    },
    // 获取装机容量
    async getData() {
      await powerStationOne(this.station).then(({ data }) => {
        this.barData[0].total = data.capacity
      })
    },
    async getPowerData() {
      await equipmentQuantity({ powerStationId: this.station }).then(({ data }) => {
        // this.barData = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.summary {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  width: 100%;
  height: 60px;
  // margin-top: 30px;

  // .wapper {
  //   width: 100%;
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
    li {
      display: inline-block;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        width: 40px;
        height: 40px;
        i {
          font-size: 40px;
          color: rgb(255, 202, 0);
        }
      }
      .numBox {
        margin-left: 20px;
        .numTitle {
          color: azure;
          margin: auto;
          text-align: center;
          font-size: $chartTableTitle-font-size;
        }
        .num {
          margin-top: 10px;
          color: $blue-dark;
          font-size: $numTitle-font-size;
          span {
            margin: auto;
            text-align: center;
            &:nth-child(1) {
              color: rgb(255, 202, 0);
            }
            &:nth-child(3) {
              font-size: 14px;
            }
          }
        }
      }
    }

  // }
}
</style>
