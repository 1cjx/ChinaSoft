(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-infochange-phonechange-phonechange"],{"66d9":function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uForm:n("3af0").default,uFormItem:n("ad27").default,uInput:n("b9c7").default,uToast:n("b5fb").default,uVerificationCode:n("3c83").default,uButton:n("0e47").default},s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"wrap"},[n("u-form",[n("u-form-item",{attrs:{label:"手机号","label-width":"180","label-style":{"font-size":"32rpx"}}},[n("u-input",{attrs:{type:"text",placeholder:"请输入手机号"},model:{value:t.user.phone,callback:function(e){t.$set(t.user,"phone",e)},expression:"user.phone"}})],1),n("u-form-item",{attrs:{label:"验证码","label-width":"180","label-style":{"font-size":"32rpx"}}},[n("u-input",{attrs:{type:"text",placeholder:"请输入验证码"},model:{value:t.verifycode,callback:function(e){t.verifycode=e},expression:"verifycode"}}),n("u-toast",{ref:"uToast"}),n("u-verification-code",{ref:"uCode",attrs:{seconds:t.seconds},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.codeChange.apply(void 0,arguments)}}}),n("u-button",{staticClass:"verigybutton",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.tips))])],1)],1),n("u-button",{staticClass:"submitbutton",attrs:{type:"primary",plain:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.submit()}}},[t._v("提交")])],1)},i=[]},7122:function(t,e,n){"use strict";n.r(e);var a=n("8412"),s=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=s.a},8412:function(t,e,n){"use strict";n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("ac1f"),n("00b4");var a={data:function(){return{user:{},verifycode:"",tips:"",seconds:60}},onLoad:function(){this.ip=getApp().globalData.ip},onShow:function(){var t=uni.getStorageSync("user");this.user.phone=t.phone,this.user.id=t.id},methods:{codeChange:function(t){this.tips=t},sendSms:function(){var t=this;uni.request({url:"http://"+this.ip+"/sms/sendSms",data:{phone:this.user.phone},method:"POST",success:function(e){1*e.data.code==200?t.$u.toast("验证码已发送"):t.$u.toast("验证码发送失败,请稍后重试")}})},infochange:function(){var t=this;uni.request({url:"http://"+this.ip+"/user/update",data:this.user,method:"POST",success:function(e){if(1*e.data.code==200)t.user=e.data.data,uni.setStorageSync("user",t.user),setTimeout((function(){t.$u.toast("手机号修改成功")}),100),uni.navigateBack({});else{var n=e.data.message;t.$u.toast(n)}}})},verify:function(){var t=this;uni.request({url:"http://"+this.ip+"/user/loginByPhone",data:{phone:this.user.phone,code:this.verifycode},method:"POST",success:function(e){1*e.data.code==200?t.infochange():t.$u.toast(e.data.message)}})},getCode:function(){this.user.phone?/^1[3456789]\d{9}$/.test(this.user.phone)?this.$refs.uCode.canGetCode?(this.sendSms(),uni.hideLoading(),this.$refs.uCode.start()):this.$u.toast("倒计时结束后再发送"):this.$u.toast("请输入正确的手机号"):this.$u.toast("请输入手机号")},submit:function(){this.user.phone?/^1[3456789]\d{9}$/.test(this.user.phone)?this.verifycode?this.verify():this.$u.toast("请输入验证码"):this.$u.toast("请输入正确的手机号"):this.$u.toast("请输入手机号")}}};e.default=a},"9bba":function(t,e,n){var a=n("d0a6");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var s=n("4f06").default;s("4d1d4db8",a,!0,{sourceMap:!1,shadowMode:!1})},bc44:function(t,e,n){"use strict";n.r(e);var a=n("66d9"),s=n("7122");for(var i in s)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return s[t]}))}(i);n("d72d");var o=n("f0c5"),u=Object(o["a"])(s["default"],a["b"],a["c"],!1,null,"5fe4a20f",null,!1,a["a"],void 0);e["default"]=u.exports},d0a6:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.wrap[data-v-5fe4a20f]{width:%?600?%;margin:auto;margin-top:%?100?%}.form[data-v-5fe4a20f]{border:1px solid #656565;padding:0 10px;padding-right:3px;height:%?90?%}.verigybutton[data-v-5fe4a20f]{width:%?170?%;height:%?80?%;margin-top:%?5?%;color:#fff;background-color:#089fff}.submitbutton[data-v-5fe4a20f]{margin-top:%?70?%;width:%?200?%}',""]),t.exports=e},d72d:function(t,e,n){"use strict";var a=n("9bba"),s=n.n(a);s.a}}]);