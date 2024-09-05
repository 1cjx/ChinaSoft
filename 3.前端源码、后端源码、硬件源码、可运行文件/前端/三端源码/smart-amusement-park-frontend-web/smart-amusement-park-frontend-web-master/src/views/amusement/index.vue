<template>
	<div class="app-container">
		<el-row :gutter="20">
			<el-col :span="24" :xs="24">
				<el-form ref="queryForm" :model="queryParams" :inline="true" label-width="96px">

					<el-form-item label="游乐设施名称" prop="name">
						<el-input v-model="queryParams.name" placeholder="请输入游乐设施名称" clearable size="small"
							@keyup.enter.native="handleQuery" />
					</el-form-item>
					<el-form-item label="类型" prop="gender">
						<el-select v-model="queryParams.type" placeholder="请选择类型" clearable size="small"
							@keyup.enter.native="handleQuery">
              <el-option
                v-for="(item, idx) in type_options"
                :key="idx"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
					</el-form-item>
					<el-form-item label="适合人群" prop="gender">
						<el-select v-model="queryParams.crowdType" placeholder="请选择适合人群" clearable size="small"
							@keyup.enter.native="handleQuery">
              <el-option
                v-for="(item, idx) in crowdType_options"
                :key="idx"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
					</el-form-item>
						<el-button type="primary" icon="el-icon-search" style="margin-top:4px" size="small" @click="handleQuery">搜索</el-button>
				</el-form>
				<el-row :gutter="10">
					<el-col :span="1.5">
						<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openAddRoute()">添加设施</el-button>
					</el-col>


					<el-col :span="1.5">
						<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
							@click="handleDelete">删除</el-button>
					</el-col>
				</el-row>

				<el-table :data="routeList" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading"
					element-loading-text="数据正在加载中...">
					<el-table-column type="selection" width="55" fixed />
					<el-table-column prop="id" label="id" align="center" width="50" :show-overflow-tooltip="false" />
					<el-table-column prop="name" label="设施名称" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="longitude" label="经度" align="center" width="100" :show-overflow-tooltip="false" />
					<el-table-column prop="latitude" label="纬度" align="center" width="100" :show-overflow-tooltip="false" />
					<el-table-column prop="type" label="类型" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="crowdType" label="适合人群" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="startTime" label="开放时间" align="center" width="100" :show-overflow-tooltip="false" />
					<el-table-column prop="closeTime" label="关闭时间" align="center" width="100" :show-overflow-tooltip="false" />
					<el-table-column prop="introduction" label="介绍" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="instruction" label="须知" align="center" :show-overflow-tooltip="true" />
					<el-table-column v-if="0" prop="imageUrls" label="图片" align="center" :show-overflow-tooltip="true" />
					<el-table-column v-if="0" prop="expectTime" label="单次游玩时间" align="center" :show-overflow-tooltip="true" />
					<el-table-column v-if="0" prop="perUserCount" label="单次最大容纳人数" align="center" :show-overflow-tooltip="true" />
					<el-table-column label="操作" align="center" width="160" class-name="small-padding fixed-width">
						<template slot-scope="scope">
							<el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
							<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<el-pagination :page-size.sync="queryParams.pageSize" layout="total, sizes, prev, pager, next, jumper"
			:total="total" :page-sizes="[10, 20, 30, 40]" :current-page.sync="queryParams.pageNum" @current-change="getList"
			@size-change="getList" />
		<!-- 添加或修改参数配置对话框 -->


		<!-- 修改 -->
		<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :before-close="cancel">
			<el-form ref="form" :model="form" :rules="rules" label-width="120px">
				<el-row>
					<el-col :span="16">
						<el-form-item label="设施名称" prop="name">
							<el-input v-model="form.name" placeholder="设施名称" maxlength="30" />
						</el-form-item>
            <el-form-item label="经纬度" prop="address">
              <div style="height:250px;width:100%;">
              <el-amap ref="map" vid="amapDemo" :events="events" :center="center" :zoom="zoom">
                <el-amap-marker :position="center" key="100"></el-amap-marker>
              </el-amap>
              </div>
            </el-form-item>
						<el-form-item label="经度" prop="longitude">
							<el-input v-model="form.longitude" placeholder="经度" maxlength="30" @change="refresh" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						</el-form-item>
						<el-form-item label="纬度" prop="latitude">
							<el-input v-model="form.latitude" placeholder="纬度" maxlength="30" @change="refresh" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-checkbox-group style="
												display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;"
												 v-model="form.type">
								<el-checkbox v-for="(t,i) in type_options" :label="t"
									:key="i">{{t}}</el-checkbox>
							</el-checkbox-group>
            </el-form-item>
						<el-form-item label="适合人群" prop="crowdType">
							<el-checkbox-group style="
												display: flex;
                        flex-flow: column nowrap;
                        align-items: flex-start;"
												 v-model="form.crowdType">
								<el-checkbox v-for="(t,i) in crowdType_options" :label="t"
									:key="i">{{t}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
            <el-form-item label="开始时间" prop="startTime">
              <el-time-picker
                v-model="form.startTime"
                format = 'HH:mm' value-format = 'HH:mm:ss' placeholder="选择开始时间"
                />
            </el-form-item>
            <el-form-item label="结束时间" prop="closeTime">
              <el-time-picker
                v-model="form.closeTime"
                format = 'HH:mm' value-format = 'HH:mm:ss' placeholder="选择结束时间"
                />
            </el-form-item>
						<el-form-item label="单次游玩时间" prop="expectTime">
							<el-input v-model="form.expectTime" placeholder="单次游玩时间" maxlength="30" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						</el-form-item>
						<el-form-item label="单次游玩人数" prop="perUserCount">
							<el-input v-model="form.perUserCount" placeholder="单次游玩人数" maxlength="30" onkeyup="value=value.replace(/[^\d.]/g,'')" />
						</el-form-item>
						<el-form-item label="介绍" prop="introduction">
							<el-input v-model="form.introduction" placeholder="输入介绍" maxlength="100" />
						</el-form-item>
						<el-form-item label="游玩须知" prop="instruction">
							<el-input v-model="form.instruction" placeholder="输入游玩须知" maxlength="50" />
						</el-form-item>
						<el-form-item label="设施图片" prop="imgUrl">
							<el-upload class="upload-demo" action="" :http-request="uploadImage"
								:on-preview="handlePreview" :on-change="handleChangePic" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
								<el-button size="small" type="primary">点击上传</el-button>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm" :disabled="wait">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	// } from "@/api/utils/selectOptions";
	import {
    listFacilities,
		listRoute,
		getRoute,
		addRoute,
    uploadImg,
    updateRoute,
		delRoute
	} from '@/api/amusement';
import { MessageBox, Message } from 'element-ui'
	export default {
		name: "Route",
		data() {
      const _this = this;
			return {
        zoom: 18,
        center: [106.513089, 29.667352],
        events: {
          click(e) {
            _this.center = [e.lnglat.lng, e.lnglat.lat];
            _this.form.longitude = e.lnglat.lng;
            _this.form.latitude = e.lnglat.lat;
            // _this.getAddress(_this.center);
            // _this.defaultValue = "";
          },
        },
        type_options: [],
        crowdType_options: [],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 20,
					name: undefined,
          type: undefined,
          crowdType: undefined
				},
				showMoreQuery: false,
				multiple: true,
				// 是否显示弹出层
				open: false,
				// 是否弹出批量插入
				openAdd: false,
				openImportRecordDetail: false,
				//上传文件列表
				fileList: [],
				//上传文件
				file: null,
				recordQueryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				recordTotal: 0,
				// 表单校验
				rules: {
          // 名称不为空
					name: [{
							required: true,
							message: "设施名称不能为空!",
							trigger: "blur"
					}],
					longitude: [{
							required: true,
							message: "经度不能为空!",
							trigger: "blur"
					}],
					latitude: [{
							required: true,
							message: "纬度不能为空!",
							trigger: "blur"
					}],
          // 途径点个数>=2
          checkedFacilities: [{
            required: true,
            validator: (rule, value, callback)=>{
              if(value.length < 2){
                callback(new Error("至少选择两个途径点!"));
              }else{
                callback();
              }
            },
            trigger: "blur"
          }],
					startTime: [{
							required: true,
							message: "开始时间不能为空!",
							trigger: "blur"
					}],
					closeTime: [{
							required: true,
							message: "结束时间不能为空!",
							trigger: "blur"
					}],
					expectTime: [{
							required: true,
							message: "单次就餐时间不能为空!",
							trigger: "blur"
					}],
					perUserCount: [{
							required: true,
							message: "单次游玩人数不能为空!",
							trigger: "blur"
					}],
					introduction: [{
							required: true,
							message: "介绍不能为空!",
							trigger: "blur"
					}],
					instruction: [{
							required: true,
							message: "游玩须知不能为空!",
							trigger: "blur"
					}],
          // 如果是新路线则需要图片
          imgUrl: [{
            required: true,
            validator: (rule, value, callback)=>{
              if(this.form.imgUrl === ''){
                callback(new Error("新设施请上传图片!"));
              }else{
                this.$refs['form'].clearValidate('imgUrl');
                callback();
              }
            },
            trigger: "blur"
          }]
				},
				// 显示搜索条件
				showSearch: true,
				// 遮罩层
				loading: true,
				// 用户表格数据
				routeList: null,
				// 总条数
				total: 0,
				// 选中数组
				ids: [],
				// 表单参数
				form: {
					name: "",
          longitude: 106.513089,
          latitude: 29.667352,
          type: [],
          crowdType: [],
          startTime: null,
          closeTime: null,
          introduction: '',
          instruction: '',
          expectTime: null,
          perUserCount: null,
          imageUrls: [],
				},
				allFacilities: [],
				title: null,
        wait: false
			};
		},
		watch: {},
		created() {
			this.loading = true;
      this.getFacilities();
			this.getList();
		},
		methods: {
      refresh() {
        this.center = [this.form.longitude, this.form.latitude];
      },
      getFacilities() {
        listFacilities().then((res) => {
					this.allFacilities = res.data;
          this.allFacilities.forEach(item=>{
            item.type.split('/').forEach(x=>this.type_options.push(x));
            item.crowdType.split('/').forEach(x=>this.crowdType_options.push(x));
          });
          this.type_options = this.type_options.filter((value, index, array)=>{return array.indexOf(value) === index;});
          this.crowdType_options = this.crowdType_options.filter((value, index, array)=>{return array.indexOf(value) === index;});
          this.type_options.sort();
          this.crowdType_options.sort();
        });
      },
			/** 搜索按钮操作 */
			handleQuery() {
				this.queryParams.pageNum = 1;
				this.getList();
			},
			// 多选框选中数据
			handleSelectionChange(selection) {
				this.ids = selection.map((item) => item.id);
				this.single = selection.length !== 1;
				this.multiple = !selection.length;
			},
			// 取消按钮
			cancel() {
				this.open = false;
				this.reset();
			},
			/** 查询用户列表 */
			getList() {
				// this.routeList = [{id:1,name:'112',imgUrl:'1234'}]
				// this.loading = false;
        listRoute(this.queryParams).then((res) => {
          this.routeList = res.data;
          this.total = this.routeList.length;
          this.loading = false;
        });
			},

      handleRemove(file, fileList) {
        const N = this.fileList.length;
        for(let i=0; i<N; i++) {
          if(this.fileList[i].url === file.url){
            this.fileList = this.fileList.slice(0, i).concat(this.fileList.slice(i+1));
            this.form.imageUrls = this.form.imageUrls.slice(0, i).concat(this.form.imageUrls.slice(i+1));
            break;
          }
        }
      },
      handleChangePic(file,fileList){
        // if(fileList.length > 1){
        //   fileList.splice(0, 1);
        // }
      },
      handlePreview() {
      },
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids;
				{
					this.form = {
            id: id,
            name: row.name,
            longitude: row.longitude,
            latitude: row.latitude,
            type: row.type.split('/'),
            crowdType: row.crowdType.split('/'),
            startTime: row.startTime,
            closeTime: row.closeTime,
            introduction: row.introduction,
            instruction: row.instruction,
            expectTime: row.expectTime,
            perUserCount: row.perUserCount,
            imageUrls: row.imageUrls
          };
          this.refresh();
          // this.form.type.forEach(item=>{
          //   this.form.type.push(item.id);
          // });
          // this.form.crowdType.swiperList.forEach(item=>{
          //   this.form.crowdType.push(item.id);
          // });
          this.title = "修改设施信息"
          this.form.imageUrls.forEach(imgUrl=>{
            this.fileList.push({
              'url': imgUrl
            })
          });
					this.open = true;
				}
			},
			// 表单重置
			reset() {
				this.form = {
					name: "",
          longitude: 106.513089,
          latitude: 29.667352,
          type: [],
          crowdType: [],
          startTime: null,
          closeTime: null,
          introduction: '',
          instruction: '',
          expectTime: null,
          perUserCount: null,
          imageUrls: [],
				};
        this.fileList = [];
        // console.log(this.$refs['form']);
        try{
          this.$refs['form'].clearValidate();
        }catch(err){}
        this.wait = false;
			},
			//打开新增用户窗口
			openAddRoute() {
        this.reset();
				this.open = true;
				this.title = '新增设施';
			},
			/** 删除按钮操作 */
			handleDelete(row) {
				const ids = (row.id && [row.id]) || this.ids;
				const tempIds = ids.length > 2 ? ids[0] + ", " + ids[1] + " 等..." : ids;
        let index = ids.length - 1;
				MessageBox
					.confirm('是否确认删除编号为 "' + tempIds + '" 的数据项？')
          .then(async ()=>{
            let result = await delRoute(ids[index]);
            while(index > 0){
              index -= 1;
              result = await delRoute(ids[index]);
            }
          }).then(()=>{
              this.getList();
              Message({
                message: "删除成功",
                type: "success",
                duration: 5 * 1000
              });
          })
          .catch((e) => {
            if (e == "error") this.getList();
          });
			},
      /** 上传图片 */
      uploadImage(file) {
        uploadImg(file).then((res)=>{
          if(res.code == 200){
            this.form.imageUrls.push(res.data);
            this.$refs['form'].clearValidate('imgUrl');
          }else{
            Message({
              message: "上传图片失败",
              type: "error",
              duration: 5 * 1000
            });
          }
        });
      },
			/** 提交按钮 */
			submitForm: function() {
        // console.log(this.form);
        this.wait = true;
				this.$refs["form"].validate((valid) => {
					if (valid) {
						if (this.form.id !== undefined) {
							updateRoute(this.form).then((res) => {
                Message({
                  message: "修改成功!",
                  type: "success",
                  duration: 5 * 1000
                });
								this.open = false;
								this.getList();
                this.$refs["form"].clearValidate();
							}).finally(()=>{
                  this.wait = false;
              });
						} else {
							addRoute(this.form).then((res) => {
                Message({
                  message: "新增成功!",
                  type: "success",
                  duration: 5 * 1000
                });
								this.open = false;
								this.getList();
                this.$refs["form"].clearValidate();
							}).finally(()=>{
                  this.wait = false;
              });
						}
					}else{
            this.wait = false;
          }
				});
			},
		},
	};
</script>

<style>
</style>
