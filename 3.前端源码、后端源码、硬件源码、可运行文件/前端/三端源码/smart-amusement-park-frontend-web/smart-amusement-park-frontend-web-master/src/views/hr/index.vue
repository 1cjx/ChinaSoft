<template>
	<div class="app-container">
		<el-row :gutter="20">
			<el-col :span="24" :xs="24">
				<el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">

					<el-form-item label="姓名" prop="name">
						<el-input v-model="queryParams.name" placeholder="请输入姓名" clearable size="small"
							@keyup.enter.native="handleQuery" />
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-select v-model="queryParams.gender" placeholder="请选择性别" clearable size="small"
							@keyup.enter.native="handleQuery">
              <el-option
                v-for="(item, idx) in gender_options"
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
						<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openAddRoute()">添加管理员</el-button>
					</el-col>


					<el-col :span="1.5">
						<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple"
							@click="handleDelete">删除</el-button>
					</el-col>
				</el-row>

				<el-table :data="routeList" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading"
					element-loading-text="数据正在加载中...">
					<el-table-column type="selection" width="55" fixed />
					<el-table-column prop="id" label="id" align="center" width="155" :show-overflow-tooltip="false" />
					<el-table-column prop="name" label="姓名" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="age" label="年龄" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="gender" label="性别" align="center" :show-overflow-tooltip="true" />
					<el-table-column prop="phone" label="手机号" align="center" :show-overflow-tooltip="true" />
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
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名" prop="name">
							<el-input v-model="form.name" placeholder="请输入姓名" maxlength="30" />
						</el-form-item>
						<el-form-item label="手机号" prop="phone">
							<el-input v-model="form.phone" placeholder="请输入手机号" maxlength="30" />
						</el-form-item>
						<el-form-item label="年龄" prop="age">
                <el-input type="text" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="form.age" placeholder="请输入年龄"/>
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-radio v-model="form.gender" label="男">男</el-radio>
              <el-radio v-model="form.gender" label="女">女</el-radio>
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
		listEmployee,
		getEmployee,
		addEmployee,
    updateEmployee,
		delEmployee
	} from '@/api/hr'
import { MessageBox, Message } from 'element-ui'
	export default {
		name: "Route",
		data() {
			return {
        gender_options: ['男', '女'],
				// 查询参数
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					name: undefined,
          gender: undefined
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
							message: "姓名不能为空!",
							trigger: "blur"
					}],
          // 手机号不为空
					phone: [{
							required: true,
							message: "手机号不能为空!",
							trigger: "blur"
					}],
          // 年龄不为空
					age: [{
							required: true,
							message: "年龄不能为空!",
							trigger: "blur"
					}],
					gender: [{
							required: true,
							message: "性别不能为空!",
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
          name: null,
          age: null,
          gender: null,
          phone: null
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
      getFacilities() {
        listFacilities().then((res) => {
					this.allFacilities = res.data;
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
        listEmployee(this.queryParams).then((res) => {
          this.routeList = res.data;
          this.total = this.routeList.length;
          this.loading = false;
        });
			},

      // handleRemove() {
      //   this.form.imgUrl = '';
      // },
      // handleChangePic(file,fileList){
      //   if(fileList.length > 1){
      //     fileList.splice(0, 1);
      //   }
      // },
      // handlePreview() {
      // },
			/** 修改按钮操作 */
			handleUpdate(row) {
				this.reset();
				const id = row.id || this.ids;
				{
          // res = res[0]
					this.form = {
            id: id,
            name: row.name,
            age: row.age,
            gender: row.gender,
            phone: row.phone
          };
          // res.data[0].swiperList.forEach(item=>{
          //   this.form.checkedFacilities.push(item.id);
          // });
          this.title = "修改管理员信息"
          // this.fileList.push({
          //   'url': this.form.imgUrl
          // })
					this.open = true;
				}
			},
			// 表单重置
			reset() {
        this.form = {
          name: null,
          age: null,
          gender: null,
          phone: null
        };
        // this.fileList = [];
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
				this.title = '新增管理员';
			},
			/** 删除按钮操作 */
			handleDelete(row) {
				const ids = (row.id && [row.id]) || this.ids;
				const tempIds = ids.length > 2 ? ids[0] + ", " + ids[1] + " 等..." : ids;
        let index = ids.length - 1;
				MessageBox
					.confirm('是否确认删除编号为 "' + tempIds + '" 的数据项？')
          .then(async ()=>{
            let result = await delEmployee(ids[index]);
            while(index > 0){
              index -= 1;
              result = await delEmployee(ids[index]);
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
      // /** 上传图片 */
      // uploadImage(file) {
      //   uploadImg(file).then((res)=>{
      //     if(res.code == 200){
      //       this.form.imgUrl = res.data;
      //       this.$refs['form'].clearValidate('imgUrl');
      //     }else{
      //       Message({
      //         message: "上传图片失败",
      //         type: "error",
      //         duration: 5 * 1000
      //       });
      //     }
      //   });
      // },
			/** 提交按钮 */
			submitForm: function() {
        this.wait = true;
				this.$refs["form"].validate((valid) => {
					if (valid) {
						if (this.form.id !== undefined) {
							updateEmployee(this.form).then((res) => {
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
							addEmployee(this.form).then((res) => {
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
