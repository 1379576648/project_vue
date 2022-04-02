<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick"  type="card" >
    <el-tab-pane label="已出库" name="first">
      <div>
        <el-button style="float:right" type="primary">新增销售单</el-button>
        <div>
          <el-button plain style="float: right;margin-right: 30px">高级搜索</el-button>
          <div style="width: 10px;float: right"></div>
          <el-input v-model="input" placeholder="编号/客户/商品/备注" style="width: 200px;float: right"></el-input>

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
              width="200"
          >

            <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->
            <el-button
                class="font_sty"
                type="text"
                size="small">
              <router-link to="edit">编辑</router-link>
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small">
              <router-link to="details">详情</router-link>
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small"
                style="color: red"
            >
              移除
            </el-button>

          </el-table-column>

        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo.currentPage"
              :page-sizes="[1, 3, 5, 7]"
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
        <el-button style="float:right" type="primary">添加商品</el-button>
        <div>
          <el-button plain style="float: right;margin-right: 30px">高级搜索</el-button>
          <div style="width: 10px;float: right"></div>
          <el-input v-model="input" placeholder="编号/客户/商品/备注" style="width: 200px;float: right"></el-input>

        </div>

        <br><br><br>
        <el-table
            :data="tableData2"
            style="width: 100%"
            height="490">
          <el-table-column type="selection" width="55"/>
          <el-table-column
              fixed
              prop="date"
              label="序号"
              width="100%">
          </el-table-column>

          <el-table-column
              fixed
              prop="name"
              label="商品名称"
              width="120">
          </el-table-column>

          <el-table-column
              prop="province"
              label="零售价"
              width="120">
          </el-table-column>
          <el-table-column
              prop="city"
              label="市区"
              width="120">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址"
              width="300">
          </el-table-column>

          <el-table-column
              prop="zip"
              label="邮编"
              width="120">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="200"
          >

            <!--        @click.native.prevent="deleteRow(scope.$index, tableData)"     -->
            <el-button
                class="font_sty"
                type="text"
                size="small">
              <router-link to="edit">编辑</router-link>
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small">
              <router-link to="details">详情</router-link>
            </el-button>
            &nbsp;
            <span class="span_1">|</span>
            &nbsp;
            <el-button
                type="text"
                size="small"
                style="color: red"
            >
              移除
            </el-button>

          </el-table-column>

        </el-table>

        <!-- 分页插件 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="pageInfo2.currentPage"
              :page-sizes="[1, 3, 5, 7]"
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
  {{tableData}}
</template>

<script>
import {ElNotification} from "element-plus";

export default {
  name: "",
  data() {
    return {
      activeName:'first',
      //访问路径
      url: "http://localhost:9090/",
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
        total: 0, // 总页数
      },
      pageInfo2: {
        // 分页参数
        currentPage: 1, //当前页
        pageSize: 3, // 页大小
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
          "pageSize": this.pageInfo.pageSize
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
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
          "currentPage": this.pageInfo.currentPage,
          "pageSize": this.pageInfo.pageSize
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        console.log(response)
        _this.tableData2 = response.data.succeed.records;
        this.pageInfo2.pageSize = response.data.succeed.size;
        this.pageInfo2.total = response.data.succeed.total;
      })
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





