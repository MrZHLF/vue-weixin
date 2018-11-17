<template>
  <div class="circle">
    <app-header btn_icon="camera" :isLeft="true" title="朋友圈" @rightClick="$router.push('/pubilsh')"/>
    <div class="container">
      <Scroll ref="refresh" @pulldown="pullData" @pullup="loadMore">
        <div class="head_wrapper">
          <div class="user_head">
            <span>{{user.name}}</span>
            <div class="user_img">
              <img :src="user.avatar" class="head_img">
            </div>
          </div>
        </div>
        <div class="content">
          <CellView
            v-for="(moment,index) in momentList"
            :key="index"
            :momentsObj="moment"
            />
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import CellView from '../components/CellView'
import jwt_decode from 'jwt-decode'
import Scroll from '../components/Scroll'  //滚动组件
export default {
  name: 'chats',
  data(){
    return {
      momentList: [],
			page:2, //数据从第二页开始
			size:3, //每页展示多少
			loading: false
    }
  },
  methods:{
    getMoment() {
			if(this.loading) return
			this.loading = true
			
      this.$axios.get('/api/profiles/latest').then((res) => {
        this.momentList = [...res.data];
				this.loading = false
        // 注册事件,解决重置问题
        this.$refs.refresh.$emit('refresh');
      })
    },
    pullData() {  
			this.page = 2;
      //下拉刷新更新数据
      this.getMoment()
    },
		loadMore() {
			if(this.loading) return
			this.loading = true
      this.$axios.get(`/api/profiles/${this.page}/${this.size}`).then(res => {
        // console.log(res.data);
        const result = [...res.data];
				this.loading = false
				
        // 遍历数组
        if (result.length > 0) {
          result.forEach(item => {
            this.momentList.push(item);
          });

          // 自增page
          this.page++;
        } else {
          // 数组为空, 没有更多数据, 不在page自增
          this.$refs.refresh.$emit('loadedDone');
        }
      });
    }
  },
  created () {
    this.getMoment()
  },
  computed:{
    user() {
      const token = localStorage.xwToken;
      const decode = jwt_decode(token);
      return decode;
    }
  },
  components:{
    "app-header":Header,
    CellView,
    Scroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.container {
  width: 100%;
  height: calc(100% - 55px);
  padding-top: 50px;
  box-sizing: border-box;
  overflow: hidden;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color:white;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_img .head_img {
  width: 100%;
  height: 100%;
}
</style>
