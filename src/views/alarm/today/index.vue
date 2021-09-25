<template>
  <div id="box">
    <el-card>
      <div class="top">
        <div v-for="(item,index) in topInfo" :key="index" class="item">
          <i :class="['iconfont',item.icon]" />
          <div class="info">
            <div class="infoTitle">{{ item.title }}</div>
            <div>{{ item.num }}</div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="container">
      <div class="tableTitle-device title">
        今日告警列表
      </div>
      <Form ref="form" @getForm="getTable" />
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="clickTr"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="告警名称"
          prop="name"
        />
        <el-table-column
          prop="confirmState"
          label="确认状态"
        />
        <el-table-column
          prop="typeName"
          label="告警类型"
        />
        <el-table-column
          prop="levelName"
          label="告警级别"
        />
        <el-table-column
          prop="val"
          label="当前值"
        />
        <el-table-column
          prop="desc"
          label="告警描述"
        />
        <el-table-column
          prop="createTime"
          label="发生时间"
        />
        <el-table-column
          prop="confirmTime"
          label="确认时间"
        />
        <el-table-column
          prop="alarmReceiverName"
          label="确认人"
        />
        <el-table-column
          prop="address"
          label="电站名称"
        />
      </el-table>
      <el-pagination
        background
        :current-page="queryInfo.pageNo"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="200"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Dialog ref="dialog" />
  </div>

</template>

<script>
import Form from './components/form.vue'
import Dialog from './components/dialog.vue'
// import { getAlarmTable } from '@/api/alarm'
export default {

  components: {
    Form,
    Dialog
  },

  data() {
    return {
      topInfo: [
        { title: '今日新增告警', num: 13223, icon: 'icon-a-gaojing1' },
        { title: '今日待确认告警', num: 43123, icon: 'icon-dengdai' },
        { title: '今日已确认告警', num: 545123, icon: 'icon-queren' }
      ],
      tableData: [
        {
          name: '告警名称',
          confirmState: '23',
          typeName: '23',
          levelName: '12',
          val: 1,
          desc: '描述',
          createTime: '2020-04-30',
          confirmTime: '2020-06-20',
          alarmReceiverName: '23',
          address: '电站一'
        },
        {
          name: '告警名称',
          confirmState: '23',
          typeName: '23',
          levelName: '12',
          val: 1,
          desc: '描述',
          createTime: '2020-04-30',
          confirmTime: '2020-06-20',
          alarmReceiverName: '23',
          address: '电站一'
        },
        {
          name: '告警名称',
          confirmState: '23',
          typeName: '23',
          levelName: '12',
          val: 1,
          desc: '描述',
          createTime: '2020-04-30',
          confirmTime: '2020-06-20',
          alarmReceiverName: '23',
          address: '电站一'
        }, {
          name: '告警名称',
          confirmState: '23',
          typeName: '23',
          levelName: '12',
          val: 1,
          desc: '描述',
          createTime: '2020-04-30',
          confirmTime: '2020-06-20',
          alarmReceiverName: '23',
          address: '电站一'
        }
      ],
      queryInfo: {
        pageNo: 1,
        pageSize: 10
      }
    }
  },

  created() {

  },

  methods: {

    // 表格
    async getTable(v) {
      // const data = await getAlarmTable(v)
      // console.log(data)
      console.log({ ...v, ...this.queryInfo })
    },

    // 复选框
    handleSelectionChange(v) {
      console.log(v)
    },

    // 单击表格
    clickTr(row) {
      this.$refs.dialog.showDialog()
      console.log(row)
    },

    handleSizeChange(size) {
      this.queryInfo.pageSize = size
      console.log({ ...this.$refs.form.queryForm, ...this.queryInfo })
    },

    // 页码改变
    handleCurrentChange(page) {
      this.queryInfo.pageNo = page
      console.log({ ...this.$refs.form.queryForm, ...this.queryInfo })
    }

  }
}
</script>

<style lang="scss" scoped>
  #box{
     width:96%;
    margin:20px auto;
    .top{
      display: flex;
      justify-content: space-around;
      .item{
        width:300px;
        height: 80px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding:0 20px;
        justify-content: space-between;
        &:nth-of-type(1){
          background: #f9662f;
          i{
             color:#f9662f;
          }
        }
        &:nth-of-type(2){
          background: #fdb229;
          i{
             color:#fdb229;
          }
        }
        &:nth-of-type(3){
          background: #29e229;
          i{
              color:#29e229;
          }
        }
        i{
          font-size: 40px;
          padding:5px;
          background: #fff;
        }
        .info{
          color:#fff;
            .infoTitle{
              margin:10px 0;
              font-weight: bold;
              font-size: 16px;
          }
        }

      }
    }
    .container{
      margin:20px auto;
      min-height: 650px;
      border: 1px solid #D9D9D9;
      background: #fff;
      padding: 20px 30px;
      .el-pagination{
        margin-top: 30px;
        text-align: right;
      }
    }
  }
</style>
