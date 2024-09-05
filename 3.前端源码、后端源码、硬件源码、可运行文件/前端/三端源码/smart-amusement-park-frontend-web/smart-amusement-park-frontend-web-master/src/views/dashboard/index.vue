<template>
<div style="width: 100%;height:93.5vh">
	<el-row :gutter="20" style="background-color: #ffffff;height:100%;">
    <el-col :span="8">
		<!-- 首页user信息 -->
			<el-row :gutter="20" :style="fullheight">
				<el-col>
					<el-card shadow='hover' class="unit1">
							<div class="block" style="height: 100%;">
								<el-avatar :size="100" :src="userInfo.avatarUrl" style="margin-left: 20px;margin-top: 25px"></el-avatar>
								<div class="unit1-1">
									<span class="important-font">姓名:{{userInfo.name}}</span><br/>
									<span class="important-font">性别:{{userInfo.gender}}</span><br/>
									<span class="important-font">年龄:{{userInfo.age}}</span><br/>
									<span class="important-font">手机号:{{userInfo.phone}}</span>
                  <br/>
								</div>
							</div>
							<div style="margin-top:5%; text-align: center;">
								<span >欢迎进入游乐园智慧助手管理系统!</span>
							</div>
					</el-card>
				</el-col>
        <el-col>
          <el-card shadow='hover' class="unit2">
            <div class="unit2-1">今日游乐设施排行榜</div>
            <div class="unit2-2">
              <table class="unit2-2-table" border="0px" emptyText="暂无" :style="'height:'+(height*0.75-225)+'px;'">
                <tr class="unit-2-2-1">
                  <th class="unit2-2-th unit-2-2-1-left" width="50" height="30" align="center">排名</th>
                  <th class="unit2-2-th" width="200" align="center">设施名称</th>
                  <th class="unit2-2-th unit-2-2-1-right" width="100" align="center">游玩人数</th>
                </tr>
                <tr class="unit-2-2-1" v-for="(item, idx) in facilityRank">
                  <td class="unit-2-2-1-left" height="30" align="center">{{idx+1}}</td>
                  <td align="center">{{item.name}}</td>
                  <td class="unit-2-2-1-right" align="center">{{item.count}}</td>
                </tr>
              </table>
            </div>
          </el-card>
        </el-col>
			</el-row>
    </el-col>
    <el-col :span="15">
      <el-row :gutter="20" :style="fullheight">
        <el-col>
        	<el-card shadow='hover' class="unit3">
            <div class="unit3-0">
              <div class="unit3-1">
                今日游乐设施实时拥挤度
              </div>
              <div class="unit3-2" :style="'height:'+height*0.4+'px;'">
                <qiun-vue-ucharts
                  type="column"
                  :opts="opts_unit3"
                  :chartData="chartData_unit3"
                />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col>
        	<el-card shadow='hover' class="unit4">
            <div class="unit4-0">
              <div class="unit4-1">
                游乐园每日游玩人数变化
              </div>
              <div class="unit4-2" :style="'height:'+height*0.315+'px;'">
                <qiun-vue-ucharts
                  type="line"
                  :opts="opts_unit4"
                  :chartData="chartData_unit4"
                />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
	</el-row>
</div>
</template>

<script>
import qiunVueUcharts from '@qiun/vue-ucharts'
import { mapGetters } from 'vuex'
import {
  getRankList,
  getFacilities,
  getUserCount
} from '@/api/dashboard'

