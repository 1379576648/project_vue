
 <template>
 	<div style="border-width: 0 0 1px 0;
 border-style: solid;
 border-color: black;
 height: 70px;">
 		<span style="font-size: 30px;">商品分类</span>
 	</div>
 	  <el-button type="primary" @click="insertjm()">添加分类</el-button>
 	   <el-button type="danger" @click="updatejm()">编辑分类</el-button>
 	     <el-button @click="delectCategory()">删除分类</el-button>
 		 <el-tree
 		 @node-click="handleBucketClick"
 		 :data="treeData"
 		    show-cheeckbox
 		    node-key="categoryId"
 		 	default-expand-all
 		    ref="tree"
 		  draggable
 		    :props="defaultProps"
 		 	
 		 	     @node-drop="handleDrop"
 		 		 highlight-current
 		 >
 		 	
 		 </el-tree>
		
		 <!-- 添加分类界面 -->
 		 <el-dialog v-model="insert" title="添加分类" width="35%">
			 <el-form 
			 ref="ruleForm"
			 class="demo-ruleForm"
			 :model="ruleForm"
			 :rules="rules"
			 :label-position="left"
			 >
			 <el-form-item label="分类名称:" prop="categoryName">
 		 	<el-input v-model="ruleForm.categoryName"></el-input>
			</el-form-item>
			<div>
				
 			<el-button 
			type="primary"
			@click="insertCategory('ruleForm')">确定</el-button>
			</div>
			
			</el-form>
 		 </el-dialog>
		 <!-- 编辑分类界面 -->
		<el-dialog v-model="update" title="编辑分类" width="35%">
					 <el-form 
					 ref="ruleForm"
					 class="demo-ruleForm"
					 :model="ruleForm"
					 :rules="rules"
					 :label-position="left"
					 >
					 <el-form-item label="分类名称:" prop="categoryName">
			<el-input v-model="ruleForm.categoryName"></el-input>
					</el-form-item>
					<div>
						
		 			<el-button 
					type="primary"
					@click="updateCategory('ruleForm')">确定</el-button>
					</div>
					
					</el-form>
		</el-dialog>
 </template>
 
 <script>
