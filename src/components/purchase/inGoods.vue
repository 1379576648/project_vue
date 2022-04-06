<template>
  <div class="ant-card">

    <el-container>

      <el-header style="height: 120px;">
        <div class="gonghuo">
          <div style="float: left;margin-top: 60px;">供货商：</div>
          <div class="mt-4">
            <el-select v-model="value1" placeholder="请选择供货商" style="width:150px;margin-top: 50px;">
              <el-option
                  v-for="item1 in options"
                  :key="item1.supplierId"
                  :label="item1.supplierName"
                  :value="item1.supplierId"
              />
            </el-select>
          </div>
        </div>

        <el-drawer v-model="dialog">
          <div style="display: inline-block;">
            <div>
              <el-table ref="multipleTableRef" :data="tableDate" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"/>
                <el-table-column property="commodityName" label="商品名称" width="100"/>
                <el-table-column property="categoryName" label="商品分类" width="100"/>
                <el-table-column property="tradePrice" label="批发价" width="100"/>
              </el-table>
            </div>
          </div>
        </el-drawer>


        <div style="margin-left:300px;float: left;margin-top: -50px">
          <span style="font-size: 50px">供货单</span>
        </div>
        <div class="bianhao" style="float: left">
    <span style="margin-left:250px;float: left;margin-top: 0px">
      单据编号：{{ optithere }}
    </span>
        </div>
      </el-header>


      <el-main>
        <div style="float: left;">
          <span>仓库：</span>
          <el-select v-model="value2">
            <el-option
                v-for="item2 in optitwo"
                :key="item2.stockId"
                :label="item2.stockName"
                :value="item2.stockId"
            />
          </el-select>

          <span style="margin-left: 25px">业务日期：</span>
          <el-date-picker v-model="value3" type="datetime" placeholder="请选择" format="YYYY-MM-DD"/>
        </div>

        <div style="float: left;margin-left: 25px">
          <el-button @click="dialog=true,selectCommodity()">
              <span>
                选择商品
              </span>
          </el-button>
        </div>

        <div style="margin-top: 50px">
          <el-table :data="tableData" width="100%">
            <el-table-column sortable prop="commodityId" label="序号" width="80">
              <template #default="scope">
                {{ scope.row.commodityId }}
              </template>
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名称"/>
            <el-table-column prop="categoryName" label="商品分类"/>
            <el-table-column prop="commoditySpecifications" label="规格"/>
            <el-table-column prop="commodityCompany" label="单位"/>
            <el-table-column prop="minNumber" label="数量" width="180">
              <template #default="scope">
                <el-input-number class="ccccc" @keyup="jszj(scope.$index)" v-model="tableData[scope.$index].minNumber"
                                 :min="1" :max="999"/>
              </template>
            </el-table-column>

            <el-table-column prop="tradePrice" label="批发价"/>
            <el-table-column label="总价">
              <template #default="scope">
                {{ scope.row.minNumber * scope.row.tradePrice }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template #default="scope">
                <el-button type="text" size="small" @click="remove(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <h2>总价格：{{ getFin(totale) }}</h2>
        </div>
      </el-main>

    </el-container>

    <el-affix>
      <div style="margin-left: 800px">
      <el-button type="primary" @click="addPurchase()">保存</el-button>
      </div>
    </el-affix>
  </div>
</template>


<script>
import {ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import {ElTable} from 'element-plus'

export default {
  data() {
    return {
      fos: false,
      dialog: false,
      num: '',
      value1: '',
      value2: '',
      value3: ref(''),
      value4: 0,
      value5: 0,
      valur6: 0,
      valur7: 0,
      commodityId: 0,
      tableData: [],
      tableDate: [],
      options: [],
      optitwo: [],
      optithere: '',
    }
  },
  methods: {
    selectCommodity() {
      this.axios.get("http://localhost:9090/commodity/selectCommodity", {}).then(res => {
        this.tableDate = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    selectSupplier() {
      this.axios.post("http://localhost:9090/supplier/selectSupplier", {}).then(res => {
        this.options = res.data.info;
      }).catch(err => {
        console.log(err);
      })
    },
    selectStock() {
      this.axios.get("http://localhost:9090/stock/selectStockCK", {}).then(res => {
        this.optitwo = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    obtainPurchaseNumber() {
      this.axios.get("http://localhost:9090/obtainPurchaseNumber", {}).then(res => {
        this.optithere = res.data.data.info;
      }).catch(err => {
        console.log(err);
      })
    },
    addPurchase() {
      this.axios.post("http://localhost:9090/purchase/addPurchase", {
        supplierId: this.value1,
        stockId: this.value2,
        staffId: 1,
        billId: this.optithere,
        purchaseTime: this.value3,
        purchaseTotal: this.value4,
        actualMoney: this.value4,
        purchaseExamine: 2,
        purchaseState: 2,
      }).then(res => {
        console.log(res);
        if (res.msg = "成功") {
          this.addMaxId()
        } else {
          console.error("失败");
        }
      }).catch(error => {
        console.log(error);
      })
    },
    addMaxId() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.axios.post("http://localhost:9090/purchasedetails/addPurchasedetails", {
          commId: this.tableData[i].commodityId,
          purchasedetailsNumber: this.tableData[i].minNumber,
          purchasedetailsPrice: this.tableData[i].tradePrice,
          purchaseDetailsTotal: this.tableData[i].tradePrice * this.tableData[i].minNumber,
          purchasedetailsState: 0,
        }).then(res => {
          console.log(res);
          this.$router.push("/purchaseHistory");
        }).catch(error => {
          console.log(error);
        })
      }
    },
    handleSelectionChange(val) {
      this.tableData = val;
    },
    getFin(tradePrice) {
      return '￥' + tradePrice.toFixed(2)
    },
    jszj(index) {
      this.tableData[index].minNumber = tableData[index].minNumber
    },
    remove(index) {
      this.tableData.splice(index, 1)
    },

  },
  created() {
    this.selectSupplier();
    this.selectStock();
    this.obtainPurchaseNumber();
  },
  computed: {
    totale() {
      let aa = this.value4
      return this.tableData.reduce(function (prom, n, index) {
        aa = prom + n.tradePrice * n.minNumber;
        return prom + n.tradePrice * n.minNumber
      }, 0)
    }
  }
}
</script>


<style>
* {

}

h2 {
  margin-left: 300px;
}

.ant-card{
  background-color: white;
}

</style>
