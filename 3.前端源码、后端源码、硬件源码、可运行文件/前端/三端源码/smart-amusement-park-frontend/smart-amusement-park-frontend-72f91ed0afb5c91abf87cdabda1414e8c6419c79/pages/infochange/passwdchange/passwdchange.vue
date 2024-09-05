<!-- 开发者:陈金铭 -->

<template>
	<view class="wrap">
		<u-form>
			<view class="phone_row">手机号<text class="phone">{{user.phone}}</text></view>
			<u-form-item label="验证码" label-width="180" :label-style="{'font-size':'32rpx'}">
				<u-input type="text" placeholder="请输入验证码" v-model="verifyCode"></u-input>
				<u-toast ref="uToast"></u-toast>
				<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
				<u-button class="verify_button" @tap="getCode">{{tips}}</u-button>
			</u-form-item>
			<u-form-item label="密码" label-width="180" :label-style="{'font-size':'32rpx'}">
				<u-input type="password" placeholder="请输入密码" v-model="user.password"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" label-width="180" :label-style="{'font-size':'32rpx'}">
				<u-input type="password" placeholder="请再输入一次密码" v-model="checkPassword"></u-input>
			</u-form-item>
		</u-form>
		<u-button class="submit_button" type="primary" plain @click="submit()">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户数据
				user: {
					phone: "",
					password: "",
					id: "",
				},
				//验证码
				verifyCode: "",
				//再次输入密码
				checkPassword: "",
				tips: '',
				seconds: 60,
			}
		},

		onLoad() {
			this.ip = getApp().globalData.ip;
		},

		onShow() {
			const userData = uni.getStorageSync("user");
			this.user.phone = userData.phone;
			this.user.id = userData.id;
		},

		methods: {
			codeChange(text) {
				this.tips = text;
			},

			//开始倒计时,发送验证码
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					this.sendSms();
					uni.hideLoading();
					this.$refs.uCode.start();
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},

			//提交信息
			submit() {
				// 判断验证码是否为空
				if (!this.verifyCode) {
					this.$u.toast('请输入验证码');
					return;
				}
				// 判断密码是否为空
				if (!this.user.password) {
					this.$u.toast('请输入密码');
					return;
				}

				// 判断密码位数是否大于等于8
				if (this.user.password.length < 8 || this.user.password.length > 16) {
					this.$u.toast('密码长度需大于等于8位, 小于等于16位');
					return;
				}

				// 判断两次密码是否一致
				if (this.user.password !== this.checkPassword) {
					this.$u.toast('两次输入的密码不一致');
					return;
				}
				//校验验证码是否正确
				this.verify();
			},

			//发送验证码
			sendSms() {
				uni.request({
					url: 'http://' + this.ip + '/sms/sendSms',
					data: {
						phone: this.user.phone
					},
					method: 'POST',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							this.$u.toast("验证码已发送") // 提示框
						} else {
							this.$u.toast("验证码发送失败,请稍后重试") // 提示框
						}
					},
				});
			},

			//校验验证码
			verify() {
				uni.request({
					url: 'http://' + this.ip + '/user/loginByPhone',
					data: {
						phone: this.user.phone,
						code: this.verifyCode,
					},
					method: 'POST',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							//验证通过,修改信息
							this.infochange()
						} else if (response.data.code * 1 == 40000) {
							this.$u.toast("验证码错误或已失效")
						} else {
							this.$u.toast("验证失败")
						}
					},
				});
			},

			//修改信息
			infochange() {
				uni.request({
					url: 'http://' + this.ip + '/user/update',
					data: this.user,
					method: 'POST',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							this.user = response.data.data
							uni.setStorageSync('user', this.user)
							setTimeout(() => {
								this.$u.toast("密码修改成功")
							}, 100); // 延迟100ms弹出toast
							uni.navigateBack({})
						} else {
							const message = response.data.message;
							this.$u.toast(message) // 提示框
						}
					},
				});
			},
		}
	}
</script>
}
}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 600rpx;
		margin: auto;
		margin-top: 100rpx;
	}

	.phone_row {
		color: #787878;
		font-size: 32rpx;
		margin-bottom: 20rpx;
	}

	.phone {
		margin-left: 90rpx;

	}

	.verify_button {
		width: 170rpx;
		height: 80rpx;
		margin-top: 5rpx;
		color: white;
		background-color: $titleColor;
	}

	.submit_button {
		margin-top: 70rpx;
		width: 200rpx;
	}
</style>