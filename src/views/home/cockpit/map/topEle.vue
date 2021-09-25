<template>
  <div class="summary">
    <ul>
      <li v-for="(item, key, index) of barData" :key="index">
        <div class="numTitle">{{ key | nameFmt }}</div>
        <div class="numBox">
          <span v-for="(num, i) in item.val" :key="i" class="num-block">
            {{ num }}
          </span>
        </div>
        <div class="ratioBox">
          <vueSeamlessScroll
            class="data-card-percent"
            :class-option="defaultOption"
          >
            <div id="rate" class="rate">
              <span class="titleName">同比：</span><i :class="item.yoy | arrows" />
              <span class="percent">{{ item.yoy | percent }}</span>
            </div>
            <div class="rate">
              <span class="titleName">环比：</span><i :class="item.qoq | arrows" />
              <span class="percent">{{ item.qoq | percent }}</span>
            </div>
          </vueSeamlessScroll>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import { dayMonthYear } from '@/api/cockpit'

export default {
  name: 'BarRank',
  components: {
    vueSeamlessScroll
  },
  filters: {
    arrows(value) {
      if (value > 0) {
        return 'el-icon-caret-top'
      } else {
        return 'el-icon-caret-bottom'
      }
    },
    percent(value) {
      if (!isNaN(+value)) {
        return value + '%'
      } else {
        return value
      }
    },
    nameFmt(val) {
      switch (val) {
        case 'day':
          return '本日上网用量'
        case 'month':
          return '本月上网用量'
        case 'year':
          return '本年上网用量'
        default:
          return '用量'
      }
    }
  },
  data() {
    return {
      barData: {},
      height: 0
    }
  },
  computed: {
    // 公告滚动自定义
    defaultOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: this.height, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction =&gt; 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction =&gt; 2/3
        waitTime: 1000 * 3 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  watch: {
    barData: {
      handler() {
        this.$nextTick(() => {
          if (document.getElementById('rate')) {
            this.height = document.getElementById('rate').offsetHeight
            console.log(this.height)
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.getData()
    // 15分钟请求一次
    setInterval(() => { this.getData() }, 1000 * 60 * 15)
  },
  methods: {
    async getData() {
      await dayMonthYear().then(({ data }) => {
        this.barData = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.summary {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  height: 100px;
  margin-top: 30px;
  padding: 10px 0;
  margin: 30px 50px 0;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    text-decoration: none;
    li {
      display: inline-block;
    }
    .numTitle {
      font-size: $menu-font-size;
      margin: 5px auto;
      color: $green-font-color;
      margin: 0 0 10px;
      line-height: 1rem;
    }
    .num-block {
      display: inline-block;
      width: 18px;
      height: 25px;
      font-size: $numTitle-font-size;
      line-height: 25px;
      text-align: center;
      background: $num-font-color;
      margin: 1px 1px;
      border-radius: 3px;
      color: #fff;
    }
    .ratioBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .unit {
      color: #ddd;
      // padding-top: 10px;
      font-size: $unitTitle-font-size;
    }
    .data-card-percent {
      height: 30px;
      overflow: hidden;
      .rate {
        color: #01d7f4;
        font-size: 0.9rem;
        line-height: 30px;
        .titleName {
          color: $green-font-color;
        }
        .percent {
          color: $yellow;
        }
        ::v-deep .el-icon-caret-top {
          color: red;
          font-size: 14px;
        }
        ::v-deep .el-icon-caret-bottom {
          color: green;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
