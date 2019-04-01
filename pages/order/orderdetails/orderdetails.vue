<template>
	<view class="main">
		<image class="banner" src="../../../static/img/order.png" mode=""></image>
		<view class="fast-box">
			<image class="car" src="../../../static/img/buycar.jpg" mode=""></image>
			<view class=""><text class="fast-txt" @click="toLogistics(order_id)">{{log}}</text></view>
			<view class="fast-time"><text>{{track_created_at}}</text></view>
		</view>
		<view class="address-box">
			<image class="dress" src="../../../static/img/address.jpg" mode=""></image>
			<view class="name-box">
				<text class="name">{{ address.username }}</text>
				<text class="tel">{{ address.tel }}</text>
			</view>
			<view class="address">
				<text>
					{{ address.province_name }}{{ address.city_name }}{{ address.county_name
					}}{{ address.detail }}
				</text>
			</view>
		</view>
		<view class="order-box">
			<block v-for="(item, index) in extraList" :key="index">
				<view class="order-list">
					<image :src="item.encyclopedia_thumb"></image>
					<view class="" style="flex: 1;">
						<view style="display: flex;">
							<text class="name" style="flex: 1;">
								{{ item.encyclopedia_name }}-{{ item.goods_serial_number }}
							</text>
							<text class="price">￥100</text>
						</view>
						<text class="daipen" v-if="item.goods_is_included == true">带盆</text>
						<text class="daipen" v-if="item.goods_is_included == false">带盆</text>
					</view>
				</view>
			</block>
			<view class="yunfei-box">
				<view class="price-box">
					<text class="yunfei">运费</text>
					<text class="price">￥0</text>
				</view>
				<view class="pay-box">
					<text class="fukuan">付款(含快递)</text>
					<text class="pay" style="color: red;">￥{{ total_fee / 100 }}</text>
				</view>
			</view>
			<view class="mes-box">
				<view class="order-mes">订单信息</view>
				<view class="price-box">
					<text class="order-hao">订单编号:</text>
					<text class="hao">{{dataexpress_order}}</text>
				</view>
				<view class="time-box">
					<text class="creat">创建时间:</text>
					<text class="pay">{{created_at}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import formatTime from '../../../main.js'
export default {
	data() {
		return {
			order_id: '',
			address: '',
			extraList: '',
			total_fee: '',
			created_at:'' ,//创建时间
			dataexpress_order:'', //订单编号
			track_created_at:'', //物流最后时间
			log:'', // 最后物流信息
			
		};
	},
	onLoad(res) {
		var that = this;
		var order_id = res.order_id;
		that.order_id = order_id;
		that.getDetails(order_id);		
	},
	methods: {
		getDetails(order_id) {
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
							var created_at = res.data.data.created_at; //订单创建时间
							that.created_at = created_at;
							var total_fee = res.data.data.total_fee; //总计金额
							that.total_fee = total_fee;
							var express = res.data.data.express; //订单信息
							var tracking = express.tracking;  //物流信息
							var  track_created_at = tracking[0].event_at; //最后物流时间
							that.track_created_at = track_created_at;  //最后时间
							var log = tracking[0].log;     //最后物流信息
							that.log= log;
							var dataexpress_order = express.express_order; //订单编号
							that.dataexpress_order  = dataexpress_order;
							var address = res.data.data.address; //地址
							that.address = address;
							var extraList = res.data.data.extra; //订单
							that.extraList = extraList;
							
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		},
		// 详细物流信息
		toLogistics(order_id){
			
			console.log(order_id)
		
			uni.navigateTo({
				url:'../Logetails/Logetails?order_id='+order_id
			})
		}
	}
};
</script>

<style>
.main {
	width: 100%;
	height: 100%;
}
.main .banner {
	width: 100%;
	height: 200rpx;
}
.main .fast-box {
	height: 140rpx;
	padding: 0 20px;
}
.main .car,
.main .dress {
	width: 60rpx;
	height: 60rpx;
	float: left;
}
.main .fast-txt,
.main .address {
	font-size: 30rpx;
}
.fast-time {
	font-size: 26rpx;
	color: #ccc;
}
.main .address-box {
	margin-top: 10rpx;
	height: 100rpx;
	padding: 0 20px;
}
.main .name-box {
	font-size: 28rpx;
}
.order-list {
	padding: 0 40rpx;
	display: flex;
}
.order-list image {
	width: 200rpx;
	height: 200rpx;
	margin-right: 20rpx;
}

.daipen {
	font-size: 32rpx;
	color: #09bb07;
}
.price {
	font-size: 30rpx;
}
.yunfei-box {
	font-size: 30rpx;
}
.price-box,
.pay-box,
.time-box {
	display: flex;
	padding: 0 20rpx;
}
.yunfei,
.fukuan {
	flex: 1;
}
.order-hao,
.creat {
	flex: 1;
}
</style>