import { defineComponent, ref } from "vue";
 import qs from 'qs'
 	import { ElMessage } from 'element-plus'
 	export default{
 		data(){
 			return{
 				insert:ref(false), //添加界面
				update:ref(false), //修改界面
 				setTree:[],
 				defaultProps:{
 					   children: 'children',
 					   label: 'organName',
 					   disabled: 'disabled',
 				},
 				treeData:[],
 				organList:[],
				ruleForm:{
					categoryPid:"",
					categoryName:"",
					categoryId:"",
				},
				
				rules: {
				  categoryName: [
				    {
				      required: true,
				      message: "分类名称不能为空！",
				      trigger: "blur",
				    },
				  ],
				  }
 			}
 		},
 		methods:{ 
			  delectCategory(){   //删除商品分类
			  var _this=this
				 if(this.ruleForm.categoryId===""){
				 	 ElMessage({ message: "请选择节点!", type: "warning" });
				 }else if(this.ruleForm.categoryId===0){
				 	 ElMessage({ message: "根节点不可被删除！", type: "warning" });
				 }else{
				 	this.axios.post("http://localhost:9090/category/delectCategory/" +this.ruleForm.categoryId)
						.then(function(response){  
							console.log(response,"sss")
							if(response.data.code==='0'){
								 ElMessage({ message: "删除成功！", type: "warning" });
								 _this.ruleForm.categoryId=""
								 _this.ruleForm.categoryName=""
								 _this.ruleForm.categoryPid=""     //情况被删除节点的数据
								_this.getQuerycheckList()
							}else{
								alert(response.data.msg)
							}
						}).catch(function(error){
						console.log(error)
					})
					
				 }
			  },
			updatejm(){     //打开编辑界面
				if(this.ruleForm.categoryId===""){
					 ElMessage({ message: "请选择节点！", type: "warning" });
				}else if(this.ruleForm.categoryId===0){
					 ElMessage({ message: "根节点不可被编辑！", type: "warning" });
				}else{
				
					this.update=true
				}
			},
			updateCategory(formName){       //编辑商品分类
				var _this=this
				this.$refs[formName].validate((valid) => {
				  if (valid) {
				this.axios.post("http://localhost:9090/category/updateCategory",{
					categoryId:this.ruleForm.categoryId,
					categoryName:this.ruleForm.categoryName,
				
				})
					.then(function(response){
						console.log(response)
						  if(response.data.code==='0'){
							  ElMessage({ message: "编辑成功！", type: "warning" });
							  _this.update=false
						   _this.getQuerycheckList()
						  }else{
							alert(response.data.msg);
						  }
					}).catch(function(error){
						console.log(error)
					})
				    }else {
				        ElMessage({ message: "请完善信息！", type: "warning" });
				        return false;
				      }
					  
				    });
				
			},
			insertjm(){    //打开添加界面
			
				if(this.ruleForm.categoryId===""){
					 ElMessage({ message: "请选择节点！", type: "warning" });
				}else{
					this.ruleForm.categoryName="";
					this.insert=true
				}
			},
 			insertCategory(formName){       //添加商品分类
				var _this=this
				this.$refs[formName].validate((valid) => {
				  if (valid) {
 				this.axios.post("http://localhost:9090/category/insertCategory",{
 					categoryName:this.ruleForm.categoryName,
 					categoryPid:this.ruleForm.categoryPid,
 				})
 					.then(function(response){
 						  if(response.data.code==='0'){
							  ElMessage({ message: "添加成功！", type: "warning" });
							  _this.insert=false
						_this.getQuerycheckList()
						  }else{
							alert(response.data.msg);
						  }
 					}).catch(function(error){
 						console.log(error)
 					})
 				    }else {
 				        ElMessage({ message: "请完善信息！", type: "warning" });
 				        return false;
 				      }
					  
 				    });
 				
 			},
 		handleDrop(before,after){
			var _this=this
			this.axios.post("http://localhost:9090/category/updateCategory",{
				categoryId:before.data.id,
				categoryPid:after.data.id,
			})
				.then(function(response){
					console.log(response)
					  _this.getQuerycheckList()
				}).catch(function(error){
					console.log(error)
				})
			
			
		},
 			
 			handleBucketClick(node){
 					  this.ruleForm.categoryPid=node.id
					  this.ruleForm.categoryId=node.id
					  this.ruleForm.categoryName=node.organName
 					  console.log(node)
 			},
 			getQuerycheckList(){

								 this.axios.get("http://localhost:9090/category/selectCategory")
 								  .then((res) => { 		
									  console.log(res)
								 if(res.data.code==0){
									 console.log(res.data.data)
 								    this.setTree = res.data.data
 										this.organList=res.data.data.map((a)=>({
 											label:a.categoryName,
 											value:a.categoryId,
 										}));
 										this.getListData();
 										}else{
											alert(res.data.msg)
										}
 								  });	  
 			},
 			getListData(){
 					  let dataArray =[];
 					    
 					 
 							  let objTemp ={
 								  id:0,
 								  organName:"商品分类",
 							  };
 							  dataArray.push(objTemp);
 					
 					 console.log(dataArray,"aaasss")
 					  this.treeData=this.data2treeDG(this.setTree,dataArray);
 			},
 			data2treeDG(datas,dataArray){
 				 
 					  for(let j=0;j<dataArray.length;j++){
 						  console.log(dataArray[j],"ss")
 						  let dataArrayIndex = dataArray[j];
 						  let childrenArray =[];
 						  let Id=dataArrayIndex.id;
 						  for(let i=0; i<datas.length;i++){
 							 
 							  let data=datas[i];
 							  let parentId = data.categoryPid;
 							  if(parentId === Id){
 								  //判断是否为儿子节点
 								  let objTemp={
 									  id:data.categoryId,
 									  organName:data.categoryName,
 									  parentId:parentId,
 								  };
 								  childrenArray.push(objTemp);
 							  }
 						  }
 						
 						  dataArrayIndex.children =childrenArray;
 						  if(childrenArray.length>0){
 							  this.data2treeDG(datas,childrenArray);
 						  }
 					  }
 					
 					  return dataArray;
 			},
 		},
 		created(){
 			 this.getQuerycheckList();
 		 }
 	}
 </script>
 
 <style>
 </style>
 