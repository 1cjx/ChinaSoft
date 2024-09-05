<!-- 开发者:陈金铭 -->

<template>
	<view>
		<!-- 顶部轮播图 -->
		<swiper class="swiper_box" autoplay circular :interval="2000">
			<swiper-item v-for="(item, i) in swiper" :key="i" @click="goFacDetail(item.name,type)">
				<view class="name">{{item.name}}</view>
				<image class="swiper_image" :src="item.imag" mode="aspectFill" />
			</swiper-item>
		</swiper>
		<!-- 游乐园基本信息 -->
		<view class="message">
			<view class="time">
				<u-icon class="icon" name="clock" color="#2979ff"></u-icon>
				<text class="info">营业时间:9:00-22:00</text>
			</view>
			<view class="adress">
				<u-icon class="icon" name="map" color="#2979ff"></u-icon>
				<text class="info">地址:重庆两江新区金渝大道29号</text>
			</view>
		</view>
		<!-- 推荐路线 -->
		<view class="recommend_route">
			<view class="title_box">
				<image class="route_icon" src="../../static/route/route.png"></image>推荐路线
			</view>
			<view class="routes">
				<view class="cards" v-for="(item, index) in cardList" :key="index"
					@click="clickCard(item.routeId,item.routeType)">
					<view class="item">
						<view class="item_image">
							<image class="image" mode="aspectFill" :src="item.imgUrl" />
						</view>
						<view class="item_message">
							<view class="item_text">
								<view class="title">{{ item.name }}</view>
								<view class="extra">途径点{{ item.routeLength }}个</view>
							</view>
							<image class="item_icon"
								v-if="item.routeType == 'hotvisit' || item.routeType == 'hotsubscribe'"
								src="../../static/route/hot.png"></image>
							<image class="item_icon" v-if="item.routeType=='fluently'"
								src="../../static/route/green.png">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper: [], //轮播图
				cardList: [], //推荐路线信息列表
				type: "amusement",
			}
		},

		onLoad() {
			this.ip = getApp().globalData.ip;
			this.getSwiper(); //获得轮播图
			this.getRecommendRoute(); //获得推荐路线信息
		},

		methods: {
			//获得轮播图
			getSwiper() {
				uni.request({
					url: 'http://' + this.ip + '/swiper',
					method: 'GET',
					//响应
					success: (response) => {
						this.swiper = response.data.data.map(item => ({
							name: item.name,
							imag: item.imageUrl
						}));
					}
				})
			},

			//获得所有推荐路线
			getRecommendRoute() {
				this.getNormalRoute();
				this.getSortByVisit();
				this.getSortBySubscribe();
				this.getSortCrowingLevel();
			},

			//获得普通路线
			getNormalRoute() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation',
					method: 'POST',
					data: {},
					success: (response) => {
						if (response.data.code * 1 == 200) {
							const routes = response.data.data;
							routes.forEach(route => {
								const routemessage = {
									routeId: route.id,
									name: route.name,
									imgUrl: route.imgUrl,
									routeLength: route.swiperList.length,
									routeType: "normal"
								}
								this.cardList.push(routemessage);
							})
						}
					}
				})
			},

			//获得热门打卡路线
			getSortByVisit() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortByVisit',
					method: 'GET',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							const route = response.data.data;
							const routemessage = {
								routeId: route.id,
								name: route.name,
								imgUrl: route.imgUrl,
								routeLength: route.swiperList.length,
								routeType: "hotvisit"
							}
							this.cardList.push(routemessage);
						}
					}
				})
			},

			//获得热门订阅路线
			getSortBySubscribe() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortBySubscribe',
					method: 'GET',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							const route = response.data.data;
							const routemessage = {
								routeId: route.id,
								name: route.name,
								imgUrl: route.imgUrl,
								routeLength: route.swiperList.length,
								routeType: "hotsubscribe"
							}
							this.cardList.push(routemessage);
						}
					}
				})
			},

			//获得畅通路线
			getSortCrowingLevel() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortCrowingLevel',
					method: 'GET',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							const route = response.data.data;
							const routeMessage = {
								routeId: route.id,
								name: route.name,
								imgUrl: route.imgUrl,
								routeLength: route.swiperList.length,
								routeType: "fluently"
							}
							this.cardList.push(routeMessage);
						}
					}
				})
			},

			//跳转设施详情页
			goFacDetail(name, type) {
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + type
				});
			},

			//跳转推荐路线页
			clickCard(id, routeType) {
				uni.navigateTo({
					url: '/pages/recommendroute/recommendroute?id=' + id + '&type=' + routeType
				});

			}

		}

	}
</script>

<style lang="scss">
	.name {
		bottom: 0px;
		width: 100%;
		font-size: 16px;
		color: white;
		background-color: rgba(179, 206, 224, 0.7);
		position: absolute;
		z-index: 2;
	}

	.swiper_box {
		height: 400rpx;
		text-align: center;
		margin-top: 0;
	}

	.swiper_image {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.message {
		height: 150rpx;
		font-size: 14px;
		align-items: center;
		padding: 10px;
		margin-top: 40rpx;
	}

	.icon {
		padding-left: 20rpx
	}

	.time {
		border-bottom: 1px solid #e0e0e0;
	}

	.time,
	.adress {
		height: 50%;
		align-items: center;
		display: flex;
		align-items: center;

	}

	.info {
		padding-left: 10rpx;
	}

	.recommend_route {
		border-radius: 50rpx;
		padding-top: 30rpx;
		background-color: white;
		padding: 20rpx;
	}

	.routes {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10px;
	}

	.route_icon {
		width: 50rpx;
		height: 50rpx
	}

	.cards {
		width: calc(50% - 20rpx);
		margin-bottom: 20px;
	}

	.item {
		border-radius: 20px;
		box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
	}

	.image {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		width: 100%;
		height: 170rpx;
	}

	.item_message {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
		padding: 10rpx;
	}

	.item_text {
		flex: 1;
	}

	.item_icon {
		margin-right: 20rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.title_box {
		display: flex;
		margin-top: 10rpx;
		margin-left: 30rpx;
		font-weight: 600;
		font-size: 18px;
	}

	.title {
		font-weight: bold;
		font-size: 16px;
	}

	.extra {
		font-size: 14px;
		color: #999;
	}
</style>