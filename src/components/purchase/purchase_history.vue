<template>
	
	<div 
	 class="a"
	style="border-width: 0 0 1px 0;
	border-style: solid;
	border-color: gainsboro;
	
	height: 40px;">
	
<div style="float: left;margin-left: 40px;text-align: center;margin-top: 5px;" v-for="(item,i) in list" @click="active(i)" :class="pageInfo.activeNum ===i ?'active':''">
	
		{{item}}

	
</div>
<div style="float: left;margin-left:35%;margin-top:-10px;"><el-checkbox style="color:lightsteelblue;zoom: 150%;"  v-model="pageInfo.checked1"  label="查看已作废" size="large" @change="cx()" /></div>
  <div class="b"  style="float: left;margin-left:20px;margin-top:-35px;"><el-input 
    v-model="pageInfo.scss"
      placeholder="商品/供应商/经办人/入仓仓库"
   @input="cx()"
  
    >
	
	</el-input>
	</div>
	<div class="b" style="float: left;margin-left:20px;margin-top: 5px;" @click="drawer=true"><el-button>高级搜索</el-button></div>
	<div class="b" style="float: left;margin-left:20px;margin-top: 5px;" @click="aa()"> <el-button type="primary" >新增进货单</el-button></div>
	
  </div>
  <!-- 抽屉 -->
  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
     <div style="float: left;">单据编号：</div>
	    <div style="margin-left: 250px;">商品名称：</div>
		 <div style="float: left;margin-top: 20px;"><el-input v-model="pageInfo.billId" style="width:150px"></el-input></div>
	 <div style="margin-left: 250px;margin-top: 20px;"><el-input v-model="pageInfo.commodityName" style="width:150px"></el-input></div>
	 <div style="float: left;margin-top: 20px;">供应商名称：</div>
	    <div style="margin-left: 250px;margin-top: 20px;">入仓仓库：</div>
	 		 <div style="float: left;margin-top: 20px;"><el-input v-model="pageInfo.supplierName" style="width:150px"></el-input></div>
	 <div style="margin-left: 250px;margin-top: 20px;"><el-select v-model="pageInfo.stockName" class="m-2" placeholder="请选择" size="large">
    <el-option
      v-for="item in stockData"
      :key="item.stockId"
      :label="item.stockName"
      :value="item.stockName"
    />
  </el-select></div>
	 <div style="float: left;margin-top: 20px;">业务日期：</div>
	    <div style="margin-left: 250px;margin-top: 20px;">经手人：</div>
	 		 <div style="float: left;margin-top: 20px;">
				  <el-date-picker
				  style="width: 200px;"
				         v-model="pageInfo.purchaseTime"
				         type="date"
				         placeholder="请选择日期"
				         :disabled-date="disabledDate"
				         :shortcuts="shortcuts"
				       />
			 </div>
	 <div style="margin-left: 250px;margin-top: 20px;"> 
	  <el-select v-model="pageInfo.staffName" class="m-2" placeholder="请选择" size="large">
	    <el-option
	      v-for="item in staffData"
	      :key="item.staffId"
	      :label="item.staffName"
	      :value="item.staffName"
	    />
	  </el-select></div>
	 <div style="border-width: 1px 0 0 0;
	border-style: solid;
	border-color: gainsboro;
	margin-top: 80%;
	height: 60px;">
	<div style="float: right;margin-top: 10px;">
	<el-button>清空</el-button>
	<el-button type="primary" @click="Advancedquery()">查询</el-button>
	</div>
	</div>
	
    </el-drawer>
	 <el-table :data="tableData" style="width: 100%" border>
	  <el-table-column  label="序号" width="100" >
		  <template #default="scope">
		     {{scope.$index+1}}
		  </template>
	  </el-table-column>
	    <el-table-column prop="purchaseTime" label="业务日期" width="200" />
	    <el-table-column prop="billId" label="单据编号" width="200" />
	    <el-table-column prop="supplierName" label="供应商名称" width="120" />
	    <el-table-column prop="commodityName" label="商品名称" width="120" />
	    <el-table-column prop="purchaseDetailsNumber" label="商品数量" width="120" />
		 <el-table-column prop="commodityCompany" label="单位" width="120" />
		  <el-table-column prop="purchaseDetailsTotal" label="总金额" width="120" />
		  <el-table-column prop="stockName" label="入仓仓库" width="150" />
		    <el-table-column prop="purchaseRemarks" label="备注" width="300" />
	    <el-table-column fixed="right" label="操作" width="120">
	      <template #default="scope">
	        <el-button type="text" size="small" @click="tzxq(scope.row)"
	          >详情</el-button
	        >
	        <el-button type="text" size="small" @click="tovoid(scope.row.purchaseId)">作废</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	<div class="block">
	  <el-pagination
	    @size-change="handleSizeChange"
	    @current-change="handleCurrentChange"
	    :current-page="pageInfo.currentPage"
	    :page-sizes="[2, 3, 6, 10]"
	    :page-size="pageInfo.pagesize"
	    layout="total, sizes, prev, pager, next, jumper"
	    :total="pageInfo.total"
	  >
	  </el-pagination>
	</div>
</template>
<script lang="ts">
	const handleClick = () => {
	  console.log('click')
	}
	
	
	import { defineComponent, ref } from "vue";
	 import qs from 'qs'
	 	import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
		stockData:[],
		staffData:[],
		pageInfo: {
		  currentPage: 1,  //页数
		  pagesize: 3,   //每页条数
		  total: 0,   //总条数
		  supplierName:"", //供应商名称
		   commodityName:"",//商品名称
		   billId:"" , //单据编号
		   staffName:"",//经办人
		   stockName:"",//入仓仓库
		 purchaseTime:"",//业务日期
		   scss:"",//模糊查询参数（商品名称/供应商名称/单据编号/经办人/入仓仓库/）
		   checked1:"false", //（已作废/未作废）
		   activeNum:0, //点击变颜色参数
		},
		
		list:['已入库','未入库'],    
		drawer:ref(false),
		
     
	  tableData :[], //表格数据
    };
  },
  methods: {
	  tovoid(id){
		  alert(id)
		var _this =this
		this.axios.post("http://localhost:9090/purchase/tovoid",{
		purchaseId:id,
	
		}) 
		.then(function(response){
			   console.log(response.data)
							  if(response.data.code==='0'){
							 ElMessage({ message: "作废成功！", type: "warning" });
							_this.cx();
							
							  }else{
								alert(response.data.msg);
							  }
						}).catch(function(error){
							console.log(error)
						})
	  },
	  Advancedquery(){   //详细查询
		 var _this =this
		 this.axios.get("http://localhost:9090/purchase/AdvancedqueryPurchasehistory",{
		 params: this.pageInfo,
		 }) 
		 .then(function(response){
		 	   console.log(response.data)
		 					  if(response.data.code==='0'){
		 						  _this.drawer=false
		 					   _this.tableData=response.data.data.records
		 						    _this.pageInfo.total = response.data.data.total;
		 					  }else{
		 						alert(response.data.msg);
		 					  }
		 				}).catch(function(error){
		 					console.log(error)
		 				})
	  },
  active(i){    //得到参数改变样式
  	  this.pageInfo.activeNum =i;
	  this.cx();
  },
  tzxq(data){        //跳转详情
    localStorage.setItem("data",JSON.stringify(data)); 


	  this.$router.push("/Purchasedetails")
	   
	  
  },
  selectStock(){      //查询仓库
	  var _this =this
	this.axios.get("http://localhost:9090/stock/selectStock") 
	.then(function(response){
		   console.log(response.data)
 						  if(response.data.code==='0'){
							  
						   _this.stockData=response.data.data
						  }else{
							alert(response.data.msg);
						  }
 					}).catch(function(error){
 						console.log(error)
 					})
  },  
  selectStaff(){    //查询用户
  	  var _this =this
  	this.axios.get("http://localhost:9090/staff/sselectStaff") 
  	.then(function(response){
  		   console.log(response.data)
   						  if(response.data.code==='0'){
  							  
  						   _this.staffData=response.data.data
  						  }else{
  							alert(response.data.msg);
  						  }
   					}).catch(function(error){
   						console.log(error)
   					})
  },
  handleCurrentChange(page) {
    var _this =this
    this.axios.get("http://localhost:9090/purchase/selectPurchasehistory",{
    params: this.pageInfo,
    }) 
    .then(function(response){
    	   console.log(response.data)
    					  if(response.data.code==='0'){
    						  
    					   _this.tableData=response.data.data.records
    						  
    					  }else{
    						alert(response.data.msg);
    					  }
    				}).catch(function(error){
    					console.log(error)
    				})
  },
  handleSizeChange(size) {
   var _this =this
   this.axios.get("http://localhost:9090/purchase/selectPurchasehistory",{
   params: this.pageInfo,
   }) 
   .then(function(response){
   	   console.log(response.data)
   					  if(response.data.code==='0'){
   						  
   					   _this.tableData=response.data.data.records
   						    _this.pageInfo.total = response.data.data.total;
   					  }else{
   						alert(response.data.msg);
   					  }
   				}).catch(function(error){
   					console.log(error)
   				})
  },
  cx(){   //查询
	  var _this =this
	  this.axios.get("http://localhost:9090/purchase/selectPurchasehistory",{
	  params: this.pageInfo,
	  }) 
	  .then(function(response){
	  	   console.log(response.data)
	  					  if(response.data.code==='0'){
	  						  
	  					   _this.tableData=response.data.data.records
	  						    _this.pageInfo.total = response.data.data.total;
	  					  }else{
	  						alert(response.data.msg);
	  					  }
	  				}).catch(function(error){
	  					console.log(error)
	  				})
  },
  },
  created() {
   this.selectStock()
   this.selectStaff()
     var _this =this
     this.axios.get("http://localhost:9090/purchase/selectPurchasehistory",{
	 params: this.pageInfo,
	 }) 
     .then(function(response){
     	   console.log(response.data)
     					  if(response.data.code==='0'){
     						  
     					   _this.tableData=response.data.data.records
						    _this.pageInfo.total = response.data.data.total;
     					  }else{
     						alert(response.data.msg);
     					  }
     				}).catch(function(error){
     					console.log(error)
     				})
  },
};
</script>

<style>
	.a .b .el-input .el-input__inner {
	  height: 30px;
	margin-top: 40px;
	  width: 250px;
	}
	.fh{
		position: fixed;
				width: 83.8%;
				bottom: 0;
				right: 0;
				height: 56px;
				line-height: 56px;
				box-shadow: 0 -1px 2px rgb(0 0 0 / 3%);
				background: #fff;
				border-top: 1px solid #e8e8e8;
				padding: 0 24px;
				z-index: 9;
	}
.active{
		border-bottom: #409EFF solid 1px;
		color:#409EFF;
	}
</style>