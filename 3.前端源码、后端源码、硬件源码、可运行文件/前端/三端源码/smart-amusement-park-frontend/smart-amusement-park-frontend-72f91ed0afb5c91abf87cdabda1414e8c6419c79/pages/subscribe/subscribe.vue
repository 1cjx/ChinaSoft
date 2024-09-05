<!-- 开发者:陈金铭 -->

<template>
	<view class="facility_list">
		<!-- 已订阅列表 -->
		<view class="facility_items">
			<!-- 上方提示条 -->
			<view class="title_box">
				<view class="title_sub">已订阅</view>
				<view class="mark_box">
					<view class="title_mark">只看未打卡</view>
					<view class="switch_mark">
						<switch check @change="switch1Change" style="transform:scale(0.7)" />
					</view>
				</view>
			</view>
			<!-- 下方展示区 -->
			<view class="facility_item" v-for="(item, index) in subscribed" :key="index" v-model="value1"
				v-if="!value1 || item.isVisited === 0" @click="goFacDetail(item.name,item.facilityType)">
				<image class="facility_image" :src="item.imageUrl" />
				<view class="facility_text">
					<text class="facility_name">{{ item.name }}</text>
				</view>
				<view class="wait">
					<u-icon name="man-add" :color="getTextColor(item.expectWaitTime)" size="40"></u-icon>
					<view class="waittext">
						等待时间:
						<view :style="{ color: getTextColor(item.expectWaitTime) }">{{item.expectWaitTime}}</view>
						分钟
					</view>
				</view>
			</view>
			<!-- 空列表展示图片 -->
			<image class="empty_icon" src="/static/icon/emptyicon.png"
				v-if="lengthSub === 0 || (lengthUnmark1 == 0 &&value1)" mode="aspectFill"></image>
		</view>
		<!-- 未订阅列表 -->
		<view class="facility_items">
			<!-- 上方提示条 -->
			<view class="title_box">
				<view class="title_sub">推荐订阅</view>
				<view class="mark_box">
					<view class="title_mark">只看未打卡</view>
					<view class="switch_mark">
						<switch check @change="switch2Change" style="transform:scale(0.7)" />
					</view>
				</view>
			</view>
			<!-- 下方展示区 -->
			<view class="facility_item" v-for="(item, index) in unSubscribed" :key="index" v-model="value2"
				v-if="!value2 || item.isVisited === 0" @click="goFacDetail(item.name,item.facilityType)">
				<image class="facility_image" :src="item.imageUrl" />
				<view class="facility_text">
					<text class="facility_name">{{ item.name }}</text>
				</view>
				<view class="wait">
					<u-icon name="man-add" :color="getTextColor(item.expectWaitTime)" size="40"></u-icon>
					<view class="waittext">
						等待时间:
						<view :style="{ color: getTextColor(item.expectWaitTime) }">{{item.expectWaitTime}}</view>
						分钟
					</view>
				</view>
			</view>
			<!-- 空列表展示图片 -->
			<image class="empty_icon" src="/static/icon/empty_icon.png"
				v-if="lengthUnsub === 0 || (lengthUnmark2 == 0 && value2)" mode="aspectFill"></image>
		</view>
	</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				subscribed: [], //已订阅列表
				unSubscribed: [], //未订阅列表
				value1: false, //switch1的值
				value2: false, //switch2的值
				userId: '', //用户id
				lengthSub: '', //已订阅列表长度
				lengthUnsub: '', //未订阅列表长度
				lengthUnmark1: '', //已订阅未打卡列表长度
				lengthUnmark2: '', //未订阅未打卡列表长度
			}
		},

		onLoad() {
			this.ip = getApp().globalData.ip;
			const user = uni.getStorageSync('user');
			this.userId = user.id;
		},

		onShow() {
			this.getSubscribed();
		},
		methods: {
			//获得已订阅和未订阅列表
			getSubscribed() {
				this.subscribed = [],
					this.unSubscribed = [],
					this.lengthUnmark1 = '0',
					this.lengthUnmark2 = '0',
					uni.request({
						url: 'http://' + this.ip + '/getAllVisitAndSubscribe',
						method: 'POST',
						data: {
							userId: this.userId,
						},
						success: (res) => {
							if (res.data.code * 1 == 200) {
								const {
									data: Facilities
								} = res.data;
								Facilities.forEach(Facility => {
									//根据是否已订阅将数据放入不同列表
									if (Facility.isSubscribed === 1) {
										const facility = {
											name: Facility.name,
											isVisited: Facility.isVisited,
											imageUrl: Facility.imageUrls[0],
											facilityType: Facility.facilityType,
											isSubscribed: Facility.isSubscribed,
											expectWaitTime: Facility.expectWaitTime
										};
										//统计已订阅未打卡列表长度
										if (Facility.isVisited === 0) {
											this.lengthUnmark1++;
										}
										this.subscribed.push(facility);
									} else if (Facility.isSubscribed === 0) {
										const facility = {
											name: Facility.name,
											isVisited: Facility.isVisited,
											imageUrl: Facility.imageUrls[0],
											facilityType: Facility.facilityType,
											isSubscribed: Facility.isSubscribed,
											expectWaitTime: Facility.expectWaitTime
										};
										//统计未订阅未打卡列表长度
										if (Facility.isVisited === 0) {
											this.lengthUnmark2++;
										}
										this.unSubscribed.push(facility);
									}
								});
								this.lengthSub = this.subscribed.length; //已订阅列表长度
								this.lengthUnsub = this.unSubscribed.length; //未订阅列表长度
							}
						},
						fail: (err) => {}
					});

			},

			//跳转设施详情页
			goFacDetail(name, facilityType) {
				let selectedFacilityType = "";
				if (facilityType === 0) {
					selectedFacilityType = "amusement"
				} else if (facilityType === 1) {
					selectedFacilityType = "catering"
				} else if (facilityType === 2) {
					selectedFacilityType = "base"
				}
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + selectedFacilityType
				});
			},

			//获取switch状态
			switch1Change: function(e) {
				this.value1 = e.detail.value
			},

			switch2Change: function(e) {
				this.value2 = e.detail.value
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
	};
</script>

<style lang="scss">
	.title_box {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.title_sub {
		line-height: 100rpx;
		margin-left: 20rpx;
		font-size: 18px;
	}

	.mark_box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 14px;
	}

	.facility_items {
		padding: 10px;
	}

	.facility_item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
		position: relative;
	}

	.facility_image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}

	.facility_text {
		display: flex;
		flex-direction: column;
	}

	.facility_name {
		font-size: 15px;
		margin-left: 15px;
	}

	.wait {
		position: absolute;
		right: 0;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
	}

	.waittext {
		font-size: 14px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.empty_icon {
		background-color: #f7f7f7;
		height: 400rpx;
		width: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}
</style>