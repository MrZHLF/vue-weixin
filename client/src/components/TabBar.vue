<template>
  <div class="tab">
    <router-link 
        class="tab-item"
        v-for="(item,index) in data"
        :key="index"
        :to="item.path"
        active-class="is-select">
        <div class="tab-item-icon">
            <i :class="'fa fa-'+item.icon"></i>
        </div>
        <div class="tab-item-label">
            {{item.title}}
        </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  props:{
    data:Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab {
    height: 55px;
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-image: linear-gradient(
        180deg,
        #d9d9d9,
        #d9d9d9 50%,
        transparent 0
    );
    background-repeat: no-repeat;
    background-color: #fafafa;
    background-size: 100% 1px;
    background-position: 0 0;
    display: flex;
    text-align: center;
}
.tab-item {
    display: block;
    padding: 7px 0;
    flex: 1;
}
.tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px
}
.tab-item-icon i {
    font-size: 1.3rem;
}
.tab-item-label {
    color: inherit;
    font-size: 12px;
    line-height: 1px;
}
a{
    text-decoration: none;
    color: #888;
}
.is-select {
    color: #20af0e;
}
</style>
