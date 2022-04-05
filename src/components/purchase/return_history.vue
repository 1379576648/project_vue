<template>
  <el-tabs type="border-card" @click="handleClick">
    <!--    已出库-->
    <el-tab-pane label="已出库">
      <div style="margin-left: 900px;margin-bottom: 10px;">
        <div style="float: left;margin-right: 20px">
          <el-input placeholder="商品名字/供应商" v-model="pageInfo.supplierName"></el-input>
        </div>
        <div>
          <el-button type="primary" @click="refresh()">查询</el-button>
          <el-button>
            <router-link to="returnOrder">新增退货</router-link>
          </el-button>
        </div>
      </div>
      <div class="history_table">
        <!-- 表格 -->
        <el-table :data="returnData" border
                  :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                  :cell-style="{ textAlign: 'center' }" height="450px">
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
          <el-table-column label="操作" min-width="50%">
            <template #default="scope">
              <el-button type="text" @click="selectReturnGoodsDetails(scope.row)">
                详情
              </el-button>
            </template>

          </el-table-column>
        </el-table>
        <!--        分页插件-->
      </div>
      <div style="float: right;">
        <el-pagination v-model:currentPage="pageInfo.currentPage" :page-sizes="[3, 5, 10, 50]"
                       v-model:page-size="pageInfo.pageSize" :default-page-size="pageInfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total" :pager-count="3"
                       background
                       @size-change="sizeChange" @current-change="pageChange">
        </el-pagination>
      </div>
    </el-tab-pane>


    <!--    未出库-->
    <el-tab-pane label="未出库" name="second">
      <div style="margin-left: 900px;margin-bottom: 10px;">
        <div style="float: left;margin-right: 20px">
          <el-input placeholder="商品名字/供应商" v-model="pageInfo2.supplierName2"></el-input>
        </div>
        <div>
          <el-button type="primary" @click="noRefresh()">查询</el-button>
          <el-button>
            <router-link to="returnOrder">新增退货</router-link>
          </el-button>
        </div>
      </div>
      <div class="history_table">
        <!-- 表格 -->
        <el-table :data="noReturnData" border
                  :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                  :cell-style="{ textAlign: 'center' }" height="450px">
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
          <el-table-column prop="name" label="操作" min-width="50%">
            <template #default="scope">
              <el-button type="text" @click="selectReturnGoodsDetails(scope.row)">详情</el-button>
              <el-button type="text" @click="updateReturnGoodsState(scope.row)">出库</el-button>
            </template>

          </el-table-column>
        </el-table>
        <!--        分页插件-->
      </div>
      <div style="float: right;">
        <el-pagination v-model:currentPage="pageInfo2.page" :page-sizes="[3, 5, 10, 50]"
                       v-model:page-size="pageInfo2.size" :default-page-size="pageInfo2.size"
                       layout="total, sizes, prev, pager, next, jumper" :total="pageInfo2.totalPage" :pager-count="3"
                       background
                       @size-change="changeSize" @current-change="changePage">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  data() {
    return {
      // 出库的分页
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
        //商品/供应商查询的输入框绑定
        supplierName: "",
      },
      //入库的分页
      pageInfo2: {
        // 分页参数
        page: 1, //当前页
        size: 3, // 页大小
        totalPage: 0, // 总页数
        //商品/供应商查询的输入框绑定
        supplierName2: "",
      },
      //退货表已出库的数组
      returnData: [],
      // 退货表未出库的数组
      noReturnData: [],
      //  详情弹窗
      dialogVisible: false,
      //  详情弹窗的数据
      returnDetails: [],
    }
  }, methods: {
    //点击卡片
    handleClick(tab, event) {
      console.log(tab, event)
      if (tab.name == 'second') {
        this.noRefresh();
      } else {
        this.refresh();
      }

    },
    selectNoReturnGoods() {
      this.axios.get("http://localhost:9090/returngoods/notDelivered", {
        params: this.pageInfo2
      }).then(res => {
        console.log(res.data)
        this.noReturnData = res.data.records;
        this.pageInfo2.totalPage = res.data.total;
      }).catch(error => {
        console.log(error)
      })
    },
    //已出库分页大小
    sizeChange(size) {
      this.pageInfo.pagesize = size;
      this.axios
          .get("http://localhost:9090/returngoods/selectReturnGoods", {
            params: this.pageInfo,
          })
          .then(response => {
            console.log(response.data);
            this.returnData = response.data.records;
            this.pageInfo.total = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //已出库当前页数
    pageChange(page) {
      this.pageInfo.currentPage = page;
      this.axios
          .get("http://localhost:9090/returngoods/selectReturnGoods", {
            params: this.pageInfo,
          })
          .then(response => {
            console.log(response);
            this.returnData = response.data.records;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //未出库分页大小
    changeSize(size) {
      this.pageInfo2.size = size;
      this.axios
          .get("http://localhost:9090/returngoods/notDelivered", {
            params: this.pageInfo2,
          })
          .then(response => {
            console.log(response.data);
            this.noReturnData = response.data.records;
            this.pageInfo2.totalPage = response.data.total;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //未出库分页页数
    changePage(page) {
      this.pageInfo2.page = page;
      this.axios
          .get("http://localhost:9090/returngoods/notDelivered", {
            params: this.pageInfo2,
          })
          .then(response => {
            console.log(response);
            this.noReturnData = response.data.records;
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    //出库的刷新方法
    refresh() {
      this.axios.get("http://localhost:9090/returngoods/selectReturnGoods", {
        params: this.pageInfo
      }).then(res => {
        console.log(res.data)
        this.returnData = res.data.records;
        this.pageInfo.total = res.data.total;
      }).catch(error => {
        console.log(error)
      })
    },
    //未出库的刷新方法
    noRefresh() {
      this.axios.get("http://localhost:9090/returngoods/notDelivered", {
        params: this.pageInfo2
      }).then(res => {
        console.log(res.data)
        this.noReturnData = res.data.records;
        this.pageInfo2.totalPage = res.data.total;
      }).catch(error => {
        console.log(error)
      })
    },
    //  修改未出库的状态
    updateReturnGoodsState(row) {
      console.log(row)
      this.axios.post("http://localhost:9090/returngoods/updateReturnGoods", {
        returngoodsId: row.returnGoodsId,
        returngoodsState: 1
      }).then(res => {
        console.log(res)
        this.noRefresh();
      }).catch(error => {
        console.log(error)
      })
    },
    //  出库详情方法
    selectReturnGoodsDetails(row) {
      console.log(row)
      localStorage.setItem("aaa", row.returnGoodsId);
      this.$router.push("/returnDetails")
    }
  }, created() {
    this.selectNoReturnGoods();
    this.axios.get("http://localhost:9090/returngoods/selectReturnGoods", {
      params: this.pageInfo
    }).then(res => {
      console.log(res.data)
      this.returnData = res.data.records;
      this.pageInfo.total = res.data.total;
    }).catch(error => {
      console.log(error)
    })
  }
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.history_table .el-table .cell {
  padding: 0;
}

a {
  text-decoration: none;
  color: deepskyblue;
}
</style>