<template>
	<view class="mian">
		<block v-for="(item, index) in goodsList" :key="index">
			<view class="collec-box">
				<image :src="item.encyclopedia_thumb" mode=""></image>
				<view class="rou-box">
					<text class="name">{{ item.encyclopedia_name }}-</text>
					<text class="num">{{ item.goods_serial_number }}</text>
					<text class="time">2019-03-23</text>
					<view class="btns">
						<view class="uni-padding-wrap uni-common-mt">
							<button class="mini-btn red" type="primary" size="mini">查看</button>
							<button
								class="mini-btn red"
								type="warn"
								size="mini"
								@click="deleteCollection(item.collect_id)"
							>
								删除
							</button>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="collec-box">
			<image src="../../static/img/timg.jpg" mode=""></image>
			<view class="rou-box">
				<text class="name">多肉-</text>
				<text class="num">123</text>
				<text class="time">2019-03-23</text>
				<text>该商品已经卖出</text>
				<view class="btns">
					<view class="uni-padding-wrap uni-common-mt">
						<button class="mini-btn red" type="primary" size="mini">查看同类</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data: {
		goods_id: '',
		encyclopedia_name: '',
		encyclopedia_thumb: '',
		goods_serial_number: '',
		collect_id: '',
		goodsList: ''
	},
	onLoad: function() {
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			if (!token) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				that.myCollecte();
			}
		});
	},
	methods: {
		// 我的收藏
		myCollecte() {
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				console.log(token);
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/collection/my-collect',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						console.log(res);
						if (res.data.code == 0) {
							var goodsList = res.data.data;
							that.goodsList = goodsList;
						}
					}
				});
			});
		},
		// 删除收藏
		deleteCollection(collect_id) {
			var that = this;
			var collect_id = collect_id;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				console.log(token);
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/collection/delete',
					data: {
						collect_id: collect_id
					},
					method: 'POST',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						console.log(res);
						if (res.data.code == 0) {
							console.log(res);
							uni.showToast({
								title: '删除成功'
							});
							that.myCollecte();
						} else if (res.data.code == -2) {
							uni.showModal({
								title: res.data.message
							});
						}
					}
				});
			});
		}
	}
};
</script>

<style>
.mian {
	width: 100%;
	height: 100%;
}
.collec-box {
	width: 90%;
	height: 400rpx;
	border: 1px solid #ccc;
	margin: 100rpx auto;
	display: flex;
}
.collec-box image {
	width: 300rpx;
	height: 300rpx;
	margin-top: 50rpx;
	margin-left: 50rpx;
	margin-right: 30rpx;
}
.rou-box {
	margin-top: 50rpx;
}
.time {
	display: block;
	margin-top: 50rpx;
}
.btns {
	margin-top: 50rpx;
}
</style>
