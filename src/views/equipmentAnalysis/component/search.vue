<template>
  <div class="search-wapper">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item v-if="showStation" :label="labelName">
        <el-select v-model="form.powerStationId" clearable @change="onSubmit">
          <el-option
            v-for="(item, index) in selectName"
            :key="index"
            :label="item.name"
            :value="item.id * 1"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="showDate" label="起始及截止日期：">
        <el-date-picker
          v-model="form.dataRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          size="mini"
          :picker-options="pickerOptions"
          @change="onSubmit"
        />
      </el-form-item>
      <el-form-item v-if="showTime" class="time" label="起始及截止时间：">
        <el-time-picker
          v-model="form.timeRange"
          is-range
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
          format="HH:mm"
          value-format="HH:mm"
          size="mini"
          @change="onSubmit"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index.js'
import { stationList } from '@/api/common'
export default {
  props: {
    labelName: {
      type: String,
      default: () => {
        return '电站名称：'
      }
    },
    // 是否展示电站
    showStation: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    // 是否展示日期范围
    showDate: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    // 是否展示时间范围
    showTime: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },

  data() {
    return {
      // 后端定义的格式
      form: {
        powerStationId: '',
        timeRange: ['08:00', '17:00'],
        dataRange: [
          parseTime(new Date(new Date().getFullYear(), (new Date().getMonth()), (new Date().getDate() - 1)), '{y}-{m}-{d}'),
          parseTime(new Date(), '{y}-{m}-{d}')]
      },
      timeInit: [],
      selectName: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },

  async created() {
    // 如果展示电站名称
    if (this.showStation) {
      await this.getStationList()
      this.form.powerStationId = this.selectName[0].id * 1
    }
  },

  methods: {
    async getStationList() {
      const { data } = await stationList()
      this.selectName = data
    },

    onSubmit() {
      this.form.showStation = this.showStation
      this.form.showDate = this.showDate
      this.form.showTime = this.showTime
      this.$emit('FormData', this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.search-wapper {
  margin-left: 20px;
  .el-form {
    display: flex;
    margin-bottom: 0;
    .el-form-item {
      margin-bottom: 0px;
      ::v-deep .el-form-item__label {
        font-size: 14px;
      }
      ::v-deep .el-select {
        .el-input__inner {
          background: transparent;
          line-height: 30px;
          height: 30px;
        }
      }
    }
    .time {
      margin-left: 20px;
      ::v-deep .el-date-editor {
        .el-input__inner {
          background: transparent;
          border-radius: 0;
          line-height: 32px;
          height: 32px;
          color: #fff;
        }
      }
    }

    .submit {
      color: black;
      border-radius: 0;
    }
  }
}
</style>
