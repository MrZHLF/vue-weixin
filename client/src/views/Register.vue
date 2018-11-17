<template>
  <div class="register">
    <div class="header">
        <button @click="$router.go(-1)">取消</button>
    </div>
    <div class="container">
        <div class="title">注册账号</div>
        <div class="content">
            <!-- 表单内容 -->
            <form>
                <InputGroup
                    label="昵称"
                    placeholder="请输入昵称"
                    v-model="user.name"
                />
                <InputGroup
                    label="邮箱"
                    placeholder="请输入邮箱"
                    v-model="user.email"
                />
                <InputGroup
                    label="密码"
                    placeholder="请输入密码"
                    v-model="user.password"
                    type="password"
                />
                <InputGroup
                    label="确认密码"
                    placeholder="请输入确认密码"
                    v-model="user.password2"
                    type="password"
                />
            </form>
            <div class="btn_wrap">
                <YButton :disabled="isDisabled" @click="register">登录</YButton>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/InputGroup";
import YButton from '../components/YButton'
export default {
  name: "register",
  data() {
    return {
        user:{
            name:"",
            email:"",
            password:"",
            password2:""
        }
    };
  },
  components: {
    InputGroup,
    YButton
  },
  computed: {
    isDisabled() {
      if (this.user.name && this.user.email && this.user.password && this.user.password2) return false;
      else return true;
    }
  },
  methods:{
    register(){
        // 邮箱正则验证
        var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if(!reg.test(this.user.email)) {
            alert("邮箱不合法")
            return
        }
        //两次密码是否一致
        if(this.user.password != this.user.password2) {
            alert("两次密码不一致")
            return
        }
        //请求数据
        this.$axios.post('/api/users/register',this.user).then((res) => {
            // console.log(res)
            alert("用户注册成功")
            this.$router.push('/login')
        }).catch((err) => {
            
        });
    }
  }
};
</script>
<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.header {
  width: 100%;
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  color: #20af0e;
  font-size: 16px;
}
.container {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.container .title {
  margin-top: 30px;
  font-size: 25px;
  text-align: center;
  color: #333333;
}
.content, .btn_wrap{
    margin-top: 30px;
}
</style>

