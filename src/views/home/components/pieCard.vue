<template>
  <div class="pie-container">
    <div v-if="!alarm" class="btnIcon" @click="iconBtn">
      <i class="iconfont icon-ri active " />
      <i class="iconfont icon-yue" />
    </div>
    <div class="text">
      <p>
        <span>任务数：</span>
        <span v-for="(item, index) in sum" :key="index" class="num-block">
          {{ item }}
        </span>
      </p>
      <p>
        <span>已完成：</span>
        <span v-for="(item, index) in done" :key="index" class="num-block">
          {{ item }}
        </span>
      </p>
    </div>
    <pie height="50%" width="90%" />
  </div>
</template>

<script>
import pie from '../components/pie.vue'
export default {
  name: 'IconList',
  components: {
    pie
  },
  props: {
    stationObj: {
      type: Array,
      default: () => {
        return []
      }
    },
    alarm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      current: 0,
      sum: '100', // 任务数
      done: '80' // 已完成
    }
  },
  methods: {
    iconBtn(e) {
      e.target.classList.add('active')
      e.target.previousSibling && e.target.previousSibling.classList.remove('active')
      e.target.nextSibling && e.target.nextSibling.classList.remove('active')
      if (e.target.nextSibling) {
        // 日
        this.current = 0
      } else {
        // 月
        this.current = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.pie-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
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
  .text{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;

    p {
      margin: 0;
      color: $gray;
      font-size: $unitTitle-font-size;

      .num-block {
        display: inline-block;
        width: 18px;
        height: 25px;
        font-size: $numTitle-font-size;
        line-height: 25px;
        text-align: center;
        background: $num-font-color;
        margin: 10px 2px;
        border-radius: 3px;
      }
    }
  }

}
</style>
