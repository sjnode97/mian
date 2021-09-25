<template>
  <div id="box" class="border-box">
    <div v-if="title != ''" class="title">
      <p><img src="@/assets/common/right-arrow.png" class="arrowTitle"> {{ title }}</p>
    </div>
    <div v-if="map && mapTitle" class="mapTitle">
      全国电站汇总
    </div>
    <div class="border-content">
      <slot />
    </div>
    <!-- 装饰 -->
    <div :class="map? 'lightborderMap' : 'lightborder'" />
    <div v-if="map" class="lightborder2" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    map: {
      type: Boolean,
      default: false
    },
    mapTitle: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  mounted() {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
$width: 515px;
.border-box {
  position: relative;
  width: 100%;
  height: 100%;

  .title {
    margin: 0;
    font-size: $moduleTitle-font-size;
    color: $green-font-color;
    p {
      margin: 0;
      .arrowTitle {
        width: 16px;
        height: auto;
      }
    }
  }

  .border-content {
    position: absolute;
    top: 33px;
    bottom: 10px;
    left: 0;
    right: 0;
    width: calc(100% - 20px);
    height: calc(100% - 45px);
    margin: auto;
    margin-left: 0;
    background: $bg-module;
    color: $bg-module-border;
    box-shadow: inset 0 0 0 1px $bg-module-border;
  }
  // 右上角装饰
  .border-content::before {
    content: "";
    position: absolute;
    top: -6px;
    right: -6px;
    width: 23px;
    height: 20px;
    -webkit-box-shadow: inset 0 0 0 2px;
    box-shadow: inset 0 0 0 2px;
    clip: rect(1px, 22px, 17px, 3px);
  }
  // 左下角装饰
  .border-content::after {
    content: "";
    position: absolute;
    // top: 0;
    bottom: 0;
    left: 0;
    border-top: 6px solid transparent;
    border-left: 6px solid $num-font-color;
    border-bottom: 6px solid $num-font-color;
    border-right: 6px solid transparent;

  }
  .lightborder {
    position: absolute;
    right: 20px;
    bottom: 42px;
    width: 1px;
    height: 30px;
    background: $num-font-color;
  }
  .lightborderMap {
    position: absolute;
    right: 20px;
    top: 200px;
    width: 2px;
    height: 80px;
    background: $num-font-color;
  }
  .lightborder2 {
    position: absolute;
    left: 0px;
    bottom: 195px;
    width: 2px;
    height: 84px;
    background: $num-font-color;
  }
  .mapTitle {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(0deg, #449f8d, #0b3838);
    color: $bg-num;
    height: 30px;
    line-height: 30px;
    width: 318px;
    text-align: center;
    z-index: 1;
  }
}
</style>
