<!-- 开发者:陈金铭 -->

<template>
	<view class="facility_items">
		<!-- 打卡列表 -->
		<view class="facility_item" v-for="(item, index) in markRecords" :key="index"
			@click="gofacdetail(item.name,item.facilityType)">
			<image class="facility_image" :src="item.imageUrl" />
			<view class="facility_text">
				<text class="facility_name">{{ item.name }}</text>
			</view>
			<view class="time_text">打卡时间: {{item.visitTime}}</view>
		</view>
		<image class="empty_icon" src="/static/icon/emptyicon.png" v-if="recordLength=== 0" mode="aspectFill"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				markRecords: [], //打卡信息列表
				userId: '', //用户id
				recordLength :'', //打卡列表长度
			}
		},

		onLoad() {
			this.ip = getApp().globalData.ip; //获取ip
			const userMessage = uni.getStorageSync('user'); //获取用户id
			this.userId = userMessage.id;

		},
		onShow() {
			//获取打卡记录
			this.getMarkRecords();
		},
		methods: {
			//获取打卡记录
			getMarkRecords() {
				this.markRecords = [],
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
									if (Facility.isVisited === 1) {
										const records = {
											name: Facility.name,
											facilityType: Facility.facilityType,
											isVisited: Facility.isVisited,
											imageUrl: Facility.imageUrls[0],
											visitTime: Facility.visitTime
										};
										this.markRecords.push(records);
									}
								});
								this.recordLength= this.markRecords.length;
							}
						},
						fail: (err) => {}
					});
			},
			//跳转详情页
			gofacdetail(name, facilityType) {
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
		},

	};
</script>

<style lang="scss">
	.facility_items {
		padding-top: 10px;
		padding: 10px;
	}

	.facility_item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
		background-color: #fff;
		border-radius: 20px;
		overflow: hidden;
		position: relative;
	}

	.facility_image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.facility_text {
		display: flex;
		flex-direction: column;
	}

	.facility_name {
		font-size: 16px;
		margin-left: 15px;
		font-weight: bold;
	}

	.time_text {
		font-size: 14px;
		position: absolute;
		right: 0;
		margin: 10rpx;
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