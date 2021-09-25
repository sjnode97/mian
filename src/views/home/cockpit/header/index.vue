<template>
  <header>
    <div class="leftHeader">
      <p class="time">
        {{ clock | FormatDay }}
        <span class="hour">{{ clock | FormatTime }}</span>
        {{ clock | FormatWeek }}
      </p>
    </div>
    <div class="centerHeader">
      <p class="bigTitle">光伏运维平台</p>
    </div>
    <div class="rightHeader">
      <div class="tool" title="数据查询">
        <router-link to="/"><i class="el-icon-stopwatch" /></router-link>
      </div>
      <navbar :cockpit="false" />
    </div>
  </header>
</template>

<script>
import navbar from '@/layout/components/Navbar.vue'
import { getDate } from '@/utils'
export default {
  name: 'Home',
  components: {
    navbar
  },
  filters: {
    FormatTime: (val) => {
      return getDate(val, 'hour')
    },
    FormatDay: (val) => {
      return getDate(val, 'day')
    },
    FormatWeek: (val) => {
      return getDate(val, 'week')
    }
  },
  data() {
    return {
      title: this.$baseTitle,
      clock: Date.parse(new Date()),
      interval: 0
    }
  },
  mounted() {
    this.time()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    time() {
      this.interval = setInterval(() => {
        this.clock = Date.parse(new Date())
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $bg;
  height: 66px;
  .leftHeader,
  .rightHeader {
    color: $bg-num;
    display: flex;
    align-items: center;
    justify-content: center;
    .tool {
      i{
        font-size: 23px;
      }
    }
  }
  .bigTitle {
    margin: 0px;
    width: 540px;
    height: 66px;
    line-height: 66px;
    background: linear-gradient(0deg, rgb(68 159 141), rgb(11 56 56));
    font-size: $bigTitle-font-size;
    color: $gray;
    text-align: center;
  }
}
</style>
