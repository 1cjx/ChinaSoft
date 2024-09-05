<template>
	<view :style="style_window">
	<view class="bg" :style="style_window"/>
	<view style="height: 5%; text-align: center; padding-top: 5px; padding-bottom: 10px; margin-bottom: 10px; background-color: rgba(8,159,255, 0.9); color: white;">
		<h1 style="display: inline-block;">今日游园情况</h1>
		<div style="right: 10px;position: absolute; display: inline-block; height: inherit; vertical-align: middle;">
			<view style="display: inline-block; line-height: 43px; font-size: 1.2em; font-weight: bold;">
				{{(new Date()).getFullYear() + ' 年 ' + ((new Date()).getMonth() + 1) + ' 月 ' + (new Date()).getDate() + ' 日 '}}&nbsp;
				{{['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][(new Date()).getDay()] + ' '}}&nbsp;
				{{ timeofnow }}
			</view>
		</div>
	</view>
	<view style="height: 83%;">
	<view class="left">
		<view class="unit1"><uni-card class="card-wrapper"/>
			<view class="unit1-1">今日游玩人数</view>
			<view class="unit1-2">{{totUserCount}}</view>
		</view>
		<view class="unit2"><uni-card class="card-wrapper"/>
			<view class="unit2-1">今日游乐设施排行榜</view>
			<view class="unit2-2">
				<uni-table border emptyText="暂无">
					<uni-tr class="unit-2-2-1">
						<uni-th :style="table_line_height" class="unit-2-2-1-left" width="5" align="center">排名</uni-th>
						<uni-th width="50" align="center">设施名称</uni-th>
						<uni-th class="unit-2-2-1-right" width="50" align="center">游玩人数</uni-th>
					</uni-tr>
					<uni-tr class="unit-2-2-1" v-for="(item, idx) in facilityRank">
						<uni-td :style="table_line_height" class="unit-2-2-1-left" align="center">{{idx+1}}</uni-td>
						<uni-td align="center">{{item.name}}</uni-td>
						<uni-td class="unit-2-2-1-right" align="center">{{item.count}}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</view>
	<view class="middle">
		<view class="unit3"><uni-card class="card-wrapper"/>
			<view class="unit3-1">
				今日游乐设施实时拥挤度
			</view>
			<view class="unit3-2">
				<qiun-data-charts 
					type="column"
					:opts="opts_unit3"
					:chartData="chartData_unit3"
				/>
			</view>
		</view>
		<view class="unit4"><uni-card class="card-wrapper"/>
			<view class="unit4-1">
				推荐路线选择情况
				<qiun-data-charts 
					type="rose"
					:opts="opts_unit4_1"
					:chartData="chartData_unit4_1"
					 class="unit4-1-2"
				/>
			</view>
			<view class="unit4-2">
				游乐设施打卡情况
				<qiun-data-charts 
					type="pie"
					:opts="opts_unit4_2"
					:chartData="chartData_unit4_2"
					 class="unit4-2-2"
				/>
			</view>
		</view>
	</view>
	<view class="right">
		<view class="unit5"><uni-card class="card-wrapper"/>
			<view class="unit5-1">
				游乐设施拥挤度变化曲线
			</view>
			<view class="unit5-2">
				<qiun-data-charts 
					type="line"
					:opts="opts_unit5"
					:chartData="chartData_unit5"
				/>
			</view>
		</view>
		<view class="unit6"><uni-card class="card-wrapper"/>
			游乐场地地图及当前位置<br/>
			<view class="unit6-1"><image :src="map" style="height: 100%;width: 90%;"/></view>
		</view>
	</view>
	</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
		chartData_unit3: {},
		opts_unit3: {
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc","#0624ea","#fff700"],
			padding: [15,15,0,5],
			enableScroll: false,
			legend: {
				show: false,
				position: "bottom",
				lineHeight: 25,
			},
			xAxis: {
				disableGrid: true,
				fontSize: 11
			},
			yAxis: {
				showTitle: true,
				data: [
					{
						title: "预计排队等待时间(分钟)",
						min: 0,
						titleOffsetY: -8,
						titleOffsetX: 50
					}
				]
			},
			extra: {
				column: {
					type: "group",
					width: 30,
					meterBorde: 1,
					meterFillColor: "#FFFFFF",
					activeBgColor: "#000000",
					activeBgOpacity: 0.08,
					barBorderCircle: true,
					seriesGap: 2,
					categoryGap: 2,
					labelPosition: "outside",
					// linearType: "custom",
					// customColor: [
					//   "#FA7D8D",
					//   "#EB88E2"
					// ]
				}
			}
		},
		chartData_unit4_1: {},
		opts_unit4_1: {
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc","#0624ea","#fff700"],
			padding: [15,5,5,5],
			enableScroll: false,
			legend: {
				show: true,
				position: "bottom",
				lineHeight: 25
			},
			extra: {
				rose: {
					type: "radius",
					minRadius: 50,
					activeOpacity: 0.5,
					activeRadius: 10,
					offsetAngle: 0,
					labelWidth: 15,
					border: true,
					borderWidth: 2,
					borderColor: "#FFFFFF",
					linearType: "custom"
				}
			},
		},
		chartData_unit4_2: {},
		opts_unit4_2: {
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc","#0624ea","#fff700"],
			padding: [10,5,5,5],
			enableScroll: false,
			extra: {
				pie: {
					activeOpacity: 0.5,
					activeRadius: 10,
					offsetAngle: 0,
					labelWidth: 15,
					border: true,
					borderWidth: 3,
					borderColor: "#FFFFFF",
					linearType: "custom"
				}
			}
		},
		chartData_unit5: {},
		opts_unit5: {
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc","#0624ea","#fff700"],
			padding: [15,10,0,15],
			dataLabel: false,
			// dataPointShape: false,
			enableScroll: false,
			update: true,
			legend: {},
			xAxis: {
				disableGrid: true,
				showTitle: true,
				title: "时间(小时)",
				titleOffsetY: -20,
				titleOffsetX: -50
				// labelCount: 10
			},
			yAxis: {
				// disableGrid: true,
				gridType: "dash",
				dashLength: 3,
				showTitle: true,
				data: [
					{
						title: "预计排队等待时间(分钟)",
						min: 0,
						max: null,
						titleOffsetY: -8,
						titleOffsetX: 50
					}
				]
			},
			extra: {
				line: {
					type: "curve",
					// type: "straight",
					width: 2,
					activeType: "hollow",
					linearType: "custom",
				}
			}
		},
		totUserCount: 0,
		style_window: "",
		facilityRank: [
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
			{name: 'none', count: 0},
		],
		map: "/static/map3.png",
		API : "http://120.46.211.213:8888",
		// API: "http://192.168.1.59:8888",
		timeofnow: '',
		table_line_height: ''
    };
  },
  onReady() {
	this.flush_time();
	this.unit5_swiper();
	this.unit1_unit2_refresh();
	this.refresh();
	setInterval(()=>{this.refresh(true);}, 1000 * 1);
  },
  methods: {
	unit1_unit2_refresh() {
		const api = this.API;
		
		uni.request({
			url: api + "/statistics/headCount/total",
			method: "GET",
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					// unit1
					this.totUserCount = res_body.data;
				}else {
					console.log("获取数据失败");
				}
			}
		});
		
		uni.request({
			url: api + "/statistics/headCount/facility",
			method: "GET",
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					let facilities = res_body.data;
					// unit2
					this.facilityRank = [];
					facilities.forEach(item=>{
						this.facilityRank.push({
							name: item.facilityName,
							count: item.headCount
						});
					});
					this.facilityRank.sort((x,y)=>{
						return y.count - x.count;
					});
				}else {
					console.log("获取数据失败");
				}
			}
		});
		setTimeout(this.unit1_unit2_refresh, 1000 * 0.5);
	},
	unit5_repack() {
		// return;
		if(this.chartData_unit5.series){
			const std = ["8","9","10","11","12","13","14","15","16","17","18","19","20"];
			let N = this.chartData_unit5.series.length;
			let L = null, R = null;
			for(let i=0; i<N; i++){
				if(this.chartData_unit5.series[i].show){
					let maxValue = 0;
					let M = this.chartData_unit5.series[i].data.length;
					if(M < std.length){
						let tmp = [];
						for(let j=M; j<std.length; j++) tmp.push(null);
						this.chartData_unit5.series[i].data = tmp.concat(this.chartData_unit5.series[i].data);
						M = std.length;
					}
					for(let j=0; j<M; j++){
						if(this.chartData_unit5.series[i].data[j] != null){
							if(null == L) {L = j}
							R = j;
							maxValue = Math.max(maxValue, this.chartData_unit5.series[i].data[j]);
						}
					}
					maxValue = Math.round(maxValue + 10);
					while(maxValue % 10 != 0) maxValue++;
					this.opts_unit5.yAxis.data[0].max = maxValue;
					this.chartData_unit5.series[i].data = this.chartData_unit5.series[i].data.slice(L, M);
					break;
				}
			}
			if(L == null){
				this.unit5_swiper(true);
				return;
			}
			this.chartData_unit5.categories = std.slice(L, R+1);
		}
	},
	unit5_swiper(fl) {
		if(this.chartData_unit5.series){
			let N = this.chartData_unit5.series.length;
			for(let i=0; i<N; i++){
				if(this.chartData_unit5.series[i].show){
					this.chartData_unit5.series[i].show = false;
					this.chartData_unit5.series[(i+1)%N].show = true;
					if(i == N-1){
						this.refresh(false);
					}
					break;
				}
			}
			this.unit5_repack();
		}
		if(!fl) setTimeout(this.unit5_swiper, 1000 * 5);
	},
	refresh(ignore_unit5) {
		// console.log("flush");
		this.style_window = "";
		uni.getSystemInfo({
			success: (res)=>{
				this.style_window +="height:" + res.windowHeight + "px;";
				this.style_window +="width:" + res.windowWidth + "px;";
				this.table_line_height = "line-height:" + res.windowHeight*0.83*0.837/110 + 'px;';
			},
		});
		this.getServerData(ignore_unit5);
		// setTimeout(this.refresh, 1000 * 60);
	},
    getServerData(ignore_unit5) {
		// setTimeout(() => {
		// 	let res = {
		// 		categories: ["过山车","大摆锤","跳伞","蹦极","划船","旋转木马"],
		// 		series: [
		// 		  {
		// 			name: "设施名称",
		// 			data: [35,36,31,33,13,34]
		// 		  }
		// 		]
		// 	  };
		// 	this.chartData_unit3 = JSON.parse(JSON.stringify(res));
		// }, 0);
	  
		// setTimeout(() => {
		// 	let res = {
		// 		series: [
		// 		{
		// 		  data: [{"name":"路线1","value":50},{"name":"路线2","value":30},{"name":"路线3","value":20},{"name":"路线4","value":18},{"name":"路线5","value":8}]
		// 		}
		// 		]
		// 	};
		// 	this.chartData_unit4_1 = JSON.parse(JSON.stringify(res));
		// }, 0);
		
		// setTimeout(() => {
		// 	let res = {
		// 		series: [
		// 		  {
		// 			data: [{"name":"过山车","value":50},{"name":"大摆锤","value":30},{"name":"跳伞","value":20},{"name":"蹦极","value":18},{"name":"划船","value":8},{"name":"旋转木马","value":30}]
		// 		  }
		// 		]
		// 	  };
		// 	this.chartData_unit4_2 = JSON.parse(JSON.stringify(res));
		// }, 0);
		
		// setTimeout(() => {
		// 	let res = {
		// 		categories: ["8","9","10","11","12","13","14","15","16","17","18","19","20"],
		// 		series: [
		// 			{
		// 				name: "过山车",
		// 				lineType: "solid",
		// 				data: [35,8,25,37,4,20,28]
		// 			},
		// 			{
		// 				name: "大摆锤",
		// 				lineType: "solid",
		// 				data: [10,8,25,37,4,20,28]
		// 			},
		// 			{
		// 				name: "跳伞",
		// 				lineType: "solid",
		// 				data: [35,8,25,37,4,20,28]
		// 			},
		// 			{
		// 				name: "蹦极",
		// 				lineType: "solid",
		// 				data: [35,8,25,37,4,20,28]
		// 			}
		// 		]
		// 	};
		// 	this.chartData_unit5 = JSON.parse(JSON.stringify(res));
		// }, 0);
		
		const api = this.API;
		
		// 获取设施信息
		uni.request({
			url: api + "/filter/amusement",
			method: "POST",
			data: {},
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					let facilities = res_body.data;
					
					// unit3
					let payload = {
						categories: [],
						series: [
							{
								name: "设施名称",
								data: [],
							}
						]
					};
					facilities.forEach(item=>{
						if(item.expectWaitTime == 0) {return;}
						payload.categories.push(item.name);
						let data = {
							value: item.expectWaitTime,
							color: ["#06cb13", "#fabb56", "#fd4625"][Math.min(2, Math.floor(item.expectWaitTime / 30))]
						};
						payload.series[0].data.push(data);
					});
					this.chartData_unit3 = JSON.parse(JSON.stringify(payload));
					this.unit5_repack();
				}else{
					console.log("获取数据失败");
				}
			}
		});
		
		uni.request({
			url: api + "/statistics/route/useCount",
			method: "GET",
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					let route = res_body.data;
					// unit4_1
					let payload = {
						series: [
						{
						  data: []
						}
						]
					};
					route.forEach(item=>{
						payload.series[0].data.push({
							"name": item.name,
							"value": item.useCount
						});
					});
					this.chartData_unit4_1 = JSON.parse(JSON.stringify(payload));
				}else {
					console.log("获取数据失败");
				}
			}
		});
		
		uni.request({
			url: api + "/statistics/visit/count",
			method: "GET",
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					let route = res_body.data;
					// unit4_2
					let payload = {
						series: [
						{
						  data: []
						}
						]
					};
					route.forEach(item=>{
						payload.series[0].data.push({
							"name": item.facilityName,
							"value": item.visitCount
						});
					});
					this.chartData_unit4_2 = JSON.parse(JSON.stringify(payload));
				}else {
					console.log("获取数据失败");
				}
			}
		});
		
		if(!ignore_unit5)
		uni.request({
			url: api + "/statistics/crowingTimeCount",
			method: "GET",
			success: res=>{
				let res_body = res.data;
				if(res_body.code == 200){
					let facilities = res_body.data;
					// console.log(facilities);
					// unit5
					let payload = {
						categories: ["8","9","10","11","12","13","14","15","16","17","18","19","20"],
						series: []
					};
					facilities.forEach((item,idx)=>{
						let arr = [];
						let N = item.crowingTimeItemVOList.length;
						for(let i=0, j=8; i<N; i++){
							while(j < item.crowingTimeItemVOList[i].time){
								arr.push(null);
								j++;
							}
							arr.push(item.crowingTimeItemVOList[i].expectWaitTime);
							j++;
						}
						while(arr.length < payload.categories.length){
							arr.push(null);
						}
						payload.series.push({
							name: item.facilityName,
							lineType: "solid",
							show: false,
							data: arr
						});
						// console.log(item);
						// console.log(arr);
					});
					payload.series[0].show = true;
					this.chartData_unit5 = JSON.parse(JSON.stringify(payload));
					this.unit5_repack();
				}else {
					console.log("获取数据失败");
				}
			}
		});
    },
	flush_time() {
		var time = new Date();
		var h = time.getHours();
		h = h < 10 ? '0' + h : h;
		var m = time.getMinutes();
		m = m < 10 ? '0' + m : m;
		var s = time.getSeconds();
		s = s < 10 ? '0' + s : s;
		this.timeofnow = h + ':' + m + ':' + s;
		setTimeout(this.flush_time, 900);
	}
  }
};
</script>

