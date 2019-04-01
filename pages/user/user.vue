<template>
    <!-- 用户信息模块 -->
	<view class="userBox">
		<!-- 头像 -->
		<view class="header" @click="login">
			<image class="userIcon" :src="avatarUrl"></image>
			<text class="login">{{nickNames}}</text>
		</view>
		<!-- 分销 -->
		<button class='distribution' type='primary'  withCredentials="true" lang="zh_CN" @tap='toDistribut'>我的分销</button>
		<!-- 订单 -->
		<button class='order' type='primary'  withCredentials="true" lang="zh_CN" @tap='toOrder'>我的订单</button>
		<!-- 地址 -->
		<button class='addr' type='primary' withCredentials="true" lang="zh_CN" @tap='toAddress'>我的地址</button>
		<!-- 收藏 -->
		<button class='collection' type='primary'  withCredentials="true" lang="zh_CN" @tap='toCollection'>我的收藏</button>
	</view>

</template>
<script>
	import {
	    mapState
	} from 'vuex'
	
	export default {
		 computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		data() {
			return {
				nickNames: '点击登录',
				avatarUrl: '',
				show: true,
				hidden: ''
			}
		},
		
		onLoad() {
			
		},
		onShow() {
			var that = this;
			var nickNames = uni.getStorageSync('nickName');			
			if(nickNames == ''){
				that.nickNames = '点击登录';
				that.avatarUrl = '';
			}else{
				var avatarUrl = uni.getStorageSync('avatarUrl');
				that.nickNames = nickNames;
				that.avatarUrl = avatarUrl;
			}
		},
		methods:{
			login(){
// 				var _this = this;
// 				this.common.login(_this);
// 				console.log(_this.$store.state.hasLogin)
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			// 跳转到分销
			toDistribut(){
				uni.navigateTo({
					url: '../distribution/distribution'
				});
			},
			// 跳转到订单
			toOrder(){
				uni.navigateTo({
					url: '../order/order'
				});
			},
			// 跳转到地址
			toAddress(){
				uni.navigateTo({
                    url: '../address/address',
                });
			},
			// 跳转到收藏
			toCollection(){
				uni.navigateTo({
					url: '../collection/collection'
				});
			}
		},
	}
</script>
<style>
	.userBox {
		width: 100%;
		text-align: center;
	}
	.header{
		text-align: center;
	}
	.login{
		display: block;
	}
	.hide{
		display: none;
	}
	.userIcon {
		align-self: flex-end;
		border-radius: 50%;
		overflow: hidden;
		width: 200rpx;
		height: 200rpx;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
		margin-top: 100rpx;
	}
	.distribution{
		width: 50%;
		margin-top: 100rpx;
		margin-bottom: 40rpx;
	}
	.order,.addr,.collection{
		width: 50%;
		margin-bottom: 40rpx;
	}
</style>
