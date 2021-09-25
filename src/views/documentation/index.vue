<template>
  <div>
    <div id="box">
      <Search ref="topSearch" controls :circle-list="['日', '月', '年']" time="date" @Info="getInfo" />
      <!-- <div class="iconfont icon-iconset0251" /> -->
      <Pie

        :pie-data="data"
        :bg-color="bgColor"
        :show-legend="true"
        :rose-type="false"
        :radius="radius"
        :tooltip="true"
        text="我传过来的标题"
        class="pie"
      />
      <!--
      is-double-y为false（单轴） singleyAxisUnit使用
      is-double-y为true（双轴） 配合doubleyAxis使用
      is-double-y（默认为false）
    -->
      <Bar
        :data="data1"
        :show-legend="true"
        :x-axis-data="xAxis"
        :is-double-y="true"
        :doubley-axis="doubleyAxis"
        :title="{
          text:'我传过来的标题',
          left:'120px'
        }"
        class="bar"
      />
    </div>
    <el-button @click="exportDataEvent('table')">导出数据</el-button>
    <el-table
      id="table"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>

</template>

<script>
import Pie from '@/components/Echarts/pie'
import Bar from '@/components/Echarts/bar'
import excel from '@/utils/excel'
import Search from '@/components/searchNav'

export default {
  name: 'Documentation',
  components: { Pie, Bar, Search },
  data() {
    return {
      // 饼图开始
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 680, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' }
      ],
      bgColor: [
        '#0097FB',
        '#92E1FF',
        '#FFC227',
        '#30ECA6',
        '#FAC858'
      ],
      radius: ['70', '60%'],
      // 柱状图开始
      data1: [
        {
          name: '蒸发量',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },

        {
          name: '平均温度',
          type: 'bar',
          // yAxisIndex: 1, // 此属性必学配合双轴使用 :doubley-axis="true"
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        },
        {
          name: '蒸发量11',
          type: 'line',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        }

      ],
      // x轴data
      xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 双轴属性。默认第一个为左边
      doubleyAxis: [
        { name: '蒸发量(ml)' },
        { name: '温度(°C)' }
      ],
      // 单轴单位
      singleyAxisUnit: '重量(g)',

      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    exportDataEvent(id) {
      console.log(excel)
      excel(id)
    },
    getInfo() {

    }
  }
}
</script>

<style lang="scss" scoped>
  #box{
    overflow: hidden;
    margin:100px auto 0;
  }
  .pie , .bar{
    height: 350px;
    width:50%;
    float: left;
  }
</style>
