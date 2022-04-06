<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick"  type="card" >
    <el-tab-pane label="已出库" name="first">
      <div>
        <router-link to="/salesTicket"><el-button style="float:right" type="primary">新增销售单</el-button></router-link>
        <div>
          <el-checkbox v-model="checked1" @change="panduan()" label="查看已作废" size="large" style="float: right;margin-right: 30px"/>
          <el-button plain style="float: right;margin-right: 30px" @click="selectPageSale">高级搜索</el-button>
          <div style="width: 10px;float: right"></div>
          <el-input v-model="billId" placeholder="订单编号" style="width: 200px;float: right" ></el-input>

        </div>

        <br><br><br>
        <el-table
            :data="tableData"
            style="width: 100%"
            height="490">
          <el-table-column type="selection" width="55"/>
          <el-table-column
              fixed :index="indexMethod"
              prop="saleId"
              align="center"
              label="序号"
              type="index"
              width="100%">
          </el-table-column>

          <el-table-column
              fixed
              prop="saleTime"
              label="业务日期"
              align="center"
              width="300">
          </el-table-column>

          <el-table-column
              prop="billId"
              label="单据编号"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              prop="customerName"
              label="客户"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="commodityName"
              label="商品名称"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              prop="salescheduleNumber"
              label="商品数量"
              align="center"
              width="100">

          </el-table-column>
          <el-table-column
              prop="saleschedulePrice"
              label="商品价格"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="salescheduleTotal"
              label="商品总价"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="saleMoney"
              label="销售金额"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="stockName"
              label="仓库名称"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="staffName"
              label="经手人"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="saleRemarks"
              label="销售备注"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="120"
          >
            <template #default="scope">
            <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->

            <el-button
                type="text"
                size="small"
                @click="details(scope.row.saleId)"
            >
             详情
            </el-button>
            &nbsp;
            <span class="span_1" v-show="zuofei">|</span>
            &nbsp

            <el-button
                type="text"
                size="small"
                style="color: red"
                v-show="zuofei"
                @click="deleteId(scope.row.saleId),deleteId2(scope.row.salescheduleId)"
            >
              作废
            </el-button>
            </template>

          </el-table-column>

        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block" v-show="xianshi">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[50, 30, 20, 10]"
              v-model:page-size="pageInfo.pageSize"
              :default-page-size="pageInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo.total"
              :pager-count="5"
              background
              next-text="下一页"
              prev-text="上一页"
              @current-change="selectPageSale()"
              @size-change="selectPageSale()"
              @prev-click="selectPageSale()"
              @next-click="selectPageSale()">
            >
          </el-pagination>
        </div>
      </div>
    </el-tab-pane>




    <el-tab-pane label="未出库" name="second" :key="one">
      <div>
        <router-link to="/salesTicket"><el-button style="float:right" type="primary">新增销售单</el-button></router-link>
        <div>
          <el-button plain style="float: right;margin-right: 30px" @click="selectPageSale2">高级搜索</el-button>
          <div style="width: 10px;float: right"></div>
          <el-input v-model="billId" placeholder="订单编号" style="width: 200px;float: right"></el-input>

        </div>

        <br><br><br>
        <el-table
            :data="tableData2"
            style="width: 100%"
            height="490">
          <el-table-column type="selection" width="55"/>
          <el-table-column
              fixed :index="indexMethod"
              prop="saleId"
              align="center"
              label="序号"
              type="index"
              width="100%">
          </el-table-column>

          <el-table-column
              fixed
              prop="saleTime"
              label="业务日期"
              align="center"
              width="300">
          </el-table-column>

          <el-table-column
              prop="billId"
              label="单据编号"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              prop="customerName"
              label="客户"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="commodityName"
              label="商品名称"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              prop="salescheduleNumber"
              label="商品数量"
              align="center"
              width="100">

          </el-table-column>
          <el-table-column
              prop="saleschedulePrice"
              label="商品价格"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="salescheduleTotal"
              label="商品总价"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="saleMoney"
              label="销售金额"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="stockName"
              label="仓库名称"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="staffName"
              label="经手人"
              align="center"
              width="120">
          </el-table-column>
          <el-table-column
              prop="saleRemarks"
              label="销售备注"
              align="center"
              width="200">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="120"
          >

            <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->
            &nbsp
            <template #default="scope">
            <el-button
                type="text"
                size="small"
                @click="details(scope.row.saleId)">
              详情
            </el-button>

            &nbsp;
            <span class="span_1">|</span>
            &nbsp
          <el-button
              class="font_sty"
              type="text"
              size="small"
              @click="outbound(scope.row.saleId,scope.row.stockId)"
          >
            出库
          </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo2.currentPage"
              :page-sizes="[50, 30, 20, 10]"
              v-model:page-size="pageInfo2.pageSize"
              :default-page-size="pageInfo2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageInfo2.total"
              :pager-count="5"
              background
              next-text="下一页"
              prev-text="上一页"
              @size-change="selectPageSale2()"
              @current-change="selectPageSale2()"
              @prev-click="selectPageSale2()"
              @next-click="selectPageSale2()">
          >
          </el-pagination>
        </div>
      </div>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
import {ElNotification} from "element-plus";
import { InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
export default {
  name: "",
  data() {
    return {
      xianshi:true,
      zuofei:true,
      activeName:'first',
      billId:'',
      checked1 : false,
      //访问路径
      url: "http://localhost:9090/",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 10, // 页大小
        total: 0, // 总页数
      },
      pageInfo2: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 10, // 页大小
        total: 0, // 总页数
      },
      input: '',
      tableData: [],
      tableData2: []
    }
  },methods:{
    selectPageSale(){
      let _this = this
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/selectPageSale',
        data:{
          "currentPage": this.pageInfo.currentPage,
          "pageSize": this.pageInfo.pageSize,
          "billId":this.billId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        _this.tableData = response.data.succeed.records;
        this.pageInfo.pageSize = response.data.succeed.size;
        this.pageInfo.total = response.data.succeed.total;
      })
    },
    selectPageSale2(){
      let _this = this
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/selectPageSale2',
        data:{
          "currentPage": this.pageInfo2.currentPage,
          "pageSize": this.pageInfo2.pageSize,
          "billId":this.billId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        _this.tableData2 = response.data.succeed.records;
        this.pageInfo2.pageSize = response.data.succeed.size;
        this.pageInfo2.total = response.data.succeed.total;
      })
    },
    deleteId(saleId){
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/deleteId',
        data:{
          "saleId":saleId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        this.selectPageSale()
        ElMessage({
          message: '作废成功',
          type: 'success',
        })
      })
    },
    deleteId2(salescheduleId){
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/deleteId2',
        data:{
          "salescheduleId":salescheduleId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        this.selectPageSale()
      })
    },
    outbound(saleId,stockId){
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/outbound',
        data:{
          "saleId":saleId,
          "stockId":stockId
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        this.selectPageSale2()
      })
    },
    invalid(){
      let _this = this
      this.axios({
        method:'post',
        url: this.url+ 'saleschedule/invalid',
        data:{
          "currentPage": this.pageInfo.currentPage,
          "pageSize": this.pageInfo.pageSize
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        _this.tableData = response.data.succeed.records;
        this.pageInfo2.pageSize = response.data.succeed.size;
        this.pageInfo2.total = response.data.succeed.total;
      })
    },
    panduan(){
      if (this.checked1 === true) {
        this.invalid()
        this.xianshi = false
        this.zuofei = false
      }else{
        this.selectPageSale()
        this.xianshi = true
        this.zuofei = true
      }
    },
    details(saleId){
      this.$router.push({path: '/details',query:{saleId:saleId}})
    },

  },created() {
    this.selectPageSale()
    this.selectPageSale2()
  },
  //序号
  indexMethod(index) {
    let curpage = this.pageInfo.currentPage; //单前页码，具体看组件取值
    let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
    return index + 1 + (curpage - 1) * limitpage;
  },
}
</script>

<style>
table {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}

th {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}

.span_1 {
  color: #ddd;
}

.font_sty {

}

a {
  text-decoration: none;
  color: #409eff;
}

.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}


.demo-tabs {
  color: #6b778c;
  font-weight: 600;

}

</style>





