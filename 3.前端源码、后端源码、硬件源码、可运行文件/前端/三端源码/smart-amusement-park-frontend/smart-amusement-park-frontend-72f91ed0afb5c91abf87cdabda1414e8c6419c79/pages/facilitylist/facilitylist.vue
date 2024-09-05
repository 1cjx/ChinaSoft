<!-- 开发者:池跃花 -->
<!-- 订阅功能开发者:陈金铭 -->
<template>
	<view class="facility_list">
		<!-- 顶部图标栏 -->
		<view class="top_icons" v-if="!isSearching">
			<view class="top_icon" @click="toggleSearch()">
				<image class="icon" src="/static/facilitylist/search.png" />
				<text class="icon-name">搜索</text>
			</view>
			<view class="top_icon" @click="getAmusementData()">
				<image class="icon"
					:src="selectedFacilityType=='amusement' ? '/static/facilitylist/rides_selected.png' : '/static/facilitylist/rides.png'" />
				<text class="icon-name">游乐设施</text>
			</view>
			<view class="top_icon" @click="getCateringData()">
				<image class="icon"
					:src="selectedFacilityType=='catering' ? '/static/facilitylist/catering_selected.png' : '/static/facilitylist/catering.png'" />
				<text class="icon-name">餐饮</text>
			</view>
			<view class="top_icon" @click="getBaseData()">
				<image class="icon"
					:src="selectedFacilityType=='base' ? '/static/facilitylist/washroom_selected.png' : '/static/facilitylist/washroom.png'" />
				<text class="icon-name">卫生间</text>
			</view>
		</view>

		<!-- 搜索框 -->
		<view class="search_bar" v-if="isSearching">
			<input type="text" class="search-input" v-model="keyword" @input="search()" placeholder="搜索" />
			<text class="cancel-text" @click="toggleSearch">取消</text>
		</view>

		<!-- 设施列表 -->
		<view class="facility_items">
			<image class="emptyicon" src="/static/icon/emptyicon.png" v-if="this.facilities.length == 0"
				mode="aspectFill"></image>
			<view class="facility_items">
				<view class="facility_item" v-for="(item, index) in facilities" :key="index"
					@click="gofacdetail(item.name, selectedFacilityType)">
					<image class="facility_image" :src="item.image" />
					<view class="facility_text">
						<text class="facility_name">{{ item.name }}</text>
					</view>
					<view class="subcribe_icon" @click.stop="changesubcribe(item)">
						<u-icon :name="updateIcon(item)" color="#ffdb49" size="80"></u-icon>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 条件筛选 -->
		<view class="filter" @click="showDrawer('showLeft')" v-if="selectedFacilityType!='base'">
			<image class="ficon" src="/static/map/filter.png"></image>
			<uni-drawer ref="showLeft" mode="left" :width="320">
				<view class="condition_title"><text>选择适合你的条件\n</text></view>
				<view class="conditions" v-if="selectedFacilityType === 'amusement'">
					<text class="condition">适合人群</text>
					<view class="options">
						<u-radio-group v-model="selectedCrowd">
							<u-radio v-for="(item, index) in crowd" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<text class="condition">项目类型</text>
					<view class="options">
						<u-radio-group v-model="selectedActivity">
							<u-radio v-for="(item, index) in activity" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<text class="condition">身高限制</text>
					<view class="height">
						<u-input type="text" placeholder="请输入您的身高" class="height_input" v-model="selectedHeight"
							@input="handleHeightInput">
						</u-input>
						<u-radio-group>
							<u-radio v-for="(item, index) in height" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="close">
						<u-button @click="confirmFilter('amusement')"><text class="word-btn-white">确认筛选</text>
						</u-button>
					</view>
				</view>
				<view class="conditions" v-else-if="selectedFacilityType === 'catering'">
					<text class="condition">餐饮类型</text>
					<view class="options">
						<u-radio-group v-model="selectedCater">
							<u-radio v-for="(item, index) in cater" :key="index" :name="item.name"
								:disabled="item.disabled">
								{{item.name}}
							</u-radio>
						</u-radio-group>
					</view>
					<view class="close">
						<u-button @click="confirmFilter('catering')"><text class="word-btn-white">确认筛选</text></u-button>
					</view>
				</view>
			</uni-drawer>
		</view>
	</view>
