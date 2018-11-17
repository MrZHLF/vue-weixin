<template>
	<div class="pubilsh">
		<div class="header">
			<button @click="$router.go(-1)">取消</button>
			<button @click="publish">发表</button>
		</div>
		<!-- 发表内容区域 -->
		<div class="content">
			<div class="text_wrap">
				<textarea placeholder="发表你的内容" v-model="text"></textarea>
				<!-- 文件内容 -->
				<Upload :loading="loading" @getImgs="getImgs" />
			</div>
		</div>
		<Loading :loading="loading"/>
	</div>
</template>

<script>
import Upload from '../components/Upload'
import Loading from '../components/Loading'
import jwt_decode from 'jwt-decode';
	export default {
		data() {
			return {
				text:"",
				imgs:[],
				loading:false
			};
		},
		computed:{
			//获取用户信息
			user() {
				const token = localStorage.xwToken;
				const decode = jwt_decode(token)
				return decode
			}
		},
		methods:{
			publish(){
				//点击发表
				// console.log(this.imgs)
				this.loading = true
				const postData = {
					name: this.user.name,
					img: this.user.avatar,
					text: this.text,
					imgs: this.imgs.join('|')
				}
				this.$axios.post('/api/profiles/add',postData).then(res => {
					
					this.loading = false
					//根据name跳转页面
					this.$router.push({name:"moments"})
				})
			},
			getImgs(imgs){
				//获取图片base64位
				imgs.forEach(file => {
					this.uploadFiles(file)
				})
			},
			uploadFiles(file) {
				let reader = new FileReader();
				const _this = this
				reader.onload = function(e){
					// console.log(e.target.result)
					_this.imgs.push(e.target.result)
			  }
			  reader.readAsDataURL(file);
			}
		},
		components:{
			Upload,
			Loading
		}
	}
</script>

<style scoped>
.pubilsh {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;
}
.header {
	display: flex;
	justify-content: space-between;
	height: 50px;
	line-height: 50px;
}
.header button {
	background: transparent;
	border: none;
	outline: none;
	font-size: 16px;
}
.header button:nth-child(2) {
	color: #20AF0E;
}
.content {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding: 16px;
}
.text_wrap {
	margin-bottom: 16px;
}
.text_wrap textarea {
	width: 100%;
	font-size: 16px;
	min-height: 60px;
	border: none;
	outline: none;
}
</style>
