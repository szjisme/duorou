<template>
	<view class="index-content">
		<!-- 搜索板块 -->
		<view class="index-header">
			<view class="icon_header">
				<view class="index-search" @tap="toSearchIndex">
					<view class="icon_search">
						<text class="iconfont icon-search"></text>
						<text>请输入您需要搜索的商品名称</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索板块 -->

		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper
					class="swiper-container"
					:autoplay="true"
					:interval="4000"
					:circular="true"
					:indicator-dots="true"
					indicator-active-color="#FC3F78"
					indicator-color="#cccccc"
				>
					<block v-for="item in banner" :key="item">
						<swiper-item class="swiper-wrapper">
							<image :src="item" mode="widthFix"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<!-- banner -->

		<!-- 菜单板块 -->
		<view class="index-navlist s-grids has-bg-white has-pdtb-10" v-if="navlist.length > 0">
			<view
				class="is-col-1-5 is-center"
				v-for="(nav, index) in navlist"
				:key="index"
				@tap="toMenu(nav.id)"
			>
				<view class="has-pdtb-5">
					<image :src="nav.logo" mode="widthFix"></image>
					<view class="is-size-14">{{ nav.name }}</view>
				</view>
			</view>
		</view>
		<!-- 菜单板块 -->

		<!-- 推荐新品 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row"><text class="fl-jutext">推荐新品</text></view>
			<view class="goods-list" v-if="recommend.length > 0">
				<view
					class="coupon-page s-row"
					v-for="(item, index) in recommend"
					:key="index"
					@click="toGoodsInfo(item.goods_id, item.flower_id)"
				>
					<view class="image">
						<image :src="item.encyclopedia_thumb"></image>
						<view class="">{{ item.encyclopedia_name }}</view>
						<view class="num s-row">
							<view class="tmprice">带盆 ¥{{ item.goods_included_price / 100 }}</view>
							<view class="tmprice">不带盆 ¥{{ item.goods_price / 100 }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 领券直播 -->

		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="recommend.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 加载更多提示 -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			banner: [], //轮播
			navlist: [], //菜单
			recommend: [],
			page: 1,
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			}
		};
	},
	onReady: function() {
		// this.loadCouponList();
	},
	onLoad: function() {
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			console.log(!token);
			if (!token) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				that.getBanner();
				that.getMenu();
				that.getTuijian();
			}
		});
	},
	onShow() {
		this.getBanner();
		this.getMenu();
		this.getTuijian();
	},
	methods: {
		// 跳转到 menu
		toMenu(id) {
			uni.navigateTo({
				url: '/pages/menu/menu?menu_id=' + id
			});
		},
		toGoodsInfo(g_id, f_id) {
			uni.reLaunch({
				url: '../rou/rou?g_id=' + g_id + '&f_id=' + f_id
			});
		},
		toSearchIndex: function() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		getBanner() {
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/slide',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						if (res.data.code == 0) {
							var banner_list = res.data.data;
							var banner = [];
							for (var i = 0; i < banner_list.length; i++) {
								banner.push(banner_list[i].banner);
							}
							that.banner = banner;
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		},
		getMenu() {
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/menu',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						if (res.data.code == 0) {
							console.log(res.data);
							var nav_list = res.data.data;
							that.navlist = nav_list;
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		},
		getTuijian() {
			var that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/goods/recommend',
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
							var recommend_list = res.data.data;
							console.log(recommend_list);
							that.recommend = recommend_list;
						} else if (res.data.code == -2) {
						}
					}
				});
			});
		}
	}
};
</script>

<style>
@import '../../static/css/index.css';
.coupon-page {
	float: left;
}
.index-content .index-coupon .goods-list .coupon-page .image {
	width: 100%;
}
.index-content .index-coupon .goods-list .coupon-page .image image {
	width: 310rpx;
	height: 310rpx;
}
</style>
