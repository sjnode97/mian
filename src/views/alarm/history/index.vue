<template>
  <div id="container">
    <Search ref="search" controls :circle-list="['日', '月']" time="date" :show-station="false" />
    <div class="alarmCount">1</div>
  </div>
</template>

<script>
import Search from '@/components/searchNav'
export default {

  components: {
    Search
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
  #container{
    margin:0 auto;
    background: #fff;

    .alarmCount{
       width:96%;;
      margin-top: 70px;

    }
  }
</style>
