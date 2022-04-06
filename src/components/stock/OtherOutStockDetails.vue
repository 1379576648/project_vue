
<!-- 其他出库单详情 -->

<template>
	<!-- 外围div -->
	<div style="background-color: white;padding: 20px;">
		<!-- 头部 -->
		<div style="text-align: center;border-bottom: 1px dotted lightgray;">
			<h2>其他出库单详情</h2>
			<span style="color: #00000073;margin-left: 80%;">
				单据编号：
				<span style="color: #000000D9;">
					{{ outStock.billId }}
				</span>
			</span>
		</div>
		<!-- 左 -->
		<div style="margin-top: 10px;padding: 20px;float: left;">
			仓库:{{ outStock.stockName }}
<!--			<el-select v-model="value" placeholder="选择仓库">-->
<!--				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />-->
<!--			</el-select>-->

			&nbsp;&nbsp;&nbsp;

			出库类型:{{ outStock.outinstocktypeName }}
<!--			<el-select v-model="value" placeholder="选择出库类型">-->
<!--				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />-->
<!--			</el-select>-->
		</div>
		<!-- 右 -->
		<div style="margin-top: 10px;padding: 20px;float: right;">
			经手人:{{ outStock.staffName }}
<!--			<el-select v-model="value" placeholder="选择经手人">-->
<!--				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />-->
<!--			</el-select>-->

			&nbsp;&nbsp;&nbsp;

			业务日期:{{ outStock.otheroutstockTime }}
<!--			<el-select v-model="value" placeholder="选择日期">-->
<!--				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />-->
<!--			</el-select>-->
		</div>

		<!-- 表格 -->
		<el-table :data="outStock.detailsList" border
			:header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
			:cell-style="{ textAlign: 'center' }">
			<el-table-column prop="date" label="序号" min-width="21%" >
        <template #default="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
			<el-table-column prop="commodity.commodityName" label="商品名称" min-width="150%"/>
			<el-table-column prop="commodity.commoditySpecifications" label="规格/属性" />
			<el-table-column prop="commodity.commodityCompany" label="单位" />
			<el-table-column prop="goodsNumber" label="数量" />
			<el-table-column prop="remarks" label="备注" />
		</el-table>

	</div>
	<div  style="background-color: white;padding: 20px;margin-top: 12px">
		备注；<br /><br />
		<el-input disabled v-model="outStock.remark" :rows="2" type="textarea" placeholder="请输入备注信息" />
	</div>

</template>

<script>
	// import { Calendar, Search } from '@element-plus/icons-vue'
	import {
		ElMessage
	} from 'element-plus'

	export default {
		data() {
			return {

        // 出库单
        outStock: {},

			}
		},
		methods: {


		},
		created() {
      // 从store中取出库单
      this.outStock=this.$store.state.outStock

      console.log("chukudan :",this.outStock)

		}
	}
</script>

<style>

	body{
		/*background-color: gray;*/
	}

</style>
