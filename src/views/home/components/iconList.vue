<template>
  <div class="iconList-container">
    <div v-for="(item, key) in stationObj" :key="key" class="iconList">
      <div class="iconBox">
        <i :class="'iconfont ' + item.icon" />
      </div>
      <div class="numBox">
        <p class="numTitle">{{ item.name }}</p>
        <p>
          <span class="num">{{ item.value }}</span>&emsp;
          <span class="unit">{{ item.unit }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconList',
  components: {},
  props: {
    stationObj: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.iconList-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
  padding: 10px;

  .iconList{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .iconBox {
      width: 60px;
      i {
        font-size: 40px;
        color: rgb(255, 202, 0);
      }
    }
    .numBox {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      p {
        margin: 0;
        color: $num-font-color;
        .num {
          font-size: $numTitle-font-size;
        }
        .unit {
          font-size: $unitTitle-font-size;
        }
      }
      .numTitle {
        font-size: $chartTableTitle-font-size;
        color: $gray;
      }
    }
  }

}
</style>
