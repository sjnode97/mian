<template>
  <div id="wrap">
    <Menu class="menu" />
    <canvas v-show="false" id="canvas" />
    <div v-show="onShow" id="container-wrap" />
    <div v-show="!onShow" style="width: calc(90% - 200px);">3d场景构建中</div>
    <pop :data-prop="dataPop" />
  </div>
</template>
<script>
import * as THREE from 'three'
import DragControls from 'drag-controls'
DragControls.install({ THREE: THREE })
// eslint-disable-next-line no-unused-vars
import { OBJLoader } from 'three-obj-mtl-loader'
// eslint-disable-next-line no-unused-vars
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js'
// eslint-disable-next-line no-unused-vars
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'
import Pop from './components/pop'
import Menu from './components/menu'

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
  name: 'Index',
  components: {
    Pop,
    Menu
  },
  data() {
    return {
      onShow: false,
      cameraPersp: null,
      cameraOrtho: null,
      currentCamera: null,
      scene: null,
      renderer: null,
      control: null,
      orbit: null,
      // OrbitControls: null,
      dragcontrols: null,
      axes: null,
      objects: [],
      height: null,
      width: null,
      selectModel: false,
      dataPop: {
        position: {
          x: 0,
          y: 0,
          z: 0
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        scale: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    }
  },
  create() { },
  mounted() {
    this.init()
  },
  update() {
    // console.log(111111 + this.dataPop)
  },
  methods: {
    init() {
      this.height = window.innerHeight
      this.width = window.innerWidth - 400
      // console.log(7)
      this.renderer = new THREE.WebGLRenderer()
      // this.renderer.setPixelRatio(window.devicePixelRatio)
      // this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setSize(this.width, this.height)
      // this.renderer.setClearColor(0x434749, 1)
      document.querySelector('#container-wrap').appendChild(this.renderer.domElement)

      const aspect = this.width / this.height

      /* this.cameraPersp = new THREE.PerspectiveCamera(50, aspect, 0.01, 30000)
      this.cameraOrtho = new THREE.OrthographicCamera(-600 * aspect, 600 * aspect, 600, -600, 0.01, 30000)*/
      // this.OrbitControls = new THREE.OrbitControls(-600 * aspect, 600 * aspect, 600, -600, 0.01, 30000)
      this.currentCamera = new THREE.PerspectiveCamera(45, aspect, 0.1, 3000000)

      this.currentCamera.position.set(20, 5, 10)
      this.currentCamera.lookAt(0, 2, 0)
      this.scene = new THREE.Scene()
      /* const helper = new THREE.CameraHelper(this.currentCamera)
      this.scene.add(helper)*/
      /* this.scene.background = new THREE.CubeTextureLoader().setPath('/scene-render/vivo/')
        .load([
          '1.jpg',
          '2.jpg',
          '3.jpg',
          '4.jpg',
          '5.jpg',
          '6.jpg'
        ])*/
      this.orbit = new OrbitControls(this.currentCamera, this.renderer.domElement)
      // 视角最小距离
      this.orbit.minDistance = 1
      // 视角最远距离
      this.orbit.maxDistance = 7000

      // 惯性

      this.orbit.enableDamping = true

      // 动态阻尼系数

      this.orbit.dampingFactor = 0.1

      // 垂直旋转范围

      this.orbit.maxPolarAngle = Math.PI / 2.5

      this.orbit.minPolarAngle = -Math.PI / 2.5
      this.orbit.update()
      this.orbit.addEventListener('change', this.render)
      this.control = new TransformControls(this.currentCamera, this.renderer.domElement)
      this.control.addEventListener('change', this.render)
      this.control.addEventListener('dragging-changed', (event) => {
        // console.log(event)
        this.orbit.enabled = !event.value
      })

      this.scene.add(this.control)
      this.axes = new THREE.AxisHelper(800)
      this.scene.add(this.axes)

      this.cube()
      this.light()
      this.loadObj()
      setTimeout(() => {
        this.dragcontrol()
        this.render()
        this.onShow = true
      }, 1000)
      window.addEventListener('resize', this.onWindowResize)
    },
    cube() {
      // 第一个盒子
      const geometry = new THREE.BoxGeometry(2, 2, 2)
      const material = new THREE.MeshLambertMaterial({ color: 0x333333 })
      // eslint-disable-next-line new-cap
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(5, 5, 10)
      console.log(mesh)
      this.scene.add(mesh)

      // 第二个盒子
      const geometry1 = new THREE.BoxGeometry(-2, 2, 2)
      const material1 = new THREE.MeshLambertMaterial({ color: 0x99EF12 })
      // eslint-disable-next-line new-cap
      const mesh1 = new THREE.Mesh(geometry1, material1)
      mesh1.position.set(-5, 5, 10)
      this.scene.add(mesh1)
      // 平面构建
      /* // const meshMaterial = new THREE.MeshNormalMaterial()
      const meshMaterial = new THREE.MeshBasicMaterial()
      meshMaterial.side = THREE.DoubleSide
      const wireFrameMat = new THREE.MeshBasicMaterial(
        // { color: 0x3592C4 }
        { map: texture, side: THREE.DoubleSide } //transparent: true,
      )
      wireFrameMat.wireframe = true
      // wireFrameMat.side = THREE.DoubleSide

      // 平面添加组合材质

      const geom = new THREE.PlaneGeometry(
        20000, 20000, 200, 200
      )
      /!* const plane = SceneUtils.createMultiMaterialObject(geom, [
        meshMaterial,
        wireFrameMat
      ])*!/
      const plane = new THREE.Mesh(geom, wireFrameMat)*/
      /* const texture = THREE.ImageUtils.loadTexture(
        // "img3/1.png", 这个是相对位置也行
        '/scene-render/plane.jpg', // 这个是网络位置也行 不过大部分写
        null, function(t) {
          console.log(t)
        }
      )*/
      const geometry2 = new THREE.PlaneGeometry(2000, 2000)
      const material2 = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide }) // map: texture,  color: 0x333333   map: new THREE.COLOR(0x333333)
      material2.visible = false
      const plane = new THREE.Mesh(geometry2, material2)
      plane.position.set(0, -2, 0)
      plane.rotation.x = 90 * Math.PI / 180
      plane.name = 'sunjian'
      console.log(plane)
      this.scene.add(plane)
      /* const geometryPlan = new THREE.PlaneGeometry(20000, 20000, 5, 5)
      const materialPlan = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
      const plane = new THREE.Mesh(geometryPlan, materialPlan)*/
      // const plane = new THREE.Mesh(geometry, material)
    },
    light() {
      // const light = new THREE.DirectionalLight(0xffffff, 1) // 从正上方（不是位置）照射过来的平行光，0.45的强度
      /* const light = new THREE.PointLight(0xffffff, 1) // 从正上方（不是位置）照射过来的平行光，0.45的强度
      // const helperLigt = new THREE.DirectionalLightHelper(light, 500)
      const helperLigt = new THREE.PointLightHelper(light, 5)
      light.position.set(800, 2000, 1000)
      // light.position.multiplyScalar(0.9)
      this.scene.add(helperLigt)
      this.scene.add(light)*/
      this.scene.add(new THREE.AmbientLight(0xffffff))
    },
    render() {
      /* const _this = this
      if (_this.renderer.render) {
        console.log(typeof _this.renderer.render)
        requestAnimationFrame(_this.renderer.render(_this.scene, _this.currentCamera))
      }*/
      this.renderer.render(this.scene, this.currentCamera)
    },
    loadObj() {
      const _this = this
      const loader = new OBJLoader()
      loader.load('/model/framedEdisonLamp/framedEdisonLamp.obj', (obj) => {
        // let mesh = new THREE.Mesh()
        obj.position.set(2, 5, 20)
        obj.name = 'framedEdisonLamp'
        // console.log(obj)
        obj.scale.set(0.01, 0.01, 0.01)
        // obj.scale = 0.1
        console.log(obj)
        for (let i = 0; i < obj.children.length; i++) { // 反射环境光材质
          if (obj.children[i].isMesh) {
            // obj.children[i].scale.set(25, 25, 25)
            obj.children[i].material.envMap = _this.scene.background
          }
        }
        /* obj.scene.map(function(child) {
          if (child.isMesh) {
            child.scale.set(25, 25, 25)
            child.material.envMap = _this.scene.background
          }
        })*/

        _this.scene.add(obj)
        // scene.add(sphere)
        /* const arr = []
        for (const key in obj.children) {
          arr.push(obj.children[key])
        }*/
        // this.control.attach(arr)
        // this.control.mutilAttach(arr[0])
        // _this.scene.add(obj)
        // console.log('obj', obj)
        // console.log('isMesh', obj.children[0].isMesh)
        // _this.objects.push(obj.children[0])
      })
      loader.load('/model/lamp/lamp.obj', (obj) => {
        // let mesh = new THREE.Mesh()
        obj.position.set(20, -1, 0)
        obj.name = 'lamp'
        console.log(obj)
        obj.scale.set(0.006, 0.006, 0.006)
        // obj.scale = 0.1
        for (let i = 0; i < obj.children.length; i++) { // 反射环境光材质
          if (obj.children[i].isMesh) {
            // obj.children[i].scale.set(25, 25, 25)
            obj.children[i].material.envMap = _this.scene.background
          }
        }
        _this.scene.add(obj) // isMesh
        const geometry1 = new THREE.BoxGeometry(3, 3, 3)
        const material1 = new THREE.MeshLambertMaterial({ color: 0x1BD56C })
        // eslint-disable-next-line new-cap
        const mesh1 = new THREE.Mesh(geometry1, material1)
        mesh1.position.set(-10, 5, 10)
        this.scene.add(mesh1)
      })
    },
    dragcontrol() {
      // console.log(this.scene)
      // console.log(JSON.stringify(this.scene.children))
      this.objects = []
      const _this = this
      // console.log(_this.scene)
      arrPush(_this.scene)
      function arrPush(arr) {
        for (const key in arr) {
          if (key === 'children') {
            // _this.objects.push()
            for (let i = 0; i < arr[key].length; i++) {
              if (arr[key][i].name !== 'sunjian' && (arr[key][i].type === 'Mesh' || arr[key][i].type === 'Group' || arr[key][i].type === 'Sprite')) {
                // console.log(arr[key][i])
                _this.objects.push(arr[key][i])
                if (arr[key][i].type === 'Group') {
                  _this.objects.push(arr[key][i].parent)
                  arrPush(arr[key][i])
                }
              }
              if (arr[key][i].name !== 'sunjian' && (arr[key][i].type === 'Mesh' || arr[key][i].type === 'Group' || arr[key][i].type === 'Sprite')) {
                // console.log(arr[key][i].name)
                arrPush(arr[key][i])
              } else {
                // console.log(1)
              }
            }
          }
        }
      }
      // console.log(this.objects)
      // debugger
      this.dragcontrols = new DragControls(this.objects, this.currentCamera, this.renderer.domElement)
      // this.control.attach(objects[0])
      /* this.dragcontrols.addEventListener('hoveron', (e) => {
        console.log(e)
        console.log(this.scene.children)
        // this.orbit.enabled = !e.value
        this.control.attach(e.object)
        this.control.setSize(1.5)
      })*/
      window.addEventListener('keydown', (event) => {
        // console.log(event)
        switch (event.keyCode) {
          case 81: // Q
            this.control.setMode('rotate')
            break

          case 87: // W
            this.control.setMode('scale')
            break
          case 69: // E
            this.control.setMode('translate')
            break
          case 107: // +, =, num+
            this.control.setSize(this.control.size + 0.1)
            break
          case 109: // -, _, num-
            this.control.setSize(Math.max(this.control.size - 0.1, 0.1))
            break
          case 88: // X
            this.control.showX = !this.control.showX
            break
          case 89: // Y
            this.control.showY = !this.control.showY
            break
          case 90: // Z
            this.control.showZ = !this.control.showZ
            break
          /* case 77: // M
            console.log(this.control)
            this.control.enabled = false
            break*/
        }
      })
      this.dragcontrols.addEventListener('dragstart', (e) => {
        // console.log(e)
        let sub
        const ids = this.findParent(e.object.id, this.scene.children)
        console.log(ids, '1111')
        this.selectModel = true
        let objModul
        for (let i = 0; i < this.scene.children.length; i++) { // 通过id查找 场景下的第几个 子集
          if (ids ? ids[0] === this.scene.children[i].id : false) {
            objModul = this.scene.children[i]
            sub = i
          }
        }
        console.log(objModul)
        // console.log(e.object)
        // console.log(this.scene)
        if (objModul.type === 'Sprite') {
          this.dataPop = {
            type: 'Sprite',
            position: objModul?.position,
            scale: objModul?.scale,
            id: objModul?.id,
            subscript: sub,
            canvas: objModul.material.map.image,
            material: objModul.material
          }
          console.log(this.dataPop)
        } else {
          this.dataPop = {
            type: 'obj',
            position: objModul?.position,
            scale: objModul?.scale,
            rotation: objModul?.rotation,
            name: objModul?.name,
            id: objModul?.id,
            subscript: sub
            // material: objModul.material // color  b  g  r
          }
        }
        if (objModul.children.length < 0) {
          this.dataPop.material = objModul.material
          console.log(objModul.material.color.getHex())
          console.log(objModul.material.color.getStyle())
          console.log(objModul.material.color.convertLinearToGamma())
          console.log(objModul.material.color)
          // if ()
        }
        console.log(this.scene)
        /* objModul.material.color.b = 2
        objModul.material.color.g = 2
        objModul.material.color.r = 2
        objModul.material.color.a = 50*/
        // objModul.material.color = new THREE.Color(0x41E52D4D)
        /* this.dataPop = {
          position: e.object.position,
          scale: e.object.scale,
          rotation: e.object.rotation,
          name: e.object.name,
          id: e.object.id,
          subscript: sub
        }// subscript: e.object*/
        // console.log(this.dataPop)
        // console.log(this.scene.children)
        // this.orbit.enabled = !e.value
        this.control.enabled = false
        // this.control.attach(e.object)
        this.control.attach(objModul)
        this.control.setSize(1.5)
      })
      this.dragcontrols.addEventListener('drag', (e) => {
        // this.orbit.enabled = !e.value
        this.control.enabled = false
        /* this.control.attach(e.object)
        this.control.setSize(1.5)*/
      })
      this.dragcontrols.addEventListener('dragend', (e) => {
        console.log(e)
        // console.log(this.scene.children)
        // this.orbit.enabled = !e.value
        this.control.enabled = true
        // this.control.attach(e.object)
        this.control.setSize(1.5)
      })
      /* this.dragcontrols.addEventListener('hoveroff', (e) => { // 离开模型
        // this.modelnumber = e.object.position
        this.control.enabled = true // 启动orbitControls 控制器
      })*/
    },
    del(id) {
      console.log(id)
      const _this = this
      // console.log(this.scene.children)
      _this.scene.remove(this.scene.children[id])
      // this.control.dispose()
      this.control.detach()
      // remove(_this.scene)
    },
    findParent(childrenId, arr, path) {
      const _this = this
      if (path === undefined) {
        path = []
      }
      for (let i = 0; i < arr.length; i++) {
        const tmpPath = path.concat()
        tmpPath.push(arr[i].id)
        if (childrenId === arr[i].id) {
          return tmpPath
        }
        if (arr[i].children) {
          const findResult = _this.findParent(childrenId, arr[i].children, tmpPath)
          if (findResult) {
            return findResult
          }
        }
      }
    },
    onWindowResize() {
      // const aspect = window.innerWidth / window.innerHeight

      /* this.cameraPersp.aspect = aspect
      this.cameraPersp.updateProjectionMatrix()*/

      // this.cameraOrtho.left = this.cameraOrtho.bottom * aspect
      // this.cameraOrtho.right = this.cameraOrtho.top * aspect
      // this.cameraOrtho.updateProjectionMatrix()

      this.renderer.setSize(this.width, this.height)

      this.render()
    },
    addObjShui() {
      const _this = this
      const loader = new OBJLoader()
      loader.load('/model/lamp/lamp.obj', (obj) => {
        // let mesh = new THREE.Mesh()
        obj.position.set(10, -1, 20)
        obj.name = 'tree10'
        console.log(obj)
        // obj.scale.set(0.006, 0.006, 0.006)
        // obj.scale = 0.1
        for (let i = 0; i < obj.children.length; i++) {
          /* if (obj.children[i].isMesh) { //反射环境光材质
            // obj.children[i].scale.set(25, 25, 25)
            obj.children[i].material.envMap = _this.scene.background
          }*/
        }
        _this.scene.add(obj) // isMesh
        this.dragcontrol()
        this.render()
      })
    },
    addObjWrap() {
      const _this = this
      const loader = new OBJLoader()
      loader.load('/model/framedEdisonLamp/framedEdisonLamp.obj', (obj) => {
        obj.position.set(2, 5, 2)
        obj.name = 'tree1'
        console.log(obj)
        /* for (let i = 0; i < obj.children.length; i++) { //反射环境光材质
          if (obj.children[i].isMesh) {
            // obj.children[i].scale.set(25, 25, 25)
            obj.children[i].material.envMap = _this.scene.background
          }
        }*/
        _this.scene.add(obj)
        // scene.add(sphere)
        this.dragcontrol()
        this.render()
        // this.control.attach(arr)
        // this.control.mutilAttach(arr[0])
        // _this.scene.add(obj)
        // console.log('obj', obj)
        // console.log('isMesh', obj.children[0].isMesh)
        // _this.objects.push(obj.children[0])
      })
    },
    addCube() {
      const geometry1 = new THREE.BoxGeometry(2, 2, 2)
      const material1 = new THREE.MeshLambertMaterial()
      // eslint-disable-next-line new-cap
      const mesh1 = new THREE.Mesh(geometry1, material1)
      mesh1.position.set(10, 50, 0)
      this.scene.add(mesh1)
      this.dragcontrol()
      this.render()
    },
    addLine() {
      const geometry = new THREE.BoxGeometry(10, 4, 6)
      const material = new THREE.MeshBasicMaterial(
        { color: 0xffff00, side: THREE.DoubleSide }
      )
      // console.log(777)
      // eslint-disable-next-line new-cap
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(1, 5, 0)
      this.scene.add(mesh)
      this.dragcontrol()
      this.render()
    },
    addBall() {
      const geometry = new THREE.SphereGeometry(15, 32, 16)
      const material = new THREE.MeshNormalMaterial()
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(70, 50, 0)
      this.scene.add(sphere)
      console.log(this.scene)
      this.dragcontrol()
      this.render()
    },
    addCylinder() {
      const geometry = new THREE.CylinderGeometry(5, 5, 20, 8)
      const material = new THREE.MeshNormalMaterial({ color: 0xffff00 })
      const cylinder = new THREE.Mesh(geometry, material)
      cylinder.position.set(7, 5, 0)
      this.scene.add(cylinder)
      // console.log(this.scene)
      this.dragcontrol()
      this.render()
    },
    addSpite(item) {
      // console.log(item)
      if (this.selectModel) {
        /* let center = this.cube.position.clone(),
          size = this.cube.geometry.boundingBox.getSize(),
          scale = this.cube.scale;*/
        // console.log(111)

        const canvas = document.createElement('canvas')
        canvas.width = 300
        canvas.height = 150
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgba(125,125,125,0.6)'
        strokeRoundRect(ctx, 5, 5, canvas.width - 8, canvas.height - 8, 10, 4, '#ffffff')
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = '#ffffff'
        const heightStr = '示例标题1'
        const widthStr = '示例标题2'
        const num1 = '10 台'
        const num2 = '30 台'
        const title = '我是标题'
        ctx.font = '28px 黑体'
        ctx.textAlign = 'center'
        ctx.fillText(title, 150, 40)
        ctx.moveTo(30, 56)
        ctx.lineTo(270, 56)
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(255,255,255,0.55)'
        ctx.stroke()
        ctx.font = '20px 黑体'
        ctx.textAlign = 'left'
        ctx.fillText(heightStr, 30, 90)
        ctx.fillText(num1, 220, 90)
        ctx.fillText(widthStr, 30, 120)
        ctx.fillText(num2, 220, 120)
        ctx.stroke()
        const spritelTexture = new THREE.Texture(canvas)
        spritelTexture.needsUpdate = true
        const spriteMaterial = new THREE.SpriteMaterial({ map: spritelTexture })
        var sprite = new THREE.Sprite(spriteMaterial)
        sprite.scale.set(3, 1.5, 0)
        sprite.position.set(this.dataPop.position.x, this.dataPop.position.y + 4, this.dataPop.position.z)
        console.log(sprite)
        console.log(this.scene)
        this.scene.add(sprite)

        /* const map = new THREE.TextureLoader().load('https://img2.baidu.com/it/u=3783709636,195596803&fm=11&fmt=auto&gp=0.jpg', () => {
          this.render()
        })
        const material = new THREE.SpriteMaterial({ map: map })
        console.log(this.dataPop.position)

        const sprite = new THREE.Sprite(material)
        sprite.position.set(this.dataPop.position.x, this.dataPop.position.y + 5, this.dataPop.position.z)
        sprite.scale.set(5, 7, 5)
        this.scene.add(sprite)
        this.render()
        console.log(this.scene)*/
        console.log(item)
        this.render()
        this.dragcontrol()
      } else {
        this.$alert('请选中场景内任意物体', '未选择绑定物体', {
          confirmButtonText: '确定'
        })
      }
    },
    editRender(item) {
      // console.log(item)
      const data = [
        '/scene-render/vivo/',
        '/scene-render/MilkyWay/',
        '/scene-render/Park2/',
        '/scene-render/skyboxsun25deg/',
        '/scene-render/vivo2/'
      ]
      const arr = [
        [
          '1.jpg',
          '2.jpg',
          '3.jpg',
          '4.jpg',
          '5.jpg',
          '6.jpg'
        ],
        [
          'dark-s_nx.jpg',
          'dark-s_ny.jpg',
          'dark-s_nz.jpg',
          'dark-s_px.jpg',
          'dark-s_py.jpg',
          'dark-s_pz.jpg'
        ],
        [
          'negx.jpg',
          'negy.jpg',
          'negz.jpg',
          'posx.jpg',
          'posy.jpg',
          'posz.jpg'
        ],
        [
          'nx.jpg',
          'ny.jpg',
          'nz.jpg',
          'px.jpg',
          'py.jpg',
          'pz.jpg'
        ],
        [
          '1.jpg',
          '2.jpg',
          '3.jpg',
          '4.jpg',
          '5.jpg',
          '6.jpg'
        ]
      ]
      this.scene.background = new THREE.CubeTextureLoader().setPath(data[item])
        .load(arr[item], () => {
          console.log(this.scene)
          for (let i = 0; i < this.scene.children.length; i++) {
            // console.log(1)
            if (this.scene.children[i].type === 'Group') {
              // console.log(this.scene.children[i])
              for (let j = 0; j < this.scene.children[i].children.length; j++) {
                // console.log(this.scene.children[i])
                if (this.scene.children[i].children[j].isMesh) {
                  this.scene.children[i].children[j].material.envMap = this.scene.background // 根据环境光 改变材质属性
                }
              }
            }
          }
          this.render()
        })
    },
    editFloor(item) {
      const arr = [
        '/scene-render/plane.jpg',
        '/scene-render/plane1.jpg'
      ]
      let texture = null
      for (let i = 0; i < this.scene.children.length; i++) {
        if (this.scene.children[i].name === 'sunjian') {
          console.log(this.scene.children[i].material)
          new Promise((res, rej) => {
            texture = THREE.ImageUtils.loadTexture(
              // "img3/1.png", 这个是相对位置也行
              arr[item], // 这个是网络位置也行 不过大部分写
              null, function(t) {
                console.log(t)
                return res()
              }
            )
            // console.log(0)
          }).then((r) => {
            this.scene.children[i].material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
            this.scene.children[i].material.visible = true
            // console.log(1)
          }).then((r) => {
            this.render()
            // console.log(2)
          })
        }
      }
      console.log(item)
    },
    originCamera() {
      this.orbit.reset()
    },
    save() {
      console.log(this.scene)
    },
    preview() {}
  }
}
</script>

<style scoped lang="scss">
  #wrap {
    display: flex;
    #container-wrap {
      width: calc(100% - 400px);
      margin: 0 auto;
      height: calc(100vh - 60px);
      overflow: hidden;
      /*canvas {
        width: 100%;
      }*/
    }
    .menu {
      width: 300px;
    }
  }
</style>
