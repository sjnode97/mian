<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item>
        <el-radio v-model="queryForm.type1" :label="1">时比</el-radio>
        <el-radio-group v-model="queryForm.type2" class="group">
          <el-radio :label="1">同比</el-radio>
          <el-radio :label="2">自定义</el-radio>
          <el-date-picker
            v-model="queryForm.endtime"
            :disabled="timeDisabled"
            value-format="yyyy"
            size="mini"
            type="year"
            placeholder="选择年"
          />
        </el-radio-group>
        <el-radio v-model="queryForm.type1" :label="2">类比</el-radio>
        <el-form-item label="选择电站:">
          <el-select v-model="queryForm.twoId" :disabled="nameDisabled" clearable size="mini" placeholder="请选择">
            <el-option v-for="(item,index) in selectName" :key="index" :label="item.name" :value="item.id*1" />
          </el-select>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { stationList } from '@/api/common'
export default {

  data() {
    return {
      queryForm: {
        type1: 1,
        type2: 1,
        endtime: '',
        twoId: ''
      },
      nameDisabled: false,
      timeDisabled: false,
      selectName: [],
      data: {},
      emitData: {}
    }
  },

  watch: {
    queryForm: {
      handler: function(obj) {
        // console.log(obj)
        if (obj.type1 === 1) { // 时比
          this.nameDisabled = true
          this.queryForm.twoId = ''
          if (obj.type2 === 1) { // 时比 同比
            this.timeDisabled = true
            this.queryForm.endtime = ''
          } else if (obj.type2 === 2) { // 时比 自定义
            this.timeDisabled = false
          } else {
            this.queryForm.type2 = 1
          }
        } else if (obj.type1 === 2) { // 类比
          this.nameDisabled = false
          this.timeDisabled = true
          this.queryForm.endtime = ''
          this.queryForm.type2 = ''
        }
        this.data = JSON.parse(JSON.stringify(this.queryForm))
      },
      immediate: true,
      deep: true

    },

    data: {
      handler: function(obj) {
        var result = {
          endTime: obj.endtime,
          twoId: obj.twoId,
          type: ''
        }
        if (obj.type1 === 1 && obj.type2 === 1) {
          result.type = 1
        } else if (obj.type1 === 1 && obj.type2 === 2) {
          result.type = 2
        } else if (obj.type1 === 2 && obj.type2 === '') {
          result.type = 3
        }
        this.emitData = result // 用于外部refs获取
        this.$emit('emitEchart', this.emitData)
      },
      deep: true,
      immediate: true
    }
  },

  created() {
    this.getStationList()
  },

  methods: {
    async getStationList() {
      const { data } = await stationList()
      this.selectName = data
    }
  }
}
</script>

<style lang="scss" scoped>
    .group{
        margin-right:40px;
    }
</style>
