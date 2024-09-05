<!-- 开发者:陈金铭 -->

<template>
	<view class="wrap">
		<!-- 个人信息 -->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30" @click="goInfoChange">
			<view class="u-m-r-10">
				<u-avatar :src="user.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{user.username}}</view>
				<view class="u-font-14 u-tips-color">手机号:{{user.phone}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		<!-- 更多操作 -->
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的订阅" @click="goSubscribe"></u-cell-item>
				<u-cell-item icon="checkmark-circle" title="我的打卡" @click="goMarkRecords"></u-cell-item>
				<u-cell-item icon="edit-pen" title="意见与反馈" @click="goFeedback"></u-cell-item>
				<u-cell-item icon="lock" title="隐私保护" @click="goPrivacy"></u-cell-item>
				<u-cell-item icon="info-circle" title="关于" @click="goAbout"></u-cell-item>
				<u-cell-item icon="man-delete" title="退出账号" @click="quit"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {} //用户信息
			}
		},

		onShow() {
			this.user = uni.getStorageSync('user');
		},

		onLoad() {
			this.ip = getApp().globalData.ip;
		},

		methods: {
			//跳转信息修改页
			goInfoChange() {
				uni.navigateTo({
					url: '../infochange/infochange'
				});

			},
			//跳转我的订阅页
			goSubscribe() {
				uni.navigateTo({
					url: '../subscribe/subscribe'
				})
			},
			
			//跳转我的打卡页
			goMarkRecords() {
				uni.navigateTo({
					url: '../markrecords/markrecords'
				})
			},
			
			//跳转反馈
			goFeedback() {
				uni.navigateTo({
					url: '/pages/webview/webview?url=https://yijianbox.com'
				});
			},
			
			//跳转隐私保护
			goPrivacy() {
				uni.navigateTo({
					url: '/pages/webview/webview?url=https://www.tencent.com/zh-cn/privacy-policy.html'
				});
			},
			
			//跳转关于
			goAbout() {
				uni.navigateTo({
					url: '/pages/webview/webview?url=https://www.chinasofti.com'
				});
			},
			
			//退出,清空相关数据
			quit() {
				uni.showModal({
					title: '提示',
					content: '是否确认退出',
					success: function(res) {
						if (res.confirm) {
							uni.setStorageSync('user', '')
							uni.reLaunch({
								url: '../login/login'
							})
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		margin-top: 20rpx;
	}
</style>