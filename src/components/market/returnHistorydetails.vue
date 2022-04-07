<template>
  <div
    style="background-color: white; margin-top: 20px; height: 100%; width: 100%"
  >
    <span>客户:{{ datas.customerName }}</span>
    <span style="font-size: 25px; font-weight: bold; margin-left: 450px"
      >销售退货单详情</span
    >
    <span style="float: right">单据编号:{{ datas.billId }}</span>
    <el-divider />

    <span style="float: right"> &nbsp;|</span>
    <span style="float: right"
      >入库状态:<span v-if="datas.saleState == 1">已入库</span>
      <span v-if="datas.saleState == 2">未入库</span>
    </span>
    <span style="float: right"> &nbsp;|</span>
    <span style="float: right">经手人:{{ datas.staffName }}</span>
    <span style="float: right"> &nbsp;|</span>
    <span style="float: right">业务日期:{{ datas.saleTime }}</span>
    <el-table style="margin-top: 20px" :data="tableData">
      <el-table-column prop="saledetailsId" label="序号"> </el-table-column>
      <el-table-column prop="commodityName" label="商品名称"> </el-table-column>
      <el-table-column prop="saleschedulePrice" label="单价"> </el-table-column>
      <el-table-column prop="salescheduleNumber" label="数量">
      </el-table-column>
      <el-table-column prop="commodityCompany" label="单位"> </el-table-column>
      <el-table-column prop="commoditySpecifications" label="规格">
      </el-table-column>
    </el-table>
    <span>退货金额:{{ datas.returnsaleMoney }}</span
    >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    <span>应退金额:{{ datas.returnsaleMoney }}</span
    >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    <span>制单人:{{ datas.staffName }}</span
    >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    <span>制单日期:{{ datas.saleTime }}</span
    >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
  </div>
</template>

<script>
export default {
  data() {
    return {
      // datas: sessionStorage.getItem("row"),
      datas: [],
      tableData: [],
    };
  },
  methods: {},
  created() {
    this.datas = JSON.parse(window.sessionStorage.getItem("userInfo"));
    console.log("111111" + this.datas.commodityName);
    this.axios
      .get("http://localhost:9090/returndetails/xq", {
        params: {
          id: this.datas.returnsaleId,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      })
      .catch(function (error) {
        console.log("失败");
        console.log(error);
      });
  },
};
</script>