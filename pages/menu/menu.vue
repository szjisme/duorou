<template>
	<view class="body-view">
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
		<view class="menu_box" v-if="have == true">
			<block v-for="(item, index) in menuList" :key="index">
				<view class="menu-box">
					<view class="menu">
						<image :src="item.encyclopedia_thumb"></image>
						<view class="">{{ item.encyclopedia_name }}</view>
						<view class="num s-row">
							<view class="tmprice">带盆 ¥{{ item.goods_included_price / 100 }}</view>
							<view class="tmprice">不带盆 ¥{{ item.goods_price / 100 }}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view class="menu-box"  v-else-if="have == false">
			<view class="menu">暂无内容</view>
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
			menuTabs: [],
			menuList: [],
			have:true
		};
	},
	onLoad(res) {
		var that = this;
		var id = res.menu_id;
		that.currentTab = id-1;
		that.common.getToken(that, function(res) {
			var token = that.$store.state.token;			
			//菜单
			uni.request({
				url: 'http://api.succulents.fxb-team.com/v1/menu',
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + token,
					MERCHANTID: 1
				},
				success: res => {
					if (res.data.code == 0) {
						var menu_list = res.data.data;
						that.menuTabs = menu_list;
					} else if (res.data.code == -2) {
					}
				}
			});
			// 菜单内商品
			that.getMenu(token,id,1)
		});
	},
	methods: {
		// 点击tab
		swichMenu(current){
			var that = this;
			if(that.currentTab == current){
				return false
			}else{
				this.currentTab = current;
			}
			that.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				// 菜单内商品
				that.getMenu(token,current+1,1)
			});
		},
		// 菜单内的商品
		getMenu(token,id,page){
			var that = this;
			uni.showToast({						
			  icon: 'loading',
			  duration: 1000,
			  mask: true
			})
			uni.request({
				url: 'http://api.succulents.fxb-team.com/v1/goods/get-menu-goods',
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + token,
					MERCHANTID: 1
				},
				data: {
					menu_id: id,
					page: page
				},
				success: res => {
					if (res.data.code == 0) {
						var menuList = res.data.data;
						that.menuList = menuList;
						that.have = true;
					} else if (res.data.code == -2) {
						that.have = false
					}
				}
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
.menu-box{
	margin-top: 30rpx;
}
.menu-box .menu{
	width: 45%;
	float: left;
	margin-left: 3.33333%;
}
.menu-box .menu image{
	width: 320rpx;
	height: 320rpx;
}
.hide{
	display: none;
}

</style>
