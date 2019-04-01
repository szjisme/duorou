<template>
    <view class="container_box" id="video_box">
		<view class="van_swipe">
			<swiper style="position: fixed;top:0;left:0;" :show-indicators="false" @change="vertical" :current="current2" @animationfinish='animationfinish' :vertical="true" :loop="true">
				<swiper-item v-for="(allitem, index) in videoList" :key="index" class="product_swiper">
					<swiper :current="allitem.current" :id="allitem.flower_id" :show-indicators="false" @animationfinish='animationfinish' @change="onChange" :vertical="false" :loop="true" @touchstart="hideModal">
						<swiper-item v-for="(item, _index) in allitem.video_list" :key="_index" class="product_swiper">
							<view class="all">
							种类:{{allitem.encyclopedia_name}}
							</view>
							<view class="all describe">
							价格: 带盆{{item.goods_included_price}}  裸花{{item.goods_price}}
							</view>
							<view class="video_container">
								<image class="play" :src="item.goods_video_thumb"></image>
							</view>
						</swiper-item>
					</swiper>
				</swiper-item>
			</swiper>
			
		<block v-if="true == can">
			<video autoplay="" :enable-progress-gesture="false" :src="src" @touchstart="touchstart" @touchend="touchend">
				<cover-view class="all">种类:{{name}}</cover-view>
				<cover-view class="all describe">价格: 带盆{{goods_included_price}}  裸花{{goods_price}}</cover-view>
				<!-- 详情当前页弹出层 -->
					<cover-view class='comment_border' style=''>
					  <cover-view class='sidebar_b_rt' @tap='collectstate'>
						<!-- 头像 -->
						<block v-if="collect == true">
							<cover-image src='../../static/collect.png' data-userid='' class='comment_img'></cover-image>
						</block>
						<block v-else>
							<cover-image src='../../static/collect1.png' data-userid='' class='comment_img'></cover-image>
						</block>
						<cover-view class='comment_num'>收藏</cover-view>
					  </cover-view>
					  <!-- 评论 -->
					  <cover-view class='sidebar_b_rt' @tap='showModal'>
						<cover-image src='../../static/detail.png' class='comment_img' data-vid="" data-img_url=''></cover-image>
						<!-- 评论数 -->
						<cover-view class='comment_num' data-vid="" data-img_url=''>详情</cover-view>
					  </cover-view>
					   <!-- 赞 -->
					  <cover-view class='sidebar_b_rt' @tap='toCar'>
							<cover-image src="../../static/car.png" class='comment_img' data-vid='' data-uid=''></cover-image>
							<!-- 赞数 -->
							<cover-view class='comment_num'>加入购物车</cover-view>
					  </cover-view>
					  <!-- 立即购买 -->
					  <cover-view class='sidebar_b_rt' @tap='toBuy'>
							<cover-image src="../../static/buy.png" class='comment_img' data-vid='' data-uid=''></cover-image>
							<!-- 赞数 -->
							<cover-view class='comment_num'>立即购买</cover-view>
					  </cover-view>
					  <!-- 分享 -->
					  <cover-view class='sidebar_b_rt' @tap="showShare">
						  <cover-image src='../../static/share.png' class='comment_img'></cover-image>
						<!-- 转发数 -->
						<cover-view class='comment_num'>立即分享</cover-view>
					  </cover-view>
					</cover-view>
				<block v-if="shadow == true">
					<cover-view class="shadow" @tap="hideModal">
						<!-- 分享 -->
						<cover-view class="sharebox" v-if="showshare == true">
							<cover-view class="sharelist">
								<button class='comment__button' open-type='share'>分享到群</button>
							</cover-view>
							<cover-view class="sharelist hb" @tap="myhbFc">生成海报</cover-view>
						</cover-view>
						<!-- 生成海报 -->
						<cover-view class="myhb" v-if="myhb == true">
							<cover-image class="close" @tap="closeHb" src="../../static/close.png"></cover-image>
							<cover-image @longtap="longtap" class="pic" style="pointer-events:none" src="../../static/zhiwu.jpg"></cover-image>
							<cover-view class="desc">长按海报保存图片，分享到朋友圈</cover-view>
						</cover-view>
						<!-- 详情 -->
						<cover-view :animation="animationData" class="commodity_attr_box" v-if="true == showModalStatus">
							<cover-view class="zhiwu">植物名称:{{name}}</cover-view>
							<cover-view class="zhiwu">植物简介</cover-view>
							<cover-view class="zhiwudesc">{{encyclopedia_description}}</cover-view>
							<cover-view class="zhiwu">上手难度:{{encyclopedia_difficult}}</cover-view>
							<cover-view class="zhiwu">种植领域</cover-view>
							<cover-view class="zhiwudesc">{{planting_area}}</cover-view>
							<cover-view class="zhiwu">种植模式</cover-view>
							<cover-view class="zhiwudesc">{{breeding_mode}}</cover-view>
							<cover-view class="zhiwu">种植技巧</cover-view>
							<cover-view class="zhiwudesc">{{breeding_skill}}</cover-view>
						</cover-view>
						
						</cover-view>
						<!-- 加入购物车 -->
						<cover-view class="mycar" v-if="addcar == true">
							<cover-view class='oneline'>
								<cover-image class="product" :src="thumb"></cover-image>
								<cover-view class="radiobox" aria-role='button'>
									<cover-view class="flexbox" @tap="radioFc">
										<cover-image class="radiobtn" :src="is_included == true?'../../static/select.png':'../../static/noselect.png'"></cover-image>
										<cover-view>带盆</cover-view>
									</cover-view>
									<cover-view class="flexbox" @tap="radioFc">
										<cover-image class="radiobtn" :src="is_included == false?'../../static/select.png':'../../static/noselect.png'"></cover-image>
										<cover-view>裸花</cover-view>
									</cover-view>
								</cover-view>
								<block v-if="buyNow == true">
									<cover-view class="buybtn" @tap="toNewpage">立即购买</cover-view>
								</block>
								<block v-else>
									<cover-view class="buybtn" @tap="buyTocar">确定</cover-view>
								</block>
							</cover-view>
						</cover-view>
				</block>
			</video>
		</block>
		</view>
	</view>
