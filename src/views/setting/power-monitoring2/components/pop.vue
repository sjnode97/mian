<template>
  <div id="wrap1">
    <div class="title">弹窗数据</div>
    <!--    {{ dataProp }}-->
    <div @click="originCamera">回到原点</div>
    <div @click="save">保存</div>
    <div @click="preview">预览</div>
    <div @click="fetchData">请求</div>
    <div class="center">
      <div class="row">
        <span class="row-title">场景编辑</span>
        <el-select v-model="value11" placeholder="请选择" @change="editRender">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="row">
        <span class="row-title">地面编辑</span>
        <el-select v-model="valueFloor" placeholder="请选择" @change="editFloor">
          <el-option
            v-for="item in optionFloor"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div v-if="dataProp.type === 'obj'" class="center">
      <div class="row">
        <span class="row-title">名字</span>
        <el-input v-model="dataProp.name" maxlength="10" placeholder="" type="text" />
      </div>
      <div class="row">
        <span class="row-title-row">模型坐标更改</span>
        <span class="row-title">左右</span>
        <el-input v-model="dataProp.position.x" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">高低</span>
        <el-input v-model="dataProp.position.y" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">前后</span>
        <el-input v-model="dataProp.position.z" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title-row">模型旋转更改</span>
        <span class="row-title">左右</span>
        <el-input v-model="dataProp.rotation.x" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">高低</span>
        <el-input v-model="dataProp.rotation.y" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">前后</span>
        <el-input v-model="dataProp.rotation.z" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title-row">模型大小更改</span>
        <span class="row-title">左右</span>
        <el-input v-model="dataProp.scale.x" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">上下</span>
        <el-input v-model="dataProp.scale.y" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">前后</span>
        <el-input v-model="dataProp.scale.z" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row color">
        <span class="row-title">颜色编辑器</span>
        <el-color-picker v-model="color" :show-alpha="true" color-format="rgb" @change="colorSele" />
      </div>
      <div class="row">
        <el-button type="danger" icon="el-icon-delete" circle @click="del" />
      </div>
    </div>
    <div v-else class="center">
      <div class="row">
        <span class="row-title-row">模型坐标更改</span>
        <span class="row-title">左右</span>
        <el-input v-model="dataProp.position.x" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">高低</span>
        <el-input v-model="dataProp.position.y" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">前后</span>
        <el-input v-model="dataProp.position.z" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title-row">模型大小更改</span>
        <span class="row-title">左右</span>
        <el-input v-model="dataProp.scale.x" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">上下</span>
        <el-input v-model="dataProp.scale.y" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <span class="row-title">前后</span>
        <el-input v-model="dataProp.scale.z" maxlength="10" placeholder="" type="number" />
      </div>
      <div class="row">
        <el-button class="row-title-row" type="primary" round size="mini" @click="popData">弹窗数据配置</el-button>
      </div>
      <div class="row">
        <el-button type="danger" icon="el-icon-delete" circle @click="del" />
      </div>
    </div>
    <el-dialog title="悬浮框编辑" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <canvas ref="canvas" class="canvas" />
        </el-form-item>
        <el-form-item label="编辑标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" @input="initCanvas" />
        </el-form-item>
        <el-form-item label="编辑行列" :label-width="formLabelWidth">
          <div
            width="80%"
          >
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <div v-for="(item,index) in formInline.list" :key="index" class="line" style="border: #1ec0ff 1px solid">
                <span v-for="(i,k) in item" :key="k">
                  <el-form-item label="">
                    <el-input v-model="i.name" style="width: 60px" />
                    <el-select v-model="i.value" placeholder="请选择" @change="seleChange($event, i)">
                      <el-option v-for="(d, y) in seleData" :key="y" :label="d.name" :value="d.id" />
                    </el-select>
                  </el-form-item>
                </span>
                <el-form-item>
                  <el-button v-if="showDel" @click="delRow(index)">删除当前行</el-button>
                  <el-button @click="delList(index)">删除当前列</el-button>
                  <el-button type="primary" style="width:80px" size="mini" @click="addList(index)">新增列</el-button>
                </el-form-item>
              </div>
              <div style="text-align: left;">
                <el-button type="primary" size="mini" style="width:80px" @click="addRow">新增行</el-button>
              </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" size="mini" @click="addSubmit">确 定</el-button>
            </span>
          </div>
        </el-form-item>
        <!--<el-form-item label="编辑数据" :label-width="formLabelWidth">
          <el-select v-model="form.value" placeholder="请选择" @change="seleChange($event)">
            &lt;!&ndash;@change="seleChange($event)"&ndash;&gt;
            <el-option
              v-for="data in seleData"
              :key="data.id"
              :label="data.name"
              :value="data.id"
            />
          </el-select>
        </el-form-item>-->
        <el-form-item label="宽度" :label-width="formLabelWidth">
          <el-input v-model="canvasWidth" :disabled="true" autocomplete="off" @input="initCanvas" />
        </el-form-item>
        <el-form-item label="高度" :label-width="formLabelWidth">
          <el-input v-model="canvasHeight" :disabled="true" autocomplete="off" @input="initCanvas" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="popClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import * as THREE from 'three'
