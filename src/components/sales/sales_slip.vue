<!-- 销售单 -->
<template>
  <div style="width: 100%;">
     <div id="scroll" style="max-height:calc(100vh - 100px) ">
       <div class="ant-card">
         <div class="ant-card-head" style="border-bottom: 1px dashed rgb(217, 217, 217); padding: 24px 12px 0px;">
           <div class="ant-card-head-wrapper">
             <div class="ant-card-head-title">
               <div class="line-height-36 ant-row">

                 <div class="ant-col ant-col-8">
                   客户：
                   <el-input
                       v-model="pageInfo"
                       placeholder="请选择客户"
                       class="input-with-select"

                       style="width: 210px;"
                   >
                     <template #append>
                       <span><i class="iconfont">&#xe644;</i></span>
                     </template>
                   </el-input>

                 </div>
                 <div class="ant-col ant-col-8" align="center">
                   <span class="font-size-24 font-bold-700">销售单</span>
                 </div>
                 <div class="ant-col ant-col-8" align="right">
                   <span style="color: #a5a5a5;">单据编号：</span>
                   <span>XS202203300001</span>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div class="ant-card-body">
           <div class="ant-row_1">
             <div class="ant-row_2">
               <span style="font-size: 14px">仓库：</span>
               <el-select v-model="value" placeholder="选择仓库">
                 <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
               </el-select>
               &nbsp;&nbsp;&nbsp;
               <span style="font-size: 14px">价格类型：</span>
               <el-select v-model="value" placeholder="批发" style="width: 120px">
                 <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
               </el-select>
             </div>
             <div class="ant-row_2" style="display: flex">
               <div style="padding-left: 50px;margin-right: 20px">
                 <span style="font-size: 14px">经手人：</span>
                 <el-select v-model="value" placeholder="选择仓库">
                   <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                 </el-select>
               </div>
               <div>
                 <span style="font-size: 14px">业务日期：</span>
                 <el-date-picker
                     v-model="value1"
                     type="date"
                     placeholder="选择日期">
                 </el-date-picker>
               </div>

             </div>
           </div>
           <div>
             <div class="mytable-style vxe-cell-hide vxe-table tid_1 size--mini border--full vxe-editable show--head show--foot has--height fixed--right t--animat row--highlight">

               <el-table
                   :data="tableData"
                   border
                   style="width: 100%; font-size: 12px"
                   :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
                   :default-sort="{ prop: 'name', order: 'descending' }"
               >
                 <el-table-column label="序号" type="index" width="50" />
                 <el-table-column  label="商品名称" align="center" width="320px">
                   <div class="ant_sp">
                     <el-input
                         placeholder="请选择商品"
                         v-model="input"
                         clearable
                         size="small"
                         style="width: 210px">
                     </el-input>
                     <el-button size="small">选择商品</el-button>
                   </div>
                 </el-table-column>
                 <el-table-column prop="name" label="商品编号" />
                 <el-table-column prop="name" label="规格/属性" />
                 <el-table-column prop="name" label="单位" />
                 <el-table-column prop="name" label="商品编号" />
                 <el-table-column prop="name" label="数量" />
                 <el-table-column prop="name" label="商品金额(元)" />
                 <el-table-column prop="name" label="备注" />
                 <el-table-column label="操作" width="90" align="center">
                   <template #default="scope">
                     <el-button type="text" size="small" @click="delData(scope.$index, scope.row)">删除</el-button>
                     <el-button type="text" size="small" @click="addhang()">添加</el-button>
                   </template>
                 </el-table-column>
               </el-table>

             </div>
             <div style="height: 40px;width: 100%;margin-top: 12px;display: flex;align-items: center;font-weight: bold">
               <div class="ant_from">
                 <div>
                   <label title="销售总额">销售总额：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">整单折扣：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">整单优惠：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">其他费用：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
             </div>
             <div style="height: 40px;width: 100%;display: flex;align-items: center;font-weight: bold">
               <div class="ant_from">
                 <div>
                   <label title="销售总额">整单优惠：</label>
                   <el-select v-model="value" placeholder="选择仓库" style="width: 190px;">
                     <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                   </el-select>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">应收金额：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">实收金额：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
               <div class="ant_from">
                 <div>
                   <label title="销售总额">累加欠款：</label>
                   <span class="pl12">0.00元</span>
                 </div>
               </div>
             </div>
           </div>
         </div>


       </div>
     </div>
    <div style="margin-top: 10px;height: 230px;width: 100%;background-color: white">
      <div style="padding: 10px">
        <span style="font-size: 14px;">备注：</span><br>
        <br>
        <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea"
        style="width: 650px;">
        </el-input>
      </div>
      <div style="padding: 10px;width: 100%;height: 60px;">
        <el-button type="primary" style="float: right;margin-left: 10px;margin-right: 10px">报错并入库</el-button>
        <el-button style="float: right">保存</el-button>
        <el-button style="float: right">取消</el-button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return{
      input:'',
      tableData: [
        {name:''},
        {name:''},
        {name:''}
      ],
    }
  },
  methods: {
    addhang(){
      let list = {
        name:'',
      };
      this.tableData.unshift(list)
      this.rowNum += 1;
    },
    delData(index,row){
      if (this.tableData.length>1){
        this.tableData.splice(index, 1)
      }else{
        this.$message.error("至少保留一个")
      }
    }

  },
  created() {},
  mounted() {},
};
</script>