</template>
<script>
    import Vue from "vue"; 
    export default {
        name: 'videoChild',
        data() {
            return {
                current: 0,
				current2:0,
				src:'',
				collect:'',
				tx:0,
				ty:0,
                videoList:[],
				animationData:{},
				showModalStatus:false,
				can:true,
				hide:false,
				line:0,
				showshare:false,
				shadow:false,
				myhb:false,
				good_id:0,
				addcar:false,
				thumb:'',
				is_included:true,
				buyNow:true,
				page:1,
				firstplay:false,
				opt:{},
				name:'',
				goods_price:0,
				goods_included_price:0,
				price:0,
				encyclopedia_description:'',
				encyclopedia_difficult:0,
				planting_area:'',
				breeding_mode:'',
				breeding_skill:'',
				imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553841429011&di=a38d76a7a3e15bee493b3f01c73cf189&imgtype=0&src=http%3A%2F%2Fimg.redocn.com%2Fsheji%2F20180327%2Flvsezhiwuduoroupenzaihaibao_9286593.jpg.285.jpg'
            }
        },
		onLoad(option) {
			console.log(option)
			this.opt = option;
			var that = this;
			// console.log(that.commonTest);
			this.common.getToken(that, function(res) {
				console.log(res);
			var token = that.$store.state.token;
			if(!token){
				uni.navigateTo({
					url:'../login/login'
				})
			}else{
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/goods/video-list',
					data: {
						time:1553934503,
						flower_id:0,
						goods_id:0,
						is_recommend:0,
						page:1
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						console.log(res)
						if(res.data.code == 0){
							let arr = res.data.data.video_list;
							for (var i = 0;i<arr.length;i++) {
								arr[i].current = 0;
							}
							console.log(arr)
							that.videoList=arr;
							console.log(that.videoList);
							that.videoPlay();
						}else{
							uni.showToast({
								title: '请登录',
								duration: 2000
							});
						}
					}
				});
			}
			
			})
		},
		methods: {
			videoPlay(){
				console.log(this.opt.f_id)
				console.log(this.opt.g_id)
				if(this.opt.f_id){
					let dataArr = this.videoList;
					console.log('下面是加载后的数据')
					console.log(dataArr);
					console.log('数据长度行'+dataArr.length);
					for (let i = 0;i<=dataArr.length-1;i++) {
						console.log('dataArr[i]====='+i)
						console.log('flower_id'+dataArr[i].flower_id);
						console.log('this.opt.f_id'+this.opt.f_id);
						if(dataArr[i].flower_id == this.opt.f_id){
							console.log('找到了');
							console.log(dataArr[i].flower_id == this.opt.f_id)
							console.log(dataArr[i].flower_id);
							console.log(this.opt.f_id);
							this.current2 = i;
							this.line = i;
							let goods = dataArr[this.line].video_list;
							for (let n = 0;n<goods.length;n++) {
								if(goods[n].goods_id == this.opt.g_id){
									dataArr[this.line].current = n;
								}
							}
							this.firstplay = true;
							this.commonVideo();
						}else{
							if(i == dataArr.length-1){
								console.log('执行一次加载更多');
								this.loadMore();
							}
						}
					}
				}else{
					if(this.page == 1){
						let that = this;
						that.current2 = 0;//页面传输过来的行数
						that.line = 0;//页面传输过来的行数
						console.log(that.videoList);
						console.log(that.videoList[that.line]);
						that.videoList[that.line].current = 0;//页面传输过来要播放的视频下标
						this.commonVideo();
					}
				}
				
			},
		//改变菜单
		changeTab(index){
			this.tabIndex =index
		},
		//改变收藏状态
		collectstate(){
			this.good_id = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_id;
			this.videoList[this.line].video_list[this.videoList[this.line].current].is_collect = !this.videoList[this.line].video_list[this.videoList[this.line].current].is_collect;
			this.collect = this.videoList[this.line].video_list[this.videoList[this.line].current].is_collect;
			var that = this;
			if(this.collect == true){				
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/collection/create',
					method:'POST' ,
					data: {
						"goods_id": that.good_id
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						console.log(res)
						uni.showToast({
							title: res.data.message,
							duration: 2000
						});
					}
				});
				})
			}else{
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/collection/delete',
					method:'POST' ,
					data: {
						"collect_id": that.good_id
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						uni.showToast({
							title: '已取消收藏',
							duration: 2000
						});
					}
				});
				})
			}
			console.log(this.collect)
		},
		dataCar(){
			this.shadow = true;
			this.addcar = true;
			this.thumb = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_video_thumb;
		},
		toCar(){
			this.buyNow = false;
			this.dataCar();
		},
		toBuy(){
			this.buyNow = true;
			this.dataCar();
		},
		//展示分享弹窗
		changeShare(){
			this.showShareBox=true
		},
		//取消分享
		cancelShare(){
			this.showShareBox=false
		},
		// 改变video内状态
		commonVideo(){
			this.hideModal();
			this.src = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_video_url;
			this.collect = this.videoList[this.line].video_list[this.videoList[this.line].current].is_collect;
			this.name = this.videoList[this.line].encyclopedia_name;
			this.goods_price = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_price;
			this.goods_included_price = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_included_price;
			this.good_id = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_id;
			this.price = this.goods_included_price;
			console.log(this.name);
			console.log(this.price);
		},
		//滑动改变播放的视频
		onChange(index) {
			console.log('触发change事件');
			console.log(index)
			console.log(this.current)
			this.commonVideo();
		},
		// 下滑
		btn(res,add){
			this.current = this.videoList[this.line].current;//获取正在播放视频的容器下标
			let len = this.videoList[this.line].video_list.length;//视频容器的长度
			console.log('len'+len);
			if(add == 1){
				console.log('播放下一个');
				if(this.current<len-1){
					console.log('进来了');
					this.can = false;
					this.videoList[this.line].current = this.videoList[this.line].current + 1;//下一个播放
				}else{
					return false;
				}
			}else{
				console.log('播放上一个');
				if(this.current>0){
					console.log('进来了');
					this.can = false;
					this.videoList[this.line].current = this.videoList[this.line].current - 1;//上一个播放
				}else{
					return false;
				}
			}
		},
		// 加载更多
		loadMore(){
			let that = this;
			this.page = this.page + 1;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/goods/video-list',
					data: {
						time:1553934503,
						flower_id:0,
						goods_id:0,
						is_recommend:0,
						page:that.page
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						console.log(res);
						console.log('第几页'+that.page);
						that.can = true;
						if(res.data.code == 0){
							let arr = res.data.data.video_list;
							console.log('请求的数据');
							console.log(arr)
							for (var i = 0;i<arr.length;i++) {
								arr[i].current = 0;
								that.videoList.push(arr[i])
							}
							if(that.firstplay == false){
								console.log('执行video')
								that.videoPlay();
							}
							console.log(that.videoList)
						}else{
							console.log(res)
							uni.showToast({
								title: '已加载全部',
								duration: 2000
							});
							return false;
						}
					}
				});
				})
		},
		// 上滑
		btn2(res,add){
			console.log('在哪航'+this.line);
			let itemData = this.videoList;//获取视频数据列表
			if(add == 1){
				console.log(this.current2)
				console.log(itemData.length)
				if(this.current2 < itemData.length-1){
					this.can = false;
					this.current2 = this.current2+1;//播放下一个
					this.line = this.line+1;
					if(this.current2 == itemData.length-1){
						uni.showToast({
							title: '加载中',
							icon:'loading',
							duration: 2000
						});
						this.loadMore();
					}
				}else{
					return false;
				}
			}else{
				if(this.current2 > 0){
					this.current2 = this.current2-1;//播放上一个
					this.can = false;
					this.line = this.line-1;
				}else{
					return false;
				}
			}
			this.commonVideo()//与video相关的内容
		},
		animationfinish(){
			console.log('动画结束');
			this.can = true;
		},
		touchstart: function(res) {
			// #ifndef MP-WEIXIN
			this.tx = res.changedTouches[0].pageX;
			this.ty = res.changedTouches[0].pageY;
			// #endif
			// #ifdef MP-WEIXIN
			this.tx = res.touches[0].pageX;
			this.ty = res.touches[0].pageY;
			// #endif
		},
		touchend: function(res) {
			let linex = res.mp.changedTouches[0].pageX - this.tx;
			let liney = res.mp.changedTouches[0].pageY - this.ty;
			let add = 0;
			let endx;
			let endy;
			if(linex<0){
				endx = -linex
			}else{
				endx = linex
			}
			if(liney<0){
				endy = -liney
			}else{
				endy = liney
			}
			if(this.shadow == false){
				if (linex > 0 && endx>endy){
					// 向左滑
					add = -1;//下标减一
					// console.log('左右');
					this.btn(res,add)
				}else if(linex < 0 && endx>endy){
					// 向右滑
					add = 1;//下标加一
					this.btn(res,add)
				}else if(liney > 0 && endx<endy){
					// 向上滑
					add = -1;//下标减一
					this.btn2(res,add)
				}else if(liney < 0 && endx<endy){
					// 向下滑
					add = 1;//下标加一
					this.btn2(res,add)
				}
			}
		},
		showModal: function () {
			this.shadow = true;
			this.showModalStatus = true;
			let that = this;
			this.common.getToken(that, function(res) {
				var token = that.$store.state.token;
			uni.request({
				url: 'http://api.succulents.fxb-team.com/v1/goods/detail',
				data: {
					goods_id:that.good_id,
				},
				header: {
					Authorization:'Bearer '+token,
					MERCHANTID:1
				},
				success: (res) => {
					if(res.data.code == 0){
						that.encyclopedia_description = res.data.data.encyclopedia_description,
						that.encyclopedia_difficult = res.data.data.encyclopedia_difficult,
						that.planting_area = res.data.data.encyclopedia_planting_area,
						that.breeding_mode = res.data.data.encyclopedia_breeding_mode,
						that.breeding_skill = res.data.data.encyclopedia_breeding_skill
					}else{
						uni.showToast({
							title: '请登录',
						});
					}
					console.log(that.good_id)
					console.log(res);
				}
			});
			})
			
		},
		hideModal:function(){
			if(this.myhb == false){
				this.shadow = false;
				this.myhb = false;
			}
			this.showModalStatus = false;
			this.showshare = false;
			this.addcar = false;
		},
		showShare(){
			this.shadow = true;
			this.showshare = true;
		},
		myhbFc(){
			this.showshare = false;
			this.myhb = true;
		},
		save() {
		 uni.downloadFile({
		  url:this.imgSrc,
		  success:function(res) {
			console.log(res);
		    if (res.statusCode === 200) {
		      let img = res.tempFilePath;
		      uni.saveImageToPhotosAlbum({
		        filePath: img,
		        success(res) {
		          uni.showToast({
		            title: '保存成功',
		            icon: 'success',
		            duration: 2000
		          });
		        },
		        fail(res) {
		          uni.showToast({
		            title: '保存失败',
		            icon: 'success',
		            duration: 2000
		          });
		        }
		      });
		    }
		  }
		  });
		},
		longtap(res){
			let that = this;
			uni.getSetting({
				success(res) {
					if (res.authSetting['scope.writePhotosAlbum']) {
						uni.authorize({
							scope:'scope.writePhotosAlbum',
							success(res) {
								console.log('授权成功');
								console.log(res);
								that.save()
							}
						})
					}else{
						uni.openSetting({
						  success(res) {
							console.log(res.authSetting)
						  }
						});
					}
				},
				fail(res) {
					console.log(res);
				}
			})
			console.log('执行长按');
		},
		// 关闭海报
		closeHb(){
			this.shadow = false;
			this.myhb = false;
		},
		// 选择裸花还是带盆
		radioFc(){
			this.is_included = !this.is_included;
			if(this.is_included){
				this.price = this.goods_included_price;
			}else{
				this.price = this.goods_price;
			}
			console.log(this.price)
		},
		// 加入购物车
		buyTocar(){
				this.good_id = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_id;
				console.log(this.good_id);
				console.log(this.is_included);
				var that = this;
				this.common.getToken(that, function(res) {
					var token = that.$store.state.token;
				uni.request({
					url: 'http://api.succulents.fxb-team.com/v1/shopping-cart/push',
					method:'POST' ,
					data: {
							"goods_id": that.good_id,
							"is_included": that.is_included
					},
					header: {
						Authorization:'Bearer '+token,
						MERCHANTID:1
					},
					success: (res) => {
						console.log(res)
						uni.showToast({
							title: res.data.message,
							duration: 2000
						});
					}
				});
				})
		},
		// 立即购买
		toNewpage(){
			let flower_id = this.videoList[this.line].flower_id;
			let thumb = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_video_thumb;
			let serial_number = this.videoList[this.line].video_list[this.videoList[this.line].current].goods_serial_number;
			uni.navigateTo({
				url: '../buy/buy?goods_id='+this.good_id+'&flower_id='+flower_id+'&price='+this.price+'&is_included='+this.is_included+'&thumb='+thumb+'&serial_number='+serial_number+'&name='+this.name+''
			});
		}
	}
}
</script>

