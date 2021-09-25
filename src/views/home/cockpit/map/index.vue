<template>
  <div class="map-container">
    <topEle />
    <mapcard class="mapcard" :city-code="cityCode" />
  </div>
</template>

<script>
import mapcard from '../../components/dotMap.vue'
import topEle from '../../components/topEle.vue'
export default {
  name: 'MapBox',
  components: {
    topEle,
    mapcard
  },
  data() {
    return {
      cityCode: 100000
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.map-container{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: stretch;
}
</style>
