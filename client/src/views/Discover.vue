<template>
  <div class="find">
    <app-header title="发现"/>
    <div class="content">
      <Cell :src='cellData.src' :title="cellData.title" :path="cellData.path" />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Cell from '../components/Cell'
export default {
  name: 'HelloWorld',
  data () {
    return {
      cellData:{
        src:'pyq.jpg',
        title:'朋友圈',
        path: '/moments'
      }  
    }
  },
  components:{
    "app-header":Header,
    Cell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.find {
  width: 100%;
  height: calc(100% - 55px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px
}
</style>
