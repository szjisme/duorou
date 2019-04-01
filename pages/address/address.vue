<template>
	<view class="main">
		<block v-for="(item, index) in addressList" :key="index">
			<view class="addr-box" :data-address='item.address_id' @tap="address">
				<text class="name">{{item.username}}</text>
				<text class="num">{{item.tel}}</text>
				<text class="def-addr" @click="setDefault(item.address_id)">默认地址</text>
				<text class="addr">{{item.province_name}}{{item.city_name}}{{item.county_name}}{{item.detail}}</text>
				<view class="btns">
					<view class="uni-padding-wrap uni-common-mt">
						<button class="mini-btn default" type="default" size="mini" @click="updateAddr(item.username,item.tel,item.province_name,item.city_name,item.county_name,item.detail,item.address_id,is_default)">编辑</button>
						<button class="mini-btn red" type="primary" size="mini" @click="delAddr(item.address_id)">删除</button>
					</view>
				</view>
			</view>
		</block>
		<view class="uni-padding-wrap uni-common-mt add-addr">
            <view class="button-sp-area">
                <button type="primary" plain="true" @click="addAddr">添加地址</button> 					
            </view>
        </view>
	</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				addressList:'',
				address_id: 1,
				username: "",
				tel: "",
				province_name: "",
				city_name: "",
				county_name: "",
				detail: "",
				is_default: true,
				addr:''
			}
		},
		onLoad() {
			
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				if(!token){
					uni.navigateTo({
						url:'../login/login'
					})
				}else{
					// 获取收货地址
					that.getAddress();
					that.setDefault();
				}
				
				
			})
		},
		onShow() {
	
		},
		methods:{
			// 获取地址
			getAddress(){
				var that = this;
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
					uni.request({
						url:'http://api.succulents.fxb-team.com/v1/address',
						method:'GET',
						header:{
							'Authorization': 'Bearer '+token,
							'MERCHANTID': 1
						},
						success: (res) => {
							console.log(res.data.data[0])
							if(res.data.code == 0){
								console.log(res)
								var addressList = res.data.data;
								console.log(addressList)
								that.addressList = addressList;
							}else{
								console.log('参数异常')
							}					    
						}							
					})
				})
			},
			// 删除地址
			delAddr(address_id){				
				var that = this;
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
					uni.request({
						url:'http://api.succulents.fxb-team.com/v1/address/delete',
						method:'POST',
						header:{
							'Authorization': 'Bearer '+token,
							'MERCHANTID': 1
						},
						data:{
							address_id:address_id
						},
						success: (res) => {
							if(res.data.code == 0){
								uni.showToast({
									title:'删除成功'
								})
								that.getAddress()
							}										  
						}							
					})
				})
			},
			// 设置默认地址
			setDefault(address_id){
				var that = this;
				var addressList = that.addressList;
				
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
					uni.request({
						url:'http://api.succulents.fxb-team.com/v1/address/set-default',
						method:'POST',
						header:{
							'Authorization': 'Bearer '+token,
							'MERCHANTID': 1
						},
						data:{
							address_id:address_id
						},
						success: (res) => {
							console.log(res)
							if(res.data.code == 0){
								var obj = {};
								for(var i = 0; i < addressList.length; i++){
								   if(addressList[i].address_id == address_id){
										 obj =addressList[i];
										 addressList.splice(i,1);// 
										 addressList.unshift(obj)
									 }
								}
								that.addressList = addressList;
								uni.showToast({
									title:'设置成功'
								})
							}else if(res.data.code == -2){
							}	    
						}							
					})
				})
			},
			// 修改地址地址
			updateAddr(name,tel,province_name,city_name,county_name,detail,address_id,is_default){
				uni.navigateTo({
					url:'../addaddr/addaddr?username='+name+'&tel='+tel+'&province_name='+province_name+'&city_name='+city_name+'&county_name='+county_name+'&detail='+detail+'&address_id='+address_id+'&is_default='+is_default
				})
				var that = this;
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
					uni.request({
						url:'http://api.succulents.fxb-team.com/v1/address/update',
						method:'POST',
						header:{
							'Authorization': 'Bearer '+token,
							'MERCHANTID': 1
						},
						data:{
							address_id: that.address_id,
							username: that.username,
							tel: that.tel,
							province_name: that.province_name,
							city_name: that.city_name,
							county_name: that.county_name,
							detail: that.detail,
							is_default: that.is_default
						},
						success: (res) => {
							if(res.data.code == 0){
								console.log('修改成功')
							}
						}							
					})
				})	
			},
			address(res){
				console.log(res)
				let address_id = res.currentTarget.dataset.address;
				this.$eventHub.$emit('fire',address_id);
				uni.navigateBack({
					url: '../buy/buy'
				});
			},
			addAddr(){
				uni.navigateTo({
					url:'../addaddr/addaddr'
				})
			}
		}
	} 
</script>


<style>
	.main {
		width: 100%;
		height: 100%;
	}

	.addr-box {
		width: 90%;
		height: 350rpx;
		margin: 50rpx auto;
		border: 1px solid #ccc;
		background: #fff;
	}

	.name,
	.num {
		margin: 20rpx;
		display: inline-block;
	}

	.addr {
		display: flex;
		margin-left: 20rpx;
		margin-top: 20rpx;
	}
	.btns{
		float:right;
		margin-top:80rpx;
		margin-right:30rpx;
	}
	.def-addr{
		font-size: 30rpx;
		color: red;
		margin-left: 100rpx;
	}
	.btns .default{
		background: #C8C7CC;
	}
	.btns .red{
		background: red;
		margin-left: 20rpx;
	}
	.gray{
		background: #Ccc;
	}
	.add-addr{
		width: 50%;
		margin: auto;
	}
</style>
