<template>
  <div class="map-container">
    <topEle :cockpit="false" />
    <mapcard class="mapcard" :city-code="cityCode" />
    <div class="deviceSum">
      <bottomDevice />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mapcard from '../../components/dotMap.vue'
import topEle from '../../components/topEle.vue'
import bottomDevice from './bottomDevice.vue'
export default {
  name: 'MapBox',
  components: {
    topEle,
    bottomDevice,
    mapcard
  },
  data() {
    return {
      cityCode: this.city
    }
  },
  computed: {
    ...mapGetters([
      'station',
      'city'
    ])
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
  position: relative;

  .deviceSum{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>
