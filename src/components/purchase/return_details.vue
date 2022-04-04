<template>
  <div>

    <div style="height: 430px;background: white;">
      <div style="height: 80px;border-bottom:1px solid black; line-height: 80px">
        <div style="float: left"><span v-for="a in tableData">供应商：<span>{{a.supplierName}}</span></span></div>
        <div><span style="font-size: 30px;margin-left:35%">退货单详情</span></div>
        <div style="float: right;margin-top: -84px;"><span v-for="ss in tableData">单据编号：<span>{{ss.billId}}</span></span></div>
      </div>

      <div style="margin-bottom: 40px">
        <div style="float: left;margin-right: 606px"><span v-for="b in tableData">仓库名称：<span>{{b.stockName}}</span></span></div>
        <div class="box_header">
          <div>
            <span v-for="c in tableData">出库状态：
              <span v-if="c.returnGoodsState==1">
                  已出库
              </span>
            </span>|
          </div>
          <div><span v-for="aa in tableData">经手人：<span>{{aa.staffName}}</span></span>|</div>
          <div><span v-for="d in tableData">业务日期：<span>{{d.purchaseTime}}</span></span></div>
        </div>
      </div>
      <div class="return_info">
        <el-table :data="tableData"  :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                  :cell-style="{ textAlign: 'center' }" height="200px">
          <el-table-column prop="returnGoodsId" label="序号">
            <template #default="scope">
              {{ scope.row.returnGoodsId }}
            </template>
          </el-table-column>
          <el-table-column prop="purchaseTime" label="业务日期" width="150px"/>
          <el-table-column prop="supplierName" label="供应商名称"/>
          <el-table-column prop="commodityName" label="商品名称"/>
          <el-table-column prop="purchaseDetailsNumber" label="商品数量"/>
          <el-table-column prop="purchaseDetailsTotal" label="退货总金额"/>
          <el-table-column prop="stockName" label="出库仓库"/>
          <el-table-column prop="staffName" label="经手人"/>
          <el-table-column prop="returnGoodsReason" label="退货原因"/>
        </el-table>
      </div>
      <div>
        <div class="return_money">
          <div><span v-for="mm in tableData">退货总额：<span>{{mm.purchaseDetailsTotal}}元</span></span></div>
          <div><span>结算账户：</span><span>支付宝</span></div>
          <div><span v-for="mm in tableData">实退总额：<span>{{mm.purchaseDetailsTotal}}元</span></span></div>
      </div>
      </div>

      <div style="float: right; margin-top: 32px;margin-right: 70px;">
        <el-button style="width: 85px;height: 35px">
          <router-link to="returnHistory">返回列表</router-link>
        </el-button>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      id: sessionStorage.getItem("aaa"),
      tableData: [],
    }
  }, methods: {
    find() {
      this.axios.get("http://localhost:9090/returngoods/selectReturnGoodsById/" + this.id, {}).then(res => {
        console.error(res)
        this.tableData.push( res.data);
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    this.find()
  }
}
</script>

<style>
.box_header div {
  float: left;
  margin-right: 10px;
}

.box_header div span {
  margin-right: 10px;
}

.return_money {
  width: 764px;
}

.return_money div {
  float: left;
  margin-right: 100px;
}

.return_money2 {
  width: 770px;
}

.return_money2 div {
  margin-right: 109px;
  float: left;
}

a {
  text-decoration: none;
  color: deepskyblue;
}

</style>