import axios from 'axios'
// import {postData} from "@/api/setting/power-monitoring";
function drawRoundRectPath(cxt, width, height, radius) {
  cxt.beginPath(0)
  // 从右下角顺时针绘制，弧度从0到1/2PI
  cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2)

  // 矩形下边线
  cxt.lineTo(radius, height)

  // 左下角圆弧，弧度从1/2PI到PI
  cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI)

  // 矩形左边线
  cxt.lineTo(0, radius)

  // 左上角圆弧，弧度从PI到3/2PI
  cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2)

  // 上边线
  cxt.lineTo(width - radius, 0)

  // 右上角圆弧
  cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2)

  // 右边线
  cxt.lineTo(width, height - radius)
  cxt.closePath()
}
/** 该方法用来绘制圆角矩形
   *@param cxt:canvas的上下文环境
   *@param x:左上角x轴坐标
   *@param y:左上角y轴坐标
   *@param width:矩形的宽度
   *@param height:矩形的高度
   *@param radius:圆的半径
   *@param lineWidth:线条粗细
   *@param strokeColor:线条颜色
   **/
// eslint-disable-next-line no-unused-vars
function strokeRoundRect(cxt, x, y, width, height, radius, lineWidth, strokeColor) {
  // 圆的直径必然要小于矩形的宽高
  if (2 * radius > width || 2 * radius > height) { return false }

  cxt.save()
  cxt.translate(x, y)
  // 绘制圆角矩形的各个边
  // eslint-disable-next-line no-undef
  drawRoundRectPath(cxt, width, height, radius)
  cxt.lineWidth = lineWidth
  cxt.strokeStyle = strokeColor // '#000ef3'
  cxt.stroke()
  cxt.restore()
}
export default {
  name: 'Pop',
  props: {
    dataProp: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      seleType: '',
      showDel: false,
      tableTypeOptions: [
        {
          tableType: '',
          options: [
            {
              value: 'value',
              label: '输入框'
            }, {
              value: 'number',
              label: '绑定值'
            }
          ]
        },
        {
          tableType: '',
          options: [
            {
              value: 'value',
              label: '输入框'
            }, {
              value: 'number',
              label: '绑定值'
            }
          ]
        },
        {
          tableType: '',
          options: [
            {
              value: 'value',
              label: '输入框'
            }, {
              value: 'number',
              label: '绑定值'
            }
          ]
        }
      ],
      color: '#99EF1219',
      options: [
        {
          value: 0,
          label: 'vivo'
        }, {
          value: 1,
          label: '星空'
        }, {
          value: 2,
          label: '公园'
        }, {
          value: 3,
          label: '天空'
        }, {
          value: 4,
          label: 'vivo2'
        }],
      value11: '',
      optionFloor: [
        {
          value: 0,
          label: '水泥'
        }, {
          value: 1,
          label: '土地'
        }
      ],
      valueFloor: '',
      value: '',
      sortLine: 1,
      sortColumn: 1,
      titleSpirit: ['支路总数'],
      seleTitle: '我是标题',
      seleData: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      canvasTitlex: 60,
      canvasTitley: 90,
      formInline: {
        list: [
          [
            {
              name: '',
              value: '',
              idName: ''
            }
          ]
        ]
      },
      canvasHeight: 150,
      canvasWidth: 300,
      form: {
        height: 150,
        width: 300,
        name: '我是标题',
        region: '',
        spiritData: [
          [
            {
              value: '我是个标题'
            },
            {
              number: '我是数据1'
            }
          ],
          [
            {
              number: '我是数据1'
            }
          ],
          [
            {
              number: '我是数据1'
            }
          ]
        ],
        value: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  computed: {},
  watch: { // scale  rotation  name
    dataProp: {
      handler() {
        console.log(this.dataProp)
        this.$parent.render()
      },
      deep: true
    },
    formInline: {
      handler(newVal) {
        this.showDel = newVal.list.length >= 2
        this.initCanvas()
      },
      deep: true
    }
  },
  update(e) {
    console.log(e)
    console.log(this.tableData)
  },
  created() {
    // http://192.168.0.47:9903/threeDimensional/saveBody
    /* axios.post('/item/business/threeDimensional/saveBody', {}) //
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })*/
    /* axios.get('/item/business/equipment/listByPowerId', {
      params: {
        powerId: 1
      }
    }) //
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })*/
    /*    let data = postData()
    console.log(data);*/
    this.fetchData()
  },
  mounted() {},
  methods: {
    delList(index) {
      this.formInline.list[index].splice(this.formInline.list[index].length - 1, 1)
    },
    delRow(index) {
      this.formInline.list.splice(index, 1)
    },
    addList(index) {
      console.log(index)
      this.formInline.list[index].push({
        name: '',
        value: ''
      })
      console.log(this.formInline)
    },
    addRow() {
      this.formInline.list.push([{
        name: '',
        value: ''
      }])
      console.log(this.formInline)
    },
    addSubmit() {
      console.log(this.formInline)
    },
    addLine(e) {
      /* console.log('addLine')
      console.log(this.sortLine)
      this.form.spiritData.splice(this.sortLine - 1, 0, [
        {
          value: '我是个标题fa'
        },
        {
          number: '我是数据fas'
        }
      ])
      console.log(this.form.spiritData)*/
      this.tableData.splice(this.sortLine - 1, 0, {
        seleType: '',
        seleTypeOptions: [
          {
            value: 'value',
            label: '输入框'
          }, {
            value: 'number',
            label: '绑定值'
          }
        ]
      })
    },
    initCanvas() {
      /* const ctx = this.dataProp.canvas.getContext('2d')
      console.log(ctx)*/
      this.$nextTick(() => {
        console.log(this.formInline.list[0])
        const width = (this.formInline.list[0].length || 1) * 200
        const height = (this.formInline.list.length + 1) * 40 + 60
        const canvas = this.$refs.canvas
        console.log(width)
        console.log(height)
        this.canvasHeight = height
        this.canvasWidth = width
        /* this.form.width = width * 160
        this.form.height = height * 40*/
        canvas.width = width
        canvas.height = height
        // canvas.style.display = 'block'
        const ctx1 = canvas.getContext('2d')
        console.log(ctx1)
        ctx1.clearRect(0, 0, width, height)
        // const title = this.seleTitle
        ctx1.font = '20px 黑体'
        ctx1.textAlign = 'left' // this.titleSpirit
        ctx1.fillStyle = '#ffffff'
        /*
        * formInline.list
        */
        const x = width / 2 - this.form.name.length + 8
        strokeRoundRect(ctx1, 5, 5, width - 8, height - 8, 10, 4, 'rgba(255,255,255,0.9)')
        this.canvasTitle(ctx1, '22px 黑体', 'center', '#ffffff', this.form.name, x, 40)
        this.drawing(ctx1, this.titleSpirit, this.formInline.list, 'rgba(125,125,125,0.6)', '#ffffff', '16px 黑体', width - 8, height - 8, this.canvasTitlex, this.canvasTitley)
        ctx1.moveTo(30, 56)
        ctx1.lineTo(width - 30, 56)
        ctx1.lineWidth = 2
        ctx1.strokeStyle = 'rgba(255 ,255 ,255 ,1)'
        ctx1.stroke()
      })
    },
    popData(item) {
      console.log(item)
      this.dialogFormVisible = true
      this.initCanvas()
    },
    popClose() {
      this.dialogFormVisible = false
      // this.popInit(this.form.value)
    },
    fetchData() {
      const _this = this
      axios.get('/item/business//threeDimensional/bindParam', {}) //
        .then(function(response) {
          console.log(response)
          _this.seleData = response.data.data
        })
        .catch(function(error) {
          console.log(error)
        })
      console.log(this.seleData)
    },
    seleChange(item, i) {
      const obj = this.seleData.find((data) => {
        return data.id === item
      })
      i.idName = obj.name || ''
      console.log(item)
      console.log(i)
      // this.initCanvas()
      // ctx1 = ctx
    },
    canvasTitle(ctx, font, textAlign, color, txt, x, y) {
      ctx.font = font
      ctx.textAlign = textAlign
      ctx.strokeStyle = color
      ctx.fillText(txt, x, y)
    },
    drawing(ctx, name, data, color1, color2, style, w, h, x, y) {
      console.log(ctx)
      // const height = h * name.length
      ctx.fillStyle = color1
      // strokeRoundRect(ctx, 5, 5, w, h, 10, 3, 'rgba(255,255,255,0.55)')
      ctx.fill()
      ctx.stroke()
      ctx.font = style
      ctx.fillStyle = color2
      // const widthStr = this.titleSpirit1 + (data + 20)
      console.log(data)
      // ctx.fillText(data, x, y)
      for (let i = 0; i < data.length; i++) {
        const y = (i + 1) * 40 + 40
        console.log(i)
        for (let k = 0; k < data[i].length; k++) {
          const item = data[i][k]
          console.log(item)
          let x = 0
          if (k === 0) {
            x = 40
          } else {
            x = (k + 1) * 110
          }
          console.log(x)
          console.log(y)
          ctx.fillText(item.name, x, y)
          ctx.fillText(item.idName ? item.idName + '数据' : '', x + 90, y)
        }
      }
      // ctx.fillText(widthStr, 10, 40)
      ctx.stroke()
    },
    del() {
      this.$parent.del(this.dataProp.subscript)
      this.$parent.render()
    },
    colorSele(data) {
      console.log(data)
    },
    editRender(item) {
      console.log(item)
      this.$parent.editRender(item)
    },
    editFloor(item) {
      console.log(item)
      this.$parent.editFloor(item)
    },
    originCamera() {
      this.$parent.originCamera()
    },
    save() {
      this.$parent.save()
    },
    preview() {
      this.$parent.preview()
    }
  }
}
</script>

<style scoped lang="scss">
  .line {
    /*border: 1px #00ffff solid;*/
    padding: 2px 0;
    margin-bottom: 10px;
  }
  .active {
    background: #1ec0ff;
    color: #fff;
  }
 #wrap1 {
   .edit {
     margin-bottom: 5px;
     .line {
       .column {
         cursor: pointer;
         margin-left: 5px;
         font-size: 12px;
         width: 100px;
         text-align: center;
         color: #ffffff;
         border: 1px #ffffff solid;
       }
     }
   }
   width: 200px;
   height: calc(100vh - 60px); //calc(100% - 60px)
   background: #1C2026;
   color: #9a9a9a;
   font-size: 12px;
   .title {
     width: 100%;
     background: #2E343C;
     line-height: 28px;
     text-align: center;
   }
   .center {
     padding: 10px;
     .color {
       margin-top: 20px;
     }
     .row {
       margin-bottom: 10px;
       .edit-render {
         width: 60px;
       }
       .row-title-row {
         display: block;
         margin-top: 20px;
         margin-bottom: 10px;
       }
       .row-title {
         width: 70px;
         display: inline-block;
         margin-right: 10px;
       }
     }
   }
 }
  ::v-deep {
    /*.el-form-item {
      margin: 0;
      margin-bottom: 10px;
    }*/
    tr th {
      height: 0;
    }
    .el-table__header th {
      height: 0;
      line-height: 0;
      padding: 0;
      border: none;
    }
    colgroup{
      height: 0;
    }
    col {
      height: 0;
    }
    .has-gutter {
      height: 0;
    }
    .el-dialog {
      background: rgba(0, 0, 0, 0.7) url("~@/assets/pop/popBackground.png") 50% 50% no-repeat; //url("~@/public/pop/popBackground.png") no-repeat
      background-size: 100% 100%;
      color: #fff;
      .el-dialog__header {
        padding-top: 50px;
        padding-left: 50px;
        .el-dialog__title {
          color: #fff;
        }
      }
      .el-dialog__body {
        .el-form-item__label {
          color: #ffffff;
        }
      }
    }
    .el-input {
      width: 50%;
    }
    .el-select {
      width: 50%;
      font-size: 10px;
    }
    .el-input--suffix {
      width: 100%;
    }
    .el-input__inner {
      width: 100%;
      height: 20px;
      line-height: 20px;
      border: 1px solid #0b0c0d;
      font-size: 10px;
      color: #c1c1c1;
      border-radius: 0;
      background: #262C33;
    }
    .el-color-picker__trigger {
      width: 30px;
      height: 30px;
    }
  }
</style>
