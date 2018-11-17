<template>
  <div class="header">
      <div class="header-btn is_left" v-show="isLeft">
        <i class="fa fa-chevron-left"></i>
        <button @click="$router.go(-1)">返回</button>
      </div>
      <h1 class="title">{{title}}</h1>
      <div class="header-btn is_right" v-show="btn_icon">
          <button @click="$emit('rightClick')">
              <i :class="'fa fa-'+btn_icon"></i>
          </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    isLeft:{
        type:Boolean,
        default:false
    },
    title:String,
    btn_icon:String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
    width: 100%;
    display: flex;
    align-items: center;
    background-color:#272626;
    box-sizing: border-box;
    color: #fff;
    font-size: 18px;
    height: 50px;
    padding: 0 10px;
    line-height: 1px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    position: fixed;
    top: 0;
    z-index: 999; 
}
.header-btn button {
    background: transparent;
    border: none;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 0;
    outline: none;
    font-size: initial;
}
.title {
    flex: 1;
}
.is_left {
    float: left;
}
.is_right {
    float: right;
}
</style>
