<!-- 开发者:池跃花 -->
<template>
	<view class="content">
		<!-- 顶部图标栏 -->
		<view class="top_icons" v-if="!isSearching">
			<view class="top_icon" @click="toggleSearch()">
				<image class="ticon" src="/static/facilitylist/search.png" />
				<text class="icon-name">搜索</text>
			</view>
			<view class="top_icon" @click="getAmusementData()">
				<image class="ticon"
					:src="selectedFacilityType=='amusement' ? '/static/facilitylist/rides_selected.png' : '/static/facilitylist/rides.png'" />
				<text class="icon-name">游乐设施</text>
			</view>
			<view class="top_icon" @click="getCateringData()">
				<image class="ticon"
					:src="selectedFacilityType=='catering' ? '/static/facilitylist/catering_selected.png' : '/static/facilitylist/catering.png'" />
				<text class="icon-name">餐饮</text>
			</view>
			<view class="top_icon" @click="getBaseData()">
				<image class="ticon"
					:src="selectedFacilityType=='base' ? '/static/facilitylist/washroom_selected.png' : '/static/facilitylist/washroom.png'" />
				<text class="icon-name">卫生间</text>
			</view>
		</view>

		<!-- 搜索框 -->
		<view class="search_bar" v-if="isSearching">
			<input type="text" class="search-input" v-model="keyword" @input="search()" placeholder="搜索" />
			<text class="cancel-text" @click="toggleSearch">取消</text>
		</view>

		<!-- 地图 -->
		<view class="map">
			<map id="map" style="width: 100%; height: 86vh;" :show-location='true' :latitude="latitude"
				:longitude="longitude" :markers="tempMarkers" :scale="scale" @markertap="markertap"
				@regionchange="scaleChange()" :polyline="polyline">
			</map>
		</view>

		<!-- 右侧图标 -->
		<view class="right_icon_container">
			<view class="right_icon">
				<image class="ricon" src="/static/map/locate.png" @click="locate()"></image>
			</view>
			<view class="right_icon">
				<image class="ricon" src="/static/map/list.png" @click="facilityList()"></image>
			</view>
			<!-- 条件筛选 -->
			<view class="right_icon" v-if="selectedFacilityType!='base'">
				<image class="ricon" src="/static/map/filter.png" @click="showDrawer('showLeft')">
				</image>
				<uni-drawer ref="showLeft" mode="left" :width="320">
					<view class="condition_title"><text>选择适合你的条件\n</text></view>
					<!-- 根据选中的头部图标（设施类型）不同展示不同的是筛选条件 -->
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
							<u-button @click="confirmFilter('catering')"><text class="word-btn-white">确认筛选</text>
							</u-button>
						</view>
					</view>
				</uni-drawer>
			</view>
		</view>

		<!-- 推荐路线图标 -->
		<view class="bottom_icon">
			<image class="icon2" src="/static/map/recommendroute.png" @click="recommend()"></image>
		</view>

		<!-- 底部弹窗 -->
		<!-- 显示智能规划的路线 -->
		<view v-if="showRecommendTarget" class="popup">
			<view class="content">
				<view class="line1">
					<view>目标路线</view>
				</view>
				<view class="line2">
					<view>预计行走时间：{{expectWalkTime}}分钟</view>
					<view>预计排队等待时长：{{totalWaitTime}}分钟</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn_position">
					<u-button class="goback" @click="gobackrecommend">返回路线</u-button>
					<u-button class="guide" @click="guide1">立即导航</u-button>
				</view>
			</view>
		</view>

		<!-- 显示目标路线（推荐路线）-->
		<view v-if="showTarget" class="popup">
			<view class="content">
				<view class="line1">
					<view>目标路线</view>
				</view>
				<view class="line2">
					<view>预计行走时间：{{expectWalkTime}}分钟</view>
					<view>预计排队等待时长：{{totalWaitTime}}分钟</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn_position">
					<u-button class="goback" @click="goback">返回筛选</u-button>
					<u-button class="guide" @click="guide1">立即导航</u-button>
				</view>
			</view>
		</view>

		<!-- 显示预计到达时间（多个设施导航） -->
		<view v-if="showTime" class="popup">
			<view class="content">
				<view class="line3">
					<view>总行走距离：{{expectWalkDistance}}米</view>
				</view>
				<view class="line4">
					<view>预计行走时间：{{expectWalkTime}}分钟</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn_position">
					<u-button class="exit" @click="exit">退出</u-button>
				</view>
			</view>
		</view>

		<!-- 显示单个设施信息 -->
		<view v-if="showFacility" class="popup">
			<view class="facility_item" @click="gofacdetail(selectFacility.name, selectedFacilityType)">
				<image class="facility_image" :src="selectFacility.image" />
				<view>
					<view class="line1">{{ selectFacility.name }}</view>
					<view class="line2">开放时间: {{selectFacility.startTime}}~{{selectFacility.closeTime}}</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn_position">
					<u-button class="goback" @click="cancel">取消</u-button>
					<u-button class="guide" @click="guide2()">立即导航</u-button>
				</view>
			</view>
		</view>

		<!-- 单个设施导航 -->
		<view v-if="showSingle" class="popup">
			<view class="content">
				<view class="line3">
					<view>{{expectWalkDistance}}米 预计{{expectWalkTime}}分钟到达</view>
				</view>
				<view class="line4">
					<view>{{expectArriveTime}}到达</view>
				</view>
			</view>
			<view class="btn-group">
				<view class="btn_position">
					<u-button class="exit" @click="exit">退出</u-button>
				</view>
			</view>
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
				keyword: '', //搜索关键词
				selectedFacilityType: 'amusement', //选中顶部图标类型
				/* 底部弹窗显示 */
				showSingle: false,
				showTarget: false,
				showRecommendTarget: false,
				showTime: false,
				showFacility: false,
				isSearching: false,
				/* 底部弹窗需要的数据 */
				optimalPathData: '',
				expectWalkTime: 0,
				totalWaitTime: 0,
				expectWalkDistance: 0,
				facilityId: 0, //单个设施
				facilityType: 0,
				expectArriveTime: '',
				selectFacility: {
					name: '',
					image: '',
					startTime: '',
					closeTime: '',
				},
				/* 地图中标记点和路线需要的数据 */
				markers: [],
				tempMarkers: [],
				latitude: 29.667259,
				longitude: 106.516357,
				scale: 15.75, //初始化缩放级别
				zoomLevelOne: 15.75, //[16-18)一级显示点和当前等待时间
				zoomLevelTow: 18, //[18-20] 二级显示点、当前等待时间、以及设施名称；处于当前级别点击缩放到20，同时显示详情
				zoomLevelThird: 20,
				zoom: 16,
				polyline: [{
					points: [],
					color: "#00aaff", //线的颜色
					width: 5, //线的宽度
					dottedLine: true, //是否虚线
				}],
				// 园区的经纬度范围  
				minLatitude: 29.664182547364334,
				maxLatitude: 29.673709922412733,
				minLongitude: 106.51199572814178,
				maxLongitude: 106.52232223284912,
				facilityIcons: {
					0: '/static/map/position.png', // 设施类别为0的图标路径
					1: '/static/map/cater_position.png', // 设施类别为1的图标路径
					2: '/static/map/washroom_position.png' // 设施类别为2的图标路径
				},
				/* 条件筛选需要的数据 */
				showLeft: false, //抽屉显示
				selectedCrowd: '',
				selectedActivity: '',
				selectedHeight: '',
				selectedCater: '',
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
					},
					{
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
					},
					{
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
				}]
			}
		},

		onLoad(query) {
			this.ip = getApp().globalData.ip;
			this.mapContext = uni.createMapContext("map", this); //用于监听地图缩放层级
		},

		onShow() {
			this.reset()
			let facilities = uni.getStorageSync('facilities');
			let optimalPathData = uni.getStorageSync('optimalPathData');
			let facility = uni.getStorageSync('facility')
			if (facilities != '') { //是从推荐路线跳转过来的
				this.receiveRecommend();
			} else if (optimalPathData != '') { //是从智能规划路线跳转过来的
				this.receiveBest();
			} else if (facility != '') { //是从设施详情跳转过来的
				this.receiveDetail();
			} else {
				this.getAmusementData()
			}
		},

		watch: { //监听层级
			zoom(newVal, oldVal) {
				let i = this.zoomLevelOne,
					j = this.zoomLevelTow;
				//放大
				if (oldVal < i && newVal >= i && newVal < j) { //放大从小于第一级的变到第一级，显示当前的等待时间信息
					// 确保在处理 tempMarkers 时不会意外地修改到 this.markers
					let temp = JSON.parse(JSON.stringify(this.markers)) //深拷贝
					this.tempMarkers = [];
					const that = this;
					setTimeout(function() {
						that.tempMarkers = temp
					}, 1); //滞空，先清空一下
				} else if (oldVal >= i && oldVal < j && newVal >= j) { //放大从一到二,显示等待时间和设施名称
					if (!(this.showTarget || this.showTime || this.showSingle || this.showRecommendTarget || this
							.showFacility)) {
						let temp = JSON.parse(JSON.stringify(this.markers));
						temp.forEach(o => {
							o.callout.content = '<strong>' + o.name + '</strong>' + '\n' +
								'<strong style="color:' + (o
									.expectWaitTime > 30 ? (o.expectWaitTime > 60 ? 'rgb(253,70,37)' :
										'rgb(250,187,86)') : 'green') +
								'">' + String(o.expectWaitTime) + '</strong>' + "分钟";
						})
						const that = this;
						this.tempMarkers = [];
						setTimeout(function() {
							that.tempMarkers = temp;
						}, 1);
					}
				}
				//缩小
				else if (oldVal >= j && newVal >= i && newVal < j) { //缩小从二到一，显示变少
					let temp = JSON.parse(JSON.stringify(this.markers))
					this.tempMarkers = [];
					const that = this;
					setTimeout(function() {
						that.tempMarkers = temp
					}, 1);
				} else if (oldVal >= i && oldVal < j && newVal < i) { //缩小从一到小于一级,不显示
					if (!(this.showTarget || this.showTime || this.showSingle || this.showRecommendTarget)) {
						this.tempMarkers = [];
					}
				} else if (newVal < i) {
					if (!(this.showTarget || this.showTime || this.showSingle || this.showRecommendTarget)) {
						this.tempMarkers = [];
					}
				}
			}
		},

		methods: {
			/* *****************************接收来自其他页面的数据，并处理展示***************************** */
			// 接收来自推荐路线的数据，并在地图上展示、导航
			receiveRecommend() {
				let facilities = uni.getStorageSync('facilities');
				let locations = uni.getStorageSync('locations');
				let routes = uni.getStorageSync('routes');
				this.routes = routes
				uni.removeStorageSync('facilities')
				let userLatitude = 29.667263,
					userLongitude = 106.513215
				uni.getLocation({
					type: 'wgs84',
					isHighAccuracy: true,
					success: (res) => {
						if (res.latitude < this.minLatitude || res.latitude > this.maxLatitude || res
							.longitude < this.minLongitude || res.longitude > this.maxLongitude
						) { //用户不在服务区，固定位置
							this.$u.toast('当前用户不在服务区，已移到服务区门口')
							userLatitude = 29.667263
							userLongitude = 106.513215
						} else {
							userLatitude = res.latitude;
							userLongitude = res.longitude;
						}
						uni.request({
							url: 'http://' + this.ip + '/map/mulFacilityNav',
							method: 'POST',
							data: {
								userLatitude,
								userLongitude,
								facilities
							},
							success: (res) => {
								if (res.data.code * 1 === 200) {
									this.expectWalkTime = res.data.data.expectWalkTime,
										this.totalWaitTime = res.data.data.totalWaitTime,
										this.expectWalkDistance = res.data.data.expectWalkDistance,
										this.polyline = [{
											points: res.data.data.paths,
											color: "#00aaff",
											width: 3,
											dottedLine: true,
											borderWidth: 4
										}]
									this.markers = locations.map((facility, index) => ({
										id: facility.id,
										latitude: facility.latitude, //纬度
										longitude: facility.longitude, //经度
										iconPath: '/static/map/position.png', //显示的图标
										rotate: 0, // 旋转度数
										width: 30, //宽
										height: 35, //高
										alpha: 0.5, //透明度
										callout: { //自定义标记点上方的气泡窗口 点击有效
											content: '<strong>' + (index + 1) +
												'</strong>' + '\n ' + facility
												.name, //文本
											// content: facility.name,
											color: '#000000', //文字颜色
											fontSize: 14, //文本大小
											borderRadius: 15, //边框圆角
											borderWidth: '10',
											bgColor: ' #ffffff', //背景颜色
											display: 'ALWAYS', //常显
										}
									}));
									const userMarker = {
										id: 'user',
										latitude: userLatitude,
										longitude: userLongitude,
										iconPath: '/static/map/current_position.png',
										width: 30,
										height: 35,
									};
									// 将用户位置标记添加到markers数组中
									this.markers.push(userMarker);
									this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
									this.showRecommendTarget = true;
									this.moveToPark();
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
				});
			},

			// 接收来自智能规划路线的数据，并在地图上展示、导航
			receiveBest() {
				this.reset()
				let optimalPathData = uni.getStorageSync('optimalPathData');
				uni.removeStorageSync('optimalPathData')
				/* 正门 106.513215,29.667263*/
				let userLatitude = 29.667263,
					userLongitude = 106.513215
				uni.getLocation({
					type: 'wgs84',
					isHighAccuracy: true,
					success: (res) => {
						if (res.latitude < this.minLatitude || res.latitude > this.maxLatitude || res
							.longitude < this.minLongitude || res.longitude > this.maxLongitude
						) { //用户不在服务区，固定位置
							this.$u.toast('当前用户不在服务区，已移到服务区门口')
							userLatitude = 29.667263,
								userLongitude = 106.513215
						} else {
							userLatitude = res.latitude;
							userLongitude = res.longitude;
						}
						uni.request({
							url: 'http://' + this.ip + '/map/mulFacilityNav',
							method: 'POST',
							data: {
								userLatitude,
								userLongitude,
								facilities: optimalPathData
							},
							success: (res) => {
								if (res.data.code * 1 === 200) {
									this.showTarget = true,
										this.expectWalkTime = res.data.data.expectWalkTime,
										this.totalWaitTime = res.data.data.totalWaitTime,
										this.expectWalkDistance = res.data.data.expectWalkDistance,
										this.polyline = [{
											points: res.data.data.paths,
											color: "#00aaff",
											width: 3,
											dottedLine: true,
											borderWidth: 4
										}],
										this.markers = res.data.data.facilities.map((facility,
											index) => ({
											id: facility.id,
											latitude: facility.latitude, //纬度
											longitude: facility.longitude, //经度
											iconPath: this.facilityIcons[facility
												.facilityType], //显示的图标
											rotate: 0, // 旋转度数
											width: 30, //宽
											height: 35, //高
											alpha: 0.5, //透明度
											callout: { //自定义标记点上方的气泡窗口 点击有效
												content: '<strong>' + (index + 1) +
													'</strong>' + '\n ' + facility
													.name, //文本
												color: '#000000', //文字颜色
												fontSize: 14, //文本大小
												borderRadius: 15, //边框圆角
												borderWidth: '10',
												bgColor: ' #ffffff', //背景颜色
												display: 'ALWAYS', //常显
											}
										}));
									const userMarker = {
										id: 'user',
										latitude: userLatitude,
										longitude: userLongitude,
										iconPath: '/static/map/current_position.png',
										width: 30,
										height: 35,
									};
									// 将用户位置标记添加到markers数组中
									this.markers.push(userMarker);
									this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
									this.moveToPark();
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
				});

			},

			// 接收来自设施详情的数据，并在地图上展示
			receiveDetail() {
				let facility = uni.getStorageSync('facility')
				uni.removeStorageSync('facility')
				let userLatitude = 29.667263,
					userLongitude = 106.513215
				uni.getLocation({
					type: 'wgs84',
					isHighAccuracy: true,
					success: (res) => {
						if (res.latitude < this.minLatitude || res.latitude > this.maxLatitude || res
							.longitude < this.minLongitude || res.longitude > this.maxLongitude
						) { //用户不在服务区，固定位置
							userLatitude = 29.667263,
								userLongitude = 106.513215
						} else {
							userLatitude = res.latitude;
							userLongitude = res.longitude;
						}
						this.markers = [{
							id: facility.id,
							latitude: facility.latitude, //纬度
							longitude: facility.longitude, //经度
							iconPath: '/static/map/position.png', //显示的图标
							rotate: 0, // 旋转度数
							width: 30, //宽
							height: 35, //高
							alpha: 0.5, //透明度
							name: facility.name,
							expectWaitTime: facility.waitTime,
							startTime: facility.startTime,
							closeTime: facility.closeTime,
							image: facility.imageurl,
							facilityId: facility.id,
							facilityType: facility.facilityType,
							callout: {
								content: '<strong>' + facility.name + '</strong>' + '\n' +
									'<strong style="color:' + (facility.waitTime > 30 ?
										(facility.waitTime >
											60 ? 'rgb(253,70,37)' : 'rgb(250,187,86)') : 'green') +
									'">' + String(facility.waitTime) + '</strong>' + "分钟", //文本
								color: '#000000', //文字颜色
								fontSize: 14, //文本大小
								borderRadius: 15, //边框圆角
								borderWidth: '10',
								bgColor: ' #ffffff', //背景颜色
								display: 'ALWAYS', //常显
							}
						}]
						this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
						this.showFacility = true;
						this.selectFacility.image = facility.imageurl;
						this.selectFacility.name = facility.name;
						this.selectFacility.startTime = facility.startTime;
						this.selectFacility.closeTime = facility.endTime;
						this.selectFacility.facilityId = facility.id;
						this.selectFacility.facilityType = facility.facilityType;
						this.scale = 20;
						this.latitude = facility.latitude
						this.longitude = facility.longitude
					}
				});
				
			},

			// 处理时间，不保留seconds
			parseTime(time) {
				const [hours, minutes, seconds] = time.split(':');
				return `${hours}:${minutes}`;
			},

			/* *******************************顶部图标点击事件功能******************************* */
			// 切换搜索栏
			toggleSearch() {
				this.isSearching = !this.isSearching;
				if (!this.isSearching) {
					this.keyword = '';
					this.selectedFacilityType = '';
					this.getAmusementData();
				}
			},

			// 搜索关键词，模糊搜索
			// debounce函数防抖：避免在用户连续输入时频繁触发处理函数
			search: debounce(function() {
				this.reset();
				const keyword = this.keyword.trim();
				if (keyword === '') {
					this.getAmusementData();
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
							this.markers = responseData.map((facility) => ({
								id: facility.id,
								latitude: facility.latitude, //纬度
								longitude: facility.longitude, //经度
								iconPath: this.facilityIcons[facility
									.facilityType], //显示的图标
								rotate: 0, // 旋转度数
								width: 30, //宽
								height: 35, //高
								alpha: 0.5, //透明度
								expectWaitTime: facility.expectWaitTime,
								imageUrls: facility.imageUrls[0],
								startTime: facility.startTime,
								closeTime: facility.closeTime,
								facilityType: facility.facilityType,
								name: facility.name,
								callout: { //自定义标记点上方的气泡窗口 点击有效
									content: '<strong style="color:' + (facility
											.expectWaitTime > 30 ? (facility
												.expectWaitTime > 60 ? 'rgb(253,70,37)' :
												'rgb(250,187,86)') : 'green') + '">' +
										String(facility.expectWaitTime) + '</strong>' +
										"分钟", //文本
									color: '#000000', //文字颜色
									fontSize: 14, //文本大小
									borderRadius: 15, //边框圆角
									borderWidth: '10',
									bgColor: ' #ffffff', //背景颜色
									display: 'ALWAYS', //常显
								}
							}));
							this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
							if (this.tempMarkers.length == 0) {
								this.$u.toast("空空如也~")
							}
							this.moveToPark();
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

			// 获取游乐设施数据
			getAmusementData() {
				if (this.selectedFacilityType != 'amusement') {
					this.selectedFacilityType = 'amusement';
				}
				this.reset();
				uni.request({
					url: 'http://' + this.ip + '/filter/amusement',
					method: 'POST',
					data: {
						id: null,
						name: '',
						type: '',
						height: null,
						crowd: '',
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.markers = responseData.map((facility) => ({
								id: facility.id,
								latitude: facility.latitude,
								longitude: facility.longitude,
								iconPath: '/static/map/position.png',
								rotate: 0, // 旋转度数
								width: 30, //宽
								height: 35, //高
								alpha: 0.5, //透明度
								expectWaitTime: facility.expectWaitTime,
								imageUrls: facility.imageUrls[0],
								startTime: facility.startTime,
								closeTime: facility.closeTime,
								facilityType: facility.facilityType,
								name: facility.name,
								callout: {
									content: '<strong style="color:' + (facility.expectWaitTime >
											30 ?
											(facility.expectWaitTime >
												60 ? 'rgb(253,70,37)' : 'rgb(250,187,86)') :
											'green') +
										'">' + String(facility
											.expectWaitTime) + '</strong>' + "分钟", //文本
									color: '#000000', //文字颜色
									fontSize: 14, //文本大小
									borderRadius: 15, //边框圆角
									borderWidth: '10',
									bgColor: ' #ffffff', //背景颜色
									display: 'ALWAYS', //常显
								}
							}));
							this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
							this.moveToPark();
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

			// 获取餐饮设施数据
			getCateringData() {
				this.selectedFacilityType = 'catering';
				this.tempMarkers = []
				uni.request({
					url: 'http://' + this.ip + '/filter/restaurant',
					method: 'POST',
					data: {
						id: null,
						name: '',
						type: '',
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.markers = responseData.map((facility) => ({
								id: facility.id,
								latitude: facility.latitude,
								longitude: facility.longitude,
								iconPath: '/static/map/cater_position.png',
								rotate: 0, // 旋转度数
								width: 30, //宽
								height: 35, //高
								alpha: 0.5, //透明度
								expectWaitTime: facility.expectWaitTime,
								imageUrls: facility.imageUrls[0],
								startTime: facility.startTime,
								closeTime: facility.closeTime,
								facilityType: facility.facilityType,
								name: facility.name,
								callout: { //自定义标记点上方的气泡窗口 点击有效
									content: '<strong style="color:' + (facility.expectWaitTime >
											30 ?
											(facility.expectWaitTime >
												60 ? 'rgb(253,70,37)' : 'rgb(250,187,86)') :
											'green') +
										'">' + String(facility
											.expectWaitTime) + '</strong>' + "分钟", //文本
									color: '#000000', //文字颜色
									fontSize: 14, //文本大小
									borderRadius: 15, //边框圆角
									borderWidth: '10',
									bgColor: ' #ffffff', //背景颜色
									display: 'ALWAYS', //常显
								}
							}));
							this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
							this.moveToPark();
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

			// 获取洗手间数据
			getBaseData() {
				this.selectedFacilityType = 'base';
				this.tempMarkers = []
				uni.request({
					url: 'http://' + this.ip + '/filter/base',
					method: 'POST',
					data: {
						id: null,
						name: '',
						userId: ''
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							const responseData = res.data.data;
							this.markers = responseData.map((facility) => ({
								id: facility.id,
								latitude: facility.latitude,
								longitude: facility.longitude,
								iconPath: '/static/map/washroom_position.png',
								rotate: 0, // 旋转度数
								width: 30, //宽
								height: 35, //高
								alpha: 0.5, //透明度
								expectWaitTime: facility.expectWaitTime,
								imageUrls: facility.imageUrls[0],
								startTime: facility.startTime,
								closeTime: facility.closeTime,
								facilityType: facility.facilityType,
								name: facility.name,
								callout: { //自定义标记点上方的气泡窗口 点击有效
									content: '<strong style="color:' + (facility.expectWaitTime >
											30 ?
											(facility.expectWaitTime >
												60 ? 'rgb(253,70,37)' : 'rgb(250,187,86)') :
											'green') +
										'">' + String(facility
											.expectWaitTime) + '</strong>' + "分钟", //文本
									color: '#000000', //文字颜色
									fontSize: 14, //文本大小
									borderRadius: 15, //边框圆角
									borderWidth: '10',
									bgColor: ' #ffffff', //背景颜色
									display: 'ALWAYS', //常显
								}
							}));
							this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
							this.moveToPark();
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

			/* *******************************右侧四个图标功能实现******************************* */
			// 条件筛选
			showDrawer(e) {
				this.$refs[e].open()
			},

			closeDrawer(e) {
				this.$refs[e].close()
			},

			confirmFilter(type) {
				let requestData = {}; // 存放请求数据
				this.tempMarkers = []
				this.closeDrawer('showLeft');
				if (type === 'amusement') {
					// 构建请求数据
					requestData = {
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
							// 更新设施列表
							if (res.data.code * 1 === 200) {
								const responseData = res.data.data;
								this.markers = responseData.map((facility) => ({
									id: facility.id,
									latitude: facility.latitude,
									longitude: facility.longitude,
									iconPath: '/static/map/position.png',
									rotate: 0, // 旋转度数
									width: 30, //宽
									height: 35, //高
									alpha: 0.5, //透明度
									expectWaitTime: facility.expectWaitTime,
									imageUrls: facility.imageUrls[0],
									startTime: facility.startTime,
									closeTime: facility.closeTime,
									facilityType: facility.facilityType,
									name: facility.name,
									callout: { //自定义标记点上方的气泡窗口 点击有效
										content: '<strong style="color:' + (facility
												.expectWaitTime >
												30 ? (facility
													.expectWaitTime > 60 ? 'rgb(253,70,37)' :
													'rgb(250,187,86)') : 'green') + '">' +
											String(facility.expectWaitTime) + '</strong>' +
											"分钟", //文本
										color: '#000000', //文字颜色
										fontSize: 14, //文本大小
										borderRadius: 15, //边框圆角
										borderWidth: '10',
										bgColor: ' #ffffff', //背景颜色
										display: 'ALWAYS', //常显
									}
								}));
								this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
								if (this.tempMarkers.length == 0) {
									this.$u.toast("空空如也~")
								}
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
					this.tempMarkers = []
					// 构建请求数据
					requestData = {
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
								// 更新设施列表
								const responseData = res.data.data;
								this.markers = responseData.map((facility) => ({
									id: facility.id,
									latitude: facility.latitude, //纬度
									longitude: facility.longitude, //经度
									iconPath: '/static/map/cater_position.png', //显示的图标
									rotate: 0, // 旋转度数
									width: 30, //宽
									height: 35, //高
									alpha: 0.5, //透明度
									callout: { //自定义标记点上方的气泡窗口 点击有效
										content: facility.name, //文本
										color: '#000000', //文字颜色
										fontSize: 14, //文本大小
										borderRadius: 15, //边框圆角
										borderWidth: '10',
										bgColor: ' #ffffff', //背景颜色
										display: 'BYCLICK', //常显
									}
								}));
								if (this.tempMarkers.length == 0) {
									this.$u.toast("空空如也~")
								}
								this.tempMarkers = this.markers;
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

			// 输入身高与不限制身高互斥
			// debounce函数防抖：避免在用户连续输入时频繁触发处理函数
			handleHeightInput: debounce(function() {
				if (this.selectedHeight !== '') {
					this.height = [{
						name: '不限制',
						disabled: true
					}]
				} else {
					this.height = [{
						name: '不限制',
						disabled: false
					}]
				}
			}, 500),

			// 跳转到设施列表页面
			facilityList() {
				uni.navigateTo({
					url: '/pages/facilitylist/facilitylist'
				})
			},

			// 获取用户地理位置
			locate() {
				this.tempMarkers = []
				const index = this.markers.findIndex(marker => marker.id === 'user');
				if (index !== -1) {
					this.markers.splice(index, 1);
				}
				uni.getLocation({
					type: 'gcj02', // 使用国测局坐标系
					success: (res) => {
						this.latitude = 29.667263;
						this.longitude = 106.513215;
						this.scale = 17;
						this.markers.push({
							id: 'user',
							// latitude: res.latitude,
							// longitude: res.longitude,
							// 设置固定位置
							latitude: 29.667275,
							longitude: 106.513172,
							iconPath: '/static/map/current_position.png',
							rotate: 0, // 旋转度数
							width: 30,
							height: 35,
							alpha: 0.5, //透明度
							callout: {
								content: '',
								color: '#000000',
								fontSize: 14,
								borderRadius: 15,
								borderWidth: '10',
								bgColor: '#ffffff',
								display: 'BYCLICK',
							},
						});
						this.tempMarkers = JSON.parse(JSON.stringify(this.markers));
					},
					fail: (err) => {
						uni.showToast({
							title: '获取位置信息失败',
							icon: 'none'
						});
					},
				});
			},

			// 跳转到智能规划路线页面
			recommend() {
				uni.navigateTo({
					url: ('/pages/bestroute/bestroute')
				})
			},

			/* **************************************地图************************************** */
			reset() {
				this.markers = [];
				this.tempMarkers = [];
				this.polyline = [];
				this.showTarget = false;
				this.showRecommendTarget = false;
			},

			//用于在筛选时切换至标准页面
			moveToPark() {
				let e = {
					latitude: '29.667259',
					longitude: '106.516357'
				}
				let scale = this.zoomLevelOne;
				this.setMapScale(e, scale);
			},

			//将地图移动到指定位置，并设置指定的缩放级别
			async setMapScale(e, val) {
				let setScale = () => { // 获取地图的当前缩放比例
					return new Promise((resolve, reject) => {
						this.mapContext.getScale({
							success: r => {
								this.scale = r.scale;
								resolve()
							}
						})
					})
				};
				await setScale(); //等待 setScale() 函数执行完毕
				this.mapContext.moveToLocation({ //移动地图到指定位置，传入经度和纬度参数
					longitude: e.longitude,
					latitude: e.latitude,
					success: (res) => {
						//这里加300ms的延时是为了防止和moveToLocation功能冲突，保留地图移动的动画
						const timer = setTimeout(() => {
							this.longitude = e.longitude;
							this.latitude = e.latitude;
							this.scale = val;
							clearTimeout(timer);
						}, 300);
					},
				})
			},

			//用户双指缩放监听
			scaleChange() {
				let _this = this
				this.timer = setInterval(function() {
					let scale = _this.mapContext.getScale({
						success(res) {
							_this.zoom = res.scale
						}
					})
				}, 500)
			},

			// 点击标记点（单个设施）事件
			markertap(e) {
				//缩放等级小于二级，就到二级,否则到三级
				let scale = this.zoom < this.zoomLevelTow ? this.zoomLevelTow : this.zoomLevelThird;
				this.setMapScale(e.detail, scale);
				const that = this;
				setTimeout(function() {
					if (that.zoom >= 20) {
						that.showFacility = true;
						//获取设施对象
						const markedId = e.detail.markerId;
						const facility = that.markers.find(marker => marker.id === markedId);
						that.askSingle(facility);
					} else {
						// 如果没有缩放到最大级别，可以选择重置或者保持 showFacility 的状态  
						that.showFacility = false; // 根据需要添加或注释这行代码  
					}
				}, 1000); // 这里的 1000 表示延时的时间，单位是毫秒
			},

			// 查询单个设施信息
			askSingle(e) {
				this.selectFacility.name = e.name;
				this.selectFacility.image = e.imageUrls;
				this.selectFacility.facilityId = e.id;
				this.selectFacility.startTime = this.parseTime(e.startTime);
				this.selectFacility.closeTime = this.parseTime(e.closeTime);
				this.selectFacility.facilityType = e.facilityType;
			},

			// 跳转到详情页
			gofacdetail(name, type) {
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + type
				});
			},

			/* ***********************************底部弹窗功能实现********************************** */
			// 目标（推荐）路线导航和智能规划路线导航
			guide1() {
				this.showTarget = false
				this.showRecommendTarget = false
				this.showFacility = false
				this.showSingle = false
				this.showTime = true
				this.locate()

			},

			// 单个路线导航
			guide2() {
				this.showTarget = false
				this.markers = this.markers.filter(o => {
					return o.id == this.selectFacility.facilityId
				});
				this.markers[0].callout.content = '<strong>' + this.markers[0].name + '</strong>' + '\n' +
					'<strong style="color:' + (this.markers[0]
						.expectWaitTime > 30 ? (this.markers[0].expectWaitTime > 60 ? 'rgb(253,70,37)' :
							'rgb(250,187,86)') : 'green') +
					'">' + String(this.markers[0].expectWaitTime) + '</strong>' + "分钟";
				this.showRecommendTarget = false
				this.showFacility = false
				this.showTime = false
				this.showSingle = true
				this.locate()
				this.singleGuide()
			},

			//单个设施导航
			singleGuide() {
				let userLatitude = 29.667263,
					userLongitude = 106.513215
				uni.request({
					url: 'http://' + this.ip + '/map/sinFacilityNav',
					method: 'POST',
					data: {
						userLatitude,
						userLongitude,
						facilityId: this.selectFacility.facilityId,
						facilityType: this.selectFacility.facilityType
					},
					success: (res) => {
						if (res.data.code * 1 === 200) {
							this.expectWalkDistance = res.data.data.expectWalkDistance
							this.expectWalkTime = res.data.data.expectWalkTime
							this.expectArriveTime = res.data.data.expectArriveTime
							this.polyline = [{
								points: res.data.data.paths,
								color: "#00aaff",
								width: 3,
								dottedLine: true,
								borderWidth: 4
							}]
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

			// 返回智能规划路线
			goback() {
				this.tempMarkers = []
				uni.navigateTo({
					url: '/pages/bestroute/bestroute'
				});
			},

			// 返回推荐路线
			gobackrecommend() {
				uni.navigateTo({
					url: '/pages/recommendroute/recommendroute?id=' + this.routes[0].routeid + '&type=' + this
						.routes[0].routetype
				})
			},

			// 退出多个设施导航
			exit() {
				this.reset()
				this.showTarget = false
				this.showRecommendTarget = false
				this.showFacility = false
				this.showTime = false
				this.showSingle = false
				this.polyline = [{
					points: [],
					color: "#00aaff",
					width: 3,
					dottedLine: true,
					borderWidth: 4
				}]
				this.tempMarkers = []
				if (this.selectedFacilityType == 'amusement') {
					this.getAmusementData()
				} else if (this.selectedFacilityType == 'catering') {
					this.getCateringData()
				} else {
					this.getBaseData()
				}
				this.moveToPark()
			},

			// 取消单个设施导航
			cancel() {
				this.showFacility = false
				this.showTarget = false
				this.showRecommendTarget = false
				this.showTime = false
				this.showSingle = false
				this.polyline = [{
					points: [],
					color: "#00aaff",
					width: 3,
					dottedLine: true,
					borderWidth: 4
				}]
				this.tempMarkers = []
				if (this.selectedFacilityType == 'amusement') {
					this.getAmusementData()
				} else if (this.selectedFacilityType == 'catering') {
					this.getCateringData()
				} else {
					this.getBaseData()
				}
				this.moveToPark()
			},
		}
	}
</script>
<style>
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

	.ticon {
		width: 30px;
		height: 30px;
		padding-top: 5px;
		cursor: pointer;
	}

	.icon-name {
		font-size: 14px;
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

	map {
		margin-top: 60px;
		position: absolute;
		z-index: 50;
	}

	.right_icon_container {
		position: fixed;
		top: 15%;
		right: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		z-index: 100;
	}

	.right_icon {
		width: 40px;
		height: 35px;
		cursor: pointer;
		margin: 10px 0;
		background-color: #fff;
		border-radius: 50%;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ricon {
		width: 80%;
		height: 80%;
		padding-top: 1px;
		cursor: pointer;
	}

	.bottom_icon {
		position: fixed;
		top: 75%;
		right: 20px;
		height: 130px;
		width: 80px;
		height: 80px;
		cursor: pointer;
		margin: 5px 0;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;
	}

	.icon2 {
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
	}

	.conditions {
		padding: 15px;
	}

	.condition_title {
		margin-top: 80px;
		padding: 0 15px;
		font-size: 20px;
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

	.popup {
		position: absolute;
		position: fixed;
		bottom: 5%;
		left: 0;
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		z-index: 101;
	}

	.facility_item {
		display: flex;
		align-items: center;
		padding: 10px;
		background-color: #fff;
		border-radius: 10px;
	}

	.facility_image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.line1 {
		font-size: 18px;
		padding: 20rpx;
	}

	.line2 {
		padding: 20rpx;
		padding-bottom: 12px;
		font-size: 15px;
	}

	.line3 {
		font-size: 18px;
		padding: 20rpx;
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.line4 {
		padding: 10rpx;
		padding-bottom: 12px;
		border-bottom: 1px solid #ccc;
		font-size: 17px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn_position {
		display: flex;
		width: 100%;
		margin-bottom: 10px;
	}

	.goback {
		width: 50%;
		text-align: center;
		padding: 20rpx 0;
		color: #519fe7;
	}

	.guide {
		width: 50%;
		background-color: #519fe7;
		text-align: center;
		padding: 20rpx 0;
		color: #fff;
	}

	.exit {
		width: 100%;
		text-align: center;
		padding: 20rpx 0;
	}
</style>