<style scoped>
	.card-wrapper{
		display: none;
		position:absolute;
		left: inherit;
		top: inherit;
		height: inherit;
		width: inherit;
		z-index: -1;
	}
	::-webkit-scrollbar {
		width: 0 !important;
	}
	::-webkit-scrollbar {
		width: 0 !important;height: 0;
	}
	*{
		z-index: 1;
	}
	.bg {
		position: absolute;
		background: url("https://bpic.588ku.com/back_pic/06/16/52/5762f1da942e758.jpg");
		background: url("https://img.zcool.cn/community/0103af604736da11013ef90fd84004.jpg@1280w_1l_2o_100sh.jpg");
		background-repeat:no-repeat;
		background-size:cover;
		z-index: -1 !important;
		opacity: 0.2;
		display: none;
	}
	body{
		/* background: url("/static/map.png"); */
		color: black;
		filter:alpha(opacity=40);
	}
	view {
		/* border: solid red 1px; */
	}
	.left, .middle, .right {
		/* border: solid blue 1px; */
		vertical-align: top;
		display: inline-block;
		height: 100%;
	}
	.left {
		width: 25%;
	}
	.middle {
		width: 39%;
	}
	.right {
		width: 34%;
	}
	
	.left .card-wrapper {
		width: 25%;
	}
	.middle .card-wrapper {
		width: 39%;
	}
	.right .card-wrapper {
		width: 34%;
	}
	
	.unit1, .unit2, .unit3, .unit4, .unit5, .unit6 {
		border-radius: 10px;
		border: groove rgba(236, 236, 236, 0.8) 1px;
		/* border-style: groove; */
		background-color: rgba(244, 244, 244, 0.8);
		box-shadow: 0 0 10px 1px #e4f7f5;
		margin: 10px;
		z-index: 1;
	}
	.unit1:hover, .unit2:hover, .unit3:hover, .unit4:hover, .unit5:hover, .unit6:hover {
		/* border: solid red; */
	}
	
	.unit1 {
		height: 22%;
	}
	.unit1-1 {
		text-align: center;
		vertical-align: middle;
		padding-top: 3%;
		height: 20%;
		font: 1.8em sans-serif;
	}
	.unit1-2 {
		color: red;
		text-align: center;
		vertical-align: middle;
		padding-top: 4%;
		height: 40%;
		font: 4em sans-serif;
	}
	
	.unit2 {
		height: 83.7%;
	}
	.unit2-1 {
		text-align: center;
		vertical-align: middle;
		padding-top: 6%;
		height: 10%;
		font: 1.8em sans-serif;
	}
	.unit2-2 {
		text-align: center;
		vertical-align: middle;
		height: 80%;
		/* font: 3em sans-serif; */
		padding-inline: 5%;
	}
	.unit-2-2-1 {
		/* background: url("/static/map.png"); */
		/* background-position: ; */
		/* background-color: rgb(153, 186, 152); */
	}
	.unit-2-2-1>*{
		/* line-height: 21px; */
		border-bottom: solid rgb(8,159,255) 2px;
	}
	::v-deep .uni-table {
		background-color:transparent;
		.uni-table-th{
			border-top: solid rgb(8,159,255) 2px;
		}
	}
	.unit-2-2-1-left {
		border-inline: solid rgb(8,159,255) 2px;
	}
	.unit-2-2-1-right {
		border-inline: solid rgb(8,159,255) 2px;
	}
	
	body, .unit-2-2-1{
		/* background-color: rgb(229,245,255); */
	}
	
	.unit3 {
		text-align: center;
		font: 1.8em sans-serif;
		height: 45%;
		padding-bottom: 5%;
	}
	.unit3-1 {
		height: 10%;
	}
	.unit3-2 {
		height: 90%;
		padding-top: 5%;
	}
	
	.unit4 {
		padding-top: 2%;
		height: 55%;
	}
	.unit4-1, .unit4-2 {
		text-align: center;
		font: 1.8em sans-serif;
		vertical-align: top;
		display: inline-block;
		width: 49.7%;
		height: 85%;
	}
	.unit4-1-2, .unit4-2-2 {
		padding-top: 5%;
	}
	
	.unit5 {
		text-align: center;
		font: 1.8em sans-serif;
		vertical-align: top;
		display: inline-block;
		width: 100%;
		height: 50%;
		padding-bottom: 6%;
	}
	.unit5-1 {
		height: 10%;
	}
	.unit5-2 {
		height: 90%;
		padding-top: 5%;
		padding-inline: 5%;
	}
	
	.unit6 {
		text-align: center;
		font: 1.8em sans-serif;
		vertical-align: top;
		display: inline-block;
		width: 100%;
		height: 46%;
		padding-bottom: 6%;
	}
	.unit6-1 {
		display: inline-block;
		text-align: center;
		margin-top: 2%;
		width: 60%;
		height: 95%;
		padding-inline: 5%;
	}
</style>