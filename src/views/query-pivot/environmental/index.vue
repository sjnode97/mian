<template>
  <div id="wrap">
    <div class="title-sele">
      1111
    </div>
    <div class="air-temperature">
      <div class="name-transformer">
        <air-temeprature />
      </div>
    </div>
    <div class="radiate">
      <radiate />
    </div>
  </div>

</template>

<script>
import AirTemeprature from '@/views/query-pivot/environmental/component/AirTemeprature'
import Radiate from '@/views/query-pivot/environmental/component/Radiate'
export default {
  name: 'Environment',
  components: {
    AirTemeprature,
    Radiate
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
    .air-temperature {
      width: 96%;
      margin: 0 auto;
      background: #333333;
      .name-transformer {
        margin-top: 30px;
        background: #ffffff;
        border: 1px solid #D9D9D9;
      }
    }
    .radiate  {
      width: 96%;
      margin: 0 auto;
      margin-top: 20px;
      background: #fff;
      border: 1px solid #D9D9D9;
    }
  }
</style>
