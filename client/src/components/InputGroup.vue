<template>
  <div class="input_group">
      <label :for="name">{{label}}</label>
      <input 
        :type="type"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input',$event.target.value)"
        >
  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  props: {
    type:{
        type:String,
        default:"text"
    },
    label:String,
    name:String,
    value:String,
    placeholder:String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input_group {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #d9d9d9;
    padding: 10px 0;
    line-height: 60px;
    overflow: hidden;
}
.input_group label {
    display: inline-block;
    width: 30%;
    font-size: 16px;
}
.input_group input {
    display: inline-block;
    width: 65%;
    font-size: 16px;
    border: none;
    outline: none;
}
</style>
