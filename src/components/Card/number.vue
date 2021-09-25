<template>
  <div class="box">
    <div v-for="(item,index) in num.length" :key="index" class="num-block">{{ num[index] }}</div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: String,
      default: () => {
        return ''
      }
    }
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
</style>
