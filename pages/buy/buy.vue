<template>
	<view class="main">
		<view class="add-box">
			<view class="onebox" @tap="address">
				<view class="person"><text>收货人:</text>{{username}} {{tel}}</view>
				<view><text>收货地址:</text>{{province_name}}{{city_name}}{{county_name}}{{detail}}</view>
			</view>
			<view class="picbox">
				<view class="pic">
					<image :src="optData.thumb"></image>
				</view>
				<view class="desc">
					<view class="">
						{{optData.name}}-{{optData.serial_number}}
					</view>
					<view>
						<block v-if="optData.is_included == true">
							带盆-{{optData.price}}
						</block>
						<block v-else>
							裸花-{{optData.price}}
						</block>
					</view>
				</view>
			</view>
			<view class="flexbox" @tap="radioFc">
				<cover-image class="radiobtn" :src="is_select == true?'../../static/select.png':'../../static/noselect.png'"></cover-image>
				<view>余额 {{amount}}元</view>
			</view>
			<view class="rui-flex">
				<text>定时发货：</text>
				<ruiDatePicker
					fields="second"
					:start="value"
					end="2030-12-30 23:59:59"
					:value="value"
					@change="bindChange"
					@cancel="bindCancel"
				></ruiDatePicker>
			</view>
			<view class="beizhu">
				<text>备注：</text><input @input="iptchange" type="text" placeholder="请输入备注信息"/>
			</view>
			<view class="buynow">
				<text>总计:{{optData.price}}</text>
				<button class="save" type="primary" @tap="postBuy">立即下单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from "vue"; 
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import formatTime from '../../main.js';
	export default {
		data() {
			return {
				value: '',
				is_select:false,
				username:'',
				tel:'',
				province_name:'',
				county_name:'',
				city_name:'',
				detail:'',
				address_id:null,
				optData:{},
				amount:0,
				use_cashing:0,
				iptvalue:'',
				stamp:0
			};
		},
		components: {ruiDatePicker},
		onLoad(option) {
			console.log('打印传参');
			console.log(option);
			this.optData = option;
			var time = formatTime.formatTime(new Date());
			this.value = time;
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;				
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/user/get-amount',
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						that.amount = res.data.data.amount;
					}
				});
			})	
		},
		onShow() {
			console.log('onshow')
			let that = this;
			this.$eventHub.$on('fire', function (data) {
				that.address_id = data;
			});
			console.log('chuaNHUI')
			console.log(that.address_id);
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;			
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/address',
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						console.log('收货');
						console.log(res);
						console.log(res.data.data.length);
						let data = res.data.data;
						console.log(that.address_id);
						if(that.address_id != null){
							console.log('走返回');
							for (let i = 0;i<data.length;i++) {
								console.log(data)
								if(data[i].address_id == that.address_id){
									that.username = data[i].username,
									that.tel = data[i].tel,
									that.province_name = data[i].province_name,
									that.city_name = data[i].city_name,
									that.county_name = data[i].county_name,
									that.detail = data[i].detail,
									that.address_id = data[i].address_id
								}
							}
						}else{
							for (let i = 0;i<data.length;i++) {
								if(data[i].is_default == true){
									that.username = data[i].username,
									that.tel = data[i].tel,
									that.province_name = data[i].province_name,
									that.city_name = data[i].city_name,
									that.county_name = data[i].county_name,
									that.detail = data[i].detail,
									that.address_id = data[i].address_id
								}
							}
						}
					}
				});
			})
		},
		methods: {
			postBuy(){
				var date = new Date(this.value);
				console.log(date)
				var date2 = new Date().getTime();
				console.log(date2)
				var that = this;
				// date2 = date2;
				this.stamp = date.getTime();
				console.log(this.stamp);
				console.log(this.stamp - date2);
				if(this.stamp - date2>0){
					this.common.getToken(that, function(res) {
						var token = that.$store.state.token;					
						uni.request({
							url: 'http://api.succulents.fxb-team.com/v1/order/direct-order',
							method:'POST' ,
							data: {
									"goods_id": that.optData.goods_id,
									"is_included": that.optData.is_included,
									"address_id": that.address_id,
									"use_cashing": that.use_cashing,
									"remark": that.iptvalue,
									"timed_ship":that.stamp
							},
							header: {
								Authorization:'Bearer '+token,
								MERCHANTID:1
							},
							success: (res) => {
								if(res.data.code == 0){
									console.log(res)
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
											uni.navigateTo({
												url:'../order/order'
											})
										},
										fail: function (err) {
											console.log(err)
											console.log(payment.nonce_str);
											console.log(payment.prepay_id)
											uni.navigateTo({
												url: '../payfail/payfail?order_id='+order_id+''
											});
										}
									});
								}else{
									console.log(res);
									uni.showToast({
										title: res.data.message,
										duration: 2000
									});
								}
								// setTimeout(,500)
							}
						})
					})
				}else{
					uni.showToast({
						title:'请重新定时',
						duration: 2000
					});
				}

			},
			iptchange(e){
				console.log(e);
				this.iptvalue = e.detail.value;
			},
			address(){
				uni.navigateTo({
					url: '../address/address'
				});
			},
			// 选择余额
			radioFc(){
				this.is_select = !this.is_select;
				if(this.is_select){
					use_cashing = 1
				}else{
					use_cashing = 0
				}
				console.log(this.use_cashing);
			},
			bindChange(value){
				this.value = value; 
			},
			bindCancel(value){
				console.log('激活取消函数')
			}
		}
	}
</script>

<style scoped>
	button {
		width: 80%;
	}

	.content {
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300upx;
		font-size: 28upx;
		border: #FFFFFF 1upx solid;
	}

	.main {
		width: 100%;
		height: 100%;
	}

	.add-box {
		width: 90%;
		height: 800upx;
		margin: 50upx auto;
	}
    .picbox{display: flex;margin:20upx 0;font-size: 34upx;}
	.pic image{width:150upx;height:150upx;margin-right: 30upx;}
	.add-box>view{
		clear: both;
	}
	.buynow{width:80%;height:80upx;line-height: 80upx;margin:100upx auto;}
	.save{width:40%;height:80upx;line-height: 80upx;text-align: center;color: #fff;font-size: 30upx;background: #F40;float: right;}
	.box view{width: fit-content;padding: 15upx 10upx;float: left;margin-bottom: 20upx;}
	.radiobtn{width:30upx;height:30upx;margin-right: 15upx;margin-top:10upx;}
	.flexbox{display: flex;font-size: 34upx;}
	.onebox{font-size: 34upx;}
	.onebox text{font-size: 34upx;display: inline-block;margin-right: 10upx;}
	.rui-flex{display: flex;height:50upx;line-height: 50upx;font-size: 34upx;margin:30upx 0;}
	.rui-picker{height:100%;}
	.beizhu{font-size:34upx;display: flex;height:50upx;line-height: 50upx;}
	.beizhu input{border:1px solid #eee;}
</style>

