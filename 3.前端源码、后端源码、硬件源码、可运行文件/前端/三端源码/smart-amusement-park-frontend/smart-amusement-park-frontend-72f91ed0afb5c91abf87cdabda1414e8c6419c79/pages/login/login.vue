<!-- 开发者:池跃花 -->
<template>
	<view>
		<view class="img-a"> </view>
		<view class="login-view">
			<!-- 密码登录 -->
			<view class="login" v-if="this.type === 1">
				<u-form :model="user" :rules="rules" ref="form">
					<u-form-item label="手机号" left-icon="phone" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入手机号" v-model="user.phone">
						</u-input>
					</u-form-item>
					<!-- 密码 -->
					<u-form-item label="密码" left-icon="lock" label-width="180"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="password" placeholder="请输入密码" v-model="user.password"
							:password-icon="passwordIcon">
						</u-input>
					</u-form-item>
					<u-checkbox-group>
						<u-checkbox :checked="remember" v-model="remember" shape="circle" @change="checkboxChange"
							class="remember">记住密码</u-checkbox>
					</u-checkbox-group>
					<button @click="login1()" class="button_login">登 录</button>
				</u-form>
			</view>
			
			<!-- 验证码登录 -->
			<view class="login" v-else>
				<u-form :model="user" :rules="rules" ref="form">
					<u-form-item label="手机号" left-icon="phone" label-width="160"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入手机号" v-model="user.phone">
						</u-input>
					</u-form-item>
					<!-- 验证码 -->
					<u-form-item label="验证码" left-icon="error-circle" label-width="160"
						:label-style="{'font-size':'32rpx','font-weight':'bold'}">
						<u-input type="text" placeholder="请输入验证码" v-model="user.captcha">
						</u-input>
						<u-toast ref="uToast"></u-toast>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode"
							@change="codeChange"></u-verification-code>
						<u-button class="getcode" @tap="getCode">{{tips}}</u-button>
					</u-form-item>
					<button @click="login2()" class="button_login">登 录</button>
				</u-form>
			</view>
		</view>
		<view class="login2">
			<view class="bottom">
				<text class="bottom-left" @click="goCaptcha()">{{type === 1?'验证码登录':'密码登录'}}</text>
				<text class="bottom-right" @click="goRegister()">没有账号？去注册</text>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				passwordIcon: false,
				user: {
					phone: '',
					password: '',
					captcha: '',
				},
				rules: {
					phone: {
						rule: /^(1[3456789]\d{9})?$/, // 更严格地验证非空
						msg: function(rule, value, callback) {
							if (!value) {
								return '手机号不能为空';
							} else if (!rule.test(value)) {
								return '手机号格式错误';
							}
						}
					},
					password: {
						rule: /^[0-9a-zA-Z]{6,18}$/, // 更严格地验证密码格式
						msg: function(rule, value, callback) {
							if (!value) {
								return '密码不能为空';
							} else if (!rule.test(value)) {
								return '密码应该为6-18位';
							}
						}
					},
					captcha: {
						rule: /.+/,
						msg: "请输入验证码"
					}

				},
				remember: false,
				showError: false,
				errorCount: 0,
				lockoutTime: null, // 锁定时间 
				type: 1, // 1：密码登录；0：验证码登录
				message: '',
				tips: '',
				seconds: 60,
			};
		},
		
		onLoad() {
			this.ip = getApp().globalData.ip;
		},
		
		mounted() {
			if (this.type === 1) {
				const savedPhone = uni.getStorageSync('phone')
				const savedPassword = uni.getStorageSync('password')
				if (savedPhone && savedPassword) {
					this.user.phone = savedPhone
					this.user.password = savedPassword
					this.remember = true
				}
				if (savedPhone) {
					this.user.phone = savedPhone
					this.remember = false
				}
			} else {
				const savedPhone = uni.getStorageSync('phone')
				this.user.phone = savedPhone
			}
			const savedRemember = uni.getStorageSync('remember')
			this.remember = savedRemember
		},
		
		methods: {
			// 转换登录方式
			goCaptcha() {
				this.type = this.type === 1 ? 0 : 1;
			},
			
			//注册按钮点击
			goRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			
			/* ******************************密码登录****************************** */
			checkboxChange(e) {
				this.remember = e.value;
				// 如果取消记住密码，则清除本地缓存的密码  
				if (!this.remember) {
					const cachedUser = uni.getStorageSync('user');
					if (cachedUser) {
						delete cachedUser.password;
						cachedUser.remember = false;
						uni.removeStorageSync('user');
					}
				}
			},
			
			// 密码登录
			login1() {
				// 通过了表单校验才能进行后面的操作
				if (!this.validateForm()) {
					return;
				}
				if (this.remember) {
					uni.setStorageSync('phone', this.user.phone)
					uni.setStorageSync('password', this.user.password)
				} else {
					uni.setStorageSync('phone', this.user.phone)
					uni.removeStorageSync('password')
				}
				const currentTime = new Date().getTime();
				// 检查是否处于锁定时间
				if (this.lockoutTime && currentTime < this.lockoutTime) {
					this.showError = true;
					this.$u.toast("您已连续五次输入错误，请十分钟后重试")
					return;
				}
				uni.request({
					url: 'http://' + this.ip + '/user/login', 
					data: this.user,
					method: 'POST',
					success: (response) => {
						if (response.data.code * 1 == 200) {
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});
							uni.setStorageSync("user", response.data.data)
							uni.setStorageSync('remember', this.remember)
							const user = response.data.data;
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/home',
								});
							}, 500);
						} else {
							this.message = response.data.message
							this.$u.toast(this.message)
							this.showError = true;
							this.errorCount++;
							if (this.errorCount >= 5) {
								this.$u.toast("您已连续五次输入错误，请十分钟后重试")
								this.lockoutTime = currentTime + 10 * 60 * 1000; // 十分钟后的时间戳  
							}
						}
					},
					fail: (error) => {
						this.$u.toast("登录请求失败，请检查网络或稍后重试");
					}
				})
			},
			
			/* ******************************验证码登录****************************** */
			codeChange(text) {
				this.tips = text;
			},
			// 获取验证码
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
							if (response.data.code * 1 == 200) {
								this.$u.toast("验证码已发送") // 提示框
								this.$refs.uCode.start();
							} else {
								this.$u.toast("验证码发送失败,请稍后重试") // 提示框
							}
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
				this.$u.toast('倒计时开始');
			},
			
			// 验证码登录
			login2() {
				if (this.validateForm()) {
					uni.request({
						url: 'http://' + this.ip + '/user/loginByPhone',
						data: {
							phone: this.user.phone,
							code: this.user.captcha
						},
						method: 'POST',
						success: (response) => {
							if (response.data.code * 1 == 200) {
								uni.showToast({
									title: '登录成功',
									icon: 'success'
								});
								uni.setStorageSync("phone", response.data.data.phone)
								uni.setStorageSync("user", response.data.data)
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/home/home',
									});
								}, 300);
							} else {
								this.message = response.data.message
								this.$u.toast(this.message);
							}
						},
						fail: (error) => {
							this.$u.toast("登录请求失败，请检查网络或稍后重试");
						}
					})
				}
			},
			
			// 校验手机号
			validatePhone() {
				const phoneRule = this.rules.phone;
				if (!phoneRule.rule.test(this.user.phone)) {
					this.$u.toast(phoneRule.msg);
					return false;
				}
				return true;
			},
			
			// 校验表单
			validateForm() {
				const fieldNames = {
					phone: '手机号',
					password: '密码',
					captcha: '验证码'
				};
				const fieldsToValidate = this.type === 1 ? ['phone', 'password'] : ['phone', 'captcha'];
				for (let key of fieldsToValidate) {
					const rule = this.rules[key];
					const value = this.user[key];
					if (value === '') {
						this.$u.toast(`${fieldNames[key]}不能为空`);
						return false;
					} else if (!rule.rule.test(value)) {
						if (typeof rule.msg === 'function') {
							this.$u.toast(rule.msg(rule.rule, value));
						} else {
							this.$u.toast(rule.msg);
						}
						return false;
					}
				}
				return true;
			},
		}
	};
</script>
<style>
	.img-a {
		width: 100%;
		height: 450rpx;
		background: rgba(255, 255, 255, 0.5) url(https://img.zcool.cn/community/01e8f65531b00a0000003cce95fe2b.jpg@1280w_1l_2o_100sh.jpg);
		background-size: 100%;
	}

	.remember {
		padding-top: 20px;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -40rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 12%;
	}

	.login2 {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 5%;
	}

	.button_login {
		font-size: 28rpx;
		background: #2bc7f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		border: none;
		margin-top: 10%;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #43A2FE;
		font-size: 28rpx;
		
	}
</style>
