<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

				<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">授权登录</button>
			</view>
		</view>
		<!-- #endif -->
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
				SessionKey: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true ,//默认为true
				merchant_id:1,
				parent_id:0
			};
		},
		methods: {
			//按钮触发
			wxGetUserInfo() {
				var _this = this;
				var that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes)
						var city = infoRes.userInfo.city; //城市
						var country = infoRes.userInfo.country; //国家
						var province = infoRes.userInfo.province;//省
						var nickName = infoRes.userInfo.nickName; //昵称
						var avatarUrl = infoRes.userInfo.avatarUrl; //头像
						var iv = infoRes.iv;
						var encryptedData = infoRes.encryptedData;						
						uni.setStorageSync('nickName',nickName);
						uni.setStorageSync('avatarUrl',avatarUrl);
						uni.setStorageSync('iv',iv);
						uni.setStorageSync('encryptedData',encryptedData);
						uni.navigateBack({})
						uni.showToast({
							title:'登录成功'
						})
						uni.setStorageSync('hasLogin',true)
						_this.$store.commit('login', nickName)
						console.log(_this.$store.state.hasLogin)
						uni.login({
							success:function(res){
								var code = res.code;
								uni.request({
									url: 'http://api.succulents.fxb-team.com/v1/user/login',						
									method: 'POST',
									data:{
										code:code,
										merchant_id: 1
									},
									success: res => {
										console.log(res)
										console.log(res)
										if(res.data.code == 0){
											var istoken = that.$store.state.token;
											if(!istoken){
												var access_token = res.data.data.access_token;						
												that.$store.commit('setToken',{token: access_token})
												 uni.setStorageSync('access_token',access_token);
											}
										}else if(res.data.code == 10001){
											var iv = uni.getStorageSync('iv');
											console.log(iv)
											var setStorageSync = uni.getStorageSync('encryptedData');
											uni.request({
												url: 'http://api.succulents.fxb-team.com/v1/user/register',									
												method: 'POST',
												data: {
													iv:iv,
													encryptedData:setStorageSync,
													openid: res.data.data.openid,
													parent_id: 0,
													merchant_id:1
												},
												success: res => {
													console.log('注册成功')
												},
											});
										}						
									}
								});
							}
						})
						try {
							uni.setStorageSync('isCanUse', false); //记录是否第一次授权  false:表示不是第一次授权                            
						} catch (e) {}
					},
					fail(res) {}
				});		
// 				uni.login({
// 					success:function(res){
// 						console.log(res)
// 						var code = res.code;
// 						console.log(code)
// 						uni.request({
// 							url: 'http://api.succulents.fxb-team.com/v1/user/login',						
// 							method: 'POST',
// 							data:{
// 								code:code,
// 								merchant_id: _this.merchant_id
// 							},
// 							success: res => {
// 								console.log(res)								
// 							 if(res.data.data == 0){
// 								
// 							 }
// 								if(res.data.code == 10001){
// 									// 需要进行注册
// 									var iv = uni.getStorageSync('iv');
// 									console.log(iv)
// 									var setStorageSync = uni.getStorageSync('encryptedData');
// 									uni.request({
// 										url: 'http://api.succulents.fxb-team.com/v1/user/register',									
// 										method: 'POST',
// 										data: {
// 											iv:iv,
// 											encryptedData:setStorageSync,
// 											openid: res.data.data.openid,
// 											parent_id: _this.parent_id,
// 											merchant_id: _this.merchant_id
// 										},
// 										success: res => {
// 											console.log('注册成功')
// 										},
// 									});
// 								}
// 							}
// 						});
// 					}
// 				})
			},
		},
		onLoad:function(){
			//微信
			// #ifdef MP-WEIXIN
			// #endif
		}
	}
</script>

<style>
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