<style scoped>
    html,body{
        height: 100%;
    }
	.hide{
		display: none;
	}
	swiper{
		width:100vw;
		height:100vh;
		float: left;
		overflow: hidden;
	}
	swiper-item{
		height:100vh;
	}
	video::-webkit-media-controls {
	  display:none !important;
	}
	.all{
		width:100%;
		position: fixed;
		top:50upx;
		left:50upx;
		z-index: 9999;
		color:#fff;
	}
	.describe{
		top:100upx;
	}
	.myVideo,.video_container{
	  width: 100vw;
	  height: 100vh;
	}
   .video-player {
        height: 100%;
        width: 100%;
    }
	video{
		position: fixed;
		top:0;
		left:0;
		height: 100vh;
        width: 100vw;
		}
    .product_swiper {
        width: 100%;
        height: 100%;
    }
 
    .van_swipe {
        width: 100%;
        height: 100vh;
    }
 
    .container_box {
        width: 100%;
        height: 100%;
    }
 
    .video_box {
        object-fit: cover !important;
        z-index: 999;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
		right:0;
        overflow: hidden;
    }
 
    video {
        object-position: 0 0;
    }
    .play,
    .platStart {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
		/* -webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%); */
    }
	.comment_border {
	  position: fixed;
	  top: 35%;
	  right: 10upx;
	  text-align: center;
	}
	.comment_img {
	  width: 60upx;
	  height: 60upx;
	  margin:50upx auto 0;
	}
	.comment_num {
	  color: #fff;
	  font-size: 24upx;
	  text-align: center;
	  margin-top: 10upx;
	}
	.comment__button{
	  width: 100%;
	  height:100%;
	  font-size: 34upx;
	  line-height: 120upx;
	  background: #ebb522;
	  border-radius: 0;
	  color:#fff;
	}
	button::after {
	  border: none;
	}
	.commodity_attr_box {
	  height:50%;
	  width: 100%;
	  overflow-y:scroll;
	  position: fixed;
	  bottom:0;
	  left: 0;
	  z-index: 2000;
	  background: #fff;
	  padding-bottom: 60upx;
	}
	.shadow cover-view{
		text-align: center;
	}
	.commodity_attr_box cover-view{
		white-space:pre-wrap;
		flex-wrap: wrap;
		padding: 20upx;
		text-align: left;
	}
	.commodity_attr_box .zhiwu{font-size: 34upx;font-weight: bold;}
	.commodity_attr_box .zhiwudesc{font-size: 30upx;}
	.sharebox{
		width:100%;
		height:10%;
		display: flex;
		background: #fff;
		position: fixed;
		left:0;
		bottom: 0;
		z-index: 2000;
	}
	.sharelist{
		flex: 1;
		font-size: 34upx;
		line-height: 120upx;
		color:#fff;
	}
	.shadow{
		position: fixed;
		width:100%;
		height:100%;
		background: rgba(0,0,0,0.5);
	}
	.hb{
		background: #F40;
	}
	.shadow .myhb{
		width:80%;
		heigth:50%;
		position: absolute;
		top:50%;
		left:50%;
		-webkit-transform: translate(-50%,-50%);
		-moz-transform: translate(-50%,-50%);
		-ms-transform: translate(-50%,-50%);
		-o-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
	}
	.myhb .pic{
		width:100%;
		height:850upx;
	}
	.desc{display: block;color:#fff;font-size: 30upx;margin-top:30upx;}
	.close{width:60upx;height:60upx;float: right;margin-bottom:20upx;}
	.mycar{width:100%;height:50%;background: #fff;position: fixed;left:0;bottom: 0;box-sizing: border-box;padding: 20upx;}
	.product{width:150upx;height:150upx;border-radius:15upx;float:left;}
	.online{width:100%;}
	.radio{width:50%;float:left;}
	.radiobox{margin-top:20upx;}
	.radiobtn{width:30upx;height:30upx;margin-right: 15upx;margin-top:10upx;}
	.flexbox{display: flex;margin-left:50upx;margin-bottom:20upx;}
	.buybtn{width:80%;height:80upx;border-radius: 20upx;background: #F40;color: #fff;line-height: 80upx;text-align: center;color: #fff;font-size: 30upx;margin:100upx auto;}
</style>