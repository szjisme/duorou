<template>
	<view class="s-page-wrapper" style="width: 100%;">
		<view class="search-pop">
			<view class="main-title">
				<view class="search-tab">
					<view class="search">
						<input
							type="text"
							value=""
							:placeholder="placeholder"
							class="search_area"
							@input="searchInput"
						/>
						<view class="search_submit" @tap="submitSearch">搜 索</view>
					</view>
				</view>
			</view>
		</view>
		<view :class="haveSearch == true ? 'hide' : 'show-box'" style="margin-top: 140rpx;">
			<view class="hot-box" style="width: 100%;">
				<view class="hot-search" style="">热门搜索</view>
				<view class="search-box" style="width: 97%;margin: 20rpx 0 30rpx;">
					<view class="search">
						<view
							class="search-item"
							style=""
							v-for="(key, index) in keywordlist"
							:key="index"
						>
							{{ key.value }}
						</view>
					</view>
				</view>
			</view>
			<view class="history-box" style="width: 100%;margin-top: 160rpx;">
				<view class="history-search" style="">历史搜索</view>
				<view class="search-box" style="width: 100%;margin: 20rpx 0 30rpx;">
					<view class="search">
						<view
							class="search-item"
							style=""
							v-for="(key, index) in history"
							:key="index"
						>
							{{ key.value }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view
			:class="haveSearch == true ? 'show-box' : 'hide'"
			v-if="have == true"
			style="margin-top: 140rpx;"
		>
			<view class="menu_box">
				<block v-for="(item, index) in goodsList" :key="index">
					<view class="menu-box">
						<view class="menu">
							<image :src="item.encyclopedia_thumb"></image>
							<view class="">{{ item.encyclopedia_name }}</view>
							<view class="num s-row">
								<view class="tmprice">
									带盆 ¥{{ item.goods_included_price / 100 }}
								</view>
								<view class="tmprice">不带盆 ¥{{ item.goods_price / 100 }}</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view
			:class="haveSearch == true ? 'show-box' : 'hide'"
			v-else-if="have == false"
			style="margin-top: 140rpx;"
		>
			暂无内容
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			placeholder: '输入您想搜索的内容',
			keywords: '',
			keywordlist: [
				{ value: '种球' },
				{ value: '花盆' },
				{ value: '绣球' },
				{ value: '营养液' },
				{ value: '种球' }
			],
			current: 0,
			history: [{ value: '种球' }, { value: '花盆' }, { value: '绣球' },{ value: '绣球' }],
			haveSearch: false, //判断搜索
			goodsList: [],
			have: true ,//判断搜索没有数据
			name:''
		};
	},
	onLoad() {},
	methods: {
		searchInput(res) {
			var that = this;
			var name = res.detail.value;
			that.name = name;
			if(name == ''){
				that.haveSearch = false;
				that.have = true;
			}
		},
		submitSearch(res) {
			var that = this;
			var name = that.name;
			var obj = {};
			if (name == '') {
				that.haveSearch = false;
				that.have = true;
			} else {
				obj.value = name;
				that.history.unshift(obj)
				that.getSearch(name, 1, '0,20', 0);
			}
		},
		getSearch(name, sort, price_range, page) {
			var that = this;
			uni.showToast({
				icon: 'loading',
				duration: 1000,
				mask: true
			});
			that.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				//菜单
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/goods/search',
					method: 'POST',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					data: {
						name: name,
						sort: sort,
						price_range: price_range,
						page: page
					},
					success: res => {
						if (res.data.code == 0) {
							var goods_list = res.data.data;
							that.goodsList = goods_list;
							that.haveSearch = true;
							that.have = true;
						} else if (res.data.code == -2) {
							that.haveSearch = true;
							that.have = false;
						}
					}
				});
			});
		}
	}
};
</script>

