(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-map-map"],{"01b2":function(t,e,i){"use strict";i.r(e);var a=i("9501"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"0600":function(t,e,i){"use strict";i.r(e);var a=i("67d7"),n=i("01b2");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("8f39");var o=i("f0c5"),c=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,"498ab782",null,!1,a["a"],void 0);e["default"]=c.exports},"367c":function(t,e,i){var a=i("b48a");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("64dddfae",a,!0,{sourceMap:!1,shadowMode:!1})},"67d7":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={uniDrawer:i("401b").default,uRadioGroup:i("c877").default,uRadio:i("6aed").default,uInput:i("b9c7").default,uButton:i("0e47").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[t.isSearching?t._e():i("v-uni-view",{staticClass:"top_icons"},[i("v-uni-view",{staticClass:"top_icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleSearch()}}},[i("v-uni-image",{staticClass:"ticon",attrs:{src:"/static/facilitylist/search.png"}}),i("v-uni-text",{staticClass:"icon-name"},[t._v("搜索")])],1),i("v-uni-view",{staticClass:"top_icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getAmusementData()}}},[i("v-uni-image",{staticClass:"ticon",attrs:{src:"amusement"==t.selectedFacilityType?"/static/facilitylist/rides_selected.png":"/static/facilitylist/rides.png"}}),i("v-uni-text",{staticClass:"icon-name"},[t._v("游乐设施")])],1),i("v-uni-view",{staticClass:"top_icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCateringData()}}},[i("v-uni-image",{staticClass:"ticon",attrs:{src:"catering"==t.selectedFacilityType?"/static/facilitylist/catering_selected.png":"/static/facilitylist/catering.png"}}),i("v-uni-text",{staticClass:"icon-name"},[t._v("餐饮")])],1),i("v-uni-view",{staticClass:"top_icon",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getBaseData()}}},[i("v-uni-image",{staticClass:"ticon",attrs:{src:"base"==t.selectedFacilityType?"/static/facilitylist/washroom_selected.png":"/static/facilitylist/washroom.png"}}),i("v-uni-text",{staticClass:"icon-name"},[t._v("卫生间")])],1)],1),t.isSearching?i("v-uni-view",{staticClass:"search_bar"},[i("v-uni-input",{staticClass:"search-input",attrs:{type:"text",placeholder:"搜索"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.search()}},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),i("v-uni-text",{staticClass:"cancel-text",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggleSearch.apply(void 0,arguments)}}},[t._v("取消")])],1):t._e(),i("v-uni-view",{staticClass:"map"},[i("v-uni-map",{staticStyle:{width:"100%",height:"86vh"},attrs:{id:"map","show-location":!0,latitude:t.latitude,longitude:t.longitude,markers:t.tempMarkers,scale:t.scale,polyline:t.polyline},on:{markertap:function(e){arguments[0]=e=t.$handleEvent(e),t.markertap.apply(void 0,arguments)},regionchange:function(e){arguments[0]=e=t.$handleEvent(e),t.scaleChange()}}})],1),i("v-uni-view",{staticClass:"right_icon_container"},[i("v-uni-view",{staticClass:"right_icon"},[i("v-uni-image",{staticClass:"ricon",attrs:{src:"/static/map/locate.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.locate()}}})],1),i("v-uni-view",{staticClass:"right_icon"},[i("v-uni-image",{staticClass:"ricon",attrs:{src:"/static/map/list.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.facilityList()}}})],1),"base"!=t.selectedFacilityType?i("v-uni-view",{staticClass:"right_icon"},[i("v-uni-image",{staticClass:"ricon",attrs:{src:"/static/map/filter.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.showDrawer("showLeft")}}}),i("uni-drawer",{ref:"showLeft",attrs:{mode:"left",width:320}},[i("v-uni-view",{staticClass:"condition_title"},[i("v-uni-text",[t._v("选择适合你的条件\\n")])],1),"amusement"===t.selectedFacilityType?i("v-uni-view",{staticClass:"conditions"},[i("v-uni-text",{staticClass:"condition"},[t._v("适合人群")]),i("v-uni-view",{staticClass:"options"},[i("u-radio-group",{model:{value:t.selectedCrowd,callback:function(e){t.selectedCrowd=e},expression:"selectedCrowd"}},t._l(t.crowd,(function(e,a){return i("u-radio",{key:a,attrs:{name:e.name,disabled:e.disabled}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-text",{staticClass:"condition"},[t._v("项目类型")]),i("v-uni-view",{staticClass:"options"},[i("u-radio-group",{model:{value:t.selectedActivity,callback:function(e){t.selectedActivity=e},expression:"selectedActivity"}},t._l(t.activity,(function(e,a){return i("u-radio",{key:a,attrs:{name:e.name,disabled:e.disabled}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-text",{staticClass:"condition"},[t._v("身高限制")]),i("v-uni-view",{staticClass:"height"},[i("u-input",{staticClass:"height_input",attrs:{type:"text",placeholder:"请输入您的身高"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.handleHeightInput.apply(void 0,arguments)}},model:{value:t.selectedHeight,callback:function(e){t.selectedHeight=e},expression:"selectedHeight"}}),i("u-radio-group",t._l(t.height,(function(e,a){return i("u-radio",{key:a,attrs:{name:e.name,disabled:e.disabled}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-view",{staticClass:"close"},[i("u-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmFilter("amusement")}}},[i("v-uni-text",{staticClass:"word-btn-white"},[t._v("确认筛选")])],1)],1)],1):"catering"===t.selectedFacilityType?i("v-uni-view",{staticClass:"conditions"},[i("v-uni-text",{staticClass:"condition"},[t._v("餐饮类型")]),i("v-uni-view",{staticClass:"options"},[i("u-radio-group",{model:{value:t.selectedCater,callback:function(e){t.selectedCater=e},expression:"selectedCater"}},t._l(t.cater,(function(e,a){return i("u-radio",{key:a,attrs:{name:e.name,disabled:e.disabled}},[t._v(t._s(e.name))])})),1)],1),i("v-uni-view",{staticClass:"close"},[i("u-button",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.confirmFilter("catering")}}},[i("v-uni-text",{staticClass:"word-btn-white"},[t._v("确认筛选")])],1)],1)],1):t._e()],1)],1):t._e()],1),i("v-uni-view",{staticClass:"bottom_icon"},[i("v-uni-image",{staticClass:"icon2",attrs:{src:"/static/map/recommendroute.png"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.recommend()}}})],1),t.showRecommendTarget?i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"line1"},[i("v-uni-view",[t._v("目标路线")])],1),i("v-uni-view",{staticClass:"line2"},[i("v-uni-view",[t._v("预计行走时间："+t._s(t.expectWalkTime)+"分钟")]),i("v-uni-view",[t._v("预计排队等待时长："+t._s(t.totalWaitTime)+"分钟")])],1)],1),i("v-uni-view",{staticClass:"btn-group"},[i("v-uni-view",{staticClass:"btn_position"},[i("u-button",{staticClass:"goback",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.gobackrecommend.apply(void 0,arguments)}}},[t._v("返回路线")]),i("u-button",{staticClass:"guide",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.guide1.apply(void 0,arguments)}}},[t._v("立即导航")])],1)],1)],1):t._e(),t.showTarget?i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"line1"},[i("v-uni-view",[t._v("目标路线")])],1),i("v-uni-view",{staticClass:"line2"},[i("v-uni-view",[t._v("预计行走时间："+t._s(t.expectWalkTime)+"分钟")]),i("v-uni-view",[t._v("预计排队等待时长："+t._s(t.totalWaitTime)+"分钟")])],1)],1),i("v-uni-view",{staticClass:"btn-group"},[i("v-uni-view",{staticClass:"btn_position"},[i("u-button",{staticClass:"goback",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.goback.apply(void 0,arguments)}}},[t._v("返回筛选")]),i("u-button",{staticClass:"guide",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.guide1.apply(void 0,arguments)}}},[t._v("立即导航")])],1)],1)],1):t._e(),t.showTime?i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"line3"},[i("v-uni-view",[t._v("总行走距离："+t._s(t.expectWalkDistance)+"米")])],1),i("v-uni-view",{staticClass:"line4"},[i("v-uni-view",[t._v("预计行走时间："+t._s(t.expectWalkTime)+"分钟")])],1)],1),i("v-uni-view",{staticClass:"btn-group"},[i("v-uni-view",{staticClass:"btn_position"},[i("u-button",{staticClass:"exit",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.exit.apply(void 0,arguments)}}},[t._v("退出")])],1)],1)],1):t._e(),t.showFacility?i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"facility_item"},[i("v-uni-image",{staticClass:"facility_image",attrs:{src:t.selectFacility.image}}),i("v-uni-view",[i("v-uni-view",{staticClass:"line1"},[t._v(t._s(t.selectFacility.name))]),i("v-uni-view",{staticClass:"line2"},[t._v("开放时间: "+t._s(t.selectFacility.startTime)+"~"+t._s(t.selectFacility.closeTime))])],1)],1),i("v-uni-view",{staticClass:"btn-group"},[i("v-uni-view",{staticClass:"btn_position"},[i("u-button",{staticClass:"goback",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.cancel.apply(void 0,arguments)}}},[t._v("取消")]),i("u-button",{staticClass:"guide",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.guide2()}}},[t._v("立即导航")])],1)],1)],1):t._e(),t.showSingle?i("v-uni-view",{staticClass:"popup"},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"line3"},[i("v-uni-view",[t._v(t._s(t.expectWalkDistance)+"米 预计"+t._s(t.expectWalkTime)+"分钟到达")])],1),i("v-uni-view",{staticClass:"line4"},[i("v-uni-view",[t._v(t._s(t.expectArriveTime)+"到达")])],1)],1),i("v-uni-view",{staticClass:"btn-group"},[i("v-uni-view",{staticClass:"btn_position"},[i("u-button",{staticClass:"exit",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.exit.apply(void 0,arguments)}}},[t._v("退出")])],1)],1)],1):t._e()],1)},s=[]},"8f39":function(t,e,i){"use strict";var a=i("367c"),n=i.n(a);n.a},9501:function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("c7eb")),s=a(i("1da1")),o=a(i("3835"));i("e9c4"),i("d3b7"),i("159b"),i("d81d"),i("14d9"),i("99af"),i("498a"),i("7db0"),i("4de4");var c=i("2ef0"),r={data:function(){return{keyword:"",selectedFacilityType:"amusement",showSingle:!1,showTarget:!1,showRecommendTarget:!1,showTime:!1,showFacility:!1,isSearching:!1,optimalPathData:"",expectWalkTime:0,totalWaitTime:0,expectWalkDistance:0,facilityId:0,facilityType:0,expectArriveTime:"",selectFacility:{name:"",image:"",startTime:"",closeTime:""},markers:[],tempMarkers:[],latitude:29.667259,longitude:106.516357,scale:15.75,zoomLevelOne:15.75,zoomLevelTow:18,zoomLevelThird:20,zoom:16,polyline:[{points:[],color:"#00aaff",width:5,dottedLine:!0}],minLatitude:29.664182547364334,maxLatitude:29.673709922412733,minLongitude:106.51199572814178,maxLongitude:106.52232223284912,facilityIcons:{0:"/static/map/position.png",1:"/static/map/cater_position.png",2:"/static/map/washroom_position.png"},showLeft:!1,selectedCrowd:"",selectedActivity:"",selectedHeight:"",selectedCater:"",crowd:[{name:"成人",disabled:!1},{name:"老少皆宜",disabled:!1},{name:"家长监护",disabled:!1}],activity:[{name:"轨道",disabled:!1},{name:"垂直",disabled:!1},{name:"高空",disabled:!1},{name:"水上",disabled:!1},{name:"室内",disabled:!1},{name:"旋转",disabled:!1},{name:"剧场",disabled:!1},{name:"失重",disabled:!1},{name:"过山车",disabled:!1},{name:"鬼屋",disabled:!1}],cater:[{name:"中式快餐",disabled:!1},{name:"西式快餐",disabled:!1},{name:"面点",disabled:!1},{name:"饮品",disabled:!1},{name:"小吃",disabled:!1}],height:[{name:"不限制",disabled:!1}]}},onLoad:function(t){this.ip=getApp().globalData.ip,this.mapContext=uni.createMapContext("map",this)},onShow:function(){this.reset();var t=uni.getStorageSync("facilities"),e=uni.getStorageSync("optimalPathData"),i=uni.getStorageSync("facility");""!=t?this.receiveRecommend():""!=e?this.receiveBest():""!=i?this.receiveDetail():this.getAmusementData()},watch:{zoom:function(t,e){var i=this.zoomLevelOne,a=this.zoomLevelTow;if(e<i&&t>=i&&t<a){var n=JSON.parse(JSON.stringify(this.markers));this.tempMarkers=[];var s=this;setTimeout((function(){s.tempMarkers=n}),1)}else if(e>=i&&e<a&&t>=a){if(!(this.showTarget||this.showTime||this.showSingle||this.showRecommendTarget||this.showFacility)){var o=JSON.parse(JSON.stringify(this.markers));o.forEach((function(t){t.callout.content="<strong>"+t.name+'</strong>\n<strong style="color:'+(t.expectWaitTime>30?t.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(t.expectWaitTime)+"</strong>分钟"}));var c=this;this.tempMarkers=[],setTimeout((function(){c.tempMarkers=o}),1)}}else if(e>=a&&t>=i&&t<a){var r=JSON.parse(JSON.stringify(this.markers));this.tempMarkers=[];var l=this;setTimeout((function(){l.tempMarkers=r}),1)}else(e>=i&&e<a&&t<i||t<i)&&(this.showTarget||this.showTime||this.showSingle||this.showRecommendTarget||(this.tempMarkers=[]))}},methods:{receiveRecommend:function(){var t=this,e=uni.getStorageSync("facilities"),i=uni.getStorageSync("locations"),a=uni.getStorageSync("routes");this.routes=a,uni.removeStorageSync("facilities");var n=29.667263,s=106.513215;uni.getLocation({type:"wgs84",isHighAccuracy:!0,success:function(a){a.latitude<t.minLatitude||a.latitude>t.maxLatitude||a.longitude<t.minLongitude||a.longitude>t.maxLongitude?(n=29.667263,s=106.513215):(n=a.latitude,s=a.longitude),uni.request({url:"http://"+t.ip+"/map/mulFacilityNav",method:"POST",data:{userLatitude:n,userLongitude:s,facilities:e},success:function(e){if(1*e.data.code===200){t.expectWalkTime=e.data.data.expectWalkTime,t.totalWaitTime=e.data.data.totalWaitTime,t.expectWalkDistance=e.data.data.expectWalkDistance,t.polyline=[{points:e.data.data.paths,color:"#00aaff",width:3,dottedLine:!0,borderWidth:4}],t.markers=i.map((function(t,e){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/position.png",rotate:0,width:30,height:35,alpha:.5,callout:{content:"<strong>"+(e+1)+"</strong>\n "+t.name,color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}}));var a={id:"user",latitude:n,longitude:s,iconPath:"/static/map/current_position.png",width:30,height:35};t.markers.push(a),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),t.showRecommendTarget=!0,t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})}})},receiveBest:function(){var t=this;this.reset();var e=uni.getStorageSync("optimalPathData");uni.removeStorageSync("optimalPathData");var i=29.667263,a=106.513215;uni.getLocation({type:"wgs84",isHighAccuracy:!0,success:function(n){n.latitude<t.minLatitude||n.latitude>t.maxLatitude||n.longitude<t.minLongitude||n.longitude>t.maxLongitude?(t.$u.toast("当前用户不在服务区，已移到服务区门口"),i=29.667263,a=106.513215):(i=n.latitude,a=n.longitude),uni.request({url:"http://"+t.ip+"/map/mulFacilityNav",method:"POST",data:{userLatitude:i,userLongitude:a,facilities:e},success:function(e){if(1*e.data.code===200){t.showTarget=!0,t.expectWalkTime=e.data.data.expectWalkTime,t.totalWaitTime=e.data.data.totalWaitTime,t.expectWalkDistance=e.data.data.expectWalkDistance,t.polyline=[{points:e.data.data.paths,color:"#00aaff",width:3,dottedLine:!0,borderWidth:4}],t.markers=e.data.data.facilities.map((function(e,i){return{id:e.id,latitude:e.latitude,longitude:e.longitude,iconPath:t.facilityIcons[e.facilityType],rotate:0,width:30,height:35,alpha:.5,callout:{content:"<strong>"+(i+1)+"</strong>\n "+e.name,color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}}));var n={id:"user",latitude:i,longitude:a,iconPath:"/static/map/current_position.png",width:30,height:35};t.markers.push(n),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})}})},receiveDetail:function(){var t=this,e=uni.getStorageSync("facility");uni.removeStorageSync("facility");uni.getLocation({type:"wgs84",isHighAccuracy:!0,success:function(e){e.latitude<t.minLatitude||e.latitude>t.maxLatitude||e.longitude<t.minLongitude||e.longitude>t.maxLongitude?(29.667263,106.513215):(e.latitude,e.longitude)}}),this.markers=[{id:e.id,latitude:e.latitude,longitude:e.longitude,iconPath:"/static/map/position.png",rotate:0,width:30,height:35,alpha:.5,name:e.name,expectWaitTime:e.waittime,startTime:e.starttime,closeTime:e.closetime,image:e.imageurl,facilityId:e.id,facilityType:e.facilityType,callout:{content:"<strong>"+e.name+'</strong>\n<strong style="color:'+(e.waittime>30?e.waittime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(e.waittime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}],this.tempMarkers=JSON.parse(JSON.stringify(this.markers)),this.showFacility=!0,this.selectFacility.image=e.imageurl,this.selectFacility.name=e.name,this.selectFacility.startTime=e.starttime,this.selectFacility.closeTime=e.closetime,this.selectFacility.facilityId=e.id,this.selectFacility.facilityType=e.facilityType,this.scale=20,this.latitude=e.latitude,this.longitude=e.longitude},parseTime:function(t){var e=t.split(":"),i=(0,o.default)(e,3),a=i[0],n=i[1];i[2];return"".concat(a,":").concat(n)},toggleSearch:function(){this.isSearching=!this.isSearching,this.isSearching||(this.keyword="",this.selectedFacilityType="",this.getAmusementData())},search:(0,c.debounce)((function(){var t=this;this.reset();var e=this.keyword.trim();""!==e?uni.request({url:"http://"+this.ip+"/search",method:"GET",data:{keyword:e},success:function(e){if(1*e.data.code===200){var i=e.data.data;t.markers=i.map((function(e){return{id:e.id,latitude:e.latitude,longitude:e.longitude,iconPath:t.facilityIcons[e.facilityType],rotate:0,width:30,height:35,alpha:.5,expectWaitTime:e.expectWaitTime,imageUrls:e.imageUrls[0],startTime:e.startTime,closeTime:e.closeTime,facilityType:e.facilityType,name:e.name,callout:{content:'<strong style="color:'+(e.expectWaitTime>30?e.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(e.expectWaitTime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}})),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),0==t.tempMarkers.length&&t.$u.toast("空空如也~"),t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}}):this.getAmusementData()}),500),getAmusementData:function(){var t=this;"amusement"!=this.selectedFacilityType&&(this.selectedFacilityType="amusement"),this.reset(),uni.request({url:"http://"+this.ip+"/filter/amusement",method:"POST",data:{id:null,name:"",type:"",height:null,crowd:""},success:function(e){if(1*e.data.code===200){var i=e.data.data;t.markers=i.map((function(t){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/position.png",rotate:0,width:30,height:35,alpha:.5,expectWaitTime:t.expectWaitTime,imageUrls:t.imageUrls[0],startTime:t.startTime,closeTime:t.closeTime,facilityType:t.facilityType,name:t.name,callout:{content:'<strong style="color:'+(t.expectWaitTime>30?t.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(t.expectWaitTime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}})),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})},getCateringData:function(){var t=this;this.selectedFacilityType="catering",this.tempMarkers=[],uni.request({url:"http://"+this.ip+"/filter/restaurant",method:"POST",data:{id:null,name:"",type:""},success:function(e){if(1*e.data.code===200){var i=e.data.data;t.markers=i.map((function(t){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/cater_position.png",rotate:0,width:30,height:35,alpha:.5,expectWaitTime:t.expectWaitTime,imageUrls:t.imageUrls[0],startTime:t.startTime,closeTime:t.closeTime,facilityType:t.facilityType,name:t.name,callout:{content:'<strong style="color:'+(t.expectWaitTime>30?t.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(t.expectWaitTime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}})),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})},getBaseData:function(){var t=this;this.selectedFacilityType="base",this.tempMarkers=[],uni.request({url:"http://"+this.ip+"/filter/base",method:"POST",data:{id:null,name:"",userId:""},success:function(e){if(1*e.data.code===200){var i=e.data.data;t.markers=i.map((function(t){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/washroom_position.png",rotate:0,width:30,height:35,alpha:.5,expectWaitTime:t.expectWaitTime,imageUrls:t.imageUrls[0],startTime:t.startTime,closeTime:t.closeTime,facilityType:t.facilityType,name:t.name,callout:{content:'<strong style="color:'+(t.expectWaitTime>30?t.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(t.expectWaitTime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}})),t.tempMarkers=JSON.parse(JSON.stringify(t.markers)),t.moveToPark()}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})},showDrawer:function(t){this.$refs[t].open()},closeDrawer:function(t){this.$refs[t].close()},confirmFilter:function(t){var e=this,i={};this.tempMarkers=[],this.closeDrawer("showLeft"),"amusement"===t?(i={type:this.selectedActivity,crowd:this.selectedCrowd,height:this.selectedHeight,cater:this.selectedCater},uni.request({url:"http://"+this.ip+"/filter/amusement",method:"POST",data:i,success:function(t){if(1*t.data.code===200){var i=t.data.data;e.markers=i.map((function(t){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/position.png",rotate:0,width:30,height:35,alpha:.5,expectWaitTime:t.expectWaitTime,imageUrls:t.imageUrls[0],startTime:t.startTime,closeTime:t.closeTime,facilityType:t.facilityType,name:t.name,callout:{content:'<strong style="color:'+(t.expectWaitTime>30?t.expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(t.expectWaitTime)+"</strong>分钟",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"ALWAYS"}}})),e.tempMarkers=JSON.parse(JSON.stringify(e.markers)),0==e.tempMarkers.length&&e.$u.toast("空空如也~")}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})):"catering"===t&&(this.tempMarkers=[],i={id:null,name:"",type:this.selectedCater},uni.request({url:"http://"+this.ip+"/filter/restaurant",method:"POST",data:i,success:function(t){if(1*t.data.code===200){var i=t.data.data;e.markers=i.map((function(t){return{id:t.id,latitude:t.latitude,longitude:t.longitude,iconPath:"/static/map/cater_position.png",rotate:0,width:30,height:35,alpha:.5,callout:{content:t.name,color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:" #ffffff",display:"BYCLICK"}}})),0==e.tempMarkers.length&&e.$u.toast("空空如也~"),e.tempMarkers=e.markers}},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}}))},handleHeightInput:(0,c.debounce)((function(){""!==this.selectedHeight?this.height=[{name:"不限制",disabled:!0}]:this.height=[{name:"不限制",disabled:!1}]}),500),facilityList:function(){uni.navigateTo({url:"/pages/facilitylist/facilitylist"})},locate:function(){var t=this;this.tempMarkers=[],uni.getLocation({type:"gcj02",success:function(e){t.latitude=29.667263,t.longitude=106.513215,t.scale=17,t.markers.push({id:0,latitude:29.667275,longitude:106.513172,iconPath:"/static/map/current_position.png",rotate:0,width:30,height:35,alpha:.5,callout:{content:"",color:"#000000",fontSize:14,borderRadius:15,borderWidth:"10",bgColor:"#ffffff",display:"BYCLICK"}}),t.tempMarkers=JSON.parse(JSON.stringify(t.markers))},fail:function(t){uni.showToast({title:"获取位置信息失败",icon:"none"})}})},recommend:function(){uni.navigateTo({url:"/pages/bestroute/bestroute"})},reset:function(){this.markers=[],this.tempMarkers=[],this.polyline=[],this.showTarget=!1,this.showRecommendTarget=!1},moveToPark:function(){var t=this.zoomLevelOne;this.setMapScale({latitude:"29.667259",longitude:"106.516357"},t)},setMapScale:function(t,e){var i=this;return(0,s.default)((0,n.default)().mark((function a(){var s;return(0,n.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return s=function(){return new Promise((function(t,e){i.mapContext.getScale({success:function(e){i.scale=e.scale,t()}})}))},a.next=3,s();case 3:i.mapContext.moveToLocation({longitude:t.longitude,latitude:t.latitude,success:function(a){var n=setTimeout((function(){i.longitude=t.longitude,i.latitude=t.latitude,i.scale=e,clearTimeout(n)}),500)}});case 4:case"end":return a.stop()}}),a)})))()},scaleChange:function(){var t=this;this.timer=setInterval((function(){t.mapContext.getScale({success:function(e){t.zoom=e.scale}})}),500)},markertap:function(t){var e=this.zoom<this.zoomLevelTow?this.zoomLevelTow:this.zoomLevelThird;this.setMapScale(t.detail,e);var i=this;setTimeout((function(){if(i.zoom>=20){i.showFacility=!0;var e=t.detail.markerId,a=i.markers.find((function(t){return t.id===e}));i.askSingle(a)}else i.showFacility=!1}),1e3)},askSingle:function(t){this.selectFacility.name=t.name,this.selectFacility.image=t.imageUrls,this.selectFacility.facilityId=t.id,this.selectFacility.startTime=this.parseTime(t.startTime),this.selectFacility.closeTime=this.parseTime(t.closeTime),this.selectFacility.facilityType=t.facilityType},guide1:function(){this.showTarget=!1,this.showRecommendTarget=!1,this.showFacility=!1,this.showSingle=!1,this.showTime=!0,this.locate()},guide2:function(){var t=this;this.showTarget=!1,this.markers=this.markers.filter((function(e){return e.id==t.selectFacility.facilityId})),this.markers[0].callout.content="<strong>"+this.markers[0].name+'</strong>\n<strong style="color:'+(this.markers[0].expectWaitTime>30?this.markers[0].expectWaitTime>60?"rgb(253,70,37)":"rgb(250,187,86)":"green")+'">'+String(this.markers[0].expectWaitTime)+"</strong>分钟",this.showRecommendTarget=!1,this.showFacility=!1,this.showTime=!1,this.showSingle=!0,this.locate(),this.singleGuide()},singleGuide:function(){var t=this;uni.request({url:"http://"+this.ip+"/map/sinFacilityNav",method:"POST",data:{userLatitude:29.667263,userLongitude:106.513215,facilityId:this.selectFacility.facilityId,facilityType:this.selectFacility.facilityType},success:function(e){1*e.data.code===200&&(t.expectWalkDistance=e.data.data.expectWalkDistance,t.expectWalkTime=e.data.data.expectWalkTime,t.expectArriveTime=e.data.data.expectArriveTime,t.polyline=[{points:e.data.data.paths,color:"#00aaff",width:3,dottedLine:!0,borderWidth:4}])},fail:function(t){uni.showToast({title:"请求失败，请检查您的网络",icon:"none"})}})},goback:function(){this.tempMarkers=[],uni.navigateTo({url:"/pages/bestroute/bestroute"})},gobackrecommend:function(){uni.navigateTo({url:"/pages/recommendroute/recommendroute?id="+this.routes[0].routeid+"&type="+this.routes[0].routetype})},exit:function(){this.showTarget=!1,this.showRecommendTarget=!1,this.showFacility=!1,this.showTime=!1,this.showSingle=!1,this.polyline=[{points:[],color:"#00aaff",width:3,dottedLine:!0,borderWidth:4}],this.tempMarkers=[],"amusement"==this.selectedFacilityType?this.getAmusementData():"catering"==this.selectedFacilityType?this.getCateringData():this.getBaseData(),this.moveToPark()},cancel:function(){this.showFacility=!1,this.showTarget=!1,this.showRecommendTarget=!1,this.showTime=!1,this.showSingle=!1,this.polyline=[{points:[],color:"#00aaff",width:3,dottedLine:!0,borderWidth:4}],this.tempMarkers=[],"amusement"==this.selectedFacilityType?this.getAmusementData():"catering"==this.selectedFacilityType?this.getCateringData():this.getBaseData(),this.moveToPark()}}};e.default=r},b48a:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".top_icons[data-v-498ab782]{display:flex;justify-content:space-between;align-items:center;background-color:#f8f8f8;position:fixed;top:40px;width:100%;z-index:1000}.top_icon[data-v-498ab782]{display:flex;justify-content:space-between;align-items:center;padding:5px 10px;margin:0 15px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center}.ticon[data-v-498ab782]{width:30px;height:30px;padding-top:5px;cursor:pointer}.icon-name[data-v-498ab782]{font-size:14px}.search_bar[data-v-498ab782]{display:flex;align-items:center;justify-content:space-between;padding:15px;background-color:#f8f8f8;position:fixed;top:40px;width:100%;z-index:1000}.search-input[data-v-498ab782]{flex:1;\n\t/* 占据剩余空间 */padding:5px;border-radius:10px;border:1px solid #ccc}.cancel-text[data-v-498ab782]{cursor:pointer;\n\t/* 显示点击效果 */font-size:14px;color:#007aff;\n\t/* 文本颜色 */margin-left:20px}uni-map[data-v-498ab782]{margin-top:60px;position:absolute;z-index:50}.right_icon_container[data-v-498ab782]{position:fixed;top:15%;right:20px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;\n\t/* height: 180px; */position:absolute;z-index:100}.right_icon[data-v-498ab782]{width:40px;height:35px;cursor:pointer;margin:10px 0;background-color:#fff;border-radius:50%;box-shadow:0 2px 5px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center}.ricon[data-v-498ab782]{width:80%;height:80%;padding-top:1px;cursor:pointer}.bottom_icon[data-v-498ab782]{position:fixed;top:75%;right:20px;height:130px;width:80px;height:80px;cursor:pointer;margin:5px 0;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:100}.icon2[data-v-498ab782]{width:80%;height:80%;cursor:pointer}.scroll-view[data-v-498ab782]{\nwidth:100%;height:100%;\nflex:1}\n\n/* 处理抽屉内容滚动 */.scroll-view-box[data-v-498ab782]{flex:1;position:absolute}.conditions[data-v-498ab782]{padding:15px}.condition_title[data-v-498ab782]{margin-top:80px;padding:0 15px;font-size:20px\n\t/* background-color: burlywood; */}.condition[data-v-498ab782]{font-size:16px}.options[data-v-498ab782]{margin:15px auto;padding-left:10px;border:1px solid #ccc;border-radius:5px}.height[data-v-498ab782]{margin:15px auto;font-size:16px;display:flex;align-items:center;justify-content:space-between}.height_input[data-v-498ab782]{flex:1;margin-right:10px;border:1px solid #ccc;border-radius:5px}.height_button[data-v-498ab782]{flex-shrink:0;margin-right:20% /* 防止按钮被压缩 */}.close[data-v-498ab782]{margin-top:10%;padding:0 5px}.popup[data-v-498ab782]{position:absolute;position:fixed;bottom:5%;left:0;width:100%;background-color:#fff;box-sizing:border-box;z-index:101}.facility_item[data-v-498ab782]{display:flex;align-items:center;padding:10px;background-color:#fff;border-radius:10px}.facility_image[data-v-498ab782]{width:80px;height:80px;border-radius:50%;margin-right:10px}.line1[data-v-498ab782]{font-size:18px;padding:%?20?%}.line2[data-v-498ab782]{padding:%?20?%;padding-bottom:12px;font-size:15px}.line3[data-v-498ab782]{font-size:18px;padding:%?20?%;margin-top:10px;display:flex;align-items:center;justify-content:center}.line4[data-v-498ab782]{padding:%?10?%;padding-bottom:12px;border-bottom:1px solid #ccc;font-size:17px;display:flex;align-items:center;justify-content:center}.btn_position[data-v-498ab782]{display:flex;width:100%;margin-bottom:10px}.goback[data-v-498ab782]{width:50%;text-align:center;padding:%?20?% 0;color:#519fe7}.guide[data-v-498ab782]{width:50%;background-color:#519fe7;text-align:center;padding:%?20?% 0;color:#fff}.exit[data-v-498ab782]{width:100%;text-align:center;padding:%?20?% 0}",""]),t.exports=e}}]);