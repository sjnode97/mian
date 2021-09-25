<template>
  <div class="dialog">
    <el-dialog
      title="告警详情"
      :visible.sync="dialogVisible"
      top="30px"
      width="30%"
    >
      <el-form ref="form" label-position="left" :model="form" label-width="120px">
        <el-form-item label="告警名称：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警等级：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警类型：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警描述：">
          <span>小米跟红米有什么区别很多朋友傻傻分不清，都不知道红米和小米有啥不同。作为资深数码迷，对这个问题还是很好回答的。要解开迷底这就要从小米的历史说起</span>
        </el-form-item>
        <el-form-item label="告警当前值：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警发生时间：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警确认时间：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警确认人：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警方式：">
          <span>1212</span>
        </el-form-item>
        <el-form-item label="告警接收者：">
          <span>1212</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">告警确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {

  data() {
    return {
      dialogVisible: false,
      form: {}
    }
  },

  created() {

  },

  methods: {
    // 打开模态框
    showDialog() {
      this.dialogVisible = true
    },

    // 关闭模态框
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
    ::v-deep.dialog{
        .el-dialog__header{
            background: #5CBCF9;
            text-align: center;
            .el-dialog__title,i{
                color: white;
            }

        }
        .el-dialog__footer{
            text-align: center;
            button{
                background: #5CBCF9;
                border:none
            }
        }
    }
</style>