</template>
<script>
	import {
		debounce
	} from 'lodash';
	export default {
		data() {
			return {
				isSearching: false, // 控制搜索框是否显示  
				keyword: '',
				facilities: [],
				// 条件筛选所需数据
				selectedFacilityType: '',
				selectedCrowd: '',
				selectedActivity: '',
				selectedHeight: '',
				selectedCater: '',
				showLeft: false,
				crowd: [{
						name: '成人',
						disabled: false
					},
					{
						name: '老少皆宜',
						disabled: false
					},
					{
						name: '家长监护',
						disabled: false
					}
				],
				activity: [{
						name: '轨道',
						disabled: false
					},
					{
						name: '垂直',
						disabled: false
					},
					{
						name: '高空',
						disabled: false
					}, {
						name: '水上',
						disabled: false
					},
					{
						name: '室内',
						disabled: false
					},
					{
						name: '旋转',
						disabled: false
					},
					{
						name: '剧场',
						disabled: false
					},
					{
						name: '失重',
						disabled: false
					}, {
						name: '过山车',
						disabled: false
					},
					{
						name: '鬼屋',
						disabled: false
					}
				],
				cater: [{
						name: '中式快餐',
						disabled: false
					},
					{
						name: '西式快餐',
						disabled: false
					},
					{
						name: '面点',
						disabled: false
					},
					{
						name: '饮品',
						disabled: false
					},
					{
						name: '小吃',
						disabled: false
					}
				],
				height: [{
					name: '不限制',
					disabled: false
				}],
			};
		},
		
		onLoad() {
			this.ip = getApp().globalData.ip;
			const userMessage = uni.getStorageSync('user');
			this.userId = userMessage.id;
			this.getAmusementData();
		},
		
		methods: {
			/* *******************************顶部图标点击事件功能******************************* */
			toggleSearch() {
				this.isSearching = !this.isSearching;
				if (!this.isSearching) {
					this.searchKeyword = '';
					this.getAmusementData();
				}
			},
			
			search: debounce(function() {
				const keyword = this.keyword.trim();
				if (keyword === '') {
					this.getAmusementData(); // 或者重新加载其他默认数据
					return;
				}
				// 调用后端接口进行搜索
				uni.request({
					url: 'http://' + this.ip + '/search',
					method: 'GET',
					data: {
						keyword: keyword
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.facilities = responseData.map((facility) => ({
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
								facilityType: facility.facilityType,
								facilityId: facility.id,
								isSubscribed: facility.isSubscribed,
								subscribeId: facility.subscribeId
							}));
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			}, 500),
			
			getAmusementData() {
				this.selectedFacilityType = 'amusement';
				uni.request({
					url: 'http://' + this.ip + '/filter/amusement',
					method: 'POST',
					data: {
						userId: this.userId,
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.facilities = responseData.map((facility) => ({
								name: facility.name,
								image: facility.imageUrls[0],
								facilityType: facility.facilityType,
								facilityId: facility.id,
								isSubscribed: facility.isSubscribed,
								subscribeId: facility.subscribeId
							}));
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			},
			
			getCateringData() {
				this.selectedFacilityType = 'catering';
				uni.request({
					url: 'http://' + this.ip + '/filter/restaurant',
					method: 'POST',
					data: {
						userId: this.userId,
						id: null,
						name: '',
						type: '',
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.facilities = responseData.map((facility) => ({
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
								facilityType: facility.facilityType,
								facilityId: facility.id,
								isSubscribed: facility.isSubscribed,
								subscribeId: facility.subscribeId
							}));
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			},
			
			getBaseData() {
				this.selectedFacilityType = 'base';
				uni.request({
					url: 'http://' + this.ip + '/filter/base',
					method: 'POST',
					data: {
						id: null,
						userId: this.userId,
						name: ''
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.facilities = responseData.map((facility) => ({
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
								facilityType: facility.facilityType,
								facilityId: facility.id,
								isSubscribed: facility.isSubscribed,
								subscribeId: facility.subscribeId
							}));
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请求失败，请检查您的网络',
							icon: 'none'
						});
					}
				});
			},
			
			/* ************************************ 条件筛选 ************************************ */
			showDrawer(e) {
				this.$refs[e].open()
			},
			
			closeDrawer(e) {
				this.$refs[e].close()
			},
			
			confirmFilter(type) {
				let requestData = {}; // 存放请求数据
				this.closeDrawer('showLeft'); // 关闭抽屉
				if (type === 'amusement') {
					// 构建请求数据
					requestData = {
						userId: this.userId,
						type: this.selectedActivity,
						crowd: this.selectedCrowd,
						height: this.selectedHeight,
						cater: this.selectedCater,
					};
					// 向后端发送请求
					uni.request({
						url: 'http://' + this.ip + '/filter/amusement',
						method: 'POST',
						data: requestData,
						success: (res) => {
							if (res.data.code * 1 === 200) {
								// 更新设施列表
								this.facilities = res.data.data.map((facility) => ({
									name: facility.name,
									image: facility.imageUrls[0], // 取第一个图片作为设施图片
									facilityType: facility.facilityType,
									facilityId: facility.id,
									isSubscribed: facility.isSubscribed,
									subscribeId: facility.subscribeId
								}));
							}

						},
						fail: (err) => {
							uni.showToast({
								title: '请求失败，请检查您的网络',
								icon: 'none'
							});
						}
					});
				} else if (type === 'catering') {
					requestData = {
						userId: this.userId,
						id: null,
						name: '',
						type: this.selectedCater,
					};
					// 向后端发送请求
					uni.request({
						url: 'http://' + this.ip + '/filter/restaurant',
						method: 'POST',
						data: requestData,
						success: (res) => {
							if (res.data.code * 1 === 200) {
								this.facilities = res.data.data.map((facility) => ({
									name: facility.name,
									image: facility.imageUrls[0], // 取第一个图片作为设施图片
									facilityType: facility.facilityType,
									facilityId: facility.id,
									isSubscribed: facility.isSubscribed,
									subscribeId: facility.subscribeId,
								}));
							}

						},
						fail: (err) => {
							uni.showToast({
								title: '请求失败，请检查您的网络',
								icon: 'none'
							});
						}
					});
				}
			},
			
			// 控制输入身高和不限制互斥
			handleHeightInput: debounce(function() {
				if (this.selectedHeight !== '') {
					// 如果输入的身高不为空，则禁用限制身高选项
					this.height = [{
						name: '不限制',
						disabled: true
					}]
				} else {
					// 如果输入的身高为空，则启用限制身高选项
					this.height = [{
						name: '不限制',
						disabled: false
					}]
				}
			}, 500),

			/* ****************************************设施列表**************************************** */
			// 跳转到设施详情
			gofacdetail(name, type) {
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + type
				});
			},
			
			// 订阅
			updateIcon(item) {
				if (item.isSubscribed === 0) {
					return 'star';
				} else if (item.isSubscribed === 1) {
					return 'star-fill';
				}
			},
			
			subcribe(facilityId, facilityType) {
				uni.request({
					url: 'http://' + this.ip + '/subscribe/add',
					method: "POST",
					data: {
						userId: this.userId,
						facility: {
							facilityId: facilityId,
							facilityType: facilityType,
						}
					},
					success: (response) => {
						if (response.data.code * 1 === 200) {
							this.$u.toast("订阅成功,可至个人中心-我的订阅查看"); // 提示框
							this.facilities.forEach((facility) => {
								if (facility.facilityId === facilityId) {
									facility.isSubscribed = 1;
									facility.subscribeId = response.data.data.id;
								}
							});
						} else if (response.data.code * 1 === 4000) {
							this.$u.toast(response.data.message);
						} else {
							this.$u.toast("订阅失败");
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

			cancelsubcribe(subscribeId, facilityId) {
				uni.request({
					url: 'http://' + this.ip + '/subscribe/delete',
					method: "POST",
					data: {
						id: subscribeId,
					},
					success: (response) => {
						if (response.data.code * 1 === 200) {
							const cancel = response.data.data;
							if (cancel === true) {
								this.$u.toast("您已取消订阅"); // 提示框
								this.facilities.forEach((facility) => {
									if (facility.facilityId === facilityId) {
										facility.isSubscribed = 0;
										facility.subscribeId = null;
									}
								});
							} else if (cancel === false) {
								this.$u.toast("取消失败"); // 提示框
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

			changesubcribe(item) {
				if (item.isSubscribed === 0) {
					this.subcribe(item.facilityId, item.facilityType);
				} else if (item.isSubscribed === 1) {
					this.cancelsubcribe(item.subscribeId, item.facilityId);
				}
			}
			
		}
	};
</script>

<style>
	.facility_list {
		height: 100%;
	}

	.top_icons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #f8f8f8;
		position: fixed;
		top: 40px;
		width: 100%;
		z-index: 1000;
	}

	.top_icon {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		margin: 0 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}

	.icon {
		width: 30px;
		height: 30px;
		padding-top: 5px;
	}

	.icon-name {
		font-size: 15px;
	}

	.search_bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		background-color: #f8f8f8;
		position: fixed;
		top: 40px;
		width: 100%;
		z-index: 1000;
	}

	.search-input {
		flex: 1;
		/* 占据剩余空间 */
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
	}

	.cancel-text {
		cursor: pointer;
		/* 显示点击效果 */
		font-size: 14px;
		color: #007aff;
		/* 文本颜色 */
		margin-left: 20px;
	}

	.emptyicon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 45% auto;
	}

	.facility_items {
		/* margin-top: 10px; */
		margin-top: 30px;
		padding: 8px;
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
		margin-right: 10px;
	}

	.facility_text {
		display: flex;
		flex-direction: column;

	}

	.facility_name {
		font-size: 15px;
		margin-left: 15px;
		font-weight: bold;
	}

	.subcribe_icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 0;
		margin-right: 20rpx;
	}

	.facility_open_time {
		padding-top: 8px;
		font-size: 14px;
		color: #666;
	}

	.filter {
		position: fixed;
		top: 80%;
		right: 20px;
		height: 130px;
		width: 50px;
		height: 50px;
		cursor: pointer;
		margin: 5px 0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	}

	.ficon {
		width: 80%;
		height: 80%;
		cursor: pointer;
	}

	.scroll-view {
		width: 100%;
		height: 100%;
		flex: 1
	}

	/* 处理抽屉内容滚动 */
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}

	.conditions {
		padding: 15px;
	}

	.condition_title {
		margin-top: 80px;
		padding: 0 15px;
		font-size: 20px;
		/* background-color: burlywood; */
	}

	.condition {
		font-size: 16px;
	}

	.options {
		margin: 15px auto;
		padding-left: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.height {
		margin: 15px auto;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.height_input {
		flex: 1;
		margin-right: 10px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.height_button {
		flex-shrink: 0;
		margin-right: 20%;
		/* 防止按钮被压缩 */
	}

	.close {
		margin-top: 10%;
		padding: 0 5px;
	}
</style>
