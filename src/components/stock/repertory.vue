<template>
	<!-- 外围div -->
	<div style="background-color: white;padding: 20px;">
		<!-- 头部 -->
		<div style="text-align: center;border-bottom: 1px dotted lightgray;">
			<h2>其他出库单</h2>
			<span style="color: #00000073;margin-left: 80%;">
				单据编号：
				<span style="color: #000000D9;">
					CK202203290001
				</span>
			</span>
		</div>
		<!-- 左 -->
		<div style="margin-top: 10px;padding: 20px;float: left;">
			仓库:
			<el-select v-model="value" placeholder="选择仓库">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>

			&nbsp;&nbsp;&nbsp;

			出库类型:
			<el-select v-model="value" placeholder="选择出库类型">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>
		<!-- 右 -->
		<div style="margin-top: 10px;padding: 20px;float: right;">
			经手人:
			<el-select v-model="value" placeholder="选择经手人">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>

			&nbsp;&nbsp;&nbsp;

			业务日期:
			<el-select v-model="value" placeholder="选择日期">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
		</div>

		<!-- 表格 -->
		<el-table :data="tableData" border
			:header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
			:cell-style="{ textAlign: 'center' }">
			<el-table-column prop="date" label="序号" min-width="21%" />
			<el-table-column prop="date" label="商品名称" min-width="150%">
				<el-input @click="selectGoodsDialog=true" placeholder="选择商品" />
			</el-table-column>
			<el-table-column prop="name" label="规格/属性" />
			<el-table-column prop="name" label="单位" />
			<el-table-column prop="name" label="数量" />
			<el-table-column prop="name" label="备注" />
			<el-table-column prop="name" label="操作" min-width="40%">
				<el-button type="text">删除</el-button>
				<el-button type="text">添加</el-button>
			</el-table-column>
		</el-table>

		<!-- 选择商品 对话框 -->
		<el-dialog width="80%" v-model="selectGoodsDialog" title="选择商品">
			<div style="float: right;">
				<!-- 商品分类 -->
				<el-select v-model="value" placeholder="选择商品分类">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
				&nbsp;&nbsp;
				<!-- 商品名称搜索 -->
				<el-input style="width: 200px;" placeholder="商品名称" />
				&nbsp;&nbsp;
				<el-button type="primary" >搜索</el-button>

			</div>
			<br /><br />

			<el-table :data="tableData" border
				:header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
				:cell-style="{ textAlign: 'center' }">
				<el-table-column prop="date" label="序号" min-width="25%" />
				<el-table-column type="selection" min-width="25%" />
				<el-table-column prop="date" label="商品名称" min-width="150%">
					<el-input @click="selectGoodsDialog=true" placeholder="选择商品" />
				</el-table-column>
				<el-table-column prop="name" label="规格/属性" />
				<el-table-column prop="name" label="单位" />
				<el-table-column prop="name" label="参考进货价" />
				<el-table-column prop="name" label="实际库存" />
			</el-table>
			<!-- 分页 -->
			<br />
			<div style="float: right;">
				<el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
					v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count="5" background
					@size-change="selectInvoiceByName" @current-change="selectInvoiceByName">
				</el-pagination>
			</div>
			<br />
			<template #footer>
				<div style="text-align: center;">
					<el-button @click="selectGoodsDialog = false">取消</el-button>
					<el-button type="primary" @click="selectGoodsDialog = false">确认选择</el-button>
				</div>
			</template>
		</el-dialog>


		<!-- <el-input v-model="input3" class="w-50 m-2" placeholder="大大">
			<template #suffix>
				<el-icon class="el-input__icon">
					<el-search />
				</el-icon>
			</template>
		</el-input>
		a<i-edit />
		b<i class="i-icon-edit"></i> -->




	</div>
	<br />
	<div  style="background-color: white;padding: 20px;">
		备注；<br /><br />
		<el-input :rows="2" type="textarea" placeholder="请输入备注信息" />
	</div>

	<!-- <div style="width: 100%;height: 10%;bottom: 0px;border: 1px solid #666;box-shadow: 2px 2px 10px 5px #F63;">
		aaa
	</div> -->

</template>

<script>
	// import { Calendar, Search } from '@element-plus/icons-vue'
	import {
		ElMessage
	} from 'element-plus'

	export default {
		data() {
			return {
				// 选择商品 对话框
				selectGoodsDialog: false,
				// 分页
				pageInfo: {
					// 分页参数
					currentPage: 1, //当前页
					pageSize: 3, // 页大小
					total: 0, // 总页数
				},

				tableData: [{
						date: '1',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '2',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '3',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
					{
						date: '4',
						name: 'Tom',
						address: 'No. 189, Grove St, Los Angeles',
					},
				]

			}
		},
		methods: {


		},
		created() {

		}
	}
</script>

<style>

	body{
		/*background-color: gray;*/
	}

</style>
