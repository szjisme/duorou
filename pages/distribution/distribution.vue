<template>
	<view class="main">
		<view class="distri-box">
			<text>已经赚取金额</text>
			<text>已经提现金额</text>
			<text>总计提成：{{ commission_sum }}</text>
			<text>总计提现：{{ withdraw_sum }}</text>
			<text>当前余额：{{ amount }}</text>
			<button type="primary" size="mini" @click="distribOrder">展示分销订单</button>
			<button type="primary" size="mini" @click="mysub">我的下级</button>
			<button type="primary" size="mini" @click="cash">申请提现</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			commission_sum: '', //总计提成
			withdraw_sum: '', //总计提现
			amount: '' //当前余额
		};
	},
	onLoad: function() {
		// 分销信息
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			if (!token) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/distribution/my-detail',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						if (res.data.code == 0) {
							that.commission_sum = res.data.data.commission_sum;
							that.withdraw_sum = res.data.data.withdraw_sum;
							that.amount = res.data.data.amount;
						} else if (res.data.code == -2) {
						}
					}
				});
			}
		});
	},
	methods: {
		// 我的下级
		mysub() {
			uni.navigateTo({
				url: 'mysub/mysub'
			});
		},
		// 跳转分销订单
		distribOrder() {
			uni.navigateTo({
				url: 'distriborder/distriborder'
			});
		},
		//申请提现
		cash() {
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/distribution/withdraw',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					data: {
						withdraw_fee: 1000
					},
					success: res => {
						console.log(res);
						if (res.data.code == 0) {
							console.log('提现成功');
						} else if (res.data.code == -1) {
							console.log('不满10元无法提现');
						}
					}
				});
			});
		}
	}
};
</script>

<style>
.main {
	width: 100%;
	height: 100%;
}
text {
	display: block;
}
.distri-box {
}
</style>
