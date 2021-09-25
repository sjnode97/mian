<template>
  <div class="cockpit-container">
    <headernav />
    <div class="main-content">
      <div class="main-left">
        <div class="top-left">
          <div class="left-card">
            <left />
          </div>
          <div class="center-map">
            <borderbox :map="true" :map-title="true">
              <centerMap />
            </borderbox>
          </div>
        </div>
        <div class="bottom-left">
          <bottom />
        </div>
      </div>
      <div class="main-right">
        <right />
      </div>
    </div>
  </div>
</template>

<script>
import headernav from './header'
import right from './right'
import left from './left'
import bottom from './bottom'
import centerMap from './map'
import borderbox from '../components/borderBox.vue'

export default {
  name: 'Home',
  components: {
    headernav,
    left,
    right,
    bottom,
    centerMap,
    borderbox
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
$main-height: calc(100% - 66px);
$map-height: calc(2 * 100% / 3);
$btm-height: calc(100% / 3);
.cockpit-container{
  padding: 0 20px 20px;
  background: $bg;
  height: 100%;
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: $main-height;
    color: $green-font-color;
    font-size: $moduleTitle-font-size;
    .main-left {
      width: 72.5%;
      height: 100%;
      .top-left {
        display: flex;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        height: $map-height;
        .left-card {
          width: 38%;
          height: 100%;

        }
        .center-map {
          width: 62%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: stretch;

          // background: $bg-module;
        }
      }
      .bottom-left {
        width: 100%;
        height: $btm-height;
        margin-top: 10px;
      }
    }
    .main-right {
      width: 27.5%;
      height: 100%;
      flex-direction: column;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: flex-start;
    }
  }
}
</style>
