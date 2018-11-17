<template>
  <div class="login">
    <div class="title">用户登录</div>
    <div class="content">
        <!-- 表单内容 -->
        <form>
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
        </form>
        <div class="btn_wrap">
            <YButton :disabled="isDisabled" @click="login">登录</YButton>
        </div>
    </div>
    <div class="footer_wrap">
        <button class="register" @click="$router.push('/register')">注册账号</button>
    </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup'
import YButton from '../components/YButton'
export default {
  name: 'login',
  data () {
      return {
        user: {
            email:"",
            password:""
        }      
      }
  },
  components:{
    InputGroup,
    YButton
  },
  computed: {
    isDisabled() {
      if (this.user.email && this.user.password) return false;
      else return true;
    }
  },
  methods:{
    login() {
        // 邮箱正则验证
        var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if(!reg.test(this.user.email)) {
            alert("邮箱不合法")
            return
        }
        this.$axios.post('/api/users/login',this.user).then((res) => {
            // console.log(res)
            //存储token
            const {token} = res.data;
            localStorage.setItem('xwToken',token);
            this.$router.push('/');
        })
    }
  }
}
</script>
<style scoped>
.login {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 16px;
}
.title {
    margin-top: 80px;
    font-size: 25px;
    text-align: center;
    color: #333
}
.footer_wrap {
    position: absolute;
    bottom: 16px;
    left: 0;
    text-align: center;
    width: 100%;
    color: #888
}
.footer_wrap .register {
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    color: #7b8ca9;
}
.content, .btn_wrap{
    margin-top: 30px;
}
</style>

