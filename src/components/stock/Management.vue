<template>
  <div class="common-layout">
    <el-container>


      <el-container>

        <el-main>

          <div class="boox">
            <div style="height: 50px;border-bottom: 1px solid #e8e8e8;">
              <div class="boox_1">
                <div><span class="word">全部商品>全部仓库</span></div>
                <div><span style="font-size: 12px">库存总额：￥</span><span style="font-family: Impact">{{this.kcmoney2}}</span> <span
                    style="font-size: 12px">库存总数：</span><span style="font-family: Impact">{{this.kc}}</span><span
                    style="font-size: 12px">/个</span></div>
              </div>
              <div class="boox_1">
                <div style="width: 670px;height: 20px;float: right">
                  <el-checkbox v-model="checked1" label="过滤零库存商品" size="large"/>

                  <el-select v-model="pageInfo.categoryName" placeholder="商品分类" style="width: 200px;">
                    <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.categoryName"
                        :value="item.categoryName"
                    >
                    </el-option>
                  </el-select>
                  <el-select v-model="pageInfo.stockName" placeholder="全部仓库">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.stockName"
                        :value="item.stockName"
                    >
                    </el-option>
                  </el-select>
                  <el-input size="small" v-model="pageInfo.commodityName" placeholder="商品/规格/属性"
                            style="width:143px; height: 100px;">
                    <template #suffix>
                      <el-icon style="margin-top:9px;margin-right:0px">
                        <i-search></i-search>
                      </el-icon>
                    </template>
                  </el-input>
                  <el-button>导出</el-button>
                </div>

              </div>
            </div>
          </div>
          <el-table border empty-text="暂无数据" :stripe="true" :data="tableData" ref="tableT"
                    @selection-change="handleSelectionChange" size="small" style="width: 99%;" height="50vh">

        
            <el-table-column prop="commodityId" label="商品编号" width="100" sortable fixed   :sort-by="['commodityId', 'address']">
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名称" width="100" sortable fixed>
            </el-table-column>

            <el-table-column prop="commodityCompany" label="主单位" :formatter="translationStatus" width="100" sortable>
            </el-table-column>
            <el-table-column prop="commoditySpecifications" sortable label="规格/属性" width="100">
            </el-table-column>
            <el-table-column prop="retailPrice" sortable label="零售价" width="100">
            </el-table-column>
            <el-table-column prop="tradePrice" sortable label="批发价" width="100">
            </el-table-column>
            <el-table-column prop="goodspriceMinprice" sortable label="最低售价" width="100"><!--a-->
            </el-table-column>
            <el-table-column prop="invoiceAmount" sortable label="交货价" width="100"><!--a-->
            </el-table-column>
            <el-table-column prop="goodspriceCost" sortable label="成本价" width="100"><!--a-->
            </el-table-column>
            <el-table-column prop="staylnstock" sortable label="代入库数量" width="110">
            </el-table-column>
            <el-table-column prop="stayoutstock" sortable label="代出库数量" width="110">
            </el-table-column>
            <el-table-column prop="instock" sortable label="入库数量" width="100">
            </el-table-column>
            <el-table-column prop="outstock" sortable label="出库数量" width="100">
            </el-table-column>
            <el-table-column prop="actualstock" sortable label="实际库存" width="100">
            </el-table-column>
            <el-table-column prop="totalprice" sortable label="库存总额" width="100">
            </el-table-column>
            <el-table-column label="操作" fixed="right" class="tableOperation" width="130">
              <template #default="scope">
                <el-button type="text" style="font-size: 12px" @click="dialogVisible1=true,selectInventory1(scope.row)">库存流水</el-button>
                <el-button type="text" style="font-size: 12px" @click="dialogVisible = true,selectInventory1(scope.row)"> 库存分布</el-button>

              </template>
            </el-table-column>

            <div slot="empty">
              <p>

              </p>
              <p><span>暂无翻译记录</span></p>
            </div>
          </el-table>
          <div class="demo-pagination-block" style="float: right">
            <el-pagination
                v-model:currentPage="pageInfo.currentPage"
                v-model:page-size="pageInfo.pageSize"
                :default-page-size="pageInfo.pageSize"
                :page-sizes="[3, 4, 5, 6]"
                :page-size="3"
                :pager-count="4"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.total"
                @size-change="selectInventory"
                @current-change="selectInventory"
                prev-text="上一页"
                next-text="下一页"
                background
            >
            </el-pagination>

          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="库存分布"
      width="50%"

      :before-close="handleClose"
  >
    <div style="border-bottom: 1px solid #e8e8e8; position: relative; top: -15px">

    </div>
    <span style="margin-bottom: 10px">{{commodityName}}</span><br>
    <span>商品编号：</span><span>{{commodityId}}</span> <span style="margin-left: 20px">商品单位  </span><span>{{commodityCompany}}</span><br>
    <el-table :data="tableData1" border style="width: 100%">
      <el-table-column prop="stockId" label="序号" width="80"/>
      <el-table-column prop="stockName" label="仓库名称" width="100"/>
      <el-table-column prop="staylnstock" label="代入库数量" width="100"/>
      <el-table-column prop="stayoutstock" label="代出库数量" width="100"/>
      <el-table-column prop="instock" label="入库数量"/>
      <el-table-column prop="outstock" label="出库数量"/>
      <el-table-column prop="actualstock" label="实际数量"/>
      <el-table-column prop="availablestock" label="可用库存"/>
    </el-table>

  </el-dialog>
  <el-dialog
      v-model="dialogVisible1"
      title="库存流水"
      width="70%"

      :before-close="handleClose"
  >
    <div style="border-bottom: 1px solid #e8e8e8; position: relative; top: -15px">

    </div>
    <span style="margin-bottom: 10px;font-weight: 700;">{{commodityName}}</span><br>
    <span class="word3">商品编号：</span><span class="word3">{{commodityId}}</span> <span style="margin-left: 20px" class="word3">时间周期  </span><span
      class="word3" style="margin-right: 20px">全部</span> <span style="margin-left: 20px" class="word3">仓库  </span><span
      class="word3" style="margin-right: 20px">默认仓库</span>
    <span style="margin-left: 20px" class="word3">单位  </span><span>{{commoditySpecifications}}</span>
    <br>
    <div style="width: 100%;height: 90px;/*background-color: #42b983*/ ">
      <div style=" border-top: 1px solid #e8e8e8">
        <div
            style="text-align: center;width: 80px; margin-top: 20px;margin-bottom: 20px;  float: left;margin-right: 25px;">
          <span style="text-align: center" class="word2">可用库存</span><br>
          <span class="word1">{{availablestock}}</span>
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          =
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          <span style="text-align: center" class="word2">入库数量</span><br>
          <span class="word1">{{instock}}</span>
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          -
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          <span style="text-align: center" class="word2">出库数量</span><br>
          <span class="word1">{{outstock}}</span>
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          +
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          <span style="text-align: center" class="word2">代入库数量</span><br>
          <span class="word1">{{staylnstock}}</span>
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          -
        </div>
        <div
            style="text-align: center;width: 80px;float: left;margin-top: 20px;margin-bottom: 20px;margin-right: 25px;">
          <span style="text-align: center" class="word2">待出库数量</span><br>
          <span class="word1">{{stayoutstock}}</span>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 50px;border-top: 5px solid #B0C4DE">

      <el-select v-model="pageInfo1.stockName" class="m-2" placeholder="全部" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.stockName"
            :value="item.stockName"
        >
        </el-option>
      </el-select>




    </div>
    <el-table :data="tableData1" border style="width: 100%">
      <el-table-column prop="stockId" label="序号" width="80"/>
      <el-table-column prop="stockName" label="仓库名称" width="100"/>
      <el-table-column prop="staylnstock" label="代入库数量" width="100"/>
      <el-table-column prop="stayoutstock" label="代出库数量" width="100"/>
      <el-table-column prop="instock" label="入库数量"/>
      <el-table-column prop="outstock" label="出库数量"/>
      <el-table-column prop="actualstock" label="实际数量"/>
      <el-table-column prop="availablestock" label="可用库存"/>

    </el-table>
    <div class="demo-pagination-block" style="float: right;display: block;">
      <el-pagination
          v-model:currentPage="pageInfo1.currentPage"
          v-model:page-size="pageInfo1.pageSize"
          :default-page-size="pageInfo1.pageSize"
          :page-sizes="[3, 4, 5, 6]"
          :page-size="3"
          :pager-count="4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo1.total"
          @size-change="selectInventory"
          @current-change="selectInventory"
          prev-text="上一页"
          next-text="下一页"
          background
      >
      </el-pagination>

    </div>
  </el-dialog>

