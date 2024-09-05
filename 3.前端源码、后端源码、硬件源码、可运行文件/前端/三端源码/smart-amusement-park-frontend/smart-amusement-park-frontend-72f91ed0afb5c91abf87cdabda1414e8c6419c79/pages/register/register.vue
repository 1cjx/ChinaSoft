<!-- 开发者:池跃花 -->
<template>
	<view style="height:100vh;background: #fff;">
		<view class="img-a"></view>
		<view class="register_view">
			<view class="register">
				<u-form :model="user" :rules="rules" @submit.native.prevent="submit">
					<!-- 手机号 -->
					<u-form-item label="手机号" left-icon="phone" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入手机号" v-model="user.phone">
						</u-input>
					</u-form-item>
					<!-- 验证码 -->
					<u-form-item label="验证码" left-icon="error-circle" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入验证码" v-model="user.captcha">
						</u-input>
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"
							@change="codeChange"></u-verification-code>
						<u-button class="getcode" @tap="getCode">{{tips}}</u-button>
					</u-form-item>
					<!-- 昵称/用户名 -->
					<u-form-item label="昵称" left-icon="plus-circle" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入昵称" v-model="user.username">
						</u-input>
					</u-form-item>
					<!-- 密码 -->
					<u-form-item label="密码" left-icon="lock" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="password" placeholder="请输入密码" v-model="user.password">
						</u-input>
					</u-form-item>
					<!-- 确认密码 -->
					<u-form-item label="确认密码" left-icon="lock-fill" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="password" placeholder="请再输入一次密码" v-model="user.checkPassword">
						</u-input>
					</u-form-item>
					<!-- 提交注册按钮 -->
					<button @click="submit()" class="button_submit">立 即 注 册</button>
				</u-form>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: {
					phone: '',
					captcha: '',
					username: '',
					password: '',
					checkPassword: '',
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /^1[3456789]\d{9}$/,
							message: '手机号格式不正确，请重新输入',
							trigger: 'blur'
						}
					],
					captcha: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 8,
							max: 16,
							message: '密码长度应在8到16位之间',
							trigger: 'blur'
						}
					],
					checkPassword: [{
							required: true,
							message: '请再次输入密码',
							trigger: 'blur'
						},
						{
							validator: this.checkPassword,
							trigger: 'blur'
						}
					]
				},
				message: '',
				tips: '',
				seconds: 60
			}
		},

		onLoad() {
			this.ip = getApp().globalData.ip;
		},

		methods: {
			// 验证码
			codeChange(text) {
				this.tips = text;
			},
			
			getCode() {
				if (!this.validatePhone()) {
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					uni.request({
						url: 'http://' + this.ip + '/sms/sendSms',
						data: {
							phone: this.user.phone
						},
						method: 'POST',
						success: (response) => {
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 2000);
						},
						fail: (error) => {
							uni.showToast({
								title: '请求失败，请检查您的网络',
								icon: 'none'
							});
						}
					});
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			
			end() {
				this.$u.toast('倒计时结束');
			},
			
			start() {
				this.$u.toast('验证码已发送');
			},
			
			// 手机号校验
			validatePhone() {
				const phoneRules = this.rules.phone;
				for (let i = 0; i < phoneRules.length; i++) {
					const rule = phoneRules[i];
					if (rule.required && !this.user.phone) {
						this.$u.toast(rule.message);
						return false;
					}
					if (rule.pattern && !rule.pattern.test(this.user.phone)) {
						this.$u.toast(rule.message);
						return false;
					}
				}
				return true;
			},
			
			// 表单校验
			validateForm() {
				for (let key in this.rules) {
					const fieldRules = this.rules[key];
					for (let i = 0; i < fieldRules.length; i++) {
						const rule = fieldRules[i];
						if (rule.required && !this.user[key]) {
							this.$u.toast(rule.message);
							return false;
						}
						if (rule.pattern && !rule.pattern.test(this.user[key])) {
							this.$u.toast(rule.message);
							return false;
						}
					}
				}
				return true;
			},
			
			//注册按钮操作
			submit() {
				if (this.validateForm()) {
					if (this.user.password !== this.user.checkPassword) {
						uni.showToast({
							title: '两次输入的密码不一致',
							icon: 'none'
						});
						return false; // 阻止提交 
					}
					uni.request({
						url: 'http://' + this.ip + '/user/registerByPhone',
						data: {
							phone: this.user.phone,
							code: this.user.captcha
						},
						method: 'POST',
						success: (response) => {
							if (response.data.code * 1 == 200) {
								uni.showToast({
									title: '注册成功',
									icon: 'success'
								});
								uni.setStorageSync("phone", this.user.phone)
								setTimeout(() => {
									uni.reLaunch({
										url: ("/pages/login/login")
									});
								}, 2000);
							} else {
								this.message = response.data.message
								this.$u.toast(this.message)
							}
						},
						fail: (error) => {
							uni.showToast({
								title: '请求失败，请检查您的网络',
								icon: 'none'
							});
						}
					});
				}
			}
			
		}
	};
</script>
<style>
	.register_view {
		width: 100%;
		position: relative;
		margin-top: -60rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}
	
	.register {
		width: 620rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 8%;
		padding-bottom: 8%;
	}

	.img-a {
		width: 100%;
		height: 450rpx;
		background-image: url(https://img.zcool.cn/community/01232a5d73858aa8012060be297844.png@1280w_1l_2o_100sh.png);
		background-size: 100%;
	}

	.button_submit {
		font-size: 28rpx;
		background: #f2aba6;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		margin-top: 10%;
	}

</style>
