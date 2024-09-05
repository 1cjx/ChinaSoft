<!-- 开发者:陈金铭 -->

<template>
	<view class="box">
		<!-- 头像与昵称修改框 -->
		<view class="avatar">
			<u-avatar @click="upload()" :src="user.avatarUrl" size="140"></u-avatar>
			<u-form class="user_name">
				<u-form-item left-icon="edit-pen">
					<u-input type="text" v-model="user.username">
					</u-input>
				</u-form-item>
			</u-form>
		</view>
		<!-- 手机号与密码修改 -->
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item title="修改手机号" @click="goPhone"></u-cell-item>
				<u-cell-item title="修改密码" @click="goPassword"></u-cell-item>
			</u-cell-group>
		</view>
		<!-- 提交按钮 -->
		<u-button class="button" type="primary" plain @click="submit()">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户信息
				user: {
					avatarUrl: '',
					userName: '',
					id: '',
				},
			};
		},

		onLoad() {
			//获取ip
			this.ip = getApp().globalData.ip;
			//从缓存获取用户信息
			const userData = uni.getStorageSync("user");
			this.user.avatarUrl = userData.avatarUrl;
			this.user.username = userData.username;
			this.user.id = userData.id;
		},

		methods: {
			//上传头像
			upload() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						// 上传图片到服务器
						uni.uploadFile({
							url: 'http://' + this.ip + '/common/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								// 将返回的图片链接从 JSON 字符串中解析出来
								const data = JSON.parse(uploadFileRes.data);
								if (data.code * 1 == 200) {
									//将图片链接保存在user.avatarUrl
									this.user.avatarUrl = data.data;
								} else {
									this.$u.toast("上传失败,请稍后再试")
								}
							},
						});
					},
				});
			},

			//提交修改信息
			submit() {
				//是否确认弹窗
				uni.showModal({
					title: '提示',
					content: '确认修改信息',
					success: (res) => {
						//确认后上传数据到接口
						if (res.confirm) {
							uni.request({
								url: 'http://' + this.ip + '/user/update',
								data: this.user,
								method: 'POST',
								success: (response) => {
									if (response.data.code * 1 == 200) {
										this.user = response.data.data
										uni.setStorageSync('user', this.user)
										setTimeout(() => {
											this.$u.toast("个人信息修改成功")
										}, 100);
										uni.navigateBack({
											url: '/pages/myinfo/myinfo'
										})
									} else {
										const message = response.data.message;
										this.$u.toast(message)
									}
								},
							});
						}
					}
				});

			},

			//跳转修改手机号页面
			goPhone() {
				uni.navigateTo({
					url: '/pages/infochange/phonechange/phonechange'
				})
			},

			//跳转修改密码页面
			goPassword() {
				uni.navigateTo({
					url: '/pages/infochange/passwdchange/passwdchange'
				})
			}
		},
	};
</script>

<style lang=scss>
	.box {
		width: 650rpx;
		margin: auto;
		margin-top: 50rpx;
	}

	.avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50rpx;
	}

	.user_name {
		width: 200rpx;
		margin: auto;
	}

	.button {
		margin-top: 50rpx;
		width: 200rpx;
	}
</style>