<template>
	
	<div
		 class="a"
		style="border-width: 0 0 1px 0;
		border-style: solid;
		border-color: gainsboro;
		background-color: white;
		height: 70px;">
		
			<div style="margin-top: 40px;float: left;">供应商:{{data.supplierName}}</div>
	
	   <div style="margin-top: 30px;float: left;margin-left: 33%;font-size: 30px;">进货单详情</div>
	     <div :style="{display:a}" style="margin-top: -10px;float: left;margin-left: 3%;font-size: 30px;"> <img src="../../assets/zf.webp" class="avatar" style="width: 200px;height: 80px;" /></div>
	    
		 <div style="margin-top: -30px;float: left;margin-left: 83%;">单据编号:{{data.billId}}</div>
		 <div style="margin-top: -70px;float: left;margin-left: 83%;background-color: rgba(0,0,0,.2);border: 6px solid rgba(0,0,0,.2);">
			 <span :style="{display:b}"><el-button type="danger" @click="tovoid()">作废</el-button></span>
			 <el-button  @click="fhlb()">返回列表</el-button>
		 </div>
	  </div>
	  
	  <div style="margin-top: 15px;float: left;">仓库名称:{{data.stockName}}</div>
	  	
	  <div style="margin-top: 15px;float: left;margin-left: 40%;">入库状态：<span style="color: white;background-color: #52C41A;">已入库</span></div>
	  <div style="margin-top: 15px;float: left;margin-left: 1%;">|</div>
	  <div style="margin-top: -20px;float: left;margin-left: 63%;">经办人:{{data.staffName}}</div>
	  <div style="margin-top: -20px;float: left;margin-left: 1%;">|</div>
	  		 <div style="margin-top: -21px;float: left;margin-left: 75%;">业务日期:{{data.purchaseTime}}</div>
			<el-table :data="tableData" border style="width: 100%"
			:header-cell-style="{background:'#F8F8F9',color:'#606266'}"
			show-summary
			:summary-method="getSummaries"
			>
			<el-table-column  label="序号" width="100" >
					  <template #default="scope">
					     {{scope.$index+1}}
					  </template>
			</el-table-column>
			    <el-table-column prop="commodityName" label="商品名称" width="180" />
			    
			    <el-table-column prop="purchaseDetailsNumber"  label="数量" />
			    <el-table-column prop="commodityCompany"  label="单位" />
			    <el-table-column   label="单价(元)">
					<template #default="scope">
					  {{scope.row.purchaseDetailsTotal/scope.row.purchaseDetailsNumber}}
					</template>
				</el-table-column>
				<el-table-column prop="purchaseDetailsTotal"  label="总金额(元)" >
					<template #default="scope">
						  {{scope.row.purchaseDetailsTotal}}
						</template>
					</el-table-column>
				<el-table-column prop="purchaseRemarks" label="备注" />
			  </el-table>

	
</template>




<script>
	import { defineComponent, ref } from "vue";
	 import qs from 'qs'
	 	import { ElMessage } from 'element-plus'
	export default{
		data(){
			return{
				a:"",
				b:"",
				data:JSON.parse(localStorage.getItem("data")),
				tableData : [
					JSON.parse(localStorage.getItem("data")),
				]
			}
		},
		methods:{
			fhlb(){
				this.$router.push("/purchaseHistory")
			},
			tovoid(){   //作废操作
				
					var _this =this
					this.axios.post("http://localhost:9090/purchase/tovoid",{
					purchaseId:this.data.purchaseId,
				
					}) 
					.then(function(response){
						   console.log(response.data)
										  if(response.data.code==='0'){
										 ElMessage({ message: "作废成功！",type: "warning" })
								
									_this.$router.push("/purchaseHistory")
										  }else{
											alert(response.data.msg);
										  }
									}).catch(function(error){
										console.log(error)
									})
			},
		},
		created(){
			
			if(localStorage.getItem("checked1")=="true"){
				
				this.a="disabled"
				this.b="none"
			}else{
				this.a="none"
				this.b="disabled"
			}
		
		}
	}
</script>

<style>
</style>

