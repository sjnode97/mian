<template>
  <div class="table-wapper">
    <el-table
      class="table"
      :data="tableData"
      border
      :header-cell-style="{'text-align':'center'}"
      max-height="330"
      :cell-class-name="addClass"
    >
      <el-table-column
        prop="name"
        :label="tableName"
        fixed
        :width="tableData.length === 0 ? '1600' : tableName=='日期' ? 120 : 280"
        show-overflow-tooltip
        sortable
      />
      <template v-for="(power, index) in tableHead">
        <el-table-column
          :key="index"
          :prop="power"
          :label="power"
          align="center"
          width="60"
        />
      </template>
    </el-table>
  </div>
</template>

<script>
import { uniqueArr } from '@/utils'
export default {
  name: 'TableWapper',
  props: {
    tableName: {
      type: String,
      default: '日期'
    },
    databases: {
      type: Array,
      default: () => {
        return [{
          'map': {
            '08:00': '',
            '08:15': '',
            '08:30': '',
            '08:45': '',
            '09:00': '',
            '09:15': '',
            '09:30': '',
            '09:45': '',
            '10:00': '',
            '10:15': '',
            '10:30': '',
            '10:45': '',
            '11:00': '',
            '11:15': '',
            '11:30': '',
            '11:45': '',
            '12:00': '',
            '12:15': '',
            '12:30': '',
            '12:45': '',
            '13:00': '',
            '13:15': '',
            '13:30': '',
            '13:45': '',
            '14:00': ''
          },
          'unit': '%',
          'name': ''
        }]
      }
    }
  },
  data() {
    return {
      tableHead: [],
      tableData: []
    }
  },
  watch: {
    databases: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fmtData()
          // return newVal
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.fmtData()
  },
  methods: {
    fmtData() {
      let tempHead = []
      const dataList = this.databases.map(item => {
        tempHead = [...tempHead, ...(Object.keys(item.map))]
        const obj = { ...item, ...item.map }
        delete obj.map
        return obj
      })
      this.tableData = dataList
      this.tableHead = uniqueArr(tempHead)
    },
    // 修改单元格样式的方法
    addClass({ row, column, rowIndex, columnIndex }) {
      if (row[column.label] < 5) {
        return 'cell-bg-0_5'
      } else if (row[column.label] < 10) {
        return 'cell-bg-5_10'
      } else if (row[column.label] < 20) {
        return 'cell-bg-10_20'
      } else if (row[column.label] > 20) {
        return 'cell-bg-20'
      } else {
        return ''
      }
    }
  }}
</script>

<style lang="scss" scoped>
.table-wapper {
  ::v-deep {
    .el-table {
      .el-table__body {
        td {
          padding: 3px 0 !important;
        }
      }
      .el-table__header tr,
      .el-table__header th {
          background: #fff !important;
          color: rgb(60, 62, 66);
      }
      .cell-bg-0_5{
        background: rgb(195, 240, 196)!important;
      }
      .cell-bg-5_10{
        background: rgb(255, 239, 131)!important;
      }
      .cell-bg-10_20{
        background: rgb(253, 193, 201)!important;
      }
      .cell-bg-20{
        background: rgb(239, 19, 0)!important;
        color: #fff;
      }
    }
  }
}
</style>