</template>
<script>

export default {
  data() {
    return {
      checked1: "",
      options: [

      ],
      value: "",
      stockname: [
        {
          value: '',
          label: '',
        },
      ],
      options1: [
      ],
      dialogVisible: false,
      dialogVisible1: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 3,
        total: 0,
        commodityName: '',
        stockName: '',
        categoryName:'',
        actualstock:'',
        commodityId:'',
      },
      pageInfo1: {
        currentPage: 1,
        pageSize: 6,
        total: 0,
        stockName:'',
      },
      instock:'',
      tableData: [],
      tableData1: [],
     kc:"",
      kcmoney:"",
      kc1:"",
      kcmoney1:[],
      kcmoney2:"",
    }


  }, methods: {
    selectInventory() {
      this.axios({
        method: "post",
        url: "http://localhost:9090/selectInventory",
        data: this.pageInfo,
        responseType: 'json',
        responseEncoding: 'utf-8'
      }).then((response) => {
        this.tableData = response.data.data.records;
        this.pageInfo.total = response.data.data.total;

      }).catch(function (error) {
        console.log("失败")
        console.log(error)
      })
    },
    selectInventory1(row) {
this.commoditySpecifications=row.commoditySpecifications
     this.pageInfo1.commodityId=row.commodityId
     this.instock=row.instock
      this.outstock=row.outstock
      this.staylnstock=row.staylnstock
      this.stayoutstock=row.stayoutstock
      this.commodityName=row.commodityName
      this.commodityId=row.commodityId
      this.commodityName=row.commodityName
      this.availablestock=row.availablestock
      this.axios({
        method: "post",
        url: "http://localhost:9090/selectInventory1",
        data: this.pageInfo1,
        responseType: 'json',
        responseEncoding: 'utf-8'
      }).then((response) => {
        console.error("ggggg",response)
        this.tableData1 = response.data.data.records;
        this.pageInfo1.total = response.data.data.total;
      }).catch(function (error) {
        console.log("失败")
        console.log(error)
      })
    },
    selectListStock() {
      this.axios.get("http://localhost:9090/selectStockList", {}).then((response) => {
        this.options = response.data;
      })
    },
    selectCategoryList(){
      this.axios.get("http://localhost:9090/selectCategoryList",{}).then((response)=>{
        this.options1=response.data
      })
    },
    selectmoney() {
      this.axios
          .get("http://localhost:9090/selectMoneysl", {
            params:this.kc
          })
          .then((response) => {


              this.kc=response.data[0].KC
              this.kcmoney=response.data[0].KCMONEY

          })
          .catch(function (error) {
            console.log("失败")
            console.log(error);

          });
    },
    selectkcToMoney(){
      var a=0;
      this.axios.get("http://localhost:9090/selectToMoney",{

      }).then((response)=>{
        console.error(response.data)
            for (var i = 0; i < response.data.length; i++) {
              console.error(response.data[i].KC)
              if(i>=1) {
               var g=response.data[i].KC*response.data[i].JG
                this.kcmoney1.push(g);
               for(i=0;i<this.kcmoney1.length;i++){
                   a +=this.kcmoney1[i]
               }
              }
            }
            this.kcmoney2=a
      })
    },
    ceshi(){

      if (this.checked1===true){
         this.pageInfo.actualstock=0;

      }else {
        this.pageInfo.actualstock='';
      }
    },
    zhuanghuang(){
  /*    alert(typeof this.pageInfo.commodityName)*/
      this.pageInfo.commodityName=this.pageInfo.commodityName;
        /*alert(typeof this.pageInfo.commodityId)*/


    }
  }, created() {
    this.selectInventory();
    this.selectListStock();
    this.selectCategoryList();
    this.selectmoney();
    this.selectkcToMoney();
  //  this.selectInventory1();
  }, watch: {
    pageInfo: {
      handler: function () {
        this.zhuanghuang();
        this.selectInventory();

      },
      deep: true,
    },

    stockname: {
      handler: function () {
        this.selectInventory();
      }
    },
    checked1: {
      handler: function () {
        this.ceshi();
      },

    },
  }
}
</script>

