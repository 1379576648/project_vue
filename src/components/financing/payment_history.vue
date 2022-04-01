<!--付款历史-->
<template>
  <div class="ant-card ant-card-bordered">
    <div class="ant-card-head" style="padding: 24px 16px 0px;">
      <div class="ant-card-body">
        <el-button type="primary" @click="goBack()">新增付款</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
<!--        <el-checkbox label="查看作废单据"/>&nbsp;&nbsp;&nbsp;&nbsp;-->
        <el-input style="width: 200px;"
                  v-model="seek"
                  placeholder="名称"
                  class="input-with-select"
        >
          <template #append>
            <el-button @click="selectPayment">
              <el-icon>
                <search/>
              </el-icon>
            </el-button>
          </template>
        </el-input>
        <br/>
        <br/>
        <el-table
            :data="tableData"
            border
            id="scroll3"
            style="width: 100%;max-height:calc(100vh - 218px);"
            :header-cell-style="{background:'#F8F8F9',color:'#606266'}"
            :default-sort="{ prop: 'name', order: 'descending' }"
        >
          <el-table-column prop="paymenttabId" label="序号" type="index" width="80"/>
          <el-table-column prop="paymenttabTime" label="业务日期" width="160" sortable/>
          <el-table-column prop="copeSerial" label="单据编号" width="160" sortable/>
          <el-table-column prop="supplierName" label="供应商名称" width="160" sortable/>
          <el-table-column prop="settlement" label="结算账户" width="160" sortable/>
          <el-table-column prop="copeMoney" label="本单付出欠款(元)" width="160" sortable/>
          <el-table-column prop="coupon" label="本单优惠金额(元)" width="160" sortable/>
          <el-table-column prop="staffName" label="经手人" width="160" sortable/>
          <el-table-column prop="staffName" label="制单人" width="160" sortable/>
          <el-table-column prop="paymenttabTime" label="制单时间" width="160" sortable/>
<!--          <el-table-column prop="address" label="图片附件" width="160"/>-->
          <el-table-column prop="address" label="是否作废" width="160">
            <template #default="scope">
              <span  v-if="scope.row.deleted===0"><span style="color: #5aaaff">正常</span></span>
              <span  v-if="scope.row.deleted===1"><span style="color: #5aaaff">作废</span></span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button type="text" size="small" @click="this.paymentId=scope.row.paymenttabId,goBack2()"
              >详情
              </el-button>
              <el-popconfirm title="您确定要作废该单据吗？">
                <template #reference>
                  <el-button type="text" size="small">作废</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <div style="margin-top: 10px;">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[4, 5, 10, 50]"
              v-model:page-size="pageInfo.pagesize"
              :default-page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              prev-text="上一页"
              next-text="下一页"
              @size-change="selectPayment()"
              @current-change="selectPayment()"
              background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      // 访问地址
      url: "http://localhost:9090/",
      //表格数据
      tableData: [],
      paymentId:'',
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 5, // 页大小
        total: 0, // 总页数
      },
      //搜索
      seek: '',
    }
  },
  methods: {
    //跳转到付款单
    goBack() {
      this.$router.push({path: '/financing/payment'})
    },
    //跳转到付款详情
    goBack2() {
      this.$router.push({path: '/financing/payment_details',query:{paymentId:this.paymentId}})
    },
    //分页查询付款历史
    selectPayment() {
      this.axios({
        method: 'post',
        url: this.url + 'paymenttab/selectPayment',
        data: {
          //当前页
          currentPage: this.pageInfo.currentPage,
          //页大小
          pageSize: this.pageInfo.pagesize,
          //名称
          supplierName:this.seek,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("分页查询所有付款信息");
        console.log(response);
        if (response.data.state === 200 && response.data.msg === "查询成功") {
          this.tableData = response.data.info.records
          this.pageInfo.total = response.data.info.total
        } else {
          ElMessage({
            message: response.data.msg,
            type: 'warning',
          })
        }
      })
    },
  },
  mounted() {
    //分页查询付款历史
    this.selectPayment();
  }
}
</script>

<style scoped>
/deep/ .ant-card-bordered {
  border: 1px solid #e8e8e8;
}

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
</style>