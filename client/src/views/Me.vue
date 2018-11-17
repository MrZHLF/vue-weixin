<template>
  <div class="mine">
    <app-header
      title="我的"
    />
    <div class="content">
      <div class="cell-wrapper">
        <div class="cell-title">
          <img :src="user.avatar" alt="">
          <span>{{user.name}}</span>
        </div>
      </div>
      <div class="btn_wrapper">
        <YButton @click="logout">退出</YButton>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import YButton from '../components/YButton'
import jwt_decode from 'jwt-decode'
export default {
  name: 'HelloWorld',
  computed:{
    user() {
      const token = localStorage.xwToken;
      const decode = jwt_decode(token);
      return decode;
    }
  },
  methods:{
    logout() {
      localStorage.removeItem('xwToken');
      this.$router.push('/login')
    }
  },
  components:{
    "app-header":Header,
    YButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mine {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
.cell-wrapper {
  background-color: #ffffff;
  box-sizing: border-box;
  color: inherit;
  min-height: 80px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 80px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.cell-title {
  flex: 1;
}
.cell-title img {
  width: 4rem;
  height: 4rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}
.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>
