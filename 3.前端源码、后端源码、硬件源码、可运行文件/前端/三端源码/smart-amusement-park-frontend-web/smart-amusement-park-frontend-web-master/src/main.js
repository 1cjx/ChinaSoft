import Vue from 'vue'; // 只导入一次Vue
import App from './App.vue'; // 导入App组件
import router from './router'; // 导入路由配置
import store from './store'; // 导入状态管理配置
import '@/icons'; // 导入项目图标
import '@/permission'; // 导入权限控制
import '@/styles/index.scss'; // 导入全局样式

// 导入Element UI及样式，如果不需要请注释掉
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用ElementUI组件库，如果需要的话
Vue.use(ElementUI);

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// Vue.use(ElementPlusIconsVue)

// 如果需要设置ElementUI的国际化语言，确保已经正确导入了locale对象
// 并且在Vue.use(ElementUI)之后设置
// 注意：这里假设您已经有一个正确配置的locale对象
// 如果不需要国际化，可以注释掉下面这行代码
// import locale from 'element-ui/lib/locale/lang/en';
// Vue.use(ElementUI, { locale });

// 创建和挂载根实例
// 注意：确保只创建一次实例，并且不要重复挂载
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

// 移除生产环境下的MockJs相关代码，确保在发布前移除
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

// 禁止生产环境下的启动提示
Vue.config.productionTip = false;

// 注意：以下代码段是重复的实例创建，应该删除
// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })

import VueAMap from "vue-amap";
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "f99d166075840e06818144db8151a707",//高德开放平台申请的key值
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.Geolocation", //定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder", // 逆地理编码,通过经纬度获取地址所在位置详细信息
    // 根据需求选用
  ],
  uiVersion: "1.0", // 地图ui版本
  v: "1.4.4", // amap版本
});
