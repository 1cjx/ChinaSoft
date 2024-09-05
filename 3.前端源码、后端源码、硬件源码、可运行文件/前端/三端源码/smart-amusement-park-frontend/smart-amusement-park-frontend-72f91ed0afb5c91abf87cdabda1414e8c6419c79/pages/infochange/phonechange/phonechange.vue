<!-- 开发者:陈金铭 -->

<template>
	<view class="wrap">
		<u-form>
			<u-form-item label="手机号" label-width="180" :label-style="{'font-size':'32rpx'}">
				<u-input type="text" placeholder="请输入手机号" v-model="user.phone">
				</u-input>
			</u-form-item>
			<u-form-item label="验证码" label-width="180" :label-style="{'font-size':'32rpx'}">
				<u-input type="text" placeholder="请输入验证码" v-model="verifycode">
				</u-input>
				<u-toast ref="uToast"></u-toast>
				<u-verification-code :seconds="seconds" ref="uCode" @change="codeChange"></u-verification-code>
				<u-button class="verify_button" @tap="getCode">{{tips}}</u-button>
			</u-form-item>
		</u-form>
		<u-button class="submit_button" type="primary" plain @click="submit()">提交</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户信息
				user: {

				},
				//验证码
				verifycode: "",
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
			
			//修改个人信息
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
								this.$u.toast("手机号修改成功")
							}, 100);
							//跳转页面
							uni.navigateBack({})
						} else {
							const message = response.data.message;
							this.$u.toast(message)
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
						code: this.verifycode,
					},
					method: 'POST',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							//验证通过,修改信息
							this.infochange()
						} else {
							this.$u.toast(response.data.message) // 提示框
						}
					},
				});
			},
			
			//验证码发送,开始倒计时
			getCode() {
				if (!this.user.phone) {
					this.$u.toast('请输入手机号');
					return;
				}
				if (!/^1[3456789]\d{9}$/.test(this.user.phone)) {
					this.$u.toast('请输入正确的手机号');
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					//发送验证码
					this.sendSms();
					uni.hideLoading();
					this.$refs.uCode.start();
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			
			//提交信息
			submit() {
				if (!this.user.phone) {
					this.$u.toast('请输入手机号');
					return;
				}
				if (!/^1[3456789]\d{9}$/.test(this.user.phone)) {
					this.$u.toast('请输入正确的手机号');
					return;
				}
				if (!this.verifycode) {
					this.$u.toast('请输入验证码');
					return;
				}
				//校验验证码
				this.verify();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 600rpx;
		margin: auto;
		margin-top: 100rpx;
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