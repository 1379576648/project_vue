<!--付款单详情页面-->
<template>
  <div class="ant-card">
    <div class="ant-card-head" style="padding: 24px 16px 0px;">
      <div class="ant-card-head-wrapper">
        <div class="ant-card-head-title">
          <div class="ant-col ant-col-8" align="middle">
            <span class="font-size-24 font-bold-700">其他入库单详情</span>
            </div>
        <span class="font-size-14" style="float:right;margin-top:-2%;margin-right: 2%;"><span class="font-color-45" style="color: rgba(0,0,0,.85);">单据编号：</span>
          <span busitype="104">{{tableData[0].billId}}</span></span>
          <br/>
          <!-- 虚线 -->
          <div style="height:0px;border-top:1px black dashed;" />
          <br/>
          <!-- 入库仓库 -->
        <span class="font-size-14"><span class="font-color-45" style="color: rgba(0,0,0,.85);margin-left:1%;">入库仓库：</span>
          <span busitype="104" style="color: rgba(0,0,0,.65);font-size: 14px;">{{tableData[0].stockName}}</span>&nbsp;</span>
          <!-- 入库类型 -->
            <span class="font-size-14"><span class="font-color-45" style="color: rgba(0,0,0,.85);">入库类型：</span>
          <span busitype="104" style="color: rgba(0,0,0,.65);font-size: 14px;">{{tableData[0].outInStockTypeName}}</span></span>
         <!-- 经手人 -->
        <span class="font-size-14" style="margin-left:53%;"><span class="font-color-45" style="color: rgba(0,0,0,.65);font-size: 14px;">经手人：</span>
          <span busitype="104" style="color: rgba(0,0,0,.65);font-size: 14px;">{{tableData[0].staffName}}</span></span>
          &nbsp;&nbsp;<span>|</span>&nbsp;&nbsp;
          <!-- 业务日期 -->
        <span class="font-size-14"><span class="font-color-45" style="color: rgba(0,0,0,.65);font-size: 14px;">业务日期：</span>
          <span busitype="104" style="color: rgba(0,0,0,.65);font-size: 14px;">{{tableData[0].time}}</span></span>
          
          <div style="padding: 15px">
            <div>
              <el-table
                  :data="tableData"
                  border
                  id="scroll3"
                  style="width: 100%;max-height:calc(100vh - 218px);"
                  :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
              >
                <el-table-column prop="commodityName" label="商品名称"/>
                <el-table-column prop="commoditySpecifications" label="规格/属性"/>
                <el-table-column prop="commodityCompany" label="单位"/>
                <el-table-column prop="otherInStockDetailsPrice" label="单价(元)"/>
                <el-table-column prop="otherInStockDetailsNumber" label="数量"/>
                <el-table-column prop="otherInStockDetailsTotal" label="商品金额(元)"/>
                <el-table-column prop="remark" label="备注"/>
              </el-table>
              <br/>
              入库总额：{{tableData[0].otherInStockDetailsTotal}}元
              <br/>
              <br/>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ant-card-body2" style="margin-top: 20px;padding: 10px;background: white">
      备注：{{tableData[0].remark}}
      <br/>
      <br/>
     
    </div>
    <div class="ant-card-body2" style="margin-top: 20px;padding: 10px;background: white">
      <div class="ant-button">
        <el-button type="primary" @click="goBack()">返回列表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // id
      otherInStockDetailsId:'',
      //表格数据
      tableData: [],
    }
  },
  methods: {
    // 查询
    selectDetail(){
      this.otherInStockDetailsId=sessionStorage.getItem("otherInStockDetailsId");
      console.log(this.otherInStockDetailsId);
      this.axios.get("http://localhost:9090/otherinstockdetails/selectDetail",{
        params:{
          id:this.otherInStockDetailsId
        }
      }).then((response) =>{
        console.log(response.data);
        this.tableData=response.data;
      })
    },
    //跳转到付款历史
    goBack() {
      this.$router.push({path: '/Warehousing'})
    },
  },
  created(){
    // 查询方法
    this.selectDetail();
    this.otherInStockDetailsId=sessionStorage.getItem("otherInStockDetailsId");
  }
}
</script>

<style scoped>
/deep/ .ant-card-body {
  padding: 12px;
}

/deep/ .ant-card-head {
  min-height: 48px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: rgba(0, 0, 0, .85);
  font-weight: 500;
  font-size: 16px;
  background: transparent;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 2px 2px 0 0;
  zoom: 1;
  background: #fff;
}

/deep/ .ant-card {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, .65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  -webkit-font-feature-settings: "tnum";
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 2px;
  -webkit-transition: all .3s;
  transition: all .3s;
}

/deep/ .cell {
  color: #606266;
  font-size: 12px;
  text-align: center;
}

/deep/ .font-bold-700 {
  font-weight: 700;
}

/deep/ .font-size-24 {
  font-size: 24px;
}

/deep/ .font-color-45 {
  color: rgba(0, 0, 0, .45);
  text-align: right;
}

/deep/ .ant-card-body2 {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/deep/ .text {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
  margin-top: 10px;
}

/deep/ .ant-button {
  margin-left: 1200px;
}

/deep/ .ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  -webkit-box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
  cursor: pointer;
  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 0;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
}
</style>