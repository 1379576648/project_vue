<template>
	
	<div
		 class="a"
		style="border-width: 0 0 1px 0;
		border-style: solid;
		border-color: gainsboro;
		background-color: white;
		height: 70px;">
		
			<div style="margin-top: 40px;float: left;color: lightsteelblue;">供应商:{{data.supplierName}}</div>
	
	   <div style="margin-top: 30px;float: left;margin-left: 33%;font-size: 30px;">进货单详情</div>
		 <div style="margin-top: -30px;float: left;margin-left: 83%;color: lightsteelblue;">单据编号:{{data.billId}}</div>
		 <div style="margin-top: -70px;float: left;margin-left: 83%;background-color: rgba(0,0,0,.2);border: 6px solid rgba(0,0,0,.2);">
			 <el-button type="danger">作废</el-button>
			 <el-button  @click="fhlb()">返回列表</el-button>
		 </div>
	  </div>
	  
	  <div style="margin-top: 15px;float: left;color: lightsteelblue;">仓库名称:{{data.stockName}}</div>
	  	
	  <div style="margin-top: 15px;float: left;margin-left: 40%;">入库状态：<span style="color: white;background-color: #52C41A;">已入库</span></div>
	  <div style="margin-top: 15px;float: left;margin-left: 1%;">|</div>
	  <div style="margin-top: -20px;float: left;margin-left: 63%;">经办人:{{data.staffName}}</div>
	  <div style="margin-top: -20px;float: left;margin-left: 1%;">|</div>
	  		 <div style="margin-top: -21px;float: left;margin-left: 75%;color: lightsteelblue;">业务日期:{{data.purchaseTime}}</div>
			<el-table :data="tableData" border show-summary style="width: 100%">
			    <el-table-column prop="commodityName" label="商品名称" width="180" />
			    
			    <el-table-column prop="purchaseDetailsNumber" sortable label="数量" />
			    <el-table-column prop="commodityCompany" sortable label="单位" />
			    <el-table-column prop="amount3" sortable label="单价">
					<template #default="scope">
					  {{scope.row.purchaseDetailsTotal/scope.row.purchaseDetailsNumber}}
					</template>
				</el-table-column>
				<el-table-column prop="purchaseDetailsTotal" label="总金额" />
				<el-table-column prop="purchaseRemarks" label="备注" />
			  </el-table>

	
</template>

<script>
	export default{
		data(){
			return{
				data:JSON.parse(localStorage.getItem("data")),
				tableData : [
					JSON.parse(localStorage.getItem("data")),
				]
			}
		},
		methods:{
			fhlb(){
				this.$router.push("/purchaseHistory")
			}
		},
		created(){
			
			// this.stockName=JSON.parse(sessionStorage.getItem("data")).stockName;
		}
	}
</script>

<style>
</style>

 <!-- <template>
   <el-table :data="tableData" border show-summary style="width: 100%">
     <el-table-column prop="id" label="ID" width="180" />
     <el-table-column prop="name" label="Name" />
     <el-table-column prop="amount1" sortable label="Amount 1" />
     <el-table-column prop="amount2" sortable label="Amount 2" />
     <el-table-column prop="amount3" sortable label="Amount 3" />
   </el-table>
 
   <el-table
     :data="tableData"
     border
     height="200"
     :summary-method="getSummaries"
     show-summary
     style="width: 100%; margin-top: 20px"
   >
     <el-table-column prop="id" label="ID" width="180" />
     <el-table-column prop="name" label="Name" />
     <el-table-column prop="amount1" label="Cost 1 ($)" />
     <el-table-column prop="amount2" label="Cost 2 ($)" />
     <el-table-column prop="amount3" label="Cost 3 ($)" />
   </el-table>
 </template>
 
 <script lang="ts" setup>
 import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
 


 
 const getSummaries = (param: SummaryMethodProps) => {
   const { columns, data } = param
   const sums: string[] = []
   columns.forEach((column, index) => {
     if (index === 0) {
       sums[index] = '合计'
       return sums
     }
	 
     const values = data.map((item) => Number(item[column.property]))
     if (!values.every((value) => Number.isNaN(value))) {
       sums[index] = `$ ${values.reduce((prev, curr) => {
         const value = Number(curr)
         if (!Number.isNaN(value)) {  
           return prev + curr
         } else {
           return prev+"ssss"
         }
       }, 0)}`
     } else {
       sums[index] = ''
     }
   })
 
   return sums
 }
 
 const tableData: Product[] = [
   {
     id: '12987122',
     name: 'Tom',
     amount1: '234',
     amount2: '3.2',
     amount3: 10,
   },
   {
     id: '12987123',
     name: 'Tom',
     amount1: '165',
     amount2: '4.43',
     amount3: 12,
   },
   {
     id: '12987124',
     name: 'Tom',
     amount1: '324',
     amount2: '1.9',
     amount3: 9,
   },
   {
     id: '12987125',
     name: 'Tom',
     amount1: '621',
     amount2: '2.2',
     amount3: 17,
   },
   {
     id: '12987126',
     name: 'Tom',
     amount1: '539',
     amount2: '4.1',
     amount3: 15,
   },
 ]
 </script> -->