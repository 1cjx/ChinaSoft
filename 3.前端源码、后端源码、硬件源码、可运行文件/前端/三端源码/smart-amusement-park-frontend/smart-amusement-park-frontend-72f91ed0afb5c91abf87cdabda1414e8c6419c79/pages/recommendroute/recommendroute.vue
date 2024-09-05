<!-- 开发者:陈金铭 -->

<template>
	<view class="page">
		<!-- 顶部轮播图 -->
		<swiper class="swiper_box" autoplay circular :interval="2000">
			<swiper-item v-for="(item, i) in stepList" :key="i" @click="goFacDetail(item.name,type)">
				<view class="name">{{item.name}}</view>
				<image class="swiper_image" :src="item.imageUrls[0]" mode="scaleToFill" />
			</swiper-item>
		</swiper>
		<!-- 路线信息 -->
		<view class="details_box">
			<view class="route_title">
				{{name}}
			</view>
			<view class="exta">途径设施{{length}}个</view>
			<view class=""></view>
			<view class="cards">
				<view class="card" v-for="(item,index) in stepList" :key='index'>
					<view class="desc_box" @click="goFacDetail(item.name,type)">
						<view class="item_title">
							<view>
								{{item.name}}
							</view>
						</view>
						<view class="item_row">
							<view class="time_text">
								<u-icon name="clock" color="#2979ff" size="28"></u-icon>
								开放时间: {{item.startTime}}-{{item.closeTime}}
							</view>
							<view class="wait_time">
								<u-icon name="man-add" :color="getTextColor(item.expectWaitTime)" size="28"></u-icon>
								预计排队:
								<text class="time"
									:style="{ color: getTextColor(item.expectWaitTime), paddingLeft: '6px' }">
									{{item.expectWaitTime}}
								</text>

								分钟
							</view>
						</view>
						<view class="image_row">
							<image class="item_img" mode="aspectFill" :src="item.imageUrls[0]" />
						</view>
					</view>
				</view>
			</view>
			<!-- 路线导航按钮 -->
			<u-button class="button" type="primary" plain @click="goMap">路线导航</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperimag: [], //轮播图
				name: "", //路线名
				stepList: [], //路线设施列表
				type: "amusement",
				length: "", //路线长度
				routeid: '', //路线id
				routetype: '', //路线类型
				routes: [], //存入缓存路线信息
				facilities: [], //存入缓存的设施列表
				locations: [], //存入缓存的坐标信息
			}
		},

		onLoad(options) {
			this.ip = getApp().globalData.ip;
			const id = options.id;
			this.routeid = id;
			const type = options.type;
			this.routetype = type;
			//获取路线信息
			this.fetchData(id, type);
		},
		methods: {
			//跳转地图页
			async goMap() {
				this.stepList.forEach(o => {
					this.facilities.push({
						facilityId: o.id,
						facilityType: 0
					});
					this.locations.push({
						id: o.id,
						longitude: o.longitude,
						latitude: o.latitude,
						name: o.name,
						expectWaitTime: o.expectWaitTime
					});
				})
				this.routes.push({
					routeid: this.routeid,
					routetype: this.routetype
				})
				uni.setStorageSync('facilities', this.facilities);
				uni.setStorageSync('locations', this.locations);
				uni.setStorageSync('routes', this.routes);
				uni.switchTab({
					url: '/pages/map/map'
				})
			},
			
			//根据路线类型,调用不同方法
			fetchData(id, type) {
				if (type === "normal") {
					this.getnormal(id);
				} else if (type === "hotvisit") {
					this.gethotvisit();
				} else if (type === "hotsubscribe") {
					this.gethotsub();
				} else if (type === "fluently") {
					this.getfluently();
				}
			},
			//通过id获取普通路线信息
			getnormal(id) {
				uni.request({
					url: 'http://' + this.ip + '/recommendation',
					method: 'POST',
					data: {
						id: id
					},
					success: (response) => {
						const swiperList = response.data.data[0].swiperList;
						this.length = swiperList.length;
						this.stepList = swiperList.map((item) => {
							const startTime = this.parseTime(item.startTime);
							const closeTime = this.parseTime(item.closeTime);
							return {
								...item,
								startTime,
								closeTime
							};
						});
						this.name = response.data.data[0].name;
					},
					fail: (err) => {}
				});
			},
			
			//获取热门打卡路线信息
			gethotvisit() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortByVisit',
					method: 'GET',
					success: (response) => {
						const swiperList = response.data.data.swiperList;
						this.length = swiperList.length;
						this.stepList = swiperList.map((item) => {
							const startTime = this.parseTime(item.startTime);
							const closeTime = this.parseTime(item.closeTime);
							return {
								...item,
								startTime,
								closeTime
							};
						});
						this.name = response.data.data.name;
					},
					fail: (err) => {}
				});
			},
			
			//获取热门订阅路线信息
			gethotsub() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortBySubscribe',
					method: 'GET',
					success: (response) => {
						const swiperList = response.data.data.swiperList;
						this.length = swiperList.length;
						this.stepList = swiperList.map((item) => {
							const startTime = this.parseTime(item.startTime);
							const closeTime = this.parseTime(item.closeTime);
							return {
								...item,
								startTime,
								closeTime
							};
						});
						this.name = response.data.data.name;
					},
					fail: (err) => {}
				});
			},
			
			//获取畅通路线信息
			getfluently() {
				uni.request({
					url: 'http://' + this.ip + '/recommendation/sortCrowingLevel',
					method: 'GET',
					success: (response) => {
						const swiperList = response.data.data.swiperList;
						this.length = swiperList.length;
						this.stepList = swiperList.map((item) => {
							const startTime = this.parseTime(item.startTime);
							const closeTime = this.parseTime(item.closeTime);
							return {
								...item,
								startTime,
								closeTime
							};
						});
						this.name = response.data.data.name;
					},
					fail: (err) => {}
				});
			},
			
			//处理时间数据格式
			parseTime(time) {
				const [hours, minutes, seconds] = time.split(':');
				return `${hours}:${minutes}`;
			},
			
			//跳转设施详情页
			goFacDetail(name, type) {
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + type
				});
			},
			
			// 根据等待时间范围返回对应的图标颜色
			getTextColor(expectWaitTime) {
				if (expectWaitTime <= 30) {
					return '#00aa00'; // 绿色
				} else if (expectWaitTime > 30 && expectWaitTime <= 60) {
					return '#ffa500'; // 橙色
				} else {
					return '#ff0000'; // 红色
				}
			},

		},
	}
