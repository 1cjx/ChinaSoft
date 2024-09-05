<!-- 开发者:池跃花 -->
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
					:src="selectedFacilityType=='amusement' ? '/static/facilitylist/rides_selected2.png' : '/static/facilitylist/rides.png'" />
				<text class="icon-name">游乐设施</text>
			</view>
			<view class="top_icon" @click="getCateringData()">
				<image class="icon"
					:src="selectedFacilityType=='catering' ? '/static/facilitylist/catering_selected2.png' : '/static/facilitylist/catering.png'" />
				<text class="icon-name">餐饮</text>
			</view>
			<view class="top_icon" @click="getBaseData()">
				<image class="icon"
					:src="selectedFacilityType=='base' ? '/static/facilitylist/washroom_selected2.png' : '/static/facilitylist/washroom.png'" />
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
			<image class="emptyicon" src="/static/icon/emptyicon.png" v-if="this.facilitieslist.length == 0"
				mode="aspectFill"></image>
			<u-checkbox-group>
				<label class="facility_item" v-for="item in facilitieslist" :key="item.name">
					<u-checkbox v-model="item.checked" :name="JSON.stringify(item)" @change="clickChecked(item)" />
					<image class="facility_image" :src="item.image"
						@click="gofacdetail(item.name,selectedFacilityType)" />
					<view class="facility_text" @click="gofacdetail(item.name,selectedFacilityType)">
						<text class="facility_name">{{ item.name }}</text>
					</view>
				</label>
			</u-checkbox-group>
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
		
		<!-- 底部 -->
		<view class="bottom">
			<!-- 已选中设施展示 -->
			<view class="selected_facilities">
				<view class="selected_facility" v-for="(facility, index) in selectedFacilities" :key="index">
					<image v-if="index<5" class="selected_facility_image" :src="facility.image" />
					<image v-if="index==5" class="selected_facility_image" src="/static/icon/ellipsis.png" />
				</view>
			</view>
			<!-- 查找最优路径按钮 -->
			<view class="bestroute_button" @click="findOptimalPath" :class="{ 'gray-button': selectedFacilities.length === 0 }">
				<view class="center-content">
					<view>已选择{{selectedFacilities.length}}个设施</view>
					<view>开始导航</view>
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
				isSearching: false, // 控制搜索框是否显示
				keyword: '', // 存储搜索关键词
				facility: {
					facilityId: null,
					facilityType: null
				},
				facilitieslist: [], // 存储设施列表信息（用于展示）
				selectedFacilityType: '', // 存储选择的设施类型（amusement、catering、base）
				selectedFacilities: [], // 存储已选游乐设施的id（用于查找最优路径和下方展示）
				// 条件筛选所需数据
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
		},
		
		onShow() {
			let optimlPathData = uni.getStorageSync('optimlPathData');
			this.getAmusementData();
		},
		
		methods: {
			/* *******************************顶部图标点击事件功能******************************* */
			toggleSearch() {
				this.isSearching = !this.isSearching;
				if (!this.isSearching) {
					this.keyword = '';
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
							this.facilitieslist = responseData.map((facility) => ({
								id: facility.id,
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
							}));
							this.isChecked();
							if (this.facilitieslist.length == 0) {
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
			}, 500),
			
			getAmusementData() {
				this.selectedFacilityType = 'amusement';
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
						if (res.data.code * 1 === 200){
							const responseData = res.data.data;
							this.facilitieslist = responseData.map((facility) => ({
								id: facility.id,
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
							}));
							this.isChecked();
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
						id: null,
						name: '',
						type: '',
					},
					success: (res) => {
						if (res.data.code * 1 === 200){
							const responseData = res.data.data;
							this.facilitieslist = responseData.map((facility) => ({
								id: facility.id,
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
							}));
							this.isChecked();
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
						name: ''
					},
					success: (res) => {
						if (res.data.code * 1 === 200){
							const responseData = res.data.data;
							this.facilitieslist = responseData.map((facility) => ({
								id: facility.id,
								name: facility.name,
								image: facility.imageUrls[0], // 取第一个图片作为设施图片
							}));
							this.isChecked();
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
						type: this.selectedActivity,
						crowd: this.selectedCrowd,
						height: this.selectedHeight,
						// cater: this.selectedCater,
					};
					// 向后端发送请求
					uni.request({
						url: 'http://' + this.ip + '/filter/amusement',
						method: 'POST',
						data: requestData,
						success: (res) => {
							if (res.data.code * 1 === 200){
								// 更新设施列表
								const responseData = res.data.data;
								this.facilitieslist = responseData.map((facility) => ({
									id: facility.id,
									name: facility.name,
									image: facility.imageUrls[0], // 取第一个图片作为设施图片
								}));
								this.isChecked();
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
							if (res.data.code * 1 === 200){
								// 更新设施列表
								const responseData = res.data.data;
								this.facilitieslist = responseData.map((facility) => ({
									id: facility.id,
									name: facility.name,
									image: facility.imageUrls[0], // 取第一个图片作为设施图片
								}));
								this.isChecked();
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
			
			// 输入身高和身高不限制互斥
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
			}, 300),
			
			/* *************************************设施列表************************************* */
			getFacilityType() {
				switch (this.selectedFacilityType) {
					case 'amusement':
						return 0;
					case 'catering':
						return 1;
					case 'base':
						return 2; 
					default:
						return -1;
				}
			},
			
			// 点击多选框
			clickChecked(e) {
				let flag = false;
				this.selectedFacilities.forEach((o, index) => {
					if (o.name == e.name) { //有就删除
						flag = true;  //表示找到了匹配的设施
						this.selectedFacilities.splice(index, 1); // 从选中设施中删除
					}
				})
				if (!flag) { //没有就插入
					e.facilityType = this.getFacilityType()
					this.selectedFacilities.push(e)
				}
			},
			
			//每次更新列表判断列表中哪些已选中
			isChecked() {
				this.facilitieslist.forEach(o => {
					this.selectedFacilities.forEach(e => {
						if (o.name == e.name) {
							o.checked = true;
							return;
						}
					})
				})
			},
			
			// 更新已选设施数组，为每个选中的设施对象添加 facilityId 和 checked 属性
			handleCheckboxGroupChange(event) {
				this.selectedFacilities = event.detail.value.map(f => {
					// 将字符串数组转换为JavaScript对象
					let temp = JSON.parse(f);
					temp.facilityId = this.getFacilityType();
					temp.checked = true;
					return temp;
				});
			},
			
			// 跳转到详情页面
			gofacdetail(name, type) {
				uni.navigateTo({
					url: '/pages/facilitydetail/facilitydetail?name=' + name + '&type=' + type
				});
			},

			
			/* *************************************底部展示和按钮*********************************** */
			// 开始导航按钮
			findOptimalPath() {
				if(this.selectedFacilities.length !== 0){
					let optimlPathData = this.selectedFacilities.map(o => {
						return {
							facilityType: o.facilityType,
							facilityId: o.id,
						}
					})
					uni.setStorageSync('optimalPathData', optimlPathData);
					uni.switchTab({
						url: '/pages/map/map',
					})
				}
			},
		},
	};
</script>

<style>
	.facility_list {
		height: 100%;
		background-color: #ffffff;
	}

	.top_icons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #20b0f2;
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
		/* background-color: #ffff7f; */
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
		color: white;
	}

	.search_bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #20b0f2;
		padding: 15px;
		position: fixed;
		top: 40px;
		width: 100%;
		z-index: 1000;
	}

	.search-input {
		flex: 1;
		/* 占据剩余空间 */
		background-color: #f8f8f8;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #ccc;
	}

	.cancel-text {
		cursor: pointer;
		/* 显示点击效果 */
		font-size: 14px;
		color: #ffffff;
		/* 文本颜色 */
		margin-left: 20px;
	}

	.facility_items {
		margin-top: 60px;
		padding: 15px 10px 60px 10px;
		width: 100%;
	}
	
	.emptyicon {
		display: flex;
		justify-content: center;
		align-items: center;
		margin:  30% auto;
	}

	.facility_item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		padding: 10px;
		width: 100%;
		border-bottom: 1px solid #ddd;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
		background-color: #fff;
		border-radius: 10px;
		overflow: hidden;
	}

	.facility_image {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 10px;
		margin-left: 20px;
		margin: 0 10px 0 20px;
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

	.facility_open_time {
		padding-top: 8px;
		font-size: 14px;
		color: #666;
	}

	.filter {
		position: fixed;
		top: 75%;
		right: 20px;
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

	.bottom {
		position: fixed;
		top: 94%;
		display: flex;
		width: 100%;
		flex-direction: row;
		margin-bottom: 10px;
	}

	.selected_facilities {
		position: fixed;
		width: 69.5%;
		height: 50px;
		background-color: #ffffff;
		border-radius: 5px;
		display: flex;
		flex-direction: row;
		overflow-x: auto;
		/* 横向溢出时显示滚动条 */
		border: 1px solid #9e9e9e;
	}

	.selected_facility {
		margin: 5px 0 5px 5px;
	}

	.selected_facility_image {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	.bestroute_button {
		border: 1px solid #9e9e9e;
		text-align: center;
		color: white;
		border-radius: 5px;
		background-color: #20b0f2;
		position: fixed;
		cursor: pointer;
		justify-content: center;
		height: 50px;
		margin-left: 70%;
		width: 30%;
	}
	
	.gray-button{
		background-color: #f8f8f8;
		color: #666;
	}

	.center-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	
</style>
