<template>
	<div class="img_wrap">
		<div class="isImg" v-for="(fileimg,index) in FileData" :key="index" v-if="FileData.length > 0">
			<img :src="fileimg" alt="">
			<button class="remove" v-show="!loading" @click="remover(fileimg)">x</button>
		</div>
		<div class="isImg img_upload"  v-if="FileData.length < 9">
			<button class="btn_upload">
				<input type="file" @change="addFile" ref="myFile" multiple="multiple" accept="img/*" />
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name:"upload",
		props:{
			loading: {
				//删除图片按钮隐藏
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				FileData:[], //存放图片,展示页面
				allUploadFules:[], //文件上传
			};
		},
		methods:{
			addFile() {
				// console.log(this.$refs.myFile.files)
				let files = [...this.$refs.myFile.files];
				
				if(this.FileData.length + files.length > 9) {
					alert("最多不能超多9张图片")
					return;
				}
				
				files.forEach(file => {
					this.allUploadFules.push(file)
					let objUrl = this.getObjectURL(file); //解析
					// console.log(objUrl)
					this.FileData.push(objUrl); //页面展示
				}),
				
				// 注册事件 让调用方执行
				this.$emit('getImgs', this.allUploadFules);
			},
			getObjectURL(file){
				//访问本地图片路径
				var url=null   
				if(window.createObjectURL!=undefined){ // basic  
					url=window.createObjectURL(file)  
				}else if(window.URL!=undefined){ // mozilla(firefox)  
					url=window.URL.createObjectURL(file)  
				} else if(window.webkitURL!=undefined){ // webkit or chrome  
					url=window.webkitURL.createObjectURL(file)  
				}
				return url;
			},
			remover(fileimg){
				//删除单个图片
				this.FileData.forEach((file,index) => {
					if(file == fileimg) {
						this.FileData.splice(index, 1)
					}
				})
			}
		}
	}
</script>

<style>
.isImg {
	box-sizing: border-box;
	width: 30%;
	height: 6rem;
	float: left;
	margin-right: 8px;
	margin-bottom: 8px;
	position: relative;
}
.btn_upload {
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background: url(../assets/upload.png) no-repeat;
	background-size: 100% 100%;
}
.btn_upload input {
	display: inline-block;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.isImg img {
	width: 100%;
	height: 100%;
}
.remove {
	position: absolute;
	top:-8px;
	right: -5px;
	border: none;
	outline: none;
	width: 20px;
	height: 20px;
	padding: 0;
	text-align: center;
	color: #fff;
	background-color: #3baffd;
	line-height: 10px;
	border-radius: 50%;
}
</style>