<style>
.swiper {
	height: 100%;
}
.search .search-item {
	float: left;
	font-size: 30rpx;
	background-color: #ddd;
	padding: 4rpx 10rpx;
	margin-left: 30rpx;
	border-radius: 30rpx;
	margin-top: 30rpx;
}
.help-tips {
	font-size: 13px;
	color: #999;
	line-height: 26px;
	padding: 0 0 0 30px;
	margin: 0;
	width: 80%;
	text-align: left;
}
.hide {
	display: none;
}
.show {
	display: block;
}
.help-tips.color999 {
	color: #999999;
}
.search-default {
	text-align: center;
	height: 200px;
	margin: auto;
}
.search-default image {
	display: block;
	margin: auto;
	width: 80%;
}
.search-cat {
	position: fixed;
	top: 0;
	bottom: 0;
	padding-top: 130rpx;
	width: 100%;
	height: 100%;
	padding-bottom: 11px;
	background-color: #fff;
}
.search-cat .search-cat-tit {
	position: relative;
	width: 150px;
	height: 10px;
	margin: 13px 3% 20px;
}
.search-cat .search-cat-tit .up-menu {
	display: block;
	height: 20px;
	line-height: 20px;
	font-size: 0.9em;
	color: #999;
}
.src-content {
	margin: 20px 0 30px;
	width: 97%;
}
.main-src .src-item {
	float: left;
	border-radius: 22px;
	padding: 0 10px;
	height: 23px;
	line-height: 23px;
	background-color: #f6f6f6;
	margin: 10px;
	position: relative;
	font-size: 13px;
	color: #333;
}
.main-title {
	background: -moz-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -webkit-gradient(
		linear,
		left top,
		left right,
		color-stop(0, #fa4dbe),
		color-stop(100%, #fbaa58)
	);
	background: -webkit-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -o-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -ms-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: linear-gradient(to left, #fa4dbe 0, #fbaa58 100%);
	border-bottom-color: transparent;
	padding: 8px 10px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 120;
	display: block;
	box-sizing: border-box;
}
.search-pop .search-tab {
	margin: 5px 0 10px;
	color: #fff;
	font-size: 15px;
	text-align: center;
	/* #ifdef APP-PLUS */
	padding-top: var(--status-bar-height);
	/* #endif */
}
.search-pop .search-tab .my-sub-src {
	margin: 0 auto 0 20px;
	display: inline-block;
	color: #fff;
	line-height: 30px;
	margin-bottom: 10px !important;
}
.search-pop .search-tab .my-sub-src:nth-child(1) {
	margin-left: 0px !important;
}
.main-title .search-tab .cur {
	opacity: 1;
	border-bottom: 1px solid #fff;
}
.main-title .search-tab .close-src {
	position: absolute;
	left: 20px;
	display: block;
	float: left;
	color: #ffffff;
	margin-top: 15px;
}
.main-title .search-tab .close-src .iconfont {
	font-size: 20px;
}
.main-title .search {
	background-color: #fff;
	border-radius: 20px;
	width: 76%;
	margin-left: 12%;
	position: relative;
	padding: 0 9px;
	height: 32px;
	line-height: 32px;
	font-size: 13px;
	margin-top: 10px;
}
.search_submit {
	width: 25%;
	height: 32px;
	background: #ffb925;
	color: #fff;
	float: right;
	margin-top: -32px;
	position: relative;
	border-radius: 15px;
	margin-right: -20px;
	z-index: 30;
}
.main-title .search input {
	border: none;
	outline: 0;
	height: 32px;
	font-size: 13px;
	line-height: 30px;
	background: #fff;
	color: #666;
	border-radius: 5px;
	padding: 0 0 0 5px;
	text-align: left;
}
.main-title .search input.search_area {
	background-color: transparent;
	position: relative;
	z-index: 99;
	width: 80%;
	color: #333;
	font-size: 12px;
}
.menu-box .menu {
	width: 45%;
	float: left;
	margin-left: 3.33333%;
}
.menu-box .menu image {
	width: 320rpx;
	height: 320rpx;
}
</style>