export default {
  name: "Index",
  components: {
    qiunVueUcharts
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    var that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.height = window.fullHeight;  // 高
        that.fullheight = "height: " + that.height + "px;";
        window.fullWidth = document.documentElement.clientWidth;
        // that.windowWidth = window.fullWidth; // 宽
      })()
    }
  },
  data() {
    return {
      height: document.documentElement.clientHeight,
      fullheight: '',
			circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
			imgurl:'',
			dataarry:[],
			namearry:[],
			infoList:null,
			userInfo:{
				name:'',
				avatar:'',
				department:'',
				role:''
			},
      chartData_unit3: {},
      opts_unit3: {
        color: ["#ffffff","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc","#0624ea","#fff700"],
        padding: [15,15,0,5],
        enableScroll: false,
        fontSize: 15,
        update: true,
        legend: {
          show: true,
          position: "bottom",
          titleOffsetX: 1000
        },
        xAxis: {
          disableGrid: true,
          fontSize: 15
        },
        yAxis: {
          showTitle: true,
          data: [
            {
              title: "预计排队等待时间/分钟",
              min: 0,
              titleOffsetY: -5,
              titleOffsetX: 90,
              titleFontSize: 14,
              fontSize: 13
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
      chartData_unit4: {},
      opts_unit4: {
        color: ["#91CB74","#ea7ccc","#1890FF","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4"],
        padding: [15,10,0,15],
        enableScroll: false,
        fontSize: 15,
        update: true,
        legend: {
          show: false
        },
        xAxis: {
          disableGrid: true,
          fontSize: 15
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2,
          showTitle: true,
          data: [
            {
              title: "人数/个",
              min: 0,
              titleOffsetY: -5,
              titleOffsetX: 30,
              titleFontSize: 14,
              fontSize: 13
            }
          ]
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow",
            linearType: "custom"
          }
        }
      },
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
        {name: 'none', count: 0},
      ],
    }
  },
	created(){
		this.getinformation()
	},
	methods:{
		getinformation(){
			this.userInfo = this.$store.getters.user;

      // unit2
      getRankList().then(res_body=>{
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
      });

      // unit3
      getFacilities().then(res_body=>{
        if(res_body.code == 200){
          let facilities = res_body.data;

          // unit3
          let payload = {
            categories: [],
            series: [
              {
                name: "",
                // name: "设施名称",
                data: [],
              }
            ]
          };
          facilities.forEach(item=>{
            if(item.expectWaitTime == 0) {return;}
            payload.categories.push(item.name);
            let data = {
              value: item.expectWaitTime,
              color: ["#06cb13", "#f9d505", "#fd4625"][Math.min(2, Math.floor(item.expectWaitTime / 30))]
            };
            payload.series[0].data.push(data);
          });
          this.chartData_unit3 = JSON.parse(JSON.stringify(payload));
        }else{
          console.log("获取数据失败");
        }
      });

      // unit4
      getUserCount().then(res_body=>{
        if(res_body.code == 200){
          let res = {
            categories: [],
            series: [{
                name: "游玩总人数",
                data: []
            }]
          };
          res_body.data.reverse();
          res_body.data.forEach(item=>{
            res.categories.push(item.createTime.substr(5));
            res.series[0].data.push(item.count);
          });
          this.chartData_unit4 = JSON.parse(JSON.stringify(res));
        }else{
          console.log("获取数据失败");
        }
      });
		},
  }
}
</script>

<style>
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
  .unit1, .unit2, .unit3, .unit4{
    /* border: none; */
    border-radius: 10px;
    height: 100%;
    width: 100%;
    margin: 15px;
  }
  .unit3, .unit4{
    margin-left: 30px;
  }
  .unit1{
    color: #4f4f4f;
    background: linear-gradient(to bottom left, #a1c4fd 0%, #c2e9fb 100%);
    font-weight: bold;
  }
  .unit1-1{
    line-height: 30px;;
    display: inline-block;
    height: 100%;
    vertical-align: text-bottom;
    margin-left: 15%;
  }
  .unit2{
    background: rgb(248, 248, 248);
    margin-top: 0px;
  }
	.unit2-1 {
    font-weight: bold;
		font-size: 1.2em;
		text-align: center;
		vertical-align: middle;
		/* padding-top: 6%; */
		height: 5%;
	}
	.unit2-2 {
		text-align: center;
		vertical-align: middle;
		height: 95%;
		/* font: 3em sans-serif; */
		padding: 5%;
    padding-bottom: 0px;
	}
	.unit-2-2-1 {
    line-height: 30px;
    font-size: 1.05em;
		/* background: url("/static/map.png"); */
		/* background-position: ; */
		/* background-color: rgb(153, 186, 152); */
	}
	.unit-2-2-1>*{
		/* border-bottom: solid rgb(0,198,251) 2px; */
	}
  .unit2-2-table{
    border-collapse: collapse;
  }
	.unit2-2-th{
    /* border-top: solid rgb(0,198,251) 2px; */
	}
	.unit-2-2-1-left {
    width: 23.5%;
		/* border-inline: solid rgb(0,198,251) 2px; */
	}
	.unit-2-2-1-right {
		/* border-inline: solid rgb(0,198,251) 2px; */
	}

	.unit3 {
    background: rgb(248, 248, 248);
		text-align: center;
		font: 1.2em sans-serif;
	}
  .unit3-0{
    height: 100%;
  }
	.unit3-1 {
    font-weight: bold;
	}
	.unit3-2 {
    height: 296px;
    margin-bottom: -28px;
	}

  .unit4{
    background: rgb(248, 248, 248);
    margin-top: 0px;
		text-align: center;
		font: 1.2em sans-serif;
  }
  .unit4-0{
    height: 100%;
  }
	.unit4-1 {
    font-weight: bold;
    padding-top: 0px;
    margin-bottom: 10px;
	}
	.unit4-2 {
    height: 250px;
    /* margin-bottom: -8%; */
	}

</style>
