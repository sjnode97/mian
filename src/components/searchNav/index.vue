<template>
  <div class="search">
    <el-form :inline="true" :model="form" class="demo-form-inline">

      <el-form-item v-if="showStation" label="电站名称：">
        <el-select v-model="form.powerStationId" clearable>
          <el-option v-for="(item,index) in selectName" :key="index" :label="item.name" :value="item.id*1" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="circleList.length>=2&&showDate" class="cycle" label="数据周期：">
        <el-radio-group v-model="circle" size="mini">
          <el-radio-button v-for="(item,index) in circleList" :key="index" :label="item" />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="showDate"
        class="time"
        :label="times=='year'?'年份：':(times=='month'?'月份:':'日期：')"
      >
        <el-date-picker
          v-model="form.startTime"
          :type="times"
          placeholder="请选择"
          :value-format="times=='year'?'yyyy':(times=='month'?'yyyy-MM':'yyyy-MM-dd')"
        />
      </el-form-item>

      <el-form-item v-if="controls&&showDate" class="controls">
        <el-button size="mini" @click="goLast">上一{{ times=="date"?"日":(times=="month"?'月':"年") }}</el-button>
        <el-button size="mini" @click="goNext">下一{{ times=="date"?"日":(times=="month"?'月':"年") }}</el-button>
      </el-form-item>

      <el-form-item>
        <el-button class="submit" size="small" type="warning" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index.js'
import { stationList } from '@/api/common'
export default {
  props: {
    // date 日期
    // month 月份
    // year 年份
    time: {
      type: String,
      default: () => {
        return 'date'
      }
    },
    // 是否展示电站
    showStation: {
      type: Boolean,
      default: () => {
        return true
      }
    },

    // 显示日期
    showDate: {
      type: Boolean,
      default: () => {
        return true
      }
    },

    // 数据周期项数  length小于2不显示
    // ['日', '月', '年']  ['月', '年']
    circleList: {
      type: Array,
      default: () => {
        return []
      }
    },

    // 时间控制 (下一日，下一月，下一年等)
    controls: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },

  data() {
    return {
      times: this.time, // vue不给直接修改props的值，所以用另一个变量接收
      // 后端定义的格式
      form: {
        powerStationId: '',
        startTime: ''
      },
      selectName: [],
      circle: '' // 日月年类型
    }
  },

  watch: {
    circle: {
      handler(val) {
        if (val === '日') {
          this.times = 'date'
        } else if (val === '月') {
          this.times = 'month'
        } else if (val === '年') {
          this.times = 'year'
        }

        // 如果显示日期
        if (this.showDate) {
          this.initTime()
        }
      }
    }

  },

  async created() {
    console.log(this.times)
    // 如果展示电站名称
    if (this.showStation) {
      await this.getStationList()
      this.form.powerStationId = this.selectName[0].id * 1
    }

    // 显示数据周期 默认赋值周期的类型
    if (this.circleList.length >= 2) {
      this.circle = this.circleList[0]
    }

    // 如果显示日期
    if (this.showDate) {
      this.initTime()
    }
  },

  methods: {

    // 初始化时间
    initTime() {
      var time = new Date().getTime()
      if (this.times === 'year') {
        this.form.startTime = parseTime(time, '{y}')
      } else if (this.times === 'month') {
        this.form.startTime = parseTime(time, '{y}-{m}')
      } else if (this.times === 'date') {
        this.form.startTime = parseTime(time, '{y}-{m}-{d}')
      }
    },

    // 上一(日，月，年)
    goLast() {
      this.controlsTime('-')
    },

    // 下一(日，月，年)
    goNext() {
      this.controlsTime('+')
    },

    controlsTime(symbol) {
      if (this.times === 'date') {
        // eslint-disable-next-line no-eval
        const date1 = eval(new Date(this.form.startTime).getTime() + symbol + 3600 * 1000 * 24)
        this.form.startTime = parseTime(date1, '{y}-{m}-{d}')
      } else if (this.times === 'month') {
        // eslint-disable-next-line no-eval
        const date1 = eval(new Date(this.form.startTime).getTime() + symbol + 3600 * 1000 * 24 * 31)
        this.form.startTime = parseTime(date1, '{y}-{m}')
      } else if (this.times === 'year') {
        // eslint-disable-next-line no-eval
        const date1 = eval(new Date(this.form.startTime).getTime() + symbol + 3600 * 1000 * 24 * 31 * 12)
        this.form.startTime = parseTime(date1, '{y}')
      }
    },

    // 获取电站
    async getStationList() {
      const { data } = await stationList()
      this.selectName = data
    },

    onSubmit() {
      // this.$emit('Info', this.form)
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
    .search{
        height: 50px;
        background: $black-dark;
        padding:0 2% 0 2%;
        display: flex;
        align-items: center;
        position: fixed;
        z-index: 11;
        width: 100%;
        top: 70px;
        .el-form{
            display: flex;
            .el-form-item{
                margin-bottom: 0px;
                ::v-deep .el-form-item__label{
                    font-size:14px;
                    color:#cfe0f9;
                }
                ::v-deep .el-select{
                    width: 300px;
                     .el-input__inner{
                        background: transparent;
                        border-radius: 0;
                        line-height: 30px;
                        height: 30px;
                        color:#fff;
                    }
                }
            }
            .cycle{
              margin-left: 20px;
            }
            .time{
                margin-left: 20px;
                ::v-deep .el-date-editor{
                     .el-input__inner{
                        background: transparent;
                        border-radius: 0;
                        line-height: 32px;
                        height: 32px;
                        color:#fff;
                    }
                }
            }

            .controls{
              margin:0 20px;
            }

            .submit{
                color:black;
                border-radius: 0;
            }
        }
    }
</style>
