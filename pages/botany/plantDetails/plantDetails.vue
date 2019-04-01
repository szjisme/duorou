<template>
	<view class="main">
		<view class="banner">
			<cover-image src="" v-bind:src="encyclopedia_banner" mode=""></cover-image>
			<text class="name">{{ encyclopedia_name }}</text>
		</view>
		<view class="details-box">
			<text class="jianjie">简介</text>
			<text class="descrip">{{ encyclopedia_description }}</text>
			<text class="yanghu">养护</text>
			<text class="mode">{{ encyclopedia_breeding_mode }}</text>
			<text class="jiqiao">技巧</text>
			<text class="skill">{{ encyclopedia_breeding_skill }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			encyclopedia_name: '',
			encyclopedia_banner: '',
			encyclopedia_description: '',
			encyclopedia_breeding_mode: '',
			encyclopedia_breeding_skill: ''
		};
	},
	onLoad(res) {
		var id = res.id;
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;		
			uni.request({
				url: 'http://api.succulents.fxb-team.com/v1/encyclopedia/item',
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + token,
					MERCHANTID: 1
				},
				data: {
					id: id
				},
				success: res => {
					if (res.data.code == 0) {
						var itemList = res.data.data;
						console.log(itemList);
						that.encyclopedia_name = itemList.encyclopedia_name;
						that.encyclopedia_banner = itemList.encyclopedia_banner;
						that.encyclopedia_description = itemList.encyclopedia_description;
						that.encyclopedia_breeding_mode = itemList.encyclopedia_breeding_mode;
						that.encyclopedia_breeding_skill = itemList.encyclopedia_breeding_skill;
					} else if (res.data.code == -2) {
					}
				}
			});
		});
	}
};
</script>

<style>
.main {
	width: 100%;
	height: 100%;
}
.banner {
	width: 100%;
	height: 300rpx;
	position: relative;
	background-size: 100%;
}
cover-image {
	width: 100%;
	height: 100%;
}
.name {
	position: absolute;
	bottom: 50rpx;
	color: #fff;
}
.jianjie,
.yanghu,
.jiqiao {
	display: block;
}
.descrip,
.mode,
.skill {
	font-size: 28rpx;
}
</style>