</script>
<style lang="scss" scoped>
	page {}

	.swiper_box {
		width: 100%;
		height: 400rpx;
		text-align: center;
		font-size: 16px;
	}

	.swiper_image {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.name {
		bottom: 0;
		width: 100%;
		color: white;
		background-color: rgba(179, 206, 224, 0.7);
		position: absolute;
		z-index: 2;
	}

	.details_box {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50rpx;
		padding-top: 30rpx;

	}

	.route_title {
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10rpx;
		margin-top: 20rpx;
	}

	.exta {
		color: #8f9090;
		font-size: 16px;
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 10px;
	}

	.card {
		width: calc(50% - 10px);
		margin-bottom: 10px;
	}


	.item_title {
		padding-left: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-weight: 500;
	}

	.desc_box {
		border-radius: 30rpx;
		padding: 10rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
		box-shadow: 3px -2px 3px rgba(0, 0, 0, 0.1);

	}

	.item_row {
		width: 100%;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		font-size: 14px;
		color: #757575;
		//text-align:center;	
	}

	.wait_time {
		margin-top: 10rpx;

	}

	.item_img {
		width: 100%;
		height: 200rpx;
		object-fit: cover;
	}

	.time_text {
		padding-left: 10rpx;
	}

	.wait_time {
		padding-left: 10rpx;
	}

	.button {
		position: fixed;
		bottom: 50rpx;
		width: 250rpx;

	}
</style>