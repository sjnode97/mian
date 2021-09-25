<template>
  <div id="app">
    <component :is="layouts" />
  </div>
</template>

<script>
import EmptyLayout from '@/layout/EmptyLayout'
import Layout from '@/layout/index'
import { cptList } from './settings'
export default {
  name: 'App',
  components: {
    Layout,
    EmptyLayout
  },
  data: () => {
    return {
      layouts: 'Layout'
    }
  },
  watch: {
    '$route': function(newVal, oldVal) {
      // console.log(newVal.path + ' ~ ' + oldVal.path)
      // console.log(cptList)
      if (cptList.includes(newVal.path)) {
        this.layouts = 'EmptyLayout'
      } else {
        this.layouts = 'Layout'
      }
    }
  }
}
</script>
