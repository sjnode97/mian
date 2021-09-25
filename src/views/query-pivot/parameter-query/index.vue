<template>
  <div id="wrap">
    <div class="top-nav">
      <SearchNav />
    </div>
    <div class="box-center">
      <div class="tree">
        <el-scrollbar class="tree-top">
          <div class="title">
            <span>设备类型:</span>
            <el-select v-model="valueTop" placeholder="请选择">
              <el-option
                v-for="item in optionsTop"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-tree
            :data="treeDataTop"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[0]"
          />
        </el-scrollbar>
        <el-scrollbar class="tree-bottom">
          <div class="title">
            <span>计量仪器:</span>
            <el-select v-model="valueBottom" placeholder="请选择">
              <el-option
                v-for="item in optionsBottom"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-tree
            :data="treeDataBottom"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[0]"
          />
        </el-scrollbar>
      </div>
      <div class="query-pivot">
        <div class="query-pivot-title">
          <span>1#方阵1#组串逆变器 交流电量 趋势图</span>
        </div>
        <div class="selector">
          同日
        </div>
        <div class="echarts">
          <Chart
            :data="charts.data"
            :x-axis-data="charts.xAxisData"
            :singley-axis-unit="charts.singleyAxisUnit"
          />
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            :span-method="objectSpanMethod"
            border
            style="width: 100%; margin-top: 20px"
          >
            <el-table-column
              prop="id"
              label="ID"
              width="180"
            />
            <el-table-column
              prop="name"
              label="姓名"
            />
            <el-table-column
              prop="amount1"
              label="数值 1（元）"
            />
            <el-table-column
              prop="amount2"
              label="数值 2（元）"
            />
            <el-table-column
              prop="amount3"
              label="数值 3（元）"
            />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchNav from '@/components/searchNav'
import Chart from '@/components/Echarts/bar'
export default {
  name: 'Index',
  components: {
    SearchNav,
    Chart
  },
  data() {
    return {
      tableData: [
        {
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }
      ],
      charts: {
        data: [
          {
            name: '发电量',
            type: 'bar',
            data: ['55', '55', '55', '55']
          }
        ],
        xAxisData: ['2021-01', '2021-01', '2021-01', '2021-01'],
        singleyAxisUnit: 'kwh'
      },
      treeDataTop: [{
        id: 1,
        label: '一级 2',
        disabled: true,
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2'
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2'
          }]
        }]
      }],
      treeDataBottom: [{
        id: 1,
        label: '一级 2',
        disabled: true,
        children: [{
          id: 3,
          label: '二级 2-1',
          children: [{
            id: 4,
            label: '三级 3-1-1'
          }, {
            id: 5,
            label: '三级 3-1-2'
          }]
        }, {
          id: 2,
          label: '二级 2-2',
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      optionsTop: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      optionsBottom: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      valueTop: '',
      valueBottom: ''
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 1) {
        if (rowIndex % 4 === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  #wrap{
    width: 100%;
    .top-nav {
      width: 100%;
      height: 2.60417vw;
      background: #871717;
    }
    .box-center {
      width: 95%;
      margin: 0 auto;
      margin-top: 1vw;
      display: flex;
      .tree {
        width: 25%;
        height: calc(100vh - 3.64583vw - 3.60417vw);
        .tree-top {
          /*margin-top: 8%;*/
          width: 100%;
          height: 49%;
          background: #ffffff;
          overflow-x: hidden;
          /*overflow: scroll;*/
        }
        .tree-bottom {
          margin-top: 4%;
          width: 100%;
          height: 48%;
          background: #ffffff;
          overflow-x: hidden;
          /*overflow: scroll;*/
        }
      }
      .query-pivot {
        width: 72%;
        height: calc(100vh - 3.64583vw - 3.9vw);
        background: #ffffff;
        margin-left: 3%;
        .query-pivot-title {
          width: 100%;
          text-align: center;
        }
        .selector {
          width: 100%;
        }
        .echarts {
          width: 100%;
          height: 60%;
        }
        .table {
          width: 95%;
          margin: 0 auto;
        }
      }
    }
  }
  ::v-deep{
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
