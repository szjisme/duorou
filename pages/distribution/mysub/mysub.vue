<template>
	<view class="main">
		<view class="tab">
			<text @click="classA">一级代理</text>
			<text @click="classB">二级代理</text>
		</view>
		<view class="musub-box">
			<text>姓名：{{username}}</text>			
			<text>电话：{{associated_at}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				level: 1,
				"username": "耿鑫",
				"associated_at": 1565431241
			};
		},
		onLoad() {
			this.subordinate()
		},
		methods:{
			subordinate(){
				var token = uni.getStorageSync('access_token'); 		
				var that = this;
				console.log(this.level)
				uni.request({
					url:'http://api.succulents.fxb-team.com/v1/distribution/subordinate',
					method:'GET',					
					data:{
						level: that.level
					},
					header:{					
						'Authorization': 'Bearer '+token,
						'MERCHANTID': 1
					},
					success: (res) => {
						if(res.data.code == 0){
							var username = res.data.data.username;
							var associated_at = res.data.data.associated_at;
							that.username = username;
							that.associated_at = associated_at;
						}else if(res.data.code == -2){
							console.log('暂无下级')
						}			    
					}							
				})
			},
			// 一级代理
			classA(){
				this.level =1;
				this.subordinate()		
			},
			// 二级代理
			classB(){
				this.level =2;
				this.subordinate()
			}
		}
	}
</script>

<style>
	.main{
		width: 100%;
		height: 100%;
	}
	.tab{
		text-align: center;
		display: flex;
		margin-top: 50rpx;
	}
	.tab text{
		flex: 1;
		border: 1px solid red;
	}
	.musub-box{
		width: 80%;
		height: 600rpx;
		border: 1px solid #ccc;
		margin-left: 10%;
		margin-top: 100rpx;
	}
	.musub-box text{
		display: block;
	}
</style>
