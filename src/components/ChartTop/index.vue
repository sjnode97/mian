<template>
  <div id="wrap">
    <div class="date">
      <div class="datePicker">
        {{ dateitem }}
        <el-date-picker
          v-model="value1"
          type="date"
          format="yyyy-MM-dd"
          placeholder="选择日期"
        />
        <el-button type="primary" plain size="small">上一日</el-button>
        <el-button type="primary" plain size="small">下一日</el-button>
      </div>
      <div class="eightBottun">
        <div v-for="(item, key) in rightItem" :key="key">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    dateitem: {
      type: String,
      default: () => {
        return '日期'
      }
    },
    rightItem: {
      type: Array,
      default: () => {
        return [
          '电流',
          '线电压',
          '有功功率',
          '无功功率',
          '现在功率',
          '绕组温度'
        ]
      }
    }
  },
  data() {
    return {
      value1: '2021-07-26',
      ii: '666'
    }
  }
}
</script>

<style scoped lang="scss">
  #wrap {
    width: 100%;
    height: 60px;
    background: #5BBCF9;
    box-shadow: 0 1px 3px 0 rgba(104, 104, 104, 0.4);
    .date {
      margin-left: 1%;
      display: flex;
      justify-content: space-between;
      .datePicker {
        font-size: 16px;
        color: #fff;
        line-height: 60px;
        ::v-deep {
          .el-input__inner {
            height:28px;
            line-height: 40px;
          }
          .el-button--primary {
            margin-top: -3px;
            display: inline-block;
            padding: 8px 15px !important;
          }
        }
      }
      .eightBottun {
        text-align: right;
        display: flex;
        line-height: 60px;
        color: #ffffff;
        font-size: 16px;
        div {
          position: relative;
          width: 120px;
          line-height: 60px;
          text-align: center;
        }
        div:after{
          content: '';
          width: 1px;
          height: 40%;
          background-color: #ffffff;
          position: absolute;
          right: 0;
          top: 30%;
        }
        div:last-child:after {
          content: '';
          background: none;
        }
      }
    }
  }
</style>
