<template>
  <div id="wrap1">
    <div class="download">download</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="400"
    >
      <el-table-column
        prop="date"
        label="姓名"
        width="120"
      />
      <el-table-column label="高压侧">
        <el-table-column
          prop="outputKw"
          label="输出最大功率（kw）"
          sortable
        />
        <el-table-column
          prop="outputPower"
          label="输出电量（kw）"
          sortable
        />
      </el-table-column>
      <el-table-column label="低压侧">
        <el-table-column
          prop="inputKw"
          label="输入最大功率（kw）"
          sortable
        />
        <el-table-column
          prop="inputPower"
          label="输入电量（kw）"
          sortable
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TableWrap',
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200333
      }, {
        date: '2016-05-02',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200331
      }, {
        date: '2016-05-04',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200332
      }, {
        date: '2016-05-01',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200330
      }, {
        date: '2016-05-08',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200331
      }, {
        date: '2016-05-06',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200329
      }, {
        date: '2016-05-07',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200311
      }, {
        date: '2016-05-07',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200311
      }, {
        date: '2016-05-07',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200311
      }, {
        date: '2016-05-07',
        outputKw: '上海',
        outputPower: '普陀区',
        inputKw: '上海市普陀区金沙江路 1518 弄',
        inputPower: 200311
      }]
    }
  }
}
</script>
<style scoped lang="scss">
  #wrap1 {
    margin: 30px auto;
    width: 95%;
    .download {
      width: 100%;
      text-align: right;
    }
  }
</style>
