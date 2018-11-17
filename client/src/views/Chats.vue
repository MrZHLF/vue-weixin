<template>
  <div class="chats">
    <app-header
      title="微信"
      btn_icon='plus'
    />
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'chats',
  components:{
    "app-header":Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
