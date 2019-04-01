<template>
	<view><phone-directory :phones="phones" @paramClick="paramClick"></phone-directory></view>
</template>

<script>
import phoneDirectory from '../../components/phone-directory.vue';

export default {
	name: 'phones',
	components: {
		phoneDirectory
	},
	data() {
		return {
			//示例数据
			phones: ''
		};
	},
	onLoad() {
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			if (!token) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/encyclopedia/list',
					method: 'GET',
					header: {
						Authorization: 'Bearer ' + token,
						MERCHANTID: 1
					},
					success: res => {
						console.log(res);
						if (res.data.code == 0) {
							var phones = res.data.data;
							// console.log(phones)
							that.phones = phones;
						} else if (res.data.code == -2) {
						}
					}
				});
			}
		});
	},
	onshow() {
		var that = this;
		this.common.getToken(that, function(res) {
			var token = that.$store.state.token;
			uni.request({
				url: 'http://api.succulents.fxb-team.com/v1/encyclopedia/list',
				method: 'GET',
				header: {
					Authorization: 'Bearer ' + token,
					MERCHANTID: 1
				},
				success: res => {
					if (res.data.code == 0) {
						var phones = res.data.data;
						console.log(phones);
						that.phones = phones;
					} else if (res.data.code == -2) {
					}
				}
			});
		});
	},
	methods: {
		paramClick(e) {
			var id = e.id;
			uni.navigateTo({
				url: 'plantDetails/plantDetails?id=' + id
			});
		}
	}
};
</script>

<style></style>
