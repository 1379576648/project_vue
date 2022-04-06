<template>
  <div style="width: 100%;">
    <div id="scroll" style="max-height:calc(100vh - 100px) ">
      <div class="ant-card">
        <div class="ant-card-head" style="border-bottom: 1px dashed rgb(217, 217, 217); padding: 24px 12px 0px;">
          <div class="ant-card-head-wrapper">
            <div class="ant-card-head-title">
              <div class="line-height-36 ant-row">

                <div class="ant-col ant-col-8">
                  <span class="font-size-24 font-bold-700"  align="center">销售详情</span>
                </div>



                <div class="ant-col ant-col-8" align="right">
                  <span style="color: #a5a5a5;">单据编号：</span>
                  <span>{{this.bianhao}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ant-card-body">
          <div class="ant-row_1">
            <div class="ant-row_2">
              <span style="font-size: 16px">仓库：</span>
              <span>{{this.cangku}}</span>
              &nbsp;&nbsp;&nbsp;
            </div>
            <div class="ant-row_2" style="display: flex">
              <div>
                <span style="font-size: 16px">业务日期：</span>
                <span>{{this.riqi}}</span>
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
                <el-table-column  label="商品名称" align="center" prop="commodityName" width="320px">
                </el-table-column>
                <el-table-column prop="saleschedulePrice" label="商品价格" />
                <el-table-column prop="commoditySpecifications" label="规格/属性" />
                <el-table-column prop="commodityCompany" label="单位" />
                <el-table-column prop="salescheduleNumber" label="数量" />
                <el-table-column prop="name" label="商品金额(元  )" >
                  {{this.amountGoods}}
                </el-table-column>
                <el-table-column prop="saleRemarks" label="备注" />
              </el-table>

            </div>
            <div style="height: 40px;width: 100%;margin-top: 12px;display: flex;align-items: center;font-weight: bold">
              <div class="ant_from">
                <div>
                  <label title="销售总额">客户：</label>
                  <span class="pl12">{{this.kehu}}</span>
                </div>
              </div>
            </div>
            <div style="height: 40px;width: 100%;display: flex;align-items: center;font-weight: bold">
              <div class="ant_from">
                <div>
                  <label title="销售总额">实收金额：</label>
                  <span class="pl12">{{this.jine}}</span>
                </div>
              </div>
              <div class="ant_from">
                <div>
                  <label title="销售总额">销售总额：</label>
                  <span class="pl12">{{this.zonge}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <div style="height: 230px;width: 100%;background-color: white">
      <div style="padding: 10px;width: 100%;height: 60px;">
        <el-button style="float: right" @click="getBack()">返回</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "details",
  data(){
    return{
      //访问路径
      url: "http://localhost:9090/",
      selectGoodsDialog:false,
      input:'',
      tableData: [],
      saleId:"",
      saleId2:"",
      amountGoods:"",
      shuxin:"",
      cangku:"",
      bianhao:"",
      riqi:""
    }
  },methods:{
    details(){
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/details',
        data:{
          "saleId":this.saleId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        this.tableData=response.data.data.succeed
        this.amountGoods=response.data.data.succeed[0].salescheduleNumber * response.data.data.succeed[0].saleschedulePrice
        this.cangku=response.data.data.succeed[0].stockName
        this.riqi=response.data.data.succeed[0].saleTime
        this.bianhao=response.data.data.succeed[0].billId
        this.kehu=response.data.data.succeed[0].customerName
        this.jine=response.data.data.succeed[0].saleMoney
        this.zonge=response.data.data.succeed[0].saleMoney
      })
    },
    getBack(){
      this.saleId=""; this.saleId2=""
      this.$router.push({path: '/salesHistory'})
    }
  },created() {
    // 当前ID
    this.saleId = this.$route.query.saleId
    this.details()
  },

}
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