<template>
  <div class="table-box">
    <el-table
      ref="rw_table"
      :data="tableData"
      height="90%"
      border
      @mouseenter.native="mouseEnter"
      @mouseleave.native="mouseLeave"
    >
      <el-table-column
        prop="name"
        label="告警名称"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="grade" label="告警级别" align="center">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :class="
              scope.row.grade === 0
                ? 'tn-urgent tn-tag'
                : scope.row.grade === 1
                  ? 'tn-important tn-tag'
                  : scope.row.grade === 2
                    ? 'tn-common tn-tag'
                    : 'tn-tips tn-tag'
            "
            disable-transitions
          >{{ scope.row.grade | getGrade(scope.row.grade) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="告警类型"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column prop="status" label="告警状态" align="center">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions
          >{{ scope.row.status === 1 ? "已确定" : "未确定" }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
let rolltimer = '' // 自动滚动的定时任务
export default {
  filters: {
    getGrade(g) {
      let temp = ''
      switch (g) {
        case 0:
          temp = '紧急'
          break
        case 1:
          temp = '重要'
          break
        case 2:
          temp = '一般'
          break
        case 3:
          temp = '提示'
          break
        default:
          break
      }
      return temp
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    map: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [
        {
          name: '01#箱1#变逆变器温度越限',
          type: '越限告警',
          status: 1,
          grade: 2
        },
        {
          name: '03#箱1#变逆变器温度越限',
          type: '越限告警',
          status: 1,
          grade: 2
        },
        {
          name: '04#箱2#变逆变器停机',
          type: '停机告警',
          status: 1,
          grade: 2
        }
      ],
      currentPage: 0,
      nomore: false,
      rollTime: 15, // 滚动时间
      rollPx: 1 // 滚动间距
    }
  },
  computed: {},
  mounted() {
    this.autoRoll()
  },
  methods: {
    // 设置自动滚动
    autoRoll(stop) {
      if (stop) {
        clearInterval(rolltimer)
        return
      }

      // 拿到表格挂载后的真实DOM
      const table = this.$refs.rw_table
      // 拿到表格中承载数据的div元素
      const divData = table.bodyWrapper
      // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果
      rolltimer = setInterval(() => {
        // 元素自增距离顶部像素
        divData.scrollTop += this.rollPx
        // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
        if (divData.clientHeight + divData.scrollTop === divData.scrollHeight) {
          // 重置table距离顶部距离
          divData.scrollTop = 0
        }
      }, this.rollTime * 10)
    },
    // 鼠标进入
    mouseEnter(time) {
      // 鼠标进入停止滚动和切换的定时任务
      this.autoRoll(true)
    },
    // 鼠标离开
    mouseLeave() {
      // 开启
      this.autoRoll()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
$width: 515px;
.table-box {
  position: relative;
  width: 100%;
  height: 100%;
  ::v-deep {
    .el-table {
      width: 94%;
      margin: 2.5% auto;
      background: #2a3752 !important;

      .el-table__header tr,
      .el-table__header th {
        background: #2a3752 !important;
        color: $num-font-color;
        .cell {
          font-size: $chartTableTitle-font-size;
        }
      }
      .el-table__row:hover > td {
        background: $bg !important;
      }
      .el-table__row td {
        background: #2a3752;
        color: #bebebe;
        padding: 5px 0px;
      }
      th.is-leaf,
      td {
        border-bottom: 1px solid #0c1e38;
      }
      // 滚动条样式
      .el-table__body-wrapper::-webkit-scrollbar {
        width: 8px; /*滚动条宽度*/
        height: 12px; /*滚动条高度*/
      }
      .el-table__body-wrapper::-webkit-scrollbar-track {
        // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        // border-radius: 10px; /*滚动条的背景区域的圆角*/
        background-color: #eeeeee00; /*滚动条的背景颜色*/
      }
      .el-table__body-wrapper::-webkit-scrollbar-thumb {
        // border-radius: 10px; /*滚动条的圆角*/
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #767a7e; /*滚动条的背景颜色*/
      }
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: #2a3752;
    }
    .gutter {
      border-bottom: #2a3752 !important;
    }
    .el-table--border th,
    .el-table--border td {
      border-right: 1px solid #4651663b;
      box-shadow: inset 1px 0px 2px 0px #2e3d56;
    }
    .el-table--group,
    .el-table--border {
      border: 1px solid #4651663b;
    }

    .el-tag--dark.el-tag--success {
      background-color: $green;
      border-color: $green;
      color: #000;
      border-radius: 0;
      transform: scale(0.8);
    }
    .el-tag--dark.el-tag--danger {
      background-color: $orange;
      border-color: $orange;
      color: #000;
      border-radius: 0;
      transform: scale(0.8);
    }
  }
  .tn-tag {
    border-radius: 50%;
    font-size: 10px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    transform: scale(0.8);
    margin: 0;
    padding: 0;
    color: #fff;
  }
  .tn-urgent {
    background-color: $red;
    border-color: $red;
  }
  .tn-important {
    background-color: $yellow-dark;
    border-color: $yellow-dark;
  }
  .tn-common {
    background-color: $yellow;
    border-color: $yellow;
    color: #000;
  }
  .tn-tips {
    background-color: $green;
    border-color: $green;
    color: #000;
  }
}
</style>
