<template>
  <div class="search-wapper">
    <div class="ratio-box">
      <div v-for="(item, index) in des" :key="index" class="ratio">
        <span>{{ item }}</span>
      </div>
    </div>
    <div v-if="showDes" class="describe-box">
      <div v-for="(item, index) in des2" :key="index" class="describe">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDes: {
      type: Boolean,
      default: false
    },
    labelName: {
      type: String,
      default: '电站名称：'
    }
  },

  data() {
    return {
      des: ['0 ~ 5%', '5 ~ 10%', '10 ~ 20%', '20%以上'],
      des2: ['离散率 ≤ 5%：电站运行', '5% < 离散率 ≤ 10%：电站运行良好，需关注离散率发展趋势', '10% < 离散率 ≤ 20%：运行待提高，部分逆变器出力不够', '20% < 离散率：必须改进，存在相当一部分逆变器处理不够']
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.search-wapper {
  .ratio-box {
    margin: 20px 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .ratio {
      margin: 0 30px;
      span {
        &::before{
          content: '';
          display: inline-block;
          margin-right: 10px;
          width: 14px;
          height: 14px;
          line-height: 14px;
          background: aquamarine;
        }

      }
      &:nth-child(1) span::before {
        background: rgb(195, 240, 196);
      }
      &:nth-child(2) span::before {
        background: rgb(255, 239, 131);
      }
      &:nth-child(3) span::before {
        background: rgb(253, 193, 201);
      }
      &:nth-child(4) span::before {
        background: rgb(239, 19, 0);
      }
    }
  }
  .describe-box {
    margin: 15px 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .describe {
      margin: 0px 10px;
      padding: 5px 8px;
      border: 1px solid #999;
      font-size: 14px;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
