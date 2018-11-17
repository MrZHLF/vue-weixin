<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabDate"></TabBar>
  </div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
  name: 'home',
  data () {
    return {
      tabDate:[
        {title:"微信",icon:'comment',path:'/chats'},
        {title:"通讯录",icon:'address-book',path:'/contacts'},
        {title:"发现",icon:'compass',path:'/discover'},
        {title:"我的",icon:'user',path:'/me'},
      ]  
    }
  },
  components:{
    TabBar
  }
}
</script>
