<template>
	<view>
		<view style="text-align: center;font-size: 34upx;">支付失败</view>
		<view class="box">
			<view class="pay" @tap="pay">重新支付</view>
			<view class="mypayed">
				<navigator url="" hover-class="navigator-hover">我的订单</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order:0
			};
		},
		onLoad(option) {
			console.log('打印参数');
			console.log(option);
			this.order = option.order_id;
		},
		methods:{
			pay(){
				let that = this;
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/order/pay-agent',
					method:'POST' ,
					data: {
						    "order_id": that.order
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						if(res.data.code == 0){
							let payment = res.data.data.payment;
							let order_id = res.data.data.order_id;
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: ''+payment.timestamp+'',
								nonceStr: ''+payment.nonceStr+'',
								package: ''+payment.package+'',
								signType: 'MD5',
								paySign: ''+payment.paySign+'',
								success: function (res) {
									uni.showToast({
										title: '跳我的订单',
										duration: 2000
									});
								},
								fail: function (err) {
									uni.showToast({
										title: '支付失败',
										duration: 2000
									});
									setTimeout(function(){
										uni.navigateBack({
											delta: 1
										})
									},2000)
									
								}
							});
						}else{
							uni.showToast({
								title: res.data.message,
								duration: 2000
							});
						}
						// setTimeout(,500)
					},
					fail() {
						console.log(that.order);
						uni.showToast({
							title: res.data.message,
							duration: 2000
						});
					}
				})
				})
			}
		}
	}
</script>

<style>
	.box{width:100%;display: flex;justify-content: space-between;}
	.box view{width:45%;height:60upx;line-height: 60upx;text-align: center;border-radius: 20upx;font-size: 30upx;}
	.pay{background: #F40;color:#fff;}
	.mypayed{border:1px solid #F40;color:#F40;}
</style>