<style scoped>

.word3 {
  color: rgba(0, 0, 0, .85);
  font-size: 14px;
}

.word2 {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
}

.word1 {
  font-family: Impact
}

/deep/ .el-dialog {
  height: 480px;

}

/deep/ .el-header {
  background-color: red;
}

/deep/ .el-aside {
  height: 1000px;
  background-color: #42b983;
}

/deept/ .el-checkbox.el-checkbox--large .el-checkbox__label {
  color: rgba(0, 0, 0, .65);
  font-size: 14px;

  font-family: 微软雅黑, 宋体, pingFang SC, Microsoft YaHei UI, Helvetica, serif;
}

/deep/ .el-cascader .el-input .el-input__inner {
  width: 150px;
  margin-left: 5px;
}

/deep/ .el-input--small.el-input--suffix .el-input__inner {
  height: 33px;
  margin-left: 5px;
}

/deep/ .el-table th.el-table__cell > .cell {

}

/deep/ .el-input--large.el-input--suffix .el-input__inner {
  width: 143px;
  height: 33px;

}

/deep/ .el-select--large {
  width: 143px;
  height: 33px;
  float: right;
}

.boox {
  /*  border: 1px solid #e8e8e8;*/

}

.boox_1 {
  width: 50%;
  float: left;
}

.word {
  color: rgba(0, 0, 0, .45);
  font-size: 12px;
}
/deep/ .el-select .el-input{
  width: 170px;
}
</style>
