<template>
	<div class="loading" v-show="loading"> 
		<div class="loading-wrap">
			<img src="../assets/scroll_load.gif" alt="">
			<span>加载中...</span>
		</div>
	</div>
</template>

<script>
	export default {
		name:"loading",
		props: {
			loading: {
			  type: Boolean,
			  default: false
			}
		}
	}
</script>

<style scoped>
.loading {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: hidden;
	background-color: rgba(255,255,255,0.8);
}
.loading-wrap {
	position: absolute;
	width: 50%;
	height: 40px;
	left: 25%;
	top: 30%;
	text-align: center;
}
.loading-wrap img {
	width: 1.6rem;
	margin-right: 8px;
	vertical-align: middle;
}
</style>
