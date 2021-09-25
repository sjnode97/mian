<template>
  <div class="border-content">
    <div class="tab">
      <i
        v-for="(item,index) in timeTab"
        :key="index"
        :class="[item,'iconfont',{active:activeIndex==index}]"
        @click="changeClass(index)"
      />
    </div>
    <div class="title">综合厂用电量 <span>（{{ unit }}）</span>  </div>
    <div class="number">
      <NumBlock :num="num" />
    </div>
    <div class="compare">
      同比:
      <!-- <span style="color:red">▲</span> -->
      <span style="color:green">▼</span>
      10.34%
    </div>
    <div class="slot">
      <slot name="echarts" />
    </div>
  </div>
</template>
<script>
import NumBlock from '@/components/Card/number.vue'
export default {
  components: {
    NumBlock
  },
  props: {
    num: {
      type: String,
      default: () => {
        return ''
      }
    },
    unit: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      timeTab: ['icon-yue', 'icon-nian'],
      activeIndex: 0
    }
  },
  methods: {
    changeClass(index) {
      this.activeIndex = index
      // 日期改变传递给父组件
      this.$emit('changeDataType', index)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    .border-content {
        position: relative;
        width: calc(100% - 20px);
        height: calc(100% - 45px);
        margin: auto;
        color: $bg-module-border;
        box-shadow: inset 0 0 0 2px $bg-module-border;
        .tab{
            display: flex;
            justify-content: flex-end;
            .iconfont{
                font-size: 36px;
                margin-right: 5px;
                cursor: pointer;
                color:#ccc;
            }
            .active{
                color: #5abdf8;
            }
        }
        .title{
            text-align: center;
            span{
                font-size: 12px;
                font-weight: bold;
            }
        }
        .number{
            text-align: center;
            margin:15px 0;
        }
        .compare{
            text-align: center;
        }
    }
    // 右上角装饰
    .border-content::before {
        content: "";
        position: absolute;
        top: -8px;
        right: -9px;
        width: 30px;
        height: 30px;
        -webkit-box-shadow: inset 0 0 0 2px;
        box-shadow: inset 0 0 0 2px;
        clip: rect(0px, 33px, 28px, 3px);
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
</style>
