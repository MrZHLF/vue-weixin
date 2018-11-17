<template>
  <div class="contacts">
    <app-header
      title="通讯录"
    />
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'HelloWorld',
  components:{
    "app-header":Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
