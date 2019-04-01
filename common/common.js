
export default {
	login(_this) {
		// console.log(1)
		// console.log(_this.$store.state.hasLogin)
		if (!_this.$store.state.hasLogin) {
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !_this.forcedLogin,
				success: (res) => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (_this.$store.state.forcedLogin) {
							uni.reLaunch({
								url: '../login/login'
							});
						} else {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				}
			});
		} else {
			return false
		}
	},
	getToken(that,callbackFunction){
		console.log(that)
		var token = that.$store.state.token;
		 return callbackFunction(token)
	},
}