<template>
	<view class="" style="width: 100%;">
		<scroll-view class="top-menu-view" scroll-x="true" :scroll-left="scrollLeft">
			<block v-for="(menuTab, index) in menuTabs" :key="index">
				<view class="menu-one-view" v-bind:id="'tabNum' + index" @click="swichMenu(index)">
					<view :class="[currentTab == index ? 'menu-one-act' : 'menu-one']">
						<view class="menu-one-txt">{{ menuTab.name }}</view>
						<view class="menu-one-bottom">
							<view class="menu-one-bottom-color"></view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view
			class=""
			style="height: 100%;margin-top: 136rpx;"
			v-if="currentTab == 0"
			scroll-y="true"
		>
			<block v-for="(item, index) in orderList" :key="index">
				<view class="order-box">
					<block v-for="(items, ind) in item.extra" :key="ind">
						<view class="" style="display: flex;">
							<image
								:src="items.encyclopedia_thumb"
								mode=""
								@click="toDetails(item.order_id)"
							></image>
							<view class="" style="flex: 1;">
								<view style="display: flex;">
									<text class="name" style="flex: 1;">
										{{ items.encyclopedia_name }}-{{
											items.goods_serial_number
										}}
									</text>
									<text
										class="maijia"
										v-if="item.status == 0"
										@click="cancelOrder(item.order_id)"
									>
										取消订单
									</text>
									<text class="maijia" v-if="item.status == 1">待发货</text>
									<text class="maijia" v-if="item.status == 2">卖家已发货</text>
									<text class="maijia" v-if="item.status == 3">交易成功</text>
									<text class="maijia" v-if="item.status == 4">订单关闭</text>
									<text class="maijia" v-if="item.status == 6">关闭超时</text>
								</view>
								<text class="daipen" v-if="items.goods_is_included == true">
									带盆
								</text>
								<text class="daipen" v-else-if="items.goods_is_included == false">
									不带盆
								</text>
								<view>
									<text class="price">
										商品价格￥{{ items.goods_price / 100 }}
									</text>
								</view>
							</view>
						</view>
					</block>
					<view class="btn-box" v-if="item.status == 0">
						<button type="primary" size="mini">立即支付</button>
					</view>
					<view class="btn-box" v-if="item.status == 1">
						<button type="primary" size="mini">可以退款</button>
					</view>
					<view class="btn-box" v-if="item.status == 2">
						<button type="primary" size="mini">查看物流</button>
						<button type="primary" size="mini">确认收货</button>
					</view>
					<view class="btn-box" v-if="item.status == 3">
						<button type="primary" size="mini">查看物流</button>
					</view>
				</view>
			</block>
		</view>
		<view
			class=""
			style="height: 100%;margin-top: 136rpx;"
			v-if="currentTab == 1"
			scroll-y="true"
		>
			<block v-for="(item, index) in status_0" :key="index">
				<view class="order-box">
					<block v-for="(items, ind) in item.extra" :key="ind">
						<view class="" style="display: flex;">
							<image :src="items.encyclopedia_thumb" mode=""></image>
							<view class="" style="flex: 1;">
								<view style="display: flex;">
									<text class="name" style="flex: 1;">
										{{ items.encyclopedia_name }}-{{
											items.goods_serial_number
										}}
									</text>
									<text class="maijia" v-if="item.status == 0">待付款</text>
									<text class="maijia" v-if="item.status == 1">待发货</text>
									<text class="maijia" v-if="item.status == 2">卖家已发货</text>
									<text class="maijia" v-if="item.status == 3">交易成功</text>
									<text class="maijia" v-if="item.status == 4">订单关闭</text>
								</view>
								<text class="daipen" v-if="items.goods_is_included == true">
									带盆
								</text>
								<text class="daipen" v-else-if="items.goods_is_included == false">
									不带盆
								</text>
								<view>
									<text class="price">
										商品价格￥{{ items.goods_price / 100 }}
									</text>
								</view>
							</view>
						</view>
					</block>
					<view class="btn-box" v-if="item.status == 0">
						<button type="primary" size="mini">立即支付</button>
					</view>
					<view class="btn-box" v-if="item.status == 1">
						<button type="primary" size="mini">可以退款</button>
					</view>
					<view class="btn-box" v-if="item.status == 2">
						<button type="primary" size="mini">查看物流</button>
						<button type="primary" size="mini">确认收货</button>
					</view>
					<view class="btn-box" v-if="item.status == 3">
						<button type="primary" size="mini">查看物流</button>
					</view>
				</view>
			</block>
		</view>
		<view
			class=""
			style="height: 100%;margin-top: 136rpx;"
			v-if="currentTab == 2"
			scroll-y="true"
		>
			<block v-for="(item, index) in status_1" :key="index">
				<view class="order-box">
					<block v-for="(items, ind) in item.extra" :key="ind">
						<view class="" style="display: flex;">
							<image :src="items.encyclopedia_thumb" mode=""></image>
							<view class="" style="flex: 1;">
								<view style="display: flex;">
									<text class="name" style="flex: 1;">
										{{ items.encyclopedia_name }}-{{
											items.goods_serial_number
										}}
									</text>
									<text class="maijia" v-if="item.status == 0">取消订单</text>
									<text class="maijia" v-if="item.status == 1">待发货</text>
									<text class="maijia" v-if="item.status == 2">卖家已发货</text>
									<text class="maijia" v-if="item.status == 3">交易成功</text>
									<text class="maijia" v-if="item.status == 4">订单关闭</text>
								</view>
								<text class="daipen" v-if="items.goods_is_included == true">
									带盆
								</text>
								<text class="daipen" v-else-if="items.goods_is_included == false">
									不带盆
								</text>
								<view>
									<text class="price">
										商品价格￥{{ items.goods_price / 100 }}
									</text>
								</view>
							</view>
						</view>
					</block>
					<view class="btn-box" v-if="item.status == 0">
						<button type="primary" size="mini">立即支付</button>
					</view>
					<view class="btn-box" v-if="item.status == 1">
						<button type="primary" size="mini">可以退款</button>
					</view>
					<view class="btn-box" v-if="item.status == 2">
						<button type="primary" size="mini">查看物流</button>
						<button type="primary" size="mini">确认收货</button>
					</view>
					<view class="btn-box" v-if="item.status == 3">
						<button type="primary" size="mini">查看物流</button>
					</view>
				</view>
			</block>
		</view>
		<view
			class=""
			style="height: 100%;margin-top: 136rpx;"
			v-if="currentTab == 3"
			scroll-y="true"
		>
			<block v-for="(item, index) in status_2" :key="index">
				<view class="order-box">
					<block v-for="(items, ind) in item.extra" :key="ind">
						<view class="" style="display: flex;">
							<image :src="items.encyclopedia_thumb" mode=""></image>
							<view class="" style="flex: 1;">
								<view style="display: flex;">
									<text class="name" style="flex: 1;">
										{{ items.encyclopedia_name }}-{{
											items.goods_serial_number
										}}
									</text>
									<text class="maijia" v-if="item.status == 0">取消订单</text>
									<text class="maijia" v-if="item.status == 1">待发货</text>
									<text class="maijia" v-if="item.status == 2">卖家已发货</text>
									<text class="maijia" v-if="item.status == 3">待收货</text>
									<text class="maijia" v-if="item.status == 4">订单关闭</text>
								</view>
								<text class="daipen" v-if="items.goods_is_included == true">
									带盆
								</text>
								<text class="daipen" v-else-if="items.goods_is_included == false">
									不带盆
								</text>
								<view>
									<text class="price">
										商品价格￥{{ items.goods_price / 100 }}
									</text>
								</view>
							</view>
						</view>
					</block>
					<view class="btn-box" v-if="item.status == 0">
						<button type="primary" size="mini">立即支付</button>
					</view>
					<view class="btn-box" v-if="item.status == 1">
						<button type="primary" size="mini">可以退款</button>
					</view>
					<view class="btn-box" v-if="item.status == 2">
						<button type="primary" size="mini">查看物流</button>
						<button type="primary" size="mini">确认收货</button>
					</view>
					<view class="btn-box" v-if="item.status == 3">
						<button type="primary" size="mini">查看物流</button>
					</view>
				</view>
			</block>
		</view>
		<view
			class=""
			style="height: 100%;margin-top: 136rpx;"
			v-if="currentTab == 4"
			scroll-y="true"
		>
			<block v-for="(item, index) in status_3" :key="index">
				<view class="order-box">
					<block v-for="(items, ind) in item.extra" :key="ind">
						<view class="" style="display: flex;">
							<image :src="items.encyclopedia_thumb" mode=""></image>
							<view class="" style="flex: 1;">
								<view style="display: flex;">
									<text class="name" style="flex: 1;">
										{{ items.encyclopedia_name }}-{{
											items.goods_serial_number
										}}
									</text>
									<text class="maijia" v-if="item.status == 0">取消订单</text>
									<text class="maijia" v-if="item.status == 1">待发货</text>
									<text class="maijia" v-if="item.status == 2">卖家已发货</text>
									<text class="maijia" v-if="item.status == 3">交易完成</text>
									<text class="maijia" v-if="item.status == 4">订单关闭</text>
								</view>
								<text class="daipen" v-if="items.goods_is_included == true">
									带盆
								</text>
								<text class="daipen" v-else-if="items.goods_is_included == false">
									不带盆
								</text>
								<view>
									<text class="price">
										商品价格￥{{ items.goods_price / 100 }}
									</text>
								</view>
							</view>
						</view>
					</block>
					<view class="btn-box" v-if="item.status == 0">
						<button type="primary" size="mini">立即支付</button>
					</view>
					<view class="btn-box" v-if="item.status == 1">
						<button type="primary" size="mini">可以退款</button>
					</view>
					<view class="btn-box" v-if="item.status == 2">
						<button type="primary" size="mini">查看物流</button>
						<button type="primary" size="mini">确认收货</button>
					</view>
					<view class="btn-box" v-if="item.status == 3">
						<button type="primary" size="mini">查看物流</button>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollLeft: 0,
			isClickChange: false,
			currentTab: 0,
			menuTabs: [
				{ name: '全部' },
				{ name: '待付款' },
				{ name: '待发货' },
				{ name: '待收货' },
				{ name: '已完成' }
			],
			orderList: [], //全部订单
			status_0: [], //取消订单立即发货
			status_1: [], //未发货，可退款
			status_2: [], //卖家发货
			status_3: [], //交易成功
			status: '' //判断各种状态
		};
	},
	onLoad() {
		var that = this;
		that.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			if (!token) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				that.getOrder();
			}
		});
	},
	methods: {
		// 点击tab
		swichMenu(current) {
			var that = this;
			if (that.currentTab == current) {
				return false;
			} else {
				that.currentTab = current;
			}
		},
		// 获取订单
		getOrder() {
			var that = this;
			that.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				console.log(token);
				//菜单
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/order/my-order',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					data: {
						page: 1
					},
					success: res => {
						if (res.data.code == 0) {
							var order_list = res.data.data;
							var orderList = [];
							var status_0 = [];
							var status_1 = [];
							var status_2 = [];
							var status_3 = [];
							var status_4 = [];
							console.log(order_list);
							for (var i = 0; i < order_list.length; i++) {
								if (order_list[i].status == 0) {
									var index = i;
									status_0.push(order_list[index]);
								} else if (order_list[i].status == 1) {
									var index = i;
									status_1.push(order_list[index]);
								} else if (order_list[i].status == 2) {
									var index = i;
									status_2.push(order_list[index]);
								} else if (order_list[i].status == 3) {
									var index = i;
									status_3.push(order_list[index]);
								}
								orderList.push(order_list[i]);
							}
							that.orderList = order_list;
							that.status_0 = status_0; //取消订单 立即支付
							that.status_1 = status_1; //卖家发货
							that.status_2 = status_2; //交易成功
							that.status_3 = status_3; // 订单取消
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		},
		// 取消订单
		cancelOrder(order_id) {
			var order_id = order_id;
			var that = this;
			console.log(order_id);
			that.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				//菜单
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/order/close-order',
					method: 'POST',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					data: {
						order_id: order_id
					},
					success: res => {
						console.log(res);
						if (res.data.code == 0) {
							uni.showToast({
								title: '订单已关闭'
							});
							that.getOrder();
						}
					}
				});
			});
		},
		// 订单详情
		toDetails(order_id) {
			var order_id = order_id; // 订单#id
			console.log(order_id);
			uni.navigateTo({
				url: 'orderdetails/orderdetails?order_id=' + order_id
			});
		}
	}
};
</script>

