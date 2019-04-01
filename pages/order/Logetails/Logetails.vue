<template>
	<view class="log-box">
		<block v-for="(item, index) in logList" :key="index">
			<view class="log">
				<view class="address"><text>{{item.log}}</text></view>
				<view class="time"><text>{{item.event_at}}</text></view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logList:''
			};
		},
		onLoad(res) {
			var order_id = res.order_id;
			console.log(order_id)
			var that = this;
			that.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				//菜单
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/order/order-detail',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					data: {
						order_id: order_id
					},
					success: res => {
						if (res.data.code == 0) {
							var logList = res.data.data.express.tracking;
							that.logList = logList;	
			
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		},
	}
</script>

<style>
	.log-box{
		width: 100%;
		height: 100%;
	}
	.log{
		width: 96%;
		margin-left: 2%;
		height: 140rpx;
	}
</style>
