<template>
  <div class="menu">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="基础模型">
        <div class="menu-list" @click="addCube">
          <div class="title">盒子模型</div>
          <div class="img">
            <img :src="img.box" alt="#">
          </div>
        </div>
        <div class="menu-list" @click="addBall">
          <div class="title">球形模型</div>
          <div class="img">
            <img :src="img.ball" alt="#">
          </div>
        </div>
        <div class="menu-list" @click="addCylinder">
          <div class="title">圆柱模型</div>
          <div class="img">
            <img :src="img.cylinder" alt="#">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="线段绘制">
        <div class="menu-list" @click="addLine">
          <div class="title">直线模型</div>
          <div class="img">
            <img :src="img.line" alt="#">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="复杂模型">
        <div class="menu-list" @click="addObjShui">
          <div class="title">水管模型</div>
          <div class="img">
            <img :src="img.pipe" alt="#">
          </div>
        </div>
        <div class="menu-list" @click="addObjWrap">
          <div class="title">盒灯模型</div>
          <div class="img">
            <img :src="img.light" alt="#">
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="悬浮窗口">
        <div class="menu-list" @click="addSpite">
          <div class="title">精灵图</div>
          <div class="img">
            <img :src="img.spirit" alt="#">
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import box from '/public/menu-img/box.png'
import light from '/public/menu-img/light.png'
import pipe from '/public/menu-img/water-pipe.png'
import line from '/public/menu-img/line.png'
import ball from '/public/menu-img/ball.png'
import cylinder from '/public/menu-img/cylinder.png'
import spirit from '/public/menu-img/spirit.png'
export default {
  name: 'Menu',
  data() {
    return {
      img: {
        box,
        light,
        pipe,
        line,
        ball,
        cylinder,
        spirit
      },
      tabPosition: 'left'
    }
  },
  create() {
  },
  methods: {
    addCube() {
      this.$parent.addCube()
    },
    addObjShui() {
      this.$parent.addObjShui()
    },
    addObjWrap() {
      this.$parent.addObjWrap()
    },
    addLine() {
      this.$parent.addLine()
    },
    addBall() {
      this.$parent.addBall()
    },
    addCylinder() {
      this.$parent.addCylinder()
    },
    addSpite(item) {
      this.$parent.addSpite(item)
    }
  }
}
</script>

<style scoped lang="scss">
  .menu {
    width: 100%;
    background: #0A0B0D;
    padding: 15px;
    .menu-list {
      width: 100%;
      margin-bottom: 10px;
      cursor: pointer;
      .title {
        width: 100%;
        text-align: left;
        background: #212326;
        line-height: 18px;
        color: #afafaf;
        font-size: 12px;
      }
      .img {
        width: 100%;
        background: #181a1c;
        img {
          display: block;
          width: 50%;
          margin: 0 auto;
        }
      }
    }
  }
  ::v-deep {
    .el-tabs__header {
      width: 80px;
      font-size: 14px;
      color: #b7b9bd;
    }
    .el-tabs__item {
      font-size: 10px;
      color: #b7b9bd;
    }
    .is-active {
      color: #1890ff;
    }
  }
</style>
