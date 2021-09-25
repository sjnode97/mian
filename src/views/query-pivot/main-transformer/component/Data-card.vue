<template>
  <div id="wrap">
    <div class="title">
      变压器名称<span class="box">{{ card }}</span>
    </div>
    <div class="item">
      <div v-for="(item, key) in dataCard" :key="key" class="data-card">
        <p class="data-card-title">{{ item.name }}</p>
        <div v-for="(data, k) in item.data" :key="k" class="data-card-item">
          <p class="data-card-item-key" :style="`width:${data.value2 ? '40%':'50%'}`">{{ data.key }}</p>
          <p class="data-card-item-value1" :style="`width:${data.value2 ? '30%':'50%'}`">{{ data.value1 }}</p>
          <p v-if="data.value2" class="data-card-item-value2">{{ data.value2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  data() {
    return {
      card: 'data-card1',
      dataCard: [
        {
          name: '负荷',
          data: [
            { key: '额定容量', value1: '555kv' },
            { key: '总现在功率', value1: '555kv' },
            { key: '负载率', value1: '555kv' },
            { key: '效率', value1: '555kv' }
          ]
        },
        {
          name: '功率',
          data: [
            { key: '参数名称', value1: '底压侧', value2: '高压侧' },
            { key: '总有功功率', value1: '500kv', value2: '523kv' },
            { key: '总无功功率', value1: '500kv', value2: '523kv' },
            { key: '功率因数', value1: '500kv', value2: '523kv' }
          ]
        },
        {
          name: '电流',
          data: [
            { key: '相', value1: '底压侧', value2: '高压侧' },
            { key: 'A相', value1: '500kv', value2: '523kv' },
            { key: 'B相', value1: '500kv', value2: '523kv' },
            { key: 'C相', value1: '500kv', value2: '523kv' }
          ]
        },
        {
          name: '电流',
          data: [
            { key: '相', value1: '底压侧', value2: '高压侧' },
            { key: 'Uab', value1: '500kv', value2: '523kv' },
            { key: 'Ubc', value1: '500kv', value2: '523kv' },
            { key: 'Uca', value1: '500kv', value2: '523kv' }
          ]
        },
        {
          name: '绕组温度',
          data: [
            { key: 'A相', value1: '50℃' },
            { key: 'B相', value1: '50℃' },
            { key: 'C相', value1: '50℃' },
            {}
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
 #wrap {
   width: 100%;
   height: 300px;
   margin-top: 20px;
   .title {
     color: #5BBCF9;
   }
   .item {
     display: flex;
     justify-content: space-between;
     width: 100%;
     padding: 5px 20px;
     padding-bottom: 0;
     height: calc(100% - 40px);
     .data-card {
       width: 20%;
       margin: 0 10px;
       .data-card-title {
         height: 30px;
         line-height: 30px;
         color: #fff;
         background: #F7AF0E;
         text-align: center;
         margin-bottom: 10px;
         font-size: 18px;
       }
       .data-card-item {
         width: 100%;
         display: flex;
         justify-content: space-between;
         background: #F2F2F2;
         text-align: center;
         color: #686868;
         font-size: 14px;
         .data-card-item-key {
           height: 20px;
           line-height: 20px;
         }
         .data-card-item-value1 {
           height: 20px;
           line-height: 20px;
         }
         .data-card-item-value2 {
           width: 30%;
           height: 20px;
           line-height: 20px;
         }
       }
     }
   }
 }
</style>