<style>
page {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: center;
	background: rgba(249, 249, 249, 1);
}

.body-view {
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	width: 100%;
	align-items: flex-start;
	justify-content: center;
}

.top-menu-view {
	display: flex;
	white-space: nowrap;
	width: 100%;
	background-color: #ffffff;
	height: 112upx;
	position: fixed;
	z-index: 999;
	/* 在这里设置导航条高度 */
}

.top-menu-view .menu-one-view {
	display: inline-block;
	white-space: nowrap;
	height: 100%;
}

.top-menu-view .menu-one-view .menu-one {
	/* 在这里写 单个按钮样式 */
	margin-left: 25upx;
	margin-right: 25upx;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one .menu-one-txt {
	height: 40upx;
	font-size: 28upx;
	font-weight: 400;
	color: rgba(154, 154, 154, 1);
	line-height: 40upx;
}

.top-menu-view .menu-one-view .menu-one .menu-one-bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
}

.top-menu-view .menu-one-view .menu-one .menu-one-bottom .menu-one-bottom-color {
	width: 60%;
	height: 4upx;
}

.top-menu-view .menu-one-view .menu-one-act {
	/* 在这里写 单个按钮样式 */
	margin-left: 25upx;
	margin-right: 25upx;
	position: relative;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-txt {
	height: 40upx;
	font-size: 28upx;
	font-weight: 400;
	color: rgba(0, 170, 255, 1);
	line-height: 40upx;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom {
	position: absolute;
	bottom: 0;
	width: 100%;
	display: flex;
	justify-content: center;
}

.top-menu-view .menu-one-view .menu-one-act .menu-one-bottom .menu-one-bottom-color {
	width: 60%;
	height: 4upx;
	background: rgba(0, 170, 255, 1);
}
.order-box {
	margin-top: 20rpx;
	padding: 0 30rpx;
	background: #fff;
}
.order-box image {
	width: 200rpx;
	height: 200rpx;
	display: block;
	margin-right: 20rpx;
}
.name {
	font-size: 40rpx;
}
.maijia {
	float: right;
	font-size: 30rpx;
	color: red;
}
.daipen {
	font-size: 32rpx;
	color: #09bb07;
}
.price {
	float: right;
	font-size: 36rpx;
}
.btn-box {
	margin-top: 40rpx;
}
.btn-box button {
	margin-left: 30rpx;
}
</style>
