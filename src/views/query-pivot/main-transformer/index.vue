<template>
  <div id="wrap">
    <div class="title-sele">111</div>
    <div class="data-cycle">
      <div class="name-transformer">
        <DataCard />
      </div>
    </div>
    <div class="curve">
      <Curve />
    </div>
    <div class="his-echarts">
      <Echarts />
      <table-wrap />
    </div>
  </div>
</template>

<script>
import Echarts from './component/Echarts'
import Curve from './component/Curve'
import DataCard from './component/Data-card'
import TableWrap from './component/Table-wrap'
export default {
  name: 'Index',
  components: {
    DataCard,
    Curve,
    Echarts,
    TableWrap
  }
}
</script>

<style scoped lang="scss">
  #wrap {
    width: 100%;
    margin-bottom: 30px;
    .title-sele {
      width: 100%;
      height: 50px;
      background: #1D2D47;
      color: #ffffff;
    }
    .data-cycle {
      width: 96%;
      margin: 0 auto;
      background: #333333;
      .name-transformer {
        margin-top: 30px;
        background: #ffffff;
        border: 1px solid #D9D9D9;
      }
    }
    .curve {
      width: 96%;
      margin: 0 auto;
      margin-top: 20px;
      background: #fff;
      border: 1px solid #D9D9D9;
    }
    .his-echarts {
      width: 96%;
      margin: 0 auto;
      margin-top: 20px;
      background: #fff;
      border: 1px solid #D9D9D9;
    }
  }
</style>
