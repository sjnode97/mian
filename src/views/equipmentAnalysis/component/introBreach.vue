<template>
  <div class="search-wapper">
    <div class="breach-box">
      <div v-for="(item, index) in breachDes" :key="item.header" class="describe">
        <div class="header" :style="index<3 && 'color: #d32f2f'">
          {{ item.header }}
        </div>
        <div class="content" v-html="item.content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breachDes: [
        {
          header: '异常',
          content: '通常汇流箱/逆变器<br>存在通信故障'
        }, {
          header: '20%以上',
          content: '个别支路存在<br>短路故障'
        }, {
          header: '10% ~ 20%',
          content: '个别支路<br>相对其他支路<br>存在明显偏低'
        }, {
          header: '5% ~ 10%',
          content: '按照经验，<br>离散率大于7%，<br>个别支路偏低'
        }, {
          header: '0 ~ 5%',
          content: '正常'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.search-wapper {
  .breach-box {
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .describe {
      margin: 0px 10px;
      width: 125px;
      // height: 100px;
      border: 1px solid #999;
      font-size: 14px;
      .header {
        padding: 10px;
        border-bottom: 1px solid #999;
        text-align: center;
        font-weight: 600;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        padding: 10px 10px;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
      }
    }

  }
}
</style>
