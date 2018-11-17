<template>
  <button
    class="y-button"
    :class="{'is-disabled':disabled}"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'YButton',
  props: {
    type: String,
    disabled:{
        type:Boolean,
        default:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.y-button{
    width: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: white;
    background-color: #20af0e;
    border-color: #20af0e;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    font-size: 16px;
    padding: 12px 20px;
    border-radius: 4px;
    border: none
}
.is-disabled,
.is-disabled:focus,
.is-disabled:hover {
    color: white;
    background-color: #75b56c;
    border-color: #75b56c;
    cursor: not-allowed;
    pointer-events: none;
}
</style>