<style scoped>
.pl12{
  padding-left: 12px;
}
.ant_from{
  width: 270px;
}
.ant_sp{
  display: none;
}
.el-table--enable-row-hover .el-table__body tr:hover .ant_sp{
  display: block;
}

.vxe-table.size--mini {
  font-size: 12px;
}
.ant-card-body{
  min-height: 350px;
  padding: 12px;
}
.ant-row_1{
  display: flex;
  height: 48px;
  width: 100%;
}
.ant-row_2{
  width: 50%;
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:19px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;}

.ant-card-head {
  min-height: 48px;
  margin-bottom: -1px;
  color: rgba(0,0,0,.85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
  border-bottom: 1px dashed rgb(217, 217, 217);
  padding: 24px 12px 0px;
}
.ant-card {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0,0,0,.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  position: relative;
  background: #fff;
  border-radius: 2px;
}
.ant-card-head:after, .ant-card-head:before {
  display: table;
  content: "";
}

*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ant-card-head:after {
  clear: both;
}
.ant-card-head:after, .ant-card-head:before {
  display: table;
  content: "";
}
*, :after, :before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.ant-card-head-wrapper {
  display: flex;
  align-items: center;
}
*, :after, :before {
  box-sizing: border-box;
}
.ant-card-head-title {
  display: inline-block;
  -webkit-box-flex: 1;
  flex: 1;
  padding: 16px 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.line-height-36 {
  line-height: 36px;
}
.ant-col-8 {
  display: block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 33.33333333%;
}
.ant-col-8{
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  float: left;
}
.ant-col-8{
  position: relative;
  padding-right: 0;
  padding-left: 0;
}
.font-bold-700 {
  font-weight: 700;
}
.font-size-24 {
  font-size: 24px;
}
/deep/.el-input-group__append, .el-input-group__prepend {
  background-color: var(--el-fill-color-light);
  color: var(--el-color-info);
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border-radius: var(--el-input-border-radius);
  padding: 0 10px;
  width: 1px;
  white-space: nowrap;
}
.input-with-select span{
  cursor: pointer;
}










.el-pagination .el-select .el-input {
  width: 90px;
}
#scroll{
  overflow:scroll;
  overflow-x: hidden;
}
#scroll::-webkit-scrollbar{
  width:5px;
}
#scroll::-webkit-scrollbar-thumb{
  background:linear-gradient(rgb(17,157,212),rgb(17,212,105));
  border-radius:5px;
  transition:1s;
}
#scroll::-webkit-scrollbar-thumb:hover{
  background:linear-gradient(rgb(17,212,105),rgb(17,157,212));
}


</style>