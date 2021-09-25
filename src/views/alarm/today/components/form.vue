<template>
  <div class="form">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item>
        <el-button icon="el-icon-success">批量确认</el-button>
      </el-form-item>
      <el-form-item label="电站：">
        <el-select v-model="queryForm.powerIds" placeholder="全部">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="告警级别：">
        <el-select v-model="queryForm.level" placeholder="全部">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="告警类型：">
        <el-select v-model="queryForm.type" placeholder="全部">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="queryForm.status" placeholder="全部">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

  data() {
    return {
      queryForm: {
        powerIds: [], // 电站
        level: '', // 告警级别
        type: '', // 告警类型
        status: '', // 状态
        dateType: '',
        date: ''
      }
    }
  },

  watch: {
    queryForm: {
      handler(v) {
        this.$emit('getForm', v)
      },
      deep: true
    }
  },

  created() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
    .form{
        ::v-deep.el-icon-success{
            color:green
        }
        margin:20px 0;
        ::v-deep.el-input__inner,
        ::v-deep.el-button
        {
            border:1px solid #5CBCF9
        }
    }
</style>
