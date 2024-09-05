<!-- 开发者:陈金铭 -->

<template>
	<view class="box">
		<!-- 顶部轮播图 -->
		<swiper class="header_img" autoplay circular :interval="2500">
			<swiper-item v-for="(image, i) in item.imageUrls" :key="i">
				<image class="swiper_image" :src="image" mode="aspectFill" />
			</swiper-item>
		</swiper>
		<!-- 设施文字信息 -->
		<view class="details_box">
			<view class="title">
				{{item.name}}
			</view>
			<view class="item_row">
				<view class="intro_text">
					{{item.introduction}}
				</view>
			</view>
			<view class="wait">
				<u-icon name="man-add" :color="getTextColor(item.waitTime)" size="28"></u-icon>
				<view class="wait_text">
					等待时间:
					<view :style="{ color: getTextColor(item.waitTime) }">{{item.waitTime}}</view>
					分钟
				</view>
			</view>

			<view class="item_row">
				<view class="item_title">
					今日开放时间:
				</view>
				<view class="item_text">
					{{item.startTime}}-{{item.endTime}}
				</view>
			</view>
			<!-- 餐饮设施展示信息 -->
			<template v-if="type === 'catering'">
				<view class="item_row">
					<view class="item_title">
						餐饮类型
					</view>
					<view class="item_text">
						{{item.type}}
					</view>
				</view>
			</template>
			<!-- 游乐设施展示信息 -->
			<template v-if="type === 'amusement'">
				<view class="item_row">
					<view class="item_title">
						项目类型
					</view>
					<view class="item_text">
						{{item.type}}
					</view>
				</view>
				<view class="item_row">
					<view class="item_title">
						适合人群
					</view>
					<view class="item_text">
						{{item.crowdType}}
					</view>
				</view>
				<view class="item_row">
					<view class="item_title">
						身高限制
					</view>
					<view class="item_text">
						{{item.heightLow}} - {{item.heightUp}}cm
					</view>
				</view>
				<view class="item_row">
					<view class="item_title">
						游玩须知
					</view>
					<view class="item_text">
						{{item.instruction}}
					</view>
				</view>
			</template>
			<!-- 底部打卡与地图显示区 -->
			<view class="operate">
				<view class="mark" @click="changeMark">
					<view class="item_icon">
						<u-icon name="checkmark-circle" :color="getMarkColor(isVisited)" size="60"></u-icon>
					</view>
					<view class="item_name" :style="{ color: getMarkColor(isVisited) }">
						一键打卡
					</view>
				</view>
				<view class="map" @click="goMap">
					<view class="item_icon">
						<u-icon name="map" color="#55aaff" size="60"></u-icon>
					</view>
					<view class="item_name">
						地图显示
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
				item: {}, //设施信息
				type: "", //设施类型
				userId: '', //用户id
				isVisited: '', //是否打卡
				visitId: '', //打卡记录id
				facility: {}, //打卡需要的设施数据
			};
		},

		onLoad: function(e) {
			this.ip = getApp().globalData.ip;
			const userMessage = uni.getStorageSync('user');
			this.userId = userMessage.id;
			this.type = e.type;

			//不同类型设施调用不同方法
			if (this.type == "amusement") {
				this.getAmusementData(e.name);
			} else if (this.type == "catering") {
				this.getCateringtData(e.name);
			} else if (this.type == "base") {
				this.getBaseData(e.name);
			}

		}, 

		methods: {
			//获得游乐设施信息
			getAmusementData(name) {
				uni.request({
					url: 'http://' + this.ip + '/filter/amusement',
					method: 'POST',
					data: {
						name: name,
						userId: this.userId,
					},
					success: (res) => {
						if (res.data.code * 1 == 200) {
							const responseData = res.data.data[0]; // 获取到data数组中的第一个对象
							this.item = {
								name: responseData.name,
								id: responseData.id,
								facilityType: responseData.facilityType,
								imageUrls: responseData.imageUrls,
								introduction: responseData.introduction,
								startTime: this.parseTime(responseData.startTime),
								endTime: this.parseTime(responseData.closeTime),
								type: responseData.type,
								crowdType: responseData.crowdType,
								heightLow: responseData.heightLow,
								heightUp: responseData.heightUp,
								instruction: responseData.instruction,
								waitTime: responseData.expectWaitTime,
								longitude: responseData.longitude,
								latitude: responseData.latitude,
							};
							this.isVisited = responseData.isVisited;
							this.visitId = responseData.visitId;
						}
					}
				});
			},

			//获得美食设施信息
			getCateringtData(name) {
				uni.request({
					url: 'http://' + this.ip + '/filter/restaurant',
					method: 'POST',
					data: {
						name: name,
						userId: this.userId,
					},
					success: (res) => {
						if (res.data.code * 1 == 200) {
							const responseData = res.data.data[0];
							this.item = {
								id: responseData.id,
								name: responseData.name,
								longitude: responseData.longitude,
								latitude: responseData.latitude,
								facilityType: responseData.facilityType,
								imageUrls: responseData.imageUrls,
								introduction: responseData.introduction,
								startTime: this.parseTime(responseData.startTime),
								endTime: this.parseTime(responseData.closeTime),
								type: responseData.type,
								waitTime: responseData.expectWaitTime,
							};
							this.isVisited = responseData.isVisited;
							this.visitId = responseData.visitId;
						}
					}
				});
			},

			//获得基础设施信息
			getBaseData(name) {
				uni.request({
					url: 'http://' + this.ip + '/filter/base',
					method: 'POST',
					data: {
						userId: this.userId,
						name: name,
					},
					success: (res) => {
						if (res.data.code * 1 == 200) {
							const responseData = res.data.data[0];
							this.item = {
								id: responseData.id,
								name: responseData.name,
								longitude: responseData.longitude,
								latitude: responseData.latitude,
								facilityType: responseData.facilityType,
								imageUrls: responseData.imageUrls,
								startTime: this.parseTime(responseData.startTime),
								endTime: this.parseTime(responseData.closeTime),
								waitTime: responseData.expectWaitTime,
							};
							this.isVisited = responseData.isVisited;
							this.visitId = responseData.visitId;
						}
					},

				});
			},

			// 根据等待时间范围返回对应的颜色
			getTextColor(waitTime) {
				if (waitTime <= 30) {
					return '#00aa00'; // 绿色
				} else if (waitTime > 30 && waitTime <= 60) {
					return '#ffa500'; // 橙色
				} else {
					return '#ff0000'; // 红色
				}
			},

			//根据是否打卡返回对应颜色
			getMarkColor(isVisited) {
				if (isVisited === 0) {
					return '#55aaff';
				} else if (isVisited === 1) {
					return '#ffa500'; // 橙色
				}
			},

			//处理时间数据格式
			parseTime(time) {
				const [hours, minutes, seconds] = time.split(':');
				return `${hours}:${minutes}`;
			},

			//根据是否打卡,改变打卡状态
			changeMark() {
				var self = this; // 保存 this 的引用
				if (this.isVisited === 0) {
					this.mark();
				} else if (this.isVisited === 1) {
					uni.showModal({
						title: '提示',
						content: '是否取消打卡',
						success: function(res) {
							if (res.confirm) {
								self.cancelMark(); // 使用保存的变量调用 cancelMark() 函数
							} else if (res.cancel) {}
						}
					});
				}
			},

			//增加打卡
			mark() {
				uni.request({
					url: 'http://' + this.ip + '/visit/add',
					method: "POST",
					data: {
						userId: this.userId,
						facility: {
							facilityId: this.item.id,
							facilityType: this.item.facilityType,
						}
					},
					success: (response) => {
						if (response.data.code * 1 == 200) {
							this.isVisited = 1;
							this.visitId = response.data.data.id;
							this.$u.toast("恭喜您打卡成功") // 提示框
						} else if (response.data.code * 1 == 40000) {
							const message = response.data.message
							this.$u.toast(message) // 提示框
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			},

			//取消打卡
			cancelMark() {
				uni.request({
					url: 'http://' + this.ip + '/visit/delete',
					method: "POST",
					data: {
						id: this.visitId,
					},
					success: (response) => {
						if (response.data.code * 1 == 200) {
							const cancel = response.data.data;
							if (cancel === true) {
								this.$u.toast("您已取消打卡") // 提示框
								this.isVisited = 0;
							} else if (false) {
								//弹出失败
								this.$u.toast("取消失败") // 提示框
							}
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			},

			//跳转地图显示设施
			goMap() {
				this.facility.id = this.item.id
				this.facility.name = this.item.name
				this.facility.longitude = this.item.longitude
				this.facility.latitude = this.item.latitude
				this.facility.waitTime = this.item.waitTime
				this.facility.startTime = this.item.startTime
				this.facility.endTime = this.item.endTime
				this.facility.imageurl = this.item.imageUrls[0]
				this.facility.facilityType = this.item.facilityType
				uni.setStorageSync('facility', this.facility);
				uni.switchTab({
					url: '/pages/map/map'
				});
			}
		},
	};
</script>

<style lang=scss>
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.details_box {
		background-color: white;
		margin-top: -50rpx;
		margin-bottom: 50rpx;
		padding-top: 30rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 2;
		border-radius: 70rpx;
	}

	.header_img {
		width: 100%;
		height: 400rpx;
	}

	.swiper_image {
		width: 100%;
	}

	.title {
		margin-top: 30rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50rpx;
		width: 300rpx;
		font-weight: 600;
		font-size: 18px;
	}


	.titleimg {
		padding: 0 20rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.intro_text {
		margin-top: 20rpx;
		width: 600rpx;
		text-indent: 2em;
		font-size: 14px;
	}

	.wait {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.wait_text {
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item_row {
		width: 80%;
		margin: 10rpx 0;
		padding: 18rpx 10rpx;
		border-radius: 50rpx;
	}

	.item_title {
		font-size: 14px;
		color: #717171;
		text-align: center;
	}

	.item_text {
		margin-top: 10rpx;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
	}

	.operate {
		margin-top: 30rpx;
		width: 600rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mark,
	.map {
		color: #55aaff;
		margin: auto;
		width: 25%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		//background-color: #aaffff;
	}
</style>