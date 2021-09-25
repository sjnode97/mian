<template>
  <div class="echarts">
    <div id="map" ref="dotMap" style="width: 100; height: 100%" />
    <div class="mapChoose">
      <span v-for="(item, index) in parentInfo" :key="item.code">
        <span class="title" @click="chooseArea(item, index)">{{
          item.cityName == "全国" ? "中国" : item.cityName
        }}</span>
        <span v-show="index + 1 != parentInfo.length" class="icon">></span>
      </span>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapStation } from '@/api/cockpit'
// import { isArray } from '@/utils/validate'
// import resize from './mixins/resize'
// 地图贴图
var domImg = document.createElement('img')
domImg.style.height = domImg.height = domImg.width = domImg.style.width = '8px'
domImg.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MTE0OTgyQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4MTE0OTgzQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgxMTQ5ODBBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgxMTQ5ODFBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v4trwAAAAVklEQVR42mL0D225cu0hAzWAjpY8C9CsL19/wIV4uDnI5gKNYmKgKhjcxrFAggBZiBIuyDhqRQWQOxoVo1ExGhWjUTEaFYMiKoB1LVq1TXZUAI0CCDAAcAlaxCt7dtQAAAAASUVORK5CYII='
var domImgHover = document.createElement('img')
domImgHover.style.height =
  domImgHover.height =
  domImgHover.width =
  domImgHover.style.width =
    '8px'
domImgHover.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII='

export default {
  name: 'DotMap',
  // mixins: [resize],
  props: {
    cityCode: {
      type: Number,
      default: 100000
    }
  },
  data() {
    return {
      myCharts: null,
      option: { series: [{ data: [] }] },
      mTime: '', // tooltip轮播 setInterval 保存
      tipIndex: 0, // tooltip轮播计数
      geoJson: {
        features: []
      },
      parentInfo: [
        {
          cityName: '中国',
          code: this.cityCode
        }
      ],
      zoom: 1.2, // 地图缩放
      layoutSize: '100%', // 地图阴影缩放
      top: 50,
      layoutCenterTop: '50%'
      // mapData: {}
    }
  },
  mounted() {
    this.getGeoJson(this.cityCode)
  },
  beforeDestroy() {
    clearInterval(this.mTime)
  },
  methods: {
    async getData(code) {
      let temp = []
      await mapStation({ code }).then(({ data }) => {
        temp = data
      })
      return temp
    },
    getGeoJson(adcode) {
      if (adcode === 100000) {
        this.zoom = 1.2
        this.layoutSize = '100%'
        this.top = 50
        this.layoutCenterTop = '50%'
      } else {
        // 设置地图缩放避免超出
        this.zoom = 0.75
        this.layoutSize = '62%'
        this.top = 10
        this.layoutCenterTop = '42%'
      }

      const that = this
      // eslint-disable-next-line no-undef
      AMapUI.loadUI(['geo/DistrictExplorer'], (DistrictExplorer) => {
        var districtExplorer = new DistrictExplorer()
        districtExplorer.loadAreaNode(adcode, function(error, areaNode) {
          if (error) {
            console.error(error)
            return
          }
          const Json = areaNode.getSubFeatures()
          if (Json.length > 0) {
            that.geoJson.features = Json
          } else if (Json.length === 0) {
            that.geoJson.features = that.geoJson.features.filter(
              (item) => item.properties.adcode === adcode
            )
            if (that.geoJson.features.length === 0) {
              that.getMapData()
              return
            }
          }
          that.getMapData()
        })
      })
    },
    // 获取数据
    getMapData() {
      const tempcityNum = this.parentInfo[this.parentInfo.length - 1].code
      const tempcode = tempcityNum === 100000 ? undefined : tempcityNum
      this.getData(tempcode).then((res) => {
        const resData = res
        const mapData = []
        this.geoJson.features.forEach((item) => {
          let isExist = false

          const mapPoint = []
          const parentNum = ('' + this.parentInfo[this.parentInfo.length - 1].code).substring(2, 6)
          resData.forEach((ele, index) => {
            if (('' + ele.code) === ('' + item.properties.adcode)) {
              isExist = true
              let lat = item.properties.center[0]
              let long = item.properties.center[1]

              if (parentNum !== '0000' || (parentNum === '0000' && ele.count === '1')) {
                lat = ele?.locationY
                long = ele?.locationX
              }
              mapPoint.push({
                id: ele.id,
                name: item.properties.name,
                value: [lat, long, ele.vo?.day],
                valueMonth: ele.vo?.month,
                valueYear: ele.vo?.year,
                cityCode: item.properties.adcode,
                count: ele.count,
                capacity: ele.capacity,
                stationName: ele.name
              })
            }
          })
          if (!isExist) {
            return ''
          }
          mapData.push(...mapPoint)
        })

        if (this.geoJson.features.length === 0) {
          const mapPoint = []
          resData.forEach((ele, index) => {
            let lat = 0
            let long = 0

            if (ele.code.substring(4, 6) !== '00') {
              lat = ele?.locationY
              long = ele?.locationX
            }
            mapPoint.push({
              id: ele.id,
              name: ele.name,
              value: [lat, long, ele.vo?.day],
              valueMonth: ele.vo?.month,
              valueYear: ele.vo?.year,
              cityCode: ele.code,
              count: ele.count,
              capacity: ele.capacity,
              stationName: ele.name
            })
            mapData.push(...mapPoint)
          })
        }
        // 去渲染echarts
        this.initEcharts(mapData)
      })
    },
    async initEcharts(mapData) {
      this.myChart = echarts.init(this.$refs.dotMap)
      echarts.registerMap('Map', this.geoJson) // 注册

      this.option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          show: true,
          left: 'center',
          top: '15',
          text:
            this.parentInfo[this.parentInfo.length - 1].cityName +
            '电站图',
          textStyle: {
            color: 'rgb(179, 239, 255)',
            fontSize: 16
          }
        },
        grid: {
          left: 'center',
          top: 0
        },
        geo: {
          map: 'Map',
          aspectScale: 0.75,
          layoutCenter: ['50%', this.layoutCenterTop],
          layoutSize: this.layoutSize,
          silent: true,
          roam: false,
          z: 0,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0, 15, 40, 0.5)',
              shadowColor: 'rgba(0, 0, 0, 1)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              borderColor: 'rgba(0, 0, 0, 0.7)',
              borderWidth: 0.5
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 1,
              color: 'green',
              label: {
                show: false
              }
            }
          }
        },
        series: [
          {
            type: 'map',
            map: 'Map',
            zoom: this.zoom,
            roam: false,
            top: this.top,
            label: {
              normal: {
                show: false,
                color: 'rgb(249, 249, 249)', // 省份标签字体颜色
                formatter: (p) => {
                  switch (p.name) {
                    case '内蒙古自治区':
                      p.name = '内蒙古'
                      break
                    case '西藏自治区':
                      p.name = '西藏'
                      break
                    case '新疆维吾尔自治区':
                      p.name = '新疆'
                      break
                    case '宁夏回族自治区':
                      p.name = '宁夏'
                      break
                    case '广西壮族自治区':
                      p.name = '广西'
                      break
                    case '香港特别行政区':
                      p.name = '香港'
                      break
                    case '澳门特别行政区':
                      p.name = '澳门'
                      break
                  }
                  return p.name
                }
              },
              emphasis: {
                show: true,
                color: '#f75a00'
              }
            },
            tooltip: {
              trigger: 'item',
              padding: 0,
              backgroundColor: 'rgba(150,150,150,0.1)',
              formatter: (param) => {	// 自定义tooltip内容
                // return this.tooltipFmt(param)
                return ''
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#2ab8ff',
                borderWidth: 1,
                areaColor: {
                  image: domImg,
                  repeat: 'repeat'
                },
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 1
              },
              emphasis: {
                areaColor: {
                  image: domImgHover,
                  repeat: 'repeat'
                },
                borderColor: '#2ab8ff',
                borderWidth: 1,
                shadowColor: 'rgba(0, 255, 255, 0.7)',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                label: {
                  show: false
                }
              }
            }
            // data: mapData
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            tooltip: {
              trigger: 'item',
              padding: 0,
              backgroundColor: 'rgba(150,150,150,0.1)',
              formatter: (param) => {	// 自定义tooltip内容
                return this.tooltipFmt(param)
              }
            },
            itemStyle: {
              color: '#f00'
            },
            symbol: function(value, params) {
              const pngList = [
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAACKCAYAAABCZd8VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhCNDhBODNFQTMxNDExRUJCMUQ4Rjg4RkMzQjlDRDQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhCNDhBODNGQTMxNDExRUJCMUQ4Rjg4RkMzQjlDRDQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI0OEE4M0NBMzE0MTFFQkIxRDhGODhGQzNCOUNENDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI0OEE4M0RBMzE0MTFFQkIxRDhGODhGQzNCOUNENDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4slUr7AAARuUlEQVR42uxdCZBc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',
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAACKCAYAAABCZd8VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0M0VDQkFFQTMxNTExRUI4QTgzQUUzRUEzNjlCMDMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0M0VDQkFGQTMxNTExRUI4QTgzQUUzRUEzNjlCMDMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTQzRUNCQUNBMzE1MTFFQjhBODNBRTNFQTM2OUIwMzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQzRUNCQURBMzE1MTFFQjhBODNBRTNFQTM2OUIwMzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7sqOd6AAARdElEQVR42uxdeXRc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',
                'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAACKCAYAAABCZd8VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjI5M0ZEOEFBNTc3MTFFQjk3NzVEMTlGMzdGMjNDRkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjI5M0ZEODlBNTc3MTFFQjk3NzVEMTlGMzdGMjNDRkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEI0OEE4M0VBMzE0MTFFQkIxRDhGODhGQzNCOUNENDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEI0OEE4M0ZBMzE0MTFFQkIxRDhGODhGQzNCOUNENDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64gmEOAAAR8ElEQVR42uxdCXhc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'
              ]
              const a = Math.random() * 100
              if (a < 30) {
                return pngList[0]
              } else if (a < 60) {
                return pngList[1]
              } else {
                return pngList[2]
              }
            },
            symbolSize: [25, 30],
            symbolOffset: [0, -15],
            z: 9999,
            data: mapData
          },
          // this.layoutSize !== '100%' &&
          {
            tooltip: {
              show: false
            },
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              scale: 8,
              brushType: 'stroke'
            },
            showEffectOn: 'render',
            itemStyle: {
              normal: {
                shadowColor: '#0ff',
                shadowBlur: 8,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                color: function(params) {
                  var colorList = [
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#64fbc5'
                      },
                      {
                        offset: 1,
                        color: '#018ace'
                      }
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#64fbc5'
                      },
                      {
                        offset: 1,
                        color: '#018ace'
                      }
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#168e6d'
                      },
                      {
                        offset: 1,
                        color: '#c78d7b'
                      }
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#61c0f1'
                      },
                      {
                        offset: 1,
                        color: '#6f2eb6'
                      }
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#168e6d'
                      },
                      {
                        offset: 1,
                        color: '#c78d7b'
                      }
                    ]),
                    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: '#61c0f1'
                      },
                      {
                        offset: 1,
                        color: '#6f2eb6'
                      }
                    ])
                  ]
                  return colorList[params.dataIndex]
                }
              }
            },
            label: {
              normal: {
                color: '#fff'
              }
            },
            symbol: 'circle',
            symbolSize: [8, 4],
            // symbolOffset: [0, 0],
            data: mapData,
            zlevel: 1
          }
        ]
      }
      this.myChart.setOption(this.option, true)

      const that = this
      this.myChart.off('click')
      this.myChart.on('click', (params) => {
        console.log(params)
        // if (!params.data) {
        //   return
        // }
        if (
          that.parentInfo[that.parentInfo.length - 1].code ===
          params.data.cityCode
        ) {
          // 跳转到首页，存储到vuex
          this.$store.dispatch('station/setStation', params.data.id)
          this.$store.dispatch('station/setCity', params.data.cityCode)
          this.$router.push('/index')
          return
        }
        const data = params.data
        that.parentInfo.push({
          cityName: data.name,
          code: data.cityCode
        })

        that.getGeoJson(data.cityCode)
      })
      this.tipIndex = 0 // 播放所在下标

      clearInterval(this.mTime)
      this.mTime = setInterval(this.setdispatchAction, 5000)
    },
    tooltipFmt(param) {
      var text = ''
      const proTemp = `<span><span style="color: rgb(68,224,224)">电站数量：</span>${param.data?.count || 0}</span>`
      let tips = proTemp

      // 显示单个电站的详情信息
      // 通过code判断
      const tempcityNum = ('' + this.parentInfo[this.parentInfo.length - 1].code).substring(2, 6)
      if ((tempcityNum !== '0000') || (tempcityNum === '0000' && param.data?.count === '1')) {
        // <span><span style="color: rgb(68,224,224)">电站地址：</span>${param.name} </span>
        tips = `
                  <span><span style="color: rgb(68,224,224)">装机容量：</span>${param.data?.capacity} </span>
                  <span>
                    <span style="color: rgb(68,224,224)">日上网电量：</span>
                    ${param.data?.value?.[2]?.val || '-'}${param.data?.value?.[2]?.unit || ''} 
                  </span>
                  <span>
                    <span style="color: rgb(68,224,224)">月上网电量：</span>
                    ${param.data?.valueMonth?.val || '-'}${param.data?.valueMonth?.unit || ''} 
                  </span>
                  <span>
                    <span style="color: rgb(68,224,224)">年上网电量：</span>
                    ${param.data?.valueYear?.val || '-'}${param.data?.valueYear?.unit || ''}
                  </span>
                  <span style="color:rgb(49,90,167);float:right;">点击查看详情信息</span>
                `
      }
      text += `<div style="display:flex;flex-direction:column;padding:0;margin:0;border:1px solid rgb(49,90,117)">
                <div style="background: rgb(253,202,11);padding:0;margin:0;text-align:center;">
                  <span style="margin:0;padding:0;color:#000">${param.data?.stationName || param.name}</span>
                </div>
                <div style="display:flex;flex-direction:column;padding:5px;backdrop-filter: blur(10px);">
                  ${tips}
                </div>
              </div>`
      return text
    },
    // 图表轮播高亮
    setdispatchAction() {
      // 取消高亮
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0
      })
      // 高亮
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: this.tipIndex
      })
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.tipIndex
      })
      this.tipIndex++
      if (this.tipIndex >= this.option.series[1].data.length) {
        this.tipIndex = 0
      }
    },
    // 选择切换市县
    chooseArea(val, index) {
      if (this.parentInfo.length === index + 1) {
        return
      }
      this.parentInfo.splice(index + 1)
      this.getGeoJson(this.parentInfo[this.parentInfo.length - 1].code)
    }
  }
}
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
  position: relative;
  // background: url("../assets/bg1.jpg") no-repeat;
  background-size: 100% 100%;
}

.mapChoose {
  position: absolute;
  left: 20px;
  top: 55px;
  color: #eee;

  .title {
    padding: 5px;
    // border-top: 1px solid rgba(147, 235, 248, 0.8);
    // border-bottom: 1px solid rgba(147, 235, 248, 0.8);
    cursor: pointer;
    color: rgba(147, 235, 248, 0.8);
    font-size: 12px;
  }

  .icon {
    font-family: "simsun";
    font-size: 16px;
    margin: 0 0px;
    color: rgba(147, 235, 248, 0.8);
  }
}
</style>
