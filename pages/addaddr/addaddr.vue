<template>
	<view class="main">
		<view class="add-box">
			姓名: <input class="name" type="text" @input="getName" :value="username">
			电话: <input class="num" type="number" v-model="mobile" maxlength="11" placeholder="请输手机号" @input='getPhone'>
			地址：<view class="dizhi" src="" @click="showThreePicker">{{pickerValue}}</view>
			详细地址：<input type="text" :value="detail" @input='getMore' />
			<button class="defaddr" type="primary" plain="true" @click="addAddr">自动获取微信默认地址</button>
			<button class="save" type="primary" @click="saveAddress">保存</button>
		</view>
		<view class="content">
		</view>
		<wzp-picker ref="wzpPicker" :mode="mode" :pickerList="pickerList" :defaultIndex="defaultIndex" :equalModeId="equalModeId"
		 @onConfirm="onConfirm"></wzp-picker>
	</view>
</template>

<script>
	import wzpPicker from "../../components/wzp-picker/wzpPicker.vue";
	import cityData from "../../common/city.data.js";
	import province from '../../common/province.js';
	export default {
		data() {
			return {
				pickerValue: "",
				mode: "",
				pickerList: [],
				defaultIndex: [],
				username:'',
				tel:'',
				province_name:'',
				city_name:'',
				country_name:'',
				detail:''	,
				moreAdress:'',
				is_default:false
			};
		},
		components: {  
            wzpPicker,  
            /* 其它组件定义 */  
        }, 
		onLoad(res) {
			var that = this;
			var username = res.username;
			var tel = res.tel;
			var province_name = res.province_name;
			var city_name = res.city_name;
			var county_name = res.county_name;
			var  detail = res.detail;
			var is_default = res.is_default;
// 			that.is_default = is_default;
// 			that.username = username;
// 			that.tel = tel;
// 			that.province_name = province_name;
// 			that.city_name = city_name;
// 			that.county_name = county_name;
// 			that.detail = detail;
		},
		methods: {			
			// 获取用户名
			getName(res){				
				this.username = res.detail.value;
			},
			// 获取手机号
			getPhone(e){
				this.tel = e.detail.value;
			},
			// 获取详细地址
			getMore(res){
				var that = this;
				var moreAdress = res.detail.value;
				that.detail = moreAdress;
				console.log(moreAdress)
			},
			// 验证姓名
			testName(name){
				if(name == '' || name == undefined){
					uni.showToast({
					    title: '姓名不能为空',
						icon: 'none'
					  })
				}
			},
			// 手机号验证
			getNum(tel) {	
				var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
					if (tel == 0) {
					  uni.showToast({
					    title: '手机号不能为空',
						icon: 'none'
					  })
					  return false;
					} else if (tel.length < 11) {
					  uni.showToast({
					    title: '手机号长度有误！',
						icon: 'none'
					  })
					  return false;
					} else if (!myreg.test(tel)) {
					  uni.showToast({
					    title: '手机号有误！',
						icon: 'none'
					  })
					  return false;
					} 

			},
			// 三列联动初始化
			showThreePicker() {
				this.mode = 'three';
				this.pickerList = province;
				this.defaultIndex = [0, 0, 0];
				this.$refs.wzpPicker.showPicker();
			},
			onConfirm(e) {
				if (this.mode == "one") {
					this.pickerValue = this.pickerList[e[0]].label;
				} else if (this.mode == "two_linkage") {
					this.pickerValue = cityData[e[0]].label + " " + cityData[e[0]].children[e[1]].label;
				} else if (this.mode == "two_nolinkage") {
					this.pickerValue = this.pickerList.firstArray[e[0]].label + " " + this.pickerList.secondArray[e[1]].label;
				} else if (this.mode == "three") {
					this.pickerValue = province[e[0]].label + " " + province[e[0]].children[e[1]].label + " " + province[e[0]].children[
						e[1]].children[e[2]].label;
				}
			},
			// 新增地址
			saveAddress(res){
				var that = this;
				var username = that.username;
				var tel = that.tel;
				var detail = that.detail;
				var pickerValue = that.pickerValue;
				var province_name = pickerValue.trim().split(/\s+/)[0];
				var city_name = pickerValue.trim().split(/\s+/)[1];
				var county_name = pickerValue.trim().split(/\s+/)[2];
				var is_default = that.is_default;
				
				if(username == '' || username == undefined){
					that.testName(username);
				}else{
					that.getNum(tel);
				}	
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;				
					uni.request({
						url:'http://api.succulents.fxb-team.com/v1/address/create',
						method:'POST',
						header:{
							'Authorization': 'Bearer '+token,
							'MERCHANTID': 1
						},
						data:{
							"username": username,
							"tel": tel,
							"province_name": province_name,
							"city_name": city_name,
							"county_name": county_name,
							"detail": detail,
							"is_default": is_default
						},
						success: (res) => {
							if(res.data.code == 0){
								console.log(res.data)
								uni.navigateTo({
									url:'../address/address'
								})
							}else{
								console.log('参数异常')
							}					    
						}							
					})
				})
			},			
		},

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
		height: 800rpx;
		border: 1px solid #ccc;
		margin: 50rpx auto;
	}

	.dizhi {
		width: 80%;
		height: 50rpx;
		border: 1px solid #ccc;
	}

	.add-box input {
		width: 80%;
		border: 1px solid #ccc;
	}

	.save {
		width: 40%;
		margin: 30rpx auto;
	}

	.defaddr {
		width: 60%;
		margin: 30rpx auto;
	}
</style>
