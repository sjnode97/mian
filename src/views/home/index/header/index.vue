<template>
  <header>
    <div class="leftHeader">
      <p class="time">2021-07-21 09:23:00</p>
    </div>
    <div class="centerHeader">
      <p class="bigTitle">光伏运维平台</p>
    </div>
    <div class="rightHeader">
      <navbar :cockpit="false" />
      <!-- <div class="menu">
        <li>运行监测</li>
      </div>
      <div>头像</div> -->
    </div>
  </header>
</template>

<script>
import navbar from '@/layout/components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    navbar
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